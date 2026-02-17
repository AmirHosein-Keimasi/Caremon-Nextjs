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
    <Button
      variant="outline"
      size="sm"
      className="w-16 h-8 flex items-center p-0 overflow-hidden"
      onClick={toggleDarkMode}
    >
      <div
        className={`w-8 h-8 rounded-lg transition-[transform,background-color] duration-500 ease-in-out relative flex items-center justify-center p-1 ${
          isDark
            ? "bg-muted text-muted-foreground -translate-x-8"
            : "bg-amber-400/60 text-amber-950 translate-x-0"
        }`}
      >
        {isDark ? <Moon /> : <Sun />}
      </div>
    </Button>
  );
}
