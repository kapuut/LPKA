import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME, getCurrentAdminSession } from '@/lib/auth';
import { logActivity } from '@/lib/audit';

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentAdminSession();
    if (user) {
      await logActivity(user.username, 'LOGOUT', 'Autentikasi', 'Keluar (logout) dari panel admin.');
    }

    const response = NextResponse.json({ success: true, message: 'Berhasil keluar.' });
    response.cookies.delete(AUTH_COOKIE_NAME);
    return response;
  } catch (err: any) {
    const response = NextResponse.json({ success: true });
    response.cookies.delete(AUTH_COOKIE_NAME);
    return response;
  }
}
