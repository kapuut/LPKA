import React from 'react';
import PublicLayout from '@/components/PublicLayout';
import Breadcrumb from '@/components/Breadcrumb';
import { getDokumenList } from '@/lib/storage';
import {
  FileText,
  Download,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  HelpCircle,
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck,
  Send
} from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Layanan Keterbukaan Informasi Publik (PPID)',
  description: 'Daftar Informasi Publik (DIP), Laporan Kinerja (LKjIP), Regulasi, dan Prosedur Permohonan Informasi LPKA Kelas II Lombok Tengah.'
};

interface Props {
  searchParams: Promise<{
    kategori?: string;
    cari?: string;
  }>;
}

export default async function InformasiPublikPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams.kategori || 'ALL';
  const searchQuery = resolvedParams.cari || '';

  const allDocs = await getDokumenList();

  const filtered = allDocs.filter((d) => {
    const matchesCat = currentCategory === 'ALL' || d.kategori === currentCategory;
    const matchesSearch = !searchQuery ||
      d.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.nomorDokumen.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <PublicLayout>
      <Breadcrumb items={[{ label: 'Informasi Publik (PPID)' }]} />

      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#091326] via-[#0f2042] to-[#1e3a8a] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>PEJABAT PENGELOLA INFORMASI & DOKUMENTASI (PPID)</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Keterbukaan Informasi Publik
            </h1>
            <p className="text-sm sm:text-base text-slate-300">
              Komitmen transparansi pelayanan publik sesuai Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Nav Anchor Tabs */}
      <div className="bg-white border-b border-slate-200 sticky top-20 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-6 py-3 text-xs sm:text-sm font-semibold">
          <a href="#dip" className="text-[#0f2042] hover:underline whitespace-nowrap">
            Daftar Informasi Publik (DIP)
          </a>
          <span className="text-slate-300">|</span>
          <a href="#prosedur" className="text-slate-600 hover:text-[#0f2042] whitespace-nowrap">
            Prosedur Permohonan
          </a>
          <span className="text-slate-300">|</span>
          <a href="#keberatan" className="text-slate-600 hover:text-[#0f2042] whitespace-nowrap">
            Prosedur Keberatan
          </a>
          <span className="text-slate-300">|</span>
          <a href="#regulasi" className="text-slate-600 hover:text-[#0f2042] whitespace-nowrap">
            Dasar Hukum & Regulasi
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Section 1: Kategori Informasi Publik (3 Pilar PPID) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-base font-bold text-[#0f2042]">Informasi Berkala</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Informasi yang wajib diperbarui dan disediakan secara rutin: Laporan Kinerja (LKjIP), Renstra, DIPA anggaran, dan profil pimpinan.
            </p>
            <Link
              href="/informasi-publik?kategori=berkala#dip"
              className="text-xs font-bold text-blue-700 hover:underline inline-block pt-1"
            >
              Lihat Dokumen Berkala →
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="text-base font-bold text-[#0f2042]">Informasi Serta-Merta</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Informasi yang menyangkut hajat hidup masyarakat banyak, maklumat darurat bencana, protokol kesehatan, atau ketertiban instansi.
            </p>
            <Link
              href="/informasi-publik?kategori=serta_merta#dip"
              className="text-xs font-bold text-amber-700 hover:underline inline-block pt-1"
            >
              Lihat Dokumen Serta-Merta →
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="text-base font-bold text-[#0f2042]">Informasi Tersedia Setiap Saat</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Standar Operasional Prosedur (SOP), daftar surat keputusan, regulasi internal, tata tertib pegawai dan anak binaan.
            </p>
            <Link
              href="/informasi-publik?kategori=setiap_saat#dip"
              className="text-xs font-bold text-emerald-700 hover:underline inline-block pt-1"
            >
              Lihat Dokumen Setiap Saat →
            </Link>
          </div>
        </section>

        {/* Section 2: Daftar Informasi Publik (DIP) Table */}
        <section id="dip" className="scroll-mt-36 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                Repositori Berkas PPID
              </span>
              <h2 className="text-2xl font-extrabold text-[#0f2042]">
                Daftar Informasi Publik (DIP) Terpublikasi
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Unduh berkas resmi laporan kedinasan dan regulasi publik secara langsung.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              <Link
                href="/informasi-publik#dip"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  currentCategory === 'ALL'
                    ? 'bg-[#0f2042] text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Semua ({allDocs.length})
              </Link>
              <Link
                href="/informasi-publik?kategori=berkala#dip"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  currentCategory === 'berkala'
                    ? 'bg-[#0f2042] text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Berkala
              </Link>
              <Link
                href="/informasi-publik?kategori=serta_merta#dip"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  currentCategory === 'serta_merta'
                    ? 'bg-[#0f2042] text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Serta-Merta
              </Link>
              <Link
                href="/informasi-publik?kategori=setiap_saat#dip"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  currentCategory === 'setiap_saat'
                    ? 'bg-[#0f2042] text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Setiap Saat
              </Link>
            </div>
          </div>

          {/* Documents Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold text-[11px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Nama Dokumen & Nomor</th>
                    <th className="py-3.5 px-4">Jenis & Kategori</th>
                    <th className="py-3.5 px-4">Tahun</th>
                    <th className="py-3.5 px-4">Penanggung Jawab</th>
                    <th className="py-3.5 px-4 text-center">Ukuran</th>
                    <th className="py-3.5 px-4 text-right">Aksi Unduh</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-4 px-4">
                        <div className="flex items-start gap-2.5">
                          <FileText className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold text-slate-900 leading-snug">
                              {doc.judul}
                            </div>
                            <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                              No: {doc.nomorDokumen}
                            </div>
                            <div className="text-xs text-slate-500 mt-1 line-clamp-1">
                              {doc.deskripsi}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-800">
                          {doc.kategori.replace('_', ' ')}
                        </span>
                        <div className="text-xs text-slate-600 mt-1">
                          {doc.jenisDokumen}
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap font-semibold text-slate-700">
                        {doc.tahun}
                      </td>
                      <td className="py-4 px-4 text-xs text-slate-600">
                        {doc.penanggungJawab}
                      </td>
                      <td className="py-4 px-4 text-center whitespace-nowrap text-xs text-slate-500">
                        {doc.ukuranFile} ({doc.tipeFile})
                      </td>
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <a
                          href={doc.urlFile}
                          download
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-semibold text-xs transition border border-blue-200"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Unduh</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filtered.length === 0 && (
              <div className="py-12 text-center text-slate-500 text-xs">
                Tidak ada dokumen informasi publik yang sesuai dengan filter.
              </div>
            )}
          </div>
        </section>

        {/* Section 3: Prosedur Permohonan Informasi Publik (Visual Steps) */}
        <section id="prosedur" className="scroll-mt-36 space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
              Standar Operasional Prosedur (SOP)
            </span>
            <h2 className="text-2xl font-extrabold text-[#0f2042] mt-1">
              Prosedur Permohonan Informasi Publik
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Alur pelayanan resmi bagi masyarakat yang memerlukan dokumen atau informasi kedinasan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative space-y-3">
              <span className="w-8 h-8 rounded-full bg-blue-900 text-white font-bold flex items-center justify-center text-xs">
                1
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Pengajuan Permohonan</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pemohon mengisi formulir permohonan informasi secara langsung di Pos PTSP atau secara daring dengan melampirkan fotokopi KTP/Identitas.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative space-y-3">
              <span className="w-8 h-8 rounded-full bg-blue-900 text-white font-bold flex items-center justify-center text-xs">
                2
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Verifikasi oleh PPID</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Petugas PPID memeriksa kelengkapan identitas dan meneliti apakah informasi yang diminta bersifat terbuka atau informasi yang dikecualikan.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative space-y-3">
              <span className="w-8 h-8 rounded-full bg-blue-900 text-white font-bold flex items-center justify-center text-xs">
                3
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Pemberitahuan Tertulis</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                PPID memberikan jawaban tertulis selambat-lambatnya dalam waktu 10 (sepuluh) hari kerja, dapat diperpanjang maksimal 7 hari kerja.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative space-y-3">
              <span className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-xs">
                4
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Penyerahan Informasi</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Informasi diserahkan dalam bentuk salinan digital atau fisik secara GRATIS (biaya penggandaan ditanggung pemohon bila diperlukan).
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Prosedur Pengajuan Keberatan Informasi */}
        <section id="keberatan" className="scroll-mt-36 bg-slate-100 rounded-2xl p-6 sm:p-10 border border-slate-200 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0f2042]">
                Prosedur Pengajuan Keberatan Informasi
              </h2>
              <span className="text-xs text-slate-500">
                Mekanisme bila permohonan informasi tidak ditanggapi atau ditolak tanpa dasar
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-700">
            <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900">Alasan Keberatan yang Sah:</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Permohonan informasi ditolak tanpa alasan tertulis.</li>
                <li>Informasi tidak disediakan berkala.</li>
                <li>Permohonan tidak ditanggapi melewati batas waktu 10+7 hari kerja.</li>
                <li>Biaya yang dikenakan tidak wajar.</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900">Batas Waktu Pengajuan:</h4>
              <p className="text-slate-600 leading-relaxed">
                Pemohon dapat mengajukan surat keberatan kepada <strong>Atasan PPID (Kepala LPKA)</strong> paling lambat 30 (tiga puluh) hari kerja sejak ditemukannya alasan keberatan.
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900">Tanggapan Atasan PPID:</h4>
              <p className="text-slate-600 leading-relaxed">
                Atasan PPID wajib memberikan tanggapan tertulis atas keberatan paling lambat 30 (tiga puluh) hari kerja. Bila belum puas, pemohon dapat mengajukan sengketa ke Komisi Informasi Provinsi NTB.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Regulasi & Dasar Hukum */}
        <section id="regulasi" className="scroll-mt-36 space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
              Landasan Yuridis
            </span>
            <h2 className="text-2xl font-extrabold text-[#0f2042] mt-1">
              Regulasi & Dasar Hukum Pelayanan
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-white rounded-xl p-4 border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Undang-Undang Nomor 14 Tahun 2008</strong>
                <p className="text-slate-600 mt-0.5">Tentang Keterbukaan Informasi Publik (KIP).</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Undang-Undang Nomor 11 Tahun 2012</strong>
                <p className="text-slate-600 mt-0.5">Tentang Sistem Peradilan Pidana Anak (SPPA).</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Undang-Undang Nomor 22 Tahun 2022</strong>
                <p className="text-slate-600 mt-0.5">Tentang Pemasyarakatan.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Permenkumham No. 30 Tahun 2018</strong>
                <p className="text-slate-600 mt-0.5">Tentang Organisasi dan Tata Kerja Balai Pemasyarakatan & LPKA.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
