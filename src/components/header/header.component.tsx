"use client";

import { ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import DarkModeToggleComponent from "../dark-mode-toggle/dark-mode-toggle.component";
import CompareLinkComponent from "../compare-link/compare-link.component";
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
        <ul className="flex gap-8 items-center">
          <li>
            <CompareLinkComponent />
          </li>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={clsx(
                  pathname === link.href && "text-primary",
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
        <Button variant="outline" asChild className="ms-auto">
          <Link href="/auth/signin">ورود | ثبت‌نام</Link>
        </Button>
      )}

      <DarkModeToggleComponent />
    </header>
  );
}
