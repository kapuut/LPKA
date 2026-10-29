import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getCurrentAdminSession } from '@/lib/auth';
import { logActivity } from '@/lib/audit';
import { isGitModeEnabled } from '@/lib/storage';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_DOC_SIZE = 15 * 1024 * 1024; // 15 MB

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];

export async function POST(req: NextRequest) {
  try {
    const admin = await getCurrentAdminSession();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Akses ditolak. Sesi login admin tidak valid.' },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'Tidak ada berkas yang diunggah.' },
        { status: 400 }
      );
    }

    // MIME type validation
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: `Tipe file tidak diizinkan (${file.type}). Hanya format gambar (JPG, PNG, WebP) dan dokumen dinas (PDF, DOC, XLS) yang diperbolehkan.`
        },
        { status: 400 }
      );
    }

    // Size limit validation
    const isImage = file.type.startsWith('image/');
    const maxSize = isImage ? MAX_IMAGE_SIZE : MAX_DOC_SIZE;
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          error: `Ukuran file melebihi batas maksimum (${isImage ? '5 MB untuk gambar' : '15 MB untuk dokumen'}).`
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename to prevent directory traversal
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const ext = path.extname(originalName) || (isImage ? '.jpg' : '.pdf');
    const safeName = `${Date.now()}-${originalName}`;

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    const localFilePath = path.join(uploadsDir, safeName);
    await fs.writeFile(localFilePath, buffer);

    const publicUrl = `/uploads/${safeName}`;

    // If Git mode is enabled, also commit media to GitHub repository
    if (isGitModeEnabled()) {
      try {
        const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
        const GITHUB_OWNER = process.env.GITHUB_OWNER;
        const GITHUB_REPO = process.env.GITHUB_REPO;
        const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

        const gitUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/public/uploads/${safeName}`;
        await fetch(gitUrl, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
            'User-Agent': 'LPKA-Lombok-Tengah-CMS'
          },
          body: JSON.stringify({
            message: `[CMS Media] Upload ${safeName}`,
            content: buffer.toString('base64'),
            branch: GITHUB_BRANCH
          })
        });
      } catch (gitErr) {
        console.error('Git media upload sync error:', gitErr);
      }
    }

    await logActivity(
      admin.username,
      'UPLOAD',
      isImage ? 'Media Foto' : 'Dokumen Berkas',
      `Mengunggah berkas: ${safeName} (${(file.size / 1024).toFixed(1)} KB)`
    );

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: safeName,
      size: `${(file.size / 1024).toFixed(1)} KB`
    });
  } catch (error: any) {
    console.error('Upload handler error:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal memproses unggahan file.' },
      { status: 500 }
    );
  }
}
