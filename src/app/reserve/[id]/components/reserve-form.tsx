"use client";

import { ReactElement, useState } from "react";
import {
  Loader2Icon,
  UserRound,
  CalendarRange,
  Send,
  CheckCircle2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

type Props = {
  carId: string;
  carName: string;
  carImage?: string;
};

export default function ReserveForm({
  carId,
  carName,
}: Props): ReactElement {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get("name") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const startDateValue = formData.get("startDate") as string;
    const endDateValue = formData.get("endDate") as string;

    if (!name) {
      setError("لطفاً نام و نام خانوادگی را وارد کنید.");
      return;
    }

    if (!/^09\d{9}$/.test(phone)) {
      setError("شماره تماس را به‌صورت ۱۱ رقمی و با ۰۹ وارد کنید.");
      return;
    }

    if (!email || !/.+@.+\..+/.test(email)) {
      setError("ایمیل وارد شده معتبر نیست.");
      return;
    }

    if (!startDateValue || !endDateValue) {
      setError("لطفاً تاریخ تحویل و بازگرداندن را وارد کنید.");
      return;
    }

    const startDate = new Date(startDateValue);
    const endDate = new Date(endDateValue);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
      setError("تاریخ تحویل نمی‌تواند قبل از امروز باشد.");
      return;
    }

    if (endDate < startDate) {
      setError("تاریخ بازگشت باید بعد از تاریخ تحویل باشد.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carId,
          carName,
          name,
          phone,
          email,
          startDate: startDateValue,
          endDate: endDateValue,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const message =
          (data && (data.error as string)) ||
          "خطا در ثبت رزرو، لطفاً بعداً دوباره تلاش کنید.";
        setError(message);
        return;
      }

      setIsSuccess(true);
    } catch {
      setError("خطا در ارتباط با سرور، لطفاً بعداً دوباره تلاش کنید.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-2xl border-2 border-primary/20 bg-card shadow-xl overflow-hidden">
        <div className="bg-gradient-to-br from-primary/15 to-primary/5 px-6 py-8 sm:p-8 text-center">
          <div className="inline-flex items-center justify-center size-16 rounded-full bg-primary/20 text-primary mb-4">
            <CheckCircle2 className="size-9" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground m-0">
            درخواست رزرو ثبت شد
          </h2>
          <p className="text-muted-foreground mt-2 mb-0 max-w-sm mx-auto">
            کارشناسان ما به‌زودی با شما تماس خواهند گرفت.
          </p>
        </div>
        <div className="p-6 border-t border-border/50">
          <a
            href={`/cars/${carId}`}
            className="block w-full py-3 text-center rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            بازگشت به صفحه خودرو
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border-2 border-border/60 bg-card shadow-xl overflow-hidden">
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 px-6 py-5 border-b border-border/50">
        <h2 className="text-lg sm:text-xl font-bold text-foreground m-0">
          تکمیل رزرو
        </h2>
        <p className="text-sm text-muted-foreground mt-1 m-0">{carName}</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-7 flex flex-col gap-6">
        {error && (
          <Alert variant="destructive" className="rounded-xl">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Section: اطلاعات تماس */}
        <section className="space-y-4" aria-labelledby="contact-heading">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center size-8 rounded-lg bg-primary/15 text-primary">
              <UserRound className="size-4" />
            </span>
            <h3 id="contact-heading" className="font-semibold text-foreground m-0">
              اطلاعات تماس
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 flex flex-col gap-2">
              <Label htmlFor="name">نام و نام خانوادگی</Label>
              <Input
                type="text"
                id="name"
                name="name"
                required
                placeholder="نام کامل"
                className="rounded-xl h-11"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">شماره تماس</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                required
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                className="rounded-xl h-11"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">ایمیل</Label>
              <Input
                type="email"
                id="email"
                name="email"
                required
                placeholder="example@mail.com"
                className="rounded-xl h-11"
              />
            </div>
          </div>
        </section>

        {/* Section: تاریخ سفر */}
        <section className="space-y-4" aria-labelledby="dates-heading">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center size-8 rounded-lg bg-primary/15 text-primary">
              <CalendarRange className="size-4" />
            </span>
            <h3 id="dates-heading" className="font-semibold text-foreground m-0">
              تاریخ سفر
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="startDate">تحویل خودرو</Label>
              <Input
                type="date"
                id="startDate"
                name="startDate"
                required
                className="rounded-xl h-11"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="endDate">بازگرداندن</Label>
              <Input
                type="date"
                id="endDate"
                name="endDate"
                required
                className="rounded-xl h-11"
              />
            </div>
          </div>
        </section>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 rounded-xl text-base font-semibold gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2Icon className="size-5 animate-spin" />
              در حال ثبت درخواست...
            </>
          ) : (
            <>
              <Send className="size-5" />
              ثبت درخواست رزرو
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
