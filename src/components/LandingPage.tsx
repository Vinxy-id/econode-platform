import React from 'react';
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
  Layers,
} from 'lucide-react';
import { PRICING_PLANS, TabId } from '../data/mockData';

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

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenDashboard }) => {
  return (
    <div className="min-h-screen bg-[#F3F6F4] text-[#0F172A]">
      {/* Sticky Minimal Topbar */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-[1320px] mx-auto px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-sm">
              <Leaf className="w-5 h-5 text-white stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold tracking-tight text-slate-900">
                  EcoNode
                </span>
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  v1.2
                </span>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-600">
            <a href="#fitur" className="hover:text-emerald-700 transition-colors">
              Fitur
            </a>
            <a href="#arsitektur" className="hover:text-emerald-700 transition-colors">
              Arsitektur
            </a>
            <a href="#harga" className="hover:text-emerald-700 transition-colors">
              Harga
            </a>
            <a href="#tim" className="hover:text-emerald-700 transition-colors">
              Tim
            </a>
          </nav>

          <button
            onClick={() => onOpenDashboard('overview')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#0B1914] text-white hover:bg-emerald-700 transition-colors shadow-sm"
          >
            Live Demo Dashboard
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
          </button>
        </div>
      </header>

      {/* Hero Section (Sized cleanly for 1440x900 above-the-fold composition) */}
      <section className="max-w-[1320px] mx-auto px-6 pt-10 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Copy */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              UnibPreneur Competition 2026 • Green FinOps &amp; Circular Computing
            </div>

            <h1 className="text-4xl xl:text-[42px] font-extrabold text-slate-900 tracking-tight leading-[1.13]">
              Tekan Biaya Cloud{' '}
              <span className="text-emerald-600">20–40%</span>, Perpanjang Umur
              Server, &amp; Raih Skor{' '}
              <span className="text-emerald-600 whitespace-nowrap">GreenMetric A</span>.
            </h1>

            <p className="text-sm xl:text-base text-slate-600 leading-relaxed max-w-xl">
              Platform SaaS B2B berbasis Artificial Intelligence yang
              mengintegrasikan audit biaya multi-cloud, deteksi pemborosan kode
              CI/CD, revitalisasi server fisik sirkular, serta pelaporan ESG
              &amp; UI GreenMetric dalam satu klik.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => onOpenDashboard('overview')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-[0_10px_24px_-10px_rgba(5,150,105,0.65)]"
              >
                Buka Live Demo Dashboard
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#arsitektur"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-white border border-slate-200 text-slate-800 hover:border-emerald-500 hover:text-emerald-700 transition-colors"
              >
                <Layers className="w-4 h-4 text-emerald-600" />
                Lihat Arsitektur
              </a>
            </div>

            <div className="pt-3 border-t border-slate-200/80">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Ekosistem Telemetri Terdukung
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-700">
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
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Hero: Interactive Bento Hero Preview Card */}
          <div className="lg:col-span-6">
            <div className="bento-hero p-5 text-white space-y-4">
              {/* Mini Window Header */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-xs font-bold text-white">
                    EcoNode Live Telemetry Preview
                  </span>
                </div>
                <span className="font-mono-num text-[10px] font-semibold text-emerald-300 bg-emerald-500/15 border border-emerald-400/30 px-2.5 py-0.5 rounded-full">
                  UPT TIK Universitas Bhinneka PGRI
                </span>
              </div>

              {/* 4 Bento Metric Tiles */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/[0.08] border border-white/10 p-3.5">
                  <div className="flex items-center justify-between text-[11px] text-emerald-200/80 font-semibold">
                    <span>Biaya Cloud</span>
                    <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="mt-1.5 font-mono-num text-xl font-extrabold text-white">
                    -31%{' '}
                    <span className="text-xs font-semibold text-emerald-300">
                      Rp 12,45 jt/bln
                    </span>
                  </div>
                  <div className="text-[10px] text-emerald-100/70 mt-1">
                    Hemat kumulatif 6 bln: Rp 51,7 jt
                  </div>
                </div>

                <div className="rounded-xl bg-white/[0.08] border border-white/10 p-3.5">
                  <div className="flex items-center justify-between text-[11px] text-emerald-200/80 font-semibold">
                    <span>Reduksi Karbon</span>
                    <Leaf className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                  <div className="mt-1.5 font-mono-num text-xl font-extrabold text-white">
                    418{' '}
                    <span className="text-xs font-semibold text-sky-300">
                      kgCO2e/bln
                    </span>
                  </div>
                  <div className="text-[10px] text-emerald-100/70 mt-1">
                    Setara 19 pohon dewasa / bulan
                  </div>
                </div>

                <div className="rounded-xl bg-white/[0.08] border border-white/10 p-3.5">
                  <div className="flex items-center justify-between text-[11px] text-emerald-200/80 font-semibold">
                    <span>Umur Server Sirkular</span>
                    <Recycle className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="mt-1.5 font-mono-num text-xl font-extrabold text-white">
                    +24 Bln{' '}
                    <span className="text-xs font-semibold text-emerald-300">
                      6 Unit
                    </span>
                  </div>
                  <div className="text-[10px] text-emerald-100/70 mt-1">
                    142,8 kg e-waste &amp; Rp 168 jt Capex
                  </div>
                </div>

                <div className="rounded-xl bg-white/[0.08] border border-white/10 p-3.5">
                  <div className="flex items-center justify-between text-[11px] text-emerald-200/80 font-semibold">
                    <span>UI GreenMetric</span>
                    <Award className="w-3.5 h-3.5 text-amber-300" />
                  </div>
                  <div className="mt-1.5 font-mono-num text-xl font-extrabold text-white">
                    88 / 100{' '}
                    <span className="text-xs font-semibold text-emerald-300">
                      Grade A
                    </span>
                  </div>
                  <div className="text-[10px] text-emerald-100/70 mt-1">
                    Siap ekspor laporan audit PDF/CSV
                  </div>
                </div>
              </div>

              {/* Mini Trend Preview Strip + Quick Jump Tabs */}
              <div className="rounded-xl bg-slate-950/50 border border-white/10 p-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <svg width="88" height="28" viewBox="0 0 88 28">
                    <polyline
                      fill="none"
                      stroke="#94A3B8"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                      points="2,8 22,7 44,9 66,8 86,9"
                    />
                    <polyline
                      fill="none"
                      stroke="#34D399"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      points="2,9 22,15 44,20 66,23 86,25"
                    />
                    <circle cx="86" cy="25" r="2.5" fill="#34D399" />
                  </svg>
                  <div className="text-[11px] text-slate-300">
                    Pilih modul demo langsung:
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {(
                    [
                      { id: 'overview', label: 'Overview' },
                      { id: 'profiler', label: 'Profiler' },
                      { id: 'circular', label: 'Circular' },
                      { id: 'esg', label: 'ESG Report' },
                    ] as const
                  ).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onOpenDashboard(item.id)}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white/10 hover:bg-emerald-400 hover:text-slate-950 text-white transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Pillar Bento Feature Grid */}
      <section id="fitur" className="max-w-[1320px] mx-auto px-6 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
              Tiga Pilar Inovasi EcoNode
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
              Satu Platform untuk FinOps, Ekonomi Sirkular, &amp; ESG
            </h2>
          </div>
          <button
            onClick={() => onOpenDashboard('overview')}
            className="text-xs font-bold text-emerald-700 hover:underline inline-flex items-center gap-1"
          >
            Jelajahi Semua Modul Interaktif
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bento-card p-5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-3.5">
                <Cpu className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                AI Cloud &amp; Code Carbon Profiler
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Memindai utilisasi CPU/RAM lintas AWS, GCP, Alibaba Cloud,
                Biznet Gio, dan Proxmox serta mendeteksi query boros energi di
                GitHub CI/CD secara otomatis.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="font-mono-num text-xs font-bold text-emerald-700">
                Hemat Rp 12,45 jt/bln
              </span>
              <button
                onClick={() => onOpenDashboard('profiler')}
                className="text-xs font-bold text-slate-800 hover:text-emerald-700 inline-flex items-center gap-1"
              >
                Buka Profiler <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="bento-card p-5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center mb-3.5">
                <Recycle className="w-5 h-5 text-sky-600" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                Circular Server &amp; E-Waste Tracker
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Merevitalisasi server fisik lama kampus atau UMKM menjadi klaster
                Proxmox VE/LXC hemat daya untuk memperpanjang umur pakai dan
                menekan limbah elektronik.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="font-mono-num text-xs font-bold text-sky-700">
                +24 bln • 142,8 kg e-waste
              </span>
              <button
                onClick={() => onOpenDashboard('circular')}
                className="text-xs font-bold text-slate-800 hover:text-emerald-700 inline-flex items-center gap-1"
              >
                Buka Tracker <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="bento-card p-5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-3.5">
                <FileCheck2 className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                One-Click ESG &amp; UI GreenMetric Report
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Mengonversi telemetri kWh dan reduksi emisi menjadi dokumen
                audit berstandar UI GreenMetric dan GRI 302/305 dalam format
                PDF atau CSV instan.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="font-mono-num text-xs font-bold text-emerald-700">
                Skor 88/100 (Grade A)
              </span>
              <button
                onClick={() => onOpenDashboard('esg')}
                className="text-xs font-bold text-slate-800 hover:text-emerald-700 inline-flex items-center gap-1"
              >
                Lihat Laporan <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* System Architecture & Impact Strip */}
      <section
        id="arsitektur"
        className="max-w-[1320px] mx-auto px-6 py-10"
      >
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
            <span className="font-mono-num text-[11px] font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
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
      <section id="harga" className="max-w-[1320px] mx-auto px-6 py-10">
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
        className="mt-6 bg-[#0B1914] text-slate-200 border-t border-emerald-950"
      >
        <div className="max-w-[1320px] mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center">
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
