import { ReactElement } from "react";
import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";

import HeaderComponent from "@/components/header/header.component";
import FooterComponent from "@/components/footer/footer.component";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { PrimaryThemeProvider } from "@/contexts/primary-theme-context";

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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var k='maincaremon-primary-hue';var r=localStorage.getItem(k);if(!r)return;var h=(parseFloat(r)%360+360)%360;var H=Math.round(h);var t=localStorage.getItem('theme');var d=t==='dark'||(t!=='light'&&typeof window!=='undefined'&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches);var root=document.documentElement;var v=d?{'--primary':'oklch(0.65 0.20 '+H+')','--primary-foreground':'oklch(0.12 0.02 250)','--ring':'oklch(0.55 0.20 '+H+')','--accent':'oklch(0.28 0.04 '+H+')','--sidebar-primary':'oklch(0.65 0.20 '+H+')','--sidebar-primary-foreground':'oklch(0.12 0.02 250)','--sidebar-ring':'oklch(0.55 0.20 '+H+')','--chart-1':'oklch(0.70 0.20 '+H+')'}:{'--primary':'oklch(0.50 0.22 '+H+')','--primary-foreground':'oklch(0.99 0 0)','--ring':'oklch(0.50 0.22 '+H+')','--accent':'oklch(0.94 0.03 '+H+')','--sidebar-primary':'oklch(0.50 0.22 '+H+')','--sidebar-primary-foreground':'oklch(0.99 0 0)','--sidebar-ring':'oklch(0.50 0.22 '+H+')','--chart-1':'oklch(0.65 0.22 '+H+')'};for(var p in v)root.style.setProperty(p,v[p]);})();`,
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <PrimaryThemeProvider>
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
          </PrimaryThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
