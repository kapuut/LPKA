'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ChevronDown,
  Search,
  Building2,
  Users,
  FileText,
  Bell,
  Image as ImageIcon,
  LifeBuoy,
  PhoneCall,
  ShieldCheck
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profilDropdown, setProfilDropdown] = useState(false);
  const [publikasiDropdown, setPublikasiDropdown] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur shadow-sm border-b border-slate-200">
      {/* Red-White Indonesian Accent Ribbon */}
      <div className="h-1 bg-gradient-to-r from-red-600 via-red-500 to-slate-200" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Institution Identity */}
          <Link href="/" className="flex items-center gap-3.5 group">
            {/* Official Placeholder Emblem */}
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0f2042] to-[#1e3a8a] text-white flex items-center justify-center shadow-md border-2 border-amber-400/80 group-hover:scale-105 transition flex-shrink-0">
              <ShieldCheck className="w-7 h-7 text-amber-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] tracking-wider uppercase font-semibold text-red-700">
                Kemenkumham RI • Kanwil NTB
              </span>
              <span className="text-base sm:text-lg font-bold text-[#0f2042] tracking-tight leading-tight">
                LPKA KELAS II LOMBOK TENGAH
              </span>
              <span className="text-[11px] text-slate-500 hidden sm:block">
                Lembaga Pembinaan Khusus Anak Ramah & Edukatif
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                isActive('/') && pathname === '/'
                  ? 'text-[#0f2042] bg-slate-100 font-semibold'
                  : 'text-slate-700 hover:text-[#0f2042] hover:bg-slate-50'
              }`}
            >
              Beranda
            </Link>

            {/* Profil Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProfilDropdown(true)}
              onMouseLeave={() => setProfilDropdown(false)}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition ${
                  pathname.startsWith('/profil')
                    ? 'text-[#0f2042] bg-slate-100 font-semibold'
                    : 'text-slate-700 hover:text-[#0f2042] hover:bg-slate-50'
                }`}
              >
                <span>Profil</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {profilDropdown && (
                <div className="absolute left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50 animate-fadeIn">
                  <Link
                    href="/profil"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#0f2042] transition"
                  >
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="font-medium">Profil Instansi</div>
                      <div className="text-xs text-slate-400">Sejarah, visi misi & tusi</div>
                    </div>
                  </Link>
                  <Link
                    href="/profil/struktur-organisasi"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#0f2042] transition"
                  >
                    <Users className="w-4 h-4 text-indigo-600" />
                    <div>
                      <div className="font-medium">Struktur Organisasi</div>
                      <div className="text-xs text-slate-400">Bagan hierarki & pegawai</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/layanan"
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                isActive('/layanan')
                  ? 'text-[#0f2042] bg-slate-100 font-semibold'
                  : 'text-slate-700 hover:text-[#0f2042] hover:bg-slate-50'
              }`}
            >
              Layanan
            </Link>

            <Link
              href="/informasi-publik"
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                isActive('/informasi-publik')
                  ? 'text-[#0f2042] bg-slate-100 font-semibold'
                  : 'text-slate-700 hover:text-[#0f2042] hover:bg-slate-50'
              }`}
            >
              Informasi Publik (PPID)
            </Link>

            {/* Publikasi Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setPublikasiDropdown(true)}
              onMouseLeave={() => setPublikasiDropdown(false)}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition ${
                  pathname.startsWith('/berita') || pathname.startsWith('/pengumuman') || pathname.startsWith('/galeri')
                    ? 'text-[#0f2042] bg-slate-100 font-semibold'
                    : 'text-slate-700 hover:text-[#0f2042] hover:bg-slate-50'
                }`}
              >
                <span>Publikasi</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {publikasiDropdown && (
                <div className="absolute left-0 mt-1 w-60 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
                  <Link
                    href="/berita"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#0f2042] transition"
                  >
                    <FileText className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="font-medium">Berita & Kegiatan</div>
                      <div className="text-xs text-slate-400">Kabar kegiatan terbaru</div>
                    </div>
                  </Link>
                  <Link
                    href="/pengumuman"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#0f2042] transition"
                  >
                    <Bell className="w-4 h-4 text-amber-600" />
                    <div>
                      <div className="font-medium">Pengumuman</div>
                      <div className="text-xs text-slate-400">Maklumat & surat resmi</div>
                    </div>
                  </Link>
                  <Link
                    href="/galeri"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#0f2042] transition"
                  >
                    <ImageIcon className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="font-medium">Galeri Dokumentasi</div>
                      <div className="text-xs text-slate-400">Foto pembinaan & vokasi</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/kontak"
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                isActive('/kontak')
                  ? 'text-[#0f2042] bg-slate-100 font-semibold'
                  : 'text-slate-700 hover:text-[#0f2042] hover:bg-slate-50'
              }`}
            >
              Kontak
            </Link>

            {/* Quick Search */}
            <Link
              href="/pencarian"
              className="p-2 ml-2 text-slate-500 hover:text-[#0f2042] hover:bg-slate-100 rounded-full transition"
              title="Pencarian Website"
            >
              <Search className="w-4 h-4" />
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden gap-2">
            <Link
              href="/pencarian"
              className="p-2 text-slate-600 hover:text-[#0f2042] hover:bg-slate-100 rounded-md"
              title="Cari"
            >
              <Search className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#0f2042] hover:bg-slate-100 rounded-md"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-slate-100"
          >
            Beranda
          </Link>
          <div className="pt-1 pb-1">
            <div className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Profil Instansi
            </div>
            <Link
              href="/profil"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-100 ml-2"
            >
              • Profil, Visi, Misi & Tusi
            </Link>
            <Link
              href="/profil/struktur-organisasi"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-100 ml-2"
            >
              • Struktur Organisasi & Pegawai
            </Link>
          </div>
          <Link
            href="/layanan"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-slate-100"
          >
            Layanan Publik
          </Link>
          <Link
            href="/informasi-publik"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-slate-100"
          >
            Informasi Publik (PPID)
          </Link>
          <div className="pt-1 pb-1">
            <div className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Publikasi
            </div>
            <Link
              href="/berita"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-100 ml-2"
            >
              • Berita & Kegiatan
            </Link>
            <Link
              href="/pengumuman"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-100 ml-2"
            >
              • Pengumuman Resmi
            </Link>
            <Link
              href="/galeri"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-100 ml-2"
            >
              • Galeri Dokumentasi
            </Link>
          </div>
          <Link
            href="/kontak"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:bg-slate-100"
          >
            Kontak & Pengaduan
          </Link>
          <div className="pt-3 border-t border-slate-100">
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-2 px-4 rounded-md text-sm font-semibold bg-[#0f2042] text-white"
            >
              Masuk Panel Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
