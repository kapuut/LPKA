'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nama: '',
    nik: '',
    email: '',
    telepon: '',
    kategori: 'Informasi Layanan',
    pesan: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending & logging
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-emerald-950">
          Pesan / Pengaduan Berhasil Dikirimkan
        </h3>
        <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
          Terima kasih atas aspirasi Anda. Nomor registrasi aduan tiket Anda telah dibuat secara otomatis. Petugas pelayanan LPKA Kelas II Lombok Tengah akan menindaklanjuti dalam waktu maksimal 3 hari kerja.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ nama: '', nik: '', email: '', telepon: '', kategori: 'Informasi Layanan', pesan: '' });
          }}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold"
        >
          Kirim Pesan Lainnya
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.nama}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            placeholder="Sesuai KTP"
            className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Nomor e-KTP / NIK <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            maxLength={16}
            value={formData.nik}
            onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
            placeholder="16 digit NIK"
            className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Nomor WhatsApp / Telepon <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={formData.telepon}
            onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
            placeholder="0812XXXXXXXX"
            className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Alamat Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="email@anda.com"
            className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">
          Kategori Pengaduan / Aspirasi
        </label>
        <select
          value={formData.kategori}
          onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
          className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="Informasi Layanan">Permohonan Informasi Layanan Kunjungan</option>
          <option value="Pengaduan Pelayanan">Pengaduan Dugaan Penyimpangan / Pungli</option>
          <option value="Integrasi PB CB">Konsultasi Hak Integrasi Pembebasan</option>
          <option value="Aspirasi Umum">Kritik & Saran Pembangunan Instansi</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">
          Isi Pesan / Uraian Pengaduan <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={4}
          value={formData.pesan}
          onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
          placeholder="Tuliskan pesan, kronologi kejadian, atau rincian informasi yang Anda butuhkan..."
          className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 rounded-lg bg-[#0f2042] hover:bg-blue-900 text-white font-semibold text-xs flex items-center justify-center gap-2 transition disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
        <span>{isSubmitting ? 'Mengirimkan Pesan...' : 'Kirim Pesan Resmi'}</span>
      </button>
    </form>
  );
}
