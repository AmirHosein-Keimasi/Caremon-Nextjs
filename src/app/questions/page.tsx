"use client";

import { useState } from "react";
import Accordion from "@/components/Accordion/Accordion.component";
import { faqData, faqGuest, faqHolder } from "./data/faqData";
import { HelpCircle } from "lucide-react";
import { BreadcrumbNav } from "@/components/breadcrumb-nav/breadcrumb-nav";

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState<"general" | "guest" | "holder">("general");

  const tabClass =
    "px-3 py-2 rounded-lg text-xs font-semibold transition-all lg:px-4 lg:py-2.5 lg:text-sm";

  return (
    <main className="w-full min-w-0 max-w-full overflow-x-hidden">
      <div className="w-full min-w-0 max-w-full px-4 lg:max-w-5xl lg:px-6 lg:mx-auto">
        <BreadcrumbNav
          items={[
            { label: "خانه", href: "/" },
            { label: "سوالات متداول" },
          ]}
          className="pt-4 pb-2"
        />
        {/* Hero */}
        <section className="py-6 text-center lg:py-10">
          <div className="space-y-2 lg:space-y-3">
            <div className="flex justify-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center lg:w-12 lg:h-12">
                <HelpCircle className="w-5 h-5 text-primary lg:w-6 lg:h-6" />
              </div>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-4xl">
              سوالات <span className="text-primary">متداول</span>
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed lg:text-lg">
              پاسخ به تمام پرسش‌های شما درباره کارِمون و نحوه استفاده از
              سرویس‌های ما
            </p>
          </div>
        </section>

        {/* Tabs */}
        <section className="py-4 lg:py-6">
          <div className="flex gap-2 justify-center flex-wrap lg:gap-3">
            <button
              onClick={() => setActiveTab("general")}
              className={`${tabClass} ${
                activeTab === "general"
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:bg-muted/50"
              }`}
            >
              سوالات عمومی
            </button>
            <button
              onClick={() => setActiveTab("guest")}
              className={`${tabClass} ${
                activeTab === "guest"
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:bg-muted/50"
              }`}
            >
              اجاره‌گیرندگان
            </button>
            <button
              onClick={() => setActiveTab("holder")}
              className={`${tabClass} ${
                activeTab === "holder"
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:bg-muted/50"
              }`}
            >
              مالکین خودرو (مارکت‌پلیس)
            </button>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-6 w-full min-w-0 lg:py-10">
          <div className="w-full space-y-4 min-w-0">
            {activeTab === "general" && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-3 lg:mb-4">
                  <h2 className="text-lg font-bold text-foreground lg:text-xl">
                    سوالات عمومی
                  </h2>
                  <p className="text-muted-foreground text-xs mt-0.5 lg:text-sm lg:mt-1">
                    پاسخ به پرسش‌های رایج درباره کارِمون و نحوه کارکرد آن
                  </p>
                </div>
                <Accordion items={faqData} />
              </div>
            )}
            {activeTab === "guest" && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-3 lg:mb-4">
                  <h2 className="text-lg font-bold text-foreground lg:text-xl">
                    سوالات اجاره‌گیرندگان
                  </h2>
                  <p className="text-muted-foreground text-xs mt-0.5 lg:text-sm lg:mt-1">
                    راهنمای کامل برای استفاده از خدمات کارِمون به عنوان
                    اجاره‌گیرنده
                  </p>
                </div>
                <Accordion items={faqGuest} />
              </div>
            )}
            {activeTab === "holder" && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-3 lg:mb-4">
                  <h2 className="text-lg font-bold text-foreground lg:text-xl">
                    سوالات مالکین خودرو (هولدر / مارکت‌پلیس)
                  </h2>
                  <p className="text-muted-foreground text-xs mt-0.5 lg:text-sm lg:mt-1">
                    راهنمای ثبت خودرو و کسب درآمد از اجاره در کارِمون
                  </p>
                </div>
                <Accordion items={faqHolder} />
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-6 border-t border-border lg:py-10">
          <div className="rounded-lg border border-border p-4 text-center space-y-2 lg:p-6 lg:space-y-3">
            <h2 className="text-base font-bold text-foreground lg:text-xl">
              پاسخ پرسش خود را نیافتید؟
            </h2>
            <p className="text-muted-foreground text-sm lg:text-base">
              تیم پشتیبانی ما اینجا است تا کمک کند
            </p>
            <a
              href="/about"
              className="inline-block px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity lg:px-5 lg:py-3 lg:text-base"
            >
              برای تماس اینجا کلیک کنید
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
