import { ExternalLink, FileText, ShieldCheck } from "lucide-react";
import { SiteFooter, SiteHeader, SUPPORT_EMAIL, siteHref } from "./site-chrome";

const updated = "October 6, 2026";

export function TermsPage() {
  return (
    <div className="site-shell subpage-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main className="subpage-main" id="main-content">
        <section className="subpage-hero" id="top">
          <div>
            <span className="eyebrow"><span className="status-dot" /> Stokta 2.0.1 policy</span>
            <h1>Terms,<br />plainly.</h1>
          </div>
          <div className="subpage-hero-copy">
            <p>The rules for using Stokta Free, subscribing to Stokta Pro, managing shared inventory, and relying on cloud services.</p>
            <span>Last updated {updated}</span>
          </div>
        </section>

        <nav aria-label="Policy documents" className="document-switcher">
          <a href={siteHref("privacy/")}><ShieldCheck aria-hidden="true" size={18} /> Privacy Policy</a>
          <a aria-current="page" href={siteHref("terms/")}><FileText aria-hidden="true" size={18} /> Terms of Use</a>
        </nav>

        <div className="policy-layout">
          <aside className="policy-index" aria-label="On this page">
            <span className="eyebrow">On this page</span>
            <a href="#agreement">Agreement</a>
            <a href="#plans">Plans &amp; limits</a>
            <a href="#subscriptions">Subscriptions</a>
            <a href="#content">Your content</a>
            <a href="#cloud">Cloud availability</a>
            <a href="#acceptable-use">Acceptable use</a>
            <a href="#deletion">Deletion</a>
            <a href="#liability">Warranty &amp; liability</a>
            <a href="#contact">Contact</a>
          </aside>

          <div className="policy-documents">
            <article className="policy-document policy-document-dark" id="terms">
              <header>
                <span className="document-number">02</span>
                <span className="eyebrow eyebrow-on-dark">Terms of Use</span>
                <h2>Practical terms for a practical tool.</h2>
                <p>These terms apply to your use of Stokta 2.0.1 and supplement the rules of the store from which you obtained the app.</p>
              </header>

              <section id="agreement">
                <h3>Agreement, eligibility, and license</h3>
                <p>By downloading or using Stokta, you agree to these terms. If you use Stokta for an organization, you confirm that you have authority to act for it. Demir Software grants you a limited, non-exclusive, non-transferable, revocable license to use Stokta for lawful inventory management on devices you own or control, subject to applicable store rules.</p>
              </section>

              <section id="plans">
                <h3>Stokta Free and Stokta Pro limits</h3>
                <p>Stokta Free supports one device, one store, and up to 10,000 total products, with barcode scanning, product and store management, selected-store CSV/XLSX import and export, local product images, and local-first storage. Stokta Pro supports up to twenty authorized devices, twenty stores, twenty personnel, and twenty million total products, plus Administrator and Personnel roles with store-specific access, Firebase synchronization, reports covering up to one year, and automatic local backups. Limits apply to the workspace as a whole. Demir Software may prevent actions that would exceed them.</p>
              </section>

              <section id="subscriptions">
                <h3>Monthly and yearly auto-renewing subscriptions</h3>
                <p>Stokta Pro is offered as an auto-renewing monthly or yearly subscription. The localized price, billing period, and any offer shown by the App Store or Google Play before confirmation control your purchase. Payment is charged to your store account when confirmed. Unless you cancel before renewal, the subscription renews automatically and the store charges the applicable renewal price. Manage or cancel the subscription in your Apple Account or Google Play settings. Cancellation stops future renewal; Stokta Pro remains available until the end of the period you have already paid for, subject to the store’s refund and entitlement rules. Use Restore Purchases inside Stokta to recover a supported prior entitlement. Billing, cancellation, and refund requests are handled under the applicable store’s policies and mandatory law.</p>
              </section>

              <section id="content">
                <h3>Your content and team access</h3>
                <p>You retain ownership of inventory and other information you enter, import, or synchronize. You give Demir Software and its service providers the limited permission needed to store, process, and transmit it to operate Stokta. You are responsible for its accuracy, legality, and availability; for having permission to invite teammates and process their names and email addresses; and for assigning roles and store access carefully. Review imports, adjustments, reports, exports, and restored backups before relying on them.</p>
              </section>

              <section id="cloud">
                <h3>Cloud services, sync, backups, and availability</h3>
                <p>Stokta Pro cloud functions depend on Firebase, RevenueCat, app-store services, networks, devices, and operating systems. They may be delayed, interrupted, or unavailable. Synchronization can encounter conflicts, and background scheduling may not run at an exact time. Automatic backups and local reminders reduce risk but do not replace independent backups. Keep appropriate copies of important inventory information and verify restored data.</p>
              </section>

              <section id="acceptable-use">
                <h3>Acceptable use</h3>
                <p>You may not use Stokta unlawfully; interfere with its security or operation; attempt unauthorized access to a workspace, device, or service; upload malicious content; violate another person’s rights; evade plan limits; or copy, modify, distribute, resell, or reverse engineer Stokta except where applicable law expressly permits.</p>
              </section>

              <section id="deletion">
                <h3>Deletion, cancellation, and termination</h3>
                <p>You may stop using Stokta at any time. Deleting the app generally removes app-managed local records but may not remove separately exported files, shared files, backups, cloud workspace data, or store transaction records. Use <strong>Settings → Account Management → Delete account</strong>, or email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> from an address you can access with the email used for Stokta and your brand or workspace name so the request can be verified. Account deletion and subscription cancellation are separate actions: deleting an account does not cancel App Store or Google Play renewal, and canceling a subscription does not delete the account or its data. Subscription cancellation must be completed through the applicable store. Demir Software may suspend or end access where reasonably necessary to address material breaches, abuse, security risks, unpaid entitlement, legal obligations, or plan-limit enforcement.</p>
              </section>

              <section>
                <h3>No professional advice</h3>
                <p>Stokta is an inventory utility, not accounting, tax, legal, regulatory, or compliance advice. You are responsible for reviewing outputs before using them for business, financial, legal, or operational decisions.</p>
              </section>

              <section id="liability">
                <h3>Warranty and liability</h3>
                <p>To the maximum extent permitted by applicable law, Stokta is provided “as is” and “as available,” without a promise that it will be uninterrupted, error-free, or suitable for every purpose. Demir Software is not liable for indirect, incidental, special, or consequential loss, including loss of profits, business opportunity, or data. Nothing in these terms excludes warranties, remedies, rights, or liability that cannot lawfully be excluded.</p>
              </section>

              <section>
                <h3>App-store terms</h3>
                <p>For an iOS or iPadOS download, Apple’s <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" rel="noreferrer" target="_blank">Standard Licensed Application End User License Agreement <ExternalLink aria-hidden="true" size={13} /></a> applies unless a custom license is presented in the App Store. For an Android download, the <a href="https://play.google.com/about/play-terms/" rel="noreferrer" target="_blank">Google Play Terms of Service <ExternalLink aria-hidden="true" size={13} /></a> and applicable policies also apply. Store operators handle their payment systems and do not replace Demir Software as the provider of Stokta support.</p>
              </section>

              <section>
                <h3>Changes and governing law</h3>
                <p>Demir Software may update these terms when Stokta or applicable requirements change, with the revised date shown above. These terms are governed by the laws of the Republic of Türkiye, without limiting mandatory consumer protections or store terms that apply where you live.</p>
              </section>

              <section id="contact">
                <h3>Contact</h3>
                <p>Questions about these terms can be sent to <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</p>
              </section>
            </article>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
