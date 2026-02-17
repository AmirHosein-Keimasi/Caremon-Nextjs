"use client";

import { ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import LayoutContainer from "@/components/layout-container/layout-container.component";
import DarkModeToggleComponent from "../dark-mode-toggle/dark-mode-toggle.component";
import CompareLinkComponent from "../compare-link/compare-link.component";
import UserPanel from "./UserPanel";

import clsx from "clsx";
import useAuth from "@/utils/useAuth";

const links = [
  { href: "/", title: "خانه" },
  { href: "/search", title: "جستجو" },
  { href: "/about", title: "درباره ما" },
  { href: "/questions", title: "سوالات متداول" },
  { href: "/Rules", title: "شرایط و قوانین" },
];

export default function HeaderComponent(): ReactElement {
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();

  return (
    <header className="text-foreground w-full shrink-0 flex flex-col items-center bg-background pt-5 pb-4 ">
      <LayoutContainer className="w-full">
        <div className="w-full min-w-0 flex justify-between items-center gap-4">
          {/* سمت راست (در RTL): لینک‌های ناوبری */}
          <nav className="flex shrink-0" aria-label="منوی اصلی">
            <ul className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 items-center">
              <li>
                <CompareLinkComponent />
              </li>
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={clsx(
                      "transition-colors hover:text-primary whitespace-nowrap",
                      pathname === link.href && "text-primary",
                    )}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {/* سمت چپ (در RTL): سوئیچ تم + دکمه ورود */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <DarkModeToggleComponent />
            {isLoggedIn ? (
              <UserPanel />
            ) : (
              <Button
                variant="outline"
                asChild
                className="rounded-xl border-primary text-primary hover:bg-primary/10 hover:text-primary"
              >
                <Link href="/auth/signin">ورود | ثبت‌نام</Link>
              </Button>
            )}
          </div>
        </div>
      </LayoutContainer>
    </header>
  );
}
