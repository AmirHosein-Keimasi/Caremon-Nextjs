"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useTheme } from "next-themes";
import {
  applyPrimaryHue,
  clearPrimaryHueOverride,
  DEFAULT_PRIMARY_HUE,
  getStoredPrimaryHue,
  PRIMARY_THEME_STORAGE_KEY,
  setStoredPrimaryHue,
} from "@/lib/theme-color";

type PrimaryThemeContextValue = {
  /** hue فعلی (۰–۳۶۰). اگر null باشد یعنی استفاده از تم پیش‌فرض */
  primaryHue: number | null;
  /** تغییر رنگ پرایمری؛ با null به پیش‌فرض برمی‌گردد */
  setPrimaryHue: (hue: number | null) => void;
  /** hue پیش‌فرض برای دکمه «پیش‌فرض» */
  defaultHue: number;
};

const PrimaryThemeContext = createContext<PrimaryThemeContextValue | null>(
  null,
);

export function usePrimaryTheme(): PrimaryThemeContextValue {
  const ctx = useContext(PrimaryThemeContext);
  if (!ctx) {
    throw new Error("usePrimaryTheme must be used inside PrimaryThemeProvider");
  }
  return ctx;
}

export function PrimaryThemeProvider({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [primaryHue, setPrimaryHueState] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const isDark = resolvedTheme === "dark";

  const setPrimaryHue = useCallback((hue: number | null) => {
    if (hue === null) {
      setStoredPrimaryHue(DEFAULT_PRIMARY_HUE);
      localStorage.removeItem(PRIMARY_THEME_STORAGE_KEY);
      setPrimaryHueState(null);
      clearPrimaryHueOverride();
      return;
    }
    const clamped = ((hue % 360) + 360) % 360;
    setStoredPrimaryHue(clamped);
    setPrimaryHueState(clamped);
    applyPrimaryHue(
      clamped,
      document.documentElement.classList.contains("dark"),
    );
  }, []);

  // بار اول از localStorage بخوان و اعمال کن
  useEffect(() => {
    const stored = getStoredPrimaryHue();
    setPrimaryHueState(stored);
    setMounted(true);
  }, []);

  // هر وقت primaryHue یا تم (روشن/تیره) عوض شد، رنگ را روی document اعمال کن
  useEffect(() => {
    if (!mounted) return;
    if (primaryHue === null) {
      clearPrimaryHueOverride();
      return;
    }
    applyPrimaryHue(primaryHue, isDark);
  }, [mounted, primaryHue, isDark]);

  const value = useMemo<PrimaryThemeContextValue>(
    () => ({
      primaryHue,
      setPrimaryHue,
      defaultHue: DEFAULT_PRIMARY_HUE,
    }),
    [primaryHue, setPrimaryHue],
  );

  return (
    <PrimaryThemeContext.Provider value={value}>
      {children}
    </PrimaryThemeContext.Provider>
  );
}
