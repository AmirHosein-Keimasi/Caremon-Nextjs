import type { Metadata } from "next";
import { SITE_URL, defaultOpenGraph } from "@/lib/site";

const title = "بازیابی رمز عبور";
const description = "دریافت لینک بازیابی رمز عبور حساب کاربری کارِمون.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: true },
  openGraph: {
    ...defaultOpenGraph,
    title: `${title} | کارِمون`,
    description,
    url: `${SITE_URL}/auth/forgot-password`,
  },
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
