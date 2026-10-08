import { FormEvent, useState } from "react";
import {
  Apple,
  ArrowRight,
  Barcode,
  BellRing,
  CalendarClock,
  Cloud,
  FileSpreadsheet,
  FileText,
  Image,
  Languages,
  PackageCheck,
  Play,
  RefreshCw,
  Send,
  ShieldCheck,
  Store,
  Users,
} from "lucide-react";
import { ProductShowcase } from "./product-showcase";
import { BrandMark, SiteFooter, SiteHeader, SUPPORT_EMAIL } from "./site-chrome";

const APP_STORE_URL = "https://apps.apple.com/us/search?term=Stokta";
const GOOGLE_PLAY_URL = "https://play.google.com/store/search?q=Stokta&c=apps";

const freeFeatures = [
  { icon: Store, value: "1", title: "store", body: "Manage products, quantities and stock thresholds for one store with Stokta Free." },
  { icon: PackageCheck, value: "10,000", title: "total products", body: "Build a substantial local catalogue without a subscription." },
  { icon: Barcode, value: "SCAN", title: "barcode scanning", body: "Add and find products with the camera. Barcode frames are processed without being saved." },
  { icon: FileSpreadsheet, value: "CSV · XLSX", title: "selected-store transfer", body: "Import or export the currently selected store through validated CSV and Excel files." },
  { icon: Image, value: "LOCAL", title: "product images", body: "Attach optional product images that remain on the device where they were selected." },
  { icon: ShieldCheck, value: "DEVICE", title: "local-first storage", body: "Core inventory data stays on your device unless you activate Stokta Pro cloud synchronization." },
] as const;

const proFeatures = [
  { icon: Store, value: "20", title: "stores", body: "Operate up to twenty stores from one Stokta Pro workspace." },
  { icon: Users, value: "20", title: "personnel", body: "Add up to twenty teammates with Administrator or Personnel roles and store-specific access." },
  { icon: PackageCheck, value: "20M", title: "total products", body: "Scale the workspace to as many as twenty million total products." },
  { icon: Cloud, value: "SYNC", title: "multiple devices", body: "Keep shared inventory current across devices through Firebase cloud synchronization." },
  { icon: FileText, value: "1 YEAR", title: "reports", body: "Generate inventory reports for periods ranging from today through one year." },
  { icon: CalendarClock, value: "AUTO", title: "backups", body: "Create automatic local backups and receive local reminder notifications when a backup is due." },
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
          <div aria-hidden="true" className="crystal-shard-field"><span /><span /><span /><span /></div>
          <div className="hero-copy">
            <div className="launch-lockup"><BrandMark size={52} /><span><strong>Stokta Crystal</strong><small>Inventory, in focus.</small></span></div>
            <span className="eyebrow"><span className="status-dot" /> Local-first inventory</span>
            <h1>Know what is in stock. Everywhere.</h1>
            <p className="hero-lede">Start with one local store and 10,000 products. Upgrade to Stokta Pro when your operation needs teams, multiple devices and cloud-synced inventory at serious scale.</p>
            <div className="store-buttons" id="download"><StoreButton store="apple" /><StoreButton store="google" /></div>
            <a className="hero-text-link" href="#demo">Explore real app screens <ArrowRight aria-hidden="true" size={17} /></a>
          </div>
          <div id="demo"><ProductShowcase /></div>
        </section>

        <section className="section section-dark" id="features">
          <div className="section-heading"><span className="eyebrow eyebrow-on-dark">Stokta Free</span><h2>The core inventory tools stay local.</h2><p>One store, up to 10,000 total products and the everyday tools to scan, manage and move inventory.</p></div>
          <div className="feature-grid">
            {freeFeatures.map(({ icon: Icon, value, title, body }, index) => <article className="feature-card" key={title}><div className="feature-index">{String(index + 1).padStart(2, "0")}</div><Icon aria-hidden="true" className="feature-icon" size={22} /><strong className="feature-value">{value}</strong><h3>{title}</h3><p>{body}</p></article>)}
            <article className="feature-card language-feature"><div className="feature-index">07</div><Languages aria-hidden="true" className="feature-icon" size={22} /><strong className="feature-value">7</strong><h3>interface languages</h3><ul>{languages.map(([flag, name]) => <li key={name}><span aria-hidden="true">{flag}</span>{name}</li>)}</ul></article>
          </div>
        </section>

        <section className="section pro-section" id="plans">
          <div className="section-heading"><span className="eyebrow">Stokta Pro</span><h2>Scale the workspace, not the complexity.</h2><p>Pro adds collaboration, higher limits, cloud synchronization, longer reports and automatic local protection.</p></div>
          <div className="pro-feature-grid">
            {proFeatures.map(({ icon: Icon, value, title, body }) => <article className="pro-feature-card" key={title}><Icon aria-hidden="true" size={21} /><strong>{value}</strong><h3>{title}</h3><p>{body}</p></article>)}
          </div>
          <div className="subscription-panel">
            <div><span className="eyebrow">Monthly or yearly</span><h3>Pricing appears in your local App Store.</h3><p>The App Store shows the final localized price and renewal terms before purchase. Existing purchases can be restored from inside Stokta.</p></div>
            <div className="subscription-points"><span><RefreshCw size={17} /> Restore purchases</span><span><BellRing size={17} /> Local backup reminders</span><span><Cloud size={17} /> Firebase sync with Pro</span></div>
          </div>
        </section>

        <section className="section support-section" id="support">
          <div className="support-intro"><span className="eyebrow">Support</span><h2>Tell us what is getting in the way.</h2><p>Include the platform, the action you were taking and any error message. Please do not include passwords, private inventory files or sensitive business data.</p><a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></div>
          <SupportForm />
        </section>

        <section className="closing-section"><div className="closing-mark"><BrandMark size={56} /></div><span className="eyebrow eyebrow-on-dark">Stokta 2.0.1</span><h2>Inventory without the detour.</h2><p>Start free with one store and 10,000 products, then move to Pro for twenty stores, teams, sync and up to twenty million products.</p><div className="store-buttons store-buttons-light"><StoreButton store="apple" /><StoreButton store="google" /></div></section>
      </main>

      <SiteFooter />
    </div>
  );
}
