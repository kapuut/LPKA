'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, HeartHandshake, CheckCircle2, AlertCircle, X, PlusCircle } from 'lucide-react';
import { LayananItem } from '@/lib/types';

export default function AdminLayananPage() {
  const [list, setList] = useState<LayananItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const emptyForm: Omit<LayananItem, 'id'> = {
    slug: '',
    namaLayanan: '',
    kategori: 'Kunjungan',
    deskripsiSingkat: '',
    persyaratan: ['Membawa e-KTP asli pengunjung yang masih berlaku.', 'Fotokopi Kartu Keluarga (KK).'],
    prosedur: [
      { langkah: 1, judul: 'Pendaftaran & Registrasi Antrean', keterangan: 'Pengunjung menyerahkan identitas diri ke loket PTSP.' },
      { langkah: 2, judul: 'Pemeriksaan Barang & Badan', keterangan: 'Pemeriksaan keamanan oleh petugas dinas.' }
    ],
    jadwalLayanan: 'Senin - Kamis (08.00 - 15.00 WITA)',
    biaya: 'GRATIS / Rp 0 (Bebas Pungli)',
    waktuPenyelesaian: '15 Menit',
    penanggungJawab: 'Seksi Pengawasan & Penegakan Disiplin',
    kontakPetugas: 'Loket PTSP LPKA',
    isAktif: true,
    isDemoData: false
  };

  const [formData, setFormData] = useState<any>(emptyForm);

  const loadData = () => {
    fetch('/api/admin/content?collection=layanan')
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

  const handleOpenEdit = (l: LayananItem) => {
    setIsEditing(true);
    setFormData(l);
    setModalOpen(true);
  };

  // Persyaratan handlers
  const handleAddSyarat = () => {
    setFormData({ ...formData, persyaratan: [...formData.persyaratan, ''] });
  };
  const handleSyaratChange = (idx: number, val: string) => {
    const arr = [...formData.persyaratan];
    arr[idx] = val;
    setFormData({ ...formData, persyaratan: arr });
  };
  const handleRemoveSyarat = (idx: number) => {
    setFormData({ ...formData, persyaratan: formData.persyaratan.filter((_: any, i: number) => i !== idx) });
  };

  // Prosedur handlers
  const handleAddProsedur = () => {
    const nextStep = formData.prosedur.length + 1;
    setFormData({
      ...formData,
      prosedur: [...formData.prosedur, { langkah: nextStep, judul: '', keterangan: '' }]
    });
  };
  const handleProsedurChange = (idx: number, field: 'judul' | 'keterangan', val: string) => {
    const arr = [...formData.prosedur];
    arr[idx] = { ...arr[idx], [field]: val };
    setFormData({ ...formData, prosedur: arr });
  };
  const handleRemoveProsedur = (idx: number) => {
    const filtered = formData.prosedur.filter((_: any, i: number) => i !== idx);
    const reordered = filtered.map((item: any, i: number) => ({ ...item, langkah: i + 1 }));
    setFormData({ ...formData, prosedur: reordered });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch('/api/admin/content?collection=layanan', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const resData = await res.json();
      if (resData.success) {
        setMessage({
          type: 'success',
          text: isEditing ? 'Layanan berhasil diperbarui!' : 'Layanan baru berhasil ditambahkan!'
        });
        setModalOpen(false);
        loadData();
      } else {
        setMessage({ type: 'error', text: resData.error || 'Gagal menyimpan layanan.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Terjadi kesalahan sistem.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, nama: string) => {
    if (!confirm(`Hapus layanan "${nama}"?`)) return;

    try {
      const res = await fetch(`/api/admin/content?collection=layanan&id=${id}`, {
        method: 'DELETE'
      });
      const resData = await res.json();
      if (resData.success) {
        setMessage({ type: 'success', text: `Layanan "${nama}" berhasil dihapus.` });
        loadData();
      } else {
        setMessage({ type: 'error', text: resData.error || 'Gagal menghapus layanan.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Terjadi kesalahan jaringan.' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            Standar Pelayanan Publik
          </span>
          <h1 className="text-2xl font-extrabold text-[#0f2042]">
            Kelola Layanan Publik Terpadu
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Kelola SOP, persyaratan berkas, alur langkah pelayanan, dan penanggung jawab teknis.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0f2042] hover:bg-blue-900 text-white font-bold text-xs shadow transition"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Tambah Layanan Baru</span>
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

      {/* Grid Cards of Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((l) => (
          <div
            key={l.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  {l.kategori}
                </span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  {l.biaya}
                </span>
              </div>

              <h2 className="text-base font-bold text-slate-900 line-clamp-2">
                {l.namaLayanan}
              </h2>

              <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                {l.deskripsiSingkat}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                <div><strong>Jadwal:</strong> {l.jadwalLayanan}</div>
                <div><strong>Waktu:</strong> {l.waktuPenyelesaian}</div>
                <div><strong>Syarat:</strong> {l.persyaratan.length} Berkas</div>
                <div><strong>Prosedur:</strong> {l.prosedur.length} Langkah Alur</div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  l.isAktif ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {l.isAktif ? 'Aktif' : 'Nonaktif'}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(l)}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-700 transition"
                  title="Sunting Layanan"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(l.id, l.namaLayanan)}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-700 transition"
                  title="Hapus Layanan"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add / Edit Layanan */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-sm font-bold text-slate-900">
                {isEditing ? 'Sunting Standar Layanan' : 'Tambah Layanan Publik Baru'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nama Layanan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.namaLayanan}
                  onChange={(e) => setFormData({ ...formData, namaLayanan: e.target.value })}
                  placeholder="Contoh: Layanan Kunjungan Tatap Muka Ramah Anak"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
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
                    <option value="Kunjungan">Kunjungan Ramah Anak</option>
                    <option value="Penitipan">Penitipan Makanan & Barang</option>
                    <option value="Integrasi & Pembebasan">Integrasi & Pembebasan Bersyarat</option>
                    <option value="Pengaduan">Pengaduan Masyarakat</option>
                    <option value="Bantuan Hukum & Konseling">Bantuan Hukum & Konseling</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tarif / Biaya Layanan</label>
                  <input
                    type="text"
                    required
                    value={formData.biaya}
                    onChange={(e) => setFormData({ ...formData, biaya: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  required
                  value={formData.deskripsiSingkat}
                  onChange={(e) => setFormData({ ...formData, deskripsiSingkat: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg leading-relaxed"
                />
              </div>

              {/* Persyaratan List */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-700">Persyaratan Berkas (Syarat Administrasi)</label>
                  <button
                    type="button"
                    onClick={handleAddSyarat}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 hover:text-blue-900 bg-blue-50 px-2 py-0.5 rounded"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Tambah Syarat</span>
                  </button>
                </div>
                <div className="space-y-1.5">
                  {formData.persyaratan.map((s: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-5 text-slate-400 font-bold">{idx + 1}.</span>
                      <input
                        type="text"
                        value={s}
                        onChange={(e) => handleSyaratChange(idx, e.target.value)}
                        className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSyarat(idx)}
                        className="p-1 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prosedur List */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-700">Langkah Alur Prosedur Pelayanan</label>
                  <button
                    type="button"
                    onClick={handleAddProsedur}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 hover:text-blue-900 bg-blue-50 px-2 py-0.5 rounded"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Tambah Langkah</span>
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.prosedur.map((step: any, idx: number) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">Langkah #{step.langkah}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveProsedur(idx)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Judul Langkah (contoh: Pemeriksaan Berkas)"
                        value={step.judul}
                        onChange={(e) => handleProsedurChange(idx, 'judul', e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-semibold"
                      />
                      <textarea
                        rows={2}
                        placeholder="Keterangan rincian langkah..."
                        value={step.keterangan}
                        onChange={(e) => handleProsedurChange(idx, 'keterangan', e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg leading-relaxed"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jadwal Layanan</label>
                  <input
                    type="text"
                    required
                    value={formData.jadwalLayanan}
                    onChange={(e) => setFormData({ ...formData, jadwalLayanan: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Waktu Penyelesaian</label>
                  <input
                    type="text"
                    required
                    value={formData.waktuPenyelesaian}
                    onChange={(e) => setFormData({ ...formData, waktuPenyelesaian: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Penanggung Jawab</label>
                  <input
                    type="text"
                    required
                    value={formData.penanggungJawab}
                    onChange={(e) => setFormData({ ...formData, penanggungJawab: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kontak Petugas</label>
                  <input
                    type="text"
                    required
                    value={formData.kontakPetugas}
                    onChange={(e) => setFormData({ ...formData, kontakPetugas: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isAktif"
                  checked={formData.isAktif}
                  onChange={(e) => setFormData({ ...formData, isAktif: e.target.checked })}
                  className="rounded text-blue-600"
                />
                <label htmlFor="isAktif" className="font-bold text-slate-800">
                  Aktifkan layanan ini pada halaman publik
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
                  {saving ? 'Menyimpan...' : 'Simpan Layanan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
