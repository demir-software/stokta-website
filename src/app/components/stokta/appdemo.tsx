import { useState } from "react";
import { Home, Package, Store, Settings as SettingsIcon, ScanLine, X } from "lucide-react";
import { C, FONT } from "./tokens";
import { StoktaMark, BottomSheet } from "./ui";
import { HomeScreen, ProductsScreen, StoresScreen, SettingsScreen } from "./screens";

type Tab = "home" | "products" | "stores" | "settings";

const NAV: { id: Tab; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "products", label: "Products", icon: Package },
  { id: "stores", label: "Stores", icon: Store },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

const SCREEN_W = 384;
const SCREEN_H = 832;

// ─── The app screen only (no device chrome) ───────────────────────
export function AppScreen({ initialTab = "home" }: { initialTab?: Tab }) {
  const [tab, setTab] = useState<Tab>(initialTab);
  const [scan, setScan] = useState(false);

  return (
    <div style={{ width: SCREEN_W, height: SCREEN_H, background: C.bg, overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>
      {/* Status bar (leaves room for the Dynamic Island) */}
      <div style={{ height: 54, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 30px 0 28px", flexShrink: 0 }}>
        <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 16, color: C.ink }}>11:20</span>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          {[4, 7, 10, 13].map((h, i) => <div key={i} style={{ width: 3, height: h, background: C.ink, borderRadius: 1 }} />)}
          <div style={{ width: 22, height: 11, border: `1.5px solid ${C.ink}`, borderRadius: 3, marginLeft: 5, padding: "0 1.5px", display: "flex", alignItems: "center" }}>
            <div style={{ flex: 1, height: 6, background: C.ink, borderRadius: 1 }} />
          </div>
        </div>
      </div>

      {/* Header */}
      <header style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 18px 12px", borderBottom: `1px solid ${C.hairline}`, flexShrink: 0 }}>
        <StoktaMark size={26} />
        <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 18, color: C.ink, letterSpacing: "-0.015em" }}>Stokta</span>
      </header>

      {/* Screens */}
      <main style={{ flex: 1, overflowY: "auto" }}>
        {tab === "home" && <HomeScreen />}
        {tab === "products" && <ProductsScreen onScan={() => setScan(true)} />}
        {tab === "stores" && <StoresScreen />}
        {tab === "settings" && <SettingsScreen />}
      </main>

      {/* Bottom nav */}
      <nav style={{ display: "flex", padding: "8px 10px 12px", borderTop: `1px solid ${C.hairline}`, background: C.bg, flexShrink: 0 }}>
        {NAV.map(({ id, label, icon: Icon }) => {
          const active = tab === id;
          return (
            <button key={id} onClick={() => setTab(id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", padding: "6px 0" }}>
              <span style={{ width: 44, height: 30, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", background: active ? C.ink : "transparent", transition: "background 0.18s" }}>
                <Icon size={20} color={active ? C.onPrimary : C.muted} strokeWidth={active ? 2.4 : 2} />
              </span>
              <span style={{ fontFamily: FONT.display, fontWeight: active ? 700 : 500, fontSize: 11, color: active ? C.ink : C.muted }}>{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Home indicator */}
      <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: 132, height: 5, borderRadius: 3, background: C.ink, opacity: 0.85 }} />

      {/* Scan sheet */}
      <BottomSheet open={scan} onClose={() => setScan(false)} title="Scan barcode">
        <div style={{ borderRadius: 16, overflow: "hidden", background: "#151313", aspectRatio: "4 / 3", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", inset: 26, border: "2px solid rgba(255,255,255,0.35)", borderRadius: 12 }} />
          <div style={{ position: "absolute", left: 26, right: 26, height: 2, background: C.low, boxShadow: `0 0 14px ${C.low}` }} />
          <ScanLine size={40} color="rgba(255,255,255,0.5)" />
        </div>
        <p style={{ fontFamily: FONT.body, fontSize: 14, color: C.muted, textAlign: "center", margin: "16px 0 4px" }}>
          Point the camera at a product barcode.
        </p>
        <button onClick={() => setScan(false)} style={{ display: "inline-flex", alignItems: "center", gap: 6, margin: "8px auto 0", background: "none", border: "none", cursor: "pointer", fontFamily: FONT.display, fontWeight: 600, fontSize: 14, color: C.inkSoft }}>
          <X size={15} /> Enter code manually
        </button>
      </BottomSheet>
    </div>
  );
}

// ─── iPhone 17 Pro device frame wrapping the live app ─────────────
export function IPhone({ initialTab = "home", scale = 1 }: { initialTab?: Tab; scale?: number }) {
  const RAIL = 11;   // titanium rail thickness
  const BEZEL = 12;  // black bezel between rail and screen
  const SCREEN_R = 52;
  const outerW = SCREEN_W + (RAIL + BEZEL) * 2;
  const outerH = SCREEN_H + (RAIL + BEZEL) * 2;

  const sideBtn = { position: "absolute" as const, background: "linear-gradient(180deg,#4a4948,#2c2b2a)", borderRadius: 2 };

  return (
    <div style={{ width: outerW * scale, height: outerH * scale, flexShrink: 0 }}>
      <div style={{ width: outerW, height: outerH, transform: `scale(${scale})`, transformOrigin: "top left", position: "relative" }}>
        {/* Titanium rail */}
        <div style={{ position: "absolute", inset: 0, borderRadius: SCREEN_R + RAIL + BEZEL, background: "linear-gradient(135deg,#57565400 0%,#57565400 100%), linear-gradient(160deg,#6c6b69 0%,#38373722 12%,#2b2a29 50%,#3a3938 88%,#6f6e6c 100%)", boxShadow: "0 50px 100px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.08)" }} />
        {/* Side buttons */}
        <div style={{ ...sideBtn, left: -2, top: 168, width: 3, height: 34 }} />
        <div style={{ ...sideBtn, left: -2, top: 226, width: 3, height: 58 }} />
        <div style={{ ...sideBtn, left: -2, top: 300, width: 3, height: 58 }} />
        <div style={{ ...sideBtn, right: -2, top: 250, width: 3, height: 92 }} />

        {/* Black bezel */}
        <div style={{ position: "absolute", inset: RAIL, borderRadius: SCREEN_R + BEZEL, background: "#0a0908" }} />

        {/* Screen */}
        <div style={{ position: "absolute", inset: RAIL + BEZEL, borderRadius: SCREEN_R, overflow: "hidden", background: C.bg }}>
          <AppScreen initialTab={initialTab} />
          {/* Dynamic Island */}
          <div style={{ position: "absolute", top: 13, left: "50%", transform: "translateX(-50%)", width: 118, height: 33, borderRadius: 999, background: "#050505", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 10, zIndex: 60 }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#161616", boxShadow: "inset 0 0 0 1.5px #262626" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
