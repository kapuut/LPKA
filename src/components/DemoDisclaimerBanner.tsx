'use client';

import React, { useState } from 'react';
import { AlertCircle, X, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function DemoDisclaimerBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-amber-500 text-slate-900 border-b border-amber-600 px-4 py-2 text-xs font-medium no-print transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-slate-950 flex-shrink-0" />
          <span>
            <strong>PROTOTIPE WEBSITE INFORMASI PUBLIK:</strong> Seluruh data pejabat, NIP, surat, dan dokumen dinas diberi label <span className="underline font-bold">(Data Simulasi / Prototipe)</span> dan dapat diperbarui melalui{' '}
            <Link href="/admin/login" className="underline font-bold hover:text-black transition">
              Panel Admin
            </Link>
            .
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-slate-900 hover:text-black p-1 rounded hover:bg-amber-400"
          title="Tutup pemberitahuan"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
