import { FormEvent, useMemo, useState } from "react";
import {
  Accessibility,
  Activity,
  ArrowLeft,
  Barcode,
  BellRing,
  Boxes,
  Check,
  ChevronDown,
  ChevronRight,
  Cloud,
  DatabaseBackup,
  FileImage,
  FileSpreadsheet,
  FileDown,
  FileText,
  FileUp,
  HardDrive,
  Home,
  Languages,
  ListFilter,
  Moon,
  Monitor,
  MoreHorizontal,
  Package,
  Palette,
  Plus,
  Rows3,
  ScanLine,
  Search,
  Settings,
  ShieldCheck,
  Store,
  Sun,
  UserRound,
  Users,
  Vibrate,
  X,
} from "lucide-react";

type Tab = "home" | "products" | "stores" | "team" | "settings";
type SettingsView = "root" | "appearance" | "reports" | "backups" | "transfer" | "language" | "plans";
type Overlay = "scan" | "add-product" | "files" | "product-actions" | "add-store" | null;
type ThemeMode = "system" | "light" | "dark";

type ProductItem = {
  barcode: string;
  minStock: number;
  name: string;
  productCode: string;
  quantity: number;
  sku: string;
};

const showroomProducts: ProductItem[] = [
  { barcode: "8691000000015", minStock: 24, name: "Industrial Nitrile Gloves · M", productCode: "PPE-001", quantity: 18, sku: "PPE-GLV-M" },
  { barcode: "8691000000022", minStock: 20, name: "Thermal Shipping Labels · 100 × 150", productCode: "LBL-001", quantity: 42, sku: "LBL-100150" },
  { barcode: "8691000000039", minStock: 10, name: "USB-C Scanner Cable · 2 m", productCode: "CBL-001", quantity: 6, sku: "CBL-USBC-2M" },
  { barcode: "8691000000046", minStock: 30, name: "Corrugated Carton · Small", productCode: "BOX-001", quantity: 126, sku: "BOX-SMALL" },
  { barcode: "8691000000053", minStock: 25, name: "Packing Tape · Clear 48 mm", productCode: "TAPE-001", quantity: 19, sku: "TAPE-CLR-48" },
  { barcode: "8691000000060", minStock: 8, name: "Retractable Safety Cutter", productCode: "TOOL-001", quantity: 15, sku: "TOOL-CUT-01" },
  { barcode: "8691000000077", minStock: 18, name: "Stretch Wrap Roll · 50 cm", productCode: "WRAP-001", quantity: 31, sku: "WRAP-500" },
  { barcode: "8691000000084", minStock: 12, name: "Barcode Printer Ribbon", productCode: "RIB-001", quantity: 9, sku: "RIBBON-110" },
];

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "products", label: "Products", icon: Package },
  { id: "stores", label: "Stores", icon: Store },
  { id: "team", label: "Team", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

const reportPeriods = ["Today", "7d", "30d", "3m", "6m", "1y"] as const;

function AppMark() {
  return <span className="app-mini-mark" aria-hidden="true"><Barcode size={14} /></span>;
}

function PhoneHeader() {
  return <header className="app-header"><AppMark /><strong>Stokta</strong></header>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className="app-group-title">{children}</span>;
}

function HomeScreen({ openSettings }: { openSettings: (view: SettingsView) => void }) {
  const metrics = [
    { icon: Store, label: "Active stores", value: "3" },
    { icon: Boxes, label: "Products", value: "8" },
    { icon: Activity, label: "Low stock", value: "8" },
  ];

  return (
    <div className="app-page app-home-page">
      <div className="app-page-heading"><h3>Inventory</h3><p>Overview of your stock right now.</p></div>
      <div className="app-metric-list app-metric-grid">
        {metrics.map(({ icon: Icon, label, value }) => <div className="app-metric-row" key={label}><span><Icon size={15} /></span><strong>{label}</strong><b>{value}</b></div>)}
      </div>
      <section className="app-stock-chart" aria-label="Stock by store">
        <div><strong>Stock by store</strong><small>Current units</small></div>
        <p><span>Main Store</span><i style={{ width: "60%" }} /><b>266</b></p>
        <p><span>Istanbul</span><i style={{ width: "100%" }} /><b>435</b></p>
        <p><span>Ankara</span><i style={{ width: "39%" }} /><b>173</b></p>
      </section>
      <section className="app-resource-section">
        <SectionLabel>RECENT ACTIVITY</SectionLabel>
        <div className="app-activity-rows">
          <div><span>+12</span><p><strong>Barcode Printer Ribbon</strong><small>Main Store · 2h ago</small></p></div>
          <div><span>−2</span><p><strong>Packing Tape · Clear 48 mm</strong><small>Main Store · 5h ago</small></p></div>
        </div>
      </section>
      <section className="app-resource-section">
        <SectionLabel>RECENT REPORT</SectionLabel>
        <button className="app-resource-row" onClick={() => openSettings("reports")} type="button"><span><FileText size={15} /></span><p><strong>Inventory report</strong><small>30 days · PDF · 48 KB</small></p><ChevronRight size={14} /></button>
      </section>
      <section className="app-resource-section">
        <SectionLabel>RECENT BACKUP</SectionLabel>
        <button className="app-resource-row" onClick={() => openSettings("backups")} type="button"><span><DatabaseBackup size={15} /></span><p><strong>stokta-backup-2026-10-04.csv</strong><small>Today · 32 KB</small></p><ChevronRight size={14} /></button>
      </section>
    </div>
  );
}

function ProductsScreen({ openOverlay, showNotice }: { openOverlay: (overlay: Overlay) => void; showNotice: (notice: string) => void }) {
  const [queryOpen, setQueryOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [quantitySort, setQuantitySort] = useState(false);

  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = showroomProducts.filter((product) => `${product.name} ${product.productCode} ${product.sku} ${product.barcode}`.toLowerCase().includes(normalized));
    return [...filtered].sort((a, b) => quantitySort ? b.quantity - a.quantity : a.name.localeCompare(b.name));
  }, [query, quantitySort]);

  return (
    <div className="app-page app-products-page">
      <div className="inventory-toolbar" aria-label="Inventory actions">
        <button className="store-selector" type="button"><Store size={14} /><span>Main Store</span><ChevronDown size={12} /></button>
        <button aria-label="Search products" className={queryOpen ? "is-active" : ""} onClick={() => setQueryOpen((open) => !open)} type="button"><Search size={14} /></button>
        <button aria-label="Add product" className="app-action-primary" onClick={() => openOverlay("add-product")} type="button"><Plus size={15} /></button>
        <button aria-label="Scan barcode" onClick={() => openOverlay("scan")} type="button"><ScanLine size={14} /></button>
        <button aria-label="Sort products" className={quantitySort ? "is-active" : ""} onClick={() => setQuantitySort((sorted) => !sorted)} type="button"><ListFilter size={14} /></button>
        <button aria-label="Import or export inventory" onClick={() => openOverlay("files")} type="button"><FileSpreadsheet size={14} /></button>
        <button aria-label="Product actions" onClick={() => openOverlay("product-actions")} type="button"><HardDrive size={14} /></button>
      </div>
      {queryOpen && <label className="inventory-search"><Search size={14} /><span className="sr-only">Search products</span><input autoFocus onChange={(event) => setQuery(event.target.value)} placeholder="Search name, SKU, or barcode" value={query} /><button aria-label="Close search" onClick={() => { setQueryOpen(false); setQuery(""); }} type="button"><X size={13} /></button></label>}
      <div className="inventory-list">
        {visibleProducts.map((product) => (
          <button className="inventory-row" key={product.sku} onClick={() => showNotice(`${product.name} selected`)} type="button">
            <span className="inventory-row-title"><strong>{product.name}</strong><b>{product.quantity}</b></span>
            <span className="inventory-row-meta"><small>MAIN · {product.productCode} · {product.sku} · {product.barcode}</small><em className={product.quantity <= product.minStock ? "is-low" : ""}>{product.quantity <= product.minStock ? "Low stock" : "In stock"}</em></span>
          </button>
        ))}
        {visibleProducts.length === 0 && <div className="app-empty"><Search size={22} /><strong>No products found</strong><span>Try a different name, SKU, or barcode.</span></div>}
      </div>
      <span className="inventory-count">{visibleProducts.length} products · Main Store</span>
    </div>
  );
}

type DemoStore = { code: string; low: number; name: string; products: number; units: number };
const initialStores: DemoStore[] = [
  { code: "MAIN", low: 4, name: "Main Store", products: 8, units: 266 },
  { code: "IST", low: 1, name: "Istanbul Depot", products: 8, units: 435 },
  { code: "ANK", low: 3, name: "Ankara Branch", products: 8, units: 173 },
];

function StoresScreen({ stores, openOverlay }: { stores: DemoStore[]; openOverlay: (overlay: Overlay) => void }) {
  return (
    <div className="app-page">
      <div className="app-title-row"><h3>Stores</h3><button className="app-compact-primary" disabled={stores.length >= 20} onClick={() => openOverlay("add-store")} type="button"><Plus size={13} /> Add</button></div>
      <p className="app-page-description">Each store keeps independent SKUs and quantities.</p>
      <span className="app-capacity">{stores.length} of 20 Pro stores</span>
      <div className="app-store-list">
        {stores.map((store) => <button className="app-store-card" key={store.code} type="button"><span className="app-store-icon"><Store size={16} /></span><p><strong>{store.name}</strong><small>{store.code}</small><em>{store.products} products · {store.units} units · {store.low} low</em></p><MoreHorizontal size={15} /></button>)}
      </div>
    </div>
  );
}

function TeamScreen({ showNotice }: { showNotice: (notice: string) => void }) {
  const people = [
    { access: "All stores", name: "Furkan Demir", role: "Administrator" },
    { access: "Main Store · Istanbul", name: "Aylin Kaya", role: "Personnel" },
    { access: "Ankara Branch", name: "Kerem Yılmaz", role: "Personnel" },
  ];

  return (
    <div className="app-page">
      <div className="app-title-row"><h3>Team</h3><button aria-label="Add person" className="app-icon-primary" onClick={() => showNotice("Invite by email or QR code")} type="button"><Plus size={15} /></button></div>
      <span className="app-capacity">2 of 20 personnel · 1 administrator</span>
      <div className="app-team-list">
        {people.map((person) => <button className="app-team-card" key={person.name} onClick={() => showNotice(`${person.name} · ${person.access}`)} type="button"><span><UserRound size={16} /></span><p><strong>{person.name}</strong><small>{person.role}</small><em>{person.access}</em></p><ChevronRight size={14} /></button>)}
      </div>
    </div>
  );
}

function SettingsRow({ detail, icon: Icon, label, onClick, trailing }: { detail?: string; icon: typeof Settings; label: string; onClick?: () => void; trailing?: React.ReactNode }) {
  return <button className="app-settings-row" onClick={onClick} type="button"><Icon size={15} /><span><strong>{label}</strong>{detail && <small>{detail}</small>}</span>{trailing ?? <ChevronRight size={14} />}</button>;
}

function SettingsRoot({ openView, theme }: { openView: (view: SettingsView) => void; theme: ThemeMode }) {
  return (
    <div className="app-page">
      <div className="profile-card"><span><UserRound size={19} /></span><p><strong>Stokta Pro</strong><small>3 synced devices · 3 stores · 2 personnel</small></p><ChevronRight size={14} /></div>
      <div className="app-page-heading settings-heading"><h3>Settings</h3></div>
      <section className="app-settings-group"><SectionLabel>STOKTA PRO</SectionLabel><SettingsRow detail="Monthly or yearly via the App Store" icon={ShieldCheck} label="Plan & billing" onClick={() => openView("plans")} /><SettingsRow detail="Firebase multi-device sync" icon={Cloud} label="Cloud sync" /></section>
      <section className="app-settings-group"><SectionLabel>UI CUSTOMIZATION</SectionLabel><SettingsRow detail={`${theme[0].toUpperCase()}${theme.slice(1)} · IBM Plex Sans`} icon={Palette} label="Theme, language & layout" onClick={() => openView("appearance")} /></section>
      <section className="app-settings-group"><SectionLabel>DATA & REPORTS</SectionLabel><SettingsRow detail="Up to one year with Pro" icon={FileText} label="Reports" onClick={() => openView("reports")} /><SettingsRow detail="Automatic local backups" icon={DatabaseBackup} label="Backups & restore" onClick={() => openView("backups")} /><SettingsRow detail="Selected-store CSV or XLSX" icon={FileSpreadsheet} label="Import / export" onClick={() => openView("transfer")} /></section>
    </div>
  );
}

function SubviewHeading({ children, goBack }: { children: React.ReactNode; goBack: () => void }) {
  return <><button className="settings-back" onClick={goBack} type="button"><ArrowLeft size={14} /> Settings</button><h3 className="subview-title">{children}</h3></>;
}

function AppearanceScreen({ goBack, setTheme, theme }: { goBack: () => void; setTheme: (theme: ThemeMode) => void; theme: ThemeMode }) {
  return <div className="app-page"><SubviewHeading goBack={goBack}>UI customization</SubviewHeading><section className="app-settings-group"><SectionLabel>DISPLAY</SectionLabel><SettingsRow icon={Sun} label="Theme" trailing={<span>{`${theme[0].toUpperCase()}${theme.slice(1)}`} <ChevronRight size={14} /></span>} /><div className="app-segments theme-segments"><button className={theme === "system" ? "is-active" : ""} onClick={() => setTheme("system")} type="button"><Monitor size={13} /> System</button><button className={theme === "light" ? "is-active" : ""} onClick={() => setTheme("light")} type="button"><Sun size={13} /> Light</button><button className={theme === "dark" ? "is-active" : ""} onClick={() => setTheme("dark")} type="button"><Moon size={13} /> Dark</button></div><SettingsRow icon={Languages} label="Language" onClick={() => undefined} trailing={<span>English <ChevronRight size={14} /></span>} /><SettingsRow icon={Rows3} label="Density" trailing={<span>Comfortable <ChevronRight size={14} /></span>} /><SettingsRow icon={Settings} label="Font size" trailing={<span>Standard <ChevronRight size={14} /></span>} /><SettingsRow icon={Accessibility} label="Contrast" trailing={<span>Standard <ChevronRight size={14} /></span>} /><SettingsRow icon={Vibrate} label="Haptic feedback" trailing={<span className="app-switch is-on"><i /></span>} /></section><p className="app-helper-copy">Stokta 2.0.1 uses IBM Plex Sans throughout the app.</p></div>;
}

function ReportsScreen({ goBack, showNotice }: { goBack: () => void; showNotice: (notice: string) => void }) {
  const [period, setPeriod] = useState<(typeof reportPeriods)[number]>("30d");
  const [generated, setGenerated] = useState(false);
  return <div className="app-page"><SubviewHeading goBack={goBack}>Reports</SubviewHeading><div className="report-composer"><SectionLabel>REPORT PERIOD</SectionLabel><div className="app-segments">{reportPeriods.map((item) => <button className={period === item ? "is-active" : ""} key={item} onClick={() => { setPeriod(item); setGenerated(false); }} type="button">{item}</button>)}</div><button className="app-primary-button" onClick={() => { setGenerated(true); showNotice(`${period} report generated`); }} type="button">Generate report</button></div>{generated && <div className="app-success"><Check size={14} /><span><strong>Inventory report ready</strong><small>{period} · PDF · Saved locally</small></span></div>}<section className="app-resource-section"><SectionLabel>RECENT REPORTS</SectionLabel><div className="app-report-list"><button type="button"><FileText size={15} /><span><strong>Inventory report</strong><small>30 days · PDF · 48 KB</small></span><MoreHorizontal size={14} /></button><button type="button"><FileText size={15} /><span><strong>Inventory report</strong><small>7 days · PDF · 22 KB</small></span><MoreHorizontal size={14} /></button></div></section></div>;
}

function BackupsScreen({ goBack, showNotice }: { goBack: () => void; showNotice: (notice: string) => void }) {
  const [scheduled, setScheduled] = useState(true);
  const [reminders, setReminders] = useState(true);
  return <div className="app-page"><SubviewHeading goBack={goBack}>Backups & restore</SubviewHeading><section className="app-settings-group"><SectionLabel>BACKUPS & RESTORE</SectionLabel><button className="app-settings-row" onClick={() => setScheduled((enabled) => !enabled)} type="button"><DatabaseBackup size={15} /><span><strong>Enable automatic backups</strong><small>Creates one local CSV backup per day when enabled.</small></span><span className={scheduled ? "app-switch is-on" : "app-switch"}><i /></span></button><button className="app-settings-row" onClick={() => setReminders((enabled) => !enabled)} type="button"><BellRing size={15} /><span><strong>Backup reminders</strong><small>Local notifications on this device.</small></span><span className={reminders ? "app-switch is-on" : "app-switch"}><i /></span></button></section><div className="backup-actions"><button className="app-primary-button" onClick={() => showNotice("Local backup created")} type="button"><DatabaseBackup size={14} /> Back up now</button><button className="app-secondary-button" onClick={() => showNotice("Choose a backup file") } type="button"><FileUp size={14} /> Choose backup file</button></div><section className="app-resource-section"><SectionLabel>EXISTING BACKUPS</SectionLabel><div className="app-backup-list"><button type="button"><DatabaseBackup size={15} /><span><strong>stokta-backup-2026-10-04.csv</strong><small>Today · 32 KB</small></span><em>Restore</em></button><button type="button"><DatabaseBackup size={15} /><span><strong>stokta-backup-2026-10-03.csv</strong><small>Yesterday · 31 KB</small></span><em>Restore</em></button></div></section></div>;
}

function TransferScreen({ goBack, showNotice }: { goBack: () => void; showNotice: (notice: string) => void }) {
  return <div className="app-page"><SubviewHeading goBack={goBack}>Import / export</SubviewHeading><p className="app-page-description">Move inventory for the selected store through validated local files.</p><div className="transfer-stack"><button onClick={() => showNotice("Choose a CSV or Excel file for Main Store")} type="button"><FileUp size={17} /><span><strong>Import inventory</strong><small>Main Store · CSV or XLSX</small></span><ChevronRight size={14} /></button><button onClick={() => showNotice("Main Store export prepared for sharing")} type="button"><FileDown size={17} /><span><strong>Export inventory</strong><small>Main Store · CSV or XLSX</small></span><ChevronRight size={14} /></button></div></div>;
}

function LanguageScreen({ goBack }: { goBack: () => void }) {
  const [language, setLanguage] = useState("English");
  const languages = ["🇬🇧 English", "🇹🇷 Türkçe", "🇺🇿 O‘zbekcha", "🇰🇿 Қазақша", "🇰🇬 Кыргызча", "🇷🇺 Русский", "🇦🇿 Azərbaycanca"];
  return <div className="app-page"><SubviewHeading goBack={goBack}>Display language</SubviewHeading><div className="app-language-list">{languages.map((item) => { const name = item.slice(item.indexOf(" ") + 1); return <button className={name === language ? "is-active" : ""} key={item} onClick={() => setLanguage(name)} type="button"><span>{item}</span>{name === language && <Check size={14} />}</button>; })}</div></div>;
}

function PlansScreen({ goBack, showNotice }: { goBack: () => void; showNotice: (notice: string) => void }) {
  const [plan, setPlan] = useState<"stokta" | "pro">("pro");
  const [period, setPeriod] = useState<"monthly" | "yearly">("yearly");
  const features = plan === "pro"
    ? ["Up to 20 synced devices", "20 stores and 20 personnel", "20M total products", "Reports up to one year", "Automatic backups"]
    : ["One local device", "One store", "10,000 total products", "Barcode scanning", "Selected-store CSV and Excel transfer"];

  return <div className="app-page"><SubviewHeading goBack={goBack}>Choose your plan</SubviewHeading><div className="app-plan-tabs"><button className={plan === "stokta" ? "is-active" : ""} onClick={() => setPlan("stokta")} type="button">Stokta Free</button><button className={plan === "pro" ? "is-active" : ""} onClick={() => setPlan("pro")} type="button">Stokta Pro</button></div>{plan === "pro" && <div className="app-plan-periods"><button className={period === "monthly" ? "is-active" : ""} onClick={() => setPeriod("monthly")} type="button"><small>Monthly</small><strong>Localized price</strong><span>shown by App Store</span></button><button className={period === "yearly" ? "is-active" : ""} onClick={() => setPeriod("yearly")} type="button"><em>YEARLY</em><small>Yearly</small><strong>Localized price</strong><span>shown by App Store</span></button></div>}<div className="app-plan-features">{features.map((feature) => <p key={feature}><Check size={14} /><span>{feature}</span></p>)}</div><button className="app-primary-button" onClick={() => showNotice(plan === "pro" ? `Stokta Pro ${period} selected` : "Continue with Stokta Free")} type="button">{plan === "pro" ? `Continue with ${period} plan` : "Continue with Stokta Free"}</button>{plan === "pro" && <><button className="app-secondary-button app-restore-button" onClick={() => showNotice("Checking App Store purchases")} type="button">Restore purchases</button><p className="app-helper-copy">The App Store confirms your price and renewal terms before purchase.</p></>}</div>;
}

function ScannerOverlay({ close, showNotice }: { close: () => void; showNotice: (notice: string) => void }) {
  return <div className="app-overlay app-scanner" role="dialog" aria-label="Scan a barcode" aria-modal="true"><header><AppMark /><span><strong>Scan a barcode</strong><small>Active store · Main Store</small></span><button aria-label="Close scanner" onClick={close} type="button"><X size={17} /></button></header><div className="scanner-camera"><div className="scanner-target"><span /></div><p>Place a barcode inside the frame</p><button onClick={() => { close(); showNotice("Barcode recognized · RIB-001"); }} type="button">Simulate barcode</button></div></div>;
}

function BottomSheet({ children, close, title }: { children: React.ReactNode; close: () => void; title: string }) {
  return <div className="app-sheet" role="dialog" aria-label={title} aria-modal="true"><span className="sheet-handle" /><div className="sheet-title"><strong>{title}</strong><button aria-label="Close" onClick={close} type="button"><X size={14} /></button></div>{children}</div>;
}

export function IPhoneDemo() {
  const [tab, setTab] = useState<Tab>("home");
  const [settingsView, setSettingsView] = useState<SettingsView>("root");
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [theme, setTheme] = useState<ThemeMode>("system");
  const [notice, setNotice] = useState("");
  const [stores, setStores] = useState(initialStores);
  const [productName, setProductName] = useState("");
  const [storeName, setStoreName] = useState("");

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2400);
  };
  const openSettings = (view: SettingsView) => { setTab("settings"); setSettingsView(view); };
  const selectTab = (next: Tab) => { setTab(next); if (next !== "settings") setSettingsView("root"); };
  const closeOverlay = () => setOverlay(null);
  const addProduct = (event: FormEvent) => { event.preventDefault(); if (!productName.trim()) return; closeOverlay(); showNotice(`${productName.trim()} added to Main Store`); setProductName(""); };
  const addStore = (event: FormEvent) => { event.preventDefault(); const name = storeName.trim(); if (!name || stores.length >= 20) return; setStores((current) => [...current, { code: `STORE-${current.length + 1}`, low: 0, name, products: 0, units: 0 }]); closeOverlay(); showNotice(`${name} created`); setStoreName(""); };

  let screen: React.ReactNode;
  if (tab === "home") screen = <HomeScreen openSettings={openSettings} />;
  else if (tab === "products") screen = <ProductsScreen openOverlay={setOverlay} showNotice={showNotice} />;
  else if (tab === "stores") screen = <StoresScreen openOverlay={setOverlay} stores={stores} />;
  else if (tab === "team") screen = <TeamScreen showNotice={showNotice} />;
  else if (settingsView === "appearance") screen = <AppearanceScreen goBack={() => setSettingsView("root")} setTheme={setTheme} theme={theme} />;
  else if (settingsView === "reports") screen = <ReportsScreen goBack={() => setSettingsView("root")} showNotice={showNotice} />;
  else if (settingsView === "backups") screen = <BackupsScreen goBack={() => setSettingsView("root")} showNotice={showNotice} />;
  else if (settingsView === "transfer") screen = <TransferScreen goBack={() => setSettingsView("root")} showNotice={showNotice} />;
  else if (settingsView === "language") screen = <LanguageScreen goBack={() => setSettingsView("root")} />;
  else if (settingsView === "plans") screen = <PlansScreen goBack={() => setSettingsView("root")} showNotice={showNotice} />;
  else screen = <SettingsRoot openView={setSettingsView} theme={theme} />;

  return (
    <div className="iphone-stage">
      <span className="demo-callout"><span /> LIVE APP DEMO</span>
      <div className="iphone-device" aria-label="Interactive Stokta app demo">
        <span className="iphone-side-button iphone-side-button-one" /><span className="iphone-side-button iphone-side-button-two" /><span className="iphone-side-button iphone-side-button-three" />
        <div className="iphone-bezel"><div className="iphone-island"><span /></div><div className={theme === "dark" ? "iphone-screen is-dark" : "iphone-screen"}><div className="iphone-status"><span>9:41</span><span className="status-icons">● ◒ ▰</span></div><PhoneHeader />{screen}{notice && <button className="app-toast" onClick={() => setNotice("")} type="button"><Check size={13} />{notice}</button>}<nav className="app-bottom-nav" aria-label="Demo app navigation">{navItems.map(({ id, label, icon: Icon }) => <button className={tab === id ? "is-active" : ""} key={id} onClick={() => selectTab(id)} type="button"><span><Icon size={15} /></span><small>{label}</small></button>)}</nav><div className="home-indicator" />{overlay === "scan" && <ScannerOverlay close={closeOverlay} showNotice={showNotice} />}{overlay === "add-product" && <BottomSheet close={closeOverlay} title="Add product"><form className="sheet-form" onSubmit={addProduct}><label>Product name<input autoFocus onChange={(event) => setProductName(event.target.value)} placeholder="e.g. Shipping labels" value={productName} /></label><div className="sheet-suggestion"><span><strong>Product code</strong><small>PRD-009</small></span><span><strong>SKU</strong><small>MAIN-PRD-009</small></span></div><button className="sheet-action" onClick={() => showNotice("Choose a local product image")} type="button"><FileImage size={16} /><span><strong>Attach image</strong><small>Stored only on this device</small></span><ChevronRight size={14} /></button><button className="app-primary-button" type="submit">Create product</button></form></BottomSheet>}{overlay === "files" && <BottomSheet close={closeOverlay} title="Store files"><button className="sheet-action" onClick={() => { closeOverlay(); openSettings("transfer"); }} type="button"><FileUp size={16} /><span><strong>Import Excel / CSV</strong><small>Main Store only</small></span><ChevronRight size={14} /></button><button className="sheet-action" onClick={() => { closeOverlay(); showNotice("Main Store export prepared"); }} type="button"><FileDown size={16} /><span><strong>Export Excel / CSV</strong><small>Main Store only</small></span><ChevronRight size={14} /></button></BottomSheet>}{overlay === "product-actions" && <BottomSheet close={closeOverlay} title="Product actions"><button className="sheet-action" onClick={() => { closeOverlay(); showNotice("Select products to move"); }} type="button"><HardDrive size={16} /><span><strong>Move products</strong><small>Select one or more products</small></span><ChevronRight size={14} /></button><button className="sheet-action is-danger" onClick={() => { closeOverlay(); showNotice("Select products to delete"); }} type="button"><X size={16} /><span><strong>Delete products</strong><small>Select one or more products</small></span><ChevronRight size={14} /></button></BottomSheet>}{overlay === "add-store" && <BottomSheet close={closeOverlay} title="Add store"><form className="sheet-form" onSubmit={addStore}><label>Store name<input autoFocus onChange={(event) => setStoreName(event.target.value)} placeholder="e.g. Izmir Depot" value={storeName} /></label><button className="app-primary-button" type="submit">Create store</button></form></BottomSheet>}</div></div>
      </div>
    </div>
  );
}
