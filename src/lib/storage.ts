import { promises as fs } from 'fs';
import path from 'path';
import {
  InstansiProfil,
  Pegawai,
  BeritaItem,
  PengumumanItem,
  DokumenPublik,
  LayananItem,
  GaleriItem,
  PengaturanWebsite,
  AdminUser
} from './types';

const DATA_DIR = path.join(process.cwd(), 'data');

// GitHub Environment Configuration for Git-backed Mode
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

// Helper to determine if Git-backed mode is configured and enabled
export function isGitModeEnabled(): boolean {
  return Boolean(GITHUB_TOKEN && GITHUB_OWNER && GITHUB_REPO);
}

// GitHub Contents API helper
async function syncToGitHub(filePath: string, contentStr: string, commitMessage: string): Promise<boolean> {
  if (!isGitModeEnabled()) return false;
  try {
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`;
    let sha: string | undefined = undefined;

    // Check existing file to get SHA
    try {
      const getRes = await fetch(url, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'LPKA-Lombok-Tengah-CMS'
        }
      });
      if (getRes.ok) {
        const fileData = await getRes.json();
        sha = fileData.sha;
      }
    } catch {
      // file might not exist yet
    }

    const payload: {
      message: string;
      content: string;
      branch: string;
      sha?: string;
    } = {
      message: commitMessage,
      content: Buffer.from(contentStr, 'utf-8').toString('base64'),
      branch: GITHUB_BRANCH
    };

    if (sha) payload.sha = sha;

    const putRes = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'LPKA-Lombok-Tengah-CMS'
      },
      body: JSON.stringify(payload)
    });

    return putRes.ok;
  } catch (err) {
    console.error('Error syncing file to GitHub:', err);
    return false;
  }
}

// Generic file reader
export async function readJsonFile<T>(filename: string, defaultData: T): Promise<T> {
  const filePath = path.join(DATA_DIR, filename);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch {
    // If not exists, save default
    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(defaultData, null, 2), 'utf-8');
    } catch (e) {
      console.warn(`Could not seed ${filename}:`, e);
    }
    return defaultData;
  }
}

// Generic file writer (Atomic write + optional Git commit)
export async function writeJsonFile<T>(
  filename: string,
  data: T,
  commitMessage: string = `[CMS] Update ${filename}`
): Promise<boolean> {
  const filePath = path.join(DATA_DIR, filename);
  const tempPath = path.join(DATA_DIR, `${filename}.tmp-${Date.now()}`);

  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const contentStr = JSON.stringify(data, null, 2);

    // Atomic write
    await fs.writeFile(tempPath, contentStr, 'utf-8');
    await fs.rename(tempPath, filePath);

    // Sync to GitHub if Git mode enabled
    if (isGitModeEnabled()) {
      syncToGitHub(`data/${filename}`, contentStr, commitMessage).catch(err => {
        console.error(`Git background sync error for ${filename}:`, err);
      });
    }

    return true;
  } catch (error) {
    console.error(`Gagal menulis berkas ${filename}:`, error);
    try {
      await fs.unlink(tempPath).catch(() => {});
    } catch {}
    return false;
  }
}

// Specific Domain Accessors
export async function getProfil(): Promise<InstansiProfil> {
  return readJsonFile<InstansiProfil>('profil.json', {} as InstansiProfil);
}

export async function saveProfil(data: InstansiProfil): Promise<boolean> {
  data.updatedAt = new Date().toISOString();
  return writeJsonFile('profil.json', data, `[CMS] Perbarui Profil Instansi LPKA`);
}

export async function getPegawaiList(): Promise<Pegawai[]> {
  const list = await readJsonFile<Pegawai[]>('pegawai.json', []);
  return list.sort((a, b) => a.urutan - b.urutan);
}

export async function savePegawaiList(list: Pegawai[]): Promise<boolean> {
  return writeJsonFile('pegawai.json', list, `[CMS] Perbarui Data Pegawai (${list.length} pegawai)`);
}

export async function getBeritaList(): Promise<BeritaItem[]> {
  const list = await readJsonFile<BeritaItem[]>('berita.json', []);
  return list.sort((a, b) => new Date(b.tanggalPublikasi).getTime() - new Date(a.tanggalPublikasi).getTime());
}

export async function saveBeritaList(list: BeritaItem[]): Promise<boolean> {
  return writeJsonFile('berita.json', list, `[CMS] Perbarui Berita (${list.length} artikel)`);
}

export async function getPengumumanList(): Promise<PengumumanItem[]> {
  const list = await readJsonFile<PengumumanItem[]>('pengumuman.json', []);
  return list.sort((a, b) => new Date(b.tanggalTerbit).getTime() - new Date(a.tanggalTerbit).getTime());
}

export async function savePengumumanList(list: PengumumanItem[]): Promise<boolean> {
  return writeJsonFile('pengumuman.json', list, `[CMS] Perbarui Pengumuman (${list.length} data)`);
}

export async function getDokumenList(): Promise<DokumenPublik[]> {
  const list = await readJsonFile<DokumenPublik[]>('informasi-publik.json', []);
  return list.sort((a, b) => new Date(b.tanggalDiupload).getTime() - new Date(a.tanggalDiupload).getTime());
}

export async function saveDokumenList(list: DokumenPublik[]): Promise<boolean> {
  return writeJsonFile('informasi-publik.json', list, `[CMS] Perbarui Dokumen Informasi Publik (${list.length} file)`);
}

export async function getLayananList(): Promise<LayananItem[]> {
  return readJsonFile<LayananItem[]>('layanan.json', []);
}

export async function saveLayananList(list: LayananItem[]): Promise<boolean> {
  return writeJsonFile('layanan.json', list, `[CMS] Perbarui Informasi Layanan (${list.length} layanan)`);
}

export async function getGaleriList(): Promise<GaleriItem[]> {
  const list = await readJsonFile<GaleriItem[]>('galeri.json', []);
  return list.sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime());
}

export async function saveGaleriList(list: GaleriItem[]): Promise<boolean> {
  return writeJsonFile('galeri.json', list, `[CMS] Perbarui Galeri Foto (${list.length} item)`);
}

export async function getPengaturan(): Promise<PengaturanWebsite> {
  return readJsonFile<PengaturanWebsite>('pengaturan.json', {} as PengaturanWebsite);
}

export async function savePengaturan(data: PengaturanWebsite): Promise<boolean> {
  data.updatedAt = new Date().toISOString();
  return writeJsonFile('pengaturan.json', data, `[CMS] Perbarui Pengaturan Website`);
}

export async function getAdminUsers(): Promise<AdminUser[]> {
  return readJsonFile<AdminUser[]>('admin-users.json', []);
}

export async function saveAdminUsers(users: AdminUser[]): Promise<boolean> {
  return writeJsonFile('admin-users.json', users, `[CMS] Perbarui Daftar Akun Admin`);
}
