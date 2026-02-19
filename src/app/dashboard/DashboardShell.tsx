"use client";

import { ReactElement, useEffect, useMemo } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import useAuth from "@/utils/useAuth";
import { tokenUtils } from "@/lib/api-client";
import { toast } from "sonner";
import clsx from "clsx";
import Loading from "@/app/loading";

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
}: {
  pathname: string | null;
  onNavigate?: () => void;
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

  const currentItem = useMemo(() => {
    if (!pathname) return navItems[0];
    const sorted = [...navItems].sort((a, b) => b.href.length - a.href.length);
    return sorted.find((item) => pathname.startsWith(item.href)) ?? navItems[0];
  }, [pathname]);

  const handleSelectChange = (value: string) => {
    router.push(value);
  };

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

  if (isLoading || !isLoggedIn) {
    return <Loading />;
  }

  const CurrentIcon = currentItem.icon;

  return (
    <div className="rtl min-h-dvh flex flex-col bg-background lg:flex-row">
      {/* موبایل: سلکت‌باکس + خروج */}
      <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-border bg-card/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-card/80 lg:hidden">
        <div className="min-w-0 flex-1">
          <Select value={currentItem.href} onValueChange={handleSelectChange}>
            <SelectTrigger className="min-h-[44px] w-full rounded-xl border-border bg-background text-base font-medium text-right flex-row-reverse [&>svg]:shrink-0">
              <span className="flex items-center gap-3 min-w-0 flex-1 text-right justify-end flex-row-reverse">
                <span className="truncate">{currentItem.label}</span>
                <CurrentIcon className="size-5 shrink-0 text-primary" />
              </span>
            </SelectTrigger>
            <SelectContent
              className="rounded-xl text-right"
              sideOffset={4}
              dir="rtl"
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SelectItem
                    key={item.href}
                    value={item.href}
                    className="min-h-[44px] rounded-lg text-right [&>span:last-child]:flex [&>span:last-child]:items-center [&>span:last-child]:gap-3 [&>span:last-child]:justify-end"
                  >
                    <span className="flex items-center gap-3 justify-end">
                      <Icon className="size-5 shrink-0 text-primary" />
                      {item.label}
                    </span>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="ghost"
          className="shrink-0 gap-2 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive min-h-[44px] px-3 flex-row-reverse"
          onClick={handleLogout}
        >
          <LogOut className="size-5 shrink-0" />
          <span>خروج</span>
        </Button>
      </header>

      {/* دسکتاپ: سایدبار ثابت */}
      <aside className="hidden shrink-0 border-l  rounded-2xl border-border bg-card lg:block lg:w-[280px] xl:w-[300px]">
        <div className="sticky top-0 flex h-dvh flex-col">
          <div className="border-b border-border p-5">
            <h2 className="font-bold text-lg text-foreground m-0">
              پنل کاربری
            </h2>
            <p className="text-sm text-muted-foreground m-0 mt-1">
              مدیریت اجاره و رزروها
            </p>
          </div>
          <nav className="flex-1 overflow-y-auto p-3 flex flex-col gap-0.5">
            <NavLinks pathname={pathname} />
            <div className="  border-t border-border pt-3">
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
      <main className="flex-1 min-w-0 overflow-x-hidden">{children}</main>
    </div>
  );
}
