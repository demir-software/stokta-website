import { FormEvent, useState } from "react";
import {
  Apple,
  ArrowRight,
  Barcode,
  CalendarClock,
  FileSpreadsheet,
  FileText,
  Languages,
  Menu,
  PackageCheck,
  Play,
  Send,
  ShieldCheck,
  Store,
  X,
} from "lucide-react";
import { IPhoneDemo } from "./iphone-demo";

const APP_STORE_URL = "https://apps.apple.com/us/search?term=Stokta";
const GOOGLE_PLAY_URL = "https://play.google.com/store/search?q=Stokta&c=apps";
const SUPPORT_EMAIL = "dev@furkandemir.net";

const features = [
  { icon: Store, value: "10", title: "stores", body: "Run independent SKUs, quantities and stock thresholds for as many as ten active locations." },
  { icon: PackageCheck, value: "100,000", title: "products", body: "Keep a serious catalogue responsive, searchable and organized on the device." },
  { icon: Barcode, value: "SCAN", title: "barcode scanning", body: "Add and find products by pointing the camera at the barcode—frames are never stored." },
  { icon: CalendarClock, value: "DAILY", title: "scheduled backups", body: "Enable an optional daily local snapshot, create one now or perform a warned full rollback." },
  { icon: FileSpreadsheet, value: "CSV · XLSX", title: "bulk import / export", body: "Move full inventories through validated local files and the native save or share sheet." },
  { icon: FileText, value: "6 MONTHS", title: "reporting", body: "Generate local PDF reports for today, 7 days, 30 days, 3 months or 6 months." },
] as const;

const languages = [
  ["🇬🇧", "English"],
  ["🇹🇷", "Türkçe"],
  ["🇺🇿", "O‘zbekcha"],
  ["🇰🇿", "Қазақша"],
  ["🇰🇬", "Кыргызча"],
  ["🇷🇺", "Русский"],
  ["🇦🇿", "Azərbaycanca"],
] as const;

function BrandMark({ size = 36 }: { size?: number }) {
  const bars = [4, 7, 10, 14, 18, 21, 25, 28, 32];
  return (
    <svg aria-hidden="true" className="brand-mark" height={size} viewBox="0 0 40 40" width={size}>
      <rect fill="currentColor" height="40" rx="9" width="40" />
      {bars.map((x, index) => <rect fill="var(--paper)" height="15" key={x} opacity={index % 2 === 0 ? 0.95 : 0.48} width={index % 3 === 0 ? 2.6 : 1.5} x={x} y="9" />)}
      <rect fill="var(--paper)" height="2" opacity="0.9" rx="1" width="32" x="4" y="18" />
      <rect fill="var(--paper)" height="1.6" opacity="0.24" rx="0.8" width="25" x="5" y="28" />
      <rect fill="var(--paper)" height="1.6" opacity="0.14" rx="0.8" width="15" x="5" y="31.5" />
    </svg>
  );
}

function StoreButton({ store }: { store: "apple" | "google" }) {
  const apple = store === "apple";
  return (
    <a className="store-button" href={apple ? APP_STORE_URL : GOOGLE_PLAY_URL} rel="noreferrer" target="_blank">
      {apple ? <Apple aria-hidden="true" size={25} /> : <Play aria-hidden="true" fill="currentColor" size={22} />}
      <span><small>{apple ? "Download on the" : "GET IT ON"}</small><strong>{apple ? "App Store" : "Google Play"}</strong></span>
    </a>
  );
}

function SupportForm() {
  const [status, setStatus] = useState("");

  const submitSupport = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const platform = String(data.get("platform") ?? "Not specified");
    const message = String(data.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Stokta support request from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPlatform: ${platform}\n\n${message}`);
    setStatus("Your email app is opening with the support request prepared.");
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <form className="support-form" onSubmit={submitSupport}>
      <div className="form-row">
        <label>Name<input autoComplete="name" name="name" placeholder="Your name" required /></label>
        <label>Email<input autoComplete="email" name="email" placeholder="you@example.com" required type="email" /></label>
      </div>
      <label>Platform<select defaultValue="iPhone / iPad" name="platform"><option>iPhone / iPad</option><option>Android</option><option>Website</option><option>Other</option></select></label>
      <label>How can we help?<textarea minLength={12} name="message" placeholder="Describe the issue, what you expected and what happened." required rows={6} /></label>
      <div className="support-submit-row"><button className="button button-primary" type="submit">Prepare support email <Send aria-hidden="true" size={17} /></button><p aria-live="polite">{status || <>Opens your email app. You review the message before sending.</>}</p></div>
    </form>
  );
}

export function ShowcaseSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <a aria-label="Stokta home" className="brand-lockup" href="#top" onClick={closeMenu}><BrandMark size={34} /><span>Stokta</span></a>
        <button aria-controls="primary-navigation" aria-expanded={menuOpen} aria-label={menuOpen ? "Close navigation" : "Open navigation"} className="nav-toggle" onClick={() => setMenuOpen((open) => !open)} type="button">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        <nav className={menuOpen ? "is-open" : ""} id="primary-navigation" aria-label="Primary navigation">
          <a href="#demo" onClick={closeMenu}>App demo</a><a href="#features" onClick={closeMenu}>Features</a><a href="#privacy" onClick={closeMenu}>Privacy</a><a href="#terms" onClick={closeMenu}>Terms</a><a href="#support" onClick={closeMenu}>Support</a>
        </nav>
        <a className="header-action" href="#download">Download</a>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero-copy">
            <span className="eyebrow"><span className="status-dot" /> Local-first inventory</span>
            <h1>Know what is in stock. Everywhere.</h1>
            <p className="hero-lede">Stokta keeps products, quantities, reports and backups close to the people doing the work—fast to scan, clear to review and local by default.</p>
            <div className="store-buttons" id="download"><StoreButton store="apple" /><StoreButton store="google" /></div>
            <a className="hero-text-link" href="#demo">Try the interactive app <ArrowRight aria-hidden="true" size={17} /></a>
          </div>
          <div id="demo"><IPhoneDemo /></div>
        </section>

        <section className="section section-dark" id="features">
          <div className="section-heading"><span className="eyebrow eyebrow-on-dark">Built for real inventory</span><h2>Big capacity. Small learning curve.</h2><p>Seven focused capabilities cover the daily work—from the first scan to a six-month record.</p></div>
          <div className="feature-grid">
            {features.map(({ icon: Icon, value, title, body }, index) => <article className="feature-card" key={title}><div className="feature-index">{String(index + 1).padStart(2, "0")}</div><Icon aria-hidden="true" className="feature-icon" size={22} /><strong className="feature-value">{value}</strong><h3>{title}</h3><p>{body}</p></article>)}
            <article className="feature-card language-feature"><div className="feature-index">07</div><Languages aria-hidden="true" className="feature-icon" size={22} /><strong className="feature-value">7</strong><h3>interface languages</h3><ul>{languages.map(([flag, name]) => <li key={name}><span aria-hidden="true">{flag}</span>{name}</li>)}</ul></article>
          </div>
        </section>

        <section className="section legal-section" id="privacy">
          <div className="legal-heading"><ShieldCheck aria-hidden="true" size={30} /><span className="eyebrow">Privacy policy</span><h2>Local by default, transparent by design.</h2><p>Effective September 9, 2026</p></div>
          <div className="legal-copy">
            <article><h3>What Stokta stores</h3><p>Your profile, settings, inventory, audit history, generated reports and backups are stored locally on your device. The public website does not use advertising cookies, account tracking or analytics scripts.</p></article>
            <article><h3>Camera and file access</h3><p>Camera frames are processed only to recognize barcodes and are not saved by Stokta. Files are accessed only when you choose to import, export, create a backup or restore data.</p></article>
            <article><h3>Optional synchronization</h3><p>Stokta does not upload local inventory to a cloud service by default. If an organization configures its own synchronization server, synchronized records are governed by that organization’s privacy policy and configuration.</p></article>
            <article><h3>Support messages</h3><p>The support form prepares an email in your device’s email application. Nothing is transmitted by this website. If you send it, your name, email address, platform and message are processed by your email provider and Demir Software only to respond to the request.</p></article>
            <article><h3>Retention and deletion</h3><p>Local app data remains until you delete it in Stokta or uninstall the app. Exported reports and backups may remain in folders you selected and must be deleted there separately. Support email is retained only as long as reasonably needed to resolve the request or meet legal obligations.</p></article>
            <article><h3>Your choices and contact</h3><p>You can deny camera or file permissions in device settings, disable scheduled backups, delete local records and choose whether to send a support email. Privacy questions can be sent to <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</p></article>
          </div>
        </section>

        <section className="section terms-section" id="terms">
          <div className="legal-heading"><span className="eyebrow eyebrow-on-dark">Terms of use</span><h2>Clear terms for a practical tool.</h2><p>Effective September 9, 2026</p></div>
          <div className="legal-copy">
            <article><h3>License and acceptable use</h3><p>Demir Software grants you a limited, revocable, non-exclusive and non-transferable license to use Stokta for lawful inventory management. You may not reverse engineer the app where prohibited, interfere with its operation, bypass platform security or use it to violate another person’s rights.</p></article>
            <article><h3>Your data and responsibilities</h3><p>You retain responsibility for the accuracy, legality and availability of data you enter or import. Review imports, reports and stock changes before relying on them, maintain appropriate device access controls and keep independent backups suitable for your business needs.</p></article>
            <article><h3>Availability and updates</h3><p>Features may change as Stokta is improved. Background backup timing is controlled by iOS or Android and cannot be guaranteed at an exact time. App-store terms and device requirements also apply to downloads, updates and purchases.</p></article>
            <article><h3>No professional advice</h3><p>Stokta is an inventory utility, not accounting, tax, legal or compliance advice. Generated files and reports should be reviewed before they are used for financial, regulatory or operational decisions.</p></article>
            <article><h3>Warranty and liability</h3><p>To the extent permitted by applicable law, Stokta is provided “as is” without warranties that it will be uninterrupted or error-free. Demir Software is not liable for indirect, incidental or consequential loss, including lost profits or data. Rights that cannot legally be excluded remain unaffected.</p></article>
            <article><h3>Changes, termination and law</h3><p>You may stop using Stokta at any time. We may suspend access for material misuse and may update these terms with a revised effective date. These terms are governed by the laws of the Republic of Türkiye, without limiting mandatory consumer protections in your place of residence.</p></article>
          </div>
        </section>

        <section className="section support-section" id="support">
          <div className="support-intro"><span className="eyebrow">Support</span><h2>Tell us what is getting in the way.</h2><p>Include the platform, the action you were taking and any error message. Please do not include passwords, private inventory files or sensitive business data.</p><a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></div>
          <SupportForm />
        </section>

        <section className="closing-section"><div className="closing-mark"><BrandMark size={56} /></div><span className="eyebrow eyebrow-on-dark">Stock · simple · sorted</span><h2>Inventory without the detour.</h2><p>Up to ten stores, one hundred thousand products and the local tools to keep both under control.</p><div className="store-buttons store-buttons-light"><StoreButton store="apple" /><StoreButton store="google" /></div></section>
      </main>

      <footer className="site-footer"><a className="brand-lockup brand-lockup-footer" href="#top"><BrandMark size={30} /><span>Stokta</span></a><p>© 2026 Demir Software</p><div><a href="#privacy">Privacy</a><a href="#terms">Terms</a><a href="#support">Support</a></div></footer>
    </div>
  );
}
