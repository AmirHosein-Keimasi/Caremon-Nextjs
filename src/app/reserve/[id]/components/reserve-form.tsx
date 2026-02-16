"use client";

import { ReactElement, useState } from "react";

import CardComponent from "@/components/card-component/card-component";

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
      <CardComponent>
        <div className="p-8 text-center">
          <h3 className="text-[var(--color-text-700)] mb-2">درخواست رزرو ثبت شد</h3>
          <p className="text-[var(--color-text-400)] text-sm">کارشناسان ما به زودی با شما تماس خواهند گرفت.</p>
        </div>
      </CardComponent>
    );
  }

  return (
    <CardComponent>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-700)]">فرم رزرو</h3>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm text-[var(--color-text-400)]">نام و نام خانوادگی</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="نام کامل"
            className="px-3 py-2 border border-[var(--color-border)] rounded-[var(--border-radius)] bg-[var(--color-surface-400)] text-[var(--color-text-700)] focus:outline-2 focus:outline-[var(--color-primary)] focus:outline-offset-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="text-sm text-[var(--color-text-400)]">شماره تماس</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            placeholder="09123456789"
            className="px-3 py-2 border border-[var(--color-border)] rounded-[var(--border-radius)] bg-[var(--color-surface-400)] text-[var(--color-text-700)] focus:outline-2 focus:outline-[var(--color-primary)] focus:outline-offset-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm text-[var(--color-text-400)]">ایمیل</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="example@example.com"
            className="px-3 py-2 border border-[var(--color-border)] rounded-[var(--border-radius)] bg-[var(--color-surface-400)] text-[var(--color-text-700)] focus:outline-2 focus:outline-[var(--color-primary)] focus:outline-offset-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="startDate" className="text-sm text-[var(--color-text-400)]">تاریخ تحویل</label>
          <input 
            type="date" 
            id="startDate" 
            name="startDate" 
            required 
            className="px-3 py-2 border border-[var(--color-border)] rounded-[var(--border-radius)] bg-[var(--color-surface-400)] text-[var(--color-text-700)] focus:outline-2 focus:outline-[var(--color-primary)] focus:outline-offset-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="endDate" className="text-sm text-[var(--color-text-400)]">تاریخ بازگرداندن</label>
          <input 
            type="date" 
            id="endDate" 
            name="endDate" 
            required 
            className="px-3 py-2 border border-[var(--color-border)] rounded-[var(--border-radius)] bg-[var(--color-surface-400)] text-[var(--color-text-700)] focus:outline-2 focus:outline-[var(--color-primary)] focus:outline-offset-2"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-3 rounded-[var(--border-radius)] bg-[var(--color-primary)] text-[var(--color-primary-opposite)] font-medium border-none cursor-pointer transition-colors mt-2 hover:bg-[var(--color-primary-lighter)] disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "در حال ثبت..." : "ثبت درخواست رزرو"}
        </button>
      </form>
    </CardComponent>
  );
}
