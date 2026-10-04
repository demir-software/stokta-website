import { FileText, ShieldCheck } from "lucide-react";
import { SiteFooter, SiteHeader, SUPPORT_EMAIL, siteHref } from "./site-chrome";

const updated = "October 4, 2026";

export function PrivacyPage() {
  return (
    <div className="site-shell subpage-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main className="subpage-main" id="main-content">
        <section className="subpage-hero" id="top">
          <div>
            <span className="eyebrow"><span className="status-dot" /> Stokta policy</span>
            <h1>Privacy,<br />clearly.</h1>
          </div>
          <div className="subpage-hero-copy">
            <p>What Stokta keeps on your device, what Stokta Pro synchronizes, and which services help subscriptions and cloud features work.</p>
            <span>Last updated {updated}</span>
          </div>
        </section>

        <nav aria-label="Legal documents" className="document-switcher">
          <a aria-current="page" href={siteHref("privacy/")}><ShieldCheck aria-hidden="true" size={18} /> Privacy Policy</a>
          <a href={siteHref("terms/")}><FileText aria-hidden="true" size={18} /> Terms of Use</a>
        </nav>

        <div className="policy-layout">
          <aside className="policy-index" aria-label="On this page">
            <span className="eyebrow">On this page</span>
            <a href="#scope">Scope</a>
            <a href="#local-data">Local data</a>
            <a href="#cloud-data">Pro cloud data</a>
            <a href="#purchases">Purchases</a>
            <a href="#permissions">Permissions</a>
            <a href="#sharing">Sharing</a>
            <a href="#retention">Retention &amp; deletion</a>
            <a href="#contact">Contact</a>
          </aside>

          <div className="policy-documents">
            <article className="policy-document" id="privacy">
              <header>
                <span className="document-number">01</span>
                <span className="eyebrow">Privacy Policy</span>
                <h2>Local first. Cloud only when you choose Pro.</h2>
                <p>This policy applies to the Stokta mobile application and the Stokta website operated by Demir Software.</p>
              </header>

              <section id="scope">
                <h3>Who operates Stokta</h3>
                <p>Stokta is provided by Demir Software. This policy explains the information processed when you use Stokta Free, enable Stokta Pro, contact support, or visit this website.</p>
              </section>

              <section id="local-data">
                <h3>Information kept on your device</h3>
                <p>Stokta Free is local-first. Stores, products, quantities, barcodes, stock thresholds, activity, settings, reports, imports, exports, and backup files are stored on your device or in a location you select. Optional product images, profile images, and phone numbers remain local and are not uploaded by Stokta. Files you export or share are then controlled by the destination you choose.</p>
              </section>

              <section id="cloud-data">
                <h3>Stokta Pro cloud synchronization</h3>
                <p>When you use Stokta Pro synchronization, Stokta uses Firebase services from Google. Firebase Authentication creates an anonymous technical identifier, and cloud services process the workspace, store, product, quantity, activity, device, and access-control records needed to synchronize authorized devices. Shared-workspace invitations can include a teammate’s name, email address, Administrator or Personnel role, invitation status, and assigned-store access. This information is used to provide synchronization, invitations, permissions, and related workspace functions.</p>
              </section>

              <section id="purchases">
                <h3>Subscriptions and purchase restoration</h3>
                <p>RevenueCat helps Stokta present, validate, and restore Stokta Pro subscriptions. It may process an app user identifier, device and app technical information, product identifiers, subscription status, purchase history, and the App Store or Google Play receipt or purchase token needed to verify entitlement. Apple or Google processes payment and billing information under its own policies. Demir Software does not receive your full payment-card details.</p>
              </section>

              <section id="permissions">
                <h3>Camera, files, images, and notifications</h3>
                <p>Camera access is used when you scan a barcode; Stokta does not save the camera frames used for recognition. Photo or file access is used only when you select a product or profile image, or start an import, export, report, backup, or restore action. Notification access is used for local backup reminders. You can change these permissions in device settings, although the related feature may stop working.</p>
              </section>

              <section>
                <h3>No advertising or behavioral tracking</h3>
                <p>Stokta does not include third-party advertising, cross-app tracking, or behavioral advertising analytics. Demir Software does not sell personal information, inventory information, or team information.</p>
              </section>

              <section id="sharing">
                <h3>When information is shared</h3>
                <p>Information is shared only as needed to provide the service: with Google/Firebase for enabled Stokta Pro cloud functions, RevenueCat for subscription entitlement management, Apple or Google for downloads and billing, and providers you select when exporting or sharing a file. If you email support, Demir Software receives the name, reply address, platform, and message you send. The website support form prepares an email locally and does not send it automatically.</p>
              </section>

              <section id="retention">
                <h3>Retention, deletion, and your choices</h3>
                <p>Local records remain until you delete them or uninstall Stokta. Exported files, reports, images, and backups may remain in their saved locations and must be removed separately. Pro workspace data remains while the workspace or membership is active and may be retained as reasonably needed for service recovery, security, legal compliance, and transaction records. Administrators can remove personnel; personnel can leave a workspace. For cloud workspace or privacy deletion requests, email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. RevenueCat and the app store may retain purchase records under their legal, accounting, fraud-prevention, and platform obligations.</p>
              </section>

              <section>
                <h3>Security, international processing, and children</h3>
                <p>Stokta uses platform and service-provider safeguards, but no storage or transmission method is completely secure. Protect your device and exported files with appropriate access controls. Cloud providers may process data in countries outside your own under their applicable transfer safeguards. Stokta is a general business utility and is not directed to children under 13 or the minimum digital-consent age where they live.</p>
              </section>

              <section>
                <h3>Policy changes</h3>
                <p>If Stokta’s data practices materially change, this policy and the relevant App Store or Google Play disclosures will be updated. The current revision date appears at the top of this page.</p>
              </section>

              <section id="contact">
                <h3>Contact</h3>
                <p>For privacy questions or requests, email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</p>
              </section>
            </article>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
