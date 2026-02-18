"use client";

import { useState } from "react";
import Link from "next/link";
import { BreadcrumbNav } from "@/components/breadcrumb-nav/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useReservationStore,
  ReservationStatus,
  Reservation,
} from "@/store/reservationStore";
import Invoice from "@/components/Invoice/Invoice";

const statusLabel: Record<ReservationStatus | "all", string> = {
  all: "همه",
  [ReservationStatus.PENDING]: "در انتظار تایید",
  [ReservationStatus.CONFIRMED]: "تایید شده",
  [ReservationStatus.ACTIVE]: "فعال",
  [ReservationStatus.COMPLETED]: "تکمیل شده",
  [ReservationStatus.CANCELLED]: "لغو شده",
};

function statusBadgeClass(status: ReservationStatus): string {
  const map: Record<ReservationStatus, string> = {
    [ReservationStatus.PENDING]:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    [ReservationStatus.CONFIRMED]:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    [ReservationStatus.ACTIVE]:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    [ReservationStatus.COMPLETED]:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    [ReservationStatus.CANCELLED]:
      "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  };
  return `inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${map[status] ?? ""}`;
}

export default function MyRentalsPage() {
  const reservationStore = useReservationStore();
  const [filterStatus, setFilterStatus] = useState<ReservationStatus | "all">(
    "all",
  );
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  const reservations = reservationStore.reservations;
  const filtered =
    filterStatus === "all"
      ? reservations
      : reservations.filter((r) => r.status === filterStatus);

  return (
    <div className="mx-auto max-w-3xl px-4 py-5 lg:max-w-5xl lg:px-8 lg:py-8">
      <BreadcrumbNav
        items={[
          { label: "خانه", href: "/" },
          { label: "پنل کاربری", href: "/dashboard" },
          { label: "اجاره‌های من" },
        ]}
        className="mb-4 lg:mb-6"
      />
      <h1 className="text-xl font-bold text-foreground m-0 mb-1.5 lg:text-2xl lg:mb-2">
        اجاره‌های من
      </h1>
      <p className="text-sm text-muted-foreground mb-4 lg:mb-6">
        خودروهایی که اجاره کرده‌اید و وضعیت رزروها.
      </p>

      {selectedReservation ? (
        <div className="space-y-4">
          <Button
            variant="outline"
            className="min-h-[44px]"
            onClick={() => setSelectedReservation(null)}
          >
            بازگشت به لیست
          </Button>
          <Invoice reservation={selectedReservation} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-muted/50 py-12 text-center">
          <p className="text-muted-foreground m-0">
            رزروی در این وضعیت وجود ندارد.
          </p>
          <Button asChild className="mt-4 min-h-[44px]">
            <Link href="/search">جستجوی خودرو برای اجاره</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center lg:mb-6">
            <label className="shrink-0 text-sm font-semibold text-foreground">
              فیلتر وضعیت:
            </label>
            <Select
              value={filterStatus}
              onValueChange={(v) =>
                setFilterStatus(v as ReservationStatus | "all")
              }
            >
              <SelectTrigger className="min-h-[44px] w-full sm:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(
                  Object.keys(statusLabel) as Array<ReservationStatus | "all">
                ).map((s) => (
                  <SelectItem key={s} value={s}>
                    {statusLabel[s]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-3">
            {filtered.map((res) => (
              <div
                key={res.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-foreground m-0">
                    {res.rental?.car?.name ?? "خودرو"}
                  </p>
                  <p className="text-sm text-muted-foreground m-0">
                    {res.firstName} {res.lastName} ·{" "}
                    {res.totalPrice.toLocaleString("fa-IR")} تومان
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={statusBadgeClass(res.status)}>
                    {statusLabel[res.status]}
                  </span>
                  <Button
                    size="sm"
                    className="min-h-[40px]"
                    onClick={() => setSelectedReservation(res)}
                  >
                    مشاهده فاکتور
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
