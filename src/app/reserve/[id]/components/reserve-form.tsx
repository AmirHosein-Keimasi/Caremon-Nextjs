"use client";

import { ReactElement, useState } from "react";
import { Loader2Icon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

type Props = {
  carId: string;
  carName: string;
};

export default function ReserveForm({ carId, carName }: Props): ReactElement {
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

    // ولیدیشن ساده سمت فرانت برای جلوگیری از ورودی‌های نامعتبر
    if (!name) {
      setError("لطفاً نام و نام خانوادگی را وارد کنید.");
      return;
    }

    if (!/^09\d{9}$/.test(phone)) {
      setError("شماره تماس را به‌صورت 11 رقمی و با 09 وارد کنید.");
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
      <Card>
        <CardContent className="p-8 text-center">
          <h3 className="text-foreground mb-2">درخواست رزرو ثبت شد</h3>
          <p className="text-muted-foreground text-sm">کارشناسان ما به زودی با شما تماس خواهند گرفت.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">فرم رزرو</h3>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="name">نام و نام خانوادگی</Label>
            <Input
              type="text"
              id="name"
              name="name"
              required
              placeholder="نام کامل"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">شماره تماس</Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="09123456789"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">ایمیل</Label>
            <Input
              type="email"
              id="email"
              name="email"
              required
              placeholder="example@example.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="startDate">تاریخ تحویل</Label>
            <Input type="date" id="startDate" name="startDate" required />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="endDate">تاریخ بازگرداندن</Label>
            <Input type="date" id="endDate" name="endDate" required />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2Icon className="size-4 animate-spin" />
                <span>در حال ثبت...</span>
              </>
            ) : (
              "ثبت درخواست رزرو"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
