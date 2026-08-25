import { useMemo } from "react";
import { Download, FileCode2, Palette, Braces, Image as ImageIcon, ArrowLeft } from "lucide-react";
import { C, FONT } from "./tokens";
import {
  PALETTE, markSVG, appIconSVG, wordmarkSVG, lockupSVG, tokensCSS, tokensJSON,
} from "./assets";

// ─── download helper ──────────────────────────────────────────────
function download(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// ─── the portable, self-contained brand guide document ────────────
function buildGuideHTML(): string {
  const swatches = PALETTE.map(
    (p) => `<div class="sw">
      <div class="chip" style="background:${p.hex};${p.hex === "#ffffff" ? "border:1px solid var(--line)" : ""}"></div>
      <div class="sw-name">${p.name}</div>
      <div class="mono sw-hex">${p.hex}</div>
      <div class="sw-role">${p.role}</div>
      <div class="mono sw-token">${p.token}</div>
    </div>`
  ).join("");

  const iconSizes = [128, 80, 48, 32]
    .map((s) => `<figure><div>${appIconSVG(s)}</div><figcaption class="mono">${s}px</figcaption></figure>`)
    .join("");

  const markVariants = `
    <figure><div class="tile dark">${markSVG(72)}</div><figcaption class="mono">On dark</figcaption></figure>
    <figure><div class="tile light">${markSVG(72, { bg: "#585858" })}</div><figcaption class="mono">Dark gray</figcaption></figure>
    <figure><div class="tile light">${markSVG(72, { outline: true })}</div><figcaption class="mono">Outline</figcaption></figure>`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Stokta — Brand & Design Guidelines</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Mulish:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root{
    --white:#ffffff;--silver:#969696;--mid:#747474;--dark:#585858;--charcoal:#383737;--black:#151313;
    --line:rgba(21,19,19,.12);--hair:rgba(21,19,19,.07);--surface:rgba(21,19,19,.04);
    --display:'Outfit',sans-serif;--body:'Mulish',sans-serif;--mono:'JetBrains Mono',monospace;
  }
  *{box-sizing:border-box}
  body{margin:0;background:var(--white);color:var(--black);font-family:var(--body);line-height:1.6;-webkit-font-smoothing:antialiased}
  .mono{font-family:var(--mono);letter-spacing:.02em}
  .wrap{max-width:920px;margin:0 auto;padding:0 32px}
  header.cover{background:var(--black);color:var(--white);padding:88px 0 76px}
  header.cover .wrap{display:flex;flex-direction:column;gap:34px;align-items:flex-start}
  h1{font-family:var(--display);font-weight:800;letter-spacing:-.03em;font-size:64px;margin:0;line-height:1}
  .tag{font-family:var(--mono);text-transform:uppercase;letter-spacing:.18em;font-size:12px;color:rgba(255,255,255,.5)}
  section{padding:64px 0;border-bottom:1px solid var(--hair)}
  .kicker{font-family:var(--mono);text-transform:uppercase;letter-spacing:.16em;font-size:11px;color:var(--silver);margin:0 0 8px}
  h2{font-family:var(--display);font-weight:700;letter-spacing:-.02em;font-size:30px;margin:0 0 6px}
  .lead{color:var(--mid);max-width:60ch;margin:0 0 32px}
  h3{font-family:var(--display);font-weight:700;font-size:16px;letter-spacing:-.01em;margin:36px 0 14px}
  figure{margin:0;text-align:center}
  figcaption{color:var(--silver);font-size:11px;margin-top:10px}
  .row{display:flex;flex-wrap:wrap;gap:28px;align-items:flex-end}
  .tile{width:118px;height:118px;border-radius:20px;display:flex;align-items:center;justify-content:center}
  .tile.dark{background:var(--black)} .tile.light{background:var(--surface);border:1px solid var(--line)}
  .grid-sw{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
  .sw{border:1px solid var(--line);border-radius:14px;padding:14px;background:var(--white)}
  .chip{height:78px;border-radius:10px;margin-bottom:12px}
  .sw-name{font-family:var(--display);font-weight:700;font-size:15px}
  .sw-hex{font-size:12px;color:var(--mid);margin-top:2px}
  .sw-role{font-size:12.5px;color:var(--mid);margin-top:8px}
  .sw-token{font-size:11px;color:var(--silver);margin-top:6px}
  .bar{display:flex;height:12px;border-radius:6px;overflow:hidden;margin-top:24px;border:1px solid var(--line)}
  .bar span{flex:1}
  .type-spec{border-top:1px solid var(--hair);padding:26px 0}
  .type-spec:first-of-type{border-top:none}
  .meta{display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:14px}
  .meta .mono{font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:var(--silver)}
  .btn{font-family:var(--display);font-weight:600;font-size:15px;border-radius:12px;padding:12px 18px;display:inline-flex;gap:8px;align-items:center}
  .btn-primary{background:var(--black);color:var(--white)}
  .btn-secondary{background:var(--white);color:var(--black);border:1px solid var(--line)}
  .badge{display:inline-flex;align-items:center;gap:6px;border-radius:999px;padding:4px 10px;font-weight:600;font-size:12px}
  .dot{width:7px;height:7px;border-radius:50%}
  .card{border:1px solid var(--line);border-radius:16px;padding:16px;max-width:340px}
  .do-dont{display:grid;grid-template-columns:1fr 1fr;gap:20px}
  .box{border:1px solid var(--line);border-radius:14px;padding:18px}
  .box h4{margin:0 0 8px;font-family:var(--display);font-size:14px;letter-spacing:.02em;text-transform:uppercase}
  .box.do h4{color:var(--black)} .box.dont h4{color:var(--dark)}
  .box ul{margin:0;padding-left:18px;color:var(--mid);font-size:14px}
  footer{padding:40px 0;color:var(--silver);font-size:12px}
  @media(max-width:680px){.grid-sw{grid-template-columns:1fr 1fr}h1{font-size:44px}.do-dont{grid-template-columns:1fr}}
</style>
</head>
<body>
  <header class="cover">
    <div class="wrap">
      ${markSVG(64)}
      <div>
        <h1>Stokta</h1>
        <p class="tag" style="margin-top:14px">Stock · Simple · Sorted — Brand &amp; Design Guidelines v1.0</p>
      </div>
    </div>
  </header>

  <section><div class="wrap">
    <p class="kicker">01 — Logo</p>
    <h2>The mark &amp; wordmark</h2>
    <p class="lead">Stokta's mark is a barcode framed by a scan baseline — a literal, friendly nod to the core action of the app. Pair it with the Outfit wordmark for the full lockup; the mark stands alone at small sizes such as the app icon and favicons.</p>
    <h3>Full lockup</h3>
    <div>${lockupSVG("#151313", 52)}</div>
    <h3>App icon</h3>
    <div class="row">${iconSizes}</div>
    <h3>Mark variants</h3>
    <div class="row">${markVariants}</div>
    <h3>Clear space &amp; minimum size</h3>
    <p class="lead">Keep clear space equal to the height of one barcode bar on all sides. Minimum mark size is 20px; minimum lockup width is 96px. Never rotate, recolor outside the palette, add gradients or shadows, or stretch the mark.</p>
  </div></section>

  <section><div class="wrap">
    <p class="kicker">02 — Color</p>
    <h2>Strict monochrome</h2>
    <p class="lead">Six grayscale values only. Meaning is carried by weight, fill, and contrast — never hue. White is the canvas; Near Black is ink and primary action; the greys build hierarchy.</p>
    <div class="grid-sw">${swatches}</div>
    <div class="bar">${PALETTE.map((p) => `<span style="background:${p.hex}"></span>`).join("")}</div>
  </div></section>

  <section><div class="wrap">
    <p class="kicker">03 — Typography</p>
    <h2>Three-family system</h2>
    <div class="type-spec">
      <div class="meta"><span class="mono">Display · Outfit</span><span class="mono">Headings · Wordmark · Numbers</span></div>
      <div style="font-family:var(--display);font-weight:800;font-size:46px;letter-spacing:-.025em;line-height:1.05">Organized. Efficient.</div>
    </div>
    <div class="type-spec">
      <div class="meta"><span class="mono">Body · Mulish</span><span class="mono">UI text · Descriptions</span></div>
      <p style="font-size:17px;max-width:60ch;margin:0">Scan barcodes, track movement, and manage stock levels across multiple stores — all from your pocket. Clean, fast, reliable.</p>
    </div>
    <div class="type-spec">
      <div class="meta"><span class="mono">Mono · JetBrains Mono</span><span class="mono">SKUs · Codes · Metadata</span></div>
      <p class="mono" style="font-size:15px;margin:0">RIB-001 · MAIN · 8691000000084</p>
    </div>
  </div></section>

  <section><div class="wrap">
    <p class="kicker">04 — Design templates</p>
    <h2>Core UI components</h2>
    <p class="lead">Building blocks shared across every screen. Radii: 8 / 12 / 16px and pill. Borders and dividers use Near Black at low opacity so surfaces stay pure white.</p>
    <h3>Buttons</h3>
    <div class="row"><button class="btn btn-primary">Generate report</button><button class="btn btn-secondary">＋ Add</button></div>
    <h3>Stock badges</h3>
    <div class="row" style="gap:12px">
      <span class="badge" style="background:rgba(21,19,19,.05);color:var(--mid)"><span class="dot" style="background:var(--mid)"></span>In stock</span>
      <span class="badge" style="background:rgba(21,19,19,.10);color:var(--charcoal)"><span class="dot" style="background:var(--charcoal)"></span>Low stock</span>
      <span class="badge" style="background:rgba(21,19,19,.14);color:var(--black)"><span class="dot" style="background:var(--black)"></span>Out of stock</span>
    </div>
    <h3>Product card</h3>
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:baseline"><strong style="font-family:var(--display);font-size:16px">Packing Tape · Clear 48 mm</strong><span style="font-family:var(--display);font-weight:800;font-size:18px">19</span></div>
      <div class="mono" style="font-size:12px;color:var(--mid);margin-top:4px">TAPE-001 · MAIN · 8691000000053</div>
    </div>
  </div></section>

  <section><div class="wrap">
    <p class="kicker">05 — Usage</p>
    <h2>Do &amp; don't</h2>
    <div class="do-dont">
      <div class="box do"><h4>Do</h4><ul><li>Keep the canvas white and let ink lead.</li><li>Use mono for all codes, SKUs, and metadata.</li><li>Signal stock state with weight and fill.</li><li>Preserve clear space around the mark.</li></ul></div>
      <div class="box dont"><h4>Don't</h4><ul><li>Introduce color, gradients, or shadows on the mark.</li><li>Set body copy in Outfit or headings in Mulish.</li><li>Rely on hue alone to convey status.</li><li>Shrink the mark below 20px.</li></ul></div>
    </div>
  </div></section>

  <footer><div class="wrap">Stokta Brand &amp; Design Guidelines · v1.0 · Demir Software — Built to be self-hosted.</div></footer>
</body>
</html>`;
}

// ─── React docs view (previews & downloads the same document) ─────
export function BrandDocs({ onBack }: { onBack: () => void }) {
  const html = useMemo(() => buildGuideHTML(), []);

  const files: { icon: typeof Download; label: string; run: () => void }[] = [
    { icon: FileCode2, label: "Brand guide (.html)", run: () => download("stokta-brand-guide.html", html, "text/html") },
    { icon: ImageIcon, label: "App icon (.svg)", run: () => download("stokta-app-icon.svg", appIconSVG(512), "image/svg+xml") },
    { icon: ImageIcon, label: "Symbol mark (.svg)", run: () => download("stokta-mark.svg", markSVG(256), "image/svg+xml") },
    { icon: ImageIcon, label: "Wordmark (.svg)", run: () => download("stokta-wordmark.svg", wordmarkSVG("#151313", 96), "image/svg+xml") },
    { icon: ImageIcon, label: "Logo lockup (.svg)", run: () => download("stokta-lockup.svg", lockupSVG("#151313", 96), "image/svg+xml") },
    { icon: Palette, label: "Tokens (.css)", run: () => download("stokta-tokens.css", tokensCSS(), "text/css") },
    { icon: Braces, label: "Tokens (.json)", run: () => download("stokta-tokens.json", tokensJSON(), "application/json") },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: FONT.body }}>
      {/* Toolbar */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: C.ink, color: C.onPrimary, padding: "14px 20px", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.12)", color: "#fff", border: "none", borderRadius: 10, padding: "8px 12px", cursor: "pointer", fontFamily: FONT.display, fontWeight: 600, fontSize: 14 }}>
          <ArrowLeft size={16} /> App
        </button>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 16, letterSpacing: "-0.01em" }}>Stokta — Brand & Design Guidelines</span>
          <span style={{ fontFamily: FONT.mono, fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em" }}>v1.0 · self-hostable</span>
        </div>
        <button
          onClick={() => download("stokta-brand-guide.html", html, "text/html")}
          style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 7, background: "#fff", color: C.ink, border: "none", borderRadius: 10, padding: "9px 15px", cursor: "pointer", fontFamily: FONT.display, fontWeight: 700, fontSize: 14 }}
        >
          <Download size={16} /> Download guide
        </button>
      </div>

      {/* Downloads panel */}
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "20px 20px 0" }}>
        <p style={{ fontFamily: FONT.mono, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: C.muted, marginBottom: 12 }}>
          Downloads — drop the .html on any static host
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {files.map(({ icon: Icon, label, run }) => (
            <button
              key={label}
              onClick={run}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.raised, border: `1px solid ${C.border}`, borderRadius: 11, padding: "10px 14px", cursor: "pointer", fontFamily: FONT.body, fontWeight: 600, fontSize: 14, color: C.ink }}
            >
              <Icon size={16} color={C.inkSoft} /> {label}
            </button>
          ))}
        </div>
      </div>

      {/* Live preview of the exact downloadable document */}
      <div style={{ maxWidth: 980, margin: "0 auto", padding: 20 }}>
        <div style={{ borderRadius: 18, overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: "0 20px 60px rgba(0,0,0,0.12)", background: "#fff" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", borderBottom: `1px solid ${C.hairline}`, background: C.surface }}>
            {["#151313", "#585858", "#969696"].map((c) => (
              <span key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />
            ))}
            <span style={{ marginLeft: 8, fontFamily: FONT.mono, fontSize: 11, color: C.muted }}>stokta-brand-guide.html</span>
          </div>
          <iframe title="Stokta brand guide preview" srcDoc={html} style={{ width: "100%", height: 720, border: "none", display: "block", background: "#fff" }} />
        </div>
      </div>
    </div>
  );
}
