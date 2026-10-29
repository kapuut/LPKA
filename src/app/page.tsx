import React from 'react';
import Link from 'next/link';
import PublicLayout from '@/components/PublicLayout';
import {
  getProfil,
  getBeritaList,
  getPengumumanList,
  getLayananList,
  getGaleriList,
  getPengaturan
} from '@/lib/storage';
import {
  ShieldCheck,
  Award,
  Users,
  GraduationCap,
  Calendar,
  ChevronRight,
  ArrowRight,
  FileText,
  Bell,
  Clock,
  Sparkles,
  HeartHandshake,
  BookOpen,
  Coffee,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Phone
} from 'lucide-react';

export default async function HomePage() {
  const profil = await getProfil();
  const beritaList = await getBeritaList();
  const pengumumanList = await getPengumumanList();
  const layananList = await getLayananList();
  const galeriList = await getGaleriList();
  const pengaturan = await getPengaturan();

  // Published filter
  const beritaTampil = beritaList
    .filter(b => b.status === 'published')
    .slice(0, pengaturan.kontenBeranda?.maxBeritaTampil || 3);

  const pengumumanAktif = pengumumanList
    .filter(p => p.status === 'aktif')
    .slice(0, 3);

  const pengumumanPenting = pengumumanList.find(p => p.status === 'aktif' && p.isPenting);

  const layananTampil = layananList.filter(l => l.isAktif).slice(0, 4);
  const galeriTampil = galeriList.slice(0, 4);

  return (
    <PublicLayout>
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-br from-[#091326] via-[#0f2042] to-[#1e3a8a] text-white overflow-hidden py-16 lg:py-24">
        {/* Subtle geometric background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Slogan & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900/60 border border-blue-700/50 text-blue-200 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{profil.bannerHero?.badge || 'KANTOR WILAYAH KEMENKUMHAM NTB'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
                {profil.bannerHero?.judul || 'Membina Masa Depan Generasi Emas Bangsa dengan Kasih Sayang & Ketegasan Humanis'}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                {profil.bannerHero?.deskripsi || 'Selamat Datang di Portal Informasi Publik Resmi LPKA Kelas II Lombok Tengah.'}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href={profil.bannerHero?.tombolUtamaUrl || '/layanan'}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-lg shadow-red-900/30 transition transform hover:-translate-y-0.5"
                >
                  <span>{profil.bannerHero?.tombolUtamaText || 'Layanan Kunjungan & Bantuan'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={profil.bannerHero?.tombolKeduaUrl || '/informasi-publik'}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-white font-medium text-sm border border-slate-700 backdrop-blur transition"
                >
                  <span>{profil.bannerHero?.tombolKeduaText || 'Informasi Publik (PPID)'}</span>
                </Link>
              </div>

              {/* Anti-Corruption & Quality Badge */}
              <div className="pt-4 flex items-center gap-4 text-xs text-slate-400 border-t border-slate-800/80">
                <div className="flex items-center gap-1.5 text-amber-300">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Pelayanan Bebas Pungli (Rp 0)</span>
                </div>
                <span className="text-slate-600">•</span>
                <div className="flex items-center gap-1.5 text-emerald-300">
                  <Award className="w-4 h-4" />
                  <span>Zona Integritas Menuju WBK</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Feature Card */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/15 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                      Tata Nilai Instansi
                    </span>
                    <h3 className="text-xl font-bold text-white mt-0.5">
                      PASTI BERSAHAJA
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                    <Sparkles className="w-6 h-6" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-white">Lingkungan Ramah Anak</h4>
                      <p className="text-xs text-slate-300">Fasilitas pembinaan yang aman, bersih, dan bebas dari tindak kekerasan.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-white">Pendidikan Berkesinambungan</h4>
                      <p className="text-xs text-slate-300">Jaminan hak bersekolah melalui program pendidikan kesetaraan Paket A, B, dan C.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-white">Vokasi & Keterampilan Mandiri</h4>
                      <p className="text-xs text-slate-300">Pelatihan barista, budidaya hidroponik, dan pertukangan siap kerja bersertifikat.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/profil"
                    className="block text-center py-2.5 px-4 rounded-lg bg-blue-600/60 hover:bg-blue-600 text-xs font-semibold text-white transition border border-blue-400/30"
                  >
                    Pelajari Sejarah, Visi & Misi Selengkapnya →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Important Announcement Highlight Banner */}
      {pengumumanPenting && (
        <section className="bg-red-50 border-b border-red-200 py-3.5 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 bg-red-600 text-white text-xs font-bold rounded uppercase tracking-wider flex-shrink-0">
                Penting
              </span>
              <p className="text-sm font-medium text-red-900 line-clamp-1">
                {pengumumanPenting.judul}
              </p>
            </div>
            <Link
              href={`/pengumuman/${pengumumanPenting.slug}`}
              className="text-xs font-bold text-red-700 hover:text-red-900 flex items-center gap-1 flex-shrink-0 underline"
            >
              <span>Baca Selengkapnya</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      )}

      {/* 3. Statistics Section */}
      {pengaturan.kontenBeranda?.tampilkanStatistik && (
        <section className="bg-white py-12 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {(pengaturan.statistikLPKA || []).map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 hover:shadow-md transition text-center"
                >
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#0f2042] tracking-tight">
                    {stat.nilai}
                  </div>
                  <div className="text-sm font-semibold text-slate-800 mt-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {stat.keterangan}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Quick Services Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                Pelayanan Terpadu Satu Pintu (PTSP)
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2042] mt-1">
                Layanan Publik LPKA Kelas II Lombok Tengah
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Seluruh pelayanan kunjungan dan pembinaan diberikan secara transparan dan bebas biaya (Rp 0).
              </p>
            </div>
            <Link
              href="/layanan"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900 transition flex-shrink-0"
            >
              <span>Lihat Semua Layanan</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {layananTampil.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-lg mb-4 group-hover:bg-[#0f2042] group-hover:text-white transition">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {item.kategori}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-2 line-clamp-2 group-hover:text-blue-700 transition">
                    {item.namaLayanan}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {item.deskripsiSingkat}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-600">
                    {item.biaya}
                  </span>
                  <Link
                    href={`/layanan/${item.slug}`}
                    className="text-xs font-bold text-slate-700 hover:text-blue-700 flex items-center gap-1"
                  >
                    <span>SOP & Syarat</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Core Rehabilitation Programs Highlight */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
              Pilar Pembinaan Anak Binaan
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2042] mt-1">
              Program Unggulan Perlindungan & Kemandirian
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Sistem Peradilan Pidana Anak (UU No. 11/2012) mewajibkan pendekatan edukasi, rehabilitasi, dan integrasi kemasyarakatan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition">
              <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Pendidikan Formal</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Penyelenggaraan sekolah kesetaraan Paket A, B, dan C bekerjasama dengan Dinas Pendidikan untuk menjamin ijazah kelulusan sah anak binaan.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-400 transition">
              <div className="w-12 h-12 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Pelatihan Vokasi Barista</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Keterampilan meracik kopi modern dan budidaya tanaman pangan hidroponik sebagai bekal profesi mandiri pasca selesai masa pidana.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-400 transition">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Bimbingan Kerohanian</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pembinaan mental spiritual, tahfidz Al-Qur'an, dan pengajian rutin bekerjasama dengan Kantor Kementerian Agama Kabupaten Lombok Tengah.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-400 transition">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center mb-4">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Konseling & Psikososial</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pendampingan psikologis berkala untuk memulihkan trauma, melatih pengendalian emosi, dan membangun relasi sosial yang sehat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. News & Announcements Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Latest News (8 cols) */}
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                    Publikasi Terkini
                  </span>
                  <h2 className="text-2xl font-extrabold text-[#0f2042]">
                    Berita & Kegiatan Instansi
                  </h2>
                </div>
                <Link
                  href="/berita"
                  className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                >
                  <span>Arsip Berita</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {beritaTampil.map((b, idx) => (
                  <article
                    key={b.id}
                    className={`bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col ${
                      idx === 0 ? 'md:col-span-2 md:flex-row' : ''
                    }`}
                  >
                    <div
                      className={`relative bg-slate-200 ${
                        idx === 0 ? 'md:w-1/2 h-52 md:h-auto min-h-[200px]' : 'h-48'
                      }`}
                    >
                      <img
                        src={b.gambarUtama}
                        alt={b.judul}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 bg-[#0f2042]/90 text-white text-[10px] font-semibold px-2.5 py-1 rounded">
                        {b.kategori}
                      </span>
                    </div>
                    <div className={`p-5 flex-1 flex flex-col justify-between ${idx === 0 ? 'md:w-1/2' : ''}`}>
                      <div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            {new Date(b.tanggalPublikasi).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <h3 className="font-bold text-slate-900 hover:text-blue-700 transition line-clamp-2 text-base leading-snug">
                          <Link href={`/berita/${b.slug}`}>
                            {b.judul}
                          </Link>
                        </h3>
                        <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                          {b.ringkasan}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500">{b.penulis}</span>
                        <Link
                          href={`/berita/${b.slug}`}
                          className="font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                        >
                          <span>Selengkapnya</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Right: Announcements & PPID Shortcut (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Announcements Box */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-amber-500" />
                    <h3 className="font-bold text-slate-900 text-sm">Pengumuman Resmi</h3>
                  </div>
                  <Link
                    href="/pengumuman"
                    className="text-xs text-blue-600 hover:underline font-medium"
                  >
                    Semua
                  </Link>
                </div>

                <div className="divide-y divide-slate-100 mt-2">
                  {pengumumanAktif.map((p) => (
                    <div key={p.id} className="py-3.5 space-y-1">
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span>
                          {new Date(p.tanggalTerbit).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                        <span>•</span>
                        <span className="text-amber-600 font-medium">{p.kategori}</span>
                      </div>
                      <h4 className="text-xs font-semibold text-slate-800 hover:text-blue-700 transition line-clamp-2">
                        <Link href={`/pengumuman/${p.slug}`}>
                          {p.judul}
                        </Link>
                      </h4>
                    </div>
                  ))}
                </div>
              </div>

              {/* PPID Portal Banner Card */}
              <div className="bg-gradient-to-br from-[#0f2042] to-[#1e3a8a] text-white rounded-xl p-6 shadow-md space-y-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-amber-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">
                    Pejabat Pengelola Informasi & Dokumentasi (PPID)
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Akses Daftar Informasi Publik, laporan akuntabilitas kinerja (LKjIP), serta formulir permohonan informasi secara daring.
                  </p>
                </div>
                <Link
                  href="/informasi-publik"
                  className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition"
                >
                  Buka Portal PPID LPKA
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Gallery Documentation Preview */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                Dokumentasi Kegiatan
              </span>
              <h2 className="text-2xl font-extrabold text-[#0f2042]">
                Galeri Pembinaan & Kehidupan Anak Binaan
              </h2>
            </div>
            <Link
              href="/galeri"
              className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
            >
              <span>Lihat Semua Galeri</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galeriTampil.map((g) => (
              <div
                key={g.id}
                className="group relative h-48 rounded-xl overflow-hidden bg-slate-200 shadow-sm border border-slate-200"
              >
                <img
                  src={g.fotoUrl}
                  alt={g.judul}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end text-white">
                  <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider">
                    {g.kategori}
                  </span>
                  <h4 className="text-xs font-bold line-clamp-2 mt-0.5">
                    {g.judul}
                  </h4>
                  <span className="text-[10px] text-slate-300 mt-1">
                    {new Date(g.tanggal).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
