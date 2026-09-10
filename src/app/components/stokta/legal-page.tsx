import { ExternalLink, FileText, ShieldCheck } from "lucide-react";
import { SiteFooter, SiteHeader, SUPPORT_EMAIL } from "./site-chrome";

const updated = "September 10, 2026";

export function LegalPage() {
  return (
    <div className="site-shell subpage-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main className="subpage-main" id="main-content">
        <section className="subpage-hero" id="top">
          <div>
            <span className="eyebrow"><span className="status-dot" /> Store-ready policies</span>
            <h1>Privacy &amp;<br />Terms.</h1>
          </div>
          <div className="subpage-hero-copy">
            <p>Clear information about how Stokta handles data and the terms that apply when the app is downloaded from the Apple App Store or Google Play.</p>
            <span>Last updated {updated}</span>
          </div>
        </section>

        <nav aria-label="Legal documents" className="document-switcher">
          <a href="#privacy"><ShieldCheck aria-hidden="true" size={18} /> Privacy Policy</a>
          <a href="#terms"><FileText aria-hidden="true" size={18} /> Terms of Use</a>
        </nav>

        <div className="policy-layout">
          <aside className="policy-index" aria-label="On this page">
            <span className="eyebrow">On this page</span>
            <a href="#privacy">Privacy Policy</a>
            <a href="#data-handling">Data handling</a>
            <a href="#permissions">Permissions</a>
            <a href="#sharing">Sharing and services</a>
            <a href="#retention">Retention and deletion</a>
            <a href="#terms">Terms of Use</a>
            <a href="#store-terms">Store-specific terms</a>
          </aside>

          <div className="policy-documents">
            <article className="policy-document" id="privacy">
              <header>
                <span className="document-number">01</span>
                <span className="eyebrow">Privacy Policy</span>
                <h2>Local by default, transparent by design.</h2>
                <p>This Privacy Policy applies to the Stokta mobile application for iOS and Android and to the Stokta website operated by Demir Software.</p>
              </header>

              <section>
                <h3>Who operates Stokta</h3>
                <p>Stokta is provided by Demir Software. Questions about privacy or this policy can be sent to <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</p>
              </section>

              <section id="data-handling">
                <h3>Data handled by the app</h3>
                <p>Stokta stores the profile details you enter, settings, stores, products, quantities, barcodes, stock thresholds, inventory activity, generated reports and backup files locally on your device. The standard app does not require an account and does not send this inventory data to Demir Software.</p>
              </section>

              <section id="permissions">
                <h3>Camera and file permissions</h3>
                <p>Camera access is used only when you choose to scan a barcode. Frames are processed on the device for barcode recognition and are not saved by Stokta. File access is used only when you initiate an import, export, report, backup or restore action. You can revoke permissions in the device settings, although the related feature may stop working.</p>
              </section>

              <section>
                <h3>Analytics, advertising and tracking</h3>
                <p>Stokta does not include third-party advertising, cross-app tracking or behavioral analytics. Demir Software does not sell personal information or inventory data.</p>
              </section>

              <section id="sharing">
                <h3>Sharing, platform services and optional synchronization</h3>
                <p>Stokta does not share local inventory with Demir Software or advertisers. Apple and Google may process download, purchase, device and diagnostic information as independent platform providers under their own policies. If an organization configures an optional synchronization server, records sent to that server are controlled by that organization and are subject to its privacy policy and security settings.</p>
              </section>

              <section>
                <h3>Support and website communications</h3>
                <p>The support form prepares a message in your email application; the website does not submit it automatically. If you send the message, Demir Software receives the name, reply address, platform and message you provide and uses them only to answer and manage the support request. The website does not use advertising cookies or analytics scripts. Its hosting provider may process ordinary technical request logs for delivery, reliability and security.</p>
              </section>

              <section id="retention">
                <h3>Retention, deletion and your choices</h3>
                <p>Local app data remains on the device until you delete records or uninstall Stokta. Reports, exports and backups remain wherever you saved them and must be deleted from that location separately. Support correspondence is retained only as long as reasonably necessary to resolve the request, maintain support records or meet legal obligations. You can stop optional processing by denying permissions, disabling automatic backups, removing an optional synchronization configuration or choosing not to send a support message.</p>
              </section>

              <section>
                <h3>Security and children</h3>
                <p>Stokta uses the protections provided by your device and operating system, but no device or storage method can be guaranteed completely secure. Use an appropriate device passcode and protect exported files and backups. Stokta is a general inventory utility and is not directed to children under 13 or the minimum digital-consent age in their jurisdiction.</p>
              </section>

              <section>
                <h3>Store privacy disclosures and policy changes</h3>
                <p>Apple App Store privacy answers and the Google Play Data Safety form should be completed consistently with the production app and this policy, including any future SDK or synchronization changes. We may update this policy when Stokta or applicable requirements change. The revised date will appear at the top of this page.</p>
              </section>
            </article>

            <article className="policy-document policy-document-dark" id="terms">
              <header>
                <span className="document-number">02</span>
                <span className="eyebrow eyebrow-on-dark">Terms of Use</span>
                <h2>Practical terms for a practical tool.</h2>
                <p>These terms apply to your use of Stokta and supplement the applicable terms of the store from which you obtained the app.</p>
              </header>

              <section>
                <h3>Agreement and eligibility</h3>
                <p>By downloading or using Stokta, you agree to these Terms of Use. If you use Stokta for a business or organization, you confirm that you have authority to accept these terms for that organization. If you do not agree, do not use the app.</p>
              </section>

              <section>
                <h3>License and acceptable use</h3>
                <p>Demir Software grants you a limited, non-exclusive, non-transferable and revocable license to use Stokta for lawful inventory management on devices you own or control, subject to the applicable store usage rules. You may not misuse the app, interfere with its operation or security, use it to violate another person’s rights, or copy, modify, distribute, resell or reverse engineer it except where applicable law expressly permits.</p>
              </section>

              <section>
                <h3>Your inventory and responsibilities</h3>
                <p>You remain responsible for the accuracy, legality and availability of information you enter or import. Review imports, stock adjustments, reports and restored backups before relying on them. Maintain suitable device security and independent backups for your operational needs.</p>
              </section>

              <section>
                <h3>Availability, updates and third-party services</h3>
                <p>Features, supported formats and device requirements may change as Stokta is maintained. Operating systems control background scheduling, so automatic backups cannot be guaranteed at an exact time. Store services, email providers, file providers and any organization-managed synchronization server are separate services governed by their own terms.</p>
              </section>

              <section>
                <h3>No professional advice</h3>
                <p>Stokta is an inventory utility. It does not provide accounting, tax, legal, regulatory or compliance advice. Review generated files and reports before using them for financial, legal or operational decisions.</p>
              </section>

              <section>
                <h3>Warranty and liability</h3>
                <p>To the maximum extent permitted by applicable law, Stokta is provided “as is” and “as available,” without warranties that it will be uninterrupted, error-free or suitable for every purpose. Demir Software is not responsible for indirect, incidental, special or consequential loss, including lost profits or data. Nothing in these terms limits rights or liability that cannot lawfully be excluded.</p>
              </section>

              <section id="store-terms">
                <h3>Apple App Store and Google Play</h3>
                <p>For an iOS or iPadOS download, Apple’s <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" rel="noreferrer" target="_blank">Standard Licensed Application End User License Agreement <ExternalLink aria-hidden="true" size={13} /></a> applies unless a custom agreement is presented in the App Store. Apple is not responsible for Stokta support, maintenance or claims relating to the app beyond obligations imposed by law or Apple’s terms. For an Android download, the <a href="https://play.google.com/about/play-terms/" rel="noreferrer" target="_blank">Google Play Terms of Service <ExternalLink aria-hidden="true" size={13} /></a> and applicable Google Play policies also apply. Apple and Google are not parties to support arrangements between you and Demir Software.</p>
              </section>

              <section>
                <h3>Termination, changes and governing law</h3>
                <p>You may stop using Stokta at any time. The license ends if you materially breach these terms. We may update the terms with a revised date when the app or legal requirements change. These terms are governed by the laws of the Republic of Türkiye, without limiting mandatory consumer protections or store terms that apply in your place of residence.</p>
              </section>

              <section>
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
