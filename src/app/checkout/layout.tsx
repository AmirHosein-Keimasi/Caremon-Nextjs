import type { Metadata } from "next";
import { SITE_URL, defaultOpenGraph } from "@/lib/site";

const title = "تسویه حساب و پرداخت";
const description = "تأیید رزرو و تکمیل اطلاعات برای پرداخت اجاره خودرو در کارِمون.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: true },
  openGraph: {
    ...defaultOpenGraph,
    title: `${title} | کارِمون`,
    description,
    url: `${SITE_URL}/checkout`,
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
