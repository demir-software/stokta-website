import { Barcode, Box, Grid3X3, Type } from "lucide-react";
import { BrandLockup, BrandMark, SiteFooter, SiteHeader } from "./site-chrome";

const palette = [
  { name: "Blue", hex: "#4285F4", use: "Primary actions, information, and selected states", dark: true },
  { name: "Red", hex: "#EA4335", use: "Destructive actions and critical status", dark: true },
  { name: "Yellow", hex: "#FBBC05", use: "Warnings and low-stock attention", dark: false },
  { name: "Green", hex: "#34A853", use: "Success and healthy inventory", dark: true },
  { name: "White", hex: "#FFFFFF", use: "Light backgrounds and solid surfaces", dark: false },
  { name: "Ink", hex: "#212121", use: "Primary text and dark surfaces", dark: true },
  { name: "Secondary", hex: "#757575", use: "Secondary text and supporting controls", dark: true },
  { name: "Muted", hex: "#9E9E9E", use: "Metadata and inactive states", dark: true },
  { name: "Border", hex: "#BDBDBD", use: "Visible boundaries and separators", dark: false },
  { name: "Night", hex: "#181818", use: "Dark-mode canvas", dark: true },
] as const;

const principles = [
  { icon: Barcode, title: "Operational clarity", body: "The barcode mark signals inventory immediately. Interfaces stay direct, legible and task-focused." },
  { icon: Grid3X3, title: "Boxy hierarchy", body: "Twelve-to-sixteen-pixel corners, solid controls, and deliberate spacing make dense stock information easy to scan." },
  { icon: Box, title: "Crystal depth", body: "Functional color stays opaque while restrained blur adds depth only to large, meaningful surfaces." },
] as const;

export function BrandPage() {
  return (
    <div className="site-shell subpage-shell brand-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main className="subpage-main" id="main-content">
        <section className="subpage-hero" id="top">
          <div>
            <span className="eyebrow"><span className="status-dot" /> Identity system</span>
            <h1>Stokta,<br />visually.</h1>
          </div>
          <div className="subpage-hero-copy">
            <p>A practical identity built from inventory geometry, exact functional color and restrained ice-crystal depth.</p>
            <span>Brand reference · Version 2.0.1</span>
          </div>
        </section>

        <section className="brand-section brand-section-dark">
          <div className="brand-section-heading"><span className="eyebrow eyebrow-on-dark">01 · Logo system</span><h2>A mark made for stock.</h2><p>Nine compact inventory shards combine the Crystal palette into a focused, app-scale identity.</p></div>
          <div className="logo-grid">
            <article className="logo-card logo-card-light"><span>Primary lockup</span><div className="brand-page-lockup"><BrandLockup markSize={76} /></div><small>Use on white and light neutral surfaces.</small></article>
            <article className="logo-card logo-card-dark"><span>Dark lockup</span><div className="brand-page-lockup is-reversed"><BrandLockup markSize={76} /></div><small>Use on Night and other dark surfaces.</small></article>
            <article className="logo-card logo-card-mark"><span>Inventory mark</span><BrandMark size={128} /><small>Use alone where the Stokta name is already clear.</small></article>
          </div>
          <p className="brand-rule">Keep clear space around the mark equal to at least one quarter of its width. Do not recolor, stretch, rotate or rearrange the shard geometry.</p>
        </section>

        <section className="brand-section">
          <div className="brand-section-heading"><span className="eyebrow">02 · Color palette</span><h2>Functional color. Clear hierarchy.</h2><p>Stokta uses the exact Crystal palette for action, status and structure, with a monochrome mapping when Colorblind mode is selected.</p></div>
          <div className="palette-grid">
            {palette.map((color) => <article className={color.dark ? "palette-card is-dark" : "palette-card"} key={color.hex} style={{ backgroundColor: color.hex }}><div><strong>{color.name}</strong><code>{color.hex}</code></div><p>{color.use}</p></article>)}
          </div>
        </section>

        <section className="brand-section brand-type-section">
          <div className="brand-section-heading"><span className="eyebrow">03 · Typeface</span><h2>One family. One clear voice.</h2><p>Manrope carries the Stokta interface, while IBM Plex Mono is reserved for SKU, quantity and operational metadata.</p></div>
          <div className="type-grid type-grid-single">
            <article className="type-card font-manrope"><span><Type aria-hidden="true" size={19} /> Application typeface</span><strong>Manrope</strong><p>Inventory without the detour.</p><small>Regular · Medium · Semibold · Bold</small></article>
          </div>
        </section>

        <section className="brand-section brand-principles-section">
          <div className="brand-section-heading"><span className="eyebrow eyebrow-on-dark">04 · Brand style</span><h2>Distinct, never distracting.</h2><p>Stokta’s identity should make the next inventory action obvious while still feeling unmistakably its own.</p></div>
          <div className="principle-grid">{principles.map(({ icon: Icon, title, body }, index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><Icon aria-hidden="true" size={24} /><h3>{title}</h3><p>{body}</p></article>)}</div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
