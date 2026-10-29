import { NextRequest, NextResponse } from 'next/server';
import { getAdminUsers } from '@/lib/storage';
import { verifyPassword, signToken, AUTH_COOKIE_NAME, ensureInitialAdminUser } from '@/lib/auth';
import { logActivity } from '@/lib/audit';

export async function POST(req: NextRequest) {
  try {
    // Ensure initial admin is seeded if empty
    await ensureInitialAdminUser();

    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username dan kata sandi wajib diisi.' },
        { status: 400 }
      );
    }

    const users = await getAdminUsers();
    const user = users.find((u) => u.username.toLowerCase() === username.trim().toLowerCase());

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Username atau kata sandi tidak sesuai.' },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Username atau kata sandi tidak sesuai.' },
        { status: 401 }
      );
    }

    // Create secure token
    const token = await signToken({
      id: user.id,
      username: user.username,
      role: user.role,
      name: user.name
    });

    // Log login activity
    await logActivity(user.username, 'LOGIN', 'Autentikasi', 'Berhasil login ke panel admin.');

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        email: user.email
      }
    });

    // Set secure HttpOnly cookie
    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (err: any) {
    console.error('Login error:', err);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan sistem saat proses login.' },
      { status: 500 }
    );
  }
}
