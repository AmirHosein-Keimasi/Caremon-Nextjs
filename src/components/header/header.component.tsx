"use client";

import { ReactElement } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import DarkModeToggleComponent from "../dark-mode-toggle/dark-mode-toggle.component";
import UserPanel from "./UserPanel";

import clsx from "clsx";

import useAuth from "@/utils/useAuth";

const links = [
  { href: "/", title: "خانه" },
  { href: "/search", title: "جستجو" },
  { href: "/questions", title: "سوالات متداول" },
  { href: "/Rules", title: "شرایط و قوانین" },
];

export default function HeaderComponent(): ReactElement {
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();

  return (
    <header className="flex items-center gap-8 py-4">
      <nav>
        <ul className="flex gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={clsx(
                  pathname === link.href && "text-[var(--color-primary)]",
                )}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {isLoggedIn ? (
        <div className="ms-auto flex-shrink-0">
          <UserPanel />
        </div>
      ) : (
        <Link
          href="/auth/signin"
          className="bg-transparent text-[var(--color-primary)] ms-auto px-4 py-2 border border-current rounded-[var(--border-radius)] font-bold cursor-pointer hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-opposite)]"
        >
          ورود | ثبت‌نام
        </Link>
      )}

      <DarkModeToggleComponent />
    </header>
  );
}
