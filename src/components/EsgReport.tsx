import React, { useState } from 'react';
import {
  FileDown,
  Printer,
  CheckCircle2,
  ShieldCheck,
  Award,
  Filter,
  Calendar,
  Leaf,
  Recycle,
  TrendingDown,
} from 'lucide-react';
import { ESG_INDICATORS, formatIdr } from '../data/mockData';

export const EsgReport: React.FC = () => {
  const [frameworkFilter, setFrameworkFilter] = useState<
    'Semua' | 'UI GreenMetric' | 'GRI 302 & 305'
  >('Semua');
  const [period, setPeriod] = useState<'Semester Ganjil 2026' | 'Q4 2026'>(
    'Semester Ganjil 2026'
  );
  const [csvExported, setCsvExported] = useState(false);

  const visibleIndicators = ESG_INDICATORS.filter(
    (item) =>
      frameworkFilter === 'Semua' || item.framework === frameworkFilter
  );

  const ringRadius = 20;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference * (1 - 0.88);

  const handleExportCsv = () => {
    const headers = [
      'Kode',
      'Standar',
      'Kategori',
      'Indikator',
      'Skor',
      'Skor Maks',
      'Bukti Terukur',
      'Status',
    ];
    const rows = visibleIndicators.map((ind) => [
      ind.code,
      ind.framework,
      ind.category,
      `"${ind.indicator}"`,
      String(ind.score),
      String(ind.maxScore),
      `"${ind.evidence}"`,
      ind.status,
    ]);
    const csvContent = [
      headers.join(','),
      ...rows.map((r) => r.join(',')),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `EcoNode_ESG_Audit_${period.replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setCsvExported(true);
    setTimeout(() => setCsvExported(false), 3000);
  };

  return (
    <div className="space-y-4">
      {/* Top 4 Bento KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* KPI 1: Dark Emerald Hero Card with Radial Score */}
        <div className="bento-hero p-4 text-white flex flex-col justify-between">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-200/80">
                Skor Green IT / GreenMetric
              </p>
              <div className="mt-1.5 font-mono-num text-[24px] font-extrabold text-white leading-none">
                88 <span className="text-sm font-semibold text-emerald-200/75">/ 100</span>
              </div>
            </div>
            <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                <circle
                  cx="24"
                  cy="24"
                  r={ringRadius}
                  fill="none"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="4.5"
                />
                <circle
                  cx="24"
                  cy="24"
                  r={ringRadius}
                  fill="none"
                  stroke="#34D399"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={ringOffset}
                />
              </svg>
              <span className="absolute font-mono-num text-xs font-extrabold text-emerald-300">
                A
              </span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <span className="inline-flex items-center gap-1 font-bold text-slate-950 bg-emerald-400 px-2 py-0.5 rounded-md">
              <Award className="w-3 h-3" />
              Grade A • Audit Ready
            </span>
            <span className="font-mono-num text-emerald-200/80">ECN-2026-088</span>
          </div>
        </div>

        {/* KPI 2: Financial & Carbon */}
        <div className="bento-card p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                Efisiensi Biaya Terverifikasi
              </p>
              <div className="mt-1.5 font-mono-num text-[21px] font-extrabold text-slate-900 leading-none">
                {formatIdr(12450000)}
                <span className="text-xs font-semibold text-slate-500">/bln</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200/70 flex items-center justify-center">
              <TrendingDown className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] font-mono-num">
            <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
              -31% biaya cloud
            </span>
            <span className="text-slate-500">614 kWh/bln</span>
          </div>
        </div>

        {/* KPI 3: Carbon Impact */}
        <div className="bento-card p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                Reduksi Emisi GRK Scope 2/3
              </p>
              <div className="mt-1.5 font-mono-num text-[21px] font-extrabold text-slate-900 leading-none">
                418 <span className="text-sm font-bold text-slate-600">kgCO2e/bln</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200/70 flex items-center justify-center">
              <Leaf className="w-4 h-4 text-sky-600" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] font-mono-num">
            <span className="font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-md">
              5,01 tCO2e / thn
            </span>
            <span className="text-slate-500">~19 pohon/bln</span>
          </div>
        </div>

        {/* KPI 4: Circularity & E-Waste */}
        <div className="bento-card p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                Kepatuhan Ekonomi Sirkular
              </p>
              <div className="mt-1.5 font-mono-num text-[21px] font-extrabold text-slate-900 leading-none">
                142,8 kg{' '}
                <span className="text-xs font-semibold text-slate-500">e-waste</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200/70 flex items-center justify-center">
              <Recycle className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] font-mono-num">
            <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
              6 Unit (+24 bln)
            </span>
            <span className="text-slate-600 font-bold">Capex Rp 168 jt</span>
          </div>
        </div>
      </div>

      {/* Control Toolbar */}
      <div className="no-print bento-card p-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex items-center gap-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
            <Filter className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-semibold text-slate-600">Standar:</span>
            <select
              value={frameworkFilter}
              onChange={(e) =>
                setFrameworkFilter(
                  e.target.value as 'Semua' | 'UI GreenMetric' | 'GRI 302 & 305'
                )
              }
              className="bg-transparent font-bold text-slate-900 focus:outline-none"
            >
              <option value="Semua">Semua Standar (UI GreenMetric + GRI)</option>
              <option value="UI GreenMetric">UI GreenMetric (Kampus)</option>
              <option value="GRI 302 & 305">GRI 302 &amp; 305 (ESG Korporat)</option>
            </select>
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-semibold text-slate-600">Periode:</span>
            <select
              value={period}
              onChange={(e) =>
                setPeriod(
                  e.target.value as 'Semester Ganjil 2026' | 'Q4 2026'
                )
              }
              className="bg-transparent font-bold text-slate-900 focus:outline-none"
            >
              <option value="Semester Ganjil 2026">Semester Ganjil 2026</option>
              <option value="Q4 2026">Q4 2026 (Okt - Des)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition-colors"
          >
            <FileDown className="w-3.5 h-3.5" />
            {csvExported ? 'CSV Terunduh' : 'Export CSV'}
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            Cetak / Export PDF
          </button>
        </div>
      </div>

      {/* Printable Audit Sheet Preview */}
      <div className="bento-card p-5">
        <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full mb-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              One-Click ESG &amp; UI GreenMetric Audit Report
            </div>
            <h2 className="text-lg font-extrabold text-slate-900">
              Laporan Kinerja Green IT, Emisi Karbon &amp; Ekonomi Sirkular
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Institusi:{' '}
              <strong className="text-slate-800">
                UPT TIK Universitas Bhinneka PGRI, Tulungagung
              </strong>{' '}
              | Periode: <strong className="text-slate-800">{period}</strong> |
              Audit ID: <span className="font-mono-num">ECN-2026-UBP-088</span>
            </p>
          </div>

          <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-3.5 py-2 text-right">
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
              Status Verifikasi
            </div>
            <div className="font-mono-num text-sm font-extrabold text-emerald-800 mt-0.5">
              {visibleIndicators.length} Indikator Valid
            </div>
            <div className="text-[10px] font-semibold text-emerald-700">
              Campus / Enterprise License
            </div>
          </div>
        </div>

        {/* Audit Indicators Table */}
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-2 px-2.5">Kode</th>
                <th className="py-2 px-2.5">Standar</th>
                <th className="py-2 px-2.5">Indikator Keberlanjutan</th>
                <th className="py-2 px-2.5">Bukti Telemetri Terukur</th>
                <th className="py-2 px-2.5">Skor Capaian</th>
                <th className="py-2 px-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {visibleIndicators.map((ind) => {
                const pct = Math.round((ind.score / ind.maxScore) * 100);
                return (
                  <tr key={ind.code} className="hover:bg-slate-50/80">
                    <td className="py-2.5 px-2.5 font-mono-num font-bold text-slate-900 whitespace-nowrap">
                      {ind.code}
                    </td>
                    <td className="py-2.5 px-2.5">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold text-[10px] whitespace-nowrap">
                        {ind.framework}
                      </span>
                    </td>
                    <td className="py-2.5 px-2.5">
                      <div className="font-bold text-slate-900">
                        {ind.indicator}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {ind.category}
                      </div>
                    </td>
                    <td className="py-2.5 px-2.5 text-slate-600">
                      {ind.evidence}
                    </td>
                    <td className="py-2.5 px-2.5 w-36">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="font-mono-num font-bold text-emerald-700 whitespace-nowrap">
                          {ind.score}/{ind.maxScore}
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-2.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
                        <CheckCircle2 className="w-3 h-3" />
                        {ind.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Sign-off */}
        <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            Dihasilkan otomatis oleh{' '}
            <strong className="text-slate-700">
              EcoNode Green FinOps Engine v1.2
            </strong>{' '}
            sesuai faktor emisi ketenagalistrikan nasional &amp; kriteria UI GreenMetric.
          </div>
          <div className="font-mono-num font-semibold text-slate-600">
            Paket Lisensi: Campus / Enterprise (Rp 2.500.000/bln)
          </div>
        </div>
      </div>
    </div>
  );
};
