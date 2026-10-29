'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  Users,
  GitFork,
  FileText,
  Bell,
  Download,
  HeartHandshake,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
  User,
  ShieldAlert
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Exclude login and setup from dashboard shell
  const isAuthPage = pathname === '/admin/login' || pathname === '/admin/setup';

  useEffect(() => {
    if (isAuthPage) {
      setIsLoading(false);
      return;
    }

    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok) {
          router.replace('/admin/login');
          return;
        }
        const data = await res.json();
        if (data.authenticated && data.user) {
          setCurrentUser(data.user);
        } else {
          router.replace('/admin/login');
        }
      } catch {
        router.replace('/admin/login');
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, [pathname, isAuthPage, router]);

  const handleLogout = async () => {
    if (confirm('Apakah Anda yakin ingin keluar dari Panel Pengelola?')) {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.replace('/admin/login');
    }
  };

  if (isAuthPage) {
    return <div className="min-h-screen bg-slate-100">{children}</div>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-xs">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <span>Memverifikasi sesi administrator...</span>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Profil Instansi', href: '/admin/profil', icon: Building2 },
    { label: 'Data Pegawai', href: '/admin/pegawai', icon: Users },
    { label: 'Struktur Organisasi', href: '/admin/struktur-organisasi', icon: GitFork },
    { label: 'Berita & Kegiatan', href: '/admin/berita', icon: FileText },
    { label: 'Pengumuman', href: '/admin/pengumuman', icon: Bell },
    { label: 'Informasi Publik (PPID)', href: '/admin/informasi-publik', icon: Download },
    { label: 'Layanan Publik', href: '/admin/layanan', icon: HeartHandshake },
    { label: 'Galeri Foto', href: '/admin/galeri', icon: ImageIcon },
    { label: 'Pengaturan & Log', href: '/admin/pengaturan', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans">
      {/* Mobile Header Bar */}
      <div className="md:hidden bg-[#0f2042] text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          <span className="font-bold text-sm">CMS LPKA Lombok Tengah</span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-1 rounded bg-slate-800 text-white"
        >
          {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-[#091326] text-slate-300 flex flex-col justify-between transition-transform duration-300 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Institution Header */}
          <div className="p-5 border-b border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-950 border border-amber-400/80 flex items-center justify-center text-amber-400 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-red-500 tracking-wider block">
                Panel Pengelola
              </span>
              <span className="text-xs font-bold text-white tracking-tight leading-tight block">
                LPKA KELAS II LOTENG
              </span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)]">
            {navItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition ${
                    active
                      ? 'bg-blue-600 text-white font-semibold shadow'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Account & Bottom Actions */}
        <div className="p-4 border-t border-slate-800 bg-[#050a14] space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center text-xs font-bold border border-slate-700">
              <User className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">
                {currentUser?.name || 'Administrator'}
              </div>
              <div className="text-[10px] text-emerald-400 font-mono">
                {currentUser?.role?.toUpperCase() || 'SUPERADMIN'}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs">
            <Link
              href="/"
              target="_blank"
              className="text-slate-400 hover:text-white flex items-center gap-1 transition"
              title="Lihat Website Publik"
            >
              <span>Website</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 flex items-center gap-1 transition font-medium"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Body */}
      <main className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 hidden md:flex items-center justify-between shadow-sm sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Portal Administrasi Resmi
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-600 font-medium">
              LPKA Kelas II Lombok Tengah (Penyimpanan Persisten Bebas Database)
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
            >
              <span>Lihat Halaman Publik</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </header>

        {/* Content Children */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
