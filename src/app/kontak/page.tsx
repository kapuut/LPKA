import React from 'react';
import PublicLayout from '@/components/PublicLayout';
import Breadcrumb from '@/components/Breadcrumb';
import ContactForm from '@/components/ContactForm';
import { getProfil } from '@/lib/storage';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  ExternalLink,
  MessageSquare,
  Globe
} from 'lucide-react';

export const metadata = {
  title: 'Kontak Resmi & Kanal Pengaduan',
  description: 'Alamat resmi, nomor telepon, WhatsApp pengaduan, jam operasional PTSP, dan peta lokasi LPKA Kelas II Lombok Tengah.'
};

export default async function KontakPage() {
  const profil = await getProfil();

  return (
    <PublicLayout>
      <Breadcrumb items={[{ label: 'Kontak & Lokasi' }]} />

      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#091326] via-[#0f2042] to-[#1e3a8a] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <Phone className="w-4 h-4" />
              <span>HUBUNGI KAMI & PENGADUAN RESMI</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Kontak & Lokasi Kantor
            </h1>
            <p className="text-sm sm:text-base text-slate-300">
              Pelayanan Terpadu Satu Pintu (PTSP) LPKA Kelas II Lombok Tengah siap melayani masyarakat dan keluarga anak binaan.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-[#0f2042] border-b border-slate-100 pb-3">
                Informasi Kontak Kedinasan
              </h2>

              <ul className="space-y-4 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900">Alamat Kantor:</strong>
                    <span className="text-slate-600 leading-relaxed">{profil.alamat}</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900">Telepon & WhatsApp Pengaduan:</strong>
                    <span className="text-slate-600 font-mono">{profil.telepon}</span>
                    <div className="text-emerald-700 font-semibold font-mono mt-0.5">
                      Hotline WA: {profil.hotlinePengaduan}
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900">Email Resmi Dinas:</strong>
                    <span className="text-slate-600 font-mono">{profil.email}</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900">Jam Operasional Pelayanan:</strong>
                    <span className="text-slate-600 leading-relaxed">{profil.jamLayanan}</span>
                  </div>
                </li>
              </ul>

              {/* Social Media links */}
              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-600 block mb-3 uppercase tracking-wider">
                  Media Sosial Resmi
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={profil.mediaSosial?.facebook || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:opacity-90 transition"
                    title="Facebook"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href={profil.mediaSosial?.instagram || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center hover:opacity-90 transition"
                    title="Instagram"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href={profil.mediaSosial?.twitter || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center hover:opacity-90 transition"
                    title="X (Twitter)"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a
                    href={profil.mediaSosial?.youtube || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-red-600 text-white flex items-center justify-center hover:opacity-90 transition"
                    title="YouTube"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* National Complaint Channels Box */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Kanal Pengaduan Nasional</span>
              </div>
              <h3 className="text-sm font-bold">
                SP4N LAPOR! & WBS Kemenkumham
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Anda juga dapat melaporkan dugaan pelanggaran integritas secara berjenjang melalui sistem pengawasan resmi pemerintah.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href="https://www.lapor.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
                >
                  <span>www.lapor.go.id</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
                <a
                  href="https://wbs.kemenkumham.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
                >
                  <span>wbs.kemenkumham.go.id</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Complaint Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                Layanan Daring 24 Jam
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0f2042] mt-0.5">
                Kirim Pertanyaan / Pengaduan Daring
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Sampaikan permohonan informasi, konfirmasi jadwal, atau aspirasi perbaikan layanan secara langsung ke petugas kami.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>

        {/* Map Location Section */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <MapPin className="w-5 h-5 text-red-600" />
            <span>Peta Lokasi LPKA Kelas II Lombok Tengah (Praya, NTB)</span>
          </div>

          <div className="rounded-xl overflow-hidden h-96 w-full bg-slate-100 border border-slate-200 relative">
            <iframe
              src={profil.koordinatPeta?.embedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15774.20817926839!2d116.265!3d-8.706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dcdb70000000000%3A0x0!2sPraya%2C%20Lombok%20Tengah!5e0!3m2!1sid!2sid!4v1700000000000"}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Lokasi LPKA Kelas II Lombok Tengah"
            />
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
