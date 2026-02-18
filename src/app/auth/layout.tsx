import type { Metadata } from "next";
import { SITE_URL, defaultOpenGraph } from "@/lib/site";

export const metadata: Metadata = {
  title: "ورود و ثبت نام",
  description: "ورود به حساب یا ثبت نام در کارِمون برای اجاره و رزرو خودرو.",
  robots: { index: false, follow: true },
  openGraph: {
    ...defaultOpenGraph,
    url: `${SITE_URL}/auth`,
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
