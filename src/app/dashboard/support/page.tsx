"use client";

import Link from "next/link";
import { BreadcrumbNav } from "@/components/breadcrumb-nav/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, FileQuestion } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <BreadcrumbNav
        items={[
          { label: "خانه", href: "/" },
          { label: "پنل کاربری", href: "/dashboard" },
          { label: "پشتیبانی" },
        ]}
        className="mb-6"
      />
      <h1 className="text-2xl font-bold text-foreground m-0 mb-2">
        پشتیبانی
      </h1>
      <p className="text-muted-foreground mb-8">
        برای سوالات، مشکلات فنی یا درخواست راهنمایی با ما در ارتباط باشید.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/about"
          className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary hover:bg-muted/50 transition-all"
        >
          <div className="p-2 rounded-lg bg-primary/10">
            <Mail className="size-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground m-0">تماس با ما</h3>
            <p className="text-sm text-muted-foreground m-0 mt-1">
              از طریق فرم تماس در صفحه درباره ما پیام بفرستید.
            </p>
          </div>
        </Link>

        <a
          href="/questions"
          className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary hover:bg-muted/50 transition-all"
        >
          <div className="p-2 rounded-lg bg-primary/10">
            <FileQuestion className="size-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground m-0">سوالات متداول</h3>
            <p className="text-sm text-muted-foreground m-0 mt-1">
              پاسخ پرسش‌های رایج درباره اجاره و مارکت‌پلیس.
            </p>
          </div>
        </a>
      </div>

      <div className="mt-8 p-5 rounded-xl border border-border bg-muted/30">
        <h3 className="font-semibold text-foreground m-0 flex items-center gap-2">
          <MessageCircle className="size-5" />
          تیکت پشتیبانی (به‌زودی)
        </h3>
        <p className="text-sm text-muted-foreground mt-2 m-0">
          امکان ارسال تیکت و پیگیری درخواست‌ها در نسخه‌های بعدی اضافه خواهد شد. تا آن زمان از تماس و سوالات متداول استفاده کنید.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/about">صفحه تماس</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/questions">سوالات متداول</Link>
        </Button>
      </div>
    </div>
  );
}
