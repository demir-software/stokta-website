import { useState } from "react";
import { Menu, X } from "lucide-react";

export const SUPPORT_EMAIL = "support@demir.software";

const baseUrl = import.meta.env.BASE_URL.endsWith("/") ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

export const siteHref = (path = "") => `${baseUrl}${path.replace(/^\//, "")}`;

export function BrandMark({ size = 36 }: { size?: number }) {
  return (
    <svg aria-hidden="true" className="brand-mark" height={size} viewBox="0 0 1024 1024" width={size}>
      <rect fill="#6677E8" height="1024" rx="220" width="1024" />
      <g fill="#F8F7F3">
        <rect height="116" rx="28" width="104" x="244" y="236" />
        <rect height="116" rx="28" width="128" x="372" y="236" />
        <rect height="116" rx="28" width="208" x="524" y="236" />
        <rect height="116" rx="28" width="208" x="292" y="454" />
        <rect height="116" rx="28" width="128" x="524" y="454" />
        <rect height="116" rx="28" width="104" x="676" y="454" />
        <rect height="116" rx="28" width="208" x="244" y="672" />
        <rect height="116" rx="28" width="128" x="476" y="672" />
      </g>
      <rect fill="#E77864" height="116" rx="28" width="104" x="628" y="672" />
    </svg>
  );
}

export function BrandLockup({ markSize = 36 }: { markSize?: number }) {
  return <span className="brand-lockup-content"><BrandMark size={markSize} /><span>Stokta</span></span>;
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a aria-label="Stokta home" className="brand-lockup" href={`${siteHref()}#top`} onClick={closeMenu}><BrandLockup markSize={34} /></a>
        <button aria-controls="primary-navigation" aria-expanded={menuOpen} aria-label={menuOpen ? "Close navigation" : "Open navigation"} className="nav-toggle" onClick={() => setMenuOpen((open) => !open)} type="button">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        <nav className={menuOpen ? "is-open" : ""} id="primary-navigation" aria-label="Primary navigation">
          <a href={`${siteHref()}#demo`} onClick={closeMenu}>DEMO</a>
          <a href={`${siteHref()}#features`} onClick={closeMenu}>Features</a>
          <a href={`${siteHref()}#plans`} onClick={closeMenu}>Pro</a>
          <a href={`${siteHref()}#support`} onClick={closeMenu}>Support</a>
        </nav>
        <a className="header-action" href={`${siteHref()}#download`}>Download</a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <a className="brand-lockup brand-lockup-footer" href={`${siteHref()}#top`}><BrandLockup markSize={30} /></a>
      <p>© 2026 Demir Software</p>
      <div>
        <a href={siteHref("privacy/")}>Privacy</a>
        <a href={siteHref("terms/")}>Terms</a>
        <a href={siteHref("brand/")}>Brand</a>
        <a href={`${siteHref()}#support`}>Support</a>
      </div>
    </footer>
  );
}
