import type { Metadata } from "next";
import { SITE_URL, defaultOpenGraph } from "@/lib/site";

export const dynamic = "force-static";

const title = "سوالات متداول";
const description =
  "پاسخ به تمام پرسش‌های شما درباره کارِمون و نحوه استفاده از سرویس‌های اجاره خودرو و رزرو آنلاین ماشین.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "سوالات متداول",
    "FAQ کارمون",
    "اجاره خودرو",
    "رزرو ماشین",
    "پشتیبانی",
  ],
  openGraph: {
    ...defaultOpenGraph,
    title: `${title} | کارِمون`,
    description,
    url: `${SITE_URL}/questions`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | کارِمون`,
    description,
  },
  alternates: {
    canonical: `${SITE_URL}/questions`,
  },
};

export default function QuestionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
