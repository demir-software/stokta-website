import { useState } from "react";
import { Menu, X } from "lucide-react";

export const SUPPORT_EMAIL = "support@demir.software";

const baseUrl = import.meta.env.BASE_URL.endsWith("/") ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

export const siteHref = (path = "") => `${baseUrl}${path.replace(/^\//, "")}`;

export function BrandMark({ size = 36 }: { size?: number }) {
  return (
    <svg aria-hidden="true" className="brand-mark" height={size} viewBox="0 0 40 40" width={size}>
      <rect fill="currentColor" height="40" rx="9" width="40" />
      <g fill="var(--paper)">
        <rect height="15" opacity="0.92" width="2" x="5" y="9" />
        <rect height="15" opacity="0.42" width="1" x="8.5" y="9" />
        <rect height="15" opacity="0.92" width="3" x="11" y="9" />
        <rect height="15" opacity="0.42" width="1" x="16" y="9" />
        <rect height="15" opacity="0.92" width="2" x="19" y="9" />
        <rect height="15" opacity="0.42" width="1" x="23" y="9" />
        <rect height="15" opacity="0.92" width="3" x="26" y="9" />
        <rect height="15" opacity="0.42" width="1" x="31" y="9" />
        <rect height="15" opacity="0.92" width="2" x="34" y="9" />
        <rect height="2.2" opacity="0.9" rx="1.1" width="32" x="4" y="17.75" />
        <rect height="1.8" opacity="0.26" rx="0.9" width="28" x="5" y="27" />
        <rect height="1.8" opacity="0.14" rx="0.9" width="16" x="5" y="30.5" />
      </g>
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
        <a href={siteHref("legal/#privacy")}>Privacy</a>
        <a href={siteHref("legal/#terms")}>Terms</a>
        <a href={siteHref("brand/")}>Brand</a>
        <a href={`${siteHref()}#support`}>Support</a>
      </div>
    </footer>
  );
}
