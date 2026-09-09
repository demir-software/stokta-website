import { useState } from "react";
import {
  ArrowRight,
  Barcode,
  Check,
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
  FileText,
  Gauge,
  Languages,
  PackagePlus,
  Palette,
  RotateCcw,
  ScanLine,
  ShieldCheck,
  Store,
} from "lucide-react";
import homeScreenshot from "../../../assets/screenshots/home.png";
import productsScreenshot from "../../../assets/screenshots/products.png";
import scannerScreenshot from "../../../assets/screenshots/scanner.jpg";
import storesScreenshot from "../../../assets/screenshots/stores.png";
import appearanceScreenshot from "../../../assets/screenshots/appearance.png";
import backupScreenshot from "../../../assets/screenshots/backup-restore.png";

const screenshots = [
  {
    label: "Home",
    src: homeScreenshot,
    alt: "Stokta home dashboard showing 24 store-products, 886 total units, 8 low-stock items, 3 active stores, and recent activity.",
    description: "A compact pulse on stock, reports, backups, and recent movement.",
  },
  {
    label: "Products",
    src: productsScreenshot,
    alt: "Stokta product inventory for Main Store with search, add, scan, sort, import, export, quantities, and stock status indicators.",
    description: "Search, scan, sort, import, and export from one focused inventory view.",
  },
  {
    label: "Scanner",
    src: scannerScreenshot,
    alt: "Stokta full-screen barcode scanner with a camera preview and a clear alignment frame.",
    description: "A full-screen scanner built for fast product creation and lookup.",
  },
  {
    label: "Stores",
    src: storesScreenshot,
    alt: "Stokta stores overview showing Ankara Branch, Istanbul Depot, and Main Store with independent quantities and low-stock counts.",
    description: "Each location keeps its own SKUs, quantities, and low-stock count.",
  },
  {
    label: "Appearance",
    src: appearanceScreenshot,
    alt: "Stokta appearance settings for theme, interface font, text size, density, and contrast.",
    description: "Theme, typography, scale, density, contrast, and motion adapt to the team.",
  },
  {
    label: "Backups",
    src: backupScreenshot,
    alt: "Stokta backup and restore screen with optional automatic backups, back up now, and choose backup file controls.",
    description: "Optional daily local CSV backups with a warned, user-selected rollback flow.",
  },
] as const;

const features = [
  {
    icon: PackagePlus,
    title: "Add products your way",
    body: "Create products manually or use the camera to add and find them by barcode without breaking your stockroom rhythm.",
  },
  {
    icon: Store,
    title: "Independent store inventory",
    body: "Keep SKUs and quantities separate for as many as 10 stores, then move between locations from a single workspace.",
  },
  {
    icon: Barcode,
    title: "Find what needs attention",
    body: "Search and sort the catalogue while low-stock and out-of-stock indicators make the next action obvious.",
  },
  {
    icon: FileSpreadsheet,
    title: "Local file workflows",
    body: "Import and export CSV or Excel files only when you choose. There are no cloud-drive integrations in the workflow.",
  },
  {
    icon: RotateCcw,
    title: "Back up, then roll back",
    body: "Enable optional daily local CSV backups, create one on demand, or select a backup for a clearly warned full rollback.",
  },
  {
    icon: FileText,
    title: "Reports that fit the question",
    body: "Generate and preview PDF inventory reports for Today, 7 days, 30 days, 3 months, or 6 months, with recent history close by.",
  },
  {
    icon: ScanLine,
    title: "Guidance from the first scan",
    body: "A focused onboarding flow and six-step in-app tour introduce products, scanning, stores, profile, customization, and data tools.",
  },
  {
    icon: Palette,
    title: "An interface that adapts",
    body: "Choose theme, typeface, text size, density, contrast, inventory display, haptics, and reduced-motion behavior.",
  },
] as const;

const languages = [
  "English",
  "Türkçe",
  "O‘zbekcha",
  "Қазақша",
  "Кыргызча",
  "Русский",
  "Azərbaycanca",
] as const;

function BrandMark({ size = 36 }: { size?: number }) {
  const bars = [4, 7, 10, 14, 18, 21, 25, 28, 32];

  return (
    <svg
      aria-hidden="true"
      className="brand-mark"
      height={size}
      viewBox="0 0 40 40"
      width={size}
    >
      <rect fill="currentColor" height="40" rx="9" width="40" />
      {bars.map((x, index) => (
        <rect
          fill="var(--paper)"
          height="15"
          key={x}
          opacity={index % 2 === 0 ? 0.95 : 0.48}
          width={index % 3 === 0 ? 2.6 : 1.5}
          x={x}
          y="9"
        />
      ))}
      <rect fill="var(--paper)" height="2" opacity="0.9" rx="1" width="32" x="4" y="18" />
      <rect fill="var(--paper)" height="1.6" opacity="0.24" rx="0.8" width="25" x="5" y="28" />
      <rect fill="var(--paper)" height="1.6" opacity="0.14" rx="0.8" width="15" x="5" y="31.5" />
    </svg>
  );
}

function ProductCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = screenshots[activeIndex];

  const selectRelative = (difference: number) => {
    setActiveIndex((current) => (current + difference + screenshots.length) % screenshots.length);
  };

  return (
    <section aria-labelledby="product-title" className="product-stage" id="product">
      <div className="phone-wrap">
        <div className="phone-shadow" aria-hidden="true" />
        <div className="phone-shell">
          <div className="phone-speaker" aria-hidden="true" />
          <div className="phone-screen" id="product-panel" role="tabpanel">
            <img
              alt={active.alt}
              className="phone-screenshot"
              decoding="async"
              height="2868"
              key={active.src}
              loading={activeIndex === 0 ? "eager" : "lazy"}
              src={active.src}
              width="1320"
            />
          </div>
        </div>
      </div>

      <div className="product-controls">
        <div className="carousel-heading">
          <div aria-live="polite">
            <span className="eyebrow eyebrow-dark">Real product screens</span>
            <h2 id="product-title">{active.label}</h2>
          </div>
          <div className="arrow-controls">
            <button aria-label="Show previous screen" onClick={() => selectRelative(-1)} type="button">
              <ChevronLeft aria-hidden="true" size={18} />
            </button>
            <button aria-label="Show next screen" onClick={() => selectRelative(1)} type="button">
              <ChevronRight aria-hidden="true" size={18} />
            </button>
          </div>
        </div>
        <p className="product-description">{active.description}</p>
        <div aria-label="Choose an app screen" className="screen-tabs" role="tablist">
          {screenshots.map((screen, index) => (
            <button
              aria-controls="product-panel"
              aria-selected={index === activeIndex}
              className={index === activeIndex ? "is-active" : undefined}
              key={screen.label}
              onClick={() => setActiveIndex(index)}
              role="tab"
              type="button"
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {screen.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ShowcaseSite() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header">
        <a aria-label="Stokta home" className="brand-lockup" href="#top">
          <BrandMark size={34} />
          <span>Stokta</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#features">Features</a>
          <a href="#workflow">Workflow</a>
          <a href="#privacy">Privacy</a>
        </nav>
        <a className="header-action" href="#product">View the app</a>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero-copy">
            <span className="eyebrow"><span className="status-dot" /> Local-first inventory</span>
            <h1>Know what is in stock. Everywhere.</h1>
            <p className="hero-lede">
              Stokta keeps products, quantities, reports, and backups close to the people doing the work—fast to scan, clear to review, and local to the device.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#product">
                Explore real screens <ArrowRight aria-hidden="true" size={18} />
              </a>
              <a className="button button-secondary" href="#features">See what it does</a>
            </div>
            <ul aria-label="Product highlights" className="hero-notes">
              <li><Check aria-hidden="true" size={15} /> Up to 10 stores</li>
              <li><Check aria-hidden="true" size={15} /> Local CSV &amp; Excel</li>
              <li><Check aria-hidden="true" size={15} /> 7 interface languages</li>
            </ul>
          </div>

          <ProductCarousel />
        </section>

        <section aria-label="Current inventory snapshot" className="metric-strip">
          <dl>
            <div><dt>Store-products</dt><dd>24</dd></div>
            <div><dt>Total units</dt><dd>886</dd></div>
            <div><dt>Low stock</dt><dd>8</dd></div>
            <div><dt>Active stores</dt><dd>3</dd></div>
          </dl>
        </section>

        <section className="section section-dark" id="features">
          <div className="section-heading">
            <span className="eyebrow eyebrow-on-dark">One calm inventory system</span>
            <h2>Built around the work, not around a dashboard.</h2>
            <p>From the first barcode to a six-month report, every tool stays focused and close at hand.</p>
          </div>
          <div className="feature-grid">
            {features.map(({ icon: Icon, title, body }, index) => (
              <article className="feature-card" key={title}>
                <div className="feature-index">{String(index + 1).padStart(2, "0")}</div>
                <Icon aria-hidden="true" className="feature-icon" size={22} />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section workflow-section" id="workflow">
          <div className="section-heading section-heading-ink">
            <span className="eyebrow">A shorter path through stock</span>
            <h2>Capture. Control. Keep a local record.</h2>
          </div>
          <ol className="workflow-list">
            <li>
              <span className="workflow-number">01</span>
              <div>
                <h3>Add or find the product</h3>
                <p>Enter product details manually or point the camera at a barcode for a faster lookup.</p>
              </div>
            </li>
            <li>
              <span className="workflow-number">02</span>
              <div>
                <h3>Work in the right store</h3>
                <p>Adjust that location’s quantity while search, sorting, and stock indicators keep the catalogue readable.</p>
              </div>
            </li>
            <li>
              <span className="workflow-number">03</span>
              <div>
                <h3>Report or protect the result</h3>
                <p>Export local files, create a PDF report, or make a device backup before a warned rollback.</p>
              </div>
            </li>
          </ol>
        </section>

        <section className="preference-band">
          <div>
            <span className="eyebrow eyebrow-on-dark">Made for different teams</span>
            <h2>Readable, adaptable, multilingual.</h2>
            <p>
              Space Grotesk gives the interface its compact modern-retro voice. In the app, teams can also choose IBM Plex Sans or Atkinson Hyperlegible, then tune text size, density, contrast, haptics, inventory rows, and reduced motion.
            </p>
          </div>
          <div className="language-panel">
            <Languages aria-hidden="true" size={26} />
            <h3>Seven interface languages</h3>
            <ul>
              {languages.map((language) => <li key={language}>{language}</li>)}
            </ul>
          </div>
        </section>

        <section className="section privacy-section" id="privacy">
          <div className="privacy-intro">
            <ShieldCheck aria-hidden="true" size={30} />
            <span className="eyebrow">Local by default</span>
            <h2>Your inventory stays with your device.</h2>
            <p>
              Stokta keeps profile information, settings, inventory, audit history, reports, and backups locally on the device.
            </p>
          </div>
          <div className="privacy-grid">
            <article>
              <span className="privacy-label">Files</span>
              <h3>Access follows your action.</h3>
              <p>Files are accessed only when you initiate an import, export, backup, or restore operation.</p>
            </article>
            <article>
              <span className="privacy-label">Camera</span>
              <h3>Frames are not saved.</h3>
              <p>Camera imagery is processed for barcode recognition and is not stored by Stokta.</p>
            </article>
            <article>
              <span className="privacy-label">Backups</span>
              <h3>Local and deliberate.</h3>
              <p>Automatic backups are optional. Restoring a selected backup presents a clear warning before replacing the current inventory.</p>
            </article>
          </div>
        </section>

        <section className="closing-section">
          <div className="closing-mark"><BrandMark size={56} /></div>
          <span className="eyebrow eyebrow-on-dark">Stock · simple · sorted</span>
          <h2>Inventory without the detour.</h2>
          <p>Real stores, real quantities, and the tools to keep both organized—without inventing a cloud workflow.</p>
          <a className="button button-light" href="#product">View the interface <ArrowRight aria-hidden="true" size={18} /></a>
        </section>
      </main>

      <footer className="site-footer">
        <div className="brand-lockup brand-lockup-footer"><BrandMark size={30} /><span>Stokta</span></div>
        <p>© 2026 Demir Software</p>
        <div>
          <a href="#features">Features</a>
          <a href="#privacy">Privacy context</a>
        </div>
      </footer>
    </div>
  );
}
