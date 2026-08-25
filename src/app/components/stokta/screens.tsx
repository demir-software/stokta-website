import { useMemo, useState } from "react";
import {
  Package, Boxes, TriangleAlert, Store as StoreIcon, ArrowRight, Search, Plus,
  ScanLine, ArrowUpDown, MoreHorizontal, Upload, FileDown, CloudUpload, ChevronLeft,
  FileText, Share2, RefreshCw, Trash2, Pencil, Copy, Sun, Type, LayoutGrid,
  Languages, Database, Puzzle, Accessibility, Info, Code2, Eye, ChevronDown, Check,
} from "lucide-react";
import { C, FONT, stockOf, STOCK_META } from "./tokens";
import { PRODUCTS, ACTIVITY, STORES, REPORTS, INTEGRATIONS, Product } from "./data";
import {
  StoktaMark, PrimaryButton, SecondaryButton, IconButton, SectionHeader, Meta,
  StatusBadge, BottomSheet, MenuRow, MenuGroupLabel, Segmented, SettingsGroup,
  SettingsRow, Toggle, ProviderLogo, EmptyState,
} from "./ui";

type SortKey = "name" | "qty" | "recent" | "low";

// ═══ HOME ═════════════════════════════════════════════════════════
export function HomeScreen() {
  const metrics = [
    { icon: <Package size={17} />, label: "Products", value: "8" },
    { icon: <Boxes size={17} />, label: "Total units", value: "266" },
    { icon: <TriangleAlert size={17} />, label: "Low stock", value: "4", warn: true },
    { icon: <StoreIcon size={17} />, label: "Active stores", value: "1" },
  ];
  return (
    <div style={{ padding: "18px 18px 8px" }}>
      <h1 style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 29, color: C.ink, letterSpacing: "-0.02em", marginBottom: 2 }}>
        Inventory
      </h1>
      <p style={{ fontFamily: FONT.body, fontSize: 14, color: C.muted, marginBottom: 18 }}>
        Overview of your stock right now.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
        {metrics.map((m) => (
          <div key={m.label} style={{ background: C.raised, border: `1px solid ${m.warn ? C.lowBg : C.border}`, borderRadius: 14, padding: "13px 14px", display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ color: m.warn ? C.low : C.inkSoft, display: "flex" }}>{m.icon}</span>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
              <span style={{ fontFamily: FONT.body, fontSize: 13, color: C.muted }}>{m.label}</span>
              <span style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 24, color: m.warn ? C.low : C.ink, letterSpacing: "-0.02em", lineHeight: 1 }}>{m.value}</span>
            </div>
          </div>
        ))}
      </div>

      <SectionHeader action={<button style={{ background: "none", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4, fontFamily: FONT.display, fontWeight: 600, fontSize: 13, color: C.inkSoft }}>View activity <ArrowRight size={13} /></button>}>
        Recent activity
      </SectionHeader>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {ACTIVITY.map((a, i) => {
          const up = a.delta > 0;
          return (
            <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 2px", borderBottom: i === ACTIVITY.length - 1 ? "none" : `1px solid ${C.hairline}` }}>
              <span style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, background: up ? C.inStockBg : C.outBg, color: up ? C.inStock : C.out, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.mono, fontWeight: 600, fontSize: 13, letterSpacing: "-0.02em" }}>
                {up ? "+" : "−"}{Math.abs(a.delta)}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: FONT.body, fontWeight: 600, fontSize: 14.5, color: C.ink, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.product}</p>
                <Meta>{a.store} · {a.when}</Meta>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══ PRODUCTS ═════════════════════════════════════════════════════
export function ProductsScreen({ onScan }: { onScan: () => void }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("name");
  const [showSort, setShowSort] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [store, setStore] = useState<string>("ALL");
  const [showStores, setShowStores] = useState(false);

  const storeLabel = store === "ALL" ? "All stores" : (STORES.find((s) => s.code === store)?.name ?? store);

  const rows = useMemo(() => {
    let list = PRODUCTS.filter(
      (p) =>
        (store === "ALL" || p.store === store) &&
        [p.name, p.sku, p.code, p.barcode].some((f) => f.toLowerCase().includes(query.toLowerCase()))
    );
    const by: Record<SortKey, (a: Product, b: Product) => number> = {
      name: (a, b) => a.name.localeCompare(b.name),
      qty: (a, b) => b.qty - a.qty,
      recent: () => 0,
      low: (a, b) => a.qty - b.qty,
    };
    return [...list].sort(by[sort]);
  }, [query, sort, store]);

  const sortLabel: Record<SortKey, string> = { name: "Name", qty: "Quantity", recent: "Recent", low: "Low first" };

  return (
    <div style={{ padding: "14px 18px 8px" }}>
      {/* Store selector */}
      <button
        onClick={() => setShowStores(true)}
        style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 999, padding: "7px 12px 7px 10px", cursor: "pointer", marginBottom: 12 }}
      >
        <StoreIcon size={16} color={C.inkSoft} />
        <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 14, color: C.ink, letterSpacing: "-0.01em" }}>{storeLabel}</span>
        <ChevronDown size={15} color={C.muted} />
      </button>

      {/* Search */}
      <div style={{ display: "flex", alignItems: "center", gap: 9, background: C.raised, border: `1px solid ${C.border}`, borderRadius: 12, padding: "0 12px", marginBottom: 12 }}>
        <Search size={17} color={C.muted} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, SKU, or barcode"
          style={{ flex: 1, border: "none", background: "none", outline: "none", padding: "12px 0", fontFamily: FONT.body, fontSize: 15, color: C.ink }}
        />
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <SecondaryButton active><Plus size={16} /> Add</SecondaryButton>
        <SecondaryButton onClick={onScan}><ScanLine size={16} /> Scan</SecondaryButton>
        <SecondaryButton onClick={() => setShowSort(true)}><ArrowUpDown size={15} /> {sortLabel[sort]}</SecondaryButton>
        <div style={{ marginLeft: "auto" }}>
          <IconButton label="More actions" onClick={() => setShowActions(true)}><MoreHorizontal size={18} /></IconButton>
        </div>
      </div>

      {/* List */}
      <div>
        {rows.map((p, i) => {
          const st = stockOf(p.qty);
          const meta = STOCK_META[st];
          return (
            <div key={p.id} style={{ padding: "12px 2px", borderBottom: i === rows.length - 1 ? "none" : `1px solid ${C.hairline}` }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <p style={{ flex: 1, fontFamily: FONT.display, fontWeight: 600, fontSize: 16, color: C.ink, letterSpacing: "-0.01em" }}>{p.name}</p>
                <span style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 18, color: st === "in" ? C.ink : meta.color, letterSpacing: "-0.02em" }}>{p.qty}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 3, gap: 8 }}>
                <Meta>{p.sku} · {p.store} · {p.barcode}</Meta>
                {st !== "in" ? <StatusBadge {...meta} /> : <StatusBadge {...meta} dotOnly />}
              </div>
            </div>
          );
        })}
        {rows.length === 0 && (
          <EmptyState icon={<Search size={30} />} title="No products found" body={`Nothing matches “${query}”.`} />
        )}
      </div>

      {/* Store picker sheet */}
      <BottomSheet open={showStores} onClose={() => setShowStores(false)} title="Select store">
        {[{ code: "ALL", name: "All stores", meta: `${PRODUCTS.length} products` }, ...STORES.map((s) => ({ code: s.code, name: s.name, meta: `${s.code} · ${s.products} products` }))].map((s, i, arr) => {
          const active = store === s.code;
          return (
            <button key={s.code} onClick={() => { setStore(s.code); setShowStores(false); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, background: "none", border: "none", cursor: "pointer", padding: "13px 4px", borderBottom: i === arr.length - 1 ? "none" : `1px solid ${C.hairline}`, textAlign: "left" }}>
              <span style={{ width: 34, height: 34, borderRadius: 9, background: C.surface, color: C.inkSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <StoreIcon size={17} />
              </span>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 15, color: C.ink }}>{s.name}</p>
                <Meta>{s.meta}</Meta>
              </div>
              {active && <Check size={18} color={C.ink} />}
            </button>
          );
        })}
      </BottomSheet>

      {/* Sort sheet */}
      <BottomSheet open={showSort} onClose={() => setShowSort(false)} title="Sort products">
        {(["name", "qty", "recent", "low"] as SortKey[]).map((k) => (
          <button key={k} onClick={() => { setSort(k); setShowSort(false); }} style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "13px 4px", fontFamily: FONT.body, fontWeight: 600, fontSize: 15, color: C.ink, borderBottom: `1px solid ${C.hairline}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {{ name: "Name", qty: "Quantity", recent: "Recently updated", low: "Low stock first" }[k]}
            {sort === k && <span style={{ color: C.inkSoft }}>✓</span>}
          </button>
        ))}
      </BottomSheet>

      {/* Inventory actions sheet */}
      <BottomSheet open={showActions} onClose={() => setShowActions(false)} title="Inventory actions">
        <MenuGroupLabel>Import data</MenuGroupLabel>
        <MenuRow icon={<Upload size={19} />} label="Import Excel" onClick={() => setShowActions(false)} />
        <MenuRow icon={<Upload size={19} />} label="Import CSV" onClick={() => setShowActions(false)} />
        <div style={{ height: 1, background: C.hairline, margin: "6px 0" }} />
        <MenuGroupLabel>Export</MenuGroupLabel>
        <MenuRow icon={<FileDown size={19} />} label="Export Excel" onClick={() => setShowActions(false)} />
        <MenuRow icon={<FileDown size={19} />} label="Export CSV" onClick={() => setShowActions(false)} />
        <div style={{ height: 1, background: C.hairline, margin: "6px 0" }} />
        <MenuGroupLabel>Export to cloud</MenuGroupLabel>
        <MenuRow icon={<CloudUpload size={19} />} label="Google Drive" onClick={() => setShowActions(false)} />
        <MenuRow icon={<CloudUpload size={19} />} label="Microsoft OneDrive" onClick={() => setShowActions(false)} />
        <MenuRow icon={<CloudUpload size={19} />} label="Yandex Disk" onClick={() => setShowActions(false)} />
      </BottomSheet>
    </div>
  );
}

// ═══ STORES ═══════════════════════════════════════════════════════
export function StoresScreen() {
  const [showAdd, setShowAdd] = useState(false);
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  return (
    <div style={{ padding: "18px 18px 8px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
        <h1 style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 29, color: C.ink, letterSpacing: "-0.02em" }}>Stores</h1>
        <SecondaryButton active onClick={() => setShowAdd(true)}><Plus size={16} /> Add</SecondaryButton>
      </div>
      <p style={{ fontFamily: FONT.body, fontSize: 14, color: C.muted, marginBottom: 4 }}>
        Each store keeps independent SKUs and quantities.
      </p>
      <Meta>1 of 10 stores</Meta>

      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        {STORES.map((s) => (
          <div key={s.id} role="button" style={{ background: C.raised, border: `1px solid ${C.border}`, borderRadius: 14, padding: 14, cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 40, height: 40, borderRadius: 10, background: C.surface, color: C.inkSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <StoreIcon size={19} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 17, color: C.ink, letterSpacing: "-0.01em" }}>{s.name}</p>
                <Meta>{s.code}</Meta>
              </div>
              <button aria-label="Store options" onClick={(e) => { e.stopPropagation(); setMenuFor(s.id); }} style={{ width: 34, height: 34, borderRadius: 9, border: "none", background: "transparent", color: C.muted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MoreHorizontal size={18} />
              </button>
            </div>
            <div style={{ marginTop: 11, paddingTop: 11, borderTop: `1px solid ${C.hairline}` }}>
              <Meta>{s.products} products · {s.units} units · {s.low} low</Meta>
            </div>
          </div>
        ))}
      </div>

      {/* Store overflow menu */}
      <BottomSheet open={!!menuFor} onClose={() => setMenuFor(null)} title="Main Store">
        <MenuRow icon={<Pencil size={19} />} label="Edit" onClick={() => setMenuFor(null)} />
        <MenuRow icon={<Copy size={19} />} label="Duplicate" onClick={() => setMenuFor(null)} />
        <div style={{ height: 1, background: C.hairline, margin: "6px 0" }} />
        <MenuRow icon={<Trash2 size={19} />} label="Delete store" destructive onClick={() => setMenuFor(null)} />
      </BottomSheet>

      {/* Add store sheet */}
      <BottomSheet open={showAdd} onClose={() => setShowAdd(false)} title="Add store">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Field label="Store name" value={name} onChange={setName} placeholder="e.g. Warehouse B" />
          <Field label="Store code" value={code} onChange={setCode} placeholder="e.g. WH-B" mono />
          <div style={{ marginTop: 6 }}>
            <PrimaryButton full onClick={() => { setShowAdd(false); setName(""); setCode(""); }}>Create store</PrimaryButton>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, mono }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; mono?: boolean }) {
  return (
    <label style={{ display: "block" }}>
      <span style={{ fontFamily: FONT.body, fontWeight: 600, fontSize: 13, color: C.muted, display: "block", marginBottom: 6 }}>{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: "100%", boxSizing: "border-box", border: `1px solid ${C.border}`, background: C.raised, borderRadius: 11, padding: "13px 14px", fontFamily: mono ? FONT.mono : FONT.body, fontSize: 15, color: C.ink, outline: "none" }}
      />
    </label>
  );
}

// ═══ SETTINGS (+ subscreens) ══════════════════════════════════════
type SettingsSub = "root" | "reports" | "integrations" | "inventory" | "appearance" | "language";

export function SettingsScreen() {
  const [sub, setSub] = useState<SettingsSub>("root");
  const [dark, setDark] = useState(false);
  const [theme, setTheme] = useState<"system" | "light" | "dark">("system");
  const [textSize, setTextSize] = useState<"small" | "standard" | "large">("standard");
  const [density, setDensity] = useState<"compact" | "comfortable">("comfortable");
  const [contrast, setContrast] = useState<"standard" | "high">("standard");
  const [haptics, setHaptics] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [rowDensity, setRowDensity] = useState<"compact" | "comfortable">("comfortable");
  const [indicator, setIndicator] = useState<"dot" | "badge">("badge");
  const [showSku, setShowSku] = useState(true);
  const [showBarcode, setShowBarcode] = useState(true);
  const [showStoreCode, setShowStoreCode] = useState(true);

  if (sub !== "root") {
    const titles: Record<Exclude<SettingsSub, "root">, string> = {
      reports: "Reports", integrations: "Integrations", inventory: "Inventory display",
      appearance: "Appearance", language: "Language & region",
    };
    return (
      <div style={{ padding: "14px 18px 8px" }}>
        <button onClick={() => setSub("root")} style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", fontFamily: FONT.display, fontWeight: 600, fontSize: 15, color: C.inkSoft, marginBottom: 14 }}>
          <ChevronLeft size={18} /> Settings
        </button>
        <h1 style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 26, color: C.ink, letterSpacing: "-0.02em", marginBottom: 18 }}>{titles[sub]}</h1>

        {sub === "reports" && <ReportsView />}
        {sub === "integrations" && <IntegrationsView />}

        {sub === "appearance" && (
          <>
            <SettingsGroup title="Theme">
              <div style={{ padding: 12 }}>
                <Segmented value={theme} onChange={setTheme} options={[{ value: "system", label: "System" }, { value: "light", label: "Light" }, { value: "dark", label: "Dark" }]} />
              </div>
            </SettingsGroup>
            <SettingsGroup title="Text size">
              <div style={{ padding: 12 }}>
                <Segmented value={textSize} onChange={setTextSize} options={[{ value: "small", label: "Small" }, { value: "standard", label: "Standard" }, { value: "large", label: "Large" }]} />
              </div>
            </SettingsGroup>
            <SettingsGroup title="Interface density">
              <div style={{ padding: 12 }}>
                <Segmented value={density} onChange={setDensity} options={[{ value: "compact", label: "Compact" }, { value: "comfortable", label: "Comfortable" }]} />
              </div>
            </SettingsGroup>
            <SettingsGroup title="Contrast">
              <div style={{ padding: 12 }}>
                <Segmented value={contrast} onChange={setContrast} options={[{ value: "standard", label: "Standard" }, { value: "high", label: "High" }]} />
              </div>
            </SettingsGroup>
          </>
        )}

        {sub === "inventory" && (
          <>
            <SettingsGroup title="Product row density">
              <div style={{ padding: 12 }}>
                <Segmented value={rowDensity} onChange={setRowDensity} options={[{ value: "compact", label: "Compact" }, { value: "comfortable", label: "Comfortable" }]} />
              </div>
            </SettingsGroup>
            <SettingsGroup title="Visible product information">
              <SettingsRow icon={<Info size={16} />} label="Show SKU" control={<Toggle on={showSku} onChange={setShowSku} />} />
              <SettingsRow icon={<ScanLine size={16} />} label="Show barcode" control={<Toggle on={showBarcode} onChange={setShowBarcode} />} />
              <SettingsRow icon={<StoreIcon size={16} />} label="Show store code" control={<Toggle on={showStoreCode} onChange={setShowStoreCode} />} last />
            </SettingsGroup>
            <SettingsGroup title="Stock indicator">
              <div style={{ padding: 12 }}>
                <Segmented value={indicator} onChange={setIndicator} options={[{ value: "dot", label: "Dot" }, { value: "badge", label: "Badge" }]} />
              </div>
            </SettingsGroup>
          </>
        )}

        {sub === "language" && (
          <SettingsGroup title="Display language">
            <SettingsRow label="English" control={<span style={{ color: C.inkSoft }}>✓</span>} />
            <SettingsRow label="Türkçe" onClick={() => {}} last />
          </SettingsGroup>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: "18px 18px 8px" }}>
      <h1 style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 29, color: C.ink, letterSpacing: "-0.02em", marginBottom: 18 }}>Settings</h1>

      <SettingsGroup title="Appearance">
        <SettingsRow icon={<Sun size={16} />} label="Dark mode" control={<Toggle on={dark} onChange={setDark} />} />
        <SettingsRow icon={<Type size={16} />} label="Theme, text & density" onClick={() => setSub("appearance")} last />
      </SettingsGroup>

      <SettingsGroup title="Inventory display">
        <SettingsRow icon={<LayoutGrid size={16} />} label="Product rows & indicators" onClick={() => setSub("inventory")} last />
      </SettingsGroup>

      <SettingsGroup title="Language & region">
        <SettingsRow icon={<Languages size={16} />} label="Display language" value="English" onClick={() => setSub("language")} last />
      </SettingsGroup>

      <SettingsGroup title="Data & reports">
        <SettingsRow icon={<FileText size={16} />} label="Reports" onClick={() => setSub("reports")} />
        <SettingsRow icon={<Database size={16} />} label="Import / export" onClick={() => {}} />
        <SettingsRow icon={<CloudUpload size={16} />} label="Cloud storage defaults" onClick={() => {}} last />
      </SettingsGroup>

      <SettingsGroup title="Integrations">
        <SettingsRow icon={<Puzzle size={16} />} label="Cloud providers" value="0 connected" onClick={() => setSub("integrations")} last />
      </SettingsGroup>

      <SettingsGroup title="Accessibility & interaction">
        <SettingsRow icon={<Accessibility size={16} />} label="Haptic feedback" control={<Toggle on={haptics} onChange={setHaptics} />} />
        <SettingsRow icon={<Eye size={16} />} label="Reduce motion" control={<Toggle on={reduceMotion} onChange={setReduceMotion} />} last />
      </SettingsGroup>

      <SettingsGroup title="About">
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px" }}>
          <StoktaMark size={38} />
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 17, color: C.ink }}>Stokta</p>
            <Meta>Version 1.0.0</Meta>
          </div>
        </div>
        <div style={{ height: 1, background: C.hairline }} />
        <SettingsRow icon={<Code2 size={16} />} label="Developer" value="Demir Software" onClick={() => {}} />
        <SettingsRow label="Privacy" onClick={() => {}} />
        <SettingsRow label="Licenses" onClick={() => {}} />
        <SettingsRow label="Technical information" onClick={() => {}} last />
      </SettingsGroup>
    </div>
  );
}

// ─── Reports view ─────────────────────────────────────────────────
function ReportsView() {
  const [period, setPeriod] = useState("30d");
  return (
    <>
      <div style={{ background: C.raised, border: `1px solid ${C.border}`, borderRadius: 14, padding: 14, marginBottom: 22 }}>
        <p style={{ fontFamily: FONT.body, fontWeight: 600, fontSize: 13, color: C.muted, marginBottom: 8 }}>Report period</p>
        <Segmented
          value={period}
          onChange={setPeriod}
          options={[
            { value: "today", label: "Today" }, { value: "7d", label: "7d" },
            { value: "30d", label: "30d" }, { value: "3m", label: "3m" }, { value: "6m", label: "6m" },
          ]}
        />
        <div style={{ marginTop: 12 }}>
          <PrimaryButton full>Generate report</PrimaryButton>
        </div>
      </div>

      <SectionHeader action={<button style={{ background: "none", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4, fontFamily: FONT.display, fontWeight: 600, fontSize: 13, color: C.inkSoft }}>View all <ArrowRight size={13} /></button>}>
        Recent reports
      </SectionHeader>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {REPORTS.map((r) => (
          <div key={r.id} style={{ background: C.raised, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 36, height: 36, borderRadius: 9, background: C.surface, color: C.inkSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <FileText size={17} />
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: FONT.display, fontWeight: 600, fontSize: 15, color: C.ink }}>Inventory report</p>
              <Meta>{r.date} · {r.period} · {r.format} · {r.size}</Meta>
            </div>
            <button aria-label="Report options" style={{ width: 32, height: 32, borderRadius: 8, border: "none", background: "transparent", color: C.muted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <MoreHorizontal size={18} />
            </button>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <div style={{ flex: 1 }}><SecondaryButton><Share2 size={15} /> Share</SecondaryButton></div>
        <div style={{ flex: 1 }}><SecondaryButton><CloudUpload size={15} /> Save to cloud</SecondaryButton></div>
      </div>
      <div style={{ height: 8 }} />
      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: FONT.body, fontSize: 12.5, color: C.faint }}>
        <RefreshCw size={12} /> Reports regenerate from current inventory
      </span>
    </>
  );
}

// ─── Integrations view ────────────────────────────────────────────
function IntegrationsView() {
  const [conn, setConn] = useState<Record<string, boolean>>({});
  return (
    <>
      <p style={{ fontFamily: FONT.body, fontSize: 14, color: C.muted, marginBottom: 16, lineHeight: 1.5 }}>
        Optional cloud destinations. Stokta works fully offline without them.
      </p>
      <div style={{ background: C.raised, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
        {INTEGRATIONS.map((p, i) => (
          <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", borderBottom: i === INTEGRATIONS.length - 1 ? "none" : `1px solid ${C.hairline}` }}>
            <span style={{ width: 34, height: 34, borderRadius: 8, background: C.surface, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <ProviderLogo id={p.id} />
            </span>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: FONT.display, fontWeight: 600, fontSize: 15, color: C.ink }}>{p.name}</p>
              <span style={{ fontFamily: FONT.body, fontSize: 13, color: conn[p.id] ? C.inStock : C.muted }}>
                {conn[p.id] ? "Connected" : "Not connected"}
              </span>
            </div>
            <button
              onClick={() => setConn((c) => ({ ...c, [p.id]: !c[p.id] }))}
              style={{ fontFamily: FONT.display, fontWeight: 600, fontSize: 13, border: `1px solid ${C.border}`, background: conn[p.id] ? "transparent" : C.ink, color: conn[p.id] ? C.muted : C.onPrimary, borderRadius: 9, padding: "7px 12px", cursor: "pointer" }}
            >
              {conn[p.id] ? "Disconnect" : "Connect"}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
