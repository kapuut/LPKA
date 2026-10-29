export type PublicationStatus = 'published' | 'draft' | 'archived';

export interface AdminUser {
  id: string;
  username: string;
  passwordHash: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'editor';
  createdAt: string;
  lastLogin?: string;
}

export interface InstansiProfil {
  namaInstansi: string;
  namaSingkat: string;
  namaResmiKementerian: string;
  slogan: string;
  sejarah: string;
  visi: string;
  misi: string[];
  tugasPokok: string;
  fungsi: string[];
  tujuan: string[];
  tataNilai: {
    judul: string;
    deskripsi: string;
  }[];
  alamat: string;
  telepon: string;
  hotlinePengaduan: string;
  email: string;
  jamLayanan: string;
  koordinatPeta: {
    lat: number;
    lng: number;
    embedUrl: string;
  };
  mediaSosial: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
    tiktok: string;
  };
  bannerHero: {
    badge: string;
    judul: string;
    deskripsi: string;
    tombolUtamaText: string;
    tombolUtamaUrl: string;
    tombolKeduaText: string;
    tombolKeduaUrl: string;
  };
  updatedAt: string;
  isDemoData: boolean;
}

export interface Pegawai {
  id: string;
  nama: string;
  gelarDepan?: string;
  gelarBelakang?: string;
  nipDinas: string; // NIP disensor / prototipe kedinasan
  jabatan: string;
  unitKerja: string;
  level: number; // 1: Kepala, 2: Kasubag/Kasi, 3: Kasubsi, 4: Staf/JFT
  atasanId: string | null;
  urutan: number;
  fotoUrl: string;
  pangkatGolongan?: string;
  riwayatPendidikan?: string;
  statusKepegawaian: 'PNS' | 'PPPK' | 'Honorer';
  isPimpinan: boolean;
  tampilkanDiStruktur: boolean;
  isDemoData: boolean;
}

export interface BeritaItem {
  id: string;
  slug: string;
  judul: string;
  ringkasan: string;
  konten: string;
  kategori: string;
  tags: string[];
  gambarUtama: string;
  captionGambar: string;
  penulis: string;
  tanggalPublikasi: string;
  status: PublicationStatus;
  jumlahDilihat: number;
  isUtama: boolean; // Tampil di slider / headline
  updatedAt: string;
  isDemoData: boolean;
}

export interface PengumumanItem {
  id: string;
  slug: string;
  judul: string;
  nomorSurat?: string;
  ringkasan: string;
  kontenLengkap: string;
  kategori: string;
  tanggalTerbit: string;
  berlakuSampai?: string;
  status: 'aktif' | 'arsip';
  lampiran?: {
    namaFile: string;
    urlFile: string;
    ukuran: string;
  };
  isPenting: boolean;
  updatedAt: string;
  isDemoData: boolean;
}

export interface DokumenPublik {
  id: string;
  judul: string;
  kategori: 'berkala' | 'serta_merta' | 'setiap_saat';
  jenisDokumen: 'Laporan Kinerja' | 'Regulasi' | 'Rencana Kerja' | 'DIPA/Anggaran' | 'SOP' | 'Lainnya';
  nomorDokumen: string;
  tahun: string;
  deskripsi: string;
  penanggungJawab: string;
  urlFile: string;
  ukuranFile: string;
  tipeFile: string;
  tanggalDiupload: string;
  jumlahUnduh: number;
  isDemoData: boolean;
}

export interface LayananItem {
  id: string;
  slug: string;
  namaLayanan: string;
  kategori: 'Kunjungan' | 'Integrasi & Pembebasan' | 'Penitipan' | 'Pengaduan' | 'Bantuan Hukum & Konseling';
  deskripsiSingkat: string;
  persyaratan: string[];
  prosedur: {
    langkah: number;
    judul: string;
    keterangan: string;
  }[];
  jadwalLayanan: string;
  biaya: string; // Biasanya "GRATIS / Rp 0 (Bebas Pungli)"
  waktuPenyelesaian: string;
  penanggungJawab: string;
  kontakPetugas: string;
  isAktif: boolean;
  isDemoData: boolean;
}

export interface GaleriItem {
  id: string;
  judul: string;
  kategori: 'Pembinaan Kepribadian' | 'Pelatihan Kemandirian' | 'Pendidikan' | 'Olahraga & Seni' | 'Kedinasan';
  tanggal: string;
  fotoUrl: string;
  keterangan: string;
  lokasi: string;
  isDemoData: boolean;
}

export interface PengaturanWebsite {
  namaWebsite: string;
  deskripsiWebsite: string;
  modePenyimpanan: 'local' | 'git';
  kontenBeranda: {
    tampilkanPengumumanPenting: boolean;
    tampilkanStatistik: boolean;
    tampilkanLayananCepat: boolean;
    tampilkanGaleri: boolean;
    maxBeritaTampil: number;
  };
  statistikLPKA: {
    label: string;
    nilai: string;
    keterangan: string;
    icon: string;
  }[];
  pesanDisclaimerDemo: string;
  updatedAt: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  username: string;
  aksi: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'UPLOAD' | 'SETUP';
  entitas: string;
  keterangan: string;
  ipAddress?: string;
}

export interface StorageResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}
