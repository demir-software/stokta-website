import { ReactNode, useEffect } from "react";
import { C, FONT } from "./tokens";

// ─── Stokta barcode mark (compact, for header/about) ──────────────
export function StoktaMark({ size = 28, dark = true }: { size?: number; dark?: boolean }) {
  const bg = dark ? C.ink : "transparent";
  const bar = dark ? "#ffffff" : C.ink;
  const bars: [number, number][] = [
    [5, 2], [8.5, 1], [11, 3], [16, 1], [19, 2], [23, 1], [26, 3], [31, 1], [34, 2],
  ];
  const r = Math.round(size * 0.24);
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={{ display: "block", flexShrink: 0 }}>
      <rect width="40" height="40" rx={r} fill={bg} />
      {bars.map(([x, w], i) => (
        <rect key={i} x={x} y="9" width={w} height="15" fill={bar} opacity={i % 2 === 0 ? 0.92 : 0.42} />
      ))}
      <rect x="4" y="17.75" width="32" height="2.2" rx="1.1" fill={bar} opacity="0.9" />
      <rect x="5" y="27" width="28" height="1.8" rx="0.9" fill={bar} opacity="0.26" />
      <rect x="5" y="30.5" width="16" height="1.8" rx="0.9" fill={bar} opacity="0.14" />
    </svg>
  );
}

// ─── Buttons ──────────────────────────────────────────────────────
export function PrimaryButton({ children, onClick, full }: { children: ReactNode; onClick?: () => void; full?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: FONT.display, fontWeight: 600, fontSize: 15,
        background: C.primary, color: C.onPrimary, border: "none",
        borderRadius: 12, padding: "13px 20px", cursor: "pointer",
        width: full ? "100%" : undefined, letterSpacing: "-0.01em",
      }}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, onClick, active }: { children: ReactNode; onClick?: () => void; active?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: FONT.display, fontWeight: 600, fontSize: 14,
        background: active ? C.ink : C.raised,
        color: active ? C.onPrimary : C.ink,
        border: `1px solid ${active ? C.ink : C.border}`,
        borderRadius: 11, padding: "9px 14px", cursor: "pointer", letterSpacing: "-0.01em",
        display: "inline-flex", alignItems: "center", gap: 7, whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}

export function IconButton({ children, onClick, filled, label }: { children: ReactNode; onClick?: () => void; filled?: boolean; label?: string }) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      style={{
        width: 42, height: 42, borderRadius: 11,
        background: filled ? C.ink : C.raised,
        color: filled ? C.onPrimary : C.ink,
        border: `1px solid ${filled ? C.ink : C.border}`,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
}

// ─── Section header ───────────────────────────────────────────────
export function SectionHeader({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", margin: "0 0 12px" }}>
      <h2 style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 15, color: C.ink, letterSpacing: "-0.01em", textTransform: "uppercase", opacity: 0.55 }}>
        {children}
      </h2>
      {action}
    </div>
  );
}

// ─── Monospace metadata line ──────────────────────────────────────
export function Meta({ children }: { children: ReactNode }) {
  return (
    <span style={{ fontFamily: FONT.mono, fontSize: 12, color: C.muted, letterSpacing: "0.02em" }}>
      {children}
    </span>
  );
}

// ─── Status dot + label ───────────────────────────────────────────
export function StatusBadge({ color, bg, label, dotOnly }: { color: string; bg: string; label: string; dotOnly?: boolean }) {
  if (dotOnly) {
    return <span title={label} style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0, display: "inline-block" }} />;
  }
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: bg, borderRadius: 999, padding: "3px 9px 3px 8px" }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: color }} />
      <span style={{ fontFamily: FONT.body, fontWeight: 600, fontSize: 11.5, color }}>{label}</span>
    </span>
  );
}

// ─── Bottom sheet ─────────────────────────────────────────────────
export function BottomSheet({ open, onClose, title, children }: { open: boolean; onClose: () => void; title?: string; children: ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "absolute", inset: 0, zIndex: 40,
        background: open ? "rgba(21,19,17,0.32)" : "transparent",
        pointerEvents: open ? "auto" : "none",
        transition: "background 0.22s ease",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: C.bg, borderTopLeftRadius: 22, borderTopRightRadius: 22,
          padding: "10px 20px calc(20px + env(safe-area-inset-bottom))",
          transform: open ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.28s cubic-bezier(0.32,0.72,0,1)",
          boxShadow: "0 -12px 40px rgba(0,0,0,0.18)",
          maxHeight: "82%", overflowY: "auto",
        }}
      >
        <div style={{ width: 38, height: 4, borderRadius: 2, background: C.borderStrong, margin: "0 auto 14px" }} />
        {title && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h3 style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 20, color: C.ink, letterSpacing: "-0.015em" }}>{title}</h3>
            <button onClick={onClose} aria-label="Close" style={{ width: 30, height: 30, borderRadius: 999, border: "none", background: C.surface, color: C.inkSoft, cursor: "pointer", fontSize: 17, lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

// ─── Menu row (for sheets / overflow menus) ───────────────────────
export function MenuRow({ icon, label, onClick, destructive }: { icon?: ReactNode; label: string; onClick?: () => void; destructive?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%", display: "flex", alignItems: "center", gap: 14,
        background: "none", border: "none", padding: "13px 4px", cursor: "pointer",
        fontFamily: FONT.body, fontWeight: 600, fontSize: 15,
        color: destructive ? C.out : C.ink, textAlign: "left",
      }}
    >
      {icon && <span style={{ color: destructive ? C.out : C.inkSoft, display: "flex" }}>{icon}</span>}
      {label}
    </button>
  );
}

export function MenuGroupLabel({ children }: { children: ReactNode }) {
  return (
    <p style={{ fontFamily: FONT.mono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: C.faint, margin: "10px 4px 2px" }}>
      {children}
    </p>
  );
}

// ─── Segmented control ────────────────────────────────────────────
export function Segmented<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: { value: T; label: string }[] }) {
  return (
    <div style={{ display: "flex", background: C.surface, borderRadius: 11, padding: 3, gap: 3 }}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            style={{
              flex: 1, border: "none", cursor: "pointer",
              background: active ? C.raised : "transparent",
              boxShadow: active ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
              color: active ? C.ink : C.muted,
              fontFamily: FONT.display, fontWeight: 600, fontSize: 13.5,
              borderRadius: 8, padding: "8px 6px", letterSpacing: "-0.01em",
              transition: "all 0.15s",
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Grouped settings list ────────────────────────────────────────
export function SettingsGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <p style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 12.5, letterSpacing: "0.06em", textTransform: "uppercase", color: C.muted, margin: "0 4px 8px" }}>
        {title}
      </p>
      <div style={{ background: C.raised, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

export function SettingsRow({ icon, label, value, onClick, control, last }: { icon?: ReactNode; label: string; value?: string; onClick?: () => void; control?: ReactNode; last?: boolean }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
        borderBottom: last ? "none" : `1px solid ${C.hairline}`,
        cursor: onClick ? "pointer" : "default",
      }}
    >
      {icon && (
        <span style={{ width: 30, height: 30, borderRadius: 8, background: C.surface, color: C.inkSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {icon}
        </span>
      )}
      <span style={{ fontFamily: FONT.body, fontWeight: 600, fontSize: 15, color: C.ink, flex: 1 }}>{label}</span>
      {value && <span style={{ fontFamily: FONT.body, fontSize: 14, color: C.muted }}>{value}</span>}
      {control}
      {onClick && !control && <Chevron />}
    </div>
  );
}

export function Chevron() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, opacity: 0.5 }}>
      <path d="M9 18l6-6-6-6" stroke={C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Toggle ───────────────────────────────────────────────────────
export function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      style={{
        width: 46, height: 28, borderRadius: 999, border: "none", cursor: "pointer",
        background: on ? C.ink : C.borderStrong, position: "relative", flexShrink: 0,
        transition: "background 0.2s",
      }}
    >
      <span style={{ position: "absolute", top: 3, left: on ? 21 : 3, width: 22, height: 22, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.25)", transition: "left 0.2s" }} />
    </button>
  );
}

// ─── Provider glyphs — monochrome, differentiated by grayscale value ──
export function ProviderLogo({ id }: { id: string }) {
  if (id === "gdrive")
    return (
      <svg width="22" height="22" viewBox="0 0 48 48"><path fill="#151313" d="M11 40l6.5-11h27L38 40z" /><path fill="#585858" d="M31 8H17L3.5 31 10 42z" /><path fill="#969696" d="M31 8l13.5 23H31L17.5 8z" /></svg>
    );
  if (id === "ms365")
    return (
      <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#151313" d="M4 4h18v18H4z" /><path fill="#585858" d="M26 4h18v18H26z" /><path fill="#747474" d="M4 26h18v18H4z" /><path fill="#969696" d="M26 26h18v18H26z" /></svg>
    );
  // yandex
  return (
    <svg width="20" height="20" viewBox="0 0 48 48"><rect width="48" height="48" rx="10" fill="#151313" /><path fill="#fff" d="M27 12h-4.6c-4.4 0-7.4 2.9-7.4 7.1 0 3.4 1.6 5.3 4.5 6.8L15 36h4.9l4.6-9.7h1.7V36H31V12h-4zm-1 11h-1.6c-2 0-3.1-1-3.1-3.6 0-2.7 1.2-3.7 3.1-3.7H26v7.3z" /></svg>
  );
}

// ─── Empty state ──────────────────────────────────────────────────
export function EmptyState({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <div style={{ textAlign: "center", padding: "48px 24px", color: C.muted }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 14, opacity: 0.5 }}>{icon}</div>
      <p style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 17, color: C.ink }}>{title}</p>
      <p style={{ fontFamily: FONT.body, fontSize: 14, color: C.muted, marginTop: 4, lineHeight: 1.5 }}>{body}</p>
    </div>
  );
}
