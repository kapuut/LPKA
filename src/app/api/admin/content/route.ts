import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getCurrentAdminSession } from '@/lib/auth';
import { logActivity, getAuditLogs } from '@/lib/audit';
import {
  getProfil,
  saveProfil,
  getPegawaiList,
  savePegawaiList,
  getBeritaList,
  saveBeritaList,
  getPengumumanList,
  savePengumumanList,
  getDokumenList,
  saveDokumenList,
  getLayananList,
  saveLayananList,
  getGaleriList,
  saveGaleriList,
  getPengaturan,
  savePengaturan
} from '@/lib/storage';

export async function GET(req: NextRequest) {
  try {
    const admin = await getCurrentAdminSession();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Sesi tidak valid.' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const collection = searchParams.get('collection');

    switch (collection) {
      case 'profil':
        return NextResponse.json({ success: true, data: await getProfil() });
      case 'pegawai':
        return NextResponse.json({ success: true, data: await getPegawaiList() });
      case 'berita':
        return NextResponse.json({ success: true, data: await getBeritaList() });
      case 'pengumuman':
        return NextResponse.json({ success: true, data: await getPengumumanList() });
      case 'informasi-publik':
        return NextResponse.json({ success: true, data: await getDokumenList() });
      case 'layanan':
        return NextResponse.json({ success: true, data: await getLayananList() });
      case 'galeri':
        return NextResponse.json({ success: true, data: await getGaleriList() });
      case 'pengaturan':
        return NextResponse.json({ success: true, data: await getPengaturan() });
      case 'audit-log':
        return NextResponse.json({ success: true, data: await getAuditLogs() });
      default:
        return NextResponse.json({ success: false, error: 'Koleksi tidak valid.' }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getCurrentAdminSession();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Sesi tidak valid.' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const collection = searchParams.get('collection');
    const body = await req.json();

    switch (collection) {
      case 'pegawai': {
        const list = await getPegawaiList();
        // Check if updating entire reordered list
        if (Array.isArray(body)) {
          await savePegawaiList(body);
          await logActivity(admin.username, 'UPDATE', 'Kepegawaian', `Memperbarui urutan & struktur ${body.length} pegawai.`);
          revalidatePath('/profil/struktur-organisasi');
          return NextResponse.json({ success: true, data: body });
        }

        const newItem = {
          ...body,
          id: 'peg-' + Date.now(),
          urutan: list.length + 1,
          isDemoData: false
        };
        const updated = [...list, newItem];
        await savePegawaiList(updated);
        await logActivity(admin.username, 'CREATE', 'Kepegawaian', `Menambahkan pegawai: ${newItem.nama} (${newItem.jabatan})`);
        revalidatePath('/profil/struktur-organisasi');
        return NextResponse.json({ success: true, data: newItem });
      }

      case 'berita': {
        const list = await getBeritaList();
        const baseSlug = body.judul
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
        const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

        const newItem = {
          ...body,
          id: 'berita-' + Date.now(),
          slug: body.slug || slug,
          tanggalPublikasi: body.tanggalPublikasi || new Date().toISOString(),
          jumlahDilihat: 0,
          updatedAt: new Date().toISOString(),
          isDemoData: false
        };
        const updated = [newItem, ...list];
        await saveBeritaList(updated);
        await logActivity(admin.username, 'CREATE', 'Berita', `Membuat berita baru: ${newItem.judul}`);
        revalidatePath('/');
        revalidatePath('/berita');
        return NextResponse.json({ success: true, data: newItem });
      }

      case 'pengumuman': {
        const list = await getPengumumanList();
        const baseSlug = body.judul
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
        const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

        const newItem = {
          ...body,
          id: 'peng-' + Date.now(),
          slug: body.slug || slug,
          tanggalTerbit: body.tanggalTerbit || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isDemoData: false
        };
        const updated = [newItem, ...list];
        await savePengumumanList(updated);
        await logActivity(admin.username, 'CREATE', 'Pengumuman', `Membuat pengumuman: ${newItem.judul}`);
        revalidatePath('/');
        revalidatePath('/pengumuman');
        return NextResponse.json({ success: true, data: newItem });
      }

      case 'informasi-publik': {
        const list = await getDokumenList();
        const newItem = {
          ...body,
          id: 'doc-' + Date.now(),
          tanggalDiupload: new Date().toISOString(),
          jumlahUnduh: 0,
          isDemoData: false
        };
        const updated = [newItem, ...list];
        await saveDokumenList(updated);
        await logActivity(admin.username, 'CREATE', 'Informasi Publik', `Menambahkan dokumen PPID: ${newItem.judul}`);
        revalidatePath('/informasi-publik');
        return NextResponse.json({ success: true, data: newItem });
      }

      case 'layanan': {
        const list = await getLayananList();
        const baseSlug = body.namaLayanan
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');

        const newItem = {
          ...body,
          id: 'layanan-' + Date.now(),
          slug: body.slug || baseSlug,
          isDemoData: false
        };
        const updated = [...list, newItem];
        await saveLayananList(updated);
        await logActivity(admin.username, 'CREATE', 'Layanan', `Menambahkan jenis layanan: ${newItem.namaLayanan}`);
        revalidatePath('/');
        revalidatePath('/layanan');
        return NextResponse.json({ success: true, data: newItem });
      }

      case 'galeri': {
        const list = await getGaleriList();
        const newItem = {
          ...body,
          id: 'galeri-' + Date.now(),
          tanggal: body.tanggal || new Date().toISOString().split('T')[0],
          isDemoData: false
        };
        const updated = [newItem, ...list];
        await saveGaleriList(updated);
        await logActivity(admin.username, 'CREATE', 'Galeri', `Menambahkan foto galeri: ${newItem.judul}`);
        revalidatePath('/');
        revalidatePath('/galeri');
        return NextResponse.json({ success: true, data: newItem });
      }

      default:
        return NextResponse.json({ success: false, error: 'Koleksi tidak valid.' }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const admin = await getCurrentAdminSession();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Sesi tidak valid.' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const collection = searchParams.get('collection');
    const body = await req.json();

    switch (collection) {
      case 'profil': {
        await saveProfil(body);
        await logActivity(admin.username, 'UPDATE', 'Profil Instansi', 'Memperbarui profil, sejarah, visi misi & kontak LPKA.');
        revalidatePath('/');
        revalidatePath('/profil');
        revalidatePath('/kontak');
        return NextResponse.json({ success: true, data: body });
      }

      case 'pengaturan': {
        await savePengaturan(body);
        await logActivity(admin.username, 'UPDATE', 'Pengaturan', 'Memperbarui pengaturan website & beranda.');
        revalidatePath('/');
        return NextResponse.json({ success: true, data: body });
      }

      case 'pegawai': {
        const list = await getPegawaiList();
        const index = list.findIndex(p => p.id === body.id);
        if (index === -1) return NextResponse.json({ success: false, error: 'Pegawai tidak ditemukan.' }, { status: 404 });
        list[index] = { ...list[index], ...body, isDemoData: false };
        await savePegawaiList(list);
        await logActivity(admin.username, 'UPDATE', 'Kepegawaian', `Mengubah data pegawai: ${body.nama}`);
        revalidatePath('/profil/struktur-organisasi');
        return NextResponse.json({ success: true, data: list[index] });
      }

      case 'berita': {
        const list = await getBeritaList();
        const index = list.findIndex(b => b.id === body.id);
        if (index === -1) return NextResponse.json({ success: false, error: 'Berita tidak ditemukan.' }, { status: 404 });
        list[index] = { ...list[index], ...body, updatedAt: new Date().toISOString(), isDemoData: false };
        await saveBeritaList(list);
        await logActivity(admin.username, 'UPDATE', 'Berita', `Mengubah berita: ${body.judul}`);
        revalidatePath('/');
        revalidatePath('/berita');
        revalidatePath(`/berita/${list[index].slug}`);
        return NextResponse.json({ success: true, data: list[index] });
      }

      case 'pengumuman': {
        const list = await getPengumumanList();
        const index = list.findIndex(p => p.id === body.id);
        if (index === -1) return NextResponse.json({ success: false, error: 'Pengumuman tidak ditemukan.' }, { status: 404 });
        list[index] = { ...list[index], ...body, updatedAt: new Date().toISOString(), isDemoData: false };
        await savePengumumanList(list);
        await logActivity(admin.username, 'UPDATE', 'Pengumuman', `Mengubah pengumuman: ${body.judul}`);
        revalidatePath('/');
        revalidatePath('/pengumuman');
        revalidatePath(`/pengumuman/${list[index].slug}`);
        return NextResponse.json({ success: true, data: list[index] });
      }

      case 'informasi-publik': {
        const list = await getDokumenList();
        const index = list.findIndex(d => d.id === body.id);
        if (index === -1) return NextResponse.json({ success: false, error: 'Dokumen tidak ditemukan.' }, { status: 404 });
        list[index] = { ...list[index], ...body, isDemoData: false };
        await saveDokumenList(list);
        await logActivity(admin.username, 'UPDATE', 'Informasi Publik', `Mengubah dokumen PPID: ${body.judul}`);
        revalidatePath('/informasi-publik');
        return NextResponse.json({ success: true, data: list[index] });
      }

      case 'layanan': {
        const list = await getLayananList();
        const index = list.findIndex(l => l.id === body.id);
        if (index === -1) return NextResponse.json({ success: false, error: 'Layanan tidak ditemukan.' }, { status: 404 });
        list[index] = { ...list[index], ...body, isDemoData: false };
        await saveLayananList(list);
        await logActivity(admin.username, 'UPDATE', 'Layanan', `Mengubah informasi layanan: ${body.namaLayanan}`);
        revalidatePath('/');
        revalidatePath('/layanan');
        revalidatePath(`/layanan/${list[index].slug}`);
        return NextResponse.json({ success: true, data: list[index] });
      }

      case 'galeri': {
        const list = await getGaleriList();
        const index = list.findIndex(g => g.id === body.id);
        if (index === -1) return NextResponse.json({ success: false, error: 'Foto tidak ditemukan.' }, { status: 404 });
        list[index] = { ...list[index], ...body, isDemoData: false };
        await saveGaleriList(list);
        await logActivity(admin.username, 'UPDATE', 'Galeri', `Mengubah foto galeri: ${body.judul}`);
        revalidatePath('/');
        revalidatePath('/galeri');
        return NextResponse.json({ success: true, data: list[index] });
      }

      default:
        return NextResponse.json({ success: false, error: 'Koleksi tidak valid.' }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const admin = await getCurrentAdminSession();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Sesi tidak valid.' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const collection = searchParams.get('collection');
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID konten wajib disertakan.' }, { status: 400 });
    }

    switch (collection) {
      case 'pegawai': {
        const list = await getPegawaiList();
        const item = list.find(p => p.id === id);
        const filtered = list.filter(p => p.id !== id);
        await savePegawaiList(filtered);
        await logActivity(admin.username, 'DELETE', 'Kepegawaian', `Menghapus data pegawai: ${item?.nama || id}`);
        revalidatePath('/profil/struktur-organisasi');
        return NextResponse.json({ success: true, message: 'Pegawai berhasil dihapus.' });
      }

      case 'berita': {
        const list = await getBeritaList();
        const item = list.find(b => b.id === id);
        const filtered = list.filter(b => b.id !== id);
        await saveBeritaList(filtered);
        await logActivity(admin.username, 'DELETE', 'Berita', `Menghapus artikel berita: ${item?.judul || id}`);
        revalidatePath('/');
        revalidatePath('/berita');
        return NextResponse.json({ success: true, message: 'Berita berhasil dihapus.' });
      }

      case 'pengumuman': {
        const list = await getPengumumanList();
        const item = list.find(p => p.id === id);
        const filtered = list.filter(p => p.id !== id);
        await savePengumumanList(filtered);
        await logActivity(admin.username, 'DELETE', 'Pengumuman', `Menghapus pengumuman: ${item?.judul || id}`);
        revalidatePath('/');
        revalidatePath('/pengumuman');
        return NextResponse.json({ success: true, message: 'Pengumuman berhasil dihapus.' });
      }

      case 'informasi-publik': {
        const list = await getDokumenList();
        const item = list.find(d => d.id === id);
        const filtered = list.filter(d => d.id !== id);
        await saveDokumenList(filtered);
        await logActivity(admin.username, 'DELETE', 'Informasi Publik', `Menghapus dokumen PPID: ${item?.judul || id}`);
        revalidatePath('/informasi-publik');
        return NextResponse.json({ success: true, message: 'Dokumen berhasil dihapus.' });
      }

      case 'layanan': {
        const list = await getLayananList();
        const item = list.find(l => l.id === id);
        const filtered = list.filter(l => l.id !== id);
        await saveLayananList(filtered);
        await logActivity(admin.username, 'DELETE', 'Layanan', `Menghapus layanan: ${item?.namaLayanan || id}`);
        revalidatePath('/');
        revalidatePath('/layanan');
        return NextResponse.json({ success: true, message: 'Layanan berhasil dihapus.' });
      }

      case 'galeri': {
        const list = await getGaleriList();
        const item = list.find(g => g.id === id);
        const filtered = list.filter(g => g.id !== id);
        await saveGaleriList(filtered);
        await logActivity(admin.username, 'DELETE', 'Galeri', `Menghapus foto galeri: ${item?.judul || id}`);
        revalidatePath('/');
        revalidatePath('/galeri');
        return NextResponse.json({ success: true, message: 'Foto galeri berhasil dihapus.' });
      }

      default:
        return NextResponse.json({ success: false, error: 'Koleksi tidak valid.' }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
