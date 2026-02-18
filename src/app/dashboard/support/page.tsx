"use client";

import Link from "next/link";
import { BreadcrumbNav } from "@/components/breadcrumb-nav/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, FileQuestion } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-5 lg:px-8 lg:py-8">
      <BreadcrumbNav
        items={[
          { label: "خانه", href: "/" },
          { label: "پنل کاربری", href: "/dashboard" },
          { label: "پشتیبانی" },
        ]}
        className="mb-4 lg:mb-6"
      />
      <h1 className="text-xl font-bold text-foreground m-0 mb-1.5 lg:text-2xl lg:mb-2">
        پشتیبانی
      </h1>
      <p className="text-sm text-muted-foreground mb-6 lg:mb-8">
        برای سوالات، مشکلات فنی یا راهنمایی با ما در ارتباط باشید.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/about"
          className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary hover:shadow-md active:scale-[0.99] lg:p-5"
        >
          <div className="shrink-0 rounded-lg bg-primary/10 p-2.5">
            <Mail className="size-6 text-primary" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-foreground m-0">تماس با ما</h3>
            <p className="text-sm text-muted-foreground mt-1 m-0">
              از طریق فرم تماس در صفحه درباره ما پیام بفرستید.
            </p>
          </div>
        </Link>

        <Link
          href="/questions"
          className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary hover:shadow-md active:scale-[0.99] lg:p-5"
        >
          <div className="shrink-0 rounded-lg bg-primary/10 p-2.5">
            <FileQuestion className="size-6 text-primary" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-foreground m-0">سوالات متداول</h3>
            <p className="text-sm text-muted-foreground mt-1 m-0">
              پاسخ پرسش‌های رایج درباره اجاره و مارکت‌پلیس.
            </p>
          </div>
        </Link>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4 lg:mt-8 lg:p-5">
        <h3 className="flex items-center gap-2 font-semibold text-foreground m-0">
          <MessageCircle className="size-5 shrink-0" />
          تیکت پشتیبانی (به‌زودی)
        </h3>
        <p className="text-sm text-muted-foreground mt-2 m-0">
          امکان ارسال تیکت و پیگیری درخواست‌ها در نسخه‌های بعدی اضافه خواهد شد.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild className="min-h-[44px]">
          <Link href="/about">صفحه تماس</Link>
        </Button>
        <Button variant="outline" asChild className="min-h-[44px]">
          <Link href="/questions">سوالات متداول</Link>
        </Button>
      </div>
    </div>
  );
}
