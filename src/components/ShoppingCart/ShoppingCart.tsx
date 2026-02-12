"use client";

import React from "react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import styles from "./ShoppingCart.module.css";

/**
 * Shopping Cart Component (Updated for Single Rental)
 * کامپوننت سبد خرید (به‌روز شده برای رزرو منفرد)
 */
export default function ShoppingCart() {
  const router = useRouter();
  const { currentRental, clearRental, totalPrice } = useCartStore();

  const handleClearRental = () => {
    clearRental();
  };

  const handleCheckout = () => {
    if (currentRental) {
      router.push("/checkout");
    }
  };

  if (!currentRental) {
    return (
      <div className={styles.emptyCart}>
        <p>سبد خرید خالی است</p>
        <button
          onClick={() => router.push("/search")}
          className={styles.continueShoppingBtn}
        >
          جستجوی خودرو
        </button>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      <h2>رزرو فعلی</h2>

      <div className={styles.cartItems}>
        <div className={styles.cartItem}>
          <div className={styles.itemImage}>
            <img
              src={currentRental.car.img}
              alt={currentRental.car.name}
              className={styles.img}
            />
          </div>

          <div className={styles.itemDetails}>
            <h3>{currentRental.car.name}</h3>
            <p className={styles.model}>{currentRental.car.model}</p>
            <div className={styles.dates}>
              <span>
                {new Date(currentRental.startDate).toLocaleDateString("fa-IR")}
              </span>
              <span>تا</span>
              <span>
                {new Date(currentRental.endDate).toLocaleDateString("fa-IR")}
              </span>
            </div>
            {currentRental.withDriver && (
              <span className={styles.driverBadge}>راننده شامل</span>
            )}
            {currentRental.selectedOptions.length > 0 && (
              <div className={styles.options}>
                <span>خدمات:</span>
                {currentRental.selectedOptions.map((opt) => (
                  <span key={opt} className={styles.option}>
                    {opt}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className={styles.itemPrice}>
            <div className={styles.priceRow}>
              <span>قیمت روزانه:</span>
              <span>
                {currentRental.pricePerDay.toLocaleString("fa-IR")} تومان
              </span>
            </div>
            <div className={styles.priceRow}>
              <span>روزها:</span>
              <span>{currentRental.rentalDays}</span>
            </div>
            <div className={`${styles.priceRow} ${styles.total}`}>
              <span>مجموع:</span>
              <span>
                {currentRental.totalPrice.toLocaleString("fa-IR")} تومان
              </span>
            </div>
          </div>

          <button
            className={styles.removeBtn}
            onClick={handleClearRental}
            title="حذف از سبد"
          >
            ✕
          </button>
        </div>
      </div>

      <div className={styles.cartSummary}>
        <div className={styles.summaryRow}>
          <span>تعداد روزهای اجاره:</span>
          <span>{currentRental.rentalDays}</span>
        </div>
        <div className={`${styles.summaryRow} ${styles.totalRow}`}>
          <span>مجموع:</span>
          <span>{totalPrice.toLocaleString("fa-IR")} تومان</span>
        </div>
      </div>

      <div className={styles.cartActions}>
        <button
          onClick={() => router.push("/search")}
          className={styles.continueShoppingBtn}
        >
          جستجوی خودروهای دیگر
        </button>
        <button onClick={handleCheckout} className={styles.checkoutBtn}>
          ادامه برای پرداخت
        </button>
      </div>
    </div>
  );
}
