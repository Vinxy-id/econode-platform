import React, { useState } from 'react';
import {
  Leaf,
  ArrowRight,
  Cpu,
  Recycle,
  FileCheck2,
  Server,
  GitBranch,
  Database,
  Sparkles,
  TrendingDown,
  Award,
  CheckCircle2,
  GraduationCap,
  ShieldCheck,
  Users,
  Sliders,
  Terminal,
  AlertCircle,
  Clock,
  Layers,
} from 'lucide-react';
import { PRICING_PLANS, TabId, formatIdr } from '../data/mockData';

interface LandingPageProps {
  onOpenDashboard: (tab?: TabId) => void;
}

const TEAM_MEMBERS = [
  {
    initials: 'AW',
    name: 'Alvin Widiantara',
    nim: 'NIM 25161562037',
    role: 'CEO & Business/FinOps Strategy',
  },
  {
    initials: 'MF',
    name: 'Muhammad Farid Firdaus',
    nim: 'NIM 25161562079',
    role: 'CTO & Cloud/Backend Engineer',
  },
  {
    initials: 'DP',
    name: 'Davin Putra Fibrian',
    nim: 'NIM 25161562074',
    role: 'CPO & AI/Frontend Engineer',
  },
];

const ARCH_STAGES = [
  {
    step: '01',
    title: 'Multi-Cloud / Proxmox / GitHub',
    desc: 'AWS, GCP, Alibaba Cloud, Biznet Gio, Proxmox Kampus & GitHub Actions CI/CD',
    icon: Server,
  },
  {
    step: '02',
    title: 'FastAPI & Go Collector',
    desc: 'Agen telemetri ringan membaca CPU/RAM/daya (kWh) & static code profiler',
    icon: GitBranch,
  },
  {
    step: '03',
    title: 'AI FinOps & Carbon Engine',
    desc: 'Time-series forecasting, right-sizing, carbon-aware window & TimescaleDB',
    icon: Database,
  },
  {
    step: '04',
    title: 'Hemat Biaya & Umur Server',
    desc: '-31% biaya cloud, +24 bln umur server sirkular, & laporan ESG 1-klik',
    icon: ShieldCheck,
  },
];

const TELEMETRY_PROVIDERS = [
  { name: 'AWS', region: 'ap-southeast-3', status: 'Synced' },
  { name: 'GCP', region: 'asia-southeast2', status: 'Synced' },
  { name: 'Alibaba Cloud', region: 'ap-southeast-5', status: 'Idle Alert' },
  { name: 'Biznet Gio', region: 'ID-West', status: 'Synced' },
  { name: 'Proxmox VE', region: 'Lab Kampus UBP', status: 'Circular' },
];

const SCHEDULER_WINDOWS = [
  { hour: '00', level: 'low', label: '01:00-05:00' },
  { hour: '04', level: 'low', label: 'Optimal' },
  { hour: '08', level: 'mid', label: '08:00' },
  { hour: '12', level: 'high', label: 'Peak' },
  { hour: '16', level: 'high', label: '16:00' },
  { hour: '20', level: 'mid', label: '20:00' },
];

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenDashboard }) => {
  // Interactive ROI & Carbon Savings Calculator state
  const [cloudSpendJt, setCloudSpendJt] = useState<number>(40);
  const [onPremServers, setOnPremServers] = useState<number>(6);
  const [previewTab, setPreviewTab] = useState<TabId>('overview');

  const monthlyCloudSavings = Math.round(cloudSpendJt * 1_000_000 * 0.31);
  const monthlyCarbonReduced = Math.round(cloudSpendJt * 8.1 + onPremServers * 15.6);
  const eWastePreventedKg = (onPremServers * 23.8).toFixed(1).replace('.', ',');
  const capexSavedJt = onPremServers * 28;
  const recommendedPlan =
    onPremServers >= 3 || cloudSpendJt > 20
      ? { name: 'Campus / Enterprise', price: 'Rp 2.500.000/bln', fee: 2_500_000 }
      : { name: 'Pro SaaS', price: 'Rp 499.000/bln', fee: 499_000 };
  const roiMultiplier = (monthlyCloudSavings / recommendedPlan.fee).toFixed(1).replace('.', ',');

  // SVG radial ring for 88 / 100
  const ringR = 22;
  const ringC = 2 * Math.PI * ringR;
  const ringOff = ringC * (1 - 0.88);

  return (
    <div className="min-h-screen bg-[#F3F6F4] text-[#0F172A]">
      {/* Dark Atmospheric Hero Shell + Floating Liquid-Glass Navbar */}
      <div className="hero-obsidian relative overflow-hidden border-b border-emerald-950/60">
        <div className="dot-grid-bg absolute inset-0 opacity-60 pointer-events-none" />

        {/* Floating Liquid-Glass Navbar */}
        <div className="sticky top-3 z-50 max-w-[1320px] mx-auto px-5 pt-3">
          <header className="rounded-2xl bg-[#0B1C16]/75 backdrop-blur-xl border border-emerald-400/20 shadow-[0_14px_40px_-14px_rgba(0,0,0,0.6)] px-5 py-2.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-[0_0_18px_-4px_rgba(16,185,129,0.7)]">
                <Leaf className="w-4 h-4 text-slate-950 stroke-[2.3]" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-tight text-white">
                  EcoNode
                </span>
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  v1.2
                </span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
              <a href="#fitur" className="hover:text-emerald-300 transition-colors">
                Fitur
              </a>
              <a href="#roi-calculator" className="hover:text-emerald-300 transition-colors">
                Simulator ROI
              </a>
              <a href="#arsitektur" className="hover:text-emerald-300 transition-colors">
                Arsitektur
              </a>
              <a href="#harga" className="hover:text-emerald-300 transition-colors">
                Harga
              </a>
              <a href="#tim" className="hover:text-emerald-300 transition-colors">
                Tim
              </a>
            </nav>

            <button
              onClick={() => onOpenDashboard('overview')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-400 text-slate-950 hover:bg-emerald-300 transition-colors shadow-[0_0_20px_-6px_rgba(52,211,153,0.8)]"
            >
              Live Demo Dashboard
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </header>
        </div>

        {/* Cinematic Hero Content */}
        <section className="relative z-10 max-w-[1320px] mx-auto px-6 pt-9 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                AI FinOps Engine v1.2 • Live Telemetry • UPC 2026
              </div>

              <h1 className="text-4xl xl:text-[43px] font-extrabold text-white tracking-tight leading-[1.12]">
                Tekan Biaya Cloud{' '}
                <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-200 bg-clip-text text-transparent">
                  20–40%
                </span>
                , Perpanjang Umur Server, &amp; Raih{' '}
                <span className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-transparent whitespace-nowrap">
                  GreenMetric Grade A
                </span>
                .
              </h1>

              <p className="text-sm xl:text-[15px] text-slate-300 leading-relaxed max-w-xl">
                Ekosistem SaaS Green FinOps berbasis kecerdasan buatan yang
                mengaudit pemborosan multi-cloud, mengoptimalkan kode CI/CD,
                merevitalisasi server fisik sirkular, serta menyusun laporan ESG
                &amp; UI GreenMetric secara otomatis.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => onOpenDashboard(previewTab)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-emerald-400 text-slate-950 hover:bg-emerald-300 transition-all shadow-[0_12px_28px_-8px_rgba(52,211,153,0.65)]"
                >
                  Buka Live Demo Dashboard
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#roi-calculator"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-white/10 border border-white/20 text-white hover:bg-white/15 transition-colors backdrop-blur-md"
                >
                  <Sliders className="w-4 h-4 text-emerald-300" />
                  Hitung Simulasi ROI
                </a>
              </div>

              <div className="pt-3 border-t border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-200/60 mb-2">
                  Ekosistem Telemetri Terintegrasi
                </p>
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-200">
                  {[
                    'AWS',
                    'Google Cloud',
                    'Alibaba Cloud',
                    'Biznet Gio',
                    'Proxmox VE',
                    'GitHub Actions',
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Layered Glassmorphic Product Showcase Window */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl bg-[#0B1C16]/85 backdrop-blur-xl border border-emerald-400/25 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.75)] p-4 text-white space-y-3.5">
                {/* Window Chrome + Anomaly Alert Pill */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                    </div>
                    <span className="font-mono-num text-[11px] text-slate-400 ml-1">
                      econode.app / {previewTab}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/35 text-amber-300 text-[10px] font-bold">
                    <AlertCircle className="w-3 h-3 text-amber-400" />
                    Anomaly Detected: Idle c5.2xlarge
                  </div>
                </div>

                {/* 4 Dark-Glass Metric Tiles */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="rounded-xl bg-white/[0.06] border border-white/10 p-3">
                    <div className="flex items-center justify-between text-[11px] text-emerald-200/80 font-semibold">
                      <span>Penghematan Biaya</span>
                      <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="mt-1 font-mono-num text-lg font-extrabold text-white">
                      -31%{' '}
                      <span className="text-xs font-semibold text-emerald-300">
                        Rp 12,45 jt/bln
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 font-mono-num">
                      6-Bln Kumulatif: Rp 51,7 jt
                    </div>
                  </div>

                  <div className="rounded-xl bg-white/[0.06] border border-white/10 p-3">
                    <div className="flex items-center justify-between text-[11px] text-emerald-200/80 font-semibold">
                      <span>Reduksi Emisi Karbon</span>
                      <Leaf className="w-3.5 h-3.5 text-sky-400" />
                    </div>
                    <div className="mt-1 font-mono-num text-lg font-extrabold text-white">
                      418{' '}
                      <span className="text-xs font-semibold text-sky-300">
                        kgCO2e/bln
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Setara 19 pohon dewasa / bulan
                    </div>
                  </div>

                  <div className="rounded-xl bg-white/[0.06] border border-white/10 p-3">
                    <div className="flex items-center justify-between text-[11px] text-emerald-200/80 font-semibold">
                      <span>Circular Server</span>
                      <Recycle className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="mt-1 font-mono-num text-lg font-extrabold text-white">
                      +24 Bln{' '}
                      <span className="text-xs font-semibold text-emerald-300">
                        6 Unit
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 font-mono-num">
                      142,8 kg e-waste • Rp 168 jt Capex
                    </div>
                  </div>

                  <div className="rounded-xl bg-white/[0.06] border border-white/10 p-3">
                    <div className="flex items-center justify-between text-[11px] text-emerald-200/80 font-semibold">
                      <span>UI GreenMetric</span>
                      <Award className="w-3.5 h-3.5 text-amber-300" />
                    </div>
                    <div className="mt-1 font-mono-num text-lg font-extrabold text-white">
                      88 / 100{' '}
                      <span className="text-xs font-semibold text-emerald-300">
                        Grade A
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Siap audit PDF &amp; CSV 1-klik
                    </div>
                  </div>
                </div>

                {/* Live Shaded Area Sparkline Showcase */}
                <div className="rounded-xl bg-slate-950/60 border border-white/10 p-3">
                  <div className="flex items-center justify-between text-[10px] mb-1.5">
                    <span className="font-semibold text-slate-300">
                      Baseline Spend vs EcoNode Optimized (Jun – Nov 2026)
                    </span>
                    <span className="font-mono-num font-bold text-emerald-400">
                      Rp 40,2 jt -&gt; Rp 27,7 jt
                    </span>
                  </div>
                  <svg viewBox="0 0 420 68" className="w-full h-16">
                    <defs>
                      <linearGradient id="showcaseArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.02" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="14" x2="420" y2="14" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                    <line x1="0" y1="38" x2="420" y2="38" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                    {/* Baseline dashed */}
                    <polyline
                      fill="none"
                      stroke="#64748B"
                      strokeWidth="1.75"
                      strokeDasharray="5 5"
                      points="10,16 90,18 172,15 254,19 336,17 410,19"
                    />
                    {/* Shaded area */}
                    <path
                      d="M10,19 C70,32 130,42 172,46 C230,52 310,56 410,59 L410,66 L10,66 Z"
                      fill="url(#showcaseArea)"
                    />
                    {/* Optimized line */}
                    <path
                      d="M10,19 C70,32 130,42 172,46 C230,52 310,56 410,59"
                      fill="none"
                      stroke="#34D399"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="410" cy="59" r="3.5" fill="#A7F3D0" />
                  </svg>
                </div>

                {/* Clickable Module Switcher Pills */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
                  <span className="text-[11px] text-slate-400">
                    Pilih modul demo interaktif:
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {(
                      [
                        { id: 'overview', label: 'Overview' },
                        { id: 'profiler', label: 'Profiler' },
                        { id: 'circular', label: 'Circular' },
                        { id: 'esg', label: 'ESG Report' },
                      ] as const
                    ).map((m) => (
                      <button
                        key={m.id}
                        onMouseEnter={() => setPreviewTab(m.id)}
                        onClick={() => onOpenDashboard(m.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                          previewTab === m.id
                            ? 'bg-emerald-400 text-slate-950'
                            : 'bg-white/10 text-slate-200 hover:bg-white/20'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Asymmetric 6-Tile Bento Feature Grid */}
      <section id="fitur" className="max-w-[1320px] mx-auto px-6 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
              Arsitektur Produk Bento EcoNode
            </span>
            <h2 className="text-2xl xl:text-3xl font-extrabold text-slate-900 mt-1">
              6 Kapabilitas Inti Green FinOps &amp; Ekonomi Sirkular
            </h2>
          </div>
          <button
            onClick={() => onOpenDashboard('overview')}
            className="text-xs font-bold text-emerald-700 hover:underline inline-flex items-center gap-1"
          >
            Buka Workspace Lengkap
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Tile 1 (Wide - 7 cols): AI Cloud & CI/CD Carbon Profiler */}
          <div className="lg:col-span-7 bento-card p-5 flex flex-col justify-between">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="max-w-md">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full mb-2">
                  <Cpu className="w-3.5 h-3.5" />
                  AI Cloud &amp; CI/CD Carbon Profiler
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Deteksi VM Idle &amp; Kode Boros Energi Sebelum Deploy
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Analisis CPU/RAM multi-cloud dan inspeksi GitHub Actions untuk
                  menekan query N+1 serta over-provisioning spesifikasi server.
                </p>
              </div>
              <button
                onClick={() => onOpenDashboard('profiler')}
                className="text-xs font-bold text-emerald-700 hover:underline inline-flex items-center gap-1"
              >
                Buka Profiler <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mini Terminal Diff Artifact */}
            <div className="mt-4 rounded-xl bg-[#0B1914] text-slate-200 p-3.5 font-mono-num text-[11px] border border-emerald-900/60 space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1.5 border-b border-white/10">
                <span className="inline-flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  econode-cli scan --repo ubp/siakad-gateway
                </span>
                <span className="text-emerald-400 font-bold">PR #104 Ready</span>
              </div>
              <div className="text-amber-300">
                - query: N+1 loop in billingSync.ts:142 (+28.4 kWh/bln)
              </div>
              <div className="text-emerald-300">
                + patch: -38% query energy | c5.2xlarge -&gt; c5.large (-Rp 1,85 jt/bln)
              </div>
            </div>
          </div>

          {/* Tile 2 (5 cols): Circular Server & E-Waste Tracker */}
          <div className="lg:col-span-5 bento-card p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full">
                  <Recycle className="w-3.5 h-3.5" />
                  Circular Server Tracker
                </span>
                <button
                  onClick={() => onOpenDashboard('circular')}
                  className="text-xs font-bold text-slate-700 hover:text-emerald-700 inline-flex items-center gap-1"
                >
                  Detail <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Revitalisasi Server Lama via Proxmox LXC
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Ubah server fisik usia 5 tahun menjadi node container hemat daya
                untuk menahan limbah elektronik dan belanja Capex baru.
              </p>
            </div>

            {/* Tactile Lifespan Timeline Bar + E-waste Badges */}
            <div className="mt-4 space-y-2.5">
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
                <div className="flex items-center justify-between text-[11px] font-bold mb-1.5">
                  <span className="text-slate-600">Siklus Umur Hardware</span>
                  <span className="font-mono-num text-emerald-700">
                    5 thn -&gt; 7 thn (+24 bln)
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-200 overflow-hidden flex">
                  <div className="h-full bg-slate-500 w-[71%]" />
                  <div className="h-full bg-emerald-500 w-[29%]" />
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 font-mono-num text-[11px] font-bold">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                  142,8 kg e-waste dicegah
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                  Capex Rp 168 jt
                </span>
              </div>
            </div>
          </div>

          {/* Tile 3 (4 cols): One-Click ESG & UI GreenMetric */}
          <div className="lg:col-span-4 bento-card p-5 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full mb-2">
                  <FileCheck2 className="w-3.5 h-3.5" />
                  One-Click ESG Report
                </span>
                <h3 className="text-base font-extrabold text-slate-900">
                  Audit UI GreenMetric &amp; GRI 302/305 Instan
                </h3>
              </div>
              {/* Radial Ring */}
              <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r={ringR} fill="none" stroke="#E2E8F0" strokeWidth="5" />
                  <circle
                    cx="28"
                    cy="28"
                    r={ringR}
                    fill="none"
                    stroke="#059669"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={ringC}
                    strokeDashoffset={ringOff}
                  />
                </svg>
                <span className="absolute font-mono-num text-xs font-extrabold text-emerald-700">
                  88
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="font-mono-num text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                Grade A • GRI 302/305
              </span>
              <button
                onClick={() => onOpenDashboard('esg')}
                className="text-xs font-bold text-slate-800 hover:text-emerald-700 inline-flex items-center gap-1"
              >
                Ekspor PDF/CSV <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Tile 5 (Wide - 8 cols): Carbon-Aware Batch Scheduler */}
          <div className="lg:col-span-8 bento-card p-5 flex flex-col justify-between">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full mb-2">
                  <Clock className="w-3.5 h-3.5" />
                  Carbon-Aware Batch Scheduler
                </span>
                <h3 className="text-base font-extrabold text-slate-900">
                  Eksekusi ETL &amp; Backup Otomatis di Window Rendah Karbon
                </h3>
              </div>
              <span className="font-mono-num text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                01:00–05:00 WIB • -28% gCO2/kWh
              </span>
            </div>

            {/* Visual Time-Window Bar */}
            <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-3">
              <div className="grid grid-cols-6 gap-1.5">
                {SCHEDULER_WINDOWS.map((slot) => (
                  <div key={slot.hour} className="space-y-1">
                    <div
                      className={`h-6 rounded-lg flex items-center justify-center text-[10px] font-bold font-mono-num ${
                        slot.level === 'low'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : slot.level === 'mid'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-red-100 text-red-700 border border-red-200'
                      }`}
                    >
                      {slot.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                <span>Window hijau dipilih otomatis oleh AI Scheduler</span>
                <span className="font-mono-num font-bold text-sky-700">
                  Hemat -42 kgCO2e/bln pada analytics-cron-vm
                </span>
              </div>
            </div>
          </div>

          {/* Tile 4 (7 cols): Multi-Cloud & On-Premise Telemetry Matrix */}
          <div className="lg:col-span-7 bento-card p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Multi-Cloud &amp; On-Premise Telemetry
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                  Pantau Cloud Global, VPS Lokal, &amp; Proxmox Kampus Terpadu
                </h3>
              </div>
              <span className="font-mono-num text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                5 Provider
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {TELEMETRY_PROVIDERS.map((prov) => (
                <div
                  key={prov.name}
                  className="rounded-xl bg-slate-50 border border-slate-200 p-2.5"
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        prov.status === 'Idle Alert'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                    />
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {prov.name}
                    </span>
                  </div>
                  <div className="font-mono-num text-[10px] text-slate-500 mt-1 truncate">
                    {prov.region}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tile 6 (5 cols): Monospace Precision Metrics (Dark Emerald Bento Tile) */}
          <div className="lg:col-span-5 bento-hero p-5 text-white flex flex-col justify-between">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                  Presisi Metrik Terukur
                </span>
                <h3 className="text-base font-extrabold text-white mt-0.5">
                  Dampak Tervalidasi 6 Bulan
                </h3>
              </div>
              <Sparkles className="w-5 h-5 text-emerald-300" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/[0.08] border border-white/10 p-3">
                <div className="text-[10px] text-emerald-200/80">
                  Akumulasi Hemat Biaya
                </div>
                <div className="font-mono-num text-xl font-extrabold text-emerald-300 mt-0.5">
                  Rp 51,7 jt
                </div>
              </div>
              <div className="rounded-xl bg-white/[0.08] border border-white/10 p-3">
                <div className="text-[10px] text-emerald-200/80">
                  Emisi Karbon Ditekan
                </div>
                <div className="font-mono-num text-xl font-extrabold text-sky-300 mt-0.5">
                  1,73 tCO2e
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Green FinOps ROI & Carbon Savings Simulator */}
      <section id="roi-calculator" className="max-w-[1320px] mx-auto px-6 py-8">
        <div className="bento-card p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                <Sliders className="w-3.5 h-3.5" />
                Interactive Green FinOps Simulator
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                Simulasikan Penghematan Biaya &amp; Emisi Organisasi Anda
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Geser parameter belanja cloud dan jumlah server on-premise untuk
                melihat estimasi penghematan bulanan, e-waste dicegah, dan paket
                EcoNode optimal.
              </p>
            </div>

            {/* Slider 1: Cloud Spend */}
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">
                  Biaya Cloud Bulanan Saat Ini
                </span>
                <span className="font-mono-num font-extrabold text-emerald-700 text-sm">
                  Rp {cloudSpendJt} jt / bln
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={100}
                step={1}
                value={cloudSpendJt}
                onChange={(e) => setCloudSpendJt(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono-num text-slate-400">
                <span>Rp 5 jt</span>
                <span>Rp 50 jt</span>
                <span>Rp 100 jt</span>
              </div>
            </div>

            {/* Slider 2: On-Premise Servers */}
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">
                  Jumlah Server On-Premise / Lab
                </span>
                <span className="font-mono-num font-extrabold text-sky-700 text-sm">
                  {onPremServers} Unit
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={20}
                step={1}
                value={onPremServers}
                onChange={(e) => setOnPremServers(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono-num text-slate-400">
                <span>1 Unit</span>
                <span>10 Unit</span>
                <span>20 Unit</span>
              </div>
            </div>
          </div>

          {/* Right Live Output Panel */}
          <div className="lg:col-span-6 bento-hero p-6 text-white space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                  Proyeksi Dampak EcoNode
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Rekomendasi Paket:{' '}
                  <strong className="text-white">{recommendedPlan.name}</strong> (
                  {recommendedPlan.price})
                </div>
              </div>
              <span className="font-mono-num text-xs font-extrabold text-slate-950 bg-emerald-400 px-3 py-1 rounded-full">
                ROI {roiMultiplier}x
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/[0.08] border border-white/10 p-3.5">
                <div className="text-[11px] text-emerald-200/80">
                  Estimasi Hemat Biaya (-31%)
                </div>
                <div className="font-mono-num text-xl font-extrabold text-white mt-1">
                  {formatIdr(monthlyCloudSavings)}
                </div>
                <div className="text-[10px] text-emerald-300 font-mono-num mt-0.5">
                  per bulan
                </div>
              </div>

              <div className="rounded-xl bg-white/[0.08] border border-white/10 p-3.5">
                <div className="text-[11px] text-emerald-200/80">
                  Reduksi Emisi Karbon
                </div>
                <div className="font-mono-num text-xl font-extrabold text-sky-300 mt-1">
                  {monthlyCarbonReduced} kgCO2e
                </div>
                <div className="text-[10px] text-slate-300 font-mono-num mt-0.5">
                  ~{Math.max(1, Math.round(monthlyCarbonReduced / 22))} pohon/bln
                </div>
              </div>

              <div className="rounded-xl bg-white/[0.08] border border-white/10 p-3.5">
                <div className="text-[11px] text-emerald-200/80">
                  Umur Server &amp; E-Waste
                </div>
                <div className="font-mono-num text-xl font-extrabold text-emerald-300 mt-1">
                  +24 Bln
                </div>
                <div className="text-[10px] text-slate-300 font-mono-num mt-0.5">
                  {eWastePreventedKg} kg e-waste dicegah
                </div>
              </div>

              <div className="rounded-xl bg-white/[0.08] border border-white/10 p-3.5">
                <div className="text-[11px] text-emerald-200/80">
                  Capex Hardware Dihemat
                </div>
                <div className="font-mono-num text-xl font-extrabold text-white mt-1">
                  Rp {capexSavedJt} jt
                </div>
                <div className="text-[10px] text-slate-300 font-mono-num mt-0.5">
                  Tunda beli {onPremServers} server baru
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenDashboard('overview')}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-400 text-slate-950 hover:bg-emerald-300 transition-colors"
            >
              Terapkan Skenario Ini di Live Demo Dashboard
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* System Architecture & Impact Strip */}
      <section id="arsitektur" className="max-w-[1320px] mx-auto px-6 py-8">
        <div className="bento-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                Arsitektur Teknis Produksi
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">
                Alur Telemetri Multi-Cloud hingga Pelaporan Keberlanjutan
              </h2>
            </div>
            <span className="font-mono-num text-[11px] font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              Next.js • FastAPI • Go Agent • TimescaleDB
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {ARCH_STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.step}
                  className="relative rounded-xl bg-slate-50 border border-slate-200 p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="font-mono-num text-xs font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                        {stage.step}
                      </span>
                      <Icon className="w-4 h-4 text-slate-700" />
                    </div>
                    <h3 className="text-xs font-extrabold text-slate-900">
                      {stage.title}
                    </h3>
                    <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>
                  {idx < ARCH_STAGES.length - 1 && (
                    <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-slate-200 items-center justify-center shadow-2xs">
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="harga" className="max-w-[1320px] mx-auto px-6 py-8">
        <div className="mb-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
            Model Monetisasi B2B SaaS
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
            Harga Terjangkau untuk Startup, Software House, &amp; Perguruan Tinggi
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRICING_PLANS.map((plan) => {
            const isHero = Boolean(plan.highlight);
            return (
              <div
                key={plan.id}
                className={`p-5 flex flex-col justify-between ${
                  isHero ? 'bento-hero text-white' : 'bento-card text-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-extrabold">{plan.name}</h3>
                    {isHero && (
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950">
                        Kampus
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-[11px] mt-0.5 ${
                      isHero ? 'text-emerald-200/80' : 'text-slate-500'
                    }`}
                  >
                    {plan.target}
                  </p>
                  <div className="mt-4 pb-3 border-b border-current/10">
                    <span className="font-mono-num text-2xl font-extrabold">
                      {plan.priceLabel}
                    </span>
                    <span
                      className={`text-xs ml-1 ${
                        isHero ? 'text-emerald-200/75' : 'text-slate-500'
                      }`}
                    >
                      {plan.period}
                    </span>
                  </div>
                  <ul className="mt-3.5 space-y-2">
                    {plan.features.map((feat) => (
                      <li
                        key={feat}
                        className={`flex items-start gap-2 text-xs ${
                          isHero ? 'text-emerald-50/90' : 'text-slate-700'
                        }`}
                      >
                        <CheckCircle2
                          className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            isHero ? 'text-emerald-400' : 'text-emerald-600'
                          }`}
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => onOpenDashboard('overview')}
                  className={`mt-5 w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                    isHero
                      ? 'bg-emerald-400 text-slate-950 hover:bg-emerald-300'
                      : 'bg-slate-900 text-white hover:bg-emerald-600'
                  }`}
                >
                  Coba di Demo
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Team & Footer */}
      <footer
        id="tim"
        className="mt-6 bg-[#06120E] text-slate-200 border-t border-emerald-950"
      >
        <div className="max-w-[1320px] mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-400 flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-slate-950 stroke-[2.2]" />
                </div>
                <span className="text-lg font-extrabold text-white">EcoNode</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-md">
                Ekosistem SaaS Green FinOps berbasis kecerdasan buatan untuk
                efisiensi biaya komputasi, perpanjangan umur server, serta
                akselerasi ekonomi sirkular dan ekonomi digital berkelanjutan.
              </p>
              <div className="inline-flex items-center gap-2 text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-400/25 px-3 py-1.5 rounded-xl">
                <GraduationCap className="w-4 h-4 shrink-0" />
                <span>
                  Pembimbing: <strong>Yayak Kartika Sari, M.Kom.</strong> •
                  Universitas Bhinneka PGRI Tulungagung
                </span>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300 mb-3">
                <Users className="w-4 h-4" />
                Tim Pengembang Informatika UBP
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {TEAM_MEMBERS.map((m) => (
                  <div
                    key={m.nim}
                    className="rounded-xl bg-white/[0.05] border border-white/10 p-3.5"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-xs font-bold text-emerald-300 mb-2">
                      {m.initials}
                    </div>
                    <div className="text-xs font-bold text-white">{m.name}</div>
                    <div className="font-mono-num text-[10px] text-emerald-300 mt-0.5">
                      {m.nim}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      {m.role}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
            <span>
              UNIBPRENEUR COMPETITION (UPC) 2026 • Universitas Bhinneka PGRI
              Tulungagung
            </span>
            <button
              onClick={() => onOpenDashboard('overview')}
              className="text-emerald-300 hover:text-emerald-200 font-semibold inline-flex items-center gap-1"
            >
              Masuk ke Dashboard Prototype <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
