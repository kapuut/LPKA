import React from 'react';
import Link from 'next/link';
import PublicLayout from '@/components/PublicLayout';
import { Home, Search, ShieldAlert, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <PublicLayout>
      <div className="min-h-[60vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-slate-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-4xl font-extrabold text-[#0f2042] tracking-tight">
              404
            </span>
            <h1 className="text-xl font-bold text-slate-900">
              Halaman Tidak Ditemukan
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Mohon maaf, halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau tautan yang Anda tuju salah.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#0f2042] hover:bg-blue-900 text-white font-semibold text-xs transition"
            >
              <Home className="w-4 h-4" />
              <span>Kembali ke Beranda</span>
            </Link>
            <Link
              href="/pencarian"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
            >
              <Search className="w-4 h-4" />
              <span>Cari Informasi</span>
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
