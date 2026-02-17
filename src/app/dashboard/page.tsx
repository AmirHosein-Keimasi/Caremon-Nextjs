"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
 * Enhanced Dashboard Page
 * صفحه داشبورد بهتر شده
 */
export default function DashboardPage() {
  const cartStore = useCartStore();
  const reservationStore = useReservationStore();
  const dashboardStore = useDashboardStore();
  const stats = dashboardStore.stats;
  const refreshStats = dashboardStore.refreshStats;

  const [activeTab, setActiveTab] = useState<
    "overview" | "rental" | "reservations" | "invoice"
  >("overview");
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [filterStatus, setFilterStatus] = useState<ReservationStatus | "all">(
    "all",
  );

  // Refresh stats on mount and when stores change
  const currentRentalCount = cartStore.currentRental ? 1 : 0;

  useEffect(() => {
    refreshStats("current-user-id"); // TODO: Get from auth
  }, [currentRentalCount, reservationStore.reservations.length, refreshStats]);

  const filteredReservations =
    filterStatus === "all"
      ? reservationStore.reservations
      : reservationStore.reservations.filter(
          (res) => res.status === filterStatus,
        );

  return (
    <div className="rtl p-8 max-w-[1400px] mx-auto bg-[var(--color-surface-300)] min-h-screen">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl m-0 text-[var(--color-gray-99)]">داشبورد</h1>
        <p className="m-2.5 mt-0 text-[var(--color-gray-70)]">خوش‌آمدید به پنل مدیریت</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 mb-12">
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
          title="درخواست‌های پرداخت"
          value={stats.pendingPayments}
          subtitle="منتظر پرداخت"
          color="orange"
          icon="⏳"
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="mb-8">
        <TabsList className="w-full justify-start rounded-t-lg rounded-b-none h-auto p-0 bg-[var(--color-surface-400)] border-b-2 border-[var(--color-gray-80)]">
          <TabsTrigger value="overview" className="px-8 py-4 rounded-t-lg data-[state=active]:border-b-[3px] data-[state=active]:border-[var(--color-primary-darkeMod)]">
            نمای کلی
          </TabsTrigger>
          <TabsTrigger value="rental" className="px-8 py-4 rounded-t-lg data-[state=active]:border-b-[3px] data-[state=active]:border-[var(--color-primary-darkeMod)]">
            رزرو فعلی ({cartStore.currentRental ? 1 : 0})
          </TabsTrigger>
          <TabsTrigger value="reservations" className="px-8 py-4 rounded-t-lg data-[state=active]:border-b-[3px] data-[state=active]:border-[var(--color-primary-darkeMod)]">
            رزروها ({stats.totalReservations})
          </TabsTrigger>
          <TabsTrigger value="invoice" className="px-8 py-4 rounded-t-lg data-[state=active]:border-b-[3px] data-[state=active]:border-[var(--color-primary-darkeMod)]">
            فاکتور
          </TabsTrigger>
        </TabsList>

      {/* Tab Content */}
      <div className="bg-[var(--color-surface-400)] rounded-b-lg p-8 shadow-[var(--shadow-400)]">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="animate-[fadeIn_0.3s_ease-in_forwards]">
            <div className="mb-12 last:mb-0">
              <h2 className="text-xl m-0 mb-6 text-[var(--color-gray-99)] pb-2 border-b-2 border-[var(--color-gray-80)]">آمار سفارشات</h2>
              <div className="flex flex-col gap-0 bg-[var(--color-surface-300)] rounded-md overflow-hidden">
                <div className="flex justify-between p-4 border-b border-[var(--color-gray-80)] last:border-b-0">
                  <span className="text-[var(--color-gray-70)]">مجموع رزروها:</span>
                  <strong className="text-[var(--color-gray-99)] font-semibold">{stats.totalReservations}</strong>
                </div>
                <div className="flex justify-between p-4 border-b border-[var(--color-gray-80)] last:border-b-0">
                  <span className="text-[var(--color-gray-70)]">تکمیل شده:</span>
                  <strong className="text-[#4caf50] font-semibold">
                    {stats.completedReservations}
                  </strong>
                </div>
                <div className="flex justify-between p-4 border-b border-[var(--color-gray-80)] last:border-b-0">
                  <span className="text-[var(--color-gray-70)]">فعال:</span>
                  <strong className="text-[#ff9800] font-semibold">
                    {stats.activeReservations}
                  </strong>
                </div>
                <div className="flex justify-between p-4 border-b border-[var(--color-gray-80)] last:border-b-0">
                  <span className="text-[var(--color-gray-70)]">لغو شده:</span>
                  <strong className="text-[#f44336] font-semibold">
                    {stats.cancelledReservations}
                  </strong>
                </div>
                <div className="flex justify-between p-4 bg-[rgba(33,150,243,0.1)] border-t border-[var(--color-gray-80)] mt-2">
                  <span className="text-[var(--color-gray-70)]">میانگین ارزش رزرو:</span>
                  <strong className="text-[var(--color-primary-darkeMod)] font-semibold">
                    {stats.averageReservationValue.toLocaleString("fa-IR")}{" "}
                    تومان
                  </strong>
                </div>
              </div>
            </div>

            <div className="mb-12 last:mb-0">
              <h2 className="text-xl m-0 mb-6 text-[var(--color-gray-99)] pb-2 border-b-2 border-[var(--color-gray-80)]">رزروهای اخیر</h2>
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

        {/* Rental Tab */}
        {activeTab === "rental" && (
          <div className="animate-[fadeIn_0.3s_ease-in_forwards]">
            {cartStore.currentRental ? (
              <RentalDisplay rental={cartStore.currentRental} />
            ) : (
              <div className="text-center py-12 px-8 text-[var(--color-gray-70)]">
                <p className="text-lg m-0">هیچ رزروی فعالی وجود ندارد</p>
              </div>
            )}
          </div>
        )}

        {/* Reservations Tab */}
        {activeTab === "reservations" && (
          <div className="animate-[fadeIn_0.3s_ease-in_forwards]">
            <div className="flex gap-4 items-center mb-6 p-4 bg-[var(--color-surface-300)] rounded-md">
              <label className="font-semibold text-[var(--color-gray-99)]">فیلتر بر اساس وضعیت:</label>
              <Select
                value={filterStatus}
                onValueChange={(v) => setFilterStatus(v as ReservationStatus | "all")}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه</SelectItem>
                  <SelectItem value={ReservationStatus.PENDING}>در انتظار تایید</SelectItem>
                  <SelectItem value={ReservationStatus.CONFIRMED}>تایید شده</SelectItem>
                  <SelectItem value={ReservationStatus.ACTIVE}>فعال</SelectItem>
                  <SelectItem value={ReservationStatus.COMPLETED}>تکمیل شده</SelectItem>
                  <SelectItem value={ReservationStatus.CANCELLED}>لغو شده</SelectItem>
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
              <div className="text-center py-12 px-8 text-[var(--color-gray-70)]">
                <p className="text-lg m-0">رزروی برای این وضعیت وجود ندارد</p>
              </div>
            )}
          </div>
        )}

        {/* Invoice Tab */}
        {activeTab === "invoice" && (
          <div className="animate-[fadeIn_0.3s_ease-in] py-8">
            {selectedReservation ? (
              <Invoice reservation={selectedReservation} />
            ) : (
              <div className="text-center py-12 px-8 text-[var(--color-gray-70)]">
                <p className="text-lg m-0">لطفا یک رزرو انتخاب کنید</p>
              </div>
            )}
          </div>
        )}
      </div>
      </Tabs>
    </div>
  );
}

/**
 * Stat Card Component
 */
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
  const colorBorders: Record<string, string> = {
    blue: "border-r-4 border-[#2196f3]",
    green: "border-r-4 border-[#4caf50]",
    purple: "border-r-4 border-[#9c27b0]",
    orange: "border-r-4 border-[#ff9800]",
  };

  return (
    <div className={`flex items-center gap-6 p-6 bg-[var(--color-surface-400)] rounded-lg shadow-[var(--shadow-400)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-500)] ${colorBorders[color]}`}>
      <div className="text-4xl">{icon}</div>
      <div className="flex-1">
        <p className="m-0 text-sm text-[var(--color-gray-70)] font-medium">{title}</p>
        <h3 className="m-2.5 mt-0 text-3xl text-[var(--color-gray-99)] font-bold">{value}</h3>
        <p className="m-1 mt-0 text-sm text-[var(--color-gray-80)]">{subtitle}</p>
      </div>
    </div>
  );
}

/**
 * Recent Reservations List
 */
function RecentReservationsList({
  reservations,
  onSelect,
}: {
  reservations: Reservation[];
  onSelect: (res: Reservation) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {reservations.length === 0 ? (
        <p className="text-center py-12 px-8 text-[var(--color-gray-70)] text-lg m-0">هیچ رزروی وجود ندارد</p>
      ) : (
        reservations.map((res) => (
          <div
            key={res.id}
            className="p-4 bg-[var(--color-surface-300)] border border-[var(--color-gray-80)] rounded-md cursor-pointer transition-all hover:bg-[var(--color-surface-400)] hover:border-[var(--color-primary-darkeMod)] hover:shadow-[0_2px_6px_rgba(33,150,243,0.2)]"
            onClick={() => onSelect(res)}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-[var(--color-gray-70)] font-mono">{res.id}</span>
              <span className="font-semibold text-[var(--color-gray-99)]">
                {res.firstName} {res.lastName}
              </span>
            </div>
            <div className="flex justify-between text-sm text-[var(--color-gray-70)]">
              <span>1 خودرو</span>
              <span className="text-[var(--color-primary-darkeMod)] font-semibold">
                {res.totalPrice.toLocaleString("fa-IR")} تومان
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

/**
 * Reservations List
 */
function ReservationsList({
  reservations,
  onSelect,
}: {
  reservations: Reservation[];
  onSelect: (res: Reservation) => void;
}) {
  const statusLabel = {
    [ReservationStatus.PENDING]: "در انتظار تایید",
    [ReservationStatus.CONFIRMED]: "تایید شده",
    [ReservationStatus.ACTIVE]: "فعال",
    [ReservationStatus.COMPLETED]: "تکمیل شده",
    [ReservationStatus.CANCELLED]: "لغو شده",
  };

  const getBadgeClass = (status: ReservationStatus) => {
    const badgeClasses: Record<ReservationStatus, string> = {
      [ReservationStatus.PENDING]: "inline-block px-3 py-1.5 rounded-xl text-sm font-semibold bg-[#fff3cd] text-[#856404]",
      [ReservationStatus.CONFIRMED]: "inline-block px-3 py-1.5 rounded-xl text-sm font-semibold bg-[#cfe2ff] text-[#084298]",
      [ReservationStatus.ACTIVE]: "inline-block px-3 py-1.5 rounded-xl text-sm font-semibold bg-[#d1e7dd] text-[#0f5132]",
      [ReservationStatus.COMPLETED]: "inline-block px-3 py-1.5 rounded-xl text-sm font-semibold bg-[#d1e7dd] text-[#0f5132]",
      [ReservationStatus.CANCELLED]: "inline-block px-3 py-1.5 rounded-xl text-sm font-semibold bg-[#f8d7da] text-[#842029]",
    };
    return badgeClasses[status] || "";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-[var(--color-surface-300)]">
          <tr>
            <th className="p-4 text-right font-semibold text-[var(--color-gray-99)] border-b-2 border-[var(--color-gray-80)]">شماره رزرو</th>
            <th className="p-4 text-right font-semibold text-[var(--color-gray-99)] border-b-2 border-[var(--color-gray-80)]">نام مشتری</th>
            <th className="p-4 text-right font-semibold text-[var(--color-gray-99)] border-b-2 border-[var(--color-gray-80)]">تعداد خودرو</th>
            <th className="p-4 text-right font-semibold text-[var(--color-gray-99)] border-b-2 border-[var(--color-gray-80)]">مبلغ</th>
            <th className="p-4 text-right font-semibold text-[var(--color-gray-99)] border-b-2 border-[var(--color-gray-80)]">وضعیت</th>
            <th className="p-4 text-right font-semibold text-[var(--color-gray-99)] border-b-2 border-[var(--color-gray-80)]">اقدام</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res) => (
            <tr key={res.id} className="hover:bg-[var(--color-surface-300)]">
              <td className="p-4 border-b border-[var(--color-gray-80)] text-[var(--color-gray-70)]">{res.id}</td>
              <td className="p-4 border-b border-[var(--color-gray-80)] text-[var(--color-gray-70)]">
                {res.firstName} {res.lastName}
              </td>
              <td className="p-4 border-b border-[var(--color-gray-80)] text-[var(--color-gray-70)]">1</td>
              <td className="p-4 border-b border-[var(--color-gray-80)] text-[var(--color-gray-70)]">{res.totalPrice.toLocaleString("fa-IR")} تومان</td>
              <td className="p-4 border-b border-[var(--color-gray-80)] text-[var(--color-gray-70)]">
                <span className={getBadgeClass(res.status)}>
                  {statusLabel[res.status]}
                </span>
              </td>
              <td className="p-4 border-b border-[var(--color-gray-80)] text-[var(--color-gray-70)]">
                <Button
                  size="sm"
                  onClick={() => onSelect(res)}
                >
                  مشاهده
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Rental Display Component
 */
function RentalDisplay({ rental }: { rental: RentalItem }) {
  return (
    <div>
      <div className="mb-12 last:mb-0">
        <h2 className="text-xl m-0 mb-6 text-[var(--color-gray-99)] pb-2 border-b-2 border-[var(--color-gray-80)]">جزئیات رزرو فعلی</h2>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center p-4 bg-[var(--color-surface-300)] rounded-md">
            <span className="text-[var(--color-gray-70)]">مدل ماشین:</span>
            <strong className="text-[var(--color-gray-99)] font-semibold">{rental.car.name}</strong>
          </div>
          <div className="flex justify-between items-center p-4 bg-[var(--color-surface-300)] rounded-md">
            <span className="text-[var(--color-gray-70)]">تاریخ شروع:</span>
            <strong className="text-[var(--color-gray-99)] font-semibold">
              {new Date(rental.startDate).toLocaleDateString("fa-IR")}
            </strong>
          </div>
          <div className="flex justify-between items-center p-4 bg-[var(--color-surface-300)] rounded-md">
            <span className="text-[var(--color-gray-70)]">تاریخ پایان:</span>
            <strong className="text-[var(--color-gray-99)] font-semibold">
              {new Date(rental.endDate).toLocaleDateString("fa-IR")}
            </strong>
          </div>
          <div className="flex justify-between items-center p-4 bg-[var(--color-surface-300)] rounded-md">
            <span className="text-[var(--color-gray-70)]">تعداد روز:</span>
            <strong className="text-[var(--color-gray-99)] font-semibold">{rental.rentalDays}</strong>
          </div>
          <div className="flex justify-between items-center p-4 bg-[var(--color-surface-300)] rounded-md">
            <span className="text-[var(--color-gray-70)]">محل تحویل:</span>
            <strong className="text-[var(--color-gray-99)] font-semibold">{rental.pickupLocation}</strong>
          </div>
          <div className="flex justify-between items-center p-4 bg-[var(--color-surface-300)] rounded-md">
            <span className="text-[var(--color-gray-70)]">محل تسلیم:</span>
            <strong className="text-[var(--color-gray-99)] font-semibold">{rental.dropoffLocation}</strong>
          </div>
          {rental.withDriver && (
            <div className="flex justify-between items-center p-4 bg-[var(--color-surface-300)] rounded-md">
              <span className="text-[var(--color-gray-70)]">راننده:</span>
              <strong className="text-[var(--color-gray-99)] font-semibold">بلی ({rental.driverDays} روز)</strong>
            </div>
          )}
          <div className="flex justify-between items-center p-4 bg-[var(--color-surface-300)] rounded-md">
            <span className="text-[var(--color-gray-70)]">قیمت کل:</span>
            <strong className="text-[var(--color-primary-darkeMod)] font-semibold">
              {rental.totalPrice.toLocaleString("fa-IR")} تومان
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
