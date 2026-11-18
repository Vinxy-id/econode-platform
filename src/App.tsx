import { useState } from 'react';
import {
  Building2,
  RefreshCw,
  Calendar,
  Activity,
} from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { ExecutiveOverview } from './components/ExecutiveOverview';
import { CloudProfiler } from './components/CloudProfiler';
import { CircularTracker } from './components/CircularTracker';
import { EsgReport } from './components/EsgReport';
import { PricingModal } from './components/PricingModal';
import { LandingPage } from './components/LandingPage';
import { ORGANIZATIONS, TabId } from './data/mockData';

function getInitialRoute(): { view: 'landing' | 'dashboard'; tab: TabId } {
  const params = new URLSearchParams(window.location.search);
  const tab = params.get('tab');
  if (
    tab === 'overview' ||
    tab === 'profiler' ||
    tab === 'circular' ||
    tab === 'esg'
  ) {
    return { view: 'dashboard', tab };
  }
  return { view: 'landing', tab: 'overview' };
}

const TAB_TITLES: Record<TabId, { title: string; subtitle: string }> = {
  overview: {
    title: 'Executive Overview',
    subtitle:
      'Ringkasan efisiensi biaya cloud, reduksi emisi karbon, dan ekonomi sirkular infrastruktur',
  },
  profiler: {
    title: 'Cloud & Code Carbon Profiler',
    subtitle:
      'Audit utilisasi multi-cloud (AWS, GCP, Alibaba, Biznet Gio, Proxmox) dan pemindaian CI/CD GitHub',
  },
  circular: {
    title: 'Circular Server & E-Waste Tracker',
    subtitle:
      'Monitoring revitalisasi server fisik kampus/UMKM, perpanjangan umur pakai, dan Capex dihemat',
  },
  esg: {
    title: 'One-Click ESG & UI GreenMetric Report',
    subtitle:
      'Laporan audit keberlanjutan siap ekspor (PDF/CSV) sesuai standar UI GreenMetric & GRI',
  },
};

export function App() {
  const initialRoute = getInitialRoute();
  const [view, setView] = useState<'landing' | 'dashboard'>(initialRoute.view);
  const [activeTab, setActiveTab] = useState<TabId>(initialRoute.tab);
  const [selectedOrgId, setSelectedOrgId] = useState(ORGANIZATIONS[0].id);
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  const selectedOrg =
    ORGANIZATIONS.find((o) => o.id === selectedOrgId) ?? ORGANIZATIONS[0];
  const headerInfo = TAB_TITLES[activeTab];

  const handleSelectTab = (tab: TabId) => {
    setView('dashboard');
    setActiveTab(tab);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    window.history.replaceState({}, '', url.toString());
  };

  const handleOpenLanding = () => {
    setView('landing');
    const url = new URL(window.location.href);
    url.searchParams.delete('tab');
    window.history.replaceState({}, '', url.toString());
  };

  if (view === 'landing') {
    return (
      <LandingPage
        onOpenDashboard={(tab = 'overview') => handleSelectTab(tab)}
      />
    );
  }

  return (
    <div className="min-h-screen flex bg-[#F3F6F4] text-[#0F172A]">
      <Sidebar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenPricing={() => setIsPricingOpen(true)}
        onOpenLanding={handleOpenLanding}
        activePlanLabel={selectedOrg.plan}
      />

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Bar */}
        <header className="no-print bg-white/90 backdrop-blur-xs border-b border-slate-200/80 px-5 py-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight">
                {headerInfo.title}
              </h1>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <Activity className="w-3 h-3" />
                Live Telemetry
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{headerInfo.subtitle}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Organization Selector */}
            <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs shadow-2xs">
              <Building2 className="w-3.5 h-3.5 text-emerald-600" />
              <select
                value={selectedOrgId}
                onChange={(e) => setSelectedOrgId(e.target.value)}
                className="bg-transparent font-semibold text-slate-800 focus:outline-none"
              >
                {ORGANIZATIONS.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-600">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-medium">Jun – Nov 2026</span>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-emerald-800">
              <RefreshCw className="w-3 h-3 text-emerald-600" />
              <span>Sync {selectedOrg.lastSync}</span>
            </div>
          </div>
        </header>

        {/* Main View Area */}
        <main className="flex-1 p-5 max-w-[1440px] w-full mx-auto">
          {activeTab === 'overview' && (
            <ExecutiveOverview onNavigateTab={handleSelectTab} />
          )}
          {activeTab === 'profiler' && <CloudProfiler />}
          {activeTab === 'circular' && <CircularTracker />}
          {activeTab === 'esg' && <EsgReport />}
        </main>
      </div>

      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
      />
    </div>
  );
}

export default App;
