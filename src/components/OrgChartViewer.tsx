'use client';

import React, { useState } from 'react';
import { Pegawai } from '@/lib/types';
import {
  Users,
  Grid,
  GitFork,
  Search,
  Filter,
  ShieldCheck,
  Building2,
  ChevronDown,
  Info,
  Printer
} from 'lucide-react';

interface Props {
  pegawaiList: Pegawai[];
}

export default function OrgChartViewer({ pegawaiList }: Props) {
  const [viewMode, setViewMode] = useState<'chart' | 'grid'>('chart');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('ALL');
  const [activeModalPegawai, setActiveModalPegawai] = useState<Pegawai | null>(null);

  // Filter pegawai with tampilkanDiStruktur
  const listStruktur = pegawaiList.filter(p => p.tampilkanDiStruktur);

  // Group by levels for chart view
  const pimpinan = listStruktur.filter(p => p.level === 1);
  const eselon4 = listStruktur.filter(p => p.level === 2);
  const eselon5 = listStruktur.filter(p => p.level === 3);
  const fungsional = listStruktur.filter(p => p.level >= 4);

  // Filter for grid view
  const units = ['ALL', ...Array.from(new Set(pegawaiList.map(p => p.unitKerja)))];
  const filteredGrid = pegawaiList.filter(p => {
    const matchesSearch = p.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.jabatan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.unitKerja.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUnit = selectedUnit === 'ALL' || p.unitKerja === selectedUnit;
    return matchesSearch && matchesUnit;
  });

  return (
    <div className="space-y-8">
      {/* Control Toolbar */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
        {/* Toggle View Mode */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setViewMode('chart')}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition ${
              viewMode === 'chart'
                ? 'bg-[#0f2042] text-white shadow'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <GitFork className="w-3.5 h-3.5" />
            <span>Bagan Hierarki (Pohon)</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition ${
              viewMode === 'grid'
                ? 'bg-[#0f2042] text-white shadow'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Daftar Pegawai (Grid)</span>
          </button>
        </div>

        {/* Print & Search */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {viewMode === 'grid' && (
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama atau jabatan..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          )}

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition"
            title="Cetak Bagan Struktur"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cetak</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: INTERACTIVE HIERARCHY TREE CHART */}
      {viewMode === 'chart' && (
        <div className="bg-slate-50 rounded-2xl p-4 sm:p-8 border border-slate-200 shadow-inner overflow-x-auto">
          <div className="min-w-[800px] flex flex-col items-center space-y-10">
            {/* Level 1: Kepala LPKA */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold tracking-wider text-red-700 bg-red-50 border border-red-200 px-3 py-0.5 rounded-full mb-3">
                Pimpinan Instansi (Level 1)
              </span>
              {pimpinan.map(p => (
                <div
                  key={p.id}
                  onClick={() => setActiveModalPegawai(p)}
                  className="w-72 bg-gradient-to-b from-[#0f2042] to-[#1e3a8a] text-white rounded-2xl p-5 shadow-xl border-2 border-amber-400/80 cursor-pointer hover:scale-105 transition transform text-center relative group"
                >
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-white/60 mb-3 bg-slate-800 shadow">
                    <img src={p.fotoUrl} alt={p.nama} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-sm font-bold text-white line-clamp-1">
                    {p.gelarDepan} {p.nama} {p.gelarBelakang}
                  </h3>
                  <p className="text-xs text-amber-300 font-semibold mt-0.5">
                    {p.jabatan}
                  </p>
                  <p className="text-[10px] text-slate-300 mt-1 font-mono">
                    NIP: {p.nipDinas}
                  </p>
                  <div className="mt-3 text-[10px] bg-white/10 rounded py-1 text-slate-200 group-hover:bg-white/20 transition">
                    Klik untuk melihat rincian profil
                  </div>
                </div>
              ))}

              {/* Vertical connector from Level 1 */}
              <div className="w-0.5 h-10 bg-slate-400 mt-2" />
            </div>

            {/* Level 2: Kepala Seksi & Kasubbag Tata Usaha */}
            <div className="w-full flex flex-col items-center">
              {/* Horizontal Bar linking Level 2 */}
              <div className="w-3/4 h-0.5 bg-slate-400" />

              <div className="w-full grid grid-cols-4 gap-6 pt-6">
                {eselon4.map(p => {
                  // Find subordinates for this section head
                  const subordinates = eselon5.filter(sub => sub.atasanId === p.id);
                  const staffSubordinates = fungsional.filter(f => f.atasanId === p.id);

                  return (
                    <div key={p.id} className="flex flex-col items-center">
                      <div
                        onClick={() => setActiveModalPegawai(p)}
                        className="w-full max-w-[220px] bg-white rounded-xl p-4 shadow-md border border-slate-200 hover:border-blue-500 cursor-pointer hover:shadow-lg transition text-center"
                      >
                        <div className="w-14 h-14 mx-auto rounded-full overflow-hidden border border-slate-200 mb-2.5 bg-slate-100">
                          <img src={p.fotoUrl} alt={p.nama} className="w-full h-full object-cover" />
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                          {p.gelarDepan} {p.nama} {p.gelarBelakang}
                        </h4>
                        <p className="text-[11px] text-blue-700 font-semibold mt-0.5 line-clamp-2">
                          {p.jabatan}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1">
                          {p.unitKerja}
                        </p>
                      </div>

                      {/* Connectors to Level 3 */}
                      {(subordinates.length > 0 || staffSubordinates.length > 0) && (
                        <div className="w-0.5 h-6 bg-slate-300 my-1" />
                      )}

                      {/* Level 3 Subordinates */}
                      {subordinates.length > 0 && (
                        <div className="w-full space-y-3">
                          {subordinates.map(sub => (
                            <div
                              key={sub.id}
                              onClick={() => setActiveModalPegawai(sub)}
                              className="w-full bg-slate-100/90 rounded-lg p-3 border border-slate-200/80 cursor-pointer hover:bg-white hover:shadow transition text-center"
                            >
                              <div className="w-10 h-10 mx-auto rounded-full overflow-hidden border border-slate-200 mb-1.5 bg-white">
                                <img src={sub.fotoUrl} alt={sub.nama} className="w-full h-full object-cover" />
                              </div>
                              <h5 className="text-[11px] font-bold text-slate-800 line-clamp-1">
                                {sub.nama}
                              </h5>
                              <p className="text-[10px] text-slate-600 line-clamp-1">
                                {sub.jabatan}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Level 4 Direct Staff Subordinates */}
                      {staffSubordinates.length > 0 && (
                        <div className="w-full space-y-2 mt-2">
                          {staffSubordinates.map(st => (
                            <div
                              key={st.id}
                              onClick={() => setActiveModalPegawai(st)}
                              className="w-full bg-blue-50/60 rounded-md p-2 border border-blue-100 cursor-pointer hover:bg-blue-50 transition text-center"
                            >
                              <h6 className="text-[10px] font-bold text-blue-950 line-clamp-1">
                                {st.nama}
                              </h6>
                              <p className="text-[9px] text-blue-700 line-clamp-1">
                                {st.jabatan}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: DIRECTORY GRID */}
      {viewMode === 'grid' && (
        <div className="space-y-6">
          {/* Unit Filter Tags */}
          <div className="flex flex-wrap gap-2">
            {units.map((u, i) => (
              <button
                key={i}
                onClick={() => setSelectedUnit(u)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                  selectedUnit === u
                    ? 'bg-[#0f2042] text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {u === 'ALL' ? 'Semua Unit Kerja' : u}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGrid.map(p => (
              <div
                key={p.id}
                onClick={() => setActiveModalPegawai(p)}
                className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-slate-100 mb-3 bg-slate-100 group-hover:border-blue-400 transition">
                    <img src={p.fotoUrl} alt={p.nama} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {p.unitKerja}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-2 line-clamp-1 group-hover:text-blue-700 transition">
                      {p.gelarDepan} {p.nama} {p.gelarBelakang}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">
                      {p.jabatan}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono text-center">
                  NIP: {p.nipDinas}
                </div>
              </div>
            ))}
          </div>

          {filteredGrid.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200 text-slate-500 text-sm">
              Tidak ditemukan pegawai sesuai pencarian atau filter unit kerja.
            </div>
          )}
        </div>
      )}

      {/* DETAIL MODAL PEGAWAI */}
      {activeModalPegawai && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="bg-gradient-to-r from-[#0f2042] to-[#1e3a8a] p-6 text-white text-center relative">
              <button
                onClick={() => setActiveModalPegawai(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white text-sm bg-white/10 hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center"
              >
                ✕
              </button>
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white/50 shadow-lg mb-3 bg-slate-900">
                <img src={activeModalPegawai.fotoUrl} alt={activeModalPegawai.nama} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-base font-bold text-white">
                {activeModalPegawai.gelarDepan} {activeModalPegawai.nama} {activeModalPegawai.gelarBelakang}
              </h3>
              <p className="text-xs text-amber-300 font-medium mt-0.5">
                {activeModalPegawai.jabatan}
              </p>
            </div>

            <div className="p-6 space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Unit Kerja</span>
                <span className="font-semibold text-slate-800">{activeModalPegawai.unitKerja}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">NIP Kedinasan</span>
                <span className="font-mono text-slate-700">{activeModalPegawai.nipDinas}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Pangkat / Golongan</span>
                <span className="font-medium text-slate-800">{activeModalPegawai.pangkatGolongan || 'Penata Muda (III/a)'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Status Kepegawaian</span>
                <span className="font-semibold text-emerald-700">{activeModalPegawai.statusKepegawaian}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500">Tingkat Hierarki</span>
                <span className="font-semibold text-blue-700">Level {activeModalPegawai.level}</span>
              </div>

              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-[11px] text-amber-900">
                Data pejabat dan pegawai di atas bertanda <strong>(Data Simulasi / Prototipe)</strong> dan dapat diubah secara langsung oleh admin berwenang melalui panel admin.
              </div>

              <button
                onClick={() => setActiveModalPegawai(null)}
                className="w-full py-2.5 rounded-lg bg-[#0f2042] text-white font-semibold text-xs mt-4 hover:bg-blue-900 transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
