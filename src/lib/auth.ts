import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { getAdminUsers, saveAdminUsers } from './storage';
import { AdminUser } from './types';

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'lpka-lombok-tengah-secret-key-2025-secure-jwt';
export const AUTH_COOKIE_NAME = 'lpka_admin_session';

// Password helpers
export async function hashPassword(plainText: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainText, salt);
}

export async function verifyPassword(plainText: string, hash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(plainText, hash);
  } catch {
    return false;
  }
}

// Lightweight secure Token implementation using Web Crypto API (Node 16+ & Edge compatible)
function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return Buffer.from(base64, 'base64').toString('utf-8');
}

async function createHmacSha256(message: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign(
    'HMAC',
    cryptoKey,
    encoder.encode(message)
  );
  return Buffer.from(signature)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

export async function signToken(payload: { id: string; username: string; role: string; name: string }): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7 days validity
  const fullPayload = { ...payload, exp, iat: Math.floor(Date.now() / 1000) };

  const headerEncoded = base64UrlEncode(JSON.stringify(header));
  const payloadEncoded = base64UrlEncode(JSON.stringify(fullPayload));
  const signature = await createHmacSha256(`${headerEncoded}.${payloadEncoded}`, JWT_SECRET);

  return `${headerEncoded}.${payloadEncoded}.${signature}`;
}

export async function verifyToken(token: string): Promise<{ id: string; username: string; role: string; name: string } | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [headerB64, payloadB64, signature] = parts;

    const expectedSignature = await createHmacSha256(`${headerB64}.${payloadB64}`, JWT_SECRET);
    if (signature !== expectedSignature) return null;

    const payload = JSON.parse(base64UrlDecode(payloadB64));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }
    return payload;
  } catch {
    return null;
  }
}

// Session retriever for Server Components & API routes
export async function getCurrentAdminSession(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    if (!token) return null;

    const decoded = await verifyToken(token);
    if (!decoded) return null;

    const users = await getAdminUsers();
    const user = users.find(u => u.id === decoded.id && u.username === decoded.username);
    return user || null;
  } catch {
    return null;
  }
}

// Seed initial administrator if none exists
export async function ensureInitialAdminUser(): Promise<void> {
  try {
    const users = await getAdminUsers();
    if (users.length === 0) {
      const defaultHash = await hashPassword('LpkaLoteng2025!*');
      const initialAdmin: AdminUser = {
        id: 'admin-init-1',
        username: 'admin',
        passwordHash: defaultHash,
        name: 'Administrator Resmi (Demo)',
        email: 'admin.lpkaloteng@kemenkumham.go.id',
        role: 'superadmin',
        createdAt: new Date().toISOString()
      };
      await saveAdminUsers([initialAdmin]);
      console.log('Seeded initial admin account: admin / LpkaLoteng2025!*');
    }
  } catch (err) {
    console.error('Failed to seed initial admin user:', err);
  }
}
