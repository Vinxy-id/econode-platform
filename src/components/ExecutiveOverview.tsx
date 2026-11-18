import React, { useState } from 'react';
import {
  TrendingDown,
  Leaf,
  Server,
  Sparkles,
  CheckCircle2,
  Play,
  Terminal,
  ArrowUpRight,
  TreePine,
  Globe2,
  Layers,
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import {
  MONTHLY_TREND_DATA,
  TOP_AI_RECOMMENDATIONS,
  AIRecommendation,
  formatIdr,
  TabId,
} from '../data/mockData';

interface ExecutiveOverviewProps {
  onNavigateTab: (tab: TabId) => void;
}

const INFRA_MIX = [
  { label: 'AWS', pct: 34, cost: '8,45 jt', color: 'bg-slate-800' },
  { label: 'GCP', pct: 28, cost: '8,12 jt', color: 'bg-sky-500' },
  { label: 'Proxmox', pct: 21, cost: '5,95 jt', color: 'bg-emerald-600' },
  { label: 'Biznet/Ali', pct: 17, cost: '5,19 jt', color: 'bg-amber-500' },
];

const REGION_INTENSITY = [
  { region: 'AWS Jakarta (ap-se-3)', intensity: '582 gCO2/kWh', status: 'Shift Ready', tone: 'sky' },
  { region: 'Proxmox Lab-01', intensity: 'PUE 1.38 • 0 Capex', status: 'Circular', tone: 'emerald' },
];

export const ExecutiveOverview: React.FC<ExecutiveOverviewProps> = ({
  onNavigateTab,
}) => {
  const [chartMode, setChartMode] = useState<'both' | 'cost' | 'carbon'>('both');
  const [appliedIds, setAppliedIds] = useState<string[]>([]);
  const [simulatingId, setSimulatingId] = useState<string | null>(null);

  const toggleApply = (rec: AIRecommendation) => {
    setAppliedIds((prev) =>
      prev.includes(rec.id) ? prev.filter((id) => id !== rec.id) : [...prev, rec.id]
    );
  };

  const extraAppliedCost = TOP_AI_RECOMMENDATIONS.filter((r) =>
    appliedIds.includes(r.id)
  ).reduce((sum, r) => sum + r.impactCost, 0);

  const extraAppliedCarbon = TOP_AI_RECOMMENDATIONS.filter((r) =>
    appliedIds.includes(r.id)
  ).reduce((sum, r) => sum + r.impactCarbon, 0);

  const displayedSavings = 12450000 + extraAppliedCost;
  const displayedCarbon = 418 + extraAppliedCarbon;

  const sixMonthCostSaved = MONTHLY_TREND_DATA.reduce(
    (sum, p) => sum + (p.costBefore - p.costAfter),
    0
  );
  const sixMonthCarbonSavedTons =
    MONTHLY_TREND_DATA.reduce(
      (sum, p) => sum + (p.carbonBefore - p.carbonAfter),
      0
    ) / 1000;

  // SVG radial ring calculation for 88 / 100
  const ringRadius = 20;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference * (1 - 0.88);

  const categoryAccent = (category: AIRecommendation['category']) => {
    if (category === 'Right-Sizing') return 'border-l-emerald-500';
    if (category === 'Carbon-Aware') return 'border-l-sky-500';
    return 'border-l-amber-500';
  };

  return (
    <div className="space-y-4">
      {/* Top 4 Bento KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* KPI 1: Signature Dark Emerald Gradient Hero Card */}
        <div className="bento-hero p-4 text-white flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-200/80">
                Estimasi Penghematan Biaya
              </p>
              <div className="mt-1.5 font-mono-num text-[22px] font-extrabold text-white tracking-tight leading-none">
                {formatIdr(displayedSavings)}
                <span className="text-xs font-medium text-emerald-200/75 ml-1">/bln</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center shrink-0">
              <TrendingDown className="w-4 h-4 text-emerald-300 stroke-[2.2]" />
            </div>
          </div>

          {/* Mini Sparkline + Pill Footer */}
          <div className="mt-3 flex items-end justify-between gap-2">
            <div className="space-y-1">
              <span className="inline-flex items-center whitespace-nowrap font-mono-num text-[11px] font-bold text-slate-950 bg-emerald-400 px-2 py-0.5 rounded-md">
                -31% vs bln lalu
              </span>
              <div className="text-[10px] text-emerald-100/70 font-mono-num whitespace-nowrap">
                Rp 40,2 -&gt; 27,7 jt/bln
              </div>
            </div>
            {/* Inline Sparkline SVG */}
            <svg width="68" height="30" viewBox="0 0 76 30" className="shrink-0 min-w-[68px]">
              <defs>
                <linearGradient id="heroSpark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34D399" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#34D399" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M2,6 L16,10 L31,15 L46,19 L61,23 L74,26 L74,29 L2,29 Z"
                fill="url(#heroSpark)"
              />
              <polyline
                fill="none"
                stroke="#34D399"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="2,6 16,10 31,15 46,19 61,23 74,26"
              />
              <circle cx="74" cy="26" r="2.5" fill="#A7F3D0" />
            </svg>
          </div>
        </div>

        {/* KPI 2: Reduksi Emisi Karbon + Mini Sparkline */}
        <div className="bento-card p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                Reduksi Emisi Karbon
              </p>
              <div className="mt-1.5 font-mono-num text-[22px] font-extrabold text-slate-900 tracking-tight leading-none">
                {displayedCarbon} <span className="text-sm font-bold text-slate-600">kgCO2e</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200/70 flex items-center justify-center shrink-0">
              <Leaf className="w-4 h-4 text-sky-600 stroke-[2]" />
            </div>
          </div>

          <div className="mt-3 flex items-end justify-between gap-2">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 whitespace-nowrap font-semibold text-[11px] text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200/80">
                <TreePine className="w-3 h-3 shrink-0" />
                {Math.round(displayedCarbon / 22)} pohon/bln
              </span>
              <div className="text-[10px] text-slate-400 font-mono-num whitespace-nowrap">
                614 kWh energi dihemat
              </div>
            </div>
            <svg width="72" height="28" viewBox="0 0 72 28" className="shrink-0">
              <polyline
                fill="none"
                stroke="#0EA5E9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="2,5 16,9 30,13 44,18 58,21 70,24"
              />
              <circle cx="70" cy="24" r="2.5" fill="#0284C7" />
            </svg>
          </div>
        </div>

        {/* KPI 3: Server Diperpanjang Umurnya + 6-Unit Circular Bar */}
        <div className="bento-card p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                Server Diperpanjang Umurnya
              </p>
              <div className="mt-1.5 font-mono-num text-[22px] font-extrabold text-slate-900 tracking-tight leading-none">
                6 Unit <span className="text-sm font-semibold text-slate-600">On-Premise</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200/70 flex items-center justify-center shrink-0">
              <Server className="w-4 h-4 text-emerald-600 stroke-[2]" />
            </div>
          </div>

          <div className="mt-3 space-y-1.5">
            {/* 6-node visual indicator */}
            <div className="grid grid-cols-6 gap-1">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className={`h-1.5 rounded-full ${
                    n <= 5 ? 'bg-emerald-500' : 'bg-amber-400'
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center justify-between gap-2 text-[11px]">
              <span className="inline-flex items-center whitespace-nowrap font-mono-num font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/80">
                +24 bln pakai
              </span>
              <button
                onClick={() => onNavigateTab('circular')}
                className="text-emerald-700 hover:underline font-semibold inline-flex items-center gap-0.5 whitespace-nowrap"
              >
                142,8 kg e-waste
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* KPI 4: Skor Green IT / UI GreenMetric + Radial Ring */}
        <div className="bento-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                Skor Green IT / GreenMetric
              </p>
              <div className="mt-1.5 font-mono-num text-[22px] font-extrabold text-slate-900 tracking-tight leading-none">
                88 <span className="text-sm font-semibold text-slate-400">/ 100</span>
              </div>
            </div>
            {/* SVG Circular Progress Ring */}
            <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                <circle
                  cx="24"
                  cy="24"
                  r={ringRadius}
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="4.5"
                />
                <circle
                  cx="24"
                  cy="24"
                  r={ringRadius}
                  fill="none"
                  stroke="#059669"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={ringOffset}
                />
              </svg>
              <span className="absolute font-mono-num text-[11px] font-extrabold text-emerald-700">
                A
              </span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2 text-[11px]">
            <span className="inline-flex items-center whitespace-nowrap font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/80">
              Grade A (Audit Ready)
            </span>
            <button
              onClick={() => onNavigateTab('esg')}
              className="text-slate-600 hover:text-emerald-700 font-semibold inline-flex items-center gap-0.5 whitespace-nowrap"
            >
              Ekspor ESG
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Bento Main Split: Left (7 cols: Chart + Infra Mix & Region Strips) | Right (5 cols: Top 3 Recommendations) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch">
        {/* Left Column */}
        <div className="xl:col-span-7 flex flex-col gap-4">
          {/* Shaded Savings Area Chart */}
          <div className="bento-card p-5 flex-1 flex flex-col justify-between">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-extrabold text-slate-900">
                    Tren Biaya Cloud vs Emisi Karbon (6 Bulan)
                  </h2>
                  <span className="font-mono-num text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    Total Hemat 6 Bln: Rp {sixMonthCostSaved.toFixed(1).replace('.', ',')} jt • {sixMonthCarbonSavedTons.toFixed(2).replace('.', ',')} tCO2e
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Baseline sebelum EcoNode vs aktual setelah AI right-sizing &amp; carbon-aware scheduling
                </p>
              </div>
              <div className="inline-flex rounded-xl bg-slate-100 p-0.5 border border-slate-200 text-xs">
                {(
                  [
                    { id: 'both', label: 'Biaya + Emisi' },
                    { id: 'cost', label: 'Biaya (Rp)' },
                    { id: 'carbon', label: 'Emisi (kgCO2e)' },
                  ] as const
                ).map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setChartMode(mode.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                      chartMode === mode.id
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={MONTHLY_TREND_DATA}
                  margin={{ top: 10, right: 8, left: -6, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="costAfterFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.28} />
                      <stop offset="95%" stopColor="#059669" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="carbonAfterFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.22} />
                      <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: '#64748B', fontSize: 11 }}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  <ReferenceLine
                    x="Sep 2026"
                    yAxisId={chartMode === 'carbon' ? 'carbon' : 'cost'}
                    stroke="#CBD5E1"
                    strokeDasharray="4 4"
                  />
                  {(chartMode === 'both' || chartMode === 'cost') && (
                    <YAxis
                      yAxisId="cost"
                      domain={[22, 44]}
                      tick={{ fill: '#059669', fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => `Rp ${v}jt`}
                    />
                  )}
                  {(chartMode === 'both' || chartMode === 'carbon') && (
                    <YAxis
                      yAxisId="carbon"
                      orientation={chartMode === 'carbon' ? 'left' : 'right'}
                      domain={[820, 1450]}
                      tick={{ fill: '#0EA5E9', fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => `${v} kg`}
                    />
                  )}
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E2E8F0',
                      borderRadius: '12px',
                      fontSize: '12px',
                      boxShadow: '0 8px 20px rgba(15, 23, 42, 0.08)',
                    }}
                  />
                  {(chartMode === 'both' || chartMode === 'cost') && (
                    <>
                      <Line
                        yAxisId="cost"
                        type="monotone"
                        dataKey="costBefore"
                        name="Biaya Baseline (Rp Jt)"
                        stroke="#94A3B8"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ r: 3, fill: '#94A3B8' }}
                        isAnimationActive={false}
                      />
                      <Area
                        yAxisId="cost"
                        type="monotone"
                        dataKey="costAfter"
                        name="Biaya Teroptimasi (Rp Jt)"
                        stroke="#059669"
                        strokeWidth={2.75}
                        fill="url(#costAfterFill)"
                        dot={{ r: 3.5, fill: '#059669', strokeWidth: 2, stroke: '#FFFFFF' }}
                        isAnimationActive={false}
                      />
                    </>
                  )}
                  {(chartMode === 'both' || chartMode === 'carbon') && (
                    <>
                      <Line
                        yAxisId="carbon"
                        type="monotone"
                        dataKey="carbonBefore"
                        name="Emisi Baseline (kgCO2e)"
                        stroke="#F59E0B"
                        strokeWidth={1.75}
                        strokeDasharray="4 4"
                        dot={false}
                        isAnimationActive={false}
                      />
                      <Area
                        yAxisId="carbon"
                        type="monotone"
                        dataKey="carbonAfter"
                        name="Emisi Teroptimasi (kgCO2e)"
                        stroke="#0EA5E9"
                        strokeWidth={2.25}
                        fill="url(#carbonAfterFill)"
                        dot={{ r: 3, fill: '#0EA5E9', strokeWidth: 1.5, stroke: '#FFFFFF' }}
                        isAnimationActive={false}
                      />
                    </>
                  )}
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600">
              <div className="flex flex-wrap items-center gap-3.5">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <span className="w-3 h-0.5 bg-emerald-600 inline-block" />
                  Biaya EcoNode
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-0.5 border-t-2 border-dashed border-slate-400 inline-block" />
                  Biaya Baseline
                </span>
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <span className="w-3 h-0.5 bg-sky-500 inline-block" />
                  Emisi EcoNode
                </span>
              </div>
              <span className="font-mono-num font-bold text-emerald-700">
                Nov 2026: Rp 27,71 jt (-31%) | 930 kgCO2e
              </span>
            </div>
          </div>

          {/* Bottom Bento Strip: Infrastructure Mix + Live Region Carbon Intensity */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-7 bento-card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <Layers className="w-3.5 h-3.5 text-emerald-600" />
                  Distribusi Beban &amp; Biaya Multi-Cloud
                </span>
                <button
                  onClick={() => onNavigateTab('profiler')}
                  className="text-[11px] font-semibold text-emerald-700 hover:underline inline-flex items-center gap-0.5"
                >
                  Detail Profiler
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
              {/* Stacked proportional bar */}
              <div className="h-2.5 w-full rounded-full overflow-hidden flex gap-0.5 bg-slate-100 mb-2.5">
                {INFRA_MIX.map((item) => (
                  <div
                    key={item.label}
                    className={`${item.color} h-full`}
                    style={{ width: `${item.pct}%` }}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                {INFRA_MIX.map((item) => (
                  <div key={item.label} className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${item.color}`} />
                      <span className="font-semibold text-slate-700 truncate">
                        {item.label}
                      </span>
                    </div>
                    <div className="font-mono-num text-[10px] text-slate-500 pl-3.5 whitespace-nowrap">
                      {item.pct}% • {item.cost}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-5 bento-card p-4 flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-2">
                <Globe2 className="w-3.5 h-3.5 text-sky-600" />
                Intensitas Karbon Region Aktif
              </div>
              <div className="space-y-2">
                {REGION_INTENSITY.map((r) => (
                  <div
                    key={r.region}
                    className="flex items-center justify-between gap-2 rounded-lg bg-slate-50 border border-slate-200/80 px-2.5 py-1.5"
                  >
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold text-slate-800 truncate">
                        {r.region}
                      </div>
                      <div className="font-mono-num text-[10px] text-slate-500">
                        {r.intensity}
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                        r.tone === 'emerald'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-sky-50 text-sky-700 border border-sky-200'
                      }`}
                    >
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Actionable AI Recommendations (Clean Aligned Footers) */}
        <div className="xl:col-span-5 bento-card p-5 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-900">
                  Actionable AI Recommendations
                </h2>
                <p className="text-xs text-slate-500">
                  Top 3 prioritas penghematan &amp; reduksi karbon
                </p>
              </div>
            </div>
            <span className="font-mono-num text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
              {appliedIds.length}/3 Diterapkan
            </span>
          </div>

          <div className="space-y-3 flex-1 flex flex-col justify-between">
            {TOP_AI_RECOMMENDATIONS.map((rec) => {
              const isApplied = appliedIds.includes(rec.id);
              const isSimulating = simulatingId === rec.id;

              return (
                <div
                  key={rec.id}
                  className={`rounded-xl border border-l-4 p-3.5 transition-all ${categoryAccent(
                    rec.category
                  )} ${
                    isApplied
                      ? 'bg-emerald-50/70 border-emerald-300'
                      : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                        {rec.provider}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                        {rec.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-12 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${rec.confidence}%` }}
                        />
                      </div>
                      <span className="font-mono-num text-[10px] font-semibold text-slate-500">
                        {rec.confidence}%
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 leading-snug">
                    {rec.title}
                  </h3>

                  <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">
                    {rec.summary}
                  </p>

                  {isSimulating && (
                    <div className="mt-2 rounded-lg bg-slate-900 text-emerald-300 px-2.5 py-1.5 font-mono-num text-[10px] flex items-center gap-2 overflow-x-auto">
                      <Terminal className="w-3 h-3 shrink-0 text-emerald-400" />
                      <span className="truncate">{rec.actionCommand}</span>
                    </div>
                  )}

                  {/* Dedicated, uniformly aligned action footer across all 3 cards */}
                  <div className="mt-2.5 pt-2.5 border-t border-slate-200/80 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 font-mono-num text-[11px] font-bold whitespace-nowrap">
                      <span className="text-emerald-700">
                        +{formatIdr(rec.impactCost)}/bln
                      </span>
                      <span className="text-slate-300">|</span>
                      <span className="text-sky-700">-{rec.impactCarbon} kgCO2e</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() =>
                          setSimulatingId(isSimulating ? null : rec.id)
                        }
                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors inline-flex items-center gap-1 whitespace-nowrap"
                      >
                        <Play className="w-3 h-3" />
                        {isSimulating ? 'Tutup' : 'Simulasikan'}
                      </button>
                      <button
                        onClick={() => toggleApply(rec)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors inline-flex items-center gap-1 whitespace-nowrap ${
                          isApplied
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'bg-slate-900 text-white hover:bg-emerald-600'
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        {isApplied ? 'Diterapkan' : 'Terapkan'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
