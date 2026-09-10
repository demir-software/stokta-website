import { Barcode, Box, Grid3X3, Type } from "lucide-react";
import { BrandLockup, BrandMark, SiteFooter, SiteHeader } from "./site-chrome";

const palette = [
  { name: "White", hex: "#FFFFFF", use: "Backgrounds and raised surfaces", dark: false },
  { name: "Silver", hex: "#969696", use: "Faint content and secondary artwork", dark: false },
  { name: "Mid", hex: "#747474", use: "Muted text and in-stock states", dark: true },
  { name: "Dark", hex: "#585858", use: "Secondary icon ink", dark: true },
  { name: "Charcoal", hex: "#383737", use: "Secondary text and low-stock states", dark: true },
  { name: "Ink", hex: "#151313", use: "Primary ink, actions and out-of-stock states", dark: true },
] as const;

const principles = [
  { icon: Barcode, title: "Operational clarity", body: "The barcode mark signals inventory immediately. Interfaces stay direct, legible and task-focused." },
  { icon: Grid3X3, title: "Measured structure", body: "Thin rules, orderly grids and consistent spacing make dense stock information easy to scan." },
  { icon: Box, title: "Local confidence", body: "A restrained grayscale system keeps attention on quantities, product states and user-controlled data." },
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
            <p>A practical identity built from barcode geometry, high-contrast neutrals and typography that separates action from inventory data.</p>
            <span>Brand reference · Version 1.0</span>
          </div>
        </section>

        <section className="brand-section brand-section-dark">
          <div className="brand-section-heading"><span className="eyebrow eyebrow-on-dark">01 · Logo system</span><h2>A mark made for stock.</h2><p>The Stokta mark combines a compact container with barcode lines and two quiet inventory rows.</p></div>
          <div className="logo-grid">
            <article className="logo-card logo-card-light"><span>Primary lockup</span><div className="brand-page-lockup"><BrandLockup markSize={76} /></div><small>Use on white and light neutral surfaces.</small></article>
            <article className="logo-card logo-card-dark"><span>Reversed lockup</span><div className="brand-page-lockup is-reversed"><BrandLockup markSize={76} /></div><small>Use the reversed treatment on Ink.</small></article>
            <article className="logo-card logo-card-mark"><span>Barcode mark</span><BrandMark size={128} /><small>Use alone where the Stokta name is already clear.</small></article>
          </div>
          <p className="brand-rule">Keep clear space around the mark equal to at least one quarter of its width. Do not recolor, stretch, rotate or redraw the barcode geometry.</p>
        </section>

        <section className="brand-section">
          <div className="brand-section-heading"><span className="eyebrow">02 · Color palette</span><h2>Six neutrals. Clear hierarchy.</h2><p>Stokta uses grayscale contrast to distinguish content, state and action without visual noise.</p></div>
          <div className="palette-grid">
            {palette.map((color) => <article className={color.dark ? "palette-card is-dark" : "palette-card"} key={color.hex} style={{ backgroundColor: color.hex }}><div><strong>{color.name}</strong><code>{color.hex}</code></div><p>{color.use}</p></article>)}
          </div>
        </section>

        <section className="brand-section brand-type-section">
          <div className="brand-section-heading"><span className="eyebrow">03 · Typefaces</span><h2>Voice, reading and data.</h2><p>Each font has one job, producing a system that feels expressive without compromising operational clarity.</p></div>
          <div className="type-grid">
            <article className="type-card font-outfit"><span><Type aria-hidden="true" size={19} /> Display and actions</span><strong>Outfit</strong><p>Inventory without the detour.</p><small>Headings · product names · buttons · navigation</small></article>
            <article className="type-card font-mulish"><span><Type aria-hidden="true" size={19} /> Reading</span><strong>Mulish</strong><p>Clear descriptions for everyday inventory work.</p><small>Body copy · descriptions · settings · inputs</small></article>
            <article className="type-card font-jetbrains"><span><Type aria-hidden="true" size={19} /> Inventory data</span><strong>JetBrains Mono</strong><p>MAIN · SKU-001 · 8691000000084 · 126</p><small>Codes · barcodes · quantities · dates · metadata</small></article>
          </div>
        </section>

        <section className="brand-section brand-principles-section">
          <div className="brand-section-heading"><span className="eyebrow eyebrow-on-dark">04 · Brand style</span><h2>Quiet enough for daily work.</h2><p>Stokta’s identity should always make the next inventory action obvious.</p></div>
          <div className="principle-grid">{principles.map(({ icon: Icon, title, body }, index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><Icon aria-hidden="true" size={24} /><h3>{title}</h3><p>{body}</p></article>)}</div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
