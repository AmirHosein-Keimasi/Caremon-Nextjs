"use client";

import { ReactElement, useState } from "react";

import CardComponent from "@/components/card-component/card-component";

import styles from "./reserve-form.module.css";

type Props = {
  carId: string;
  carName: string;
};

export default function ReserveForm({ carId, carName }: Props): ReactElement {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carId,
          carName,
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          startDate: formData.get("startDate"),
          endDate: formData.get("endDate"),
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
      }
    } catch {
      // handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <CardComponent>
        <div className={styles.success}>
          <h3>درخواست رزرو ثبت شد</h3>
          <p>کارشناسان ما به زودی با شما تماس خواهند گرفت.</p>
        </div>
      </CardComponent>
    );
  }

  return (
    <CardComponent>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3 className={styles.title}>فرم رزرو</h3>

        <div className={styles.field}>
          <label htmlFor="name">نام و نام خانوادگی</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="نام کامل"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="phone">شماره تماس</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            placeholder="09123456789"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="email">ایمیل</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="example@example.com"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="startDate">تاریخ تحویل</label>
          <input type="date" id="startDate" name="startDate" required />
        </div>

        <div className={styles.field}>
          <label htmlFor="endDate">تاریخ بازگرداندن</label>
          <input type="date" id="endDate" name="endDate" required />
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isSubmitting}
        >
          {isSubmitting ? "در حال ثبت..." : "ثبت درخواست رزرو"}
        </button>
      </form>
    </CardComponent>
  );
}
