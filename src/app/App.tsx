import { BrandPage } from "./components/stokta/brand-page";
import { LegalPage } from "./components/stokta/legal-page";
import { ShowcaseSite } from "./components/stokta/site";

export default function App() {
  const pathname = window.location.pathname.replace(/\/+$/, "");

  if (pathname.endsWith("/legal")) return <LegalPage />;
  if (pathname.endsWith("/brand")) return <BrandPage />;

  return <ShowcaseSite />;
}
