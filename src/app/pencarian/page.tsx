import React from 'react';
import PublicLayout from '@/components/PublicLayout';
import Breadcrumb from '@/components/Breadcrumb';
import {
  getBeritaList,
  getPengumumanList,
  getLayananList,
  getDokumenList,
  getPegawaiList
} from '@/lib/storage';
import { BeritaItem, PengumumanItem, LayananItem, DokumenPublik, Pegawai } from '@/lib/types';
import { Search, FileText, Bell, HeartHandshake, Download, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Pencarian Informasi Website',
  description: 'Pusat pencarian seluruh berita, pengumuman, layanan publik, dan dokumen PPID LPKA Kelas II Lombok Tengah.'
};

interface Props {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function PencarianPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q?.trim() || '';

  const [berita, pengumuman, layanan, dokumen, pegawai] = await Promise.all([
    getBeritaList(),
    getPengumumanList(),
    getLayananList(),
    getDokumenList(),
    getPegawaiList()
  ]);

  let hasilBerita: BeritaItem[] = [];
  let hasilPengumuman: PengumumanItem[] = [];
  let hasilLayanan: LayananItem[] = [];
  let hasilDokumen: DokumenPublik[] = [];
  let hasilPegawai: Pegawai[] = [];

  if (query) {
    const q = query.toLowerCase();

    hasilBerita = berita.filter(
      b => b.status === 'published' &&
      (b.judul.toLowerCase().includes(q) || b.ringkasan.toLowerCase().includes(q) || b.kategori.toLowerCase().includes(q))
    );

    hasilPengumuman = pengumuman.filter(
      p => p.judul.toLowerCase().includes(q) || p.ringkasan.toLowerCase().includes(q) || (p.nomorSurat && p.nomorSurat.toLowerCase().includes(q))
    );

    hasilLayanan = layanan.filter(
      l => l.isAktif &&
      (l.namaLayanan.toLowerCase().includes(q) || l.deskripsiSingkat.toLowerCase().includes(q) || l.kategori.toLowerCase().includes(q))
    );

    hasilDokumen = dokumen.filter(
      d => d.judul.toLowerCase().includes(q) || d.nomorDokumen.toLowerCase().includes(q) || d.deskripsi.toLowerCase().includes(q)
    );

    hasilPegawai = pegawai.filter(
      pg => pg.nama.toLowerCase().includes(q) || pg.jabatan.toLowerCase().includes(q) || pg.unitKerja.toLowerCase().includes(q)
    );
  }

  const totalHasil = hasilBerita.length + hasilPengumuman.length + hasilLayanan.length + hasilDokumen.length + hasilPegawai.length;

  return (
    <PublicLayout>
      <Breadcrumb items={[{ label: 'Pencarian' }]} />

      <section className="bg-gradient-to-r from-[#091326] via-[#0f2042] to-[#1e3a8a] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
            SISTEM PENCARIAN TERPADU
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Pencarian Informasi Website
          </h1>
          <p className="text-sm text-slate-300">
            Temukan berita, pengumuman, formulir layanan, dan dokumen informasi publik secara instan.
          </p>

          <form method="GET" action="/pencarian" className="pt-2 max-w-xl mx-auto">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Ketik kata kunci pencarian..."
                className="w-full pl-12 pr-28 py-3.5 text-sm bg-white text-slate-900 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#0f2042] hover:bg-blue-900 text-white text-xs font-semibold rounded-lg transition"
              >
                Cari
              </button>
            </div>
          </form>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {query ? (
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
              <h2 className="text-base font-bold text-slate-900">
                Hasil Pencarian untuk: <span className="text-blue-700">"{query}"</span>
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                Ditemukan {totalHasil} entri
              </span>
            </div>

            {totalHasil === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <p className="text-slate-500 text-sm">
                  Tidak ditemukan informasi yang sesuai dengan kata kunci "{query}".
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  Coba gunakan kata kunci umum seperti "kunjungan", "vokasi", "SOP", atau "pendidikan".
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Hasil Berita */}
                {hasilBerita.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span>Berita & Kegiatan ({hasilBerita.length})</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {hasilBerita.map((b) => (
                        <div key={b.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-blue-400 transition">
                          <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                            {b.kategori}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 mt-1 line-clamp-1 hover:text-blue-700">
                            <Link href={`/berita/${b.slug}`}>{b.judul}</Link>
                          </h4>
                          <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                            {b.ringkasan}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hasil Layanan */}
                {hasilLayanan.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                      <HeartHandshake className="w-4 h-4 text-emerald-600" />
                      <span>Layanan Publik ({hasilLayanan.length})</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {hasilLayanan.map((l) => (
                        <div key={l.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-400 transition">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                              {l.kategori}
                            </span>
                            <span className="text-[10px] font-bold text-emerald-600">{l.biaya}</span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 mt-1 line-clamp-1 hover:text-blue-700">
                            <Link href={`/layanan/${l.slug}`}>{l.namaLayanan}</Link>
                          </h4>
                          <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                            {l.deskripsiSingkat}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hasil Pengumuman */}
                {hasilPengumuman.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                      <Bell className="w-4 h-4 text-amber-600" />
                      <span>Pengumuman Resmi ({hasilPengumuman.length})</span>
                    </h3>
                    <div className="space-y-2">
                      {hasilPengumuman.map((p) => (
                        <div key={p.id} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 hover:text-blue-700">
                              <Link href={`/pengumuman/${p.slug}`}>{p.judul}</Link>
                            </h4>
                            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{p.ringkasan}</p>
                          </div>
                          <Link href={`/pengumuman/${p.slug}`} className="text-xs font-semibold text-blue-700 whitespace-nowrap">
                            Rincian →
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hasil Dokumen PPID */}
                {hasilDokumen.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                      <Download className="w-4 h-4 text-indigo-600" />
                      <span>Dokumen Informasi Publik PPID ({hasilDokumen.length})</span>
                    </h3>
                    <div className="space-y-2">
                      {hasilDokumen.map((d) => (
                        <div key={d.id} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">{d.judul}</h4>
                            <span className="text-xs text-slate-500 font-mono">No: {d.nomorDokumen} | {d.tahun}</span>
                          </div>
                          <a href={d.urlFile} download className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-200 whitespace-nowrap">
                            Unduh File
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hasil Pegawai */}
                {hasilPegawai.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-700" />
                      <span>Pejabat & Pegawai ({hasilPegawai.length})</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {hasilPegawai.map((pg) => (
                        <div key={pg.id} className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                          <div className="w-12 h-12 mx-auto rounded-full overflow-hidden bg-slate-100 mb-2">
                            <img src={pg.fotoUrl} alt={pg.nama} className="w-full h-full object-cover" />
                          </div>
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{pg.nama}</h4>
                          <p className="text-[11px] text-blue-700 line-clamp-1">{pg.jabatan}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
            <Search className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700">
              Silakan masukkan kata kunci di atas
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Contoh: "kunjungan online", "barista", "LKjIP", "Paket C", "DIPA", atau nama pejabat kedinasan.
            </p>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
