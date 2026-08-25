// Stokta design tokens — warm cream / graphite with muted, vintage-compatible
// semantic stock colors. Kept in one place so the whole app reads as one system.

// Strict monochrome system — only these six grayscale values, plus opacity
// tints of Near Black for surfaces and lines.
//   #ffffff White · #969696 Silver · #747474 Mid · #585858 Dark
//   #383737 Charcoal · #151313 Near Black
export const C = {
  // surfaces
  bg: "#ffffff",
  surface: "rgba(21, 19, 19, 0.055)",
  surfaceAlt: "rgba(21, 19, 19, 0.03)",
  raised: "#ffffff",

  // ink
  ink: "#151313",
  inkSoft: "#383737",
  muted: "#747474",
  faint: "#969696",

  // lines
  border: "rgba(21, 19, 19, 0.12)",
  borderStrong: "rgba(21, 19, 19, 0.24)",
  hairline: "rgba(21, 19, 19, 0.07)",

  // primary action
  primary: "#151313",
  onPrimary: "#ffffff",

  // monochrome stock states — differentiated by weight + fill, not hue
  inStock: "#747474",
  inStockBg: "rgba(21, 19, 19, 0.05)",
  low: "#383737",
  lowBg: "rgba(21, 19, 19, 0.10)",
  out: "#151313",
  outBg: "rgba(21, 19, 19, 0.14)",
} as const;

export const FONT = {
  display: "'Outfit', sans-serif",
  body: "'Mulish', sans-serif",
  mono: "'JetBrains Mono', monospace",
} as const;

export type StockState = "in" | "low" | "out";

export function stockOf(qty: number): StockState {
  if (qty <= 0) return "out";
  if (qty <= 20) return "low";
  return "in";
}

export const STOCK_META: Record<
  StockState,
  { label: string; color: string; bg: string }
> = {
  in: { label: "In stock", color: C.inStock, bg: C.inStockBg },
  low: { label: "Low stock", color: C.low, bg: C.lowBg },
  out: { label: "Out of stock", color: C.out, bg: C.outBg },
};
