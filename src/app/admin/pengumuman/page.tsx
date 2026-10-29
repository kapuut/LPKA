'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Bell, Download, Upload, Search, CheckCircle2, AlertCircle, X, FileText } from 'lucide-react';
import { PengumumanItem } from '@/lib/types';

export default function AdminPengumumanPage() {
  const [list, setList] = useState<PengumumanItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const emptyForm: Omit<PengumumanItem, 'id'> = {
    slug: '',
    judul: '',
    nomorSurat: '',
    ringkasan: '',
    kontenLengkap: '',
    kategori: 'Layanan Kunjungan',
    tanggalTerbit: new Date().toISOString(),
    berlakuSampai: '',
    status: 'aktif',
    lampiran: undefined,
    isPenting: false,
    updatedAt: new Date().toISOString(),
    isDemoData: false
  };

  const [formData, setFormData] = useState<any>(emptyForm);

  const loadData = () => {
    fetch('/api/admin/content?collection=pengumuman')
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

  const handleOpenEdit = (p: PengumumanItem) => {
    setIsEditing(true);
    setFormData(p);
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
        setFormData((prev: any) => ({
          ...prev,
          lampiran: {
            namaFile: file.name,
            urlFile: data.url,
            ukuran: data.size || '500 KB'
          }
        }));
      } else {
        alert(data.error || 'Gagal mengunggah dokumen lampiran.');
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
      const res = await fetch('/api/admin/content?collection=pengumuman', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const resData = await res.json();
      if (resData.success) {
        setMessage({
          type: 'success',
          text: isEditing ? 'Pengumuman berhasil diperbarui!' : 'Pengumuman baru berhasil diterbitkan!'
        });
        setModalOpen(false);
        loadData();
      } else {
        setMessage({ type: 'error', text: resData.error || 'Gagal menyimpan pengumuman.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Terjadi kesalahan sistem.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, judul: string) => {
    if (!confirm(`Hapus pengumuman "${judul}"? Tindakan ini bersifat permanen.`)) return;

    try {
      const res = await fetch(`/api/admin/content?collection=pengumuman&id=${id}`, {
        method: 'DELETE'
      });
      const resData = await res.json();
      if (resData.success) {
        setMessage({ type: 'success', text: `Pengumuman "${judul}" berhasil dihapus.` });
        loadData();
      } else {
        setMessage({ type: 'error', text: resData.error || 'Gagal menghapus.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Terjadi kesalahan jaringan.' });
    }
  };

  const filtered = list.filter(
    (p) =>
      p.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.nomorSurat && p.nomorSurat.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            Maklumat & Edaran
          </span>
          <h1 className="text-2xl font-extrabold text-[#0f2042]">
            Kelola Pengumuman Resmi
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Buat maklumat pelayanan kunjungan, jadwal hari libur, dan surat edaran resmi instansi.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0f2042] hover:bg-blue-900 text-white font-bold text-xs shadow transition"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Buat Pengumuman Baru</span>
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
            placeholder="Cari pengumuman atau nomor surat..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="text-xs text-slate-500 font-semibold">
          Total: {list.length} Pengumuman
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Judul & Nomor Surat</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Tanggal Rilis</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Lampiran</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 max-w-md line-clamp-1">
                      {p.judul}
                    </div>
                    {p.nomorSurat && (
                      <div className="text-[11px] font-mono text-slate-400">
                        No: {p.nomorSurat}
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800">
                      {p.kategori}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-slate-600">
                    {new Date(p.tanggalTerbit).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.status === 'aktif'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {p.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    {p.lampiran ? (
                      <span className="text-[10px] text-blue-700 font-semibold flex items-center justify-center gap-1">
                        <Download className="w-3 h-3" />
                        <span>PDF ({p.lampiran.ukuran})</span>
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[10px]">-</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-700 transition"
                        title="Sunting Pengumuman"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.judul)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-700 transition"
                        title="Hapus Pengumuman"
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
      </div>

      {/* Modal Add / Edit Pengumuman */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-sm font-bold text-slate-900">
                {isEditing ? 'Sunting Pengumuman' : 'Buat Pengumuman Baru'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Judul Pengumuman <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  placeholder="Ketik judul pengumuman resmi..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nomor Surat Kedinasan</label>
                  <input
                    type="text"
                    value={formData.nomorSurat || ''}
                    onChange={(e) => setFormData({ ...formData, nomorSurat: e.target.value })}
                    placeholder="Contoh: W21.PAS.PAS.8-UM.01..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori</label>
                  <input
                    type="text"
                    value={formData.kategori}
                    onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                    placeholder="Contoh: Layanan Kunjungan / Titipan"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold"
                  >
                    <option value="aktif">Aktif</option>
                    <option value="arsip">Arsip (Tidak Tampil di Ticker Utama)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Berlaku Sampai (Opsional)</label>
                  <input
                    type="date"
                    value={formData.berlakuSampai ? formData.berlakuSampai.split('T')[0] : ''}
                    onChange={(e) => setFormData({ ...formData, berlakuSampai: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Ringkasan Pengumuman</label>
                <textarea
                  rows={2}
                  required
                  value={formData.ringkasan}
                  onChange={(e) => setFormData({ ...formData, ringkasan: e.target.value })}
                  placeholder="Ringkasan poin penting..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Konten Lengkap / Poin-Poin Edaran
                </label>
                <textarea
                  rows={6}
                  required
                  value={formData.kontenLengkap}
                  onChange={(e) => setFormData({ ...formData, kontenLengkap: e.target.value })}
                  placeholder="Ketik rincian maklumat resmi..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg leading-relaxed"
                />
              </div>

              {/* Lampiran PDF Upload */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <label className="block font-bold text-slate-700">Lampiran Dokumen PDF (Opsional)</label>
                {formData.lampiran && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
                    <span className="font-semibold text-blue-900 truncate max-w-sm">
                      {formData.lampiran.namaFile} ({formData.lampiran.ukuran})
                    </span>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, lampiran: undefined })}
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      Hapus
                    </button>
                  </div>
                )}
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer">
                  <Upload className="w-3.5 h-3.5 text-blue-600" />
                  <span>{uploading ? 'Mengunggah Berkas...' : 'Unggah File Lampiran (PDF)'}</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isPenting"
                  checked={formData.isPenting}
                  onChange={(e) => setFormData({ ...formData, isPenting: e.target.checked })}
                  className="rounded text-red-600"
                />
                <label htmlFor="isPenting" className="font-bold text-red-700">
                  Tandai sebagai Pengumuman PENTING (Muncul di banner merah halaman utama)
                </label>
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
                  {saving ? 'Menyimpan...' : 'Simpan Pengumuman'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
