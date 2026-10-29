import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  ExternalLink,
  Lock,
  ChevronRight,
  HeartHandshake
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#091326] text-slate-300 border-t-4 border-[#b91c1c] no-print">
      {/* Top Banner */}
      <div className="bg-[#0c1833] py-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-red-600/20 border border-red-500/40 text-red-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">
                KOMITMEN WILAYAH BEBAS DARI KORUPSI (WBK)
              </h4>
              <p className="text-xs text-slate-400">
                Seluruh pelayanan kunjungan, pembebasan integrasi, dan layanan informasi TIDAK DIPUNGUT BIAYA (Rp 0).
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://www.lapor.go.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded border border-slate-700 flex items-center gap-1.5 transition"
            >
              <span>SP4N LAPOR!</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
            <a
              href="https://wbs.kemenkumham.go.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded border border-slate-700 flex items-center gap-1.5 transition"
            >
              <span>WBS Kemenkumham</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Identity Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded bg-blue-950 border border-amber-400/80 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
              </div>
              <span className="font-bold text-white tracking-tight text-sm">
                LPKA KELAS II LOMBOK TENGAH
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unit Pelaksana Teknis Pemasyarakatan ramah anak di bawah naungan Kantor Wilayah Kementerian Hukum dan Hak Asasi Manusia Nusa Tenggara Barat.
            </p>
            <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg">
              <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                Tata Nilai Utama
              </div>
              <div className="text-xs font-bold text-white mt-0.5">
                PASTI BERSAHAJA
              </div>
              <div className="text-[11px] text-slate-400">
                Bersih, Santun, Handal, dan Berkinerja
              </div>
            </div>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wide border-b border-slate-800 pb-2">
              Kontak & Alamat
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>
                  Jl. Pemasyarakatan No. 01, Kelurahan Prapen, Kecamatan Praya, Kabupaten Lombok Tengah, NTB 83511
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Telepon: (0370) 654-XXXX (Data Simulasi)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>lpka.lomboktengah@kemenkumham.go.id</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>
                  Layanan PTSP: Senin - Kamis (08.00 - 15.00 WITA) | Jumat (08.00 - 11.30 WITA)
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wide border-b border-slate-800 pb-2">
              Tautan Cepat
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/profil" className="text-slate-400 hover:text-white flex items-center gap-1.5 transition">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Profil & Sejarah LPKA</span>
                </Link>
              </li>
              <li>
                <Link href="/profil/struktur-organisasi" className="text-slate-400 hover:text-white flex items-center gap-1.5 transition">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Struktur Organisasi & Pejabat</span>
                </Link>
              </li>
              <li>
                <Link href="/layanan" className="text-slate-400 hover:text-white flex items-center gap-1.5 transition">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Jadwal & Prosedur Kunjungan</span>
                </Link>
              </li>
              <li>
                <Link href="/informasi-publik" className="text-slate-400 hover:text-white flex items-center gap-1.5 transition">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Daftar Informasi Publik (PPID)</span>
                </Link>
              </li>
              <li>
                <Link href="/berita" className="text-slate-400 hover:text-white flex items-center gap-1.5 transition">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Berita & Pembinaan Vokasional</span>
                </Link>
              </li>
              <li>
                <Link href="/pengumuman" className="text-slate-400 hover:text-white flex items-center gap-1.5 transition">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Pengumuman & Maklumat</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Institutional Links & Admin */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wide border-b border-slate-800 pb-2">
              Kanal Resmi & Portal
            </h4>
            <p className="text-xs text-slate-400">
              Terhubung dengan portal nasional Kementerian Hukum dan HAM serta Direktorat Jenderal Pemasyarakatan.
            </p>
            <div className="space-y-2 pt-1">
              <a
                href="https://kemenkumham.go.id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-300 hover:text-white block hover:underline"
              >
                • Portal Kemenkumham RI
              </a>
              <a
                href="https://ditjenpas.go.id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-300 hover:text-white block hover:underline"
              >
                • Ditjen Pemasyarakatan
              </a>
              <a
                href="https://ntb.kemenkumham.go.id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-300 hover:text-white block hover:underline"
              >
                • Kanwil Kemenkumham NTB
              </a>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium py-1 px-2.5 rounded bg-amber-500/10 border border-amber-500/20 transition"
              >
                <Lock className="w-3 h-3" />
                <span>Masuk Panel Pengelola CMS</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright & Disclaimer */}
      <div className="bg-[#050a14] py-4 border-t border-slate-900 text-center text-xs text-slate-500 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © 2025 LPKA Kelas II Lombok Tengah - Hak Cipta Dilindungi Undang-Undang.
          </div>
          <div className="text-[11px] text-slate-500">
            Prototipe Sistem Informasi Publik Resmi (Arsitektur Tanpa Database Relasional)
          </div>
        </div>
      </div>
    </footer>
  );
}
