import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { C, FONT } from "./components/stokta/tokens";
import { IPhone } from "./components/stokta/appdemo";
import { BrandDocs } from "./components/stokta/branddocs";
import { ShowcaseSite } from "./components/stokta/site";

type View = "site" | "demo" | "docs";

export default function App() {
  const [view, setView] = useState<View>("site");

  if (view === "docs") return <BrandDocs onBack={() => setView("site")} />;

  if (view === "demo") {
    return (
      <div style={{ minHeight: "100vh", background: "#969696", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", fontFamily: FONT.body, position: "relative" }}>
        <button
          onClick={() => setView("site")}
          style={{ position: "fixed", top: 20, left: 20, zIndex: 5, display: "inline-flex", alignItems: "center", gap: 7, background: C.ink, color: C.onPrimary, border: "none", borderRadius: 999, padding: "10px 16px", cursor: "pointer", fontFamily: FONT.display, fontWeight: 600, fontSize: 14, boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}
        >
          <ArrowLeft size={16} /> Back to site
        </button>
        <IPhone scale={0.82} />
      </div>
    );
  }

  return <ShowcaseSite onDemo={() => setView("demo")} onDocs={() => setView("docs")} />;
}
