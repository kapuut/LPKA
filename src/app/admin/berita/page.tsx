'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Upload, FileText, Search, CheckCircle2, AlertCircle, X, ExternalLink } from 'lucide-react';
import { BeritaItem, PublicationStatus } from '@/lib/types';
import Link from 'next/link';

export default function AdminBeritaPage() {
  const [list, setList] = useState<BeritaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState<BeritaItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const emptyForm: Omit<BeritaItem, 'id'> = {
    slug: '',
    judul: '',
    ringkasan: '',
    konten: '',
    kategori: 'Kemandirian',
    tags: ['Pembinaan', 'LPKA Lombok Tengah'],
    gambarUtama: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    captionGambar: '',
    penulis: 'Humas LPKA Lombok Tengah',
    tanggalPublikasi: new Date().toISOString(),
    status: 'published',
    jumlahDilihat: 0,
    isUtama: false,
    updatedAt: new Date().toISOString(),
    isDemoData: false
  };

  const [formData, setFormData] = useState<any>(emptyForm);
  const [tagsInput, setTagsInput] = useState('Pembinaan, LPKA Lombok Tengah');

  const loadData = () => {
    fetch('/api/admin/content?collection=berita')
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
    setTagsInput('Pembinaan, LPKA Lombok Tengah');
    setModalOpen(true);
  };

  const handleOpenEdit = (b: BeritaItem) => {
    setIsEditing(true);
    setFormData(b);
    setTagsInput((b.tags || []).join(', '));
    setModalOpen(true);
  };

  const handleOpenPreview = (b: BeritaItem) => {
    setPreviewItem(b);
    setPreviewModalOpen(true);
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
        setFormData((prev: any) => ({ ...prev, gambarUtama: data.url }));
      } else {
        alert(data.error || 'Gagal mengunggah gambar.');
      }
    } catch {
      alert('Terjadi kesalahan saat upload gambar.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload = {
      ...formData,
      tags: parsedTags
    };

    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch('/api/admin/content?collection=berita', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const resData = await res.json();
      if (resData.success) {
        setMessage({
          type: 'success',
          text: isEditing ? 'Artikel berita berhasil diperbarui!' : 'Berita baru berhasil diterbitkan!'
        });
        setModalOpen(false);
        loadData();
      } else {
        setMessage({ type: 'error', text: resData.error || 'Gagal menyimpan berita.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Terjadi kesalahan sistem.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, judul: string) => {
    if (!confirm(`Hapus artikel berita "${judul}"? Tindakan ini bersifat permanen.`)) return;

    try {
      const res = await fetch(`/api/admin/content?collection=berita&id=${id}`, {
        method: 'DELETE'
      });
      const resData = await res.json();
      if (resData.success) {
        setMessage({ type: 'success', text: `Berita "${judul}" berhasil dihapus.` });
        loadData();
      } else {
        setMessage({ type: 'error', text: resData.error || 'Gagal menghapus.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Terjadi kesalahan jaringan.' });
    }
  };

  const filtered = list.filter(
    (b) =>
      b.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.kategori.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            Publikasi & Humas
          </span>
          <h1 className="text-2xl font-extrabold text-[#0f2042]">
            Kelola Berita & Warta Kegiatan
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Publikasikan artikel kegiatan kemandirian, pendidikan kesetaraan, dan berita kedinasan resmi.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0f2042] hover:bg-blue-900 text-white font-bold text-xs shadow transition"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Tulis Berita Baru</span>
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

      {/* Search Toolbar */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul berita atau kategori..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="text-xs text-slate-500 font-semibold">
          Total: {list.length} Artikel
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Artikel Berita</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Tanggal Rilis</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Dilihat</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                        <img src={b.gambarUtama} alt={b.judul} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 line-clamp-1 max-w-md">
                          {b.judul}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          /{b.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700">
                      {b.kategori}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-slate-600">
                    {new Date(b.tanggalPublikasi).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        b.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800'
                          : b.status === 'draft'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {b.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono text-slate-500">
                    {b.jumlahDilihat}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenPreview(b)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
                        title="Lihat Pratinjau"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(b)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-700 transition"
                        title="Sunting Berita"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(b.id, b.judul)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-700 transition"
                        title="Hapus Berita"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="p-8 text-center text-slate-500 text-xs">
            Tidak ada berita yang ditemukan.
          </div>
        )}
      </div>

      {/* Modal Add / Edit Berita */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-sm font-bold text-slate-900">
                {isEditing ? 'Sunting Artikel Berita' : 'Tulis Berita Baru'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Judul Berita <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  placeholder="Ketik judul artikel berita resmi..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={formData.kategori}
                    onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="Kemandirian">Kemandirian & Vokasi</option>
                    <option value="Pendidikan">Pendidikan Formal & Kesetaraan</option>
                    <option value="Kedinasan">Kedinasan & Tata Kelola</option>
                    <option value="Kepribadian">Pembinaan Kepribadian & Rohani</option>
                    <option value="Kerjasama">Kerjasama Lintas Sektoral</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status Publikasi</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as PublicationStatus })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold"
                  >
                    <option value="published">Published (Terbit untuk Publik)</option>
                    <option value="draft">Draft (Disimpan Sementara)</option>
                    <option value="archived">Archived (Diarsipkan)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Ringkasan Singkat (Lead Paragraf)</label>
                <textarea
                  rows={2}
                  required
                  value={formData.ringkasan}
                  onChange={(e) => setFormData({ ...formData, ringkasan: e.target.value })}
                  placeholder="Ringkasan 1-2 kalimat untuk kartu berita di beranda..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Isi Konten Lengkap Berita <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={8}
                  required
                  value={formData.konten}
                  onChange={(e) => setFormData({ ...formData, konten: e.target.value })}
                  placeholder="Tuliskan isi berita secara lengkap (gunakan jeda enter untuk paragraf baru)..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg leading-relaxed font-sans"
                />
              </div>

              {/* Gambar Utama */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="block font-bold text-slate-700">Gambar Utama Artikel</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-14 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                    <img src={formData.gambarUtama} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <input
                      type="text"
                      value={formData.gambarUtama}
                      onChange={(e) => setFormData({ ...formData, gambarUtama: e.target.value })}
                      placeholder="URL Gambar atau Unggah Berkas"
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploading ? 'Mengunggah...' : 'Unggah Foto dari Perangkat'}</span>
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

              <div>
                <label className="block font-bold text-slate-700 mb-1">Caption / Keterangan Foto</label>
                <input
                  type="text"
                  value={formData.captionGambar || ''}
                  onChange={(e) => setFormData({ ...formData, captionGambar: e.target.value })}
                  placeholder="Keterangan singkat foto..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Penulis / Sumber Warta</label>
                  <input
                    type="text"
                    value={formData.penulis}
                    onChange={(e) => setFormData({ ...formData, penulis: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tags (Pisahkan dengan koma)</label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="Contoh: Barista, Vokasi, Kemenkumham"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
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
                  {saving ? 'Menyimpan...' : 'Simpan & Publikasikan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewModalOpen && previewItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Pratinjau Artikel Berita
              </span>
              <button onClick={() => setPreviewModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <span className="px-2.5 py-0.5 rounded bg-blue-100 text-blue-900 text-xs font-bold">
                {previewItem.kategori}
              </span>
              <h2 className="text-xl font-bold text-[#0f2042] leading-snug">
                {previewItem.judul}
              </h2>
              <div className="text-xs text-slate-400">
                {previewItem.penulis} • {new Date(previewItem.tanggalPublikasi).toLocaleDateString('id-ID')}
              </div>
              <div className="rounded-xl overflow-hidden max-h-60 bg-slate-100">
                <img src={previewItem.gambarUtama} alt={previewItem.judul} className="w-full h-full object-cover" />
              </div>
              <p className="text-xs text-slate-600 italic border-l-2 border-blue-600 pl-3">
                {previewItem.ringkasan}
              </p>
              <div className="text-xs text-slate-800 leading-relaxed space-y-2 whitespace-pre-line pt-2">
                {previewItem.konten}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
