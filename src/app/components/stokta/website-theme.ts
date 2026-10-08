import { useEffect, useState } from "react";

export type WebsiteThemePreference = "system" | "light" | "dark" | "colorblind";

const STORAGE_KEY = "stokta.website.theme";
const allowedThemes: WebsiteThemePreference[] = ["system", "light", "dark", "colorblind"];

function storedPreference(): WebsiteThemePreference {
  if (typeof window === "undefined") return "system";
  try {
    const value = window.localStorage.getItem(STORAGE_KEY) as WebsiteThemePreference | null;
    return value && allowedThemes.includes(value) ? value : "system";
  } catch {
    return "system";
  }
}

function resolvedTheme(preference: WebsiteThemePreference): Exclude<WebsiteThemePreference, "system"> {
  if (preference !== "system") return preference;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(preference: WebsiteThemePreference) {
  if (typeof window === "undefined") return;
  const theme = resolvedTheme(preference);
  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.themePreference = preference;
  document.documentElement.style.colorScheme = theme === "dark" ? "dark" : "light";
  const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  themeColor?.setAttribute("content", theme === "dark" ? "#181818" : "#FFFFFF");
}

export function initializeWebsiteTheme() {
  applyTheme(storedPreference());
}

export function useWebsiteTheme() {
  const [preference, setPreference] = useState<WebsiteThemePreference>(storedPreference);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, preference);
    } catch {
      // A blocked storage API should not prevent theme selection for this visit.
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => applyTheme(preference);
    sync();
    if (preference !== "system") return;

    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [preference]);

  return { preference, setPreference };
}
