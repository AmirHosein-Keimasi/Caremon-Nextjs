"use client";

import { ReactElement, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggleComponent(): ReactElement {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  const toggleDarkMode = () => {
    setTheme(isDark ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="w-16 h-8" aria-hidden>
        <span className="sr-only">در حال بارگذاری تم</span>
      </Button>
    );
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={!isDark}
      aria-label={isDark ? "تغییر به تم روشن" : "تغییر به تم تاریک"}
      className="w-14 h-7 rounded-full bg-muted border border-border flex items-center p-0.5 shrink-0 transition-colors hover:bg-muted/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      onClick={toggleDarkMode}
    >
      <span
        className={`inline-flex items-center justify-center size-6 rounded-full transition-[transform,background-color] duration-300 ease-out ${
          isDark
            ? "bg-muted-foreground/20 text-muted-foreground translate-x-7 rtl:-translate-x-7"
            : "bg-amber-400/70 text-amber-950 translate-x-0"
        }`}
      >
        {isDark ? <Moon className="size-3.5" /> : <Sun className="size-3.5" />}
      </span>
    </button>
  );
}
