import React from 'react';
import PublicLayout from '@/components/PublicLayout';
import Breadcrumb from '@/components/Breadcrumb';
import GaleriViewer from '@/components/GaleriViewer';
import { getGaleriList } from '@/lib/storage';
import { Image as ImageIcon, ShieldAlert } from 'lucide-react';

export const metadata = {
  title: 'Galeri Dokumentasi Kegiatan Pembinaan',
  description: 'Dokumentasi visual pelatihan kemandirian vokasi, pembinaan kepribadian, dan pendidikan anak binaan LPKA Kelas II Lombok Tengah.'
};

export default async function GaleriPage() {
  const galeriList = await getGaleriList();

  return (
    <PublicLayout>
      <Breadcrumb items={[{ label: 'Galeri Dokumentasi' }]} />

      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#091326] via-[#0f2042] to-[#1e3a8a] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4" />
              <span>DOKUMENTASI VISUAL RESMI</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Galeri Kegiatan Pembinaan
            </h1>
            <p className="text-sm sm:text-base text-slate-300">
              Potret aktivitas positif, pelatihan kerja, pendidikan, dan bimbingan mental spiritual di LPKA Kelas II Lombok Tengah.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3 text-xs text-amber-900">
          <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0" />
          <span>
            <strong>Perlindungan Privasi Anak:</strong> Seluruh publikasi dokumentasi mematuhi Undang-Undang Sistem Peradilan Pidana Anak (UU No. 11/2012) dengan tidak menampilkan wajah atau identitas sensitif anak binaan secara terbuka.
          </span>
        </div>

        <GaleriViewer galeriList={galeriList} />
      </div>
    </PublicLayout>
  );
}
