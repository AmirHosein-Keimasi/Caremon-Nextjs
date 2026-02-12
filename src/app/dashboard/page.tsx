"use client";

import React, { useEffect, useState } from "react";
import { useCartStore, RentalItem } from "@/store/cartStore";
import {
  useReservationStore,
  ReservationStatus,
  Reservation,
} from "@/store/reservationStore";
import { useDashboardStore } from "@/store/dashboardStore";
import Invoice from "@/components/Invoice/Invoice";
import styles from "./page.module.css";

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
    <div className={styles.dashboardPage}>
      {/* Header */}
      <div className={styles.header}>
        <h1>داشبورد</h1>
        <p>خوش‌آمدید به پنل مدیریت</p>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
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
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "overview" ? styles.active : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          نمای کلی
        </button>
        <button
          className={`${styles.tab} ${activeTab === "rental" ? styles.active : ""}`}
          onClick={() => setActiveTab("rental")}
        >
          رزرو فعلی ({cartStore.currentRental ? 1 : 0})
        </button>
        <button
          className={`${styles.tab} ${activeTab === "reservations" ? styles.active : ""}`}
          onClick={() => setActiveTab("reservations")}
        >
          رزروها ({stats.totalReservations})
        </button>
        <button
          className={`${styles.tab} ${activeTab === "invoice" ? styles.active : ""}`}
          onClick={() => setActiveTab("invoice")}
        >
          فاکتور
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className={styles.overviewTab}>
            <div className={styles.section}>
              <h2>آمار سفارشات</h2>
              <div className={styles.statsTable}>
                <div className={styles.statsRow}>
                  <span>مجموع رزروها:</span>
                  <strong>{stats.totalReservations}</strong>
                </div>
                <div className={styles.statsRow}>
                  <span>تکمیل شده:</span>
                  <strong className={styles.completed}>
                    {stats.completedReservations}
                  </strong>
                </div>
                <div className={styles.statsRow}>
                  <span>فعال:</span>
                  <strong className={styles.active}>
                    {stats.activeReservations}
                  </strong>
                </div>
                <div className={styles.statsRow}>
                  <span>لغو شده:</span>
                  <strong className={styles.cancelled}>
                    {stats.cancelledReservations}
                  </strong>
                </div>
                <div className={styles.statsRow + " " + styles.highlighted}>
                  <span>میانگین ارزش رزرو:</span>
                  <strong>
                    {stats.averageReservationValue.toLocaleString("fa-IR")}{" "}
                    تومان
                  </strong>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h2>رزروهای اخیر</h2>
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
          <div className={styles.rentalTab}>
            {cartStore.currentRental ? (
              <RentalDisplay rental={cartStore.currentRental} />
            ) : (
              <div className={styles.empty}>
                <p>هیچ رزروی فعالی وجود ندارد</p>
              </div>
            )}
          </div>
        )}

        {/* Reservations Tab */}
        {activeTab === "reservations" && (
          <div className={styles.reservationsTab}>
            <div className={styles.filterBar}>
              <label>فیلتر بر اساس وضعیت:</label>
              <select
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(e.target.value as ReservationStatus | "all")
                }
              >
                <option value="all">همه</option>
                <option value={ReservationStatus.PENDING}>
                  در انتظار تایید
                </option>
                <option value={ReservationStatus.CONFIRMED}>تایید شده</option>
                <option value={ReservationStatus.ACTIVE}>فعال</option>
                <option value={ReservationStatus.COMPLETED}>تکمیل شده</option>
                <option value={ReservationStatus.CANCELLED}>لغو شده</option>
              </select>
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
              <div className={styles.empty}>
                <p>رزروی برای این وضعیت وجود ندارد</p>
              </div>
            )}
          </div>
        )}

        {/* Invoice Tab */}
        {activeTab === "invoice" && (
          <div className={styles.invoiceTab}>
            {selectedReservation ? (
              <Invoice reservation={selectedReservation} />
            ) : (
              <div className={styles.empty}>
                <p>لطفا یک رزرو انتخاب کنید</p>
              </div>
            )}
          </div>
        )}
      </div>
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
  return (
    <div className={`${styles.statCard} ${styles[`stat-${color}`]}`}>
      <div className={styles.statIcon}>{icon}</div>
      <div className={styles.statContent}>
        <p className={styles.statTitle}>{title}</p>
        <h3 className={styles.statValue}>{value}</h3>
        <p className={styles.statSubtitle}>{subtitle}</p>
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
    <div className={styles.list}>
      {reservations.length === 0 ? (
        <p className={styles.empty}>هیچ رزروی وجود ندارد</p>
      ) : (
        reservations.map((res) => (
          <div
            key={res.id}
            className={styles.listItem}
            onClick={() => onSelect(res)}
          >
            <div className={styles.listItemHeader}>
              <span className={styles.listItemId}>{res.id}</span>
              <span className={styles.listItemName}>
                {res.firstName} {res.lastName}
              </span>
            </div>
            <div className={styles.listItemFooter}>
              <span>1 خودرو</span>
              <span className={styles.listItemAmount}>
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

  return (
    <div className={styles.table}>
      <table>
        <thead>
          <tr>
            <th>شماره رزرو</th>
            <th>نام مشتری</th>
            <th>تعداد خودرو</th>
            <th>مبلغ</th>
            <th>وضعیت</th>
            <th>اقدام</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res) => (
            <tr key={res.id}>
              <td>{res.id}</td>
              <td>
                {res.firstName} {res.lastName}
              </td>
              <td>1</td>
              <td>{res.totalPrice.toLocaleString("fa-IR")} تومان</td>
              <td>
                <span
                  className={`${styles.badge} ${styles[`badge-${res.status}`]}`}
                >
                  {statusLabel[res.status]}
                </span>
              </td>
              <td>
                <button
                  onClick={() => onSelect(res)}
                  className={styles.viewBtn}
                >
                  مشاهده
                </button>
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
    <div className={styles.rentalDisplay}>
      <div className={styles.section}>
        <h2>جزئیات رزرو فعلی</h2>
        <div className={styles.rentalInfo}>
          <div className={styles.rentalRow}>
            <span>مدل ماشین:</span>
            <strong>{rental.car.name}</strong>
          </div>
          <div className={styles.rentalRow}>
            <span>تاریخ شروع:</span>
            <strong>
              {new Date(rental.startDate).toLocaleDateString("fa-IR")}
            </strong>
          </div>
          <div className={styles.rentalRow}>
            <span>تاریخ پایان:</span>
            <strong>
              {new Date(rental.endDate).toLocaleDateString("fa-IR")}
            </strong>
          </div>
          <div className={styles.rentalRow}>
            <span>تعداد روز:</span>
            <strong>{rental.rentalDays}</strong>
          </div>
          <div className={styles.rentalRow}>
            <span>محل تحویل:</span>
            <strong>{rental.pickupLocation}</strong>
          </div>
          <div className={styles.rentalRow}>
            <span>محل تسلیم:</span>
            <strong>{rental.dropoffLocation}</strong>
          </div>
          {rental.withDriver && (
            <div className={styles.rentalRow}>
              <span>راننده:</span>
              <strong>بلی ({rental.driverDays} روز)</strong>
            </div>
          )}
          <div className={styles.rentalRow}>
            <span>قیمت کل:</span>
            <strong className={styles.price}>
              {rental.totalPrice.toLocaleString("fa-IR")} تومان
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
