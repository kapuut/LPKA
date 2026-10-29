import React from 'react';
import PublicLayout from '@/components/PublicLayout';
import Breadcrumb from '@/components/Breadcrumb';
import OrgChartViewer from '@/components/OrgChartViewer';
import { getPegawaiList } from '@/lib/storage';
import { Users, ShieldAlert, Lock } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Struktur Organisasi & Kepegawaian',
  description: 'Bagan hierarki jabatan struktural dan fungsional Lembaga Pembinaan Khusus Anak Kelas II Lombok Tengah.'
};

export default async function StrukturOrganisasiPage() {
  const pegawaiList = await getPegawaiList();

  return (
    <PublicLayout>
      <Breadcrumb
        items={[
          { label: 'Profil Instansi', href: '/profil' },
          { label: 'Struktur Organisasi' }
        ]}
      />

      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#091326] via-[#0f2042] to-[#1e3a8a] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>BAGAN STRUKTUR RESMI KEDINASAN</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Struktur Organisasi & Pejabat
            </h1>
            <p className="text-sm sm:text-base text-slate-300">
              Bagan hierarki pembagian wewenang, unit kerja operasional, serta aparatur sipil negara di lingkungan LPKA Kelas II Lombok Tengah.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Notice on dynamic data & admin control */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-900 no-print">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-blue-700 flex-shrink-0" />
            <span>
              Bagan hierarki ini dihasilkan secara <strong>dinamis dari sistem data tersimpan</strong>. Admin berwenang dapat menambah, mengedit, menghapus, serta mengatur relasi atasan-bawahan dan urutan pegawai.
            </span>
          </div>
          <Link
            href="/admin/struktur-organisasi"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0f2042] hover:bg-blue-950 text-white font-semibold rounded-lg text-xs whitespace-nowrap transition flex-shrink-0"
          >
            <Lock className="w-3 h-3 text-amber-400" />
            <span>Kelola di Panel Admin</span>
          </Link>
        </div>

        {/* Dynamic Org Chart Viewer Component */}
        <OrgChartViewer pegawaiList={pegawaiList} />
      </div>
    </PublicLayout>
  );
}
