import { NextRequest, NextResponse } from 'next/server';
import { getCurrentAdminSession, hashPassword, verifyPassword } from '@/lib/auth';
import { getAdminUsers, saveAdminUsers } from '@/lib/storage';
import { logActivity } from '@/lib/audit';

export async function POST(req: NextRequest) {
  try {
    const admin = await getCurrentAdminSession();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Sesi tidak valid.' }, { status: 401 });
    }

    const body = await req.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Kata sandi saat ini dan kata sandi baru wajib diisi.' },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Kata sandi baru minimal 8 karakter.' },
        { status: 400 }
      );
    }

    const users = await getAdminUsers();
    const userIndex = users.findIndex(u => u.id === admin.id);

    if (userIndex === -1) {
      return NextResponse.json({ success: false, error: 'Pengguna tidak ditemukan.' }, { status: 404 });
    }

    const isMatch = await verifyPassword(currentPassword, users[userIndex].passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: 'Kata sandi saat ini salah.' },
        { status: 400 }
      );
    }

    const newHash = await hashPassword(newPassword);
    users[userIndex].passwordHash = newHash;

    await saveAdminUsers(users);
    await logActivity(admin.username, 'UPDATE', 'Keamanan', 'Berhasil memperbarui kata sandi akun administrator.');

    return NextResponse.json({
      success: true,
      message: 'Kata sandi berhasil diganti!'
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
