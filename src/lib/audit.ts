import { promises as fs } from 'fs';
import path from 'path';
import { AuditLogItem } from './types';

const AUDIT_FILE = path.join(process.cwd(), 'data', 'audit-log.json');

export async function getAuditLogs(): Promise<AuditLogItem[]> {
  try {
    const content = await fs.readFile(AUDIT_FILE, 'utf-8');
    const logs = JSON.parse(content);
    return Array.isArray(logs) ? logs : [];
  } catch {
    return [];
  }
}

export async function logActivity(
  username: string,
  aksi: AuditLogItem['aksi'],
  entitas: string,
  keterangan: string,
  ipAddress?: string
): Promise<void> {
  try {
    const dir = path.dirname(AUDIT_FILE);
    await fs.mkdir(dir, { recursive: true });

    const logs = await getAuditLogs();
    const newEntry: AuditLogItem = {
      id: 'log-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      timestamp: new Date().toISOString(),
      username,
      aksi,
      entitas,
      keterangan,
      ipAddress: ipAddress || '127.0.0.1'
    };

    // Keep the latest 200 logs to prevent file from growing indefinitely
    const updated = [newEntry, ...logs].slice(0, 200);
    await fs.writeFile(AUDIT_FILE, JSON.stringify(updated, null, 2), 'utf-8');
  } catch (error) {
    console.error('Gagal mencatat audit log:', error);
  }
}
