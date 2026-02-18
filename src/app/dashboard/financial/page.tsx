"use client";

import { useState } from "react";
import Link from "next/link";
import { BreadcrumbNav } from "@/components/breadcrumb-nav/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import { useReservationStore } from "@/store/reservationStore";
import Invoice from "@/components/Invoice/Invoice";

export default function FinancialPage() {
  const reservationStore = useReservationStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const reservations = reservationStore.reservations;
  const selected = selectedId
    ? reservations.find((r) => r.id === selectedId)
    : null;

  const totalPaid = reservations
    .filter((r) => r.paymentStatus === "completed")
    .reduce((sum, r) => sum + r.paidAmount, 0);

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <BreadcrumbNav
        items={[
          { label: "خانه", href: "/" },
          { label: "پنل کاربری", href: "/dashboard" },
          { label: "مالی" },
        ]}
        className="mb-6"
      />
      <h1 className="text-2xl font-bold text-foreground m-0 mb-2">
        مالی و فاکتورها
      </h1>
      <p className="text-muted-foreground mb-6">
        خلاصه پرداخت‌ها و فاکتورهای رزرو. درآمد حاصل از اجارهٔ خودروهای شما (در نسخه‌های بعدی) اینجا نمایش داده می‌شود.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <div className="p-4 rounded-xl border border-border bg-card">
          <p className="text-sm text-muted-foreground m-0">تعداد رزروها</p>
          <p className="text-2xl font-bold text-foreground m-0 mt-1">{reservations.length}</p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card">
          <p className="text-sm text-muted-foreground m-0">مجموع پرداخت‌شده</p>
          <p className="text-2xl font-bold text-primary m-0 mt-1">
            {totalPaid.toLocaleString("fa-IR")} تومان
          </p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card">
          <p className="text-sm text-muted-foreground m-0">درآمد از اجاره خودرو</p>
          <p className="text-2xl font-bold text-foreground m-0 mt-1">—</p>
          <p className="text-xs text-muted-foreground m-0">به‌زودی</p>
        </div>
      </div>

      {selected ? (
        <div className="space-y-4">
          <Button variant="outline" onClick={() => setSelectedId(null)}>
            بازگشت به لیست
          </Button>
          <Invoice reservation={selected} />
        </div>
      ) : (
        <>
          <h2 className="text-lg font-semibold text-foreground mb-4">فاکتورهای اخیر</h2>
          {reservations.length === 0 ? (
            <div className="text-center py-12 rounded-xl bg-muted/50 border border-dashed border-border">
              <p className="text-muted-foreground m-0">هنوز فاکتوری ثبت نشده است.</p>
              <Button asChild className="mt-4">
                <Link href="/search">جستجو و رزرو خودرو</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-2 list-none p-0 m-0">
              {reservations.slice(0, 10).map((res) => (
                <li key={res.id}>
                  <button
                    type="button"
                    className="w-full text-right p-4 rounded-lg border border-border bg-card hover:bg-muted transition-colors"
                    onClick={() => setSelectedId(res.id)}
                  >
                    <span className="font-mono text-sm text-muted-foreground">{res.id}</span>
                    <span className="block font-semibold text-foreground mt-1">
                      {res.totalPrice.toLocaleString("fa-IR")} تومان
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
