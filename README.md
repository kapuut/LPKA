# Portal Resmi & Sistem Informasi Publik LPKA Kelas II Lombok Tengah

Website profil resmi modern, responsif, dan portal informasi publik untuk **Lembaga Pembinaan Khusus Anak (LPKA) Kelas II Lombok Tengah**, Unit Pelaksana Teknis (UPT) Pemasyarakatan di bawah naungan **Kantor Wilayah Kementerian Hukum dan HAM Nusa Tenggara Barat**.

Proyek ini dibangun dari nol dengan arsitektur **Penyimpanan Persisten Berbasis Berkas (File-Based & Git-Backed CMS)** tanpa menggunakan database relasional (tanpa MySQL, PostgreSQL, atau Prisma). Seluruh pembaruan konten, struktur organisasi, warta berita, maklumat pengumuman, dokumen PPID, serta berkas lampiran yang diubah oleh admin tersimpan secara permanen dan dapat langsung diakses oleh pengunjung umum.

---

## 🏛️ Identitas & Desain Instansi

- **Nama Resmi**: Lembaga Pembinaan Khusus Anak Kelas II Lombok Tengah
- **Kementerian/Kanwil**: Kementerian Hukum dan HAM RI — Kantor Wilayah Nusa Tenggara Barat
- **Tata Nilai**: **PASTI BERSAHAJA** (Profesional, Akuntabel, Sinergi, Transparan, Inovatif — Bersih, Santun, Handal, dan Berkinerja)
- **Karakteristik Desain**:
  - Palet warna resmi: Deep Navy Blue (`#091326`, `#0f2042`), Putih Bersih, dan aksen Merah Putih proporsional.
  - Tipografi modern dan mudah dibaca.
  - Layout responsif optimal di desktop, tablet, dan ponsel.
  - Dilengkapi banner transparansi data kedinasan bertanda `(Data Simulasi / Prototipe)` sesuai ketentuan perlindungan data anak binaan dan kepegawaian.

---

## 🛠️ Tumpukan Teknologi (Tech Stack)

- **Framework**: Next.js 16 (App Router)
- **Bahasa**: TypeScript 5 (Strict Mode)
- **Styling**: Tailwind CSS v4 & Vanilla CSS Tokens
- **Ikon**: Lucide React
- **Keamanan & Autentikasi**: Bcryptjs (Password Hashing) & Web Crypto HMAC-SHA256 Signed JWT HttpOnly Session Cookie
- **Penyimpanan Konten**:
  - *Mode Lokal / Mandiri*: Atomic JSON Structured File Storage di direktori `data/*.json`
  - *Mode Cloud Serverless*: Git-Backed Repository Sync via GitHub Contents REST API
- **CMS Kompatibilitas**: Built-in Admin Portal modern + Decap CMS configuration (`public/admin/config.yml`)

---

## 📂 Struktur Halaman Website

### 1. Halaman Publik (Frontend)
- **Beranda (`/`)**:
  - Pita aksen merah putih, logo institusi resmi & jam layanan PTSP.
  - Hero banner atraktif dengan slogan PASTI BERSAHAJA & tombol akses cepat.
  - Banner maklumat pengumuman penting.
  - Counter statistik capaian pembinaan anak binaan.
  - Pintasan layanan terpadu (Kunjungan tatap muka, video call daring, titipan makanan, integrasi).
  - 4 pilar program unggulan (Pendidikan formal, vokasi barista & hidroponik, kerohanian, konseling psikososial).
  - Warta berita terkini & galeri dokumentasi kegiatan.
  - Footer kedinasan lengkap dengan jaminan Zona Integritas Bebas Pungli (WBK), tautan SP4N LAPOR! & WBS Kemenkumham.
- **Profil Instansi (`/profil`)**:
  - Sejarah transformasi menuju Sistem Peradilan Pidana Anak (UU No. 11/2012).
  - Visi, Misi, dan Tujuan Organisasi.
  - Tugas Pokok dan Fungsi (Tusi) kedinasan.
  - Rincian 5 nilai budaya kerja aparatur "PASTI".
- **Struktur Organisasi & Kepegawaian (`/profil/struktur-organisasi`)**:
  - **Bagan Hierarki Pohon Interaktif (Tree Chart)**: Menampilkan visual hubungan atasan-bawahan dari Kepala LPKA (Level 1), Kasi/Kasubbag (Level 2), Kasubsi (Level 3), hingga staf JFT (Level 4).
  - **Daftar Pegawai (Directory Grid View)**: Dilengkapi pencarian nama/jabatan, filter unit kerja, serta modal rincian profil pegawai.
  - *Data 100% dinamis dari penyimpanan berkas, bukan hardcoded*.
- **Berita & Publikasi (`/berita`)**:
  - Daftar warta kegiatan dengan pagination, filter kategori, dan pencarian kata kunci.
  - Halaman detail berita (`/berita/[slug]`) dengan gambar utama, caption, tanggal rilis, nama penulis, tags, serta rekomendasi berita terkait.
- **Pengumuman Resmi (`/pengumuman`)**:
  - Daftar pengumuman dengan status aktif / arsip, nomor surat kedinasan, dan masa berlaku.
  - Halaman detail (`/pengumuman/[slug]`) dengan tombol unduh berkas lampiran (PDF).
- **Keterbukaan Informasi Publik PPID (`/informasi-publik`)**:
  - Penjelasan 3 pilar PPID: Informasi Berkala, Serta-Merta, dan Tersedia Setiap Saat.
  - Tabel Daftar Informasi Publik (DIP) terpublikasi (LKjIP, Renstra, DIPA anggaran, SOP) beserta tombol unduh langsung.
  - Bagan alur langkah SOP Permohonan Informasi Publik (10+7 hari kerja).
  - Prosedur pengajuan keberatan informasi dan sengketa informasi publik.
  - Dasar hukum keterbukaan informasi publik (UU No. 14/2008, UU No. 22/2022, dll).
- **Layanan Publik Terpadu (`/layanan`)**:
  - Katalog standar pelayanan publik: Kunjungan Tatap Muka, Kunjungan Online Video Call, Penitipan Makanan & Barang, Integrasi Pembebasan (PB/CB/CMB), dan Layanan Bantuan Hukum/Pengaduan.
  - Detail SOP (`/layanan/[slug]`): Rincian persyaratan berkas administrasi, langkah prosedur, waktu penyelesaian, dan jaminan biaya **Rp 0 / GRATIS (Bebas Pungli)**.
- **Galeri Dokumentasi (`/galeri`)**:
  - Album foto kegiatan pembinaan kemandirian vokasi, pendidikan kesetaraan, olahraga, dan seni.
  - Filter kategori dan **Lightbox modal** perbesaran foto resolusi tinggi.
- **Kontak & Lokasi (`/kontak`)**:
  - Alamat lengkap di Praya, Kabupaten Lombok Tengah, NTB.
  - Nomor telepon dinas, hotline WhatsApp pengaduan resmi, email, dan jam kerja PTSP.
  - Peta lokasi interaktif responsif.
  - Tautan kanal media sosial dan pengaduan nasional (SP4N LAPOR, WBS Kemenkumham).
  - Formulir pesan dan pengaduan daring interaktif dengan tiket registrasi otomatis.
- **Halaman Tambahan**:
  - Pencarian Global (`/pencarian?q=...`) lintas seluruh entitas (berita, pengumuman, layanan, dokumen, pegawai).
  - Halaman 404 Kustom (`/not-found.tsx`).
  - Peta situs XML (`/sitemap.xml`) dan panduan web crawler (`/robots.txt`).

---

### 2. Panel Admin Terintegrasi (`/admin/*`)

Panel pengelola dirancang khusus dengan antarmuka yang elegan, konsisten, aman, dan mudah digunakan:
- `/admin/login`: Halaman autentikasi aman dengan perlindungan brute-force dan session cookie HttpOnly.
- `/admin/setup`: Wizard inisialisasi akun Super Admin pertama jika sistem belum memiliki administrator.
- `/admin/dashboard`: Ringkasan indikator kinerja (jumlah berita rilis, draft, pengumuman aktif, dokumen publik, jumlah pegawai, foto galeri, status mode penyimpanan, serta tabel log aktivitas terkini).
- `/admin/profil`: Editor visual untuk memperbarui profil lembaga, sejarah, visi, poin misi dinamis, tugas pokok, rincian fungsi, jam layanan, alamat, dan kontak.
- `/admin/pegawai`: Manajemen lengkap pegawai (tambah, edit, hapus, unggah foto, NIP dinas, jabatan, unit kerja, pangkat golongan, dan tingkat level hierarki).
- `/admin/struktur-organisasi`: Pengatur relasi atasan-bawahan, perubahan level eselon, dan urutan tampilan bagan struktur dengan tombol naik/turun.
- `/admin/berita`: Pengelola artikel berita lengkap dengan status (*Published*, *Draft*, *Archived*), slug otomatis, editor konten, tags, unggah foto utama, pratinjau instan (*live preview*), dan konfirmasi hapus.
- `/admin/pengumuman`: Pengelola maklumat kedinasan, nomor surat, tanggal rilis, masa berlaku, tombol tandai pengumuman penting (*headline banner*), dan upload berkas lampiran PDF.
- `/admin/informasi-publik`: Pengelola repositori berkas PPID (kategori berkala, serta-merta, setiap saat, jenis dokumen, nomor registrasi, tahun, dan upload file PDF).
- `/admin/layanan`: Pengelola katalog layanan publik (SOP, rincian checklist persyaratan dinamis, langkah alur bertahap, jadwal, biaya, dan penanggung jawab).
- `/admin/galeri`: Pengelola dokumentasi foto kegiatan (upload foto dari perangkat, kategori kegiatan, lokasi, tanggal, dan deskripsi).
- `/admin/pengaturan`: Pengaturan fitur beranda, status arsitektur penyimpanan (Local vs Git), formulir ubah kata sandi admin ber-hash bcrypt, serta penampil rekam jejak **Audit Log Lengkap** (waktu, username, aksi, entitas, rincian, dan IP pengakses).

---

## 🔒 Arsitektur Autentikasi & Keamanan

1. **Proteksi Akses Penuh**: Seluruh endpoint API perubahan data (`/api/admin/*`) dan halaman panel admin dilindungi verifikasi sesi server-side.
2. **HttpOnly Signed Session Cookie**: Token sesi admin disimpan di cookie `lpka_admin_session` yang bersifat `HttpOnly`, `SameSite=Lax`, dan terlindung dari eksploitasi skrip XSS client-side.
3. **Password Hashing**: Menggunakan algoritma `bcryptjs` dengan *salt rounds* 10. Tidak ada kata sandi yang disimpan dalam bentuk teks polos.
4. **Validasi File Upload**:
   - Pembatasan tipe MIME: hanya format gambar resmi (`image/jpeg`, `image/png`, `image/webp`, `image/svg+xml`) dan dokumen dinas (`application/pdf`, `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`, `application/vnd.ms-excel`).
   - Batasan ukuran: Maksimum 5 MB untuk foto dan 15 MB untuk dokumen.
   - Sanitasi nama file untuk mencegah serangan *path traversal* atau eksekusi ekstensi berbahaya.
5. **Mesin Audit Log**: Setiap tindakan pembuatan, perubahan, penghapusan konten, login, logout, dan upload berkas dicatat otomatis ke `data/audit-log.json`.

---

## 💾 Mekanisme Penyimpanan Persisten Tanpa Database

Sistem mengadopsi **Adapter Pattern** yang mendukung dua mode operasional:

### Mode A: Local / Self-Hosted / Docker / VPS (Default)
- Perubahan yang disimpan admin ditulis secara **atomik** (menulis berkas sementara lalu mengganti nama file secara aman) ke direktori `data/*.json`:
  - `data/profil.json`: Identitas, sejarah, visi misi, tusi, kontak.
  - `data/pegawai.json`: Daftar pegawai, level hierarki, atasanId, urutan.
  - `data/berita.json`: Artikel berita publik dan draft.
  - `data/pengumuman.json`: Maklumat dan surat edaran.
  - `data/informasi-publik.json`: Dokumen PPID dan regulasi.
  - `data/layanan.json`: Standar layanan dan SOP.
  - `data/galeri.json`: Foto dokumentasi kegiatan.
  - `data/pengaturan.json`: Konfigurasi situs dan beranda.
  - `data/admin-users.json`: Akun pengelola terproteksi hash bcrypt.
  - `data/audit-log.json`: Rekam jejak seluruh aktivitas administratif.
- Berkas gambar dan dokumen diunggah ke `public/uploads/*`.
- **Tidak membutuhkan konfigurasi eksternal apa pun**; langsung siap dipakai seketika.

### Mode B: Git-Backed Cloud Deployment (Vercel / Netlify / Serverless)
Untuk mengatasi masalah penyimpanan sementara (*ephemeral disk*) pada serverless cloud:
- Ketika variabel `GITHUB_TOKEN`, `GITHUB_OWNER`, dan `GITHUB_REPO` diisi, adapter penyimpanan server-side akan melakukan **commit otomatis** langsung ke repositori GitHub via **GitHub Contents REST API**.
- Berkas JSON maupun berkas biner media yang diunggah otomatis di-commit ke branch utama repositori dengan pesan commit deskriptif (misal: `[CMS] Update berita: ...`).
- Data tidak akan pernah hilang meskipun serverless instance melakukan *cold restart*.

---

## 🚀 Panduan Instalasi & Menjalankan Proyek

### Prasyarat
- Node.js versi 18 ke atas (Direkomendasikan v20 / v22)
- npm versi 9 ke atas

### 1. Kloning & Masuk ke Folder Proyek
```bash
git clone <URL_REPOSITORY>
cd "PROFILE LPKA"
```

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Inisialisasi Data Awal (Seeding)
Jalankan skrip seed data untuk menyiapkan data kedinasan awal, direktori `data/`, dan akun admin pertama:
```bash
node scripts/seed-data.mjs
```

### 4. Menjalankan di Mode Pengembangan (Development)
```bash
npm run dev
```
Akses website melalui browser:
- Website Publik: [http://localhost:3000](http://localhost:3000)
- Panel Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## 🔑 Kredensial Administrator Awal (Demo Prototipe)

| Informasi | Kredensial |
| :--- | :--- |
| **URL Login** | `/admin/login` |
| **Username** | `admin` |
| **Kata Sandi** | `LpkaLoteng2025!*` |
| **Peran (Role)** | `superadmin` |

> [!TIP]
> Anda dapat langsung mengganti kata sandi admin di menu **Pengaturan & Log** (`/admin/pengaturan`) setelah login.

---

## 🌐 Panduan Deployment

### Opsi 1: Vercel / Netlify (Serverless Git-Backed)
1. Unggah kode ke repositori GitHub privat/publik Anda.
2. Hubungkan repositori tersebut ke akun Vercel / Netlify.
3. Tambahkan **Environment Variables** di dashboard Vercel/Netlify:
   - `ADMIN_JWT_SECRET`: Buat string acak yang kuat (misal: `kemenkumham-lpka-loteng-secret-2025`).
   - `GITHUB_TOKEN`: GitHub Personal Access Token (PAT) dengan izin cakupan `repo` (write access).
   - `GITHUB_OWNER`: Username akun GitHub Anda (misal: `kemenkumham-ntb`).
   - `GITHUB_REPO`: Nama repositori (misal: `profile-lpka-lombok-tengah`).
   - `GITHUB_BRANCH`: `main` (atau branch utama Anda).
4. Lakukan deploy. Setiap kali admin melakukan penambahan/pengeditan berita atau pegawai, Next.js server akan melakukan commit otomatis ke repositori GitHub, sehingga data tersimpan permanen.

### Opsi 2: VPS / Server Mandiri / Docker / CPanel Node.js
1. Jalankan build production:
   ```bash
   npm run build
   ```
2. Jalankan server production:
   ```bash
   npm run start
   ```
   *(Atau jalankan via Process Manager seperti PM2: `pm2 start npm --name "lpka-web" -- start`)*
3. Folder `data/` dan `public/uploads/` otomatis bertindak sebagai persistent disk volume.

---

## 📋 Hasil Pengujian Sistem (Test Matrix)

Semua fungsionalitas telah diuji secara nyata menggunakan browser subagent dan build pipeline:

| Kriteria Pengujian | Status | Keterangan |
| :--- | :---: | :--- |
| **Aksesibilitas Halaman Publik** | ✅ LULUS | Seluruh rute (`/`, `/profil`, `/struktur-organisasi`, `/berita`, `/pengumuman`, `/informasi-publik`, `/layanan`, `/galeri`, `/kontak`, `/pencarian`, 404, sitemap) berjalan lancar. |
| **Bagan Struktur Organisasi** | ✅ LULUS | Mampu beralih antara Bagan Hierarki Pohon dan Grid Pegawai, data tersambung langsung dari file JSON. |
| **Autentikasi Panel Admin** | ✅ LULUS | Verifikasi login bcrypt, perlindungan sesi cookie HttpOnly, proteksi rute admin dari akses liar. |
| **Penyimpanan Persisten** | ✅ LULUS | Penambahan berita melalui admin langsung tersimpan ke `data/berita.json` dan seketika tampil di halaman publik `/berita`. |
| **Audit Logging** | ✅ LULUS | Setiap aksi login, buat berita, dan ubah data tercatat otomatis di `data/audit-log.json`. |
| **Upload Berkas & Media** | ✅ LULUS | Validasi ekstensi, MIME type, dan batasan ukuran berkas berjalan sesuai ketentuan keamanan. |
| **Desain Responsif & Estetika** | ✅ LULUS | Tampilan teruji pada resolusi desktop, tablet, dan smartphone dengan navigasi drawer yang responsif. |
| **Build Production** | ✅ LULUS | `npm run build` sukses 100% tanpa error TypeScript maupun linting. |

---

## 📜 Ketentuan Data & Privasi

Sesuai dengan ketentuan Undang-Undang Nomor 11 Tahun 2012 tentang Sistem Peradilan Pidana Anak (SPPA):
1. Seluruh data nama pejabat, nomor surat, dan dokumen dinas pada prototipe awal ini menggunakan **Data Simulasi Resmi** yang diberi label jelas.
2. Tidak ada foto, identitas, atau data pribadi anak binaan yang dipublikasikan secara terbuka tanpa sensor atau persetujuan yang sah.
3. Administrator instansi dapat memperbarui seluruh data dengan informasi riil kapan saja melalui panel admin yang disediakan.
