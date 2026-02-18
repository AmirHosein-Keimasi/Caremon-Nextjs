import type { Metadata } from "next";
import { SITE_URL, defaultOpenGraph } from "@/lib/site";

const title = "پروفایل کاربر";
const description = "مدیریت اطلاعات پروفایل و تنظیمات حساب کاربری در کارِمون.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: true },
  openGraph: {
    ...defaultOpenGraph,
    title: `${title} | کارِمون`,
    description,
    url: `${SITE_URL}/profile`,
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
