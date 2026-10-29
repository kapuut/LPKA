'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Upload, Image as ImageIcon, Search, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { GaleriItem } from '@/lib/types';

export default function AdminGaleriPage() {
  const [list, setList] = useState<GaleriItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const emptyForm: Omit<GaleriItem, 'id'> = {
    judul: '',
    kategori: 'Pelatihan Kemandirian',
    tanggal: new Date().toISOString().split('T')[0],
    fotoUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    keterangan: '',
    lokasi: 'LPKA Kelas II Lombok Tengah',
    isDemoData: false
  };

  const [formData, setFormData] = useState<any>(emptyForm);

  const loadData = () => {
    fetch('/api/admin/content?collection=galeri')
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setList(res.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData(emptyForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (item: GaleriItem) => {
    setIsEditing(true);
    setFormData(item);
    setModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success && data.url) {
        setFormData((prev: any) => ({ ...prev, fotoUrl: data.url }));
      } else {
        alert(data.error || 'Gagal mengunggah foto.');
      }
    } catch {
      alert('Terjadi kesalahan saat upload.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch('/api/admin/content?collection=galeri', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const resData = await res.json();
      if (resData.success) {
        setMessage({
          type: 'success',
          text: isEditing ? 'Foto galeri berhasil diperbarui!' : 'Foto dokumentasi baru berhasil ditambahkan!'
        });
        setModalOpen(false);
        loadData();
      } else {
        setMessage({ type: 'error', text: resData.error || 'Gagal menyimpan foto.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Terjadi kesalahan sistem.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, judul: string) => {
    if (!confirm(`Hapus foto "${judul}" dari galeri?`)) return;

    try {
      const res = await fetch(`/api/admin/content?collection=galeri&id=${id}`, {
        method: 'DELETE'
      });
      const resData = await res.json();
      if (resData.success) {
        setMessage({ type: 'success', text: `Foto "${judul}" berhasil dihapus.` });
        loadData();
      } else {
        setMessage({ type: 'error', text: resData.error || 'Gagal menghapus.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Terjadi kesalahan jaringan.' });
    }
  };

  const filtered = list.filter(
    (g) =>
      g.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.kategori.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            Dokumentasi Kegiatan
          </span>
          <h1 className="text-2xl font-extrabold text-[#0f2042]">
            Kelola Galeri Foto Pembinaan
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Unggah dokumentasi foto pelatihan vokasi, pendidikan, olahraga, dan bimbingan kerohanian anak binaan.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0f2042] hover:bg-blue-900 text-white font-bold text-xs shadow transition"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Upload Foto Baru</span>
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

      {/* Toolbar */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul dokumentasi atau kategori..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="text-xs text-slate-500 font-semibold">
          Total: {list.length} Foto
        </div>
      </div>

      {/* Grid Cards of Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 bg-slate-100 overflow-hidden">
                <img src={item.fotoUrl} alt={item.judul} className="w-full h-full object-cover" />
                <span className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {item.kategori}
                </span>
              </div>

              <div className="p-4 space-y-1.5">
                <h3 className="text-xs font-bold text-slate-900 line-clamp-2">
                  {item.judul}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {item.keterangan}
                </p>
                <div className="text-[10px] text-slate-400 font-medium pt-1">
                  {new Date(item.tanggal).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })} • {item.lokasi}
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-slate-100 flex items-center justify-end gap-1.5 bg-slate-50/50">
              <button
                onClick={() => handleOpenEdit(item)}
                className="p-1.5 rounded-lg bg-white hover:bg-blue-100 text-slate-600 hover:text-blue-700 border border-slate-200 transition"
                title="Sunting Foto"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(item.id, item.judul)}
                className="p-1.5 rounded-lg bg-white hover:bg-red-100 text-slate-600 hover:text-red-700 border border-slate-200 transition"
                title="Hapus Foto"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add / Edit Galeri */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-sm font-bold text-slate-900">
                {isEditing ? 'Sunting Foto Galeri' : 'Unggah Foto Galeri Baru'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Judul Foto Kegiatan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  placeholder="Contoh: Pelatihan Seduh Kopi Barista Binaan"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori Kegiatan</label>
                  <select
                    value={formData.kategori}
                    onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="Pelatihan Kemandirian">Pelatihan Kemandirian Vokasi</option>
                    <option value="Pembinaan Kepribadian">Pembinaan Kepribadian</option>
                    <option value="Pendidikan">Pendidikan Formal / Kesetaraan</option>
                    <option value="Olahraga & Seni">Olahraga & Seni Budaya</option>
                    <option value="Kedinasan">Kegiatan Kedinasan & Monev</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tanggal Dokumentasi</label>
                  <input
                    type="date"
                    required
                    value={formData.tanggal}
                    onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Lokasi Kegiatan</label>
                <input
                  type="text"
                  required
                  value={formData.lokasi}
                  onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                  placeholder="Ruang Workshop / Greenhouse LPKA Lombok Tengah"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Keterangan / Deskripsi Foto</label>
                <textarea
                  rows={3}
                  required
                  value={formData.keterangan}
                  onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                  placeholder="Ceritakan gambaran singkat mengenai kegiatan ini..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg leading-relaxed"
                />
              </div>

              {/* Upload Foto */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="block font-bold text-slate-700">Berkas Foto</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-16 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                    <img src={formData.fotoUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <input
                      type="text"
                      value={formData.fotoUrl}
                      onChange={(e) => setFormData({ ...formData, fotoUrl: e.target.value })}
                      placeholder="URL Foto atau unggah langsung"
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploading ? 'Mengunggah...' : 'Pilih Foto dari Perangkat'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-lg bg-[#0f2042] text-white font-bold disabled:opacity-50"
                >
                  {saving ? 'Menyimpan...' : 'Simpan Foto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
