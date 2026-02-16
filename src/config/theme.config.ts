/**
 * Theme Configuration
 * تنظیمات تم و رنگ‌های پروژه
 */

export const themeConfig = {
  colors: {
    primary: {
      50: "hsl(200deg 90% 98%)",
      100: "hsl(200deg 90% 96%)",
      200: "hsl(200deg 90% 92%)",
      300: "hsl(200deg 90% 85%)",
      400: "hsl(200deg 90% 70%)",
      500: "hsl(200deg 86% 50%)",
      600: "hsl(200deg 86% 35%)",
      700: "hsl(200deg 86% 25.46%)",
      800: "hsl(200deg 90% 20%)",
      900: "hsl(200deg 95% 15%)",
      950: "hsl(200deg 100% 10%)",
    },
    gray: {
      50: "hsl(200deg 10% 99%)",
      100: "hsl(200deg 10% 97%)",
      200: "hsl(200deg 10% 93%)",
      300: "hsl(200deg 10% 85%)",
      400: "hsl(200deg 10% 70%)",
      500: "hsl(200deg 10% 50%)",
      600: "hsl(200deg 10% 40%)",
      700: "hsl(200deg 10% 30%)",
      800: "hsl(200deg 10% 20%)",
      900: "hsl(200deg 10% 15%)",
      950: "hsl(200deg 10% 10%)",
    },
    success: {
      DEFAULT: "hsl(142deg 71% 45%)",
      light: "hsl(142deg 71% 55%)",
      dark: "hsl(142deg 71% 35%)",
    },
    warning: {
      DEFAULT: "hsl(38deg 92% 50%)",
      light: "hsl(38deg 92% 60%)",
      dark: "hsl(38deg 92% 40%)",
    },
    danger: {
      DEFAULT: "hsl(10deg 86% 37%)",
      light: "hsl(10deg 86% 47%)",
      dark: "hsl(10deg 86% 27%)",
    },
    info: {
      DEFAULT: "hsl(199deg 89% 48%)",
      light: "hsl(199deg 89% 58%)",
      dark: "hsl(199deg 89% 38%)",
    },
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
  },
  borderRadius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  },
  transitions: {
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    base: "250ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "350ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
  typography: {
    fontFamily: {
      base: "var(--font-vazirmatn, system-ui, sans-serif)",
    },
    fontSize: {
      xs: "clamp(0.5rem, 0.3929rem + 0.4762vw, 0.75rem)",
      sm: "clamp(0.75rem, 0.6964rem + 0.2381vw, 0.875rem)",
      base: "clamp(0.875rem, 0.8214rem + 0.2381vw, 1rem)",
      lg: "clamp(1.125rem, 1.2321rem + -0.4762vw, 0.875rem)",
      xl: "clamp(1.5rem, 1.2857rem + 0.9524vw, 2rem)",
      "2xl": "clamp(1.75rem, 1.4286rem + 1.4286vw, 2.5rem)",
      "3xl": "clamp(2.5rem, 1.8571rem + 2.8571vw, 4rem)",
      "4xl": "clamp(3rem, 1.7143rem + 5.7143vw, 6rem)",
    },
  },
  container: {
    maxWidth: "85rem",
    padding: "calc(max(100% - 85rem, 2rem) / 2)",
  },
} as const;

export type ThemeConfig = typeof themeConfig;

/**
 * Helper function to get CSS variable name
 */
export function getThemeVar(category: keyof ThemeConfig, key: string): string {
  return `--${category}-${key}`;
}

/**
 * Helper function to get color value
 */
export function getColor(
  color: keyof ThemeConfig["colors"],
  shade?: string | number,
): string {
  const colorValue = themeConfig.colors[color];
  if (typeof colorValue === "string") {
    return colorValue;
  }
  if (shade && typeof colorValue === "object" && shade in colorValue) {
    return colorValue[shade as keyof typeof colorValue] as string;
  }
  // Handle different color structures
  if ("DEFAULT" in colorValue) {
    return colorValue.DEFAULT as string;
  }
  if ("500" in colorValue) {
    return colorValue[500] as string;
  }
  // Fallback to first available value
  const firstKey = Object.keys(colorValue)[0];
  return firstKey
    ? (colorValue[firstKey as keyof typeof colorValue] as string)
    : "";
}
