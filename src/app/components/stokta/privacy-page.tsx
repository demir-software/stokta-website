import { FileText, ShieldCheck } from "lucide-react";
import { SiteFooter, SiteHeader, SUPPORT_EMAIL, siteHref } from "./site-chrome";

const updated = "October 6, 2026";

export function PrivacyPage() {
  return (
    <div className="site-shell subpage-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main className="subpage-main" id="main-content">
        <section className="subpage-hero" id="top">
          <div>
            <span className="eyebrow"><span className="status-dot" /> Stokta 2.0.1 policy</span>
            <h1>Privacy,<br />clearly.</h1>
          </div>
          <div className="subpage-hero-copy">
            <p>What stays on your device, what Stokta Pro synchronizes, and how account deletion, subscriptions, and service providers are handled.</p>
            <span>Last updated {updated}</span>
          </div>
        </section>

        <nav aria-label="Policy documents" className="document-switcher">
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
            <a href="#disclosures">App Privacy</a>
            <a href="#processors">Processors</a>
            <a href="#retention">Retention &amp; deletion</a>
            <a href="#contact">Contact</a>
          </aside>

          <div className="policy-documents">
            <article className="policy-document" id="privacy">
              <header>
                <span className="document-number">01</span>
                <span className="eyebrow">Privacy Policy</span>
                <h2>Local first. Cloud when you use Pro.</h2>
                <p>This policy applies to Stokta 2.0.1 for iOS and Android and to the Stokta website, all operated by Demir Software.</p>
              </header>

              <section id="scope">
                <h3>Who operates Stokta</h3>
                <p>Stokta is provided by Demir Software. This policy explains information processed when you use local inventory features, enable Stokta Pro cloud functions, join a team, manage a subscription, request deletion, contact support, or visit this website.</p>
              </section>

              <section id="local-data">
                <h3>Information stored locally by default</h3>
                <p>Basic inventory and profile information is local by default. This includes stores, products, quantities, barcodes, stock thresholds, inventory activity, interface and backup settings, basic profile details, product and profile images, generated reports, imports, exports, and local backup files. These records stay on the device or in a file location you choose unless a Stokta Pro feature explicitly synchronizes the relevant record. Files you export or share are controlled by the destination you select.</p>
              </section>

              <section id="cloud-data">
                <h3>Stokta Pro cloud synchronization and teams</h3>
                <p>Stokta Pro uses Firebase Authentication, Cloud Firestore, and Cloud Functions. Firebase creates an anonymous authentication user ID and processes the records needed for cloud synchronization, workspace access, team invitations, entitlement checks, and account deletion. Synced personal information can include your name, email address, optional phone number, brand or workspace name, user ID, Administrator or Personnel role, device and membership records, invitation status, and assigned-store access. Synced workspace content can include stores, inventory, product quantities, team information, and inventory or team activity.</p>
                <p>Stokta uses this information to keep authorized devices current, enforce workspace roles and limits, deliver invitations, and operate the shared workspace. A Stokta Free user’s local-only inventory is not uploaded merely because the app is installed.</p>
              </section>

              <section id="purchases">
                <h3>Subscriptions and purchase restoration</h3>
                <p>RevenueCat helps Stokta present, validate, manage, and restore Stokta Pro entitlement. RevenueCat processes a Stokta app user ID, entitlement and subscription status, product identifiers, purchase history, and the Apple receipt or Google purchase token needed to validate the purchase. Apple or Google processes payment and billing information under its own policies. Demir Software does not receive full payment-card details.</p>
              </section>

              <section id="permissions">
                <h3>Camera, photos, files, and notifications</h3>
                <p>Camera access is used when you choose to scan a barcode. Camera frames used for barcode recognition are processed for that action and are not saved by Stokta. Photo and file access is used only when you choose an image or start an import, export, report, backup, or restore action. Notification access is used for local backup reminders on your device, not advertising. You can change permissions in device settings, although the corresponding feature may stop working.</p>
              </section>

              <section id="disclosures">
                <h3>App Privacy disclosures</h3>
                <p>Where Stokta Pro cloud or purchase functions are used, the store privacy forms describe the following data as collected, linked to the user, and used for app functionality:</p>
                <ul className="policy-list privacy-disclosures">
                  <li><strong>Contact Info:</strong> name, email address, and optional phone number used for a Pro profile, workspace, or invitation.</li>
                  <li><strong>Identifiers:</strong> the Stokta/Firebase user ID and related app user identifier.</li>
                  <li><strong>Purchases:</strong> subscription status, entitlement, product, and purchase history handled through the store and RevenueCat.</li>
                  <li><strong>User Content:</strong> brand or workspace information and synchronized inventory, team, invitation, and activity records.</li>
                  <li><strong>Product Interaction:</strong> inventory and team actions needed to synchronize and operate the shared workspace.</li>
                </ul>
                <p>These categories are not used by Stokta for cross-app tracking. Stokta does not sell this information and does not include third-party advertising.</p>
              </section>

              <section id="processors">
                <h3>Processors and other recipients</h3>
                <p>Google/Firebase processes enabled Stokta Pro authentication, synchronized records, invitations, access control, callable deletion, and related cloud functions. RevenueCat processes purchase and entitlement information. Apple and Google process app distribution, billing, subscription management, and related store records. A file, mail, or sharing provider processes content only when you choose that destination. If you email support, Demir Software receives the address, account or workspace details, and message you provide. The website support form prepares an email in your email application and does not send it automatically.</p>
              </section>

              <section id="retention">
                <h3>Retention, deletion, and your choices</h3>
                <p>Local records remain until you delete them, complete the in-app deletion flow on that device, or uninstall Stokta. Reports, images, exports, and backups saved outside app-managed storage may need to be deleted separately. Cloud records remain while needed to provide the account or workspace, then are deleted through the applicable account-deletion process, subject to provider backup, security, legal, fraud-prevention, accounting, and transaction-record requirements.</p>
                <p>In Stokta, open <strong>Settings → Account Management → Delete account</strong>. If you cannot access the app, email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> from an address you can access and include the email used for Stokta plus your brand or workspace name so Demir Software can verify the request. The in-app flow removes the applicable Firebase account and cloud records and clears Stokta-managed data from the current device. An email support request cannot erase local-only data remaining on a phone or tablet. Account deletion does not cancel an App Store or Google Play subscription.</p>
              </section>

              <section>
                <h3>International processing</h3>
                <p>Firebase, RevenueCat, Apple, Google, and support or hosting providers may process information in countries outside your own. Their processing is governed by their applicable terms, privacy commitments, and transfer safeguards.</p>
              </section>

              <section>
                <h3>Security limitations</h3>
                <p>Stokta uses platform and service-provider safeguards and limits cloud access through authenticated workspace permissions. No storage or transmission method is completely secure. Protect devices with an appropriate passcode, grant team access carefully, and secure exported files and backups.</p>
              </section>

              <section>
                <h3>Children</h3>
                <p>Stokta is a general inventory and business utility. It is not directed to children under 13 or the minimum digital-consent age that applies where they live.</p>
              </section>

              <section>
                <h3>Policy changes</h3>
                <p>If Stokta’s practices materially change, this policy and the relevant App Store or Google Play disclosures will be updated. The current revision date appears at the top of this page.</p>
              </section>

              <section id="contact">
                <h3>Contact</h3>
                <p>For privacy questions or deletion requests, email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</p>
              </section>
            </article>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
