export type TabId = 'overview' | 'profiler' | 'circular' | 'esg';

export type ResourceStatus = 'Idle' | 'Over-provisioned' | 'Optimal';
export type CloudProvider =
  | 'AWS'
  | 'GCP'
  | 'Alibaba Cloud'
  | 'Biznet Gio'
  | 'Proxmox Kampus';

export interface MonthlyTrendPoint {
  month: string;
  costBefore: number; // Rp Juta
  costAfter: number; // Rp Juta
  carbonBefore: number; // kgCO2e
  carbonAfter: number; // kgCO2e
}

export interface AIRecommendation {
  id: string;
  title: string;
  resource: string;
  provider: CloudProvider;
  category: 'Right-Sizing' | 'Carbon-Aware' | 'Circularity';
  impactCost: number; // Rp/bln
  impactCarbon: number; // kgCO2e/bln
  lifespanBonus?: string;
  confidence: number;
  summary: string;
  actionCommand: string;
}

export interface CloudResource {
  id: string;
  name: string;
  provider: CloudProvider;
  region: string;
  spec: string;
  cpuUtil: number;
  ramUtil: number;
  status: ResourceStatus;
  monthlyCost: number;
  monthlyCarbon: number; // kgCO2e
  recommendedSpec: string;
  potentialCostSave: number;
  potentialCarbonSave: number;
}

export interface CodeScanFinding {
  id: string;
  repo: string;
  file: string;
  issue: string;
  severity: 'High' | 'Medium' | 'Low';
  energyWasteKwh: number;
  carbonWasteKg: number;
  suggestion: string;
}

export interface CircularServer {
  id: string;
  hostname: string;
  hardwareModel: string;
  yearPurchased: number;
  previousRole: string;
  circularRole: string;
  virtualizationStack: string;
  powerBeforeW: number;
  powerAfterW: number;
  lifespanExtensionMonths: number;
  eWastePreventedKg: number;
  capexSavedIdr: number;
  utilizationPct: number;
  status: 'Active Repurposed' | 'Migrating Workload';
}

export interface CircularQuarterPoint {
  quarter: string;
  newHardwareCapex: number; // Rp Juta
  econodeRevitalization: number; // Rp Juta
  eWastePreventedKg: number;
}

export interface ESGIndicator {
  code: string;
  framework: 'UI GreenMetric' | 'GRI 302 & 305';
  category: string;
  indicator: string;
  score: number;
  maxScore: number;
  evidence: string;
  status: 'Verified' | 'Audit Ready';
}

export interface PricingPlan {
  id: string;
  name: string;
  priceLabel: string;
  period: string;
  target: string;
  highlight?: boolean;
  features: string[];
}

export const ORGANIZATIONS = [
  {
    id: 'ubp',
    name: 'UPT TIK Universitas Bhinneka PGRI',
    plan: 'Campus / Enterprise',
    planPrice: 'Rp 2.500.000/bln',
    nodesCount: 9,
    reposCount: 4,
    lastSync: '2 menit lalu',
  },
  {
    id: 'nusantara',
    name: 'PT Nusantara Cloud Studio (Mitra)',
    plan: 'Pro SaaS',
    planPrice: 'Rp 499.000/bln',
    nodesCount: 6,
    reposCount: 7,
    lastSync: '1 menit lalu',
  },
];

export const MONTHLY_TREND_DATA: MonthlyTrendPoint[] = [
  { month: 'Jun 2026', costBefore: 41.2, costAfter: 39.8, carbonBefore: 1380, carbonAfter: 1335 },
  { month: 'Jul 2026', costBefore: 40.9, costAfter: 35.4, carbonBefore: 1370, carbonAfter: 1185 },
  { month: 'Agu 2026', costBefore: 41.5, costAfter: 32.1, carbonBefore: 1392, carbonAfter: 1076 },
  { month: 'Sep 2026', costBefore: 40.4, costAfter: 29.8, carbonBefore: 1355, carbonAfter: 998 },
  { month: 'Okt 2026', costBefore: 40.8, costAfter: 28.4, carbonBefore: 1364, carbonAfter: 952 },
  { month: 'Nov 2026', costBefore: 40.16, costAfter: 27.71, carbonBefore: 1348, carbonAfter: 930 },
];

export const TOP_AI_RECOMMENDATIONS: AIRecommendation[] = [
  {
    id: 'rec-1',
    title: 'Downsize VM api-prod-02 (CPU avg 11%)',
    resource: 'api-prod-02',
    provider: 'AWS',
    category: 'Right-Sizing',
    impactCost: 1850000,
    impactCarbon: 64,
    confidence: 96,
    summary:
      'Utilisasi CPU rata-rata 14 hari hanya 11% dan puncak RAM 24%. Turunkan dari c5.2xlarge ke c5.large tanpa degradasi latensi P95.',
    actionCommand: 'aws ec2 modify-instance-attribute --instance-id i-09a4b --instance-type c5.large',
  },
  {
    id: 'rec-2',
    title: 'Jadwalkan batch job ke window low-carbon',
    resource: 'analytics-cron-vm',
    provider: 'GCP',
    category: 'Carbon-Aware',
    impactCost: 920000,
    impactCarbon: 42,
    confidence: 92,
    summary:
      'Pindahkan eksekusi batch ETL malam dari 19:00 WIB ke 02:00 WIB (grid intensity -28%) dengan preemptible spot scheduling.',
    actionCommand: 'econode schedule --target analytics-cron-vm --carbon-window optimal',
  },
  {
    id: 'rec-3',
    title: 'Konsolidasi 3 container legacy ke Proxmox pve-lab-02',
    resource: 'pve-lab-02',
    provider: 'Proxmox Kampus',
    category: 'Circularity',
    impactCost: 2100000,
    impactCarbon: 68,
    lifespanBonus: '+24 bln umur pakai',
    confidence: 94,
    summary:
      'Hentikan 2 VPS cloud idle dan migrasikan workload ke node on-premise Dell R720 berbasis LXC untuk menekan e-waste & Capex.',
    actionCommand: 'econode migrate --source cloud-idle --dest pve-lab-02 --stack lxc',
  },
];

export const CLOUD_RESOURCES: CloudResource[] = [
  {
    id: 'res-1',
    name: 'api-prod-02',
    provider: 'AWS',
    region: 'ap-southeast-3 (Jakarta)',
    spec: 'c5.2xlarge (8 vCPU / 16 GB)',
    cpuUtil: 11,
    ramUtil: 24,
    status: 'Over-provisioned',
    monthlyCost: 4850000,
    monthlyCarbon: 148,
    recommendedSpec: 'c5.large (2 vCPU / 4 GB)',
    potentialCostSave: 1850000,
    potentialCarbonSave: 64,
  },
  {
    id: 'res-2',
    name: 'ml-batch-worker',
    provider: 'GCP',
    region: 'asia-southeast2 (Jakarta)',
    spec: 'n2-standard-8 (8 vCPU / 32 GB)',
    cpuUtil: 19,
    ramUtil: 31,
    status: 'Over-provisioned',
    monthlyCost: 6200000,
    monthlyCarbon: 196,
    recommendedSpec: 'n2-standard-4 Spot',
    potentialCostSave: 2150000,
    potentialCarbonSave: 78,
  },
  {
    id: 'res-3',
    name: 'staging-erp-node',
    provider: 'Alibaba Cloud',
    region: 'ap-southeast-5 (Jakarta)',
    spec: 'ecs.g6.xlarge (4 vCPU / 16 GB)',
    cpuUtil: 3,
    ramUtil: 9,
    status: 'Idle',
    monthlyCost: 2650000,
    monthlyCarbon: 92,
    recommendedSpec: 'Auto-Hibernate / Terminate',
    potentialCostSave: 2400000,
    potentialCarbonSave: 84,
  },
  {
    id: 'res-4',
    name: 'legacy-dev-sandbox',
    provider: 'Biznet Gio',
    region: 'ID-West (Technovillage)',
    spec: 'NEO Metal S (4 vCPU / 8 GB)',
    cpuUtil: 2,
    ramUtil: 6,
    status: 'Idle',
    monthlyCost: 1450000,
    monthlyCarbon: 48,
    recommendedSpec: 'Pindah ke Proxmox Kampus',
    potentialCostSave: 1350000,
    potentialCarbonSave: 44,
  },
  {
    id: 'res-5',
    name: 'pve-lab-02',
    provider: 'Proxmox Kampus',
    region: 'DC Gedung B (Tulungagung)',
    spec: 'Dell R720 (16 Core / 64 GB)',
    cpuUtil: 16,
    ramUtil: 28,
    status: 'Over-provisioned',
    monthlyCost: 3800000,
    monthlyCarbon: 124,
    recommendedSpec: 'Consolidate 3 LXC Nodes',
    potentialCostSave: 2100000,
    potentialCarbonSave: 68,
  },
  {
    id: 'res-6',
    name: 'siakad-cache-redis',
    provider: 'AWS',
    region: 'ap-southeast-3 (Jakarta)',
    spec: 'r5.xlarge (4 vCPU / 32 GB)',
    cpuUtil: 14,
    ramUtil: 22,
    status: 'Over-provisioned',
    monthlyCost: 3600000,
    monthlyCarbon: 112,
    recommendedSpec: 'r6g.large (ARM Graviton)',
    potentialCostSave: 1680000,
    potentialCarbonSave: 50,
  },
  {
    id: 'res-7',
    name: 'analytics-cron-vm',
    provider: 'GCP',
    region: 'asia-southeast2 (Jakarta)',
    spec: 'e2-standard-4 (4 vCPU / 16 GB)',
    cpuUtil: 9,
    ramUtil: 18,
    status: 'Idle',
    monthlyCost: 1920000,
    monthlyCarbon: 62,
    recommendedSpec: 'Cloud Run Low-Carbon Window',
    potentialCostSave: 920000,
    potentialCarbonSave: 30,
  },
  {
    id: 'res-8',
    name: 'gateway-prod-01',
    provider: 'Biznet Gio',
    region: 'ID-West (Technovillage)',
    spec: 'NEO Cloud M (4 vCPU / 8 GB)',
    cpuUtil: 68,
    ramUtil: 74,
    status: 'Optimal',
    monthlyCost: 1850000,
    monthlyCarbon: 52,
    recommendedSpec: 'Pertahankan Konfigurasi',
    potentialCostSave: 0,
    potentialCarbonSave: 0,
  },
  {
    id: 'res-9',
    name: 'pve-siakad-core',
    provider: 'Proxmox Kampus',
    region: 'DC Gedung A (Tulungagung)',
    spec: 'HP DL380 Gen9 (16 Core / 64 GB)',
    cpuUtil: 72,
    ramUtil: 78,
    status: 'Optimal',
    monthlyCost: 2150000,
    monthlyCarbon: 68,
    recommendedSpec: 'Pertahankan Konfigurasi',
    potentialCostSave: 0,
    potentialCarbonSave: 0,
  },
];

export const CODE_SCAN_FINDINGS: CodeScanFinding[] = [
  {
    id: 'code-1',
    repo: 'ubp/siakad-gateway',
    file: 'src/services/billingSync.ts:142',
    issue: 'N+1 SQL Query & Unindexed Join pada sinkronisasi KRS',
    severity: 'High',
    energyWasteKwh: 28.4,
    carbonWasteKg: 19.2,
    suggestion: 'Gunakan batch WHERE IN + composite index (hemat 68% waktu CPU DB).',
  },
  {
    id: 'code-2',
    repo: 'econode/telemetry-agent',
    file: 'workers/telemetryPoller.go:67',
    issue: 'Unbounded Polling Loop (interval 500ms tanpa backoff)',
    severity: 'Medium',
    energyWasteKwh: 16.1,
    carbonWasteKg: 11.0,
    suggestion: 'Terapkan adaptive exponential backoff (5s–30s saat beban stabil).',
  },
  {
    id: 'code-3',
    repo: 'ubp/analytics-worker',
    file: 'src/api/exportReport.ts:89',
    issue: 'Serialisasi JSON 45MB sinkron tanpa streaming & Brotli',
    severity: 'Low',
    energyWasteKwh: 9.5,
    carbonWasteKg: 6.4,
    suggestion: 'Aktifkan Node Transform Stream + kompresi payload untuk kurangi transfer.',
  },
];

export const CIRCULAR_SERVERS: CircularServer[] = [
  {
    id: 'srv-1',
    hostname: 'srv-lab-ai-01',
    hardwareModel: 'Dell PowerEdge R720',
    yearPurchased: 2019,
    previousRole: 'Bare-metal Lab Komputasi',
    circularRole: 'Node Proxmox VE + AI Inference LXC',
    virtualizationStack: 'Proxmox VE 8.2 / LXC',
    powerBeforeW: 340,
    powerAfterW: 215,
    lifespanExtensionMonths: 24,
    eWastePreventedKg: 28.4,
    capexSavedIdr: 34000000,
    utilizationPct: 76,
    status: 'Active Repurposed',
  },
  {
    id: 'srv-2',
    hostname: 'srv-siakad-02',
    hardwareModel: 'HP ProLiant DL380 Gen9',
    yearPurchased: 2020,
    previousRole: 'Server Monolith Akademik',
    circularRole: 'Cluster Container MicroK8s SIAKAD',
    virtualizationStack: 'Ubuntu LTS / MicroK8s',
    powerBeforeW: 310,
    powerAfterW: 195,
    lifespanExtensionMonths: 24,
    eWastePreventedKg: 25.2,
    capexSavedIdr: 32000000,
    utilizationPct: 81,
    status: 'Active Repurposed',
  },
  {
    id: 'srv-3',
    hostname: 'srv-repo-03',
    hardwareModel: 'Lenovo ThinkSystem SR530',
    yearPurchased: 2020,
    previousRole: 'File Server Fakultas Lama',
    circularRole: 'Repositori Riset & GitHub Runner',
    virtualizationStack: 'Proxmox VE / Docker Rootless',
    powerBeforeW: 260,
    powerAfterW: 168,
    lifespanExtensionMonths: 24,
    eWastePreventedKg: 21.6,
    capexSavedIdr: 26000000,
    utilizationPct: 69,
    status: 'Active Repurposed',
  },
  {
    id: 'srv-4',
    hostname: 'srv-umkm-04',
    hardwareModel: 'Dell PowerEdge T430',
    yearPurchased: 2019,
    previousRole: 'Server Inkubator Bisnis',
    circularRole: 'Host ERP & POS Mitra UMKM',
    virtualizationStack: 'KVM / Alpine Containers',
    powerBeforeW: 285,
    powerAfterW: 172,
    lifespanExtensionMonths: 26,
    eWastePreventedKg: 24.0,
    capexSavedIdr: 28000000,
    utilizationPct: 74,
    status: 'Active Repurposed',
  },
  {
    id: 'srv-5',
    hostname: 'srv-stage-05',
    hardwareModel: 'IBM System x3650 M4',
    yearPurchased: 2018,
    previousRole: 'Server Arsip Non-Aktif',
    circularRole: 'Staging & CI/CD Sandbox Node',
    virtualizationStack: 'Proxmox VE / LXC',
    powerBeforeW: 330,
    powerAfterW: 204,
    lifespanExtensionMonths: 22,
    eWastePreventedKg: 23.8,
    capexSavedIdr: 25000000,
    utilizationPct: 64,
    status: 'Active Repurposed',
  },
  {
    id: 'srv-6',
    hostname: 'srv-vault-06',
    hardwareModel: 'Fujitsu PRIMERGY RX2530',
    yearPurchased: 2020,
    previousRole: 'Server Mail Legacy',
    circularRole: 'Immutable Backup & Telemetry Vault',
    virtualizationStack: 'Proxmox Backup Server',
    powerBeforeW: 245,
    powerAfterW: 152,
    lifespanExtensionMonths: 24,
    eWastePreventedKg: 19.8,
    capexSavedIdr: 23000000,
    utilizationPct: 71,
    status: 'Migrating Workload',
  },
];

export const CIRCULAR_QUARTER_DATA: CircularQuarterPoint[] = [
  { quarter: 'Q1 2026', newHardwareCapex: 58.0, econodeRevitalization: 4.5, eWastePreventedKg: 28.4 },
  { quarter: 'Q2 2026', newHardwareCapex: 64.0, econodeRevitalization: 6.2, eWastePreventedKg: 53.6 },
  { quarter: 'Q3 2026', newHardwareCapex: 92.0, econodeRevitalization: 9.8, eWastePreventedKg: 99.2 },
  { quarter: 'Q4 2026', newHardwareCapex: 168.0, econodeRevitalization: 14.5, eWastePreventedKg: 142.8 },
];

export const ESG_INDICATORS: ESGIndicator[] = [
  {
    code: 'EC.1',
    framework: 'UI GreenMetric',
    category: 'Energy & Climate Change',
    indicator: 'Efisiensi Daya Pusat Data & Rasio Virtualisasi Server',
    score: 23,
    maxScore: 25,
    evidence: 'PUE turun 1.72 -> 1.38 via Proxmox LXC + AI sleep policy',
    status: 'Verified',
  },
  {
    code: 'EC.3',
    framework: 'UI GreenMetric',
    category: 'Energy & Climate Change',
    indicator: 'Penjadwalan Komputasi Berbasis Intensitas Karbon Rendah',
    score: 21,
    maxScore: 25,
    evidence: 'Batch ETL & backup dijadwalkan di window off-peak 01:00–05:00 WIB',
    status: 'Verified',
  },
  {
    code: 'EC.6',
    framework: 'UI GreenMetric',
    category: 'Carbon Footprint Program',
    indicator: 'Reduksi Emisi Karbon Infrastruktur Digital (kgCO2e/bln)',
    score: 22,
    maxScore: 25,
    evidence: 'Reduksi terukur 418 kgCO2e/bln (-31% vs baseline Juni 2026)',
    status: 'Verified',
  },
  {
    code: 'WS.4',
    framework: 'UI GreenMetric',
    category: 'Waste & Circular Economy',
    indicator: 'Program Penanganan E-Waste & Perpanjangan Umur Perangkat TIK',
    score: 22,
    maxScore: 25,
    evidence: '6 unit server direvitalisasi (+24 bln), 142,8 kg e-waste dicegah',
    status: 'Audit Ready',
  },
  {
    code: 'GRI 302-4',
    framework: 'GRI 302 & 305',
    category: 'Energy Reduction',
    indicator: 'Pengurangan Konsumsi Energi Langsung & Cloud (kWh)',
    score: 24,
    maxScore: 25,
    evidence: 'Hemat 614 kWh/bln dari right-sizing VM & optimasi query CI/CD',
    status: 'Verified',
  },
  {
    code: 'GRI 305-5',
    framework: 'GRI 302 & 305',
    category: 'GHG Emissions Reduction',
    indicator: 'Penurunan Emisi GRK Scope 2 & Scope 3 Cloud Computing',
    score: 22,
    maxScore: 25,
    evidence: 'Penurunan 5,01 ton CO2e annualized teraudit oleh EcoNode Engine',
    status: 'Verified',
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'freemium',
    name: 'Freemium',
    priceLabel: 'Rp 0',
    period: '/bulan',
    target: 'Developer & Evaluasi Awal',
    features: [
      'Pemindaian 1 server / 1 repo GitHub',
      'CLI & GitHub Action carbon check',
      'Ringkasan pemborosan dasar',
    ],
  },
  {
    id: 'pro',
    name: 'Pro SaaS',
    priceLabel: 'Rp 499.000',
    period: '/bulan/org',
    target: 'Startup & Software House',
    features: [
      'Multi-cloud (AWS, GCP, Alibaba, Biznet Gio)',
      'AI Code Carbon Profiler CI/CD',
      'Notifikasi real-time Slack & WhatsApp',
    ],
  },
  {
    id: 'campus',
    name: 'Campus / Enterprise',
    priceLabel: 'Rp 2.500.000',
    period: '/bulan',
    target: 'UPT TIK Kampus & Korporasi',
    highlight: true,
    features: [
      'Dukungan Proxmox VE & server on-premise',
      'Circular Server & E-Waste Tracker',
      'Laporan ESG & UI GreenMetric 1-Klik',
    ],
  },
  {
    id: 'audit',
    name: 'Add-on Audit & Integrasi',
    priceLabel: 'Rp 3.000.000',
    period: '/proyek',
    target: 'Pendampingan Akreditasi & Migrasi',
    features: [
      'Onboarding & migrasi LXC server lama',
      'Verifikasi dokumen audit UI GreenMetric',
      'Workshop Green FinOps tim IT',
    ],
  },
];

export function formatIdr(value: number): string {
  return `Rp ${value.toLocaleString('id-ID')}`;
}
