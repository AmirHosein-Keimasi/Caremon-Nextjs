import { ReactElement } from "react";
import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";

import HeaderComponent from "@/components/header/header.component";
import FooterComponent from "@/components/footer/footer.component";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION, defaultOpenGraph } from "@/lib/site";

import "./globals.css";
import "../styles/typography.css";

const vazirmatn = Vazirmatn({
  subsets: ["latin", "arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "اجاره خودرو",
    "رزرو ماشین",
    "اجاره ماشین آنلاین",
    "کارمون",
    "ایران",
  ],
  openGraph: {
    ...defaultOpenGraph,
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.className} w-full min-w-0`}
      suppressHydrationWarning
    >
      <body className="w-full min-w-0 overflow-x-hidden" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <div className="flex min-h-dvh flex-col w-full min-w-0">
              <HeaderComponent />
              <div className="flex flex-1 flex-col items-center w-full min-w-0">
                <main className="w-full min-w-0 max-w-full flex-1">{children}</main>
              </div>
              <FooterComponent />
            </div>
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
