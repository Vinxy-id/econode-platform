import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  GitPullRequest,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Cloud,
  Code2,
  TrendingDown,
  Leaf,
  Server,
} from 'lucide-react';
import {
  CLOUD_RESOURCES,
  CODE_SCAN_FINDINGS,
  CloudProvider,
  ResourceStatus,
  formatIdr,
} from '../data/mockData';

const PROVIDERS: ('Semua' | CloudProvider)[] = [
  'Semua',
  'AWS',
  'GCP',
  'Alibaba Cloud',
  'Biznet Gio',
  'Proxmox Kampus',
];

export const CloudProfiler: React.FC = () => {
  const [selectedProvider, setSelectedProvider] = useState<'Semua' | CloudProvider>('Semua');
  const [selectedStatus, setSelectedStatus] = useState<'Semua' | ResourceStatus>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [simulatedIds, setSimulatedIds] = useState<string[]>(['res-1', 'res-3']);
  const [createdPrIds, setCreatedPrIds] = useState<string[]>([]);

  const toggleSimulate = (id: string) => {
    setSimulatedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const simulateAllWaste = () => {
    const wasteIds = CLOUD_RESOURCES.filter((r) => r.status !== 'Optimal').map(
      (r) => r.id
    );
    if (simulatedIds.length === wasteIds.length) {
      setSimulatedIds([]);
    } else {
      setSimulatedIds(wasteIds);
    }
  };

  const filteredResources = CLOUD_RESOURCES.filter((res) => {
    const matchProvider =
      selectedProvider === 'Semua' || res.provider === selectedProvider;
    const matchStatus =
      selectedStatus === 'Semua' || res.status === selectedStatus;
    const matchSearch =
      res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.spec.toLowerCase().includes(searchQuery.toLowerCase());
    return matchProvider && matchStatus && matchSearch;
  });

  const simulatedCostSavings = CLOUD_RESOURCES.filter((r) =>
    simulatedIds.includes(r.id)
  ).reduce((sum, r) => sum + r.potentialCostSave, 0);

  const simulatedCarbonSavings = CLOUD_RESOURCES.filter((r) =>
    simulatedIds.includes(r.id)
  ).reduce((sum, r) => sum + r.potentialCarbonSave, 0);

  const totalWasteCost = CLOUD_RESOURCES.reduce(
    (sum, r) => sum + r.potentialCostSave,
    0
  );
  const totalWasteCarbon = CLOUD_RESOURCES.reduce(
    (sum, r) => sum + r.potentialCarbonSave,
    0
  );

  const statusBadge = (status: ResourceStatus) => {
    if (status === 'Idle') {
      return 'bg-red-50 text-red-700 border-red-200';
    }
    if (status === 'Over-provisioned') {
      return 'bg-amber-50 text-amber-700 border-amber-200';
    }
    return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  };

  const severityAccent = (severity: 'High' | 'Medium' | 'Low') => {
    if (severity === 'High') return 'border-l-red-500';
    if (severity === 'Medium') return 'border-l-amber-500';
    return 'border-l-sky-500';
  };

  return (
    <div className="space-y-4">
      {/* Top 4 Bento KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* KPI 1: Dark Emerald Hero Card */}
        <div className="bento-hero p-4 text-white flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-200/80">
                Potensi Hemat Terdeteksi
              </p>
              <div className="mt-1.5 font-mono-num text-[19px] font-extrabold text-white leading-none whitespace-nowrap">
                {formatIdr(totalWasteCost)}
                <span className="text-xs font-medium text-emerald-200/75 ml-1">/bln</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center shrink-0">
              <TrendingDown className="w-4 h-4 text-emerald-300 stroke-[2.2]" />
            </div>
          </div>

          <div className="mt-3 flex items-end justify-between gap-2">
            <div className="space-y-1">
              <span className="inline-flex items-center whitespace-nowrap font-mono-num text-[11px] font-bold text-slate-950 bg-emerald-400 px-2 py-0.5 rounded-md">
                Simulasi: {formatIdr(simulatedCostSavings)}
              </span>
              <div className="text-[10px] text-emerald-100/70 font-mono-num">
                {simulatedIds.length} dari 7 node boros dipilih
              </div>
            </div>
            <svg width="68" height="28" viewBox="0 0 68 28" className="shrink-0">
              <polyline
                fill="none"
                stroke="#34D399"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="2,22 14,17 28,19 42,11 54,8 66,4"
              />
              <circle cx="66" cy="4" r="2.5" fill="#A7F3D0" />
            </svg>
          </div>
        </div>

        {/* KPI 2: Carbon Reduction */}
        <div className="bento-card p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                Reduksi Emisi Multi-Cloud
              </p>
              <div className="mt-1.5 font-mono-num text-[22px] font-extrabold text-slate-900 leading-none">
                {totalWasteCarbon}{' '}
                <span className="text-sm font-bold text-slate-600">kgCO2e</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200/70 flex items-center justify-center shrink-0">
              <Leaf className="w-4 h-4 text-sky-600 stroke-[2]" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between gap-2 text-[11px]">
            <span className="font-mono-num font-semibold text-sky-700 bg-sky-50 border border-sky-200/80 px-2 py-0.5 rounded-md whitespace-nowrap">
              Simulasi: -{simulatedCarbonSavings} kg
            </span>
            <span className="text-slate-400 font-mono-num whitespace-nowrap">
              5 Provider aktif
            </span>
          </div>
        </div>

        {/* KPI 3: Node Health Distribution */}
        <div className="bento-card p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                Infrastruktur Terhubung
              </p>
              <div className="mt-1.5 font-mono-num text-[22px] font-extrabold text-slate-900 leading-none">
                9 Node{' '}
                <span className="text-sm font-semibold text-slate-600">Cloud &amp; Lab</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200/70 flex items-center justify-center shrink-0">
              <Server className="w-4 h-4 text-emerald-600 stroke-[2]" />
            </div>
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="grid grid-cols-9 gap-1">
              {CLOUD_RESOURCES.map((r) => (
                <div
                  key={r.id}
                  className={`h-1.5 rounded-full ${
                    r.status === 'Idle'
                      ? 'bg-red-500'
                      : r.status === 'Over-provisioned'
                        ? 'bg-amber-400'
                        : 'bg-emerald-500'
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono-num text-slate-500">
              <span>3 Idle • 4 Over-prov</span>
              <span className="font-bold text-emerald-700">2 Optimal</span>
            </div>
          </div>
        </div>

        {/* KPI 4: CI/CD Code Scan */}
        <div className="bento-card p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                Audit Kode CI/CD GitHub
              </p>
              <div className="mt-1.5 font-mono-num text-[22px] font-extrabold text-slate-900 leading-none">
                3 Temuan{' '}
                <span className="text-sm font-semibold text-slate-600">Aktif</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/70 flex items-center justify-center shrink-0">
              <Code2 className="w-4 h-4 text-amber-600 stroke-[2]" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between gap-2 text-[11px]">
            <span className="font-mono-num font-semibold text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md whitespace-nowrap">
              54,0 kWh terbuang
            </span>
            <span className="font-mono-num text-slate-500 whitespace-nowrap">
              36,6 kgCO2e/bln
            </span>
          </div>
        </div>
      </div>

      {/* Filters & Multi-Cloud Resource Table */}
      <div className="bento-card p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-slate-600 mr-1 inline-flex items-center gap-1">
              <Cloud className="w-3.5 h-3.5 text-emerald-600" />
              Provider:
            </span>
            {PROVIDERS.map((p) => (
              <button
                key={p}
                onClick={() => setSelectedProvider(p)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                  selectedProvider === p
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari instance / region..."
                className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="inline-flex items-center gap-1 text-xs border border-slate-200 rounded-xl px-2.5 py-1.5 bg-slate-50">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={selectedStatus}
                onChange={(e) =>
                  setSelectedStatus(e.target.value as 'Semua' | ResourceStatus)
                }
                className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none"
              >
                <option value="Semua">Semua Status</option>
                <option value="Idle">Idle</option>
                <option value="Over-provisioned">Over-provisioned</option>
                <option value="Optimal">Optimal</option>
              </select>
            </div>
            <button
              onClick={simulateAllWaste}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-emerald-600 transition-colors"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              {simulatedIds.length >= 7
                ? 'Reset Simulasi'
                : 'Simulasikan Semua'}
            </button>
          </div>
        </div>

        {/* Multi-Cloud Resource Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-2 px-2.5">Nama Resource</th>
                <th className="py-2 px-2.5">Provider &amp; Region</th>
                <th className="py-2 px-2.5">Utilisasi CPU / RAM</th>
                <th className="py-2 px-2.5">Status</th>
                <th className="py-2 px-2.5">Biaya &amp; Emisi/bln</th>
                <th className="py-2 px-2.5 text-right">Simulasikan Optimasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredResources.map((res) => {
                const isSimulated = simulatedIds.includes(res.id);
                const effectiveCost = isSimulated
                  ? res.monthlyCost - res.potentialCostSave
                  : res.monthlyCost;
                const effectiveCarbon = isSimulated
                  ? res.monthlyCarbon - res.potentialCarbonSave
                  : res.monthlyCarbon;

                return (
                  <tr
                    key={res.id}
                    className={`transition-colors ${
                      isSimulated ? 'bg-emerald-50/55' : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <td className="py-2.5 px-2.5">
                      <div className="font-bold text-slate-900 font-mono-num">
                        {res.name}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono-num">
                        {isSimulated && res.status !== 'Optimal'
                          ? `-> ${res.recommendedSpec}`
                          : res.spec}
                      </div>
                    </td>
                    <td className="py-2.5 px-2.5">
                      <span className="inline-block font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md text-[11px]">
                        {res.provider}
                      </span>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {res.region}
                      </div>
                    </td>
                    <td className="py-2.5 px-2.5 w-48">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[10px]">
                          <span className="text-slate-500 w-7">CPU</span>
                          <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                res.cpuUtil < 10
                                  ? 'bg-red-500'
                                  : res.cpuUtil < 30
                                    ? 'bg-amber-500'
                                    : 'bg-emerald-500'
                              }`}
                              style={{ width: `${res.cpuUtil}%` }}
                            />
                          </div>
                          <span className="font-mono-num font-bold text-slate-800 w-8 text-right">
                            {res.cpuUtil}%
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px]">
                          <span className="text-slate-500 w-7">RAM</span>
                          <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                res.ramUtil < 15
                                  ? 'bg-red-400'
                                  : res.ramUtil < 35
                                    ? 'bg-amber-400'
                                    : 'bg-sky-500'
                              }`}
                              style={{ width: `${res.ramUtil}%` }}
                            />
                          </div>
                          <span className="font-mono-num font-bold text-slate-800 w-8 text-right">
                            {res.ramUtil}%
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-2.5">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border whitespace-nowrap ${statusBadge(
                          res.status
                        )}`}
                      >
                        {res.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-2.5">
                      <div className="font-mono-num font-bold text-slate-900 whitespace-nowrap">
                        {formatIdr(effectiveCost)}
                      </div>
                      <div className="font-mono-num text-[11px] text-sky-700 whitespace-nowrap">
                        {effectiveCarbon} kgCO2e
                        {isSimulated && res.potentialCostSave > 0 && (
                          <span className="ml-1.5 text-emerald-700 font-bold">
                            (-{res.potentialCarbonSave} kg)
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 px-2.5 text-right">
                      {res.status === 'Optimal' ? (
                        <span className="text-[11px] font-semibold text-emerald-700 inline-flex items-center gap-1 whitespace-nowrap">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Optimal
                        </span>
                      ) : (
                        <button
                          onClick={() => toggleSimulate(res.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold border transition-colors whitespace-nowrap ${
                            isSimulated
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-500 hover:text-emerald-700'
                          }`}
                        >
                          {isSimulated ? 'Simulasi Aktif' : 'Simulasikan'}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CI/CD GitHub Code Carbon Scan Findings */}
      <div className="bento-card p-4">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <Code2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                CI/CD GitHub Code Carbon Scan Findings
              </h3>
              <p className="text-[11px] text-slate-500">
                Analisis statis &amp; telemetry profiler otomatis pada Pull Request GitHub Actions
              </p>
            </div>
          </div>
          <span className="font-mono-num text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
            Total Pemborosan Kode: 54,0 kWh • 36,6 kgCO2e/bln
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {CODE_SCAN_FINDINGS.map((finding) => {
            const isPrCreated = createdPrIds.includes(finding.id);
            return (
              <div
                key={finding.id}
                className={`rounded-xl border border-l-4 ${severityAccent(
                  finding.severity
                )} border-slate-200 bg-slate-50/70 p-3.5 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono-num text-[11px] font-bold text-slate-700 truncate">
                      {finding.repo}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                        finding.severity === 'High'
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : finding.severity === 'Medium'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-sky-50 text-sky-700 border-sky-200'
                      }`}
                    >
                      {finding.severity}
                    </span>
                  </div>
                  <div className="font-mono-num text-[11px] text-emerald-700 bg-white border border-slate-200 rounded-lg px-2 py-1 mb-2 truncate">
                    {finding.file}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-start gap-1.5 leading-snug">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{finding.issue}</span>
                  </h4>
                  <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">
                    {finding.suggestion}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between gap-2">
                  <div className="font-mono-num text-[11px] font-bold text-slate-700 whitespace-nowrap">
                    +{finding.energyWasteKwh} kWh ({finding.carbonWasteKg} kg)
                  </div>
                  <button
                    onClick={() =>
                      setCreatedPrIds((prev) =>
                        prev.includes(finding.id) ? prev : [...prev, finding.id]
                      )
                    }
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors whitespace-nowrap ${
                      isPrCreated
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-900 text-white hover:bg-emerald-600'
                    }`}
                  >
                    <GitPullRequest className="w-3 h-3" />
                    {isPrCreated ? 'PR Dibuat' : 'Buat PR'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
