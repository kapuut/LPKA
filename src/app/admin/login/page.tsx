'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, User, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('LpkaLoteng2025!*');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Login gagal. Periksa kembali username dan kata sandi Anda.');
        setLoading(false);
        return;
      }

      router.push('/admin/dashboard');
    } catch {
      setError('Terjadi kendala koneksi ke server.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      {/* Background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      <div className="relative max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-800">
        {/* Indonesian Flag Accent */}
        <div className="h-1.5 bg-gradient-to-r from-red-600 via-red-500 to-slate-200" />

        {/* Header */}
        <div className="bg-[#0f2042] text-white p-8 text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-blue-950 border-2 border-amber-400 mx-auto flex items-center justify-center shadow-lg text-amber-400">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <div>
            <span className="text-[10px] tracking-wider uppercase font-bold text-red-400">
              Kementerian Hukum & HAM RI • Kanwil NTB
            </span>
            <h1 className="text-xl font-extrabold tracking-tight text-white mt-0.5">
              Panel Pengelola Website
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              LPKA Kelas II Lombok Tengah
            </p>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nama Pengguna (Username)
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username admin"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Kata Sandi (Password)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi"
                  className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-[#0f2042] hover:bg-blue-900 text-white font-bold text-xs shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>{loading ? 'Memverifikasi...' : 'Masuk ke Panel Pengelola'}</span>
            </button>
          </form>

          {/* Seed demo credential notification box */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-1.5 text-xs text-amber-900">
            <div className="font-bold flex items-center gap-1.5">
              <span>Akun Uji Coba Prototipe:</span>
            </div>
            <div className="font-mono text-[11px] space-y-0.5">
              <div>Username: <strong className="text-black">admin</strong></div>
              <div>Password: <strong className="text-black">LpkaLoteng2025!*</strong></div>
            </div>
            <div className="text-[10px] text-amber-800 pt-1 border-t border-amber-200/60">
              Kata sandi dapat diganti sewaktu-waktu di menu <em>Pengaturan</em> setelah berhasil masuk.
            </div>
          </div>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 font-medium transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Website Publik</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
