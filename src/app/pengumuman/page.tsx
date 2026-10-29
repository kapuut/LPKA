import React from 'react';
import PublicLayout from '@/components/PublicLayout';
import Breadcrumb from '@/components/Breadcrumb';
import { getPengumumanList } from '@/lib/storage';
import { Bell, Calendar, FileText, Download, Search, AlertCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Pengumuman Resmi & Maklumat Pelayanan',
  description: 'Pengumuman kedinasan, jadwal pelayanan kunjungan, dan maklumat informasi LPKA Kelas II Lombok Tengah.'
};

interface Props {
  searchParams: Promise<{
    status?: string;
    kategori?: string;
    cari?: string;
  }>;
}

export default async function PengumumanPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const currentStatus = resolvedParams.status || 'aktif';
  const searchQuery = resolvedParams.cari || '';

  const allPengumuman = await getPengumumanList();

  const filtered = allPengumuman.filter((p) => {
    const matchesStatus = currentStatus === 'semua' || p.status === currentStatus;
    const matchesSearch = !searchQuery ||
      p.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.ringkasan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.nomorSurat && p.nomorSurat.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <PublicLayout>
      <Breadcrumb items={[{ label: 'Pengumuman Resmi' }]} />

      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#091326] via-[#0f2042] to-[#1e3a8a] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <Bell className="w-4 h-4" />
              <span>MAKLUMAT & SURAT EDARAN RESMI</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Pengumuman & Maklumat
            </h1>
            <p className="text-sm sm:text-base text-slate-300">
              Pemberitahuan resmi mengenai jadwal kunjungan, tata tertib, penerimaan titipan, serta informasi kedinasan lainnya.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Filter & Search Bar */}
        <div className="bg-white rounded-xl p-4 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Link
              href="/pengumuman?status=aktif"
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                currentStatus === 'aktif'
                  ? 'bg-[#0f2042] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Pengumuman Aktif
            </Link>
            <Link
              href="/pengumuman?status=arsip"
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                currentStatus === 'arsip'
                  ? 'bg-[#0f2042] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Arsip Pengumuman
            </Link>
            <Link
              href="/pengumuman?status=semua"
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                currentStatus === 'semua'
                  ? 'bg-[#0f2042] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Semua
            </Link>
          </div>

          {/* Search Input */}
          <form method="GET" action="/pengumuman" className="w-full md:w-72 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              name="cari"
              defaultValue={searchQuery}
              placeholder="Cari pengumuman atau nomor surat..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input type="hidden" name="status" value={currentStatus} />
          </form>
        </div>

        {/* Announcements List */}
        {filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        item.status === 'aktif'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.status === 'aktif' ? 'Aktif' : 'Arsip'}
                    </span>
                    <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {item.kategori}
                    </span>
                    {item.isPenting && (
                      <span className="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                        Penting
                      </span>
                    )}
                    {item.nomorSurat && (
                      <span className="text-[11px] font-mono text-slate-400">
                        No: {item.nomorSurat}
                      </span>
                    )}
                  </div>

                  <h2 className="text-base sm:text-lg font-bold text-slate-900 hover:text-blue-700 transition">
                    <Link href={`/pengumuman/${item.slug}`}>
                      {item.judul}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {item.ringkasan}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        Diterbitkan:{' '}
                        {new Date(item.tanggalTerbit).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    {item.berlakuSampai && (
                      <span>
                        Berlaku s/d:{' '}
                        {new Date(item.berlakuSampai).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right side buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
                  {item.lampiran && (
                    <a
                      href={item.lampiran.urlFile}
                      download
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                    >
                      <Download className="w-3.5 h-3.5 text-blue-600" />
                      <span>Lampiran ({item.lampiran.ukuran})</span>
                    </a>
                  )}
                  <Link
                    href={`/pengumuman/${item.slug}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#0f2042] hover:bg-blue-900 text-white text-xs font-semibold transition"
                  >
                    <span>Rincian</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
            <p className="text-slate-500 text-sm">
              Tidak ada pengumuman yang sesuai dengan kriteria filter saat ini.
            </p>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
