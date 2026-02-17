"use client";
import { ReactElement } from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggleComponent(): ReactElement {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const storedMode = localStorage.getItem("dark-mode");
    if (storedMode !== null) {
      setDarkMode(storedMode === "true");
    }
  }, []);
  useEffect(() => {
    const html = document.documentElement;
    html.dataset.theme = darkMode ? "dark" : "light";
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("dark-mode", newMode.toString());
      return newMode;
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="w-16 h-8 flex items-center p-0 overflow-hidden"
      onClick={toggleDarkMode}
    >
      <div
        className={`w-8 h-8 rounded-lg transition-[transform,background-color] duration-500 ease-in-out relative flex items-center justify-center p-1 ${
          darkMode
            ? "bg-muted text-muted-foreground -translate-x-8"
            : "bg-amber-400/60 text-amber-950 translate-x-0"
        }`}
      >
        {darkMode ? <Moon /> : <Sun />}
      </div>
    </Button>
  );
}
