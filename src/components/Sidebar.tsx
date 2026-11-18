import React from 'react';
import {
  LayoutDashboard,
  Cpu,
  Recycle,
  FileCheck2,
  Leaf,
  Server,
  GitBranch,
  CreditCard,
  CheckCircle2,
  Sparkles,
  Home,
} from 'lucide-react';
import { TabId } from '../data/mockData';

interface SidebarProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  onOpenPricing: () => void;
  onOpenLanding: () => void;
  activePlanLabel: string;
}

const NAV_ITEMS: {
  id: TabId;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: 'overview',
    label: 'Executive Overview',
    sublabel: 'KPI FinOps & Tren Karbon',
    icon: LayoutDashboard,
  },
  {
    id: 'profiler',
    label: 'Cloud & Code Profiler',
    sublabel: 'Multi-Cloud & CI/CD Scan',
    icon: Cpu,
  },
  {
    id: 'circular',
    label: 'Circular Server Tracker',
    sublabel: 'Umur Server & E-Waste',
    icon: Recycle,
  },
  {
    id: 'esg',
    label: 'ESG & GreenMetric',
    sublabel: 'Laporan Audit 1-Klik',
    icon: FileCheck2,
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  onOpenPricing,
  onOpenLanding,
  activePlanLabel,
}) => {
  return (
    <aside
      className="no-print w-64 shrink-0 text-slate-200 flex flex-col justify-between min-h-screen border-r border-emerald-950/60"
      style={{
        background:
          'linear-gradient(180deg, #0B1914 0%, #0D1F19 52%, #0F172A 100%)',
      }}
    >
      <div>
        {/* Brand Header */}
        <div className="px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-[0_0_20px_-4px_rgba(16,185,129,0.65)]">
              <Leaf className="w-5 h-5 text-slate-950 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold tracking-tight text-white">
                  EcoNode
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  v1.2
                </span>
              </div>
              <p className="text-[11px] font-medium text-emerald-200/70">
                Green FinOps &amp; Circular Cloud
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-3 py-4">
          <button
            onClick={onOpenLanding}
            className="w-full mb-3 flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-emerald-200 bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-emerald-400" />
            <span>Landing Page</span>
          </button>
          <div className="px-3 mb-2 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-200/45">
              Workspace
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
              <Sparkles className="w-2.5 h-2.5" />
              AI Active
            </span>
          </div>
          <nav className="space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-all border ${
                    isActive
                      ? 'bg-emerald-500/15 text-white border-emerald-400/35 shadow-[0_0_24px_-8px_rgba(16,185,129,0.55)]'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white border-transparent'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 stroke-[2]" />
                  </div>
                  <div className="min-w-0">
                    <div
                      className={`text-xs font-bold leading-tight ${
                        isActive ? 'text-white' : 'text-slate-200'
                      }`}
                    >
                      {item.label}
                    </div>
                    <div
                      className={`text-[10px] mt-0.5 truncate ${
                        isActive ? 'text-emerald-200/80' : 'text-slate-400'
                      }`}
                    >
                      {item.sublabel}
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Connected Connectors */}
        <div className="px-4 py-3 mx-3 rounded-xl bg-white/[0.04] border border-white/10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-200/50 mb-2.5">
            Telemetri Terhubung
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-2 text-[11px]">
                <Server className="w-3.5 h-3.5 text-emerald-400" />
                Multi-Cloud &amp; Proxmox
              </span>
              <span className="font-mono-num text-[10px] font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-400/25 px-1.5 py-0.5 rounded">
                9 Node
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-2 text-[11px]">
                <GitBranch className="w-3.5 h-3.5 text-sky-400" />
                GitHub Actions CI/CD
              </span>
              <span className="font-mono-num text-[10px] font-bold text-sky-300 bg-sky-500/15 border border-sky-400/25 px-1.5 py-0.5 rounded">
                4 Repo
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Plan & Team Pill */}
      <div className="p-3.5 space-y-2.5 border-t border-white/10">
        <div className="rounded-xl bg-white/[0.05] border border-white/10 p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300/80">
              Lisensi Aktif
            </span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-xs font-bold text-white">{activePlanLabel}</div>
          <div className="text-[11px] font-mono-num text-emerald-300 font-semibold mt-0.5">
            Rp 2.500.000 / bln
          </div>
          <button
            onClick={onOpenPricing}
            className="mt-2.5 w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors"
          >
            <CreditCard className="w-3.5 h-3.5" />
            Lihat Paket &amp; Harga
          </button>
        </div>

        <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-[11px] font-bold text-emerald-300 shrink-0">
            AW
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-white truncate">
              Alvin W.
            </div>
            <div className="text-[10px] text-slate-400 truncate">
              Lead FinOps • UBP
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
