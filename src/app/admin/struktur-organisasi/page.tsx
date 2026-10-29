'use client';

import React, { useState, useEffect } from 'react';
import { Pegawai } from '@/lib/types';
import { GitFork, Save, CheckCircle2, AlertCircle, ArrowUp, ArrowDown, Users, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function AdminStrukturOrganisasiPage() {
  const [list, setList] = useState<Pegawai[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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

  const handleLevelChange = (id: string, newLevel: number) => {
    setList(list.map((p) => (p.id === id ? { ...p, level: newLevel } : p)));
  };

  const handleAtasanChange = (id: string, atasanId: string | null) => {
    setList(list.map((p) => (p.id === id ? { ...p, atasanId: atasanId || null } : p)));
  };

  const handleToggleStruktur = (id: string) => {
    setList(list.map((p) => (p.id === id ? { ...p, tampilkanDiStruktur: !p.tampilkanDiStruktur } : p)));
  };

  const moveOrder = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;

    const updated = [...list];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    // Re-assign urutan values
    const reordered = updated.map((item, idx) => ({ ...item, urutan: idx + 1 }));
    setList(reordered);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/content?collection=pegawai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(list)
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: 'Struktur organisasi dan relasi hierarki berhasil disimpan persisten!' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Gagal menyimpan perubahan struktur.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Terjadi kesalahan sistem saat menyimpan.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 text-xs">Memuat struktur kepegawaian...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            Hierarki Instansi
          </span>
          <h1 className="text-2xl font-extrabold text-[#0f2042]">
            Kelola Relasi & Struktur Organisasi
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Atur hubungan atasan-bawahan, tingkatan level eselon, serta urutan penampilan pada bagan organisasi publik.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/profil/struktur-organisasi"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
          >
            <span>Preview Bagan Publik</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#0f2042] hover:bg-blue-900 text-white font-bold text-xs shadow transition disabled:opacity-50"
          >
            <Save className="w-4 h-4 text-amber-400" />
            <span>{saving ? 'Menyimpan...' : 'Simpan Perubahan Hierarki'}</span>
          </button>
        </div>
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

      {/* Guide Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 flex items-start gap-3">
        <GitFork className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold">Panduan Pengaturan Tingkat Hierarki:</span>
          <p>
            <strong>Level 1:</strong> Kepala LPKA (Pimpinan Puncak) • <strong>Level 2:</strong> Kepala Seksi & Kasubbag Tata Usaha • <strong>Level 3:</strong> Kepala Subseksi • <strong>Level 4:</strong> Jabatan Fungsional Tertentu (JFT) / Staf Pelaksana.
          </p>
        </div>
      </div>

      {/* Reorder Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-3 text-center">Urutan</th>
                <th className="py-3 px-4">Nama Pegawai</th>
                <th className="py-3 px-4">Jabatan Kedinasan</th>
                <th className="py-3 px-4">Tingkat Level</th>
                <th className="py-3 px-4">Atasan Langsung</th>
                <th className="py-3 px-3 text-center">Tampilkan</th>
                <th className="py-3 px-3 text-center">Pindah Urutan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {list.map((p, idx) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-3 text-center font-bold text-slate-700">
                    {idx + 1}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">
                      {p.gelarDepan} {p.nama} {p.gelarBelakang}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {p.nipDinas}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-blue-900">{p.jabatan}</div>
                    <div className="text-[10px] text-slate-500">{p.unitKerja}</div>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={p.level}
                      onChange={(e) => handleLevelChange(p.id, parseInt(e.target.value, 10))}
                      className="px-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg font-semibold"
                    >
                      <option value={1}>Level 1 (Kepala LPKA)</option>
                      <option value={2}>Level 2 (Kasi / Kasubbag)</option>
                      <option value={3}>Level 3 (Kasubsi)</option>
                      <option value={4}>Level 4 (Staf / JFT)</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={p.atasanId || ''}
                      onChange={(e) => handleAtasanChange(p.id, e.target.value)}
                      className="px-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg max-w-[200px] truncate"
                    >
                      <option value="">-- Puncak / Tanpa Atasan --</option>
                      {list
                        .filter((x) => x.id !== p.id)
                        .map((other) => (
                          <option key={other.id} value={other.id}>
                            {other.nama} ({other.jabatan})
                          </option>
                        ))}
                    </select>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <input
                      type="checkbox"
                      checked={p.tampilkanDiStruktur}
                      onChange={() => handleToggleStruktur(p.id)}
                      className="rounded text-blue-600"
                    />
                  </td>
                  <td className="py-3 px-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => moveOrder(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 rounded hover:bg-slate-200 text-slate-600 disabled:opacity-30"
                        title="Naikkan urutan"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveOrder(idx, 'down')}
                        disabled={idx === list.length - 1}
                        className="p-1 rounded hover:bg-slate-200 text-slate-600 disabled:opacity-30"
                        title="Turunkan urutan"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
