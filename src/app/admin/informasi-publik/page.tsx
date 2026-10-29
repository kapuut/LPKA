'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Download, Upload, FileText, Search, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { DokumenPublik } from '@/lib/types';

export default function AdminInformasiPublikPage() {
  const [list, setList] = useState<DokumenPublik[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const emptyForm: Omit<DokumenPublik, 'id'> = {
    judul: '',
    kategori: 'berkala',
    jenisDokumen: 'Laporan Kinerja',
    nomorDokumen: '',
    tahun: new Date().getFullYear().toString(),
    deskripsi: '',
    penanggungJawab: 'PPID Pelaksana LPKA',
    urlFile: '/uploads/dokumen-sample.pdf',
    ukuranFile: '1.2 MB',
    tipeFile: 'PDF',
    tanggalDiupload: new Date().toISOString(),
    jumlahUnduh: 0,
    isDemoData: false
  };

  const [formData, setFormData] = useState<any>(emptyForm);

  const loadData = () => {
    fetch('/api/admin/content?collection=informasi-publik')
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

  const handleOpenEdit = (doc: DokumenPublik) => {
    setIsEditing(true);
    setFormData(doc);
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
          urlFile: data.url,
          ukuranFile: data.size || '1.0 MB',
          tipeFile: file.name.split('.').pop()?.toUpperCase() || 'PDF'
        }));
      } else {
        alert(data.error || 'Gagal mengunggah berkas dokumen.');
      }
    } catch {
      alert('Terjadi kesalahan saat upload dokumen.');
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
      const res = await fetch('/api/admin/content?collection=informasi-publik', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const resData = await res.json();
      if (resData.success) {
        setMessage({
          type: 'success',
          text: isEditing ? 'Dokumen PPID berhasil diperbarui!' : 'Dokumen PPID baru berhasil ditambahkan!'
        });
        setModalOpen(false);
        loadData();
      } else {
        setMessage({ type: 'error', text: resData.error || 'Gagal menyimpan dokumen.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Terjadi kesalahan sistem.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, judul: string) => {
    if (!confirm(`Hapus dokumen "${judul}" dari Daftar Informasi Publik?`)) return;

    try {
      const res = await fetch(`/api/admin/content?collection=informasi-publik&id=${id}`, {
        method: 'DELETE'
      });
      const resData = await res.json();
      if (resData.success) {
        setMessage({ type: 'success', text: `Dokumen "${judul}" berhasil dihapus.` });
        loadData();
      } else {
        setMessage({ type: 'error', text: resData.error || 'Gagal menghapus dokumen.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Terjadi kesalahan jaringan.' });
    }
  };

  const filtered = list.filter(
    (d) =>
      d.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.nomorDokumen.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.jenisDokumen.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            Keterbukaan Informasi (PPID)
          </span>
          <h1 className="text-2xl font-extrabold text-[#0f2042]">
            Daftar Informasi Publik (DIP)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Kelola dokumen berkala (LKjIP, Renstra), informasi serta-merta, dan informasi tersedia setiap saat.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0f2042] hover:bg-blue-900 text-white font-bold text-xs shadow transition"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Upload Dokumen PPID</span>
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
            placeholder="Cari nama dokumen, jenis, atau nomor..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="text-xs text-slate-500 font-semibold">
          Total: {list.length} Dokumen Publik
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Nama Dokumen & Nomor</th>
                <th className="py-3 px-4">Kategori PPID</th>
                <th className="py-3 px-4">Jenis Dokumen</th>
                <th className="py-3 px-4 text-center">Tahun</th>
                <th className="py-3 px-4 text-center">Berkas</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 max-w-md line-clamp-1">
                      {d.judul}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      No: {d.nomorDokumen}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-800">
                      {d.kategori.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap font-medium text-slate-700">
                    {d.jenisDokumen}
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap font-semibold text-slate-800">
                    {d.tahun}
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <a
                      href={d.urlFile}
                      download
                      className="inline-flex items-center gap-1 text-[11px] text-blue-700 font-bold hover:underline"
                    >
                      <Download className="w-3 h-3" />
                      <span>{d.ukuranFile} ({d.tipeFile})</span>
                    </a>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(d)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-700 transition"
                        title="Sunting Dokumen"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(d.id, d.judul)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-700 transition"
                        title="Hapus Dokumen"
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

      {/* Modal Add / Edit Dokumen */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-sm font-bold text-slate-900">
                {isEditing ? 'Sunting Dokumen Informasi Publik' : 'Tambah Dokumen Informasi Publik'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Judul Dokumen Publik <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  placeholder="Contoh: Laporan Kinerja Instansi Pemerintah (LKjIP) Tahun 2024"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori PPID</label>
                  <select
                    value={formData.kategori}
                    onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold"
                  >
                    <option value="berkala">Informasi Berkala</option>
                    <option value="serta_merta">Informasi Serta-Merta</option>
                    <option value="setiap_saat">Informasi Tersedia Setiap Saat</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jenis Dokumen</label>
                  <select
                    value={formData.jenisDokumen}
                    onChange={(e) => setFormData({ ...formData, jenisDokumen: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="Laporan Kinerja">Laporan Kinerja (LKjIP)</option>
                    <option value="Regulasi">Regulasi & Maklumat</option>
                    <option value="Rencana Kerja">Rencana Kerja & Renstra</option>
                    <option value="DIPA/Anggaran">DIPA / Ringkasan Anggaran</option>
                    <option value="SOP">SOP Pelayanan</option>
                    <option value="Lainnya">Dokumen Lainnya</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nomor Registrasi Dokumen</label>
                  <input
                    type="text"
                    required
                    value={formData.nomorDokumen}
                    onChange={(e) => setFormData({ ...formData, nomorDokumen: e.target.value })}
                    placeholder="Contoh: LKjIP/LPKA.LOTENG/2024/01"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tahun Anggaran / Terbit</label>
                  <input
                    type="text"
                    required
                    value={formData.tahun}
                    onChange={(e) => setFormData({ ...formData, tahun: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi Singkat Dokumen</label>
                <textarea
                  rows={2}
                  required
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  placeholder="Ringkasan isi dokumen atau peraturan..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Penanggung Jawab Pembuat Dokumen</label>
                <input
                  type="text"
                  required
                  value={formData.penanggungJawab}
                  onChange={(e) => setFormData({ ...formData, penanggungJawab: e.target.value })}
                  placeholder="Subbagian Tata Usaha / PPID LPKA"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              {/* Upload Dokumen File */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <label className="block font-bold text-slate-700">Berkas Dokumen (PDF)</label>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-800">{formData.urlFile}</div>
                    <div className="text-[10px] text-slate-400">Ukuran: {formData.ukuranFile} ({formData.tipeFile})</div>
                  </div>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? 'Mengunggah...' : 'Pilih Berkas'}</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.xls,.xlsx"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
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
                  {saving ? 'Menyimpan...' : 'Simpan Dokumen'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
