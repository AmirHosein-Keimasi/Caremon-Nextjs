import type { Metadata } from "next";
import { SITE_URL, defaultOpenGraph } from "@/lib/site";
import DashboardShell from "./DashboardShell";

export const metadata: Metadata = {
  title: "پنل کاربری",
  description:
    "مدیریت اجاره‌ها، رزروها، خودروهای من و تنظیمات حساب در کارِمون.",
  robots: { index: false, follow: true },
  openGraph: {
    ...defaultOpenGraph,
    title: "پنل کاربری | کارِمون",
    url: `${SITE_URL}/dashboard`,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
