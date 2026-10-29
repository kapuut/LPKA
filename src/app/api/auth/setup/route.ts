import { NextRequest, NextResponse } from 'next/server';
import { getAdminUsers, saveAdminUsers } from '@/lib/storage';
import { hashPassword, signToken, AUTH_COOKIE_NAME } from '@/lib/auth';
import { logActivity } from '@/lib/audit';

export async function POST(req: NextRequest) {
  try {
    const existingUsers = await getAdminUsers();

    // Setup is only allowed if no admin users exist
    if (existingUsers.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Sistem telah memiliki administrator. Silakan login atau hubungi admin utama.' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { username, password, name, email } = body;

    if (!username || !password || !name || !email) {
      return NextResponse.json(
        { success: false, error: 'Seluruh kolom formulir setup wajib diisi.' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Kata sandi minimal 8 karakter demi keamanan instansi.' },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);
    const newAdmin = {
      id: 'admin-' + Date.now(),
      username: username.trim().toLowerCase(),
      passwordHash,
      name: name.trim(),
      email: email.trim(),
      role: 'superadmin' as const,
      createdAt: new Date().toISOString()
    };

    await saveAdminUsers([newAdmin]);
    await logActivity(newAdmin.username, 'SETUP', 'Inisialisasi', 'Membuat akun Super Administrator pertama.');

    const token = await signToken({
      id: newAdmin.id,
      username: newAdmin.username,
      role: newAdmin.role,
      name: newAdmin.name
    });

    const response = NextResponse.json({
      success: true,
      message: 'Akun Super Admin berhasil dibuat.',
      user: {
        id: newAdmin.id,
        username: newAdmin.username,
        name: newAdmin.name,
        role: newAdmin.role
      }
    });

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    });

    return response;
  } catch (err: any) {
    console.error('Setup error:', err);
    return NextResponse.json(
      { success: false, error: 'Gagal melakukan inisialisasi akun admin.' },
      { status: 500 }
    );
  }
}
