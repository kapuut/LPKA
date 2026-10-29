import { promises as fs } from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const DATA_DIR = path.join(process.cwd(), 'data');

async function seed() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  // 1. Profil Instansi LPKA Kelas II Lombok Tengah
  const profil = {
    namaInstansi: "Lembaga Pembinaan Khusus Anak Kelas II Lombok Tengah",
    namaSingkat: "LPKA Lombok Tengah",
    namaResmiKementerian: "Kementerian Hukum dan Hak Asasi Manusia Republik Indonesia - Kantor Wilayah Nusa Tenggara Barat",
    slogan: "PASTI BERSAHAJA (Bersih, Santun, Handal, dan Berkinerja)",
    sejarah: "Lembaga Pembinaan Khusus Anak (LPKA) Kelas II Lombok Tengah merupakan Unit Pelaksana Teknis (UPT) Pemasyarakatan di bawah naungan Kantor Wilayah Kementerian Hukum dan HAM Nusa Tenggara Barat. Berdasarkan Undang-Undang Nomor 11 Tahun 2012 tentang Sistem Peradilan Pidana Anak (SPPA) serta Undang-Undang Nomor 22 Tahun 2022 tentang Pemasyarakatan, LPKA bertransformasi dari pendekatan penjara konvensional menjadi lembaga perlindungan, rehabilitasi, dan pemenuhan hak-hak tumbuh kembang anak yang berhadapan dengan hukum. Berlokasi di Kabupaten Lombok Tengah, LPKA berkomitmen memberikan lingkungan asri, edukatif, dan ramah anak guna mewujudkan generasi masa depan yang mandiri, berkarakter, dan berbudi pekerti luhur.",
    visi: "Terwujudnya Pembinaan Anak Binaan yang Berkualitas, Mandiri, Berakhlak Mulia, dan Terintegrasi Kembali ke Masyarakat secara Utuh.",
    misi: [
      "Menyelenggarakan pembinaan kepribadian, kerohanian, dan budi pekerti yang ramah anak.",
      "Menjamin hak pendidikan formal, nonformal, dan pelatihan keterampilan vokasi sesuai minat dan bakat anak binaan.",
      "Memberikan pelayanan kesehatan, perawatan jasmani, dan pemenuhan nutrisi yang higienis serta layak.",
      "Menegakkan disiplin dan pengawasan yang humanis tanpa kekerasan sesuai prinsip perlindungan anak.",
      "Meningkatkan sinergi dengan instansi pemerintah, organisasi nonpemerintah, dunia usaha, dan masyarakat luas dalam reintegrasi sosial."
    ],
    tugasPokok: "Melaksanakan pembinaan, bimbingan, pengawasan, penegakan disiplin, dan perawatan bagi Anak Binaan berdasarkan peraturan perundang-undangan yang berlaku dalam rangka sistem peradilan pidana anak.",
    fungsi: [
      "Pelaksanaan registrasi, klasifikasi, dan penempatan anak binaan.",
      "Pelaksanaan pembinaan mental spiritual, budi pekerti, dan kepribadian anak.",
      "Penyelenggaraan pendidikan formal (kesetaraan Paket A, B, C) dan pelatihan kemandirian vokasi.",
      "Pelayanan kesehatan fisik, psikologis, dan perawatan dasar anak binaan.",
      "Pengawasan, pemeliharaan ketertiban, dan penegakan tata tertib internal yang humanis.",
      "Pengelolaan urusan tata usaha, kepegawaian, keuangan, dan rumah tangga kantor."
    ],
    tujuan: [
      "Membimbing anak binaan agar menyadari kekhilafan dan memperbaiki diri.",
      "Membekali anak binaan dengan sertifikasi keahlian agar mandiri pasca selesai masa pembinaan.",
      "Menjamin tidak terjadi diskriminasi, kekerasan, atau pelanggaran hak asasi anak.",
      "Mewujudkan tata kelola birokrasi yang transparan, akuntabel, dan bebas dari korupsi (WBK/WBBM)."
    ],
    tataNilai: [
      { judul: "Profesional", deskripsi: "Bekerja sesuai kompetensi, SOP kedinasan, dan etika aparatur sipil negara." },
      { judul: "Akuntabel", deskripsi: "Dapat dipertanggungjawabkan secara transparan kepada masyarakat dan negara." },
      { judul: "Sinergi", deskripsi: "Menjalin kerjasama harmonis lintas sektoral, instansi, dan masyarakat." },
      { judul: "Transparan", deskripsi: "Keterbukaan informasi publik dan akuntabilitas kinerja tanpa pungli." },
      { judul: "Inovatif", deskripsi: "Terus mengembangkan metode pembinaan modern berbasis minat dan teknologi." }
    ],
    alamat: "Jl. Pemasyarakatan No. 01, Kelurahan Prapen, Kecamatan Praya, Kabupaten Lombok Tengah, Nusa Tenggara Barat 83511",
    telepon: "(0370) 654-XXXX (Data Simulasi)",
    hotlinePengaduan: "+62 819-0700-XXXX (WhatsApp Pengaduan Resmi)",
    email: "lpka.lomboktengah@kemenkumham.go.id",
    jamLayanan: "Senin - Kamis: 08.00 - 15.00 WITA | Jumat: 08.00 - 11.30 WITA | Sabtu & Minggu: Khusus Kunjungan Terjadwal",
    koordinatPeta: {
      lat: -8.7061,
      lng: 116.2736,
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15774.20817926839!2d116.265!3d-8.706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dcdb70000000000%3A0x0!2sPraya%2C%20Lombok%20Tengah!5e0!3m2!1sid!2sid!4v1700000000000"
    },
    mediaSosial: {
      facebook: "https://facebook.com/lpkalomboktengah",
      instagram: "https://instagram.com/lpka_lomboktengah",
      twitter: "https://twitter.com/lpkaloteng",
      youtube: "https://youtube.com/@lpkalomboktengah",
      tiktok: "https://tiktok.com/@lpka_lomboktengah"
    },
    bannerHero: {
      badge: "KANTOR WILAYAH KEMENKUMHAM NUSA TENGGARA BARAT",
      judul: "Membina Masa Depan Generasi Emas Bangsa dengan Kasih Sayang & Ketegasan Humanis",
      deskripsi: "Selamat Datang di Portal Informasi Publik Resmi LPKA Kelas II Lombok Tengah. Komitmen kami mengutamakan perlindungan hak anak, pendidikan berkelanjutan, pembinaan kemandirian vokasional, dan pelayanan prima bebas pungli.",
      tombolUtamaText: "Layanan Kunjungan & Bantuan",
      tombolUtamaUrl: "/layanan",
      tombolKeduaText: "Informasi Publik (PPID)",
      tombolKeduaUrl: "/informasi-publik"
    },
    updatedAt: new Date().toISOString(),
    isDemoData: true
  };

  // 2. Data Pegawai & Struktur Organisasi (Hierarki Berjenjang)
  const pegawai = [
    {
      id: "peg-1",
      nama: "Nama Pejabat Pimpinan (Demo)",
      gelarDepan: "Drs.",
      gelarBelakang: "M.H.",
      nipDinas: "19750512 200003 1 XXX (Disensor)",
      jabatan: "Kepala LPKA Kelas II Lombok Tengah",
      unitKerja: "Pimpinan",
      level: 1,
      atasanId: null,
      urutan: 1,
      fotoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
      pangkatGolongan: "Pembina Tk. I (IV/b)",
      statusKepegawaian: "PNS",
      isPimpinan: true,
      tampilkanDiStruktur: true,
      isDemoData: true
    },
    {
      id: "peg-2",
      nama: "Nama Kasubbag Tata Usaha (Demo)",
      gelarDepan: "",
      gelarBelakang: "S.Sos.",
      nipDinas: "19810815 200501 1 XXX (Disensor)",
      jabatan: "Kepala Sub Bagian Tata Usaha",
      unitKerja: "Sub Bagian Tata Usaha",
      level: 2,
      atasanId: "peg-1",
      urutan: 2,
      fotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
      pangkatGolongan: "Penata Tk. I (III/d)",
      statusKepegawaian: "PNS",
      isPimpinan: false,
      tampilkanDiStruktur: true,
      isDemoData: true
    },
    {
      id: "peg-3",
      nama: "Nama Kasi Pembinaan (Demo)",
      gelarDepan: "",
      gelarBelakang: "S.H., M.H.",
      nipDinas: "19840320 200801 1 XXX (Disensor)",
      jabatan: "Kepala Seksi Pembinaan",
      unitKerja: "Seksi Pembinaan",
      level: 2,
      atasanId: "peg-1",
      urutan: 3,
      fotoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
      pangkatGolongan: "Penata (III/c)",
      statusKepegawaian: "PNS",
      isPimpinan: false,
      tampilkanDiStruktur: true,
      isDemoData: true
    },
    {
      id: "peg-4",
      nama: "Nama Kasi Pengawasan & Disiplin (Demo)",
      gelarDepan: "",
      gelarBelakang: "S.H.",
      nipDinas: "19830711 200604 1 XXX (Disensor)",
      jabatan: "Kepala Seksi Pengawasan & Penegakan Disiplin",
      unitKerja: "Seksi Pengawasan & Penegakan Disiplin",
      level: 2,
      atasanId: "peg-1",
      urutan: 4,
      fotoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&q=80",
      pangkatGolongan: "Penata (III/c)",
      statusKepegawaian: "PNS",
      isPimpinan: false,
      tampilkanDiStruktur: true,
      isDemoData: true
    },
    {
      id: "peg-5",
      nama: "Nama Kasi Perawatan & Pengentasan (Demo)",
      gelarDepan: "dr.",
      gelarBelakang: "M.Kes.",
      nipDinas: "19871104 201212 2 XXX (Disensor)",
      jabatan: "Kepala Seksi Perawatan & Pengentasan Anak",
      unitKerja: "Seksi Perawatan & Pengentasan Anak",
      level: 2,
      atasanId: "peg-1",
      urutan: 5,
      fotoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
      pangkatGolongan: "Penata (III/c)",
      statusKepegawaian: "PNS",
      isPimpinan: false,
      tampilkanDiStruktur: true,
      isDemoData: true
    },
    {
      id: "peg-6",
      nama: "Nama Kasubsi Pendidikan & Bimkemas (Demo)",
      gelarDepan: "",
      gelarBelakang: "S.Pd.",
      nipDinas: "19890919 201402 1 XXX (Disensor)",
      jabatan: "Kasubsi Pendidikan & Bimbingan Kemasyarakatan",
      unitKerja: "Seksi Pembinaan",
      level: 3,
      atasanId: "peg-3",
      urutan: 6,
      fotoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80",
      pangkatGolongan: "Penata Muda Tk. I (III/b)",
      statusKepegawaian: "PNS",
      isPimpinan: false,
      tampilkanDiStruktur: true,
      isDemoData: true
    },
    {
      id: "peg-7",
      nama: "Nama Kasubsi Kegiatan Kerja (Demo)",
      gelarDepan: "",
      gelarBelakang: "A.Md.P.",
      nipDinas: "19910405 201503 1 XXX (Disensor)",
      jabatan: "Kasubsi Bimbingan Kerja & Keterampilan",
      unitKerja: "Seksi Pembinaan",
      level: 3,
      atasanId: "peg-3",
      urutan: 7,
      fotoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80",
      pangkatGolongan: "Penata Muda (III/a)",
      statusKepegawaian: "PNS",
      isPimpinan: false,
      tampilkanDiStruktur: true,
      isDemoData: true
    },
    {
      id: "peg-8",
      nama: "Nama Koordinator JFT Pranata Komputer (Demo)",
      gelarDepan: "",
      gelarBelakang: "S.Kom.",
      nipDinas: "19940122 201901 1 XXX (Disensor)",
      jabatan: "Pranata Komputer Ahli Pertama / Humas",
      unitKerja: "Sub Bagian Tata Usaha",
      level: 4,
      atasanId: "peg-2",
      urutan: 8,
      fotoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=500&q=80",
      pangkatGolongan: "Penata Muda (III/a)",
      statusKepegawaian: "PNS",
      isPimpinan: false,
      tampilkanDiStruktur: true,
      isDemoData: true
    }
  ];

  // 3. Berita Terbaru
  const berita = [
    {
      id: "berita-1",
      slug: "pelatihan-keterampilan-vokasi-barista-hidroponik-anak-binaan",
      judul: "Tingkatkan Kemandirian, LPKA Kelas II Lombok Tengah Buka Pelatihan Vokasi Barista dan Budidaya Hidroponik",
      ringkasan: "Kegiatan ini diselenggarakan bekerjasama dengan Balai Latihan Kerja Lombok Tengah guna membekali anak binaan keahlian produktif siap kerja pasca menyelesaikan masa pembinaan.",
      konten: `Lombok Tengah — Dalam rangka mewujudkan pembinaan kemandirian yang berkelanjutan, Lembaga Pembinaan Khusus Anak (LPKA) Kelas II Lombok Tengah resmi menyelenggarakan program pelatihan vokasional barista dan budidaya tanaman hidroponik ramah lingkungan.

Kegiatan yang dibuka secara resmi ini merupakan salah satu komitmen institusi untuk memastikan bahwa setiap anak binaan tidak hanya mendapatkan pembinaan rohani dan budi pekerti, melainkan juga memiliki keahlian konkret yang diakui dengan sertifikat kompetensi resmi.

"Kami ingin adik-adik di sini keluar dengan kepala tegak, memiliki rasa percaya diri, dan memiliki bekal keterampilan nyata untuk kembali membangun kehidupannya di tengah masyarakat," jelas perwakilan Seksi Pembinaan LPKA.

Pelatihan ini mencakup materi teori keselamatan kerja, pengenalan teknik seduh kopi modern, manajemen stok, serta teknik instalasi nutrisi hidroponik. Pelatihan berlangsung intensif selama satu bulan dengan pendampingan instruktur profesional yang telah tersertifikasi BNSP.`,
      kategori: "Kemandirian",
      tags: ["Pelatihan", "Kemandirian", "Anak Binaan", "Vokasi", "Lombok Tengah"],
      gambarUtama: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
      captionGambar: "Suasana pengenalan keterampilan mandiri dan peralatan seduh di ruang bimbingan vokasional LPKA.",
      penulis: "Tim Humas LPKA Loteng",
      tanggalPublikasi: "2025-02-15T09:00:00Z",
      status: "published",
      jumlahDilihat: 245,
      isUtama: true,
      updatedAt: "2025-02-15T09:00:00Z",
      isDemoData: true
    },
    {
      id: "berita-2",
      slug: "penjaminan-hak-pendidikan-formal-kesetaraan-paket-c",
      judul: "Jamin Hak Pendidikan Dasar, 15 Anak Binaan LPKA Ikuti Ujian Pendidikan Kesetaraan Paket C",
      ringkasan: "Bekerjasama dengan Dinas Pendidikan Kabupaten Lombok Tengah dan PKBM mitra, seluruh anak usia sekolah di LPKA tetap terdaftar dan aktif menempuh kurikulum nasional.",
      konten: `Praya, Lombok Tengah — Lembaga Pembinaan Khusus Anak Kelas II Lombok Tengah kembali membuktikan komitmennya dalam menjamin hak konstitusional anak untuk mengenyam pendidikan. Bekerjasama dengan Pusat Kegiatan Belajar Masyarakat (PKBM) binaan Dinas Pendidikan Kabupaten Lombok Tengah, pelaksanaan Asesmen dan Ujian Kesetaraan Paket C berjalan dengan tertib dan lancar.

Pendidikan formal di LPKA diselenggarakan dengan pendekatan ramah anak, fleksibel, namun tetap berstandar kurikulum nasional merdeka belajar. Setiap anak binaan yang lulus akan memperoleh ijazah resmi yang sah untuk melanjutkan ke perguruan tinggi maupun melamar pekerjaan.

Kepala Seksi Pembinaan menegaskan bahwa masa pembinaan di LPKA bukanlah penghalang untuk meraih masa depan: "Hak atas pendidikan anak adalah hak asasi yang tidak boleh hilang oleh karena status hukum mereka."`,
      kategori: "Pendidikan",
      tags: ["Pendidikan Formal", "Paket C", "Dinas Pendidikan", "Hak Anak"],
      gambarUtama: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
      captionGambar: "Kegiatan belajar mengajar dan literasi di Pusat Belajar LPKA Lombok Tengah.",
      penulis: "Subsi Bimkemas & Pendidikan",
      tanggalPublikasi: "2025-02-10T10:30:00Z",
      status: "published",
      jumlahDilihat: 189,
      isUtama: true,
      updatedAt: "2025-02-10T10:30:00Z",
      isDemoData: true
    },
    {
      id: "berita-3",
      slug: "kunjungan-monitoring-dan-evaluasi-kanwil-kemenkumham-ntb",
      judul: "Kunjungan Kerja Tim Monev Kanwil Kemenkumham NTB Tinjau Layanan Kunjungan dan Dapur Higienis",
      ringkasan: "Peninjauan memastikan bahwa standar higienitas makanan, kebersihan blok hunian ramah anak, dan transparansi SOP layanan publik berjalan prima tanpa pungutan liar.",
      konten: `Lombok Tengah — Tim Monitoring dan Evaluasi Divisi Pemasyarakatan Kantor Wilayah Kementerian Hukum dan HAM Nusa Tenggara Barat melaksanakan peninjauan langsung ke LPKA Kelas II Lombok Tengah.

Fokus peninjauan meliputi pemeriksaan kelayakan menu makanan anak binaan pada Dapur Sehat LPKA yang telah mengantongi Sertifikat Higiene Sanitasi Pangan, pemeriksaan fasilitas ruang kunjungan ramah keluarga, serta peninjauan pos layanan terpadu satu pintu (PTSP).

Hasil evaluasi menunjukkan bahwa sarana dan prasarana di LPKA Kelas II Lombok Tengah berada dalam kondisi prima, tertata rapi, dan mengedepankan pendekatan perlindungan anak secara konsisten.`,
      kategori: "Kedinasan",
      tags: ["Kemenkumham NTB", "Monev", "Dapur Sehat", "Pelayanan Publik"],
      gambarUtama: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      captionGambar: "Peninjauan sarana prasarana dan standar mutu pelayanan publik di lingkungan kantor.",
      penulis: "Subbag Tata Usaha",
      tanggalPublikasi: "2025-02-05T14:15:00Z",
      status: "published",
      jumlahDilihat: 310,
      isUtama: false,
      updatedAt: "2025-02-05T14:15:00Z",
      isDemoData: true
    },
    {
      id: "berita-4",
      slug: "pembinaan-kerohanian-dan-karakter-moral-melalui-pengajian-rutin",
      judul: "Bangun Karakter Berakhlak, LPKA Gelar Pembinaan Rohani Rutin dan Konseling Psikososial",
      ringkasan: "Program bimbingan mental spiritual bekerjasama dengan Kementerian Agama Lombok Tengah rutin diselenggarakan setiap pekan untuk memperkuat akhlak dan kestabilan mental anak.",
      konten: `Lombok Tengah — Pembinaan kepribadian mental dan kerohanian menjadi salah satu pilar utama di LPKA Kelas II Lombok Tengah. Melalui kerjasama rutin dengan penyuluh agama dari Kantor Kementerian Agama Kabupaten Lombok Tengah serta psikolog profesional, para anak binaan mendapatkan bimbingan keagamaan sesuai keyakinan masing-masing serta sesi konseling suportif.

Bimbingan ini dirancang tidak hanya untuk transfer pengetahuan keagamaan, tetapi juga pembiasaan ibadah harian, membaca kitab suci, serta refleksi diri untuk menumbuhkan rasa empati dan kedamaian hati.`,
      kategori: "Kepribadian",
      tags: ["Kerohanian", "Konseling", "Kemenag", "Budi Pekerti"],
      gambarUtama: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
      captionGambar: "Kegiatan bimbingan motivasi dan pembinaan akhlak anak binaan bersama instruktur.",
      penulis: "Seksi Pembinaan",
      tanggalPublikasi: "2025-01-28T08:30:00Z",
      status: "published",
      jumlahDilihat: 142,
      isUtama: false,
      updatedAt: "2025-01-28T08:30:00Z",
      isDemoData: true
    }
  ];

  // 4. Pengumuman Resmi
  const pengumuman = [
    {
      id: "peng-1",
      slug: "jadwal-dan-ketentuan-layanan-kunjungan-keluarga-tatap-muka",
      judul: "Maklumat Pelayanan dan Jadwal Kunjungan Tatap Muka Ramah Anak LPKA Kelas II Lombok Tengah",
      nomorSurat: "W21.PAS.PAS.8-UM.01.01-124 (Simulasi)",
      ringkasan: "Informasi jadwal kunjungan keluarga inti, syarat dokumen (KTP & Kartu Keluarga), ketentuan pakaian sopan, dan protokol kesehatan bagi pengunjung.",
      kontenLengkap: `Diumumkan kepada seluruh keluarga/orang tua/wali dari Anak Binaan di LPKA Kelas II Lombok Tengah:

1. WAKTU KUNJUNGAN:
- Hari Selasa & Kamis : Pukul 09.00 - 11.30 WITA dan 13.30 - 15.00 WITA.
- Hari Sabtu : Pukul 09.00 - 12.00 WITA (Khusus keluarga dari luar pulau/kabupaten jauh).

2. SYARAT ADMINISTRASI:
- Membawa e-KTP / Kartu Identitas asli yang masih berlaku.
- Membawa fotokopi Kartu Keluarga (KK) yang membuktikan hubungan keluarga inti (Orang tua/Wali/Saudara kandung).
- Mendaftarkan diri di Pos Layanan Terpadu Satu Pintu (PTSP) sebelum jam batas masuk.

3. TATA TERTIB:
- Berpakaian rapi, sopan, dan tidak memakai perhiasan mencolok.
- Dilarang keras membawa senjata tajam, narkotika, obat terlarang, ponsel genggam, kamera, atau barang elektronik ke dalam area steril pembinaan.
- Seluruh layanan kunjungan ini bersifat GRATIS (BEBAS PUNGLI / RP 0). Apabila ada oknum yang meminta imbalan, segera laporkan ke hotline pengaduan resmi.`,
      kategori: "Layanan Kunjungan",
      tanggalTerbit: "2025-02-01T08:00:00Z",
      berlakuSampai: "2025-12-31T23:59:59Z",
      status: "aktif",
      lampiran: {
        namaFile: "SOP-Layanan-Kunjungan-Tatap-Muka-LPKA.pdf",
        urlFile: "/uploads/SOP-Layanan-Kunjungan-Tatap-Muka-LPKA.pdf",
        ukuran: "420 KB"
      },
      isPenting: true,
      updatedAt: "2025-02-01T08:00:00Z",
      isDemoData: true
    },
    {
      id: "peng-2",
      slug: "penerimaan-titipan-makanan-dan-barang-keperluan-anak-binaan",
      judul: "Prosedur Pemeriksaan dan Penerimaan Titipan Makanan & Pakaian Bersih untuk Anak Binaan",
      nomorSurat: "W21.PAS.PAS.8-PK.02.02-88 (Simulasi)",
      ringkasan: "Ketentuan jenis makanan yang diperbolehkan, wadah transparan, dan jadwal loket penerimaan titipan makanan di LPKA Lombok Tengah.",
      kontenLengkap: `Guna menjaga keamanan, kebersihan, dan kesehatan seluruh anak binaan:

1. Loket penerimaan titipan dibuka setiap hari kerja pukul 08.30 - 14.30 WITA.
2. Makanan yang dititipkan wajib menggunakan wadah plastik transparan/kotak makan bening agar memudahkan pemeriksaan fisik oleh petugas pemeriksa.
3. Makanan olahan tidak mengandung bahan berbahaya, tidak berkulit keras atau berduri tajam, dan tidak berkuah berlebih.
4. Pakaian yang dititipkan adalah pakaian santai tanpa tali panjang atau benda logam tajam.
5. Pemeriksaan dilakukan di depan pihak pengantar barang untuk menjamin transparansi.`,
      kategori: "Titipan Barang",
      tanggalTerbit: "2025-01-20T08:00:00Z",
      berlakuSampai: "2025-12-31T23:59:59Z",
      status: "aktif",
      lampiran: {
        namaFile: "Ketentuan-Titipan-Makanan-LPKA.pdf",
        urlFile: "/uploads/Ketentuan-Titipan-Makanan-LPKA.pdf",
        ukuran: "310 KB"
      },
      isPenting: false,
      updatedAt: "2025-01-20T08:00:00Z",
      isDemoData: true
    },
    {
      id: "peng-3",
      slug: "layanan-pengaduan-masyarakat-kanal-sp4n-lapor-dan-pos-wbs",
      judul: "Kanal Resmi Pengaduan Masyarakat, Pos Yankomas, dan Whistleblowing System (WBS)",
      nomorSurat: "W21.PAS.PAS.8-PW.01.02-09 (Simulasi)",
      ringkasan: "Komitmen Wilayah Bebas Korupsi (WBK) LPKA Lombok Tengah dengan membuka saluran pengaduan langsung bagi masyarakat.",
      kontenLengkap: `LPKA Kelas II Lombok Tengah berkomitmen menyelenggarakan pelayanan publik yang bersih, melayani, dan transparan. Masyarakat dapat menyampaikan kritik, saran, maupun laporan pelanggaran melalui:

1. WhatsApp Khusus Pengaduan: +62 819-0700-XXXX
2. Portal Nasional SP4N LAPOR!: www.lapor.go.id
3. Aplikasi WBS Kemenkumham: wbs.kemenkumham.go.id
4. Pos Pelayanan Komunikasi Masyarakat (Yankomas) di area PTSP LPKA.

Seluruh identitas pelapor dijamin kerahasiaannya sesuai ketentuan undang-undang perlindungan saksi dan pelapor.`,
      kategori: "Pengaduan",
      tanggalTerbit: "2025-01-10T08:00:00Z",
      status: "aktif",
      isPenting: true,
      updatedAt: "2025-01-10T08:00:00Z",
      isDemoData: true
    }
  ];

  // 5. Informasi Publik (PPID)
  const informasiPublik = [
    {
      id: "doc-1",
      judul: "Laporan Kinerja Instansi Pemerintah (LKjIP) LPKA Kelas II Lombok Tengah Tahun 2024 (Data Simulasi)",
      kategori: "berkala",
      jenisDokumen: "Laporan Kinerja",
      nomorDokumen: "LKjIP/LPKA.LOTENG/2024/01",
      tahun: "2024",
      deskripsi: "Dokumen pertanggungjawaban akuntabilitas kinerja penyelenggaraan tugas pokok dan fungsi pembinaan pemasyarakatan anak selama tahun anggaran 2024.",
      penanggungJawab: "Subbagian Tata Usaha / PPID Pelaksana",
      urlFile: "/uploads/LKjIP-LPKA-Lombok-Tengah-2024-Demo.pdf",
      ukuranFile: "2.4 MB",
      tipeFile: "PDF",
      tanggalDiupload: "2025-01-25T10:00:00Z",
      jumlahUnduh: 128,
      isDemoData: true
    },
    {
      id: "doc-2",
      judul: "Rencana Strategis (Renstra) LPKA Kelas II Lombok Tengah Periode 2020-2024 (Data Simulasi)",
      kategori: "berkala",
      jenisDokumen: "Rencana Kerja",
      nomorDokumen: "RENSTRA-LPKA-LT/2020-2024",
      tahun: "2024",
      deskripsi: "Rencana strategis jangka menengah yang memuat arah kebijakan, target pembinaan anak binaan, dan peningkatan mutu tata kelola.",
      penanggungJawab: "Tim Penyusun Renstra LPKA",
      urlFile: "/uploads/Renstra-LPKA-Lombok-Tengah-Demo.pdf",
      ukuranFile: "1.8 MB",
      tipeFile: "PDF",
      tanggalDiupload: "2024-03-12T09:00:00Z",
      jumlahUnduh: 95,
      isDemoData: true
    },
    {
      id: "doc-3",
      judul: "Standar Operasional Prosedur (SOP) Layanan Kunjungan Ramah Anak dan Integrasi Sosial (Data Simulasi)",
      kategori: "setiap_saat",
      jenisDokumen: "SOP",
      nomorDokumen: "SOP/LPKA.LOTENG/BIM/014",
      tahun: "2024",
      deskripsi: "Pedoman tata cara teknis pelaksanaan pelayanan kunjungan keluarga, video call anak binaan, dan pengurusan integrasi CB/PB/CMB.",
      penanggungJawab: "Seksi Pembinaan",
      urlFile: "/uploads/SOP-Layanan-Kunjungan-dan-Integrasi-Demo.pdf",
      ukuranFile: "980 KB",
      tipeFile: "PDF",
      tanggalDiupload: "2024-05-18T11:00:00Z",
      jumlahUnduh: 312,
      isDemoData: true
    },
    {
      id: "doc-4",
      judul: "Maklumat Pelayanan Informasi Publik dan Hak Pemohon Informasi (Data Simulasi)",
      kategori: "serta_merta",
      jenisDokumen: "Regulasi",
      nomorDokumen: "MAKLUMAT-PPID-LPKA-01",
      tahun: "2024",
      deskripsi: "Pernyataan kesanggupan jajaran LPKA Kelas II Lombok Tengah dalam melaksanakan pelayanan informasi publik sesuai amanat UU No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik.",
      penanggungJawab: "PPID LPKA Lombok Tengah",
      urlFile: "/uploads/Maklumat-Pelayanan-PPID-LPKA-Demo.pdf",
      ukuranFile: "540 KB",
      tipeFile: "PDF",
      tanggalDiupload: "2024-02-10T08:30:00Z",
      jumlahUnduh: 164,
      isDemoData: true
    },
    {
      id: "doc-5",
      judul: "Ringkasan Rencana Kerja dan DIPA Petikan Anggaran LPKA Kelas II Lombok Tengah (Data Simulasi)",
      kategori: "berkala",
      jenisDokumen: "DIPA/Anggaran",
      nomorDokumen: "SP-DIPA-013.05.2.XXXXXX/2024",
      tahun: "2024",
      deskripsi: "Transparansi alokasi anggaran belanja pegawai, belanja barang operasional pembinaan anak, dan pemeliharaan gedung dinas.",
      penanggungJawab: "Pengelola Keuangan / KPA",
      urlFile: "/uploads/Ringkasan-DIPA-LPKA-2024-Demo.pdf",
      ukuranFile: "1.2 MB",
      tipeFile: "PDF",
      tanggalDiupload: "2024-01-15T09:30:00Z",
      jumlahUnduh: 88,
      isDemoData: true
    }
  ];

  // 6. Layanan Publik Terpadu
  const layanan = [
    {
      id: "layanan-1",
      slug: "layanan-kunjungan-tatap-muka",
      namaLayanan: "Layanan Kunjungan Tatap Muka Ramah Anak",
      kategori: "Kunjungan",
      deskripsiSingkat: "Fasilitas temu keluarga kandung bagi anak binaan di ruang kunjungan ramah anak yang bersih, sejuk, dan diawasi secara santun.",
      persyaratan: [
        "Membawa e-KTP asli pengunjung yang masih berlaku.",
        "Fotokopi Kartu Keluarga (KK) yang membuktikan hubungan darah (orang tua, wali sah, atau saudara kandung).",
        "Telah terdaftar dalam buku daftar pengunjung resmi.",
        "Mematuhi tata tertib pakaian sopan dan penitipan barang bawaan di loker aman."
      ],
      prosedur: [
        { langkah: 1, judul: "Pengambilan Nomor Antrean & Registrasi", keterangan: "Pengunjung datang ke Pos PTSP, mengambil antrean dan menyerahkan KTP & KK untuk diverifikasi sistem database pemasyarakatan." },
        { langkah: 2, judul: "Pemberian Kartu Visitor & Titipan Barang", keterangan: "Pengunjung menitipkan ponsel, tas, dan jaket di loker penitipan gratis dan menerima kartu pengenal tamu." },
        { langkah: 3, judul: "Pemeriksaan Keamanan (Body Checking)", keterangan: "Pemeriksaan badan secara santun menggunakan metal detector oleh petugas dengan jenis kelamin yang sama." },
        { langkah: 4, judul: "Pelaksanaan Temu Keluarga", keterangan: "Pengunjung dipersilakan masuk ke ruang temu keluarga ramah anak dengan durasi maksimal 30 menit per sesi." }
      ],
      jadwalLayanan: "Selasa & Kamis (09.00 - 11.30 & 13.30 - 15.00 WITA) | Sabtu (09.00 - 12.00 WITA)",
      biaya: "GRATIS / Rp 0 (Bebas Pungutan Liar)",
      waktuPenyelesaian: "Maksimal 15 menit proses registrasi antrean",
      penanggungJawab: "Seksi Pengawasan & Penegakan Disiplin",
      kontakPetugas: "(0370) 654-XXXX / WA: +62 819-0700-XXXX",
      isAktif: true,
      isDemoData: true
    },
    {
      id: "layanan-2",
      slug: "layanan-kunjungan-online-video-call",
      namaLayanan: "Layanan Video Call Ramah Anak (Kunjungan Online)",
      kategori: "Kunjungan",
      deskripsiSingkat: "Layanan panggilan video daring gratis khusus bagi keluarga anak binaan yang berdomisili di luar Lombok atau berhalangan hadir langsung karena kondisi fisik.",
      persyaratan: [
        "Nomor WhatsApp aktif keluarga inti yang telah didaftarkan dan diverifikasi petugas wali anak.",
        "Foto e-KTP dan KK yang dikirimkan via WhatsApp layanan sebelum jadwal panggilan.",
        "Anak binaan yang bersangkutan berkelakuan baik dan tidak sedang dalam masa isolasi sanksi disiplin."
      ],
      prosedur: [
        { langkah: 1, judul: "Pendaftaran Online", keterangan: "Keluarga mendaftarkan permohonan video call melalui WhatsApp resmi paling lambat H-1." },
        { langkah: 2, judul: "Verifikasi Berkas", keterangan: "Petugas memeriksa kesesuaian identitas pemohon dengan data wali anak binaan." },
        { langkah: 3, judul: "Penjadwalan Panggilan", keterangan: "Petugas memberikan konfirmasi tautan/jam panggilan video." },
        { langkah: 4, judul: "Pelaksanaan Panggilan", keterangan: "Anak binaan melakukan video call di bilik komputer khusus dengan pendampingan petugas selama 15 menit." }
      ],
      jadwalLayanan: "Senin, Rabu, dan Jumat: Pukul 09.30 - 11.30 WITA",
      biaya: "GRATIS / Rp 0",
      waktuPenyelesaian: "Sesuai jadwal sesi yang disetujui",
      penanggungJawab: "Subbagian Tata Usaha & Pranata Komputer",
      kontakPetugas: "WA Khusus Video Call: +62 819-0700-XXXX",
      isAktif: true,
      isDemoData: true
    },
    {
      id: "layanan-3",
      slug: "layanan-titipan-makanan-dan-barang",
      namaLayanan: "Layanan Penitipan Makanan & Barang Kebutuhan",
      kategori: "Penitipan",
      deskripsiSingkat: "Penerimaan titipan makanan sehat siap saji, buah-buahan segar, dan perlengkapan mandi/pakaian dari keluarga.",
      persyaratan: [
        "KTP asli pengantar barang.",
        "Makanan dikemas dalam wadah plastik transparan/kotak bening.",
        "Tidak menyertakan benda tajam, kaca, kaleng, rokok, atau bahan cair mencurigakan."
      ],
      prosedur: [
        { langkah: 1, judul: "Pendaftaran Titipan", keterangan: "Menyerahkan identitas diri dan mengisi formulir daftar barang bawaan di loket PTSP." },
        { langkah: 2, judul: "Pemeriksaan Fisik Terbuka", keterangan: "Petugas membuka dan memeriksa isi makanan di depan pengantar secara transparan." },
        { langkah: 3, judul: "Pemberian Tanda Terima", keterangan: "Pengantar menerima bukti serah terima titipan." },
        { langkah: 4, judul: "Penyaluran ke Anak Binaan", keterangan: "Petugas mendistribusikan titipan kepada anak binaan yang bersangkutan pada hari yang sama." }
      ],
      jadwalLayanan: "Senin - Jumat: Pukul 08.30 - 14.30 WITA",
      biaya: "GRATIS / Rp 0",
      waktuPenyelesaian: "10 - 15 menit proses pemeriksaan",
      penanggungJawab: "Petugas Pintu Utama (P2U) & Kasi Perawatan",
      kontakPetugas: "Loket PTSP LPKA",
      isAktif: true,
      isDemoData: true
    },
    {
      id: "layanan-4",
      slug: "layanan-pengusulan-hak-integrasi-pb-cb-cmb",
      namaLayanan: "Layanan Integrasi Pembebasan Bersyarat (PB) & Cuti Bersyarat (CB)",
      kategori: "Integrasi & Pembebasan",
      deskripsiSingkat: "Proses pengusulan hak bersyarat anak binaan yang telah memenuhi syarat substantif dan administratif tanpa dipungut biaya apapun.",
      persyaratan: [
        "Telah menjalani masa pidana sesuai ketentuan undang-undang SPPA.",
        "Surat jaminan dari orang tua / wali yang diketahui Kepala Desa / Lurah setempat.",
        "Surat Keterangan Litmas (Penelitian Kemasyarakatan) dari Balai Pemasyarakatan (Bapas).",
        "Laporan perkembangan pembinaan (PPK) anak berkelakuan baik dan aktif mengikuti kegiatan.",
        "Fotokopi KTP dan KK penjamin."
      ],
      prosedur: [
        { langkah: 1, judul: "Pemeriksaan Masa Pidana", keterangan: "Petugas registrasi memeriksa anak yang telah memenuhi syarat 1/2 atau 2/3 masa pidana." },
        { langkah: 2, judul: "Permintaan Litmas ke Bapas", keterangan: "LPKA mengirim surat permohonan penelitian kemasyarakatan ke Bapas terdekat." },
        { langkah: 3, judul: "Sidang TPP (Tim Pengamat Pemasyarakatan)", keterangan: "Sidang anggota TPP untuk menilai kelayakan usulan integrasi anak binaan." },
        { langkah: 4, judul: "Penerbitan SK Integrasi Melalui SPPA Online", keterangan: "Pengusulan melalui Sistem Database Pemasyarakatan (SDP) hingga terbit Surat Keputusan resmi." }
      ],
      jadwalLayanan: "Senin - Jumat: Pukul 08.00 - 15.00 WITA",
      biaya: "GRATIS / Rp 0 (Sepenuhnya Dibiayai Negara)",
      waktuPenyelesaian: "Sesuai alur verifikasi SDP dan penerbitan SK Ditjenpas",
      penanggungJawab: "Seksi Pembinaan / Subsi Bimkemas",
      kontakPetugas: "Hotline Integrasi: +62 819-0700-XXXX",
      isAktif: true,
      isDemoData: true
    },
    {
      id: "layanan-5",
      slug: "layanan-pengaduan-dan-bantuan-hukum",
      namaLayanan: "Layanan Pengaduan Masyarakat & Konsultasi Bantuan Hukum",
      kategori: "Pengaduan",
      deskripsiSingkat: "Saluran pengaduan masyarakat atas dugaan penyimpangan layanan, gratifikasi, serta fasilitas konsultasi bantuan hukum pro bono bagi anak binaan kurang mampu.",
      persyaratan: [
        "KTP/Identitas pelapor atau pemohon bantuan hukum.",
        "Uraian kronologi kejadian atau salinan surat perkara yang membutuhkan pendampingan.",
        "Bukti pendukung bila mengajukan laporan aduan (foto/dokumen jika ada)."
      ],
      prosedur: [
        { langkah: 1, judul: "Penyampaian Laporan", keterangan: "Pelapor dapat datang langsung ke Pos Yankomas PTSP atau melapor via WhatsApp / SP4N LAPOR." },
        { langkah: 2, judul: "Registrasi dan Verifikasi", keterangan: "Laporan diregistrasi dan dijamin kerahasiaan identitas pelapornya." },
        { langkah: 3, judul: "Tindak Lanjut & Klarifikasi", keterangan: "Tim pemeriksa internal melakukan penelaahan dalam waktu maksimal 3x24 jam." },
        { langkah: 4, judul: "Penyampaian Respon Resmi", keterangan: "Hasil tindak lanjut disampaikan kembali kepada pihak pelapor." }
      ],
      jadwalLayanan: "Setiap Hari Kerja & Online 24 Jam via Kanal Digital",
      biaya: "GRATIS / Rp 0",
      waktuPenyelesaian: "Maksimal 3 hari kerja respon awal",
      penanggungJawab: "Tim Pengaduan & PPID LPKA",
      kontakPetugas: "WA Pengaduan: +62 819-0700-XXXX | Email: lpka.lomboktengah@kemenkumham.go.id",
      isAktif: true,
      isDemoData: true
    }
  ];

  // 7. Galeri Dokumentasi Kegiatan
  const galeri = [
    {
      id: "galeri-1",
      judul: "Kegiatan Pelatihan Vokasi Barista dan Pengenalan Mesin Kopi",
      kategori: "Pelatihan Kemandirian",
      tanggal: "2025-02-14",
      fotoUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
      keterangan: "Pembekalan keterampilan meracik minuman kopi bagi anak binaan bersama instruktur tersertifikasi.",
      lokasi: "Ruang Workshop Vokasi LPKA Lombok Tengah",
      isDemoData: true
    },
    {
      id: "galeri-2",
      judul: "Proses Pembelajaran Mandiri & Literasi di Perpustakaan Ramah Anak",
      kategori: "Pendidikan",
      tanggal: "2025-02-10",
      fotoUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
      keterangan: "Penyediaan buku bacaan edukatif, ensiklopedia, dan bahan pelajaran kurikulum merdeka.",
      lokasi: "Perpustakaan Pustaka Ceria LPKA",
      isDemoData: true
    },
    {
      id: "galeri-3",
      judul: "Olahraga Bersama dan Senam Pagi Menjaga Kebugaran Jasmani",
      kategori: "Olahraga & Seni",
      tanggal: "2025-02-07",
      fotoUrl: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80",
      keterangan: "Senam kesegaran jasmani dipandu instruktur untuk meningkatkan daya tahan tubuh anak binaan.",
      lokasi: "Lapangan Olahraga Serbaguna LPKA",
      isDemoData: true
    },
    {
      id: "galeri-4",
      judul: "Budi Daya Sayuran Segar Metode Hidroponik Ramah Lingkungan",
      kategori: "Pelatihan Kemandirian",
      tanggal: "2025-01-25",
      fotoUrl: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80",
      keterangan: "Panen perdana selada dan sawi pakcoy hasil kebun percontohan anak binaan.",
      lokasi: "Greenhouse Hidroponik LPKA Lombok Tengah",
      isDemoData: true
    },
    {
      id: "galeri-5",
      judul: "Pemeriksaan Kesehatan dan Konsultasi Gizi oleh Tim Medis",
      kategori: "Pembinaan Kepribadian",
      tanggal: "2025-01-18",
      fotoUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
      keterangan: "Pemeriksaan berkala dokter poliklinik LPKA untuk memastikan tumbuh kembang jasmani anak sehat.",
      lokasi: "Klinik Pratama LPKA",
      isDemoData: true
    },
    {
      id: "galeri-6",
      judul: "Pentas Seni Musik Tradisional dan Rebana Binaan Kerohanian",
      kategori: "Olahraga & Seni",
      tanggal: "2025-01-12",
      fotoUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
      keterangan: "Penyaluran bakat musikalitas dan olah vokal anak binaan dalam perayaan hari besar keagamaan.",
      lokasi: "Aula Serbaguna Sasambo LPKA",
      isDemoData: true
    }
  ];

  // 8. Pengaturan Website & Statistik Resmi
  const pengaturan = {
    namaWebsite: "Portal Resmi LPKA Kelas II Lombok Tengah",
    deskripsiWebsite: "Sistem Informasi Publik Resmi Lembaga Pembinaan Khusus Anak Kelas II Lombok Tengah, Kanwil Kemenkumham NTB.",
    modePenyimpanan: "local",
    kontenBeranda: {
      tampilkanPengumumanPenting: true,
      tampilkanStatistik: true,
      tampilkanLayananCepat: true,
      tampilkanGaleri: true,
      maxBeritaTampil: 3
    },
    statistikLPKA: [
      { label: "Anak Binaan Dididik", nilai: "28", keterangan: "Aktif dalam program pembinaan", icon: "Users" },
      { label: "Kelulusan Paket Kesetaraan", nilai: "100%", keterangan: "Terdaftar kurikulum pendidikan", icon: "GraduationCap" },
      { label: "Program Vokasi Bersertifikat", nilai: "4", keterangan: "Barista, Hidroponik, Pertukangan, Las", icon: "Award" },
      { label: "Indeks Kepuasan Layanan", nilai: "4.89 / 5.0", keterangan: "Bebas Pungli & Korupsi (WBK)", icon: "ShieldCheck" }
    ],
    pesanDisclaimerDemo: "CATATAN PROTOTIPE RESMI: Seluruh data nama pejabat, NIP, nomor surat, dan dokumen dinas pada prototipe ini bertanda (Data Simulasi / Prototipe). Data riil dapat diperbarui oleh pengelola melalui Panel Admin terintegrasi tanpa database relasional.",
    updatedAt: new Date().toISOString()
  };

  // 9. Admin User Awal (Secure Bcrypt Hash)
  const passwordHash = await bcrypt.hash("LpkaLoteng2025!*", 10);
  const adminUsers = [
    {
      id: "admin-init-1",
      username: "admin",
      passwordHash: passwordHash,
      name: "Administrator Resmi (Demo)",
      email: "admin.lpkaloteng@kemenkumham.go.id",
      role: "superadmin",
      createdAt: new Date().toISOString()
    }
  ];

  // 10. Initial Audit Logs
  const auditLogs = [
    {
      id: "log-seed-1",
      timestamp: new Date().toISOString(),
      username: "system",
      aksi: "SETUP",
      entitas: "Sistem",
      keterangan: "Inisialisasi sistem penyimpanan berkas dan penyemaian data awal prototipe LPKA Kelas II Lombok Tengah.",
      ipAddress: "127.0.0.1"
    }
  ];

  // Write all files
  await fs.writeFile(path.join(DATA_DIR, 'profil.json'), JSON.stringify(profil, null, 2), 'utf-8');
  await fs.writeFile(path.join(DATA_DIR, 'pegawai.json'), JSON.stringify(pegawai, null, 2), 'utf-8');
  await fs.writeFile(path.join(DATA_DIR, 'berita.json'), JSON.stringify(berita, null, 2), 'utf-8');
  await fs.writeFile(path.join(DATA_DIR, 'pengumuman.json'), JSON.stringify(pengumuman, null, 2), 'utf-8');
  await fs.writeFile(path.join(DATA_DIR, 'informasi-publik.json'), JSON.stringify(informasiPublik, null, 2), 'utf-8');
  await fs.writeFile(path.join(DATA_DIR, 'layanan.json'), JSON.stringify(layanan, null, 2), 'utf-8');
  await fs.writeFile(path.join(DATA_DIR, 'galeri.json'), JSON.stringify(galeri, null, 2), 'utf-8');
  await fs.writeFile(path.join(DATA_DIR, 'pengaturan.json'), JSON.stringify(pengaturan, null, 2), 'utf-8');
  await fs.writeFile(path.join(DATA_DIR, 'admin-users.json'), JSON.stringify(adminUsers, null, 2), 'utf-8');
  await fs.writeFile(path.join(DATA_DIR, 'audit-log.json'), JSON.stringify(auditLogs, null, 2), 'utf-8');

  // Also ensure public/uploads directory exists
  const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');
  await fs.mkdir(UPLOADS_DIR, { recursive: true });

  console.log('Seed data successfully created in data/ directory!');
}

seed().catch(console.error);
