import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import appearanceScreenshot from "../../../assets/screenshots/appearance.png";
import backupScreenshot from "../../../assets/screenshots/backup-restore.png";
import homeScreenshot from "../../../assets/screenshots/home.png";
import productsScreenshot from "../../../assets/screenshots/products.png";
import scannerScreenshot from "../../../assets/screenshots/scanner.jpg";
import storesScreenshot from "../../../assets/screenshots/stores.png";

const screenshots = [
  {
    label: "Home",
    src: homeScreenshot,
    alt: "Stokta home dashboard showing inventory totals, active stores, recent reports, backups, and inventory activity.",
    description: "A real Stokta dashboard with stock health, reports, backups, and recent movement in one view.",
  },
  {
    label: "Products",
    src: productsScreenshot,
    alt: "Stokta product inventory for Main Store with search, add, barcode scan, sorting, import, export, quantities, and stock status controls.",
    description: "Search, scan, sort, import, and export from the same focused inventory view.",
  },
  {
    label: "Scanner",
    src: scannerScreenshot,
    alt: "Stokta full-screen barcode scanner with a camera preview and alignment frame.",
    description: "The real full-screen scanner used for fast product creation and lookup.",
  },
  {
    label: "Stores",
    src: storesScreenshot,
    alt: "Stokta stores overview with independent quantities and low-stock counts for multiple locations.",
    description: "Each location keeps its own SKUs, quantities, and low-stock count.",
  },
  {
    label: "Appearance",
    src: appearanceScreenshot,
    alt: "Stokta appearance settings for theme, interface font, text size, density, and contrast.",
    description: "Theme, typography, scale, density, and contrast controls from the current app.",
  },
  {
    label: "Backups",
    src: backupScreenshot,
    alt: "Stokta backup and restore screen with automatic backups, back up now, and choose backup file controls.",
    description: "Automatic local backups, on-demand backup, and a deliberate restore flow.",
  },
] as const;

export function ProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = screenshots[activeIndex];

  const selectRelative = (difference: number) => {
    setActiveIndex((current) => (current + difference + screenshots.length) % screenshots.length);
  };

  return (
    <section aria-labelledby="product-showcase-title" className="product-showcase">
      <div className="product-phone-wrap">
        <div className="product-phone" aria-label="Current Stokta app screenshot">
          <span className="product-phone-speaker" aria-hidden="true" />
          <div className="product-phone-screen" id="product-screen-panel" role="tabpanel">
            <img
              alt={active.alt}
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

      <div className="product-showcase-controls">
        <span className="product-proof"><i aria-hidden="true" /> Real product screens</span>
        <div className="product-showcase-heading">
          <div aria-live="polite">
            <small>{String(activeIndex + 1).padStart(2, "0")} / {String(screenshots.length).padStart(2, "0")}</small>
            <h2 id="product-showcase-title">{active.label}</h2>
          </div>
          <div className="product-arrow-controls">
            <button aria-label="Show previous app screen" onClick={() => selectRelative(-1)} type="button"><ChevronLeft aria-hidden="true" size={18} /></button>
            <button aria-label="Show next app screen" onClick={() => selectRelative(1)} type="button"><ChevronRight aria-hidden="true" size={18} /></button>
          </div>
        </div>
        <p>{active.description}</p>
        <div aria-label="Choose an app screenshot" className="product-screen-tabs" role="tablist">
          {screenshots.map((screen, index) => (
            <button
              aria-controls="product-screen-panel"
              aria-selected={index === activeIndex}
              className={index === activeIndex ? "is-active" : undefined}
              key={screen.label}
              onClick={() => setActiveIndex(index)}
              role="tab"
              type="button"
            >
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              {screen.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
