// Canonical Stokta brand assets as portable SVG strings.
// Single source of truth: rendered on-screen (dangerouslySetInnerHTML) AND
// offered as downloadable .svg files, so the docs never drift from the exports.

export const PALETTE = [
  { name: "White", hex: "#ffffff", role: "Canvas / surfaces", token: "--stokta-white" },
  { name: "Silver", hex: "#969696", role: "Faint text / disabled", token: "--stokta-silver" },
  { name: "Mid Gray", hex: "#747474", role: "Secondary text / metadata", token: "--stokta-mid" },
  { name: "Dark Gray", hex: "#585858", role: "Tertiary ink / lines", token: "--stokta-dark" },
  { name: "Charcoal", hex: "#383737", role: "Soft ink / icons", token: "--stokta-charcoal" },
  { name: "Near Black", hex: "#151313", role: "Primary ink / actions", token: "--stokta-black" },
] as const;

const BARS: [number, number][] = [
  [5, 2], [8.5, 1], [11, 3], [16, 1], [19, 2], [23, 1], [26, 3], [31, 1], [34, 2],
];

// ─── Symbol mark (barcode in rounded square) ──────────────────────
export function markSVG(size = 96, opts: { bg?: string; bar?: string; outline?: boolean } = {}): string {
  const bg = opts.outline ? "none" : opts.bg ?? "#151313";
  const bar = opts.bar ?? (opts.outline ? "#151313" : "#ffffff");
  const stroke = opts.outline ? `stroke="#151313" stroke-width="1.5"` : "";
  const bars = BARS.map(
    ([x, w], i) => `<rect x="${x}" y="9" width="${w}" height="15" fill="${bar}" opacity="${i % 2 === 0 ? 0.92 : 0.42}"/>`
  ).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 40 40" role="img" aria-label="Stokta mark">
  <rect width="40" height="40" rx="9" fill="${bg}" ${stroke}/>
  ${bars}
  <rect x="4" y="17.75" width="32" height="2.2" rx="1.1" fill="${bar}" opacity="0.9"/>
  <rect x="5" y="27" width="28" height="1.8" rx="0.9" fill="${bar}" opacity="0.26"/>
  <rect x="5" y="30.5" width="16" height="1.8" rx="0.9" fill="${bar}" opacity="0.14"/>
</svg>`;
}

// ─── App icon (larger, with scan line + framing) ──────────────────
export function appIconSVG(size = 200): string {
  const bars = BARS.map(([x, w], i) => {
    const X = 30 + x * 3.5;
    return `<rect x="${X}" y="66" width="${w * 3.5}" height="58" fill="#ffffff" opacity="${i % 2 === 0 ? 0.95 : 0.45}"/>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 200 200" role="img" aria-label="Stokta app icon">
  <rect width="200" height="200" rx="44" fill="#151313"/>
  <rect x="30" y="52" width="140" height="86" rx="10" fill="none" stroke="#585858" stroke-width="2"/>
  ${bars}
  <rect x="24" y="96" width="152" height="2.5" rx="1.25" fill="#969696"/>
  <rect x="30" y="150" width="112" height="4" rx="2" fill="#ffffff" opacity="0.85"/>
  <rect x="30" y="160" width="72" height="4" rx="2" fill="#747474"/>
  <rect x="0.75" y="0.75" width="198.5" height="198.5" rx="43.25" fill="none" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1.5"/>
</svg>`;
}

// ─── Wordmark (Outfit) ────────────────────────────────────────────
export function wordmarkSVG(color = "#151313", size = 64): string {
  const w = Math.round(size * 3.1);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${Math.round(size * 1.2)}" viewBox="0 0 ${w} ${Math.round(size * 1.2)}" role="img" aria-label="Stokta wordmark">
  <text x="0" y="${size}" font-family="Outfit, sans-serif" font-weight="800" font-size="${size}" letter-spacing="-0.025em" fill="${color}">Stokta</text>
</svg>`;
}

// ─── Full horizontal lockup (mark + wordmark) ─────────────────────
export function lockupSVG(color = "#151313", size = 64): string {
  const gap = Math.round(size * 0.34);
  const wordW = Math.round(size * 2.9);
  const total = size + gap + wordW;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${total}" height="${size}" viewBox="0 0 ${total} ${size}" role="img" aria-label="Stokta logo lockup">
  <g transform="translate(0,0) scale(${size / 40})">${markSVG(40).replace(/<\/?svg[^>]*>/g, "")}</g>
  <text x="${size + gap}" y="${Math.round(size * 0.72)}" font-family="Outfit, sans-serif" font-weight="800" font-size="${Math.round(size * 0.78)}" letter-spacing="-0.025em" fill="${color}">Stokta</text>
</svg>`;
}

// ─── Design tokens as CSS / JSON ──────────────────────────────────
export function tokensCSS(): string {
  const lines = PALETTE.map((p) => `  ${p.token}: ${p.hex};`).join("\n");
  return `:root {
${lines}

  /* semantic roles */
  --stokta-bg: var(--stokta-white);
  --stokta-ink: var(--stokta-black);
  --stokta-ink-soft: var(--stokta-charcoal);
  --stokta-muted: var(--stokta-mid);
  --stokta-faint: var(--stokta-silver);
  --stokta-border: rgba(21, 19, 19, 0.12);
  --stokta-hairline: rgba(21, 19, 19, 0.07);
  --stokta-primary: var(--stokta-black);
  --stokta-on-primary: var(--stokta-white);

  /* type */
  --stokta-font-display: "Outfit", sans-serif;
  --stokta-font-body: "Mulish", sans-serif;
  --stokta-font-mono: "JetBrains Mono", monospace;

  /* radii */
  --stokta-radius-sm: 8px;
  --stokta-radius-md: 12px;
  --stokta-radius-lg: 16px;
  --stokta-radius-pill: 999px;
}`;
}

export function tokensJSON(): string {
  return JSON.stringify(
    {
      name: "Stokta Design Tokens",
      version: "1.0.0",
      color: Object.fromEntries(PALETTE.map((p) => [p.token.replace("--stokta-", ""), { hex: p.hex, role: p.role }])),
      font: {
        display: "Outfit",
        body: "Mulish",
        mono: "JetBrains Mono",
      },
      radius: { sm: 8, md: 12, lg: 16, pill: 999 },
    },
    null,
    2
  );
}
