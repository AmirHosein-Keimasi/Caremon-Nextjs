"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BreadcrumbNav } from "@/components/breadcrumb-nav/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCartStore, RentalItem } from "@/store/cartStore";
import {
  useReservationStore,
  ReservationStatus,
  Reservation,
} from "@/store/reservationStore";
import { useDashboardStore } from "@/store/dashboardStore";
import Invoice from "@/components/Invoice/Invoice";

/**
 * نمای کلی پنل کاربری — آمار، رزرو فعلی، رزروها و فاکتور
 * ریسپانسیو: زیر 1024 موبایل، از 1024 دسکتاپ
 */
export default function DashboardPage() {
  const cartStore = useCartStore();
  const reservationStore = useReservationStore();
  const dashboardStore = useDashboardStore();
  const stats = dashboardStore.stats;
  const refreshStats = dashboardStore.refreshStats;

  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<
    "overview" | "rental" | "reservations" | "invoice"
  >(
    tabFromUrl === "rental"
      ? "rental"
      : tabFromUrl === "reservations"
        ? "reservations"
        : tabFromUrl === "invoice"
          ? "invoice"
          : "overview",
  );
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [filterStatus, setFilterStatus] = useState<ReservationStatus | "all">(
    "all",
  );

  const currentRentalCount = cartStore.currentRental ? 1 : 0;

  useEffect(() => {
    refreshStats("current-user-id");
  }, [currentRentalCount, reservationStore.reservations.length, refreshStats]);

  useEffect(() => {
    if (tabFromUrl === "rental") setActiveTab("rental");
    else if (tabFromUrl === "reservations") setActiveTab("reservations");
    else if (tabFromUrl === "invoice") setActiveTab("invoice");
    else setActiveTab("overview");
  }, [tabFromUrl]);

  const filteredReservations =
    filterStatus === "all"
      ? reservationStore.reservations
      : reservationStore.reservations.filter(
          (res) => res.status === filterStatus,
        );

  return (
    <div className="mx-auto min-h-full max-w-[1400px] bg-background px-4 py-5 lg:px-8 lg:py-8">
      <BreadcrumbNav
        items={[
          { label: "خانه", href: "/" },
          { label: "پنل کاربری", href: "/dashboard" },
          { label: "نمای کلی" },
        ]}
        className="mb-4 lg:mb-6"
      />
      <div className="mb-6 lg:mb-8">
        <h1 className="m-0 text-xl font-bold text-foreground lg:text-3xl">
          نمای کلی
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground lg:mt-2 lg:text-base">
          خوش‌آمدید به پنل کاربری؛ از منو به سایر بخش‌ها بروید.
        </p>
      </div>

      {/* کارت‌های آمار — موبایل ۲ ستون، دسکتاپ ۴ ستون */}
      <div className="mb-8 grid grid-cols-2 gap-3 lg:mb-12 lg:grid-cols-4 lg:gap-6">
        <StatCard
          title="سبد خرید"
          value={stats.cartItemCount}
          subtitle={`${stats.cartValue.toLocaleString("fa-IR")} تومان`}
          color="blue"
          icon="🛒"
        />
        <StatCard
          title="رزروهای فعال"
          value={stats.activeReservations}
          subtitle={`از ${stats.totalReservations} رزرو`}
          color="green"
          icon="✓"
        />
        <StatCard
          title="درآمد کل"
          value={stats.totalRevenue.toLocaleString("fa-IR")}
          subtitle="تومان"
          color="purple"
          icon="💰"
        />
        <StatCard
          title="درخواست پرداخت"
          value={stats.pendingPayments}
          subtitle="منتظر پرداخت"
          color="orange"
          icon="⏳"
        />
      </div>

      {/* تب‌ها — موبایل اسکرول افقی، دسکتاپ عادی */}
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as typeof activeTab)}
        className="mb-6 lg:mb-8"
      >
        <TabsList className="inline-flex h-auto w-full min-w-0 justify-start gap-0 overflow-x-auto rounded-t-xl rounded-b-none border-b-2 border-border bg-muted p-0 [&>button]:shrink-0 lg:flex-wrap lg:overflow-visible">
          <TabsTrigger
            value="overview"
            className="min-h-[44px] px-4 py-3 text-sm data-[state=active]:border-b-[3px] data-[state=active]:border-primary data-[state=active]:-mb-0.5 lg:px-6 lg:py-4"
          >
            نمای کلی
          </TabsTrigger>
          <TabsTrigger
            value="rental"
            className="min-h-[44px] px-4 py-3 text-sm data-[state=active]:border-b-[3px] data-[state=active]:border-primary data-[state=active]:-mb-0.5 lg:px-6 lg:py-4"
          >
            رزرو فعلی ({cartStore.currentRental ? 1 : 0})
          </TabsTrigger>
          <TabsTrigger
            value="reservations"
            className="min-h-[44px] px-4 py-3 text-sm data-[state=active]:border-b-[3px] data-[state=active]:border-primary data-[state=active]:-mb-0.5 lg:px-6 lg:py-4"
          >
            رزروها ({stats.totalReservations})
          </TabsTrigger>
          <TabsTrigger
            value="invoice"
            className="min-h-[44px] px-4 py-3 text-sm data-[state=active]:border-b-[3px] data-[state=active]:border-primary data-[state=active]:-mb-0.5 lg:px-6 lg:py-4"
          >
            فاکتور
          </TabsTrigger>
        </TabsList>

        {/* محتوای تب‌ها */}
        <div className="rounded-b-xl border border-t-0 border-border bg-card p-4 shadow-sm lg:p-8">
          {activeTab === "overview" && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-8 last:mb-0 lg:mb-12">
                <h2 className="mb-4 border-b-2 border-border pb-2 text-lg font-semibold text-foreground lg:mb-6 lg:text-xl">
                  آمار سفارشات
                </h2>
                <div className="flex flex-col overflow-hidden rounded-xl bg-muted">
                  {[
                    { label: "مجموع رزروها", value: stats.totalReservations },
                    {
                      label: "تکمیل شده",
                      value: stats.completedReservations,
                      accent: "text-success",
                    },
                    {
                      label: "فعال",
                      value: stats.activeReservations,
                      accent: "text-warning",
                    },
                    {
                      label: "لغو شده",
                      value: stats.cancelledReservations,
                      accent: "text-destructive",
                    },
                  ].map(({ label, value, accent }) => (
                    <div
                      key={label}
                      className="flex justify-between border-b border-border px-4 py-3 last:border-b-0"
                    >
                      <span className="text-sm text-muted-foreground">
                        {label}:
                      </span>
                      <strong
                        className={`font-semibold ${accent ?? "text-foreground"}`}
                      >
                        {value}
                      </strong>
                    </div>
                  ))}
                  <div className="flex justify-between bg-primary/10 px-4 py-3">
                    <span className="text-sm text-muted-foreground">
                      میانگین ارزش رزرو:
                    </span>
                    <strong className="font-semibold text-primary">
                      {stats.averageReservationValue.toLocaleString("fa-IR")}{" "}
                      تومان
                    </strong>
                  </div>
                </div>
              </div>

              <div className="last:mb-0">
                <h2 className="mb-4 border-b-2 border-border pb-2 text-lg font-semibold text-foreground lg:mb-6 lg:text-xl">
                  رزروهای اخیر
                </h2>
                <RecentReservationsList
                  reservations={reservationStore.reservations.slice(0, 5)}
                  onSelect={(res) => {
                    setSelectedReservation(res);
                    setActiveTab("invoice");
                  }}
                />
              </div>
            </div>
          )}

          {activeTab === "rental" && (
            <div className="animate-in fade-in duration-300">
              {cartStore.currentRental ? (
                <RentalDisplay rental={cartStore.currentRental} />
              ) : (
                <div className="py-12 text-center text-muted-foreground">
                  <p className="text-base lg:text-lg">
                    هیچ رزروی فعالی وجود ندارد
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "reservations" && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-4 flex flex-col gap-3 rounded-xl bg-muted p-4 sm:flex-row sm:items-center lg:mb-6">
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
                    <SelectItem value="all">همه</SelectItem>
                    <SelectItem value={ReservationStatus.PENDING}>
                      در انتظار تایید
                    </SelectItem>
                    <SelectItem value={ReservationStatus.CONFIRMED}>
                      تایید شده
                    </SelectItem>
                    <SelectItem value={ReservationStatus.ACTIVE}>
                      فعال
                    </SelectItem>
                    <SelectItem value={ReservationStatus.COMPLETED}>
                      تکمیل شده
                    </SelectItem>
                    <SelectItem value={ReservationStatus.CANCELLED}>
                      لغو شده
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {filteredReservations.length > 0 ? (
                <ReservationsList
                  reservations={filteredReservations}
                  onSelect={(res) => {
                    setSelectedReservation(res);
                    setActiveTab("invoice");
                  }}
                />
              ) : (
                <div className="py-12 text-center text-muted-foreground">
                  <p className="text-base lg:text-lg">
                    رزروی برای این وضعیت وجود ندارد
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "invoice" && (
            <div className="animate-in fade-in duration-300 py-4 lg:py-8">
              {selectedReservation ? (
                <Invoice reservation={selectedReservation} />
              ) : (
                <div className="py-12 text-center text-muted-foreground">
                  <p className="text-base lg:text-lg">
                    لطفاً یک رزرو انتخاب کنید
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  color,
  icon,
}: {
  title: string;
  value: number | string;
  subtitle: string;
  color: "blue" | "green" | "purple" | "orange";
  icon: string;
}) {
  const borderClass = {
    blue: "border-r-4 border-primary",
    green: "border-r-4 border-success",
    purple: "border-r-4 border-purple-500",
    orange: "border-r-4 border-amber-500",
  }[color];

  return (
    <div
      className={`flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md lg:gap-4 lg:p-6 ${borderClass}`}
    >
      <span className="text-2xl lg:text-4xl" aria-hidden>
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="m-0 text-xs font-medium text-muted-foreground lg:text-sm">
          {title}
        </p>
        <p className="mt-1 truncate text-lg font-bold text-foreground lg:mt-2 lg:text-3xl">
          {value}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground lg:text-sm">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function RecentReservationsList({
  reservations,
  onSelect,
}: {
  reservations: Reservation[];
  onSelect: (res: Reservation) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      {reservations.length === 0 ? (
        <p className="py-8 text-center text-muted-foreground">
          هیچ رزروی وجود ندارد
        </p>
      ) : (
        reservations.map((res) => (
          <button
            type="button"
            key={res.id}
            className="flex min-h-[44px] w-full flex-col gap-1 rounded-xl border border-border bg-muted/50 p-4 text-right transition-colors hover:border-primary hover:bg-card hover:shadow-md active:scale-[0.99]"
            onClick={() => onSelect(res)}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-foreground">
                {res.firstName} {res.lastName}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {res.id}
              </span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>۱ خودرو</span>
              <span className="font-semibold text-primary">
                {res.totalPrice.toLocaleString("fa-IR")} تومان
              </span>
            </div>
          </button>
        ))
      )}
    </div>
  );
}

const statusLabel: Record<ReservationStatus, string> = {
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

function ReservationsList({
  reservations,
  onSelect,
}: {
  reservations: Reservation[];
  onSelect: (res: Reservation) => void;
}) {
  return (
    <>
      {/* موبایل: کارت‌های قابل کلیک */}
      <div className="flex flex-col gap-3 lg:hidden">
        {reservations.map((res) => (
          <div
            key={res.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-muted/30 p-4"
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
                onClick={() => onSelect(res)}
              >
                مشاهده
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* دسکتاپ: جدول */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full border-collapse">
          <thead className="bg-muted">
            <tr>
              <th className="border-b-2 border-border p-3 text-right text-sm font-semibold text-foreground">
                شماره رزرو
              </th>
              <th className="border-b-2 border-border p-3 text-right text-sm font-semibold text-foreground">
                نام مشتری
              </th>
              <th className="border-b-2 border-border p-3 text-right text-sm font-semibold text-foreground">
                تعداد خودرو
              </th>
              <th className="border-b-2 border-border p-3 text-right text-sm font-semibold text-foreground">
                مبلغ
              </th>
              <th className="border-b-2 border-border p-3 text-right text-sm font-semibold text-foreground">
                وضعیت
              </th>
              <th className="border-b-2 border-border p-3 text-right text-sm font-semibold text-foreground">
                اقدام
              </th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res) => (
              <tr key={res.id} className="hover:bg-muted/50">
                <td className="border-b border-border p-3 text-sm text-muted-foreground">
                  {res.id}
                </td>
                <td className="border-b border-border p-3 text-sm text-foreground">
                  {res.firstName} {res.lastName}
                </td>
                <td className="border-b border-border p-3 text-sm text-muted-foreground">
                  ۱
                </td>
                <td className="border-b border-border p-3 text-sm text-foreground">
                  {res.totalPrice.toLocaleString("fa-IR")} تومان
                </td>
                <td className="border-b border-border p-3">
                  <span className={statusBadgeClass(res.status)}>
                    {statusLabel[res.status]}
                  </span>
                </td>
                <td className="border-b border-border p-3">
                  <Button size="sm" onClick={() => onSelect(res)}>
                    مشاهده
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function RentalDisplay({ rental }: { rental: RentalItem }) {
  const rows = [
    { label: "مدل ماشین", value: rental.car.name },
    {
      label: "تاریخ شروع",
      value: new Date(rental.startDate).toLocaleDateString("fa-IR"),
    },
    {
      label: "تاریخ پایان",
      value: new Date(rental.endDate).toLocaleDateString("fa-IR"),
    },
    { label: "تعداد روز", value: String(rental.rentalDays) },
    { label: "محل تحویل", value: rental.pickupLocation },
    { label: "محل تسلیم", value: rental.dropoffLocation },
    ...(rental.withDriver
      ? [{ label: "راننده", value: `بلی (${rental.driverDays} روز)` }]
      : []),
    {
      label: "قیمت کل",
      value: `${rental.totalPrice.toLocaleString("fa-IR")} تومان`,
      accent: true,
    },
  ] as { label: string; value: string; accent?: boolean }[];

  return (
    <div>
      <h2 className="mb-4 border-b-2 border-border pb-2 text-lg font-semibold text-foreground lg:mb-6 lg:text-xl">
        جزئیات رزرو فعلی
      </h2>
      <div className="flex flex-col gap-3">
        {rows.map(({ label, value, accent }) => (
          <div
            key={label}
            className={`flex justify-between items-center rounded-xl px-4 py-3 ${
              accent ? "bg-primary/10" : "bg-muted"
            }`}
          >
            <span className="text-sm text-muted-foreground">{label}:</span>
            <strong
              className={`font-semibold ${accent ? "text-primary" : "text-foreground"}`}
            >
              {value}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}
