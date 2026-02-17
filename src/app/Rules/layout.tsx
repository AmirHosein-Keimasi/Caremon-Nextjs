import type { Metadata } from "next";
import { SITE_URL, defaultOpenGraph } from "@/lib/site";

export const dynamic = "force-static";

const title = "شرایط و قوانین";
const description =
  "شرایط و قوانین اجاره خودرو در کارِمون. قوانین اجاره، مسئولیت‌ها، بیمه و مقررات استفاده از سرویس را مطالعه کنید.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["شرایط و قوانین", "قوانین اجاره خودرو", "کارمون", "مقررات"],
  openGraph: {
    ...defaultOpenGraph,
    title: `${title} | کارِمون`,
    description,
    url: `${SITE_URL}/Rules`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | کارِمون`,
    description,
  },
  alternates: {
    canonical: `${SITE_URL}/Rules`,
  },
};

export default function RulesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
