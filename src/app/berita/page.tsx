import React from 'react';
import PublicLayout from '@/components/PublicLayout';
import Breadcrumb from '@/components/Breadcrumb';
import { getBeritaList } from '@/lib/storage';
import { Calendar, Search, Tag, Clock, ArrowRight, User } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Berita & Kegiatan Pembinaan',
  description: 'Warta terkini kegiatan pembinaan kepribadian, kemandirian vokasi, dan kedinasan LPKA Kelas II Lombok Tengah.'
};

interface Props {
  searchParams: Promise<{
    kategori?: string;
    cari?: string;
    halaman?: string;
  }>;
}

export default async function BeritaPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams.kategori || 'ALL';
  const searchQuery = resolvedParams.cari || '';
  const currentPage = parseInt(resolvedParams.halaman || '1', 10);
  const perPage = 6;

  const allBerita = await getBeritaList();

  // Filter only published
  const published = allBerita.filter(b => b.status === 'published');

  // Extract categories
  const categories = ['ALL', ...Array.from(new Set(published.map(b => b.kategori)))];

  // Apply filters
  const filtered = published.filter(b => {
    const matchesCat = currentCategory === 'ALL' || b.kategori.toLowerCase() === currentCategory.toLowerCase();
    const matchesSearch = !searchQuery ||
      b.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.ringkasan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.tags && b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCat && matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / perPage) || 1;
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <PublicLayout>
      <Breadcrumb items={[{ label: 'Berita & Kegiatan' }]} />

      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#091326] via-[#0f2042] to-[#1e3a8a] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
              KABAR & DOKUMENTASI RESMI
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Berita & Publikasi Kegiatan
            </h1>
            <p className="text-sm sm:text-base text-slate-300">
              Informasi terkini mengenai program pembinaan kemandirian, pendidikan kesetaraan, dan kegiatan kedinasan LPKA Lombok Tengah.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search & Category Filter Bar */}
        <div className="bg-white rounded-xl p-4 sm:p-6 border border-slate-200 shadow-sm mb-10 space-y-4">
          <form method="GET" action="/berita" className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                name="cari"
                defaultValue={searchQuery}
                placeholder="Cari judul berita, kegiatan, atau kata kunci..."
                className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {currentCategory !== 'ALL' && (
                <input type="hidden" name="kategori" value={currentCategory} />
              )}
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#0f2042] hover:bg-blue-900 text-white text-xs sm:text-sm font-semibold rounded-lg transition"
            >
              Cari Berita
            </button>
          </form>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                href={`/berita?kategori=${encodeURIComponent(cat)}${searchQuery ? `&cari=${encodeURIComponent(searchQuery)}` : ''}`}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                  currentCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-[#0f2042] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'ALL' ? 'Semua Kategori' : cat}
              </Link>
            ))}
          </div>
        </div>

        {/* News Cards Grid */}
        {paginated.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginated.map((b) => (
              <article
                key={b.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-52 bg-slate-100 overflow-hidden">
                    <img
                      src={b.gambarUtama}
                      alt={b.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-[#0f2042]/90 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded shadow">
                      {b.kategori}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                          {new Date(b.tanggalPublikasi).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[120px]">{b.penulis}</span>
                      </div>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition line-clamp-2 leading-snug">
                      <Link href={`/berita/${b.slug}`}>
                        {b.judul}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {b.ringkasan}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {b.jumlahDilihat} kali dibaca
                  </span>
                  <Link
                    href={`/berita/${b.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 group-hover:translate-x-1 transition"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <p className="text-slate-500 text-sm">
              Tidak ada berita yang sesuai dengan kata kunci pencarian atau kategori ini.
            </p>
            <Link
              href="/berita"
              className="inline-block mt-4 text-xs font-bold text-blue-700 hover:underline"
            >
              Kembali ke Semua Berita
            </Link>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <Link
                key={pg}
                href={`/berita?halaman=${pg}${currentCategory !== 'ALL' ? `&kategori=${encodeURIComponent(currentCategory)}` : ''}${searchQuery ? `&cari=${encodeURIComponent(searchQuery)}` : ''}`}
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold transition ${
                  currentPage === pg
                    ? 'bg-[#0f2042] text-white shadow'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {pg}
              </Link>
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
