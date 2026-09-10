import { FormEvent, useState } from "react";
import {
  Apple,
  ArrowRight,
  Barcode,
  CalendarClock,
  FileSpreadsheet,
  FileText,
  Languages,
  PackageCheck,
  Play,
  Send,
  Store,
} from "lucide-react";
import { IPhoneDemo } from "./iphone-app-demo";
import { BrandMark, SiteFooter, SiteHeader, SUPPORT_EMAIL } from "./site-chrome";

const APP_STORE_URL = "https://apps.apple.com/us/search?term=Stokta";
const GOOGLE_PLAY_URL = "https://play.google.com/store/search?q=Stokta&c=apps";

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
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero-copy">
            <span className="eyebrow"><span className="status-dot" /> Local-first inventory</span>
            <h1>Know what is in stock. Everywhere.</h1>
            <p className="hero-lede">Stokta keeps products, quantities, reports and backups close to the people doing the work fast to scan, clear to review and local by default.</p>
            <div className="store-buttons" id="download"><StoreButton store="apple" /><StoreButton store="google" /></div>
            <a className="hero-text-link" href="#demo">Try the interactive app <ArrowRight aria-hidden="true" size={17} /></a>
          </div>
          <div id="demo"><IPhoneDemo /></div>
        </section>

        <section className="section section-dark" id="features">
          <div className="section-heading"><span className="eyebrow eyebrow-on-dark">Built for real inventory</span><h2>Stokta keeps every stock task in reach.</h2><p>Seven focused capabilities cover the daily work from the first scan to a six-month record.</p></div>
          <div className="feature-grid">
            {features.map(({ icon: Icon, value, title, body }, index) => <article className="feature-card" key={title}><div className="feature-index">{String(index + 1).padStart(2, "0")}</div><Icon aria-hidden="true" className="feature-icon" size={22} /><strong className="feature-value">{value}</strong><h3>{title}</h3><p>{body}</p></article>)}
            <article className="feature-card language-feature"><div className="feature-index">07</div><Languages aria-hidden="true" className="feature-icon" size={22} /><strong className="feature-value">7</strong><h3>interface languages</h3><ul>{languages.map(([flag, name]) => <li key={name}><span aria-hidden="true">{flag}</span>{name}</li>)}</ul></article>
          </div>
        </section>

        <section className="section support-section" id="support">
          <div className="support-intro"><span className="eyebrow">Support</span><h2>Tell us what is getting in the way.</h2><p>Include the platform, the action you were taking and any error message. Please do not include passwords, private inventory files or sensitive business data.</p><a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></div>
          <SupportForm />
        </section>

        <section className="closing-section"><div className="closing-mark"><BrandMark size={56} /></div><span className="eyebrow eyebrow-on-dark">Stock · simple · sorted</span><h2>Inventory without the detour.</h2><p>Up to ten stores, one hundred thousand products and the local tools to keep both under control.</p><div className="store-buttons store-buttons-light"><StoreButton store="apple" /><StoreButton store="google" /></div></section>
      </main>

      <SiteFooter />
    </div>
  );
}
