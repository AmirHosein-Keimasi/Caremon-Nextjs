"use client";

import React, { useEffect, useState } from "react";
import { useCartStore, CartItem } from "@/store/cartStore";
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

  const [activeTab, setActiveTab] = useState<
    "overview" | "cart" | "reservations" | "invoice"
  >("overview");
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [filterStatus, setFilterStatus] = useState<ReservationStatus | "all">(
    "all",
  );

  // Refresh stats on mount and when stores change
  useEffect(() => {
    dashboardStore.refreshStats("current-user-id"); // TODO: Get from auth
  }, [cartStore.items, reservationStore.reservations, dashboardStore]);

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
          className={`${styles.tab} ${activeTab === "cart" ? styles.active : ""}`}
          onClick={() => setActiveTab("cart")}
        >
          سبد خرید ({cartStore.totalItems})
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

        {/* Cart Tab */}
        {activeTab === "cart" && (
          <div className={styles.cartTab}>
            {cartStore.items.length > 0 ? (
              <CartItemsList items={cartStore.items} />
            ) : (
              <div className={styles.empty}>
                <p>سبد خرید خالی است</p>
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
              <span>{res.totalItems} خودرو</span>
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
              <td>{res.totalItems}</td>
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
 * Cart Items List
 */
function CartItemsList({ items }: { items: CartItem[] }) {
  return (
    <div className={styles.cartList}>
      {items.map((item) => (
        <div key={item.id} className={styles.cartListItem}>
          <div className={styles.cartItemInfo}>
            <h4>{item.car.name}</h4>
            <p>{item.car.model}</p>
            <p className={styles.dates}>
              {item.startDate} تا {item.endDate}
            </p>
          </div>
          <div className={styles.cartItemPrice}>
            <p className={styles.quantity}>تعداد: {item.quantity}</p>
            <p className={styles.total}>
              {item.totalPrice.toLocaleString("fa-IR")} تومان
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
