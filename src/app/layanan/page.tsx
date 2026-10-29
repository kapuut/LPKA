import React from 'react';
import PublicLayout from '@/components/PublicLayout';
import Breadcrumb from '@/components/Breadcrumb';
import { getLayananList } from '@/lib/storage';
import {
  HeartHandshake,
  Clock,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Phone,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Standar Pelayanan Publik Terpadu',
  description: 'Informasi SOP, persyaratan berkas, jadwal kunjungan tatap muka, video call daring, dan layanan integrasi sosial LPKA Lombok Tengah.'
};

export default async function LayananPage() {
  const layananList = await getLayananList();
  const aktifLayanan = layananList.filter((l) => l.isAktif);

  return (
    <PublicLayout>
      <Breadcrumb items={[{ label: 'Layanan Publik' }]} />

      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#091326] via-[#0f2042] to-[#1e3a8a] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>PELAYANAN TERPADU SATU PINTU (PTSP)</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Layanan Publik Ramah Anak
            </h1>
            <p className="text-sm sm:text-base text-slate-300">
              Standar pelayanan kunjungan, pembebasan integrasi, titipan barang, serta konsultasi bantuan hukum tanpa dipungut biaya apapun (Rp 0).
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Anti Pungli Guarantee Banner */}
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-emerald-600/40 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Maklumat Kepuasan Pelayanan</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
              Seluruh Layanan Bebas dari Pungli & Gratifikasi
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Jangan memberikan imbalan dalam bentuk apapun kepada petugas. Apabila ada penyimpangan, segera hubungi saluran pengaduan resmi kami.
            </p>
          </div>
          <Link
            href="/kontak"
            className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs whitespace-nowrap transition flex-shrink-0"
          >
            Lapor Pengaduan Bebas Pungli
          </Link>
        </div>

        {/* Layanan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aktifLayanan.map((l) => (
            <div
              key={l.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                    {l.kategori}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    {l.biaya}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition leading-snug">
                  <Link href={`/layanan/${l.slug}`}>
                    {l.namaLayanan}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {l.deskripsiSingkat}
                </p>

                <div className="mt-5 space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Jadwal:</strong> {l.jadwalLayanan}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Waktu:</strong> {l.waktuPenyelesaian}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {l.persyaratan.length} Syarat Berkas
                </span>
                <Link
                  href={`/layanan/${l.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 group-hover:translate-x-1 transition"
                >
                  <span>Lihat SOP & Prosedur</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
