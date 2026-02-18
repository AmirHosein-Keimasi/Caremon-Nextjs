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

export default function MyRentalsPage() {
  const reservationStore = useReservationStore();
  const [filterStatus, setFilterStatus] = useState<ReservationStatus | "all">("all");
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const reservations = reservationStore.reservations;
  const filtered =
    filterStatus === "all"
      ? reservations
      : reservations.filter((r) => r.status === filterStatus);

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <BreadcrumbNav
        items={[
          { label: "خانه", href: "/" },
          { label: "پنل کاربری", href: "/dashboard" },
          { label: "اجاره‌های من" },
        ]}
        className="mb-6"
      />
      <h1 className="text-2xl font-bold text-foreground m-0 mb-2">
        اجاره‌های من (اجاره گرفته)
      </h1>
      <p className="text-muted-foreground mb-6">
        خودروهایی که شما اجاره کرده‌اید و وضعیت رزروها.
      </p>

      <div className="flex flex-wrap gap-4 items-center mb-6">
        <label className="font-semibold text-foreground">فیلتر وضعیت:</label>
        <Select
          value={filterStatus}
          onValueChange={(v) => setFilterStatus(v as ReservationStatus | "all")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(statusLabel) as Array<ReservationStatus | "all">).map((s) => (
              <SelectItem key={s} value={s}>
                {statusLabel[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedReservation ? (
        <div className="space-y-4">
          <Button variant="outline" onClick={() => setSelectedReservation(null)}>
            بازگشت به لیست
          </Button>
          <Invoice reservation={selectedReservation} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 rounded-xl bg-muted/50 border border-dashed border-border">
          <p className="text-muted-foreground m-0">رزروی در این وضعیت وجود ندارد.</p>
          <Button asChild className="mt-4">
            <Link href="/search">جستجوی خودرو برای اجاره</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((res) => (
            <div
              key={res.id}
              className="p-4 bg-muted border border-border rounded-xl flex flex-wrap items-center justify-between gap-4"
            >
              <div>
                <p className="font-semibold text-foreground m-0">{res.rental?.car?.name ?? "خودرو"}</p>
                <p className="text-sm text-muted-foreground m-0">
                  {res.firstName} {res.lastName} · {res.totalPrice.toLocaleString("fa-IR")} تومان
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {statusLabel[res.status]}
                </span>
                <Button size="sm" onClick={() => setSelectedReservation(res)}>
                  مشاهده فاکتور
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
