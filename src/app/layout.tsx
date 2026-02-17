import { ReactElement } from "react";
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";

import HeaderComponent from "@/components/header/header.component";
import FooterComponent from "@/components/footer/footer.component";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import "../styles/typography.css";

const vazirmatn = Vazirmatn({
  subsets: ["latin", "arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "کا‌‌‌‌رِمون",
  description:
    "پلتفرمی یکپارچه برای اجاره خودرو و رزرو آنلاین ماشین در سراسر ایران",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.className}>
      <body>
        <TooltipProvider>
          <HeaderComponent />
          <main>{children}</main>
          <FooterComponent />
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
