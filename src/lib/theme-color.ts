/**
 * تنظیمات رنگ پرایمری تم (قابل تغییر توسط کاربر)
 * با تغییر hue در oklch، کل سایت لایو آپدیت می‌شود.
 */

export const PRIMARY_THEME_STORAGE_KEY = "maincaremon-primary-hue";
export const DEFAULT_PRIMARY_HUE = 235;

const clampHue = (h: number) => ((h % 360) + 360) % 360;

export function getStoredPrimaryHue(): number | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(PRIMARY_THEME_STORAGE_KEY);
  if (raw === null) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? clampHue(n) : null;
}

export function setStoredPrimaryHue(hue: number): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PRIMARY_THEME_STORAGE_KEY, String(clampHue(hue)));
}

/** مقادیر oklch با hue قابل تنظیم - تم روشن */
function lightPrimaryVars(hue: number) {
  const H = hue.toFixed(0);
  return {
    "--primary": `oklch(0.50 0.22 ${H})`,
    "--primary-foreground": "oklch(0.99 0 0)",
    "--ring": `oklch(0.50 0.22 ${H})`,
    "--accent": `oklch(0.94 0.03 ${H})`,
    "--sidebar-primary": `oklch(0.50 0.22 ${H})`,
    "--sidebar-primary-foreground": "oklch(0.99 0 0)",
    "--sidebar-ring": `oklch(0.50 0.22 ${H})`,
    "--chart-1": `oklch(0.65 0.22 ${H})`,
  } as Record<string, string>;
}

/** مقادیر oklch با hue قابل تنظیم - تم تیره */
function darkPrimaryVars(hue: number) {
  const H = hue.toFixed(0);
  return {
    "--primary": `oklch(0.65 0.20 ${H})`,
    "--primary-foreground": "oklch(0.12 0.02 250)",
    "--ring": `oklch(0.55 0.20 ${H})`,
    "--accent": `oklch(0.28 0.04 ${H})`,
    "--sidebar-primary": `oklch(0.65 0.20 ${H})`,
    "--sidebar-primary-foreground": "oklch(0.12 0.02 250)",
    "--sidebar-ring": `oklch(0.55 0.20 ${H})`,
    "--chart-1": `oklch(0.70 0.20 ${H})`,
  } as Record<string, string>;
}

/**
 * اعمال hue انتخاب‌شده روی document.
 * در حالت تم تیره مقادیر متفاوتی استفاده می‌شود.
 */
export function applyPrimaryHue(hue: number, isDark: boolean): void {
  if (typeof document === "undefined") return;
  const vars = isDark ? darkPrimaryVars(hue) : lightPrimaryVars(hue);
  const root = document.documentElement;
  for (const [key, value] of Object.entries(vars)) {
    root.style.setProperty(key, value);
  }
}

const PRIMARY_CSS_KEYS = [
  "--primary",
  "--primary-foreground",
  "--ring",
  "--accent",
  "--sidebar-primary",
  "--sidebar-primary-foreground",
  "--sidebar-ring",
  "--chart-1",
];

/** حذف override رنگ پرایمری تا مقادیر پیش‌فرض CSS اعمال شوند */
export function clearPrimaryHueOverride(): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  for (const key of PRIMARY_CSS_KEYS) {
    root.style.removeProperty(key);
  }
}

/**
 * برای اسکریپت قبل از هیدریت: فقط از localStorage می‌خواند و اعمال می‌کند.
 * isDark را از class روی html می‌گیرد (اگر next-themes قبلاً ست کرده باشد).
 */
export function applyStoredPrimaryHueToDocument(): void {
  if (typeof document === "undefined") return;
  const stored = getStoredPrimaryHue();
  if (stored === null) return;
  const isDark = document.documentElement.classList.contains("dark");
  applyPrimaryHue(stored, isDark);
}
