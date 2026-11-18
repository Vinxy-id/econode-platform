import React, { useState } from 'react';
import {
  Recycle,
  Clock,
  ShieldCheck,
  Wallet,
  Server,
  Zap,
  CheckCircle2,
  ArrowRightLeft,
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import {
  CIRCULAR_SERVERS,
  CIRCULAR_QUARTER_DATA,
  CircularServer,
  formatIdr,
} from '../data/mockData';

export const CircularTracker: React.FC = () => {
  const [selectedServer, setSelectedServer] = useState<CircularServer>(
    CIRCULAR_SERVERS[0]
  );

  const totalUnits = CIRCULAR_SERVERS.length;
  const totalEWaste = CIRCULAR_SERVERS.reduce(
    (s, srv) => s + srv.eWastePreventedKg,
    0
  );
  const totalCapexSaved = CIRCULAR_SERVERS.reduce(
    (s, srv) => s + srv.capexSavedIdr,
    0
  );
  const totalPowerBefore = CIRCULAR_SERVERS.reduce(
    (s, srv) => s + srv.powerBeforeW,
    0
  );
  const totalPowerAfter = CIRCULAR_SERVERS.reduce(
    (s, srv) => s + srv.powerAfterW,
    0
  );
  const powerReductionPct = Math.round(
    ((totalPowerBefore - totalPowerAfter) / totalPowerBefore) * 100
  );

  return (
    <div className="space-y-4">
      {/* 4 Circularity Bento KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Hero KPI: Dark Emerald Contrast */}
        <div className="bento-hero p-4 text-white flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-200/80">
                Server Fisik Direvitalisasi
              </p>
              <div className="mt-1.5 font-mono-num text-[22px] font-extrabold text-white leading-none">
                {totalUnits} Unit{' '}
                <span className="text-sm font-semibold text-emerald-200/80">
                  On-Premise
                </span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center">
              <Server className="w-4 h-4 text-emerald-300" />
            </div>
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="grid grid-cols-6 gap-1">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className={`h-1.5 rounded-full ${
                    n <= 5 ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}
                />
              ))}
            </div>
            <div className="text-[11px] text-emerald-200 font-semibold font-mono-num">
              5 Aktif Proxmox/K8s | 1 Migrasi
            </div>
          </div>
        </div>

        {/* KPI 2: Lifespan Extension + Visual Timeline Bar */}
        <div className="bento-card p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                Perpanjangan Umur Pakai
              </p>
              <div className="mt-1.5 font-mono-num text-[22px] font-extrabold text-slate-900 leading-none">
                +24 Bulan
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200/70 flex items-center justify-center">
              <Clock className="w-4 h-4 text-sky-600" />
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden flex">
              <div className="h-full bg-slate-400 w-[71%]" />
              <div className="h-full bg-emerald-500 w-[29%]" />
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono-num">
              <span className="text-slate-500">Standar 5 thn</span>
              <span className="font-bold text-emerald-700">7 thn (+24 bln)</span>
            </div>
          </div>
        </div>

        {/* KPI 3: E-Waste Prevented */}
        <div className="bento-card p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                E-Waste Berhasil Dicegah
              </p>
              <div className="mt-1.5 font-mono-num text-[22px] font-extrabold text-slate-900 leading-none">
                {totalEWaste.toFixed(1).replace('.', ',')} kg
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200/70 flex items-center justify-center">
              <Recycle className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <span className="font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md">
              Zero Limbah B3
            </span>
            <span className="text-slate-400 font-mono-num">6 unit tertahan</span>
          </div>
        </div>

        {/* KPI 4: Capex Saved */}
        <div className="bento-card p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                Penghematan Capex Hardware
              </p>
              <div className="mt-1.5 font-mono-num text-[22px] font-extrabold text-slate-900 leading-none">
                {formatIdr(totalCapexSaved)}
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/70 flex items-center justify-center">
              <Wallet className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] font-mono-num">
            <span className="font-semibold text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md">
              Daya -{powerReductionPct}%
            </span>
            <span className="text-slate-500">
              {totalPowerBefore}W -&gt; {totalPowerAfter}W
            </span>
          </div>
        </div>
      </div>

      {/* Main Split: Circular Chart & Lifecycle Detail (5 cols) + Server Inventory Table (7 cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch">
        {/* Left: Capex Avoided vs Revitalization Chart + Selected Node Card */}
        <div className="xl:col-span-5 flex flex-col gap-4">
          <div className="bento-card p-4">
            <div className="flex items-center justify-between mb-2.5">
              <div>
                <h2 className="text-sm font-extrabold text-slate-900">
                  Capex Dihemat vs E-Waste Dicegah
                </h2>
                <p className="text-[11px] text-slate-500">
                  Belanja server baru dihindari (Rp Jt) via virtualisasi EcoNode
                </p>
              </div>
              <span className="font-mono-num text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                ROI 11,5x
              </span>
            </div>

            <div className="h-[205px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={CIRCULAR_QUARTER_DATA}
                  margin={{ top: 8, right: 8, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis
                    dataKey="quarter"
                    tick={{ fill: '#64748B', fontSize: 11 }}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  <YAxis
                    yAxisId="capex"
                    tick={{ fill: '#059669', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v}jt`}
                  />
                  <YAxis
                    yAxisId="ewaste"
                    orientation="right"
                    tick={{ fill: '#0EA5E9', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v}kg`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E2E8F0',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                  />
                  <Bar
                    yAxisId="capex"
                    dataKey="newHardwareCapex"
                    name="Capex Server Baru Dihindari (Rp Jt)"
                    fill="#059669"
                    radius={[8, 8, 0, 0]}
                    barSize={26}
                    isAnimationActive={false}
                  />
                  <Bar
                    yAxisId="capex"
                    dataKey="econodeRevitalization"
                    name="Biaya Revitalisasi EcoNode (Rp Jt)"
                    fill="#CBD5E1"
                    radius={[8, 8, 0, 0]}
                    barSize={18}
                    isAnimationActive={false}
                  />
                  <Line
                    yAxisId="ewaste"
                    type="monotone"
                    dataKey="eWastePreventedKg"
                    name="Kumulatif E-Waste Dicegah (kg)"
                    stroke="#0EA5E9"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: '#0EA5E9', stroke: '#FFFFFF', strokeWidth: 1.5 }}
                    isAnimationActive={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-emerald-600 inline-block" />
                  Capex Dihindari
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-xs bg-slate-300 inline-block" />
                  Biaya Revitalisasi
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-3 h-0.5 bg-sky-500 inline-block" />
                  E-Waste (kg)
                </span>
              </div>
            </div>
          </div>

          {/* Selected Server Circularity Lifecycle Card */}
          <div className="bento-card p-4 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Profil Siklus Hidup Terpilih
                  </h3>
                </div>
                <span className="font-mono-num text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {selectedServer.hostname}
                </span>
              </div>

              <div className="text-sm font-extrabold text-slate-900">
                {selectedServer.hardwareModel}{' '}
                <span className="text-xs font-medium text-slate-500">
                  (Pengadaan {selectedServer.yearPurchased})
                </span>
              </div>

              <div className="mt-2.5 grid grid-cols-2 gap-2.5 text-xs">
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-2.5">
                  <div className="text-[10px] uppercase font-bold text-slate-400">
                    Peran Sebelumnya
                  </div>
                  <div className="font-semibold text-slate-700 mt-0.5">
                    {selectedServer.previousRole}
                  </div>
                </div>
                <div className="rounded-xl bg-emerald-50/70 border border-emerald-200 p-2.5">
                  <div className="text-[10px] uppercase font-bold text-emerald-700">
                    Peran Sirkular Aktif
                  </div>
                  <div className="font-semibold text-emerald-900 mt-0.5">
                    {selectedServer.circularRole}
                  </div>
                </div>
              </div>

              {/* Visual Lifespan Timeline Bar inside Detail Card */}
              <div className="mt-3 rounded-xl bg-slate-50 border border-slate-200/80 p-2.5">
                <div className="flex items-center justify-between text-[10px] font-semibold mb-1.5">
                  <span className="text-slate-600">
                    Timeline Umur Pakai Hardware
                  </span>
                  <span className="font-mono-num text-emerald-700 font-bold">
                    5 thn -&gt; 7 thn (+{selectedServer.lifespanExtensionMonths} bln)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden flex">
                  <div className="h-full bg-slate-500 w-[71%]" />
                  <div className="h-full bg-emerald-500 w-[29%]" />
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1.5 text-slate-600">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                Daya:{' '}
                <strong className="font-mono-num text-slate-900">
                  {selectedServer.powerBeforeW}W -&gt; {selectedServer.powerAfterW}W
                </strong>
              </span>
              <span className="font-mono-num font-bold text-emerald-700">
                Capex Saved {formatIdr(selectedServer.capexSavedIdr)}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Repurposed Server Table */}
        <div className="xl:col-span-7 bento-card p-4 flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900">
                Inventaris Server On-Premise Direpurposing (Ekonomi Sirkular)
              </h2>
              <p className="text-[11px] text-slate-500">
                Klik baris server untuk meninjau transisi beban kerja &amp; penghematan daya
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-xl">
              <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-600" />
              Proxmox VE + LXC Engine
            </span>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-2 px-2">Server &amp; Hardware</th>
                  <th className="py-2 px-2">Stack &amp; Utilisasi</th>
                  <th className="py-2 px-2 whitespace-nowrap">Umur +</th>
                  <th className="py-2 px-2 whitespace-nowrap">E-Waste</th>
                  <th className="py-2 px-2 whitespace-nowrap">Capex Dihemat</th>
                  <th className="py-2 px-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {CIRCULAR_SERVERS.map((srv) => {
                  const isSelected = selectedServer.id === srv.id;
                  return (
                    <tr
                      key={srv.id}
                      onClick={() => setSelectedServer(srv)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-emerald-50/80'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-3 px-2">
                        <div className="font-bold text-slate-900 font-mono-num whitespace-nowrap">
                          {srv.hostname}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {srv.hardwareModel}
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="font-semibold text-slate-800">
                          {srv.virtualizationStack}
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <div className="w-20 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 rounded-full"
                              style={{ width: `${srv.utilizationPct}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono-num whitespace-nowrap">
                            {srv.utilizationPct}% | {srv.powerAfterW}W
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-2 font-mono-num font-bold text-emerald-700 whitespace-nowrap">
                        +{srv.lifespanExtensionMonths} bln
                      </td>
                      <td className="py-3 px-2 font-mono-num font-semibold text-sky-700 whitespace-nowrap">
                        {srv.eWastePreventedKg.toFixed(1).replace('.', ',')} kg
                      </td>
                      <td className="py-3 px-2 font-mono-num font-bold text-slate-900 whitespace-nowrap">
                        {formatIdr(srv.capexSavedIdr)}
                      </td>
                      <td className="py-3 px-2">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border whitespace-nowrap ${
                            srv.status === 'Active Repurposed'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          {srv.status === 'Active Repurposed'
                            ? 'Aktif'
                            : 'Migrasi'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
