import {
  ScanLine, Boxes, TriangleAlert, Store as StoreIcon, FileText, WifiOff,
  Check, Apple, Play,
} from "lucide-react";
import { C, FONT } from "./tokens";
import { StoktaMark } from "./ui";
import { IPhone } from "./appdemo";

const MONO_LABEL = { fontFamily: FONT.mono, fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase" as const };

// dark-section palette (monochrome)
const D = {
  text: "#ffffff",
  muted: "rgba(255,255,255,0.62)",
  faint: "rgba(255,255,255,0.42)",
  border: "rgba(255,255,255,0.14)",
  hair: "rgba(255,255,255,0.10)",
  card: "rgba(255,255,255,0.05)",
};

function StoreBadge({ icon, sub, main, invert }: { icon: React.ReactNode; sub: string; main: string; invert?: boolean }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: invert ? "#fff" : C.ink, color: invert ? C.ink : "#fff", borderRadius: 12, padding: "9px 16px" }}>
      {icon}
      <div style={{ textAlign: "left", lineHeight: 1.1 }}>
        <div style={{ fontFamily: FONT.body, fontSize: 10, opacity: 0.6 }}>{sub}</div>
        <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 16 }}>{main}</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
export function ShowcaseSite({ onDocs }: { onDemo: () => void; onDocs: () => void }) {
  const features = [
    { icon: ScanLine, title: "Barcode scanning", body: "Point, scan, done. Add or adjust stock in seconds with the camera — no keyboard, no lag." },
    { icon: Boxes, title: "Inventory tracking", body: "Live quantities across every product, with a running history of every entry and exit." },
    { icon: TriangleAlert, title: "Stock control", body: "Low-stock thresholds surface what needs reordering before you run out." },
    { icon: StoreIcon, title: "Multi-store", body: "Independent SKUs and quantities per location, switchable from a single tap." },
    { icon: FileText, title: "Reports & export", body: "Generate inventory reports and export to Excel, CSV, or the cloud in one action." },
    { icon: WifiOff, title: "Fully offline", body: "Everything works with zero connection. Cloud sync is optional, never required." },
  ];

  const steps = [
    { n: "01", t: "Scan a barcode", d: "The camera reads the code and pulls up the product instantly." },
    { n: "02", t: "Adjust the count", d: "Log an entry or exit. Stock levels update the moment you confirm." },
    { n: "03", t: "Stay ahead", d: "Low-stock flags and reports keep the whole warehouse in order." },
  ];

  return (
    <div style={{ background: C.ink, color: D.text, fontFamily: FONT.body, minHeight: "100vh" }}>

      {/* ═══ WHITE HEAD (nav + hero) ═══ */}
      <div style={{ background: C.bg, color: C.ink }}>
        {/* NAV — centered logo + title */}
        <header style={{ position: "sticky", top: 0, zIndex: 30, background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: `1px solid ${C.hairline}` }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: 11 }}>
            <StoktaMark size={30} />
            <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 21, letterSpacing: "-0.015em" }}>Stokta</span>
          </div>
        </header>

        {/* HERO */}
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "64px 24px 72px", display: "grid", gridTemplateColumns: "1fr 420px", gap: 40, alignItems: "center" }} className="stk-hero">
          <div style={{ minWidth: 0 }}>
            <span style={{ ...MONO_LABEL, color: C.faint, display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${C.border}`, borderRadius: 999, padding: "6px 12px", marginBottom: 24 }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: C.ink }} /> Stock · Simple · Sorted
            </span>
            <h1 style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: "clamp(38px, 5.5vw, 64px)", lineHeight: 1.03, letterSpacing: "-0.03em", margin: "0 0 20px" }}>
              The whole warehouse, in your pocket.
            </h1>
            <p style={{ fontFamily: FONT.body, fontSize: 18, lineHeight: 1.6, color: C.muted, maxWidth: "46ch", margin: "0 0 30px" }}>
              Stokta is a barcode-first stock manager for small teams. Scan, track, and control inventory across every store — fast, minimal, and fully offline.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <StoreBadge icon={<Apple size={18} />} sub="Download on the" main="App Store" />
              <StoreBadge icon={<Play size={16} />} sub="Get it on" main="Google Play" />
            </div>
          </div>

          {/* live iPhone 17 Pro */}
          <div style={{ display: "flex", justifyContent: "center", minWidth: 0 }} className="stk-hero-phone">
            <IPhone scale={0.66} />
          </div>
        </section>
      </div>

      {/* ═══ BLACK BODY ═══ */}

      {/* FEATURES */}
      <section id="features" style={{ maxWidth: 1120, margin: "0 auto", padding: "88px 24px" }}>
        <p style={{ ...MONO_LABEL, color: D.faint, margin: "0 0 14px" }}>Everything you need</p>
        <h2 style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: "clamp(28px,4vw,42px)", letterSpacing: "-0.025em", margin: "0 0 12px", maxWidth: "18ch" }}>
          Built for the messy reality of a stockroom.
        </h2>
        <p style={{ fontFamily: FONT.body, fontSize: 17, color: D.muted, maxWidth: "52ch", margin: "0 0 44px" }}>
          Six focused tools, one calm interface. No dashboards you'll never open.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {features.map(({ icon: Icon, title, body }) => (
            <div key={title} style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 18, padding: 24 }}>
              <span style={{ width: 44, height: 44, borderRadius: 12, background: "#fff", color: C.ink, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                <Icon size={21} />
              </span>
              <h3 style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 20, letterSpacing: "-0.015em", margin: "0 0 8px", color: D.text }}>{title}</h3>
              <p style={{ fontFamily: FONT.body, fontSize: 15, lineHeight: 1.6, color: D.muted, margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 24px 88px" }}>
        <p style={{ ...MONO_LABEL, color: D.faint, margin: "0 0 14px" }}>How it works</p>
        <h2 style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: "clamp(28px,4vw,42px)", letterSpacing: "-0.025em", margin: "0 0 48px", maxWidth: "16ch" }}>
          From shelf to sorted in three steps.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {steps.map((s) => (
            <div key={s.n} style={{ borderTop: `1px solid ${D.border}`, paddingTop: 22 }}>
              <span style={{ fontFamily: FONT.mono, fontSize: 14, color: D.faint, letterSpacing: "0.1em" }}>{s.n}</span>
              <h3 style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 23, letterSpacing: "-0.02em", margin: "14px 0 8px" }}>{s.t}</h3>
              <p style={{ fontFamily: FONT.body, fontSize: 15, lineHeight: 1.6, color: D.muted, margin: 0 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px 88px" }}>
        <div style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 28, padding: "clamp(40px,6vw,72px)", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}><StoktaMark size={56} /></div>
          <h2 style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: "clamp(30px,5vw,52px)", letterSpacing: "-0.03em", margin: "0 0 16px" }}>
            Take control of your stock today.
          </h2>
          <p style={{ fontFamily: FONT.body, fontSize: 18, color: D.muted, maxWidth: "44ch", margin: "0 auto 32px" }}>
            Free to try, works offline, and respects your data. No account required to start.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <StoreBadge invert icon={<Apple size={18} />} sub="Download on the" main="App Store" />
            <StoreBadge invert icon={<Play size={16} />} sub="Get it on" main="Google Play" />
          </div>
          <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", marginTop: 32 }}>
            {["No sign-up", "Offline-first", "Excel & CSV export"].map((t) => (
              <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: FONT.body, fontSize: 14, color: D.muted }}>
                <Check size={15} /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${D.hair}` }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "36px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <StoktaMark size={26} />
            <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 17 }}>Stokta</span>
          </div>
          <span style={{ fontFamily: FONT.mono, fontSize: 12, color: D.faint, letterSpacing: "0.04em" }}>© 2026 Demir Software · Built to be self-hosted</span>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <a href="#privacy" style={{ fontFamily: FONT.body, fontWeight: 600, fontSize: 14, color: D.muted, textDecoration: "none" }}>Privacy Policy</a>
            <a href="#terms" style={{ fontFamily: FONT.body, fontWeight: 600, fontSize: 14, color: D.muted, textDecoration: "none" }}>Terms &amp; Conditions</a>
            <button onClick={onDocs} style={{ fontFamily: FONT.body, fontWeight: 600, fontSize: 14, color: D.muted, background: "none", border: "none", cursor: "pointer" }}>Brand guide</button>
          </div>
        </div>
      </footer>

      {/* responsive rules inline styles can't express */}
      <style>{`
        @media (max-width: 900px) {
          .stk-hero { grid-template-columns: 1fr !important; gap: 8px !important; }
          .stk-hero-phone { margin-top: 8px; }
        }
      `}</style>
    </div>
  );
}
