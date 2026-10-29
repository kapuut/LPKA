import React from 'react';
import PublicLayout from '@/components/PublicLayout';
import Breadcrumb from '@/components/Breadcrumb';
import { getProfil } from '@/lib/storage';
import {
  Building2,
  Target,
  ShieldCheck,
  CheckCircle2,
  Users,
  Compass,
  FileCheck2,
  Sparkles,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Profil Instansi, Visi & Misi',
  description: 'Sejarah, Visi, Misi, Tugas Pokok dan Fungsi Lembaga Pembinaan Khusus Anak Kelas II Lombok Tengah.'
};

export default async function ProfilPage() {
  const profil = await getProfil();

  return (
    <PublicLayout>
      <Breadcrumb items={[{ label: 'Profil Instansi' }]} />

      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#091326] via-[#0f2042] to-[#1e3a8a] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              <span>KANTOR WILAYAH KEMENKUMHAM NTB</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Profil LPKA Kelas II Lombok Tengah
            </h1>
            <p className="text-sm sm:text-base text-slate-300">
              Lembaga pembinaan dan perlindungan anak yang mengedepankan pendekatan humanis, pendidikan berkelanjutan, dan pemulihan masa depan.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation sub-tabs */}
      <div className="bg-white border-b border-slate-200 sticky top-20 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-4 py-3 text-xs sm:text-sm font-medium">
          <a href="#sejarah" className="text-slate-600 hover:text-[#0f2042] whitespace-nowrap">
            Sejarah Singkat
          </a>
          <span className="text-slate-300">|</span>
          <a href="#visimisi" className="text-slate-600 hover:text-[#0f2042] whitespace-nowrap">
            Visi & Misi
          </a>
          <span className="text-slate-300">|</span>
          <a href="#tusi" className="text-slate-600 hover:text-[#0f2042] whitespace-nowrap">
            Tugas Pokok & Fungsi
          </a>
          <span className="text-slate-300">|</span>
          <a href="#tatanilai" className="text-slate-600 hover:text-[#0f2042] whitespace-nowrap">
            Tata Nilai PASTI
          </a>
          <span className="text-slate-300">|</span>
          <Link href="/profil/struktur-organisasi" className="text-blue-700 hover:underline font-bold whitespace-nowrap">
            Struktur Organisasi →
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* 1. Sejarah Section */}
        <section id="sejarah" className="scroll-mt-36">
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0f2042]">
                  Sejarah Lembaga
                </h2>
                <span className="text-xs text-slate-500">
                  Transformasi Menuju Sistem Peradilan Pidana Anak yang Ramah
                </span>
              </div>
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {profil.sejarah}
            </p>

            <div className="bg-blue-50/80 rounded-xl p-5 border border-blue-200/60 flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-blue-700 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-blue-900 leading-relaxed">
                <strong>Dasar Hukum Pendirian:</strong> Berdasarkan amanat Undang-Undang Republik Indonesia Nomor 11 Tahun 2012 tentang Sistem Peradilan Pidana Anak (SPPA) serta Undang-Undang Nomor 22 Tahun 2022 tentang Pemasyarakatan, seluruh bentuk pembinaan terhadap anak yang berhadapan dengan hukum wajib menjamin kelangsungan pendidikan, kesehatan jasmani-rohani, dan hak tumbuh kembang tanpa diskriminasi.
              </div>
            </div>
          </div>
        </section>

        {/* 2. Visi & Misi Section */}
        <section id="visimisi" className="scroll-mt-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Visi */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0f2042] to-[#1e3a8a] text-white rounded-2xl p-8 shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-amber-400 mb-6">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                  Arah Kebijakan
                </span>
                <h2 className="text-2xl font-extrabold mt-1 text-white">
                  Visi Instansi
                </h2>
                <blockquote className="mt-4 text-base sm:text-lg italic font-medium text-blue-100 leading-relaxed border-l-2 border-amber-400 pl-4">
                  "{profil.visi}"
                </blockquote>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-xs text-slate-300">
                Sejalan dengan Visi Kementerian Hukum dan HAM Republik Indonesia dalam pemajuan hukum dan perlindungan hak asasi manusia.
              </div>
            </div>

            {/* Misi */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#0f2042]">
                    Misi Instansi
                  </h2>
                  <span className="text-xs text-slate-500">
                    Langkah Nyata Mewujudkan Visi Pemasyarakatan Ramah Anak
                  </span>
                </div>
              </div>

              <ul className="space-y-3.5">
                {(profil.misi || []).map((m, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {m}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 3. Tugas Pokok & Fungsi */}
        <section id="tusi" className="scroll-mt-36">
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-8">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0f2042]">
                  Tugas Pokok & Fungsi (Tusi)
                </h2>
                <span className="text-xs text-slate-500">
                  Landasan Operasional LPKA Kelas II Lombok Tengah
                </span>
              </div>
            </div>

            {/* Tugas Pokok */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Tugas Pokok
              </h3>
              <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
                {profil.tugasPokok}
              </p>
            </div>

            {/* Rincian Fungsi */}
            <div>
              <h3 className="text-base font-bold text-[#0f2042] mb-4">
                Fungsi-Fungsi Pelaksanaan:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(profil.fungsi || []).map((f, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Tata Nilai Utama (PASTI BERSAHAJA) */}
        <section id="tatanilai" className="scroll-mt-36">
          <div className="bg-gradient-to-r from-slate-900 via-[#0f2042] to-slate-900 rounded-2xl p-8 sm:p-10 text-white shadow-xl space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                Budaya Kerja Aparatur
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Tata Nilai "PASTI" & BerAKHLAK
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Pondasi etika dan dedikasi seluruh jajaran pegawai LPKA Kelas II Lombok Tengah dalam melayani masyarakat.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {(profil.tataNilai || []).map((tn, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur rounded-xl p-5 border border-white/10 hover:border-amber-400/50 transition text-center flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 mx-auto rounded-full bg-amber-400/20 text-amber-300 font-bold flex items-center justify-center mb-3">
                      {tn.judul.charAt(0)}
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">
                      {tn.judul}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {tn.deskripsi}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Link to Organizational Chart */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-700 text-white flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0f2042]">
                Struktur Organisasi & Pejabat
              </h3>
              <p className="text-xs text-slate-600">
                Lihat bagan hierarki struktural pimpinan dan daftar pegawai LPKA Kelas II Lombok Tengah.
              </p>
            </div>
          </div>
          <Link
            href="/profil/struktur-organisasi"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0f2042] hover:bg-blue-900 text-white text-xs font-semibold transition flex-shrink-0"
          >
            <span>Buka Struktur Organisasi</span>
            <CheckCircle2 className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
}
