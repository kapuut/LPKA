'use client';

import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, CheckCircle2, AlertCircle, Building2 } from 'lucide-react';
import { InstansiProfil } from '@/lib/types';

export default function AdminProfilPage() {
  const [data, setData] = useState<InstansiProfil | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/admin/content?collection=profil')
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setData(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/content?collection=profil', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const resData = await res.json();
      if (resData.success) {
        setMessage({ type: 'success', text: 'Profil instansi berhasil diperbarui dan tersimpan persisten!' });
      } else {
        setMessage({ type: 'error', text: resData.error || 'Gagal menyimpan profil.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Terjadi kesalahan koneksi saat menyimpan.' });
    } finally {
      setSaving(false);
    }
  };

  // Misi handlers
  const handleAddMisi = () => {
    if (!data) return;
    setData({ ...data, misi: [...data.misi, ''] });
  };
  const handleMisiChange = (idx: number, val: string) => {
    if (!data) return;
    const newMisi = [...data.misi];
    newMisi[idx] = val;
    setData({ ...data, misi: newMisi });
  };
  const handleRemoveMisi = (idx: number) => {
    if (!data) return;
    setData({ ...data, misi: data.misi.filter((_, i) => i !== idx) });
  };

  // Fungsi handlers
  const handleAddFungsi = () => {
    if (!data) return;
    setData({ ...data, fungsi: [...data.fungsi, ''] });
  };
  const handleFungsiChange = (idx: number, val: string) => {
    if (!data) return;
    const newF = [...data.fungsi];
    newF[idx] = val;
    setData({ ...data, fungsi: newF });
  };
  const handleRemoveFungsi = (idx: number) => {
    if (!data) return;
    setData({ ...data, fungsi: data.fungsi.filter((_, i) => i !== idx) });
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500 text-xs">
        Memuat data profil instansi...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8 text-center text-red-500 text-xs">
        Data profil tidak dapat dimuat.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            Pengaturan Identitas
          </span>
          <h1 className="text-2xl font-extrabold text-[#0f2042]">
            Kelola Profil & Sejarah Instansi
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Perubahan akan langsung diperbarui pada halaman publik beranda, tentang kami, dan kontak.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0f2042] hover:bg-blue-900 text-white rounded-lg text-xs font-bold shadow transition disabled:opacity-50"
        >
          <Save className="w-4 h-4 text-amber-400" />
          <span>{saving ? 'Menyimpan...' : 'Simpan Perubahan Profil'}</span>
        </button>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2.5 ${
            message.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Identitas Utama */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
            Nama & Slogan Kedinasan
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nama Lengkap Instansi
              </label>
              <input
                type="text"
                value={data.namaInstansi}
                onChange={(e) => setData({ ...data, namaInstansi: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nama Singkat
              </label>
              <input
                type="text"
                value={data.namaSingkat}
                onChange={(e) => setData({ ...data, namaSingkat: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nama Kementerian / Kanwil Pengampu
            </label>
            <input
              type="text"
              value={data.namaResmiKementerian}
              onChange={(e) => setData({ ...data, namaResmiKementerian: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Slogan Utama Instansi
            </label>
            <input
              type="text"
              value={data.slogan}
              onChange={(e) => setData({ ...data, slogan: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-bold text-blue-900"
            />
          </div>
        </div>

        {/* Sejarah & Visi Misi */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
            Sejarah, Visi & Misi
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Sejarah Lembaga
            </label>
            <textarea
              rows={5}
              value={data.sejarah}
              onChange={(e) => setData({ ...data, sejarah: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Visi Instansi
            </label>
            <textarea
              rows={2}
              value={data.visi}
              onChange={(e) => setData({ ...data, visi: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
            />
          </div>

          {/* Dynamic Misi List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700">
                Poin-Poin Misi Instansi
              </label>
              <button
                type="button"
                onClick={handleAddMisi}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 hover:text-blue-900 bg-blue-50 px-2.5 py-1 rounded"
              >
                <Plus className="w-3 h-3" />
                <span>Tambah Misi</span>
              </button>
            </div>
            <div className="space-y-2">
              {data.misi.map((m, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-6 text-xs text-slate-400 font-bold">{idx + 1}.</span>
                  <input
                    type="text"
                    value={m}
                    onChange={(e) => handleMisiChange(idx, e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveMisi(idx)}
                    className="p-1.5 text-red-500 hover:text-red-700"
                    title="Hapus poin misi"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tugas Pokok & Fungsi */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
            Tugas Pokok & Fungsi (Tusi)
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Tugas Pokok
            </label>
            <textarea
              rows={3}
              value={data.tugasPokok}
              onChange={(e) => setData({ ...data, tugasPokok: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700">
                Fungsi-Fungsi Pelaksanaan
              </label>
              <button
                type="button"
                onClick={handleAddFungsi}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 hover:text-blue-900 bg-blue-50 px-2.5 py-1 rounded"
              >
                <Plus className="w-3 h-3" />
                <span>Tambah Fungsi</span>
              </button>
            </div>
            <div className="space-y-2">
              {data.fungsi.map((f, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-6 text-xs text-slate-400 font-bold">{idx + 1}.</span>
                  <input
                    type="text"
                    value={f}
                    onChange={(e) => handleFungsiChange(idx, e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFungsi(idx)}
                    className="p-1.5 text-red-500 hover:text-red-700"
                    title="Hapus fungsi"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kontak & Lokasi */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
            Kontak, Alamat & Jam Layanan
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Alamat Lengkap
            </label>
            <input
              type="text"
              value={data.alamat}
              onChange={(e) => setData({ ...data, alamat: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Telepon Kantor
              </label>
              <input
                type="text"
                value={data.telepon}
                onChange={(e) => setData({ ...data, telepon: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Hotline WhatsApp Pengaduan
              </label>
              <input
                type="text"
                value={data.hotlinePengaduan}
                onChange={(e) => setData({ ...data, hotlinePengaduan: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Kedinasan
              </label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Jam Operasional Pelayanan PTSP
            </label>
            <input
              type="text"
              value={data.jamLayanan}
              onChange={(e) => setData({ ...data, jamLayanan: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Save Button at Bottom */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#0f2042] hover:bg-blue-900 text-white rounded-lg text-xs font-bold shadow-lg transition disabled:opacity-50"
          >
            <Save className="w-4 h-4 text-amber-400" />
            <span>{saving ? 'Sedang Menyimpan...' : 'Simpan Semua Perubahan Profil'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
