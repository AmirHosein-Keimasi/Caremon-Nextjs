"use client";

import { ReactElement, useEffect } from "react";
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
import useAuth from "@/utils/useAuth";
import { tokenUtils } from "@/lib/api-client";
import { toast } from "sonner";
import clsx from "clsx";

const navItems = [
  { href: "/dashboard", label: "نمای کلی", icon: LayoutDashboard },
  { href: "/dashboard/profile", label: "پروفایل", icon: User },
  { href: "/dashboard/cars/add", label: "ثبت خودرو برای اجاره", icon: Car },
  { href: "/dashboard/my-cars", label: "خودروهای من (اجاره داده)", icon: List },
  { href: "/dashboard/rentals", label: "اجاره‌های من (اجاره گرفته)", icon: CalendarCheck2 },
  { href: "/dashboard/financial", label: "مالی و فاکتورها", icon: Wallet },
  { href: "/dashboard/support", label: "پشتیبانی", icon: Headphones },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace("/auth/signin?redirect=" + encodeURIComponent(pathname || "/dashboard"));
    }
  }, [isLoading, isLoggedIn, router, pathname]);

  const handleLogout = () => {
    tokenUtils.removeToken();
    toast.success("خروج با موفقیت انجام شد");
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        در حال بارگذاری...
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        در حال انتقال به صفحه ورود...
      </div>
    );
  }

  return (
    <div className="rtl min-h-screen bg-background flex flex-col md:flex-row">
      {/* سایدبار پنل کاربری */}
      <aside className="w-full md:w-64 lg:w-72 shrink-0 border-l border-border bg-card">
        <div className="p-4 border-b border-border">
          <h2 className="font-bold text-lg text-foreground m-0">پنل کاربری</h2>
          <p className="text-sm text-muted-foreground m-0 mt-1">مدیریت اجاره و رزروها</p>
        </div>
        <nav className="p-3 flex flex-col gap-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted",
                )}
              >
                <Icon className="size-5 shrink-0" />
                {item.label}
              </Link>
            );
          })}
          <div className="mt-2 pt-2 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="size-5 shrink-0" />
              خروج
            </Button>
          </div>
        </nav>
      </aside>

      {/* محتوای اصلی */}
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  );
}
