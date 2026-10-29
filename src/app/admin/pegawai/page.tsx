'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Upload, Users, Search, CheckCircle2, AlertCircle, X, ShieldAlert } from 'lucide-react';
import { Pegawai } from '@/lib/types';

export default function AdminPegawaiPage() {
  const [list, setList] = useState<Pegawai[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State
  const emptyForm: Omit<Pegawai, 'id'> = {
    nama: '',
    gelarDepan: '',
    gelarBelakang: '',
    nipDinas: '',
    jabatan: '',
    unitKerja: 'Seksi Pembinaan',
    level: 3,
    atasanId: null,
    urutan: 10,
    fotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
    pangkatGolongan: 'Penata Muda (III/a)',
    statusKepegawaian: 'PNS',
    isPimpinan: false,
    tampilkanDiStruktur: true,
    isDemoData: false
  };

  const [formData, setFormData] = useState<any>(emptyForm);
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = () => {
    fetch('/api/admin/content?collection=pegawai')
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
    setFormData({ ...emptyForm, urutan: list.length + 1 });
    setModalOpen(true);
  };

  const handleOpenEdit = (p: Pegawai) => {
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
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: fd
      });
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
      const res = await fetch('/api/admin/content?collection=pegawai', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const resData = await res.json();
      if (resData.success) {
        setMessage({
          type: 'success',
          text: isEditing ? 'Data pegawai berhasil diperbarui!' : 'Pegawai baru berhasil ditambahkan!'
        });
        setModalOpen(false);
        loadData();
      } else {
        setMessage({ type: 'error', text: resData.error || 'Gagal menyimpan data.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Terjadi kesalahan sistem.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, nama: string) => {
    if (!confirm(`Hapus data pegawai "${nama}"? Perubahan akan langsung tersimpan.`)) return;

    try {
      const res = await fetch(`/api/admin/content?collection=pegawai&id=${id}`, {
        method: 'DELETE'
      });
      const resData = await res.json();
      if (resData.success) {
        setMessage({ type: 'success', text: `Pegawai "${nama}" berhasil dihapus.` });
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
      p.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.jabatan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.unitKerja.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            Manajemen Kepegawaian
          </span>
          <h1 className="text-2xl font-extrabold text-[#0f2042]">
            Daftar Pegawai & Pejabat
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Kelola data pegawai, foto profil, jabatan dinas, serta urutan hierarki bagan struktur.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0f2042] hover:bg-blue-900 text-white font-bold text-xs shadow transition"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Tambah Pegawai Baru</span>
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
            placeholder="Cari nama, jabatan, atau unit kerja..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="text-xs text-slate-500 font-semibold">
          Total: {list.length} Pegawai
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4 text-center">Urutan</th>
                <th className="py-3 px-4">Pegawai</th>
                <th className="py-3 px-4">Jabatan & Unit Kerja</th>
                <th className="py-3 px-4">NIP Kedinasan</th>
                <th className="py-3 px-4 text-center">Level Hierarki</th>
                <th className="py-3 px-4 text-center">Tampil di Bagan</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4 text-center font-bold text-slate-700">
                    {p.urutan}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                        <img src={p.fotoUrl} alt={p.nama} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">
                          {p.gelarDepan} {p.nama} {p.gelarBelakang}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {p.pangkatGolongan || 'PNS'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-blue-900">{p.jabatan}</div>
                    <div className="text-[11px] text-slate-500">{p.unitKerja}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600 text-[11px]">
                    {p.nipDinas}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800">
                      Level {p.level}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.tampilkanDiStruktur
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {p.tampilkanDiStruktur ? 'Ya' : 'Tidak'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-700 transition"
                        title="Edit Pegawai"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.nama)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-700 transition"
                        title="Hapus Pegawai"
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
            Tidak ada pegawai yang sesuai dengan pencarian.
          </div>
        )}
      </div>

      {/* Modal Add / Edit Pegawai */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-sm font-bold text-slate-900">
                {isEditing ? 'Sunting Data Pegawai' : 'Tambah Pegawai Baru'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Gelar Depan</label>
                  <input
                    type="text"
                    value={formData.gelarDepan || ''}
                    onChange={(e) => setFormData({ ...formData, gelarDepan: e.target.value })}
                    placeholder="Contoh: Drs."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Gelar Belakang</label>
                <input
                  type="text"
                  value={formData.gelarBelakang || ''}
                  onChange={(e) => setFormData({ ...formData, gelarBelakang: e.target.value })}
                  placeholder="Contoh: S.H., M.H."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Jabatan Kedinasan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.jabatan}
                    onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Unit Kerja</label>
                  <input
                    type="text"
                    required
                    value={formData.unitKerja}
                    onChange={(e) => setFormData({ ...formData, unitKerja: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">NIP Kedinasan</label>
                  <input
                    type="text"
                    required
                    value={formData.nipDinas}
                    onChange={(e) => setFormData({ ...formData, nipDinas: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pangkat / Golongan</label>
                  <input
                    type="text"
                    value={formData.pangkatGolongan || ''}
                    onChange={(e) => setFormData({ ...formData, pangkatGolongan: e.target.value })}
                    placeholder="Penata (III/c)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Level Hierarki</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value, 10) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value={1}>Level 1 (Kepala LPKA)</option>
                    <option value={2}>Level 2 (Kasubbag / Kasi)</option>
                    <option value={3}>Level 3 (Kasubsi)</option>
                    <option value={4}>Level 4 (Staf / JFT)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Atasan Langsung</label>
                  <select
                    value={formData.atasanId || ''}
                    onChange={(e) => setFormData({ ...formData, atasanId: e.target.value || null })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="">-- Tanpa Atasan (Puncak) --</option>
                    {list
                      .filter((x) => x.id !== formData.id)
                      .map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.nama} ({p.jabatan})
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Urutan</label>
                  <input
                    type="number"
                    value={formData.urutan}
                    onChange={(e) => setFormData({ ...formData, urutan: parseInt(e.target.value, 10) || 1 })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                  />
                </div>
              </div>

              {/* Foto Upload */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="block font-bold text-slate-700">Foto Resmi Pegawai</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                    <img src={formData.fotoUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <input
                      type="text"
                      value={formData.fotoUrl}
                      onChange={(e) => setFormData({ ...formData, fotoUrl: e.target.value })}
                      placeholder="URL Foto atau Unggah dari Perangkat"
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploading ? 'Mengunggah...' : 'Unggah Foto Baru'}</span>
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

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="tampilkanDiStruktur"
                  checked={formData.tampilkanDiStruktur}
                  onChange={(e) => setFormData({ ...formData, tampilkanDiStruktur: e.target.checked })}
                  className="rounded text-blue-600"
                />
                <label htmlFor="tampilkanDiStruktur" className="font-semibold text-slate-700">
                  Tampilkan pegawai ini pada Bagan Struktur Organisasi Publik
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
                  {saving ? 'Menyimpan...' : 'Simpan Pegawai'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
