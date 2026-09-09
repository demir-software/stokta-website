import { FormEvent, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpDown,
  Barcode,
  Boxes,
  CalendarClock,
  Check,
  ChevronRight,
  DatabaseBackup,
  FileDown,
  FileText,
  FileUp,
  Home,
  MoreHorizontal,
  Package,
  Plus,
  RotateCcw,
  ScanLine,
  Search,
  Settings,
  Store,
  X,
} from "lucide-react";

type Tab = "home" | "products" | "stores" | "settings";
type SettingsView = "root" | "reports" | "backups" | "transfer";

type ProductItem = {
  name: string;
  sku: string;
  quantity: number;
};

const initialProducts: ProductItem[] = [
  { name: "Barcode printer ribbon", sku: "RIB-001", quantity: 9 },
  { name: "Corrugated carton · Small", sku: "BOX-001", quantity: 126 },
  { name: "Nitrile gloves · M", sku: "PPE-001", quantity: 18 },
  { name: "Packing tape · Clear", sku: "TAPE-001", quantity: 19 },
];

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "products", label: "Products", icon: Package },
  { id: "stores", label: "Stores", icon: Store },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

const reportPeriods = ["Today", "7d", "30d", "3m", "6m"] as const;

function PhoneHeader({ title = "Stokta", onBack }: { title?: string; onBack?: () => void }) {
  return (
    <header className="app-header">
      {onBack ? (
        <button aria-label="Go back" className="app-icon-button" onClick={onBack} type="button"><ArrowLeft size={17} /></button>
      ) : (
        <span className="app-mini-mark" aria-hidden="true"><Barcode size={16} /></span>
      )}
      <strong>{title}</strong>
      <span className="app-header-spacer" />
    </header>
  );
}

function HomeScreen({ onNavigate }: { onNavigate: (tab: Tab, view?: SettingsView) => void }) {
  return (
    <div className="app-page">
      <div className="app-page-heading">
        <span className="app-kicker">LOCAL INVENTORY</span>
        <h3>Good morning.</h3>
        <p>What would you like to do?</p>
      </div>
      <div className="app-action-grid">
        <button onClick={() => onNavigate("products")} type="button"><ScanLine size={19} /><strong>Scan a product</strong><span>Open camera scanner</span></button>
        <button onClick={() => onNavigate("settings", "transfer")} type="button"><FileUp size={19} /><strong>Import stock</strong><span>CSV or Excel file</span></button>
        <button onClick={() => onNavigate("settings", "reports")} type="button"><FileText size={19} /><strong>Create report</strong><span>Up to six months</span></button>
        <button onClick={() => onNavigate("settings", "backups")} type="button"><DatabaseBackup size={19} /><strong>Back up now</strong><span>Keep a local copy</span></button>
      </div>
      <div className="app-list-heading"><strong>Recent activity</strong><span>Local history</span></div>
      <div className="app-card app-activity-list">
        <div><span className="activity-sign">+12</span><p><strong>Barcode printer ribbon</strong><small>Main Store · 2h ago</small></p></div>
        <div><span className="activity-sign">−2</span><p><strong>Packing tape · Clear</strong><small>Main Store · 5h ago</small></p></div>
        <div><span className="activity-sign">+30</span><p><strong>Nitrile gloves · M</strong><small>Main Store · Yesterday</small></p></div>
      </div>
    </div>
  );
}

function ProductsScreen() {
  const [products, setProducts] = useState(initialProducts);
  const [query, setQuery] = useState("");
  const [sortDescending, setSortDescending] = useState(false);
  const [sheet, setSheet] = useState<"scan" | "add" | "transfer" | null>(null);
  const [newName, setNewName] = useState("");
  const [notice, setNotice] = useState("");

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => `${product.name} ${product.sku}`.toLowerCase().includes(query.toLowerCase()));
    return [...filtered].sort((a, b) => sortDescending ? b.quantity - a.quantity : a.name.localeCompare(b.name));
  }, [products, query, sortDescending]);

  const addProduct = (event: FormEvent) => {
    event.preventDefault();
    const name = newName.trim();
    if (!name) return;
    setProducts((current) => [{ name, sku: `NEW-${current.length + 1}`, quantity: 0 }, ...current]);
    setNewName("");
    setSheet(null);
    setNotice("Product added to Main Store");
  };

  return (
    <div className="app-page">
      <div className="app-page-heading compact"><span className="app-kicker">MAIN STORE</span><div className="app-title-row"><h3>Products</h3><span>{products.length} items</span></div></div>
      <label className="app-search"><Search aria-hidden="true" size={15} /><span className="sr-only">Search products</span><input onChange={(event) => setQuery(event.target.value)} placeholder="Search name, SKU or barcode" value={query} /></label>
      <div aria-label="Product actions" className="app-toolbar">
        <button aria-label="Add product" onClick={() => setSheet("add")} type="button"><Plus size={16} /><span>Add</span></button>
        <button aria-label="Scan barcode" onClick={() => setSheet("scan")} type="button"><ScanLine size={16} /><span>Scan</span></button>
        <button aria-label="Sort products" onClick={() => setSortDescending((value) => !value)} type="button"><ArrowUpDown size={16} /><span>Sort</span></button>
        <button aria-label="Import or export inventory" onClick={() => setSheet("transfer")} type="button"><MoreHorizontal size={17} /><span>Files</span></button>
      </div>
      {notice && <button className="app-notice" onClick={() => setNotice("")} type="button"><Check size={14} /> {notice}<X size={12} /></button>}
      <div className="app-product-list">
        {visibleProducts.map((product) => (
          <button className="app-product-row" key={product.sku} type="button">
            <span className="app-product-icon"><Boxes size={17} /></span>
            <span className="app-product-copy"><strong>{product.name}</strong><small>{product.sku} · MAIN</small></span>
            <span className={product.quantity <= 20 ? "stock-count is-low" : "stock-count"}>{product.quantity}<small>units</small></span>
          </button>
        ))}
        {visibleProducts.length === 0 && <div className="app-empty"><Search size={24} /><strong>No products found</strong><span>Try a different name or SKU.</span></div>}
      </div>
      {sheet === "scan" && (
        <div className="app-overlay app-scanner" role="dialog" aria-modal="true" aria-label="Barcode scanner">
          <button aria-label="Close scanner" className="scanner-close" onClick={() => setSheet(null)} type="button"><X size={19} /></button>
          <div className="scanner-frame"><span /></div><p>Align a barcode inside the frame</p>
          <button className="app-light-button" onClick={() => { setSheet(null); setNotice("Barcode found · RIB-001"); }} type="button">Simulate scan</button>
        </div>
      )}
      {sheet === "add" && (
        <div className="app-sheet" role="dialog" aria-modal="true" aria-label="Add product">
          <span className="sheet-handle" /><div className="sheet-title"><strong>Add product</strong><button aria-label="Close" onClick={() => setSheet(null)} type="button"><X size={16} /></button></div>
          <form onSubmit={addProduct}><label>Product name<input autoFocus onChange={(event) => setNewName(event.target.value)} placeholder="e.g. Shipping labels" value={newName} /></label><button className="app-primary-button" type="submit">Create product</button></form>
        </div>
      )}
      {sheet === "transfer" && (
        <div className="app-sheet" role="dialog" aria-modal="true" aria-label="Import and export">
          <span className="sheet-handle" /><div className="sheet-title"><strong>Inventory files</strong><button aria-label="Close" onClick={() => setSheet(null)} type="button"><X size={16} /></button></div>
          <button className="sheet-action" onClick={() => { setSheet(null); setNotice("Choose a CSV or Excel file"); }} type="button"><FileUp size={18} /><span><strong>Bulk import</strong><small>CSV or XLSX</small></span><ChevronRight size={15} /></button>
          <button className="sheet-action" onClick={() => { setSheet(null); setNotice("Export prepared for sharing"); }} type="button"><FileDown size={18} /><span><strong>Bulk export</strong><small>CSV or XLSX</small></span><ChevronRight size={15} /></button>
        </div>
      )}
    </div>
  );
}

function StoresScreen() {
  const [stores, setStores] = useState(["Main Store", "Ankara Branch", "Istanbul Depot"]);
  return (
    <div className="app-page">
      <div className="app-page-heading compact"><span className="app-kicker">INDEPENDENT INVENTORY</span><div className="app-title-row"><h3>Stores</h3><span>{stores.length} of 10</span></div></div>
      <button className="app-primary-button app-add-store" disabled={stores.length >= 10} onClick={() => setStores((current) => [...current, `Store ${current.length + 1}`])} type="button"><Plus size={16} /> Add store</button>
      <div className="app-store-list">
        {stores.map((store, index) => <button className="app-store-card" key={store} type="button"><span><Store size={19} /></span><p><strong>{store}</strong><small>{index === 0 ? "MAIN" : `STORE-${index + 1}`}</small></p><ChevronRight size={15} /></button>)}
      </div>
      <p className="app-limit-note">Each store keeps its own SKUs, barcodes, thresholds and quantities.</p>
    </div>
  );
}

function SettingsRoot({ openView }: { openView: (view: SettingsView) => void }) {
  return (
    <div className="app-page">
      <div className="app-page-heading compact"><span className="app-kicker">WORKSPACE</span><h3>Settings</h3></div>
      <div className="app-settings-group">
        <span className="app-group-title">DATA &amp; REPORTS</span>
        <button onClick={() => openView("reports")} type="button"><FileText size={18} /><span><strong>Reports</strong><small>Today to 6 months</small></span><ChevronRight size={15} /></button>
        <button onClick={() => openView("backups")} type="button"><DatabaseBackup size={18} /><span><strong>Backup &amp; restore</strong><small>Schedule or roll back</small></span><ChevronRight size={15} /></button>
        <button onClick={() => openView("transfer")} type="button"><FileUp size={18} /><span><strong>Import / export</strong><small>CSV and Excel</small></span><ChevronRight size={15} /></button>
      </div>
      <div className="app-settings-group">
        <span className="app-group-title">PREFERENCES</span>
        <button type="button"><Settings size={18} /><span><strong>Appearance</strong><small>System theme · Space Grotesk</small></span><ChevronRight size={15} /></button>
        <button type="button"><Barcode size={18} /><span><strong>Product display</strong><small>Comfortable · Badges</small></span><ChevronRight size={15} /></button>
      </div>
    </div>
  );
}

function ReportsScreen({ goBack }: { goBack: () => void }) {
  const [period, setPeriod] = useState<(typeof reportPeriods)[number]>("30d");
  const [generated, setGenerated] = useState(false);
  return (
    <div className="app-subscreen"><PhoneHeader onBack={goBack} title="Reports" /><div className="app-page">
      <span className="app-group-title">REPORT PERIOD</span>
      <div className="app-segments">{reportPeriods.map((item) => <button className={period === item ? "is-active" : ""} key={item} onClick={() => { setPeriod(item); setGenerated(false); }} type="button">{item}</button>)}</div>
      <div className="report-preview"><span><FileText size={22} /></span><p><strong>{generated ? `${period} report ready` : "Inventory report"}</strong><small>{generated ? "PDF · Saved locally" : "Choose a period, then generate"}</small></p>{generated && <Check size={18} />}</div>
      <button className="app-primary-button" onClick={() => setGenerated(true)} type="button">Generate {period} report</button>
      <div className="app-list-heading"><strong>Recent reports</strong><span>Latest 3</span></div>
      <div className="app-card app-report-list"><button type="button"><FileText size={17} /><span><strong>Inventory report</strong><small>30 days · PDF · 48 KB</small></span><MoreHorizontal size={16} /></button><button type="button"><FileText size={17} /><span><strong>Inventory report</strong><small>7 days · PDF · 22 KB</small></span><MoreHorizontal size={16} /></button></div>
    </div></div>
  );
}

function BackupsScreen({ goBack }: { goBack: () => void }) {
  const [scheduled, setScheduled] = useState(true);
  const [confirmRollback, setConfirmRollback] = useState(false);
  const [notice, setNotice] = useState("");
  return (
    <div className="app-subscreen"><PhoneHeader onBack={goBack} title="Backup & restore" /><div className="app-page">
      {notice && <div className="app-success"><Check size={15} />{notice}</div>}
      <div className="backup-card"><span className="backup-icon"><CalendarClock size={20} /></span><p><strong>Scheduled backups</strong><small>One local snapshot per day</small></p><button aria-checked={scheduled} className={scheduled ? "app-switch is-on" : "app-switch"} onClick={() => setScheduled((value) => !value)} role="switch" type="button"><span /></button></div>
      <button className="app-primary-button" onClick={() => setNotice("Local backup created")} type="button"><DatabaseBackup size={16} /> Back up now</button>
      <div className="app-list-heading"><strong>Restore inventory</strong><span>Full rollback</span></div>
      <div className="restore-card"><span><RotateCcw size={20} /></span><p><strong>Choose a backup</strong><small>Validate the file before replacing current inventory.</small></p><button onClick={() => setConfirmRollback(true)} type="button">Choose file</button></div>
    </div>{confirmRollback && <div className="app-sheet" role="alertdialog" aria-modal="true" aria-label="Confirm rollback"><span className="sheet-handle" /><div className="rollback-icon"><RotateCcw size={19} /></div><h4>Replace current inventory?</h4><p className="sheet-copy">This full rollback replaces inventory and audit history with the selected snapshot.</p><button className="app-danger-button" onClick={() => { setConfirmRollback(false); setNotice("Rollback completed"); }} type="button">Confirm rollback</button><button className="app-text-button" onClick={() => setConfirmRollback(false)} type="button">Cancel</button></div>}</div>
  );
}

function TransferScreen({ goBack }: { goBack: () => void }) {
  const [format, setFormat] = useState<"CSV" | "XLSX">("XLSX");
  const [notice, setNotice] = useState("");
  return (
    <div className="app-subscreen"><PhoneHeader onBack={goBack} title="Import / export" /><div className="app-page">
      {notice && <div className="app-success"><Check size={15} />{notice}</div>}
      <span className="app-group-title">FILE FORMAT</span><div className="app-segments two">{(["CSV", "XLSX"] as const).map((item) => <button className={format === item ? "is-active" : ""} key={item} onClick={() => setFormat(item)} type="button">{item}</button>)}</div>
      <div className="transfer-stack"><button onClick={() => setNotice(`Ready to choose a ${format} file`)} type="button"><FileUp size={20} /><span><strong>Bulk import</strong><small>Validate all rows before applying changes.</small></span><ChevronRight size={16} /></button><button onClick={() => setNotice(`${format} export prepared`)} type="button"><FileDown size={20} /><span><strong>Bulk export</strong><small>Save or share a local inventory file.</small></span><ChevronRight size={16} /></button></div>
      <p className="app-limit-note">Imports update store quantities atomically and keep a local audit trail.</p>
    </div></div>
  );
}

function SettingsScreen({ initialView, onViewChange }: { initialView: SettingsView; onViewChange: (view: SettingsView) => void }) {
  if (initialView === "reports") return <ReportsScreen goBack={() => onViewChange("root")} />;
  if (initialView === "backups") return <BackupsScreen goBack={() => onViewChange("root")} />;
  if (initialView === "transfer") return <TransferScreen goBack={() => onViewChange("root")} />;
  return <SettingsRoot openView={onViewChange} />;
}

export function IPhoneDemo() {
  const [tab, setTab] = useState<Tab>("home");
  const [settingsView, setSettingsView] = useState<SettingsView>("root");
  const navigate = (nextTab: Tab, view: SettingsView = "root") => { setTab(nextTab); setSettingsView(view); };
  return (
    <div className="interactive-demo">
      <div className="demo-caption"><span className="status-dot" /> Interactive app preview</div>
      <div className="iphone-device"><span className="iphone-button iphone-button-one" aria-hidden="true" /><span className="iphone-button iphone-button-two" aria-hidden="true" /><span className="iphone-button iphone-button-three" aria-hidden="true" />
        <div className="iphone-screen">
          <div className="iphone-status"><strong>9:41</strong><span className="dynamic-island" /><span className="status-glyphs"><i /><i /><b /></span></div>
          <PhoneHeader />
          <main className="iphone-content">{tab === "home" && <HomeScreen onNavigate={navigate} />}{tab === "products" && <ProductsScreen />}{tab === "stores" && <StoresScreen />}{tab === "settings" && <SettingsScreen initialView={settingsView} onViewChange={setSettingsView} />}</main>
          <nav aria-label="App preview navigation" className="app-bottom-nav">{navItems.map(({ id, label, icon: Icon }) => <button aria-current={tab === id ? "page" : undefined} className={tab === id ? "is-active" : ""} key={id} onClick={() => navigate(id)} type="button"><span><Icon size={17} /></span><small>{label}</small></button>)}</nav>
          <span className="home-indicator" aria-hidden="true" />
        </div>
      </div>
      <p className="demo-hint">Try the navigation, scanner, reports and backup controls.</p>
    </div>
  );
}
