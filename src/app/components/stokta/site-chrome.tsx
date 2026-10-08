import { useState } from "react";
import { Accessibility, Menu, Monitor, Moon, Sun, X } from "lucide-react";
import { useWebsiteTheme, WebsiteThemePreference } from "./website-theme";

export const SUPPORT_EMAIL = "support@demir.software";

const baseUrl = import.meta.env.BASE_URL.endsWith("/") ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

export const siteHref = (path = "") => `${baseUrl}${path.replace(/^\//, "")}`;

export function BrandMark({ size = 36 }: { size?: number }) {
  return (
    <svg aria-hidden="true" className="brand-mark" height={size} viewBox="0 0 72 72" width={size}>
      <rect fill="var(--crystal-mark-surface, #FFFFFF)" height="70" rx="15" stroke="var(--crystal-border, #BDBDBD)" width="70" x="1" y="1" />
      <rect fill="var(--crystal-blue, #4285F4)" height="16" rx="4" width="16" x="8" y="8" />
      <rect fill="var(--crystal-blue, #4285F4)" height="16" rx="4" width="16" x="28" y="8" />
      <rect fill="var(--crystal-red, #EA4335)" height="16" rx="4" width="16" x="48" y="8" />
      <rect fill="var(--crystal-blue, #4285F4)" height="16" rx="4" width="16" x="8" y="28" />
      <rect fill="var(--crystal-mark-surface, #FFFFFF)" height="16" rx="4" stroke="var(--crystal-border, #BDBDBD)" width="16" x="28" y="28" />
      <rect fill="var(--crystal-yellow, #FBBC05)" height="16" rx="4" width="16" x="48" y="28" />
      <rect fill="var(--crystal-green, #34A853)" height="16" rx="4" width="16" x="8" y="48" />
      <rect fill="var(--crystal-blue, #4285F4)" height="16" rx="4" width="16" x="28" y="48" />
      <rect fill="var(--crystal-blue, #4285F4)" height="16" rx="4" width="16" x="48" y="48" />
    </svg>
  );
}

export function BrandLockup({ markSize = 36 }: { markSize?: number }) {
  return <span className="brand-lockup-content"><BrandMark size={markSize} /><span>Stokta</span></span>;
}

const themeOptions = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "colorblind", label: "Colorblind" },
] as const;

function ThemeSelector() {
  const { preference, setPreference } = useWebsiteTheme();
  const ThemeIcon = preference === "dark" ? Moon : preference === "light" ? Sun : preference === "colorblind" ? Accessibility : Monitor;

  return (
    <label className="theme-selector">
      <ThemeIcon aria-hidden="true" size={16} />
      <span>Theme</span>
      <select aria-label="Website theme" onChange={(event) => setPreference(event.target.value as WebsiteThemePreference)} value={preference}>
        {themeOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
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
        <ThemeSelector />
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
