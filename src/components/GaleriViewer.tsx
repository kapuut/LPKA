'use client';

import React, { useState } from 'react';
import { GaleriItem } from '@/lib/types';
import { Image as ImageIcon, Calendar, MapPin, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  galeriList: GaleriItem[];
}

export default function GaleriViewer({ galeriList }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activePhoto, setActivePhoto] = useState<GaleriItem | null>(null);

  const categories = ['ALL', ...Array.from(new Set(galeriList.map(g => g.kategori)))];

  const filtered = galeriList.filter(g =>
    selectedCategory === 'ALL' || g.kategori === selectedCategory
  );

  return (
    <div className="space-y-8">
      {/* Category Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
              selectedCategory === cat
                ? 'bg-[#0f2042] text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat === 'ALL' ? 'Semua Kategori Kegiatan' : cat}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setActivePhoto(item)}
            className="group relative h-64 rounded-2xl overflow-hidden bg-slate-200 border border-slate-200 shadow-sm hover:shadow-xl transition cursor-pointer flex flex-col justify-end"
          >
            <img
              src={item.fotoUrl}
              alt={item.judul}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-5 flex flex-col justify-end text-white">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                {item.kategori}
              </span>
              <h3 className="text-sm font-bold line-clamp-2 mt-1 leading-snug">
                {item.judul}
              </h3>
              <div className="flex items-center gap-3 text-[11px] text-slate-300 mt-2">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(item.tanggal).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}</span>
                </div>
                {item.lokasi && (
                  <div className="flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{item.lokasi}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
          Belum ada foto kegiatan untuk kategori ini.
        </div>
      )}

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activePhoto.fotoUrl}
                alt={activePhoto.judul}
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-6 bg-slate-900 text-white space-y-2">
              <div className="flex items-center gap-3 text-xs text-amber-400 font-semibold">
                <span>{activePhoto.kategori}</span>
                <span>•</span>
                <span className="text-slate-300">{activePhoto.lokasi}</span>
                <span>•</span>
                <span className="text-slate-400">
                  {new Date(activePhoto.tanggal).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                {activePhoto.judul}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activePhoto.keterangan}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
