"use client";

import { ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Car,
  List,
  CalendarCheck2,
  Wallet,
  Headphones,
  LogOut,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useAuth from "@/utils/useAuth";
import { tokenUtils } from "@/lib/api-client";
import { toast } from "sonner";
import clsx from "clsx";

const navItems = [
  { href: "/dashboard", label: "نمای کلی", icon: LayoutDashboard },
  { href: "/dashboard/profile", label: "پروفایل", icon: User },
  { href: "/dashboard/cars/add", label: "ثبت خودرو", icon: Car },
  { href: "/dashboard/my-cars", label: "خودروهای من", icon: List },
  { href: "/dashboard/rentals", label: "اجاره‌های من", icon: CalendarCheck2 },
  { href: "/dashboard/financial", label: "مالی و فاکتورها", icon: Wallet },
  { href: "/dashboard/support", label: "پشتیبانی", icon: Headphones },
];

function NavLinks({
  pathname,
  onNavigate,
  isMobile,
}: {
  pathname: string | null;
  onNavigate?: () => void;
  isMobile?: boolean;
}) {
  return (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname?.startsWith(item.href);
        const linkClass = clsx(
          "flex items-center gap-3 rounded-xl text-sm font-medium transition-colors min-h-[44px] px-3 py-2.5",
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-foreground hover:bg-muted",
        );
        return (
          <Link
            key={item.href}
            href={item.href}
            className={linkClass}
            onClick={onNavigate}
          >
            <Icon className="size-5 shrink-0" aria-hidden />
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth();
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace(
        "/auth/signin?redirect=" + encodeURIComponent(pathname || "/dashboard"),
      );
    }
  }, [isLoading, isLoggedIn, router, pathname]);

  const handleLogout = () => {
    tokenUtils.removeToken();
    toast.success("خروج با موفقیت انجام شد");
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm font-medium">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm font-medium">در حال انتقال به صفحه ورود...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rtl min-h-dvh flex flex-col bg-background lg:flex-row">
      {/* موبایل: هدر ثابت + دکمه منو */}
      <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-border bg-card/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-card/80 lg:hidden">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-11 shrink-0 rounded-xl"
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
              <SheetTitle className="text-lg font-bold">پنل کاربری</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-0.5 p-3">
              <NavLinks
                pathname={pathname}
                onNavigate={() => setSheetOpen(false)}
                isMobile
              />
              <div className="mt-2 border-t border-border pt-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive min-h-[44px]"
                  onClick={handleLogout}
                >
                  <LogOut className="size-5 shrink-0" />
                  خروج
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <h1 className="text-base font-bold text-foreground truncate">
          پنل کاربری
        </h1>
        <div className="size-11 shrink-0" aria-hidden />
      </header>

      {/* دسکتاپ: سایدبار ثابت */}
      <aside className="hidden shrink-0 border-l border-border bg-card lg:block lg:w-[280px] xl:w-[300px]">
        <div className="sticky top-0 flex h-dvh flex-col">
          <div className="border-b border-border p-5">
            <h2 className="font-bold text-lg text-foreground m-0">پنل کاربری</h2>
            <p className="text-sm text-muted-foreground m-0 mt-1">
              مدیریت اجاره و رزروها
            </p>
          </div>
          <nav className="flex-1 overflow-y-auto p-3 flex flex-col gap-0.5">
            <NavLinks pathname={pathname} />
            <div className="mt-auto border-t border-border pt-3">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive min-h-[44px]"
                onClick={handleLogout}
              >
                <LogOut className="size-5 shrink-0" />
                خروج
              </Button>
            </div>
          </nav>
        </div>
      </aside>

      {/* محتوای اصلی */}
      <main className="flex-1 min-w-0 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
