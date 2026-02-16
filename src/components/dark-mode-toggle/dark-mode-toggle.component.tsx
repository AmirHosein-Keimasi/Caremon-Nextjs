"use client";
import { ReactElement } from "react";
import { useState, useEffect } from "react";
import { MoonIcon } from "@/icons/MoonIcon";
import { SunIcon } from "@/icons/SunIcon";

export default function DarkModeToggleComponent(): ReactElement {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const storedMode = localStorage.getItem("dark-mode");
    if (storedMode !== null) {
      setDarkMode(storedMode === "true");
    }
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("dark-mode", newMode.toString());
      return newMode;
    });
  };

  return (
    <button
      className="w-16 h-8 flex items-center transition-all duration-300 ease-in-out rtl outline-none bg-transparent text-[var(--color-primary)] border border-current rounded-[var(--border-radius)] cursor-pointer hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-opposite)]"
      onClick={toggleDarkMode}
    >
      <div
        className={`w-8 h-8 rounded-[var(--border-radius)] transition-[transform,background-color] duration-500 ease-in-out relative flex items-center justify-center p-1 text-[var(--color-gray-10)] ${
          darkMode
            ? "bg-[var(--color-gray-30)] -translate-x-8"
            : "bg-[#ffd9009c] translate-x-0"
        }`}
      >
        {darkMode ? <MoonIcon></MoonIcon> : <SunIcon></SunIcon>}
      </div>
    </button>
  );
}
