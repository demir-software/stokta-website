import { ArrowRight, FileText, ShieldCheck } from "lucide-react";
import { SiteFooter, SiteHeader, SUPPORT_EMAIL, siteHref } from "./site-chrome";

const updated = "October 6, 2026";
const requestSubject = encodeURIComponent("Stokta account deletion request");
const requestBody = encodeURIComponent([
  "Please delete my Stokta account and applicable cloud data.",
  "",
  "Stokta account email:",
  "Brand or workspace name:",
  "",
  "I understand that account deletion does not cancel an App Store or Google Play subscription.",
].join("\n"));

export function DeleteAccountPage() {
  return (
    <div className="site-shell subpage-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main className="subpage-main" id="main-content">
        <section className="subpage-hero" id="top">
          <div>
            <span className="eyebrow"><span className="status-dot" /> Account control</span>
            <h1>Delete your<br />account.</h1>
          </div>
          <div className="subpage-hero-copy">
            <p>Delete directly inside Stokta or send a verified request to Demir Software. These paths remove cloud account data, but only the in-app path can clear data from the device you are using.</p>
            <span>Updated {updated}</span>
          </div>
        </section>

        <nav aria-label="Related policy documents" className="document-switcher">
          <a href={siteHref("privacy/")}><ShieldCheck aria-hidden="true" size={18} /> Privacy Policy</a>
          <a href={siteHref("terms/")}><FileText aria-hidden="true" size={18} /> Terms of Use</a>
        </nav>

        <div className="policy-layout">
          <aside className="policy-index" aria-label="On this page">
            <span className="eyebrow">On this page</span>
            <a href="#in-app">Delete in the app</a>
            <a href="#support-request">Request by email</a>
            <a href="#deleted-data">What is deleted</a>
            <a href="#local-data">Local device data</a>
            <a href="#subscriptions">Subscriptions</a>
            <a href="#records">Transaction records</a>
          </aside>

          <div className="policy-documents">
            <article className="policy-document" id="delete-account">
              <header>
                <span className="document-number">03</span>
                <span className="eyebrow">Account deletion</span>
                <h2>Two ways to make the request.</h2>
                <p>Use the in-app option for the most direct deletion. If you cannot access Stokta, send a support request using the account details described below.</p>
              </header>

              <section id="in-app">
                <h3>Delete inside Stokta</h3>
                <ol className="policy-steps">
                  <li>Open <strong>Settings</strong>.</li>
                  <li>Select <strong>Account Management</strong>.</li>
                  <li>Select <strong>Delete account</strong> and confirm the deletion.</li>
                </ol>
                <p>This path deletes the applicable Firebase cloud account and synchronized data, then clears Stokta-managed local data from the device where you complete the deletion.</p>
              </section>

              <section id="support-request">
                <h3>Request deletion by email</h3>
                <p>Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> from an address you can access. Include the <strong>email used in your Stokta account</strong> and your <strong>brand or workspace name</strong>. Demir Software will use those details and a reply to the account email, or comparable account information, to verify that the requester is authorized before processing deletion.</p>
                <a className="policy-action" href={`mailto:${SUPPORT_EMAIL}?subject=${requestSubject}&body=${requestBody}`}>Prepare deletion request <ArrowRight aria-hidden="true" size={16} /></a>
              </section>

              <section id="deleted-data">
                <h3>What is deleted</h3>
                <p>The applicable deletion process removes the Firebase Authentication user and the Stokta cloud records connected to that user. If the user owns a workspace, this includes the workspace and its synchronized inventory, activity, device, team, membership, and invitation data. If the user is personnel in another person’s workspace, it removes that user’s membership, device access, and connection to the shared workspace rather than deleting the owner’s workspace.</p>
              </section>

              <section id="local-data">
                <h3>Local-only data on devices</h3>
                <p>A web or email support request cannot reach into a phone or tablet to erase local-only information. Products and settings that were never synchronized, product or profile images, reports, exports, and local backup files may remain on a device or in a user-selected file location. Delete them on each device, use the in-app deletion flow on the current device, or uninstall Stokta as appropriate. Files exported or shared outside Stokta must be removed from their saved destinations separately.</p>
              </section>

              <section id="subscriptions">
                <h3>Account deletion does not cancel a subscription</h3>
                <p>Deleting a Stokta account, workspace, or RevenueCat subscriber profile does not cancel an App Store or Google Play subscription. Cancel renewal separately in your Apple Account or Google Play subscription settings. Demir Software cannot cancel a store subscription on your behalf.</p>
              </section>

              <section id="records">
                <h3>Purchase and transaction records</h3>
                <p>Apple, Google, and RevenueCat may retain purchase, receipt, entitlement, fraud-prevention, accounting, or transaction records when legally or operationally required, even after Stokta account data is deleted. Those records are handled under each provider’s terms and privacy practices.</p>
              </section>

              <section>
                <h3>Need help?</h3>
                <p>Contact <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Do not send passwords, payment-card information, inventory exports, or other sensitive business files with the request.</p>
              </section>
            </article>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
