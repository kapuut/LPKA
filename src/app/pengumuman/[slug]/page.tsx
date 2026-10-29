import React from 'react';
import { notFound } from 'next/navigation';
import PublicLayout from '@/components/PublicLayout';
import Breadcrumb from '@/components/Breadcrumb';
import { getPengumumanList } from '@/lib/storage';
import { Bell, Calendar, Download, FileText, ArrowLeft, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const list = await getPengumumanList();
  const item = list.find((p) => p.slug === slug);

  if (!item) return { title: 'Pengumuman Tidak Ditemukan' };

  return {
    title: item.judul,
    description: item.ringkasan
  };
}

export default async function PengumumanDetailPage({ params }: Props) {
  const { slug } = await params;
  const list = await getPengumumanList();
  const item = list.find((p) => p.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <PublicLayout>
      <Breadcrumb
        items={[
          { label: 'Pengumuman Resmi', href: '/pengumuman' },
          { label: item.judul }
        ]}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                item.status === 'aktif'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              Status: {item.status === 'aktif' ? 'Aktif' : 'Arsip'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-900">
              {item.kategori}
            </span>
            {item.isPenting && (
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">
                PENTING
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f2042] leading-tight">
            {item.judul}
          </h1>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
            <div>
              {item.nomorSurat && (
                <div className="font-mono font-medium">
                  Nomor Surat: <strong>{item.nomorSurat}</strong>
                </div>
              )}
              <div className="mt-1">
                Tanggal Terbit:{' '}
                {new Date(item.tanggalTerbit).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
            </div>

            {item.berlakuSampai && (
              <div className="text-amber-800 font-medium">
                Masa Berlaku:{' '}
                {new Date(item.berlakuSampai).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed space-y-4">
            {item.kontenLengkap.split('\n\n').map((par, i) => (
              <p key={i} className="whitespace-pre-line text-slate-800">
                {par}
              </p>
            ))}
          </div>

          {/* Download Attachment if available */}
          {item.lampiran && (
            <div className="pt-6 border-t border-slate-200">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Dokumen Lampiran
              </h4>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      {item.lampiran.namaFile}
                    </div>
                    <div className="text-xs text-slate-500">
                      Ukuran Berkas: {item.lampiran.ukuran}
                    </div>
                  </div>
                </div>

                <a
                  href={item.lampiran.urlFile}
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh Dokumen</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Prototype notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3 text-xs text-amber-900">
          <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0" />
          <span>
            Pengumuman ini bertanda <strong>(Data Simulasi / Prototipe)</strong> dan dapat diarsipkan, diterbitkan, atau disunting oleh admin resmi.
          </span>
        </div>

        {/* Back Link */}
        <div>
          <Link
            href="/pengumuman"
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Pengumuman</span>
          </Link>
        </div>
      </article>
    </PublicLayout>
  );
}
