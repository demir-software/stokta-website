// Seeded from the current Stokta screenshots so the redesign stays faithful
// to real data rather than lorem ipsum.

export type Product = {
  id: string;
  name: string;
  store: string;
  sku: string;
  code: string;
  barcode: string;
  qty: number;
};

export const PRODUCTS: Product[] = [
  { id: "p1", name: "Barcode Printer Ribbon", store: "MAIN", sku: "RIB-001", code: "RIBBON-110", barcode: "8691000000084", qty: 9 },
  { id: "p2", name: "Corrugated Carton · Small", store: "MAIN", sku: "BOX-001", code: "BOX-SMALL", barcode: "8691000000046", qty: 126 },
  { id: "p3", name: "Industrial Nitrile Gloves · M", store: "MAIN", sku: "PPE-001", code: "PPE-GLV-M", barcode: "8691000000015", qty: 18 },
  { id: "p4", name: "Packing Tape · Clear 48 mm", store: "MAIN", sku: "TAPE-001", code: "TAPE-CLR-48", barcode: "8691000000053", qty: 19 },
  { id: "p5", name: "Retractable Safety Cutter", store: "MAIN", sku: "TOOL-001", code: "TOOL-CUT-01", barcode: "8691000000060", qty: 15 },
  { id: "p6", name: "Stretch Wrap Roll · 50 cm", store: "MAIN", sku: "WRAP-001", code: "WRAP-500", barcode: "8691000000077", qty: 31 },
  { id: "p7", name: "Thermal Shipping Labels · 100 × 150", store: "MAIN", sku: "LBL-001", code: "LBL-100150", barcode: "8691000000091", qty: 44 },
  { id: "p8", name: "Bubble Wrap · Large Cell", store: "MAIN", sku: "WRAP-002", code: "WRAP-BBL-L", barcode: "8691000000107", qty: 4 },
];

export type Activity = {
  id: string;
  product: string;
  delta: number;
  store: string;
  when: string;
};

export const ACTIVITY: Activity[] = [
  { id: "a1", product: "Barcode Printer Ribbon", delta: 12, store: "MAIN", when: "2h ago" },
  { id: "a2", product: "Packing Tape · Clear 48 mm", delta: -2, store: "MAIN", when: "5h ago" },
  { id: "a3", product: "Industrial Nitrile Gloves · M", delta: 30, store: "MAIN", when: "Yesterday" },
  { id: "a4", product: "Corrugated Carton · Small", delta: -14, store: "MAIN", when: "Yesterday" },
];

export type Store = {
  id: string;
  name: string;
  code: string;
  products: number;
  units: number;
  low: number;
};

export const STORES: Store[] = [
  { id: "s1", name: "Main Store", code: "MAIN", products: 8, units: 266, low: 4 },
];

export type Report = {
  id: string;
  date: string;
  period: string;
  format: string;
  size: string;
};

export const REPORTS: Report[] = [
  { id: "r1", date: "24 AUG 2026", period: "30 DAYS", format: "XLSX", size: "48 KB" },
  { id: "r2", date: "17 AUG 2026", period: "7 DAYS", format: "CSV", size: "12 KB" },
  { id: "r3", date: "01 AUG 2026", period: "3 MONTHS", format: "XLSX", size: "96 KB" },
];

export const INTEGRATIONS = [
  { id: "gdrive", name: "Google Drive", connected: false, hue: "#4285F4" },
  { id: "ms365", name: "Microsoft 365", connected: false, hue: "#D83B01" },
  { id: "yandex", name: "Yandex Disk", connected: false, hue: "#FF0000" },
];
