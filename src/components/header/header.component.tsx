"use client";

import { ReactElement, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LayoutContainer from "@/components/layout-container/layout-container.component";
import DarkModeToggleComponent from "../dark-mode-toggle/dark-mode-toggle.component";
import CompareLinkComponent from "../compare-link/compare-link.component";
import UserPanel from "./UserPanel";

import clsx from "clsx";
import useAuth from "@/utils/useAuth";

const links = [
  { href: "/", title: "خانه" },
  { href: "/search", title: "جستجو" },
  { href: "/map", title: "نقشه" },
  { href: "/about", title: "درباره ما" },
  { href: "/questions", title: "سوالات متداول" },
  { href: "/Rules", title: "شرایط و قوانین" },
];

function NavLinks({
  pathname,
  rentOutHref,
  onNavigate,
  isMobile,
}: {
  pathname: string | null;
  rentOutHref: string;
  onNavigate?: () => void;
  isMobile?: boolean;
}) {
  return (
    <>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            onClick={onNavigate}
            className={clsx(
              "transition-colors hover:text-primary whitespace-nowrap min-h-[44px] flex items-center",
              pathname === link.href && "text-primary font-medium",
            )}
          >
            {link.title}
          </Link>
        </li>
      ))}

      <li>
        <Link
          href={rentOutHref}
          onClick={onNavigate}
          className={clsx(
            "flex items-center gap-1.5 text-primary font-medium hover:underline whitespace-nowrap min-h-[44px]",
            pathname === "/cars/add" && "underline",
          )}
        >
          <Car className="size-4 shrink-0" />
          {isMobile ? "ثبت خودرو" : "خودرو اجاره بده"}
        </Link>
      </li>
    </>
  );
}

export default function HeaderComponent(): ReactElement {
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [ctaBarOpen, setCtaBarOpen] = useState(true);

  const rentOutHref = isLoggedIn
    ? "/cars/add"
    : "/auth/signin?redirect=/cars/add";

  return (
    <header className="sticky mb-5 top-0 z-50 w-full shrink-0 flex flex-col items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* نوار CTA: خودروی خود را اجاره بدهید — موبایل مخفی، دسکتاپ نمایش؛ با دکمه بستن */}
      {ctaBarOpen && (
        <div className="hidden lg:block w-full bg-primary/10 border-b border-primary/20 py-2">
          <LayoutContainer className="w-full">
            <div className="flex items-center justify-between gap-4 text-sm">
              <p className="m-0 text-foreground/90 font-medium text-right min-w-0 flex-1">
                خودرو دارید؟{" "}
                <span className="text-primary font-semibold">
                  همین‌جا برای اجاره ثبت کنید
                </span>{" "}
                و از اجارهٔ آن درآمد داشته باشید.
              </p>
              <Button
                asChild
                size="sm"
                className="rounded-lg gap-1.5 bg-primary hover:bg-primary/90 shrink-0"
              >
                <Link href={rentOutHref}>
                  <Car className="size-4" />
                  ثبت خودرو برای اجاره
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 shrink-0 rounded-lg text-muted-foreground hover:text-foreground"
                onClick={() => setCtaBarOpen(false)}
                aria-label="بستن نوار"
              >
                <X className="size-4" />
              </Button>
            </div>
          </LayoutContainer>
        </div>
      )}

      {/* هدر اصلی */}
      <div className="w-full py-3 lg:py-4">
        <LayoutContainer className="w-full">
          <div className="w-full min-w-0 flex justify-between items-center gap-3 lg:gap-4 overflow-visible">
            {/* موبایل: دکمه منو */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden size-11 shrink-0 rounded-xl"
                  aria-label="باز کردن منو"
                >
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[min(320px,85vw)] border-l border-border p-0"
              >
                <SheetHeader className="border-b border-border p-4 text-right">
                  <SheetTitle className="text-lg font-bold">
                    منوی اصلی
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col p-4" aria-label="منوی اصلی">
                  <ul className="flex flex-col gap-1 list-none p-0 m-0">
                    <NavLinks
                      pathname={pathname}
                      rentOutHref={rentOutHref}
                      onNavigate={() => setSheetOpen(false)}
                      isMobile
                    />
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>

            {/* دسکتاپ: منوی ناوبری افقی */}
            <nav className="hidden lg:flex shrink-0" aria-label="منوی اصلی">
              <ul className="flex items-center gap-6 xl:gap-8 list-none p-0 m-0">
                <NavLinks pathname={pathname} rentOutHref={rentOutHref} />
              </ul>
            </nav>

            {/* لوگو/عنوان — موبایل */}
            <Link
              href="/"
              className="lg:hidden text-lg font-bold text-foreground truncate min-w-0"
            >
              کارِمون
            </Link>

            {/* سمت چپ (در RTL): سوئیچ تم + مقایسه (اگر لاگین) + دکمه ورود — هم موبایل هم دسکتاپ */}
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 shrink-0 overflow-visible">
              <DarkModeToggleComponent />
              {isLoggedIn && <CompareLinkComponent />}
              {isLoggedIn ? (
                <UserPanel />
              ) : (
                <Button
                  variant="outline"
                  asChild
                  className="rounded-xl border-primary text-primary hover:bg-primary/10 hover:text-primary min-h-[44px] text-sm lg:text-base px-3 lg:px-4"
                >
                  <Link href="/auth/signin">ورود | ثبت‌نام</Link>
                </Button>
              )}
            </div>
          </div>
        </LayoutContainer>
      </div>
    </header>
  );
}
