import { FormEvent, useMemo, useState } from "react";
import {
  Accessibility,
  Activity,
  ArrowLeft,
  Barcode,
  Boxes,
  Check,
  ChevronDown,
  ChevronRight,
  DatabaseBackup,
  FileDown,
  FileText,
  FileUp,
  Home,
  Languages,
  ListFilter,
  Moon,
  MoreHorizontal,
  Package,
  Palette,
  Plus,
  Rows3,
  ScanLine,
  Search,
  Settings,
  Store,
  Sun,
  UserRound,
  Vibrate,
  X,
} from "lucide-react";

type Tab = "home" | "products" | "stores" | "settings";
type SettingsView = "root" | "appearance" | "reports" | "backups" | "transfer" | "language";
type Overlay = "scan" | "add-product" | "files" | "add-store" | null;

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
  { id: "settings", label: "Settings", icon: Settings },
] as const;

const reportPeriods = ["Today", "7d", "30d", "3m", "6m"] as const;

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
    { icon: Package, label: "Total products", value: "24" },
    { icon: Boxes, label: "Total units", value: "886" },
    { icon: Activity, label: "Low stock products", value: "8" },
    { icon: Store, label: "Active stores", value: "3" },
  ];

  return (
    <div className="app-page app-home-page">
      <div className="app-page-heading"><h3>Inventory</h3><p>Overview of your stock right now.</p></div>
      <div className="app-metric-list">
        {metrics.map(({ icon: Icon, label, value }) => <div className="app-metric-row" key={label}><span><Icon size={15} /></span><strong>{label}</strong><b>{value}</b></div>)}
      </div>
      <section className="app-resource-section">
        <SectionLabel>LAST GENERATED REPORT</SectionLabel>
        <button className="app-resource-row" onClick={() => openSettings("reports")} type="button"><span><FileText size={15} /></span><p><strong>Inventory report</strong><small>30 days · PDF · 48 KB</small></p><ChevronRight size={14} /></button>
      </section>
      <section className="app-resource-section">
        <SectionLabel>EXISTING BACKUPS</SectionLabel>
        <button className="app-resource-row" onClick={() => openSettings("backups")} type="button"><span><DatabaseBackup size={15} /></span><p><strong>stokta-backup-2026-09-09.csv</strong><small>Today · 32 KB</small></p><ChevronRight size={14} /></button>
      </section>
      <section className="app-resource-section">
        <SectionLabel>RECENT ACTIVITY</SectionLabel>
        <div className="app-activity-rows">
          <div><span>+12</span><p><strong>Barcode Printer Ribbon</strong><small>Main Store · 2h ago</small></p></div>
          <div><span>−2</span><p><strong>Packing Tape · Clear 48 mm</strong><small>Main Store · 5h ago</small></p></div>
        </div>
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
        <button aria-label="Import or export inventory" onClick={() => openOverlay("files")} type="button"><MoreHorizontal size={15} /></button>
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
  { code: "IST", low: 1, name: "Istanbul Depot", products: 8, units: 447 },
  { code: "ANK", low: 3, name: "Ankara Branch", products: 8, units: 173 },
];

function StoresScreen({ stores, openOverlay }: { stores: DemoStore[]; openOverlay: (overlay: Overlay) => void }) {
  return (
    <div className="app-page">
      <div className="app-title-row"><h3>Stores</h3><button className="app-compact-primary" disabled={stores.length >= 10} onClick={() => openOverlay("add-store")} type="button"><Plus size={13} /> Add</button></div>
      <p className="app-page-description">Each store keeps independent SKUs and quantities.</p>
      <span className="app-capacity">{stores.length} of 10 stores</span>
      <div className="app-store-list">
        {stores.map((store) => <button className="app-store-card" key={store.code} type="button"><span className="app-store-icon"><Store size={16} /></span><p><strong>{store.name}</strong><small>{store.code}</small><em>{store.products} products · {store.units} units · {store.low} low</em></p><MoreHorizontal size={15} /></button>)}
      </div>
    </div>
  );
}

function SettingsRow({ detail, icon: Icon, label, onClick, trailing }: { detail?: string; icon: typeof Settings; label: string; onClick?: () => void; trailing?: React.ReactNode }) {
  return <button className="app-settings-row" onClick={onClick} type="button"><Icon size={15} /><span><strong>{label}</strong>{detail && <small>{detail}</small>}</span>{trailing ?? <ChevronRight size={14} />}</button>;
}

function SettingsRoot({ dark, openView }: { dark: boolean; openView: (view: SettingsView) => void }) {
  return (
    <div className="app-page">
      <div className="profile-card"><span><UserRound size={19} /></span><p><strong>Stokta Showroom</strong><small>Demir Software</small></p><ChevronRight size={14} /></div>
      <div className="app-page-heading settings-heading"><h3>Settings</h3></div>
      <section className="app-settings-group"><SectionLabel>APPEARANCE</SectionLabel><SettingsRow detail={`${dark ? "Dark" : "Light"} · Space Grotesk · Comfortable`} icon={Palette} label="Theme, text & density" onClick={() => openView("appearance")} /></section>
      <section className="app-settings-group"><SectionLabel>INVENTORY DISPLAY</SectionLabel><SettingsRow detail="Comfortable · Stock indicators on" icon={Rows3} label="Product rows & indicators" /></section>
      <section className="app-settings-group"><SectionLabel>LANGUAGE & REGION</SectionLabel><SettingsRow detail="English" icon={Languages} label="Display language" onClick={() => openView("language")} /></section>
      <section className="app-settings-group"><SectionLabel>DATA & REPORTS</SectionLabel><SettingsRow detail="Today to 6 months" icon={FileText} label="Reports" onClick={() => openView("reports")} /><SettingsRow detail="CSV and Excel files" icon={FileUp} label="Import / export" onClick={() => openView("transfer")} /><SettingsRow detail="Local backup and full restore" icon={DatabaseBackup} label="Backups & restore" onClick={() => openView("backups")} /></section>
      <section className="app-settings-group"><SectionLabel>ACCESSIBILITY & INTERACTION</SectionLabel><SettingsRow icon={Vibrate} label="Haptic feedback" trailing={<span className="app-switch is-on"><i /></span>} /><SettingsRow icon={Accessibility} label="Reduce motion" trailing={<span className="app-switch"><i /></span>} /></section>
    </div>
  );
}

function SubviewHeading({ children, goBack }: { children: React.ReactNode; goBack: () => void }) {
  return <><button className="settings-back" onClick={goBack} type="button"><ArrowLeft size={14} /> Settings</button><h3 className="subview-title">{children}</h3></>;
}

function AppearanceScreen({ dark, goBack, setDark }: { dark: boolean; goBack: () => void; setDark: (dark: boolean) => void }) {
  return <div className="app-page"><SubviewHeading goBack={goBack}>Theme, text & density</SubviewHeading><SectionLabel>THEME</SectionLabel><div className="app-segments theme-segments"><button className={!dark ? "is-active" : ""} onClick={() => setDark(false)} type="button"><Sun size={13} /> Light</button><button className={dark ? "is-active" : ""} onClick={() => setDark(true)} type="button"><Moon size={13} /> Dark</button></div><section className="app-settings-group"><SectionLabel>TEXT</SectionLabel><SettingsRow detail="Current typeface" icon={Settings} label="Space Grotesk" /><SettingsRow detail="Default scale" icon={Rows3} label="100%" /></section><p className="app-helper-copy">The demo uses the same light and dark palette tokens as the current app.</p></div>;
}

function ReportsScreen({ goBack, showNotice }: { goBack: () => void; showNotice: (notice: string) => void }) {
  const [period, setPeriod] = useState<(typeof reportPeriods)[number]>("30d");
  const [generated, setGenerated] = useState(false);
  return <div className="app-page"><SubviewHeading goBack={goBack}>Reports</SubviewHeading><div className="report-composer"><SectionLabel>REPORT PERIOD</SectionLabel><div className="app-segments">{reportPeriods.map((item) => <button className={period === item ? "is-active" : ""} key={item} onClick={() => { setPeriod(item); setGenerated(false); }} type="button">{item}</button>)}</div><button className="app-primary-button" onClick={() => { setGenerated(true); showNotice(`${period} report generated`); }} type="button">Generate report</button></div>{generated && <div className="app-success"><Check size={14} /><span><strong>Inventory report ready</strong><small>{period} · PDF · Saved locally</small></span></div>}<section className="app-resource-section"><SectionLabel>RECENT REPORTS</SectionLabel><div className="app-report-list"><button type="button"><FileText size={15} /><span><strong>Inventory report</strong><small>30 days · PDF · 48 KB</small></span><MoreHorizontal size={14} /></button><button type="button"><FileText size={15} /><span><strong>Inventory report</strong><small>7 days · PDF · 22 KB</small></span><MoreHorizontal size={14} /></button></div></section></div>;
}

function BackupsScreen({ goBack, showNotice }: { goBack: () => void; showNotice: (notice: string) => void }) {
  const [scheduled, setScheduled] = useState(true);
  return <div className="app-page"><SubviewHeading goBack={goBack}>Backups & restore</SubviewHeading><section className="app-settings-group"><SectionLabel>BACKUPS & RESTORE</SectionLabel><button className="app-settings-row" onClick={() => setScheduled((enabled) => !enabled)} type="button"><DatabaseBackup size={15} /><span><strong>Enable automatic backups</strong><small>Creates one local CSV backup per day when enabled.</small></span><span className={scheduled ? "app-switch is-on" : "app-switch"}><i /></span></button></section><div className="backup-actions"><button className="app-primary-button" onClick={() => showNotice("Local backup created")} type="button"><DatabaseBackup size={14} /> Back up now</button><button className="app-secondary-button" onClick={() => showNotice("Choose a backup file") } type="button"><FileUp size={14} /> Choose backup file</button></div><section className="app-resource-section"><SectionLabel>EXISTING BACKUPS</SectionLabel><div className="app-backup-list"><button type="button"><DatabaseBackup size={15} /><span><strong>stokta-backup-2026-09-09.csv</strong><small>Today · 32 KB</small></span><em>Restore</em></button><button type="button"><DatabaseBackup size={15} /><span><strong>stokta-backup-2026-09-08.csv</strong><small>Yesterday · 31 KB</small></span><em>Restore</em></button></div></section></div>;
}

function TransferScreen({ goBack, showNotice }: { goBack: () => void; showNotice: (notice: string) => void }) {
  return <div className="app-page"><SubviewHeading goBack={goBack}>Import / export</SubviewHeading><p className="app-page-description">Move inventory through validated local files.</p><div className="transfer-stack"><button onClick={() => showNotice("Choose a CSV or Excel file")} type="button"><FileUp size={17} /><span><strong>Import inventory</strong><small>CSV or XLSX</small></span><ChevronRight size={14} /></button><button onClick={() => showNotice("Export prepared for sharing")} type="button"><FileDown size={17} /><span><strong>Export inventory</strong><small>CSV or XLSX</small></span><ChevronRight size={14} /></button></div></div>;
}

function LanguageScreen({ goBack }: { goBack: () => void }) {
  const [language, setLanguage] = useState("English");
  const languages = ["🇬🇧 English", "🇹🇷 Türkçe", "🇺🇿 O‘zbekcha", "🇰🇿 Қазақша", "🇰🇬 Кыргызча", "🇷🇺 Русский", "🇦🇿 Azərbaycanca"];
  return <div className="app-page"><SubviewHeading goBack={goBack}>Display language</SubviewHeading><div className="app-language-list">{languages.map((item) => { const name = item.slice(item.indexOf(" ") + 1); return <button className={name === language ? "is-active" : ""} key={item} onClick={() => setLanguage(name)} type="button"><span>{item}</span>{name === language && <Check size={14} />}</button>; })}</div></div>;
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
  const [dark, setDark] = useState(false);
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
  const addStore = (event: FormEvent) => { event.preventDefault(); const name = storeName.trim(); if (!name || stores.length >= 10) return; setStores((current) => [...current, { code: `STORE-${current.length + 1}`, low: 0, name, products: 0, units: 0 }]); closeOverlay(); showNotice(`${name} created`); setStoreName(""); };

  let screen: React.ReactNode;
  if (tab === "home") screen = <HomeScreen openSettings={openSettings} />;
  else if (tab === "products") screen = <ProductsScreen openOverlay={setOverlay} showNotice={showNotice} />;
  else if (tab === "stores") screen = <StoresScreen openOverlay={setOverlay} stores={stores} />;
  else if (settingsView === "appearance") screen = <AppearanceScreen dark={dark} goBack={() => setSettingsView("root")} setDark={setDark} />;
  else if (settingsView === "reports") screen = <ReportsScreen goBack={() => setSettingsView("root")} showNotice={showNotice} />;
  else if (settingsView === "backups") screen = <BackupsScreen goBack={() => setSettingsView("root")} showNotice={showNotice} />;
  else if (settingsView === "transfer") screen = <TransferScreen goBack={() => setSettingsView("root")} showNotice={showNotice} />;
  else if (settingsView === "language") screen = <LanguageScreen goBack={() => setSettingsView("root")} />;
  else screen = <SettingsRoot dark={dark} openView={setSettingsView} />;

  return (
    <div className="iphone-stage">
      <span className="demo-callout"><span /> LIVE APP DEMO</span>
      <div className="iphone-device" aria-label="Interactive Stokta app demo">
        <span className="iphone-side-button iphone-side-button-one" /><span className="iphone-side-button iphone-side-button-two" /><span className="iphone-side-button iphone-side-button-three" />
        <div className="iphone-bezel"><div className="iphone-island"><span /></div><div className={dark ? "iphone-screen is-dark" : "iphone-screen"}><div className="iphone-status"><span>9:41</span><span className="status-icons">● ◒ ▰</span></div><PhoneHeader />{screen}{notice && <button className="app-toast" onClick={() => setNotice("")} type="button"><Check size={13} />{notice}</button>}<nav className="app-bottom-nav" aria-label="Demo app navigation">{navItems.map(({ id, label, icon: Icon }) => <button className={tab === id ? "is-active" : ""} key={id} onClick={() => selectTab(id)} type="button"><span><Icon size={15} /></span><small>{label}</small></button>)}</nav><div className="home-indicator" />{overlay === "scan" && <ScannerOverlay close={closeOverlay} showNotice={showNotice} />}{overlay === "add-product" && <BottomSheet close={closeOverlay} title="Add product"><form className="sheet-form" onSubmit={addProduct}><label>Product name<input autoFocus onChange={(event) => setProductName(event.target.value)} placeholder="e.g. Shipping labels" value={productName} /></label><button className="app-primary-button" type="submit">Create product</button></form></BottomSheet>}{overlay === "files" && <BottomSheet close={closeOverlay} title="Import / export"><button className="sheet-action" onClick={() => { closeOverlay(); openSettings("transfer"); }} type="button"><FileUp size={16} /><span><strong>Import inventory</strong><small>CSV or XLSX</small></span><ChevronRight size={14} /></button><button className="sheet-action" onClick={() => { closeOverlay(); showNotice("Export prepared for sharing"); }} type="button"><FileDown size={16} /><span><strong>Export inventory</strong><small>CSV or XLSX</small></span><ChevronRight size={14} /></button></BottomSheet>}{overlay === "add-store" && <BottomSheet close={closeOverlay} title="Add store"><form className="sheet-form" onSubmit={addStore}><label>Store name<input autoFocus onChange={(event) => setStoreName(event.target.value)} placeholder="e.g. Izmir Depot" value={storeName} /></label><button className="app-primary-button" type="submit">Create store</button></form></BottomSheet>}</div></div>
      </div>
    </div>
  );
}
