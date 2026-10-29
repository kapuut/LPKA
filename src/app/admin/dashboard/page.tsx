import React from 'react';
import {
  getBeritaList,
  getPengumumanList,
  getDokumenList,
  getPegawaiList,
  getGaleriList,
  getLayananList,
  isGitModeEnabled
} from '@/lib/storage';
import { getAuditLogs } from '@/lib/audit';
import {
  FileText,
  Bell,
  Download,
  Users,
  Image as ImageIcon,
  HeartHandshake,
  ShieldCheck,
  TrendingUp,
  Activity,
  PlusCircle,
  ExternalLink,
  GitFork,
  HardDrive,
  GitCommit
} from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Dashboard Pengelola'
};

export default async function AdminDashboardPage() {
  const [berita, pengumuman, dokumen, pegawai, galeri, layanan, auditLogs] = await Promise.all([
    getBeritaList(),
    getPengumumanList(),
    getDokumenList(),
    getPegawaiList(),
    getGaleriList(),
    getLayananList(),
    getAuditLogs()
  ]);

  const jumlahBeritaPublik = berita.filter(b => b.status === 'published').length;
  const jumlahBeritaDraft = berita.filter(b => b.status === 'draft').length;
  const jumlahPengumumanAktif = pengumuman.filter(p => p.status === 'aktif').length;
  const jumlahDokumen = dokumen.length;
  const jumlahPegawai = pegawai.length;
  const gitMode = isGitModeEnabled();

  const stats = [
    { label: 'Berita Terbit', value: jumlahBeritaPublik, sub: `${jumlahBeritaDraft} draft`, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pengumuman Aktif', value: jumlahPengumumanAktif, sub: 'Maklumat kedinasan', icon: Bell, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Dokumen PPID', value: jumlahDokumen, sub: 'Laporan & Regulasi', icon: Download, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Data Kepegawaian', value: jumlahPegawai, sub: 'Struktur organisasi', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Galeri Kegiatan', value: galeri.length, sub: 'Foto dokumentasi', icon: ImageIcon, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Layanan Terpadu', value: layanan.length, sub: 'SOP & Prosedur', icon: HeartHandshake, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0f2042] to-[#1e3a8a] text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/50 text-blue-200 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>SISTEM INFORMASI PUBLIK PERSISTEN</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Dashboard Pengelola LPKA
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Kelola profil resmi, warta kegiatan, data kepegawaian, dokumen PPID, dan layanan terpadu secara persisten tanpa database relasional.
          </p>
        </div>

        {/* Storage Engine Status Badge */}
        <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/15 flex items-center gap-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            {gitMode ? <GitCommit className="w-5 h-5" /> : <HardDrive className="w-5 h-5" />}
          </div>
          <div>
            <div className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">
              Mode Penyimpanan Aktif:
            </div>
            <div className="text-sm font-bold text-white">
              {gitMode ? 'Git-Backed Cloud Sync' : 'Atomic Local File Storage'}
            </div>
            <div className="text-[10px] text-emerald-300">
              ● 100% Persisten & Siap Deployment
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((st, i) => {
          const Icon = st.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">{st.label}</span>
                <div className={`w-8 h-8 rounded-lg ${st.bg} ${st.color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {st.value}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {st.sub}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Shortcuts */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <PlusCircle className="w-4 h-4 text-blue-600" />
          <span>Aksi Cepat Pengelolaan</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          <Link
            href="/admin/berita"
            className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-blue-50 hover:border-blue-300 transition text-center space-y-1.5"
          >
            <FileText className="w-5 h-5 mx-auto text-blue-600" />
            <span className="block text-xs font-bold text-slate-800">Tulis Berita</span>
          </Link>

          <Link
            href="/admin/pengumuman"
            className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-amber-50 hover:border-amber-300 transition text-center space-y-1.5"
          >
            <Bell className="w-5 h-5 mx-auto text-amber-600" />
            <span className="block text-xs font-bold text-slate-800">Buat Pengumuman</span>
          </Link>

          <Link
            href="/admin/pegawai"
            className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-indigo-50 hover:border-indigo-300 transition text-center space-y-1.5"
          >
            <Users className="w-5 h-5 mx-auto text-indigo-600" />
            <span className="block text-xs font-bold text-slate-800">Data Pegawai</span>
          </Link>

          <Link
            href="/admin/struktur-organisasi"
            className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-teal-50 hover:border-teal-300 transition text-center space-y-1.5"
          >
            <GitFork className="w-5 h-5 mx-auto text-teal-600" />
            <span className="block text-xs font-bold text-slate-800">Bagan Struktur</span>
          </Link>

          <Link
            href="/admin/informasi-publik"
            className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-emerald-50 hover:border-emerald-300 transition text-center space-y-1.5"
          >
            <Download className="w-5 h-5 mx-auto text-emerald-600" />
            <span className="block text-xs font-bold text-slate-800">Upload Dokumen</span>
          </Link>

          <Link
            href="/admin/galeri"
            className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-purple-50 hover:border-purple-300 transition text-center space-y-1.5"
          >
            <ImageIcon className="w-5 h-5 mx-auto text-purple-600" />
            <span className="block text-xs font-bold text-slate-800">Upload Galeri</span>
          </Link>
        </div>
      </div>

      {/* Recent Activity Audit Logs */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Aktivitas Publikasi & Perubahan Konten Terkini
            </h2>
          </div>
          <Link
            href="/admin/pengaturan"
            className="text-xs font-bold text-blue-700 hover:underline"
          >
            Lihat Semua Log Audit →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Waktu</th>
                <th className="py-2.5 px-3">Pengguna</th>
                <th className="py-2.5 px-3">Aksi</th>
                <th className="py-2.5 px-3">Entitas</th>
                <th className="py-2.5 px-3">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {auditLogs.slice(0, 8).map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition">
                  <td className="py-2.5 px-3 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                    {new Date(log.timestamp).toLocaleString('id-ID')}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800">
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
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {log.aksi}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-700">
                    {log.entitas}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">
                    {log.keterangan}
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
