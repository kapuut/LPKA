import React from 'react';
import Link from 'next/link';
import { Clock, Phone, ShieldCheck, Lock } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-[#091326] text-slate-300 text-xs border-b border-slate-800 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Senin - Jumat: 08.00 - 15.00 WITA</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pengaduan & Info: (0370) 654-XXXX / WA Resmi</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zona Integritas Bebas Pungli (WBK/WBBM)</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="/informasi-publik"
            className="hover:text-white transition hover:underline"
          >
            Standar Layanan PPID
          </Link>
          <span className="text-slate-600">|</span>
          <Link
            href="/admin/login"
            className="flex items-center gap-1 text-slate-400 hover:text-white transition bg-slate-800/80 hover:bg-slate-700 px-2 py-0.5 rounded border border-slate-700"
          >
            <Lock className="w-3 h-3 text-amber-400" />
            <span>Panel Admin</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
