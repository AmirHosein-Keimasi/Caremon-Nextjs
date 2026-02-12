"use client";

import React from "react";
import { Reservation, ReservationStatus } from "@/store/reservationStore";
import { toPersianOptionLabel } from "@/utils/rentalOptions";
import styles from "./Invoice.module.css";

interface InvoiceProps {
  reservation: Reservation;
  showPrintButton?: boolean;
}

/**
 * Invoice Component (Updated for Single Rental)
 * کامپوننت فاکتور (به‌روز شده برای رزرو منفرد)
 */
export default function Invoice({
  reservation,
  showPrintButton = true,
}: InvoiceProps) {
  const handlePrint = () => {
    window.print();
  };

  const statusLabel = {
    [ReservationStatus.PENDING]: "در انتظار تایید",
    [ReservationStatus.CONFIRMED]: "تایید شده",
    [ReservationStatus.ACTIVE]: "فعال",
    [ReservationStatus.COMPLETED]: "تکمیل شده",
    [ReservationStatus.CANCELLED]: "لغو شده",
  };

  const paymentStatusLabel = {
    pending: "در انتظار پرداخت",
    completed: "پرداخت شده",
    failed: "پرداخت ناموفق",
  };

  // Calculate prices
  const rental = reservation.rental;
  const subtotal = rental.totalPrice;
  const tax = subtotal * 0.09; // 9% VAT
  const total = subtotal + tax;

  return (
    <div className={styles.invoiceContainer}>
      {showPrintButton && (
        <button onClick={handlePrint} className={styles.printBtn}>
          چاپ فاکتور
        </button>
      )}

      <div className={styles.invoiceContent}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.logo}>
            <h1>کارمون</h1>
            <p>خدمات اجاره خودرو</p>
          </div>
          <div className={styles.invoiceNumber}>
            <h2>فاکتور</h2>
            <p>شماره: {reservation.id}</p>
            <p>
              تاریخ:{" "}
              {new Date(reservation.createdAt).toLocaleDateString("fa-IR")}
            </p>
          </div>
        </div>

        {/* Customer Info */}
        <div className={styles.customerInfo}>
          <div className={styles.section}>
            <h3>اطلاعات مشتری</h3>
            <p>
              <strong>نام:</strong> {reservation.firstName}{" "}
              {reservation.lastName}
            </p>
            <p>
              <strong>ایمیل:</strong> {reservation.email}
            </p>
            <p>
              <strong>تلفن:</strong> {reservation.phone}
            </p>
          </div>

          <div className={styles.section}>
            <h3>وضعیت سفارش</h3>
            <p>
              <strong>وضعیت:</strong>{" "}
              <span className={styles[`status-${reservation.status}`]}>
                {statusLabel[reservation.status]}
              </span>
            </p>
            <p>
              <strong>پرداخت:</strong>{" "}
              <span className={styles[`payment-${reservation.paymentStatus}`]}>
                {paymentStatusLabel[reservation.paymentStatus]}
              </span>
            </p>
          </div>
        </div>

        {/* Items Section */}
        <div className={styles.itemsSection}>
          <h3>جزئیات خودرو</h3>
          <table className={styles.itemsTable}>
            <thead>
              <tr>
                <th>نام خودرو</th>
                <th>روزهای اجاره</th>
                <th>قیمت روزانه</th>
                <th>روزها</th>
                <th>مجموع</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div>
                    <strong>{rental.car.name}</strong>
                    <p className={styles.model}>{rental.car.model}</p>
                    {rental.withDriver && (
                      <span className={styles.driverBadge}>راننده شامل</span>
                    )}
                  </div>
                </td>
                <td>
                  {new Date(rental.startDate).toLocaleDateString("fa-IR")} تا{" "}
                  {new Date(rental.endDate).toLocaleDateString("fa-IR")}
                </td>
                <td>{rental.pricePerDay.toLocaleString("fa-IR")} تومان</td>
                <td>{rental.rentalDays}</td>
                <td className={styles.totalCell}>
                  {rental.totalPrice.toLocaleString("fa-IR")} تومان
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Options */}
        {rental.selectedOptions.length > 0 && (
          <div className={styles.optionsSection}>
            <h3>خدمات و اپشن‌های انتخاب شده</h3>
            <div className={styles.optionsList}>
              {rental.selectedOptions.map((option: string) => (
                <div key={option} className={styles.optionItem}>
                  <span>{rental.car.name}:</span>
                  <strong>{toPersianOptionLabel(option)}</strong>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Summary */}
        <div className={styles.summary}>
          <div className={styles.summaryRow}>
            <span>جمع اجاره:</span>
            <span>{subtotal.toLocaleString("fa-IR")} تومان</span>
          </div>
          <div className={styles.summaryRow}>
            <span>مالیات (9%):</span>
            <span>{tax.toLocaleString("fa-IR")} تومان</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.totalRow}`}>
            <span>مجموع کل:</span>
            <span>{total.toLocaleString("fa-IR")} تومان</span>
          </div>
          {reservation.paidAmount > 0 && (
            <>
              <div className={styles.summaryRow}>
                <span>مبلغ پرداخت شده:</span>
                <span>
                  {reservation.paidAmount.toLocaleString("fa-IR")} تومان
                </span>
              </div>
              {reservation.paidAmount < total && (
                <div className={`${styles.summaryRow} ${styles.remainingRow}`}>
                  <span>مبلغ باقی‌مانده:</span>
                  <span>
                    {(total - reservation.paidAmount).toLocaleString("fa-IR")}{" "}
                    تومان
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Terms */}
        <div className={styles.terms}>
          <p>
            این فاکتور به منزله توافق‌نامه اجاره است. لطفا شرایط و ضوابط خدمات
            را بررسی کنید.
          </p>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <p>تشکر از انتخاب خدمات کارمون</p>
          <p>تلفن پشتیبانی: 021-1234-5678 | ایمیل: support@caremon.ir</p>
        </div>
      </div>
    </div>
  );
}
