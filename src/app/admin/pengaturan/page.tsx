'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Lock,
  HardDrive,
  GitCommit,
  Activity,
  CheckCircle2,
  AlertCircle,
  Save,
  Search,
  ShieldCheck,
  Eye,
  EyeOff
} from 'lucide-react';
import { PengaturanWebsite, AuditLogItem } from '@/lib/types';

export default function AdminPengaturanPage() {
  const [pengaturan, setPengaturan] = useState<PengaturanWebsite | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [changingPass, setChangingPass] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [passMsg, setPassMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Password state
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  // Audit filter
  const [logSearch, setLogSearch] = useState('');

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/content?collection=pengaturan').then((r) => r.json()),
      fetch('/api/admin/content?collection=audit-log').then((r) => r.json())
    ])
      .then(([peng, logs]) => {
        if (peng.success) setPengaturan(peng.data);
        if (logs.success) setAuditLogs(logs.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pengaturan) return;
    setSavingSettings(true);
    setSettingsMsg(null);

    try {
      const res = await fetch('/api/admin/content?collection=pengaturan', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pengaturan)
      });
      const data = await res.json();
      if (data.success) {
        setSettingsMsg({ type: 'success', text: 'Pengaturan website berhasil disimpan!' });
      } else {
        setSettingsMsg({ type: 'error', text: data.error || 'Gagal menyimpan pengaturan.' });
      }
    } catch {
      setSettingsMsg({ type: 'error', text: 'Terjadi kesalahan sistem.' });
    } finally {
      setSavingSettings(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassMsg(null);

    if (passwords.newPassword !== passwords.confirmNewPassword) {
      setPassMsg({ type: 'error', text: 'Konfirmasi kata sandi baru tidak cocok.' });
      return;
    }

    if (passwords.newPassword.length < 8) {
      setPassMsg({ type: 'error', text: 'Kata sandi baru minimal 8 karakter.' });
      return;
    }

    setChangingPass(true);

    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword
        })
      });
      const data = await res.json();
      if (data.success) {
        setPassMsg({ type: 'success', text: 'Kata sandi berhasil diperbarui! Silakan gunakan kata sandi baru untuk login berikutnya.' });
        setPasswords({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
      } else {
        setPassMsg({ type: 'error', text: data.error || 'Gagal mengganti kata sandi.' });
      }
    } catch {
      setPassMsg({ type: 'error', text: 'Terjadi kesalahan koneksi.' });
    } finally {
      setChangingPass(false);
    }
  };

  const filteredLogs = auditLogs.filter(
    (l) =>
      l.username.toLowerCase().includes(logSearch.toLowerCase()) ||
      l.aksi.toLowerCase().includes(logSearch.toLowerCase()) ||
      l.entitas.toLowerCase().includes(logSearch.toLowerCase()) ||
      l.keterangan.toLowerCase().includes(logSearch.toLowerCase())
  );

  if (loading) {
    return <div className="p-8 text-center text-slate-500 text-xs">Memuat pengaturan website...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
          Konfigurasi Sistem
        </span>
        <h1 className="text-2xl font-extrabold text-[#0f2042]">
          Pengaturan Website, Keamanan & Log Audit
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Kelola fitur tampilan beranda, ganti kata sandi akun administrator, dan pantau jejak audit perubahan data.
        </p>
      </div>

      {/* 1. Storage Adapter Mode Information */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
          <HardDrive className="w-4 h-4 text-blue-600" />
          <span>Status Arsitektur Penyimpanan Persisten</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <strong className="text-slate-900">Mode Penyimpanan Aktif:</strong>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Sistem menggunakan <strong>Atomic JSON Structured Filesystem Storage</strong>. Data tersimpan permanen di direktori internal <code className="bg-slate-200 px-1 py-0.5 rounded text-[11px]">/data/*.json</code> dan berkas media di <code className="bg-slate-200 px-1 py-0.5 rounded text-[11px]">/public/uploads/*</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2">
            <div className="flex items-center gap-2 text-blue-900 font-bold">
              <GitCommit className="w-4 h-4 text-blue-600" />
              <span>Dukungan Git-Backed Cloud Deployment:</span>
            </div>
            <p className="text-blue-950 leading-relaxed">
              Bila di-deploy ke Vercel/Netlify, cukup atur <code className="bg-blue-100 px-1 py-0.5 rounded text-[11px]">GITHUB_TOKEN</code> dan <code className="bg-blue-100 px-1 py-0.5 rounded text-[11px]">GITHUB_REPO</code> di Environment Variables untuk mengaktifkan otomatisasi commit langsung ke Git repositori tanpa kehilangan data serverless.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Homepage Features Settings */}
      {pengaturan && (
        <form onSubmit={handleSaveSettings} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Settings className="w-4 h-4 text-indigo-600" />
              <span>Pengaturan Konten Beranda</span>
            </h2>

            <button
              type="submit"
              disabled={savingSettings}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0f2042] hover:bg-blue-900 text-white font-bold text-xs shadow transition disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5 text-amber-400" />
              <span>{savingSettings ? 'Menyimpan...' : 'Simpan Pengaturan'}</span>
            </button>
          </div>

          {settingsMsg && (
            <div
              className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                settingsMsg.type === 'success'
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}
            >
              {settingsMsg.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              )}
              <span>{settingsMsg.text}</span>
            </div>
          )}

          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="tampilkanPengumumanPenting"
                checked={pengaturan.kontenBeranda.tampilkanPengumumanPenting}
                onChange={(e) =>
                  setPengaturan({
                    ...pengaturan,
                    kontenBeranda: { ...pengaturan.kontenBeranda, tampilkanPengumumanPenting: e.target.checked }
                  })
                }
                className="rounded text-blue-600"
              />
              <label htmlFor="tampilkanPengumumanPenting" className="font-semibold text-slate-800">
                Tampilkan Banner Pengumuman Penting di Beranda
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="tampilkanStatistik"
                checked={pengaturan.kontenBeranda.tampilkanStatistik}
                onChange={(e) =>
                  setPengaturan({
                    ...pengaturan,
                    kontenBeranda: { ...pengaturan.kontenBeranda, tampilkanStatistik: e.target.checked }
                  })
                }
                className="rounded text-blue-600"
              />
              <label htmlFor="tampilkanStatistik" className="font-semibold text-slate-800">
                Tampilkan Angka Statistik Capaian di Beranda
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="tampilkanLayananCepat"
                checked={pengaturan.kontenBeranda.tampilkanLayananCepat}
                onChange={(e) =>
                  setPengaturan({
                    ...pengaturan,
                    kontenBeranda: { ...pengaturan.kontenBeranda, tampilkanLayananCepat: e.target.checked }
                  })
                }
                className="rounded text-blue-600"
              />
              <label htmlFor="tampilkanLayananCepat" className="font-semibold text-slate-800">
                Tampilkan Pintasan Layanan Publik di Beranda
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="tampilkanGaleri"
                checked={pengaturan.kontenBeranda.tampilkanGaleri}
                onChange={(e) =>
                  setPengaturan({
                    ...pengaturan,
                    kontenBeranda: { ...pengaturan.kontenBeranda, tampilkanGaleri: e.target.checked }
                  })
                }
                className="rounded text-blue-600"
              />
              <label htmlFor="tampilkanGaleri" className="font-semibold text-slate-800">
                Tampilkan Cuplikan Galeri Dokumentasi di Beranda
              </label>
            </div>
          </div>
        </form>
      )}

      {/* 3. Change Password Section */}
      <form onSubmit={handleChangePassword} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
          <Lock className="w-4 h-4 text-amber-600" />
          <span>Keamanan Akun & Ganti Kata Sandi</span>
        </h2>

        {passMsg && (
          <div
            className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
              passMsg.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            {passMsg.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            )}
            <span>{passMsg.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Kata Sandi Saat Ini</label>
            <div className="relative">
              <input
                type={showCurrentPass ? 'text' : 'password'}
                required
                value={passwords.currentPassword}
                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg pr-9 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPass(!showCurrentPass)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Kata Sandi Baru (Min. 8 Karakter)</label>
            <div className="relative">
              <input
                type={showNewPass ? 'text' : 'password'}
                required
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg pr-9 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowNewPass(!showNewPass)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Ulangi Kata Sandi Baru</label>
            <input
              type="password"
              required
              value={passwords.confirmNewPassword}
              onChange={(e) => setPasswords({ ...passwords, confirmNewPassword: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={changingPass}
            className="px-5 py-2.5 rounded-lg bg-red-700 hover:bg-red-800 text-white font-bold text-xs shadow transition disabled:opacity-50"
          >
            {changingPass ? 'Memproses...' : 'Ubah Kata Sandi Admin'}
          </button>
        </div>
      </form>

      {/* 4. Full Audit Log Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600" />
            <span>Rekam Jejak Audit Log Perubahan Sistem</span>
          </h2>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={logSearch}
              onChange={(e) => setLogSearch(e.target.value)}
              placeholder="Cari aktivitas atau pengguna..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        <div className="overflow-x-auto max-h-96">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 sticky top-0 text-slate-600 uppercase font-semibold text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Waktu</th>
                <th className="py-2.5 px-3">Admin</th>
                <th className="py-2.5 px-3">Tindakan</th>
                <th className="py-2.5 px-3">Entitas</th>
                <th className="py-2.5 px-3">Rincian Perubahan</th>
                <th className="py-2.5 px-3">IP Pengakses</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition">
                  <td className="py-2.5 px-3 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                    {new Date(log.timestamp).toLocaleString('id-ID')}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">
                    {log.username}
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.aksi === 'CREATE'
                          ? 'bg-emerald-100 text-emerald-800'
                          : log.aksi === 'UPDATE'
                          ? 'bg-blue-100 text-blue-800'
                          : log.aksi === 'DELETE'
                          ? 'bg-red-100 text-red-800'
                          : log.aksi === 'LOGIN'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {log.aksi}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-700 whitespace-nowrap">
                    {log.entitas}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">
                    {log.keterangan}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">
                    {log.ipAddress || '127.0.0.1'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
