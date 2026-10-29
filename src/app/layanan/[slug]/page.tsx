import React from 'react';
import { notFound } from 'next/navigation';
import PublicLayout from '@/components/PublicLayout';
import Breadcrumb from '@/components/Breadcrumb';
import { getLayananList } from '@/lib/storage';
import {
  HeartHandshake,
  Clock,
  CheckCircle2,
  FileCheck2,
  Phone,
  ShieldCheck,
  AlertCircle,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const list = await getLayananList();
  const item = list.find((l) => l.slug === slug);

  if (!item) return { title: 'Layanan Tidak Ditemukan' };

  return {
    title: item.namaLayanan,
    description: item.deskripsiSingkat
  };
}

export default async function LayananDetailPage({ params }: Props) {
  const { slug } = await params;
  const list = await getLayananList();
  const layanan = list.find((l) => l.slug === slug);

  if (!layanan || !layanan.isAktif) {
    notFound();
  }

  return (
    <PublicLayout>
      <Breadcrumb
        items={[
          { label: 'Layanan Publik', href: '/layanan' },
          { label: layanan.namaLayanan }
        ]}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900">
              {layanan.kategori}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              {layanan.biaya}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f2042] leading-tight">
            {layanan.namaLayanan}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {layanan.deskripsiSingkat}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block">Jadwal Pelayanan</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">{layanan.jadwalLayanan}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Waktu Penyelesaian</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">{layanan.waktuPenyelesaian}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Penanggung Jawab</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">{layanan.penanggungJawab}</span>
            </div>
          </div>
        </div>

        {/* Persyaratan Dokumen */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <FileCheck2 className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-[#0f2042]">
              Persyaratan Berkas & Dokumen
            </h2>
          </div>

          <ul className="space-y-2.5">
            {layanan.persyaratan.map((syarat, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{syarat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Prosedur & Langkah Alur Pelayanan */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <Clock className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-[#0f2042]">
              Prosedur & Alur Pelaksanaan
            </h2>
          </div>

          <div className="space-y-4">
            {layanan.prosedur.map((step) => (
              <div
                key={step.langkah}
                className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100"
              >
                <div className="w-8 h-8 rounded-full bg-[#0f2042] text-white font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  {step.langkah}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {step.judul}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {step.keterangan}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Consultation Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
              <Phone className="w-4 h-4 text-blue-700" />
              <span>Pusat Bantuan & Pengaduan Layanan</span>
            </div>
            <p className="text-xs text-blue-800">
              Ada pertanyaan seputar persyaratan atau jadwal? Hubungi nomor resmi petugas pelayanan kami.
            </p>
            <div className="text-xs font-mono font-semibold text-blue-950 mt-1">
              Kontak Petugas: {layanan.kontakPetugas}
            </div>
          </div>
          <Link
            href="/kontak"
            className="px-5 py-2.5 rounded-lg bg-[#0f2042] hover:bg-blue-950 text-white font-semibold text-xs whitespace-nowrap transition flex-shrink-0"
          >
            Formulir Kontak Resmi
          </Link>
        </div>

        {/* Back Link */}
        <div>
          <Link
            href="/layanan"
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Semua Layanan</span>
          </Link>
        </div>
      </article>
    </PublicLayout>
  );
}
