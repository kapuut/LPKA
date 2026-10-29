import React from 'react';
import { notFound } from 'next/navigation';
import PublicLayout from '@/components/PublicLayout';
import Breadcrumb from '@/components/Breadcrumb';
import { getBeritaList } from '@/lib/storage';
import { Calendar, User, Eye, Share2, Tag, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const list = await getBeritaList();
  const berita = list.find((b) => b.slug === slug);

  if (!berita) {
    return {
      title: 'Berita Tidak Ditemukan'
    };
  }

  return {
    title: berita.judul,
    description: berita.ringkasan,
    openGraph: {
      title: berita.judul,
      description: berita.ringkasan,
      images: [{ url: berita.gambarUtama }]
    }
  };
}

export default async function BeritaDetailPage({ params }: Props) {
  const { slug } = await params;
  const allBerita = await getBeritaList();
  const berita = allBerita.find((b) => b.slug === slug);

  if (!berita || berita.status !== 'published') {
    notFound();
  }

  // Related news from same category or latest
  const terkait = allBerita
    .filter((b) => b.id !== berita.id && b.status === 'published')
    .slice(0, 3);

  return (
    <PublicLayout>
      <Breadcrumb
        items={[
          { label: 'Berita & Kegiatan', href: '/berita' },
          { label: berita.judul }
        ]}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Header Information */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900">
              {berita.kategori}
            </span>
            {berita.isDemoData && (
              <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                (Data Simulasi / Prototipe)
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f2042] leading-tight tracking-tight">
            {berita.judul}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 border-y border-slate-200 py-3">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>
                {new Date(berita.tanggalPublikasi).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-slate-400" />
              <span>Oleh: <strong className="text-slate-700">{berita.penulis}</strong></span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-slate-400" />
              <span>{berita.jumlahDilihat} kali dibaca</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md">
          <img
            src={berita.gambarUtama}
            alt={berita.judul}
            className="w-full max-h-[480px] object-cover"
          />
          {berita.captionGambar && (
            <p className="p-3 text-xs text-slate-500 bg-slate-50 italic border-t border-slate-100 text-center">
              {berita.captionGambar}
            </p>
          )}
        </div>

        {/* Main Content Body */}
        <div className="prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-4">
          {berita.konten.split('\n\n').map((paragraf, idx) => (
            <p key={idx} className="whitespace-pre-line">
              {paragraf}
            </p>
          ))}
        </div>

        {/* Tags */}
        {berita.tags && berita.tags.length > 0 && (
          <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-slate-400 mr-1" />
            <span className="text-xs font-semibold text-slate-600">Tags:</span>
            {berita.tags.map((t, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-md"
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Institutional Verification Box */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-slate-600 leading-relaxed">
            Warta dan publikasi ini dikelola oleh Tim Kehumasan LPKA Kelas II Lombok Tengah dengan tetap menjunjung asas perlindungan hak asasi anak dan tidak mempublikasikan identitas yang merugikan anak binaan.
          </div>
        </div>

        {/* Related News Section */}
        {terkait.length > 0 && (
          <div className="pt-10 border-t border-slate-200 space-y-6">
            <h3 className="text-xl font-bold text-[#0f2042]">
              Berita & Kegiatan Terkait
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {terkait.map((tb) => (
                <div
                  key={tb.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div className="h-36 bg-slate-100 overflow-hidden">
                    <img
                      src={tb.gambarUtama}
                      alt={tb.judul}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <span className="text-[10px] text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded">
                      {tb.kategori}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2 hover:text-blue-700">
                      <Link href={`/berita/${tb.slug}`}>{tb.judul}</Link>
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="pt-4">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Berita</span>
          </Link>
        </div>
      </article>
    </PublicLayout>
  );
}
