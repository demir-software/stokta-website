import { BrandPage } from "./components/stokta/brand-page";
import { DeleteAccountPage } from "./components/stokta/delete-account-page";
import { PrivacyPage } from "./components/stokta/privacy-page";
import { ShowcaseSite } from "./components/stokta/site";
import { TermsPage } from "./components/stokta/terms-page";

export default function App() {
  const pathname = window.location.pathname.replace(/\/+$/, "");

  if (pathname.endsWith("/privacy") || pathname.endsWith("/legal")) return <PrivacyPage />;
  if (pathname.endsWith("/terms")) return <TermsPage />;
  if (pathname.endsWith("/delete-account")) return <DeleteAccountPage />;
  if (pathname.endsWith("/brand")) return <BrandPage />;

  return <ShowcaseSite />;
}
