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
    <div className="mx-auto max-w-3xl px-4 py-5 lg:max-w-5xl lg:px-8 lg:py-8">
      <BreadcrumbNav
        items={[
          { label: "خانه", href: "/" },
          { label: "پنل کاربری", href: "/dashboard" },
          { label: "مالی" },
        ]}
        className="mb-4 lg:mb-6"
      />
      <h1 className="text-xl font-bold text-foreground m-0 mb-1.5 lg:text-2xl lg:mb-2">
        مالی و فاکتورها
      </h1>
      <p className="text-sm text-muted-foreground mb-6">
        خلاصه پرداخت‌ها و فاکتورهای رزرو.
      </p>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:mb-8 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <p className="text-sm text-muted-foreground m-0">تعداد رزروها</p>
          <p className="text-xl font-bold text-foreground m-0 mt-1 lg:text-2xl">
            {reservations.length}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <p className="text-sm text-muted-foreground m-0">مجموع پرداخت‌شده</p>
          <p className="text-xl font-bold text-primary m-0 mt-1 lg:text-2xl">
            {totalPaid.toLocaleString("fa-IR")} تومان
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm sm:col-span-2 lg:col-span-1">
          <p className="text-sm text-muted-foreground m-0">
            درآمد از اجاره خودرو
          </p>
          <p className="text-xl font-bold text-foreground m-0 mt-1 lg:text-2xl">
            —
          </p>
          <p className="text-xs text-muted-foreground m-0">به‌زودی</p>
        </div>
      </div>

      {selected ? (
        <div className="space-y-4">
          <Button
            variant="outline"
            className="min-h-[44px]"
            onClick={() => setSelectedId(null)}
          >
            بازگشت به لیست
          </Button>
          <Invoice reservation={selected} />
        </div>
      ) : (
        <>
          <h2 className="mb-4 text-lg font-semibold text-foreground lg:mb-6">
            فاکتورهای اخیر
          </h2>
          {reservations.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-muted/50 py-12 text-center">
              <p className="text-muted-foreground m-0">
                هنوز فاکتوری ثبت نشده است.
              </p>
              <Button asChild className="mt-4 min-h-[44px]">
                <Link href="/search">جستجو و رزرو خودرو</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-2 list-none p-0 m-0">
              {reservations.slice(0, 10).map((res) => (
                <li key={res.id}>
                  <button
                    type="button"
                    className="min-h-[44px] w-full rounded-xl border border-border bg-card p-4 text-right shadow-sm transition-colors hover:bg-muted"
                    onClick={() => setSelectedId(res.id)}
                  >
                    <span className="font-mono text-sm text-muted-foreground">
                      {res.id}
                    </span>
                    <span className="mt-1 block font-semibold text-foreground">
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
