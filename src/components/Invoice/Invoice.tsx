"use client";

import React from "react";
import { Reservation, ReservationStatus } from "@/store/reservationStore";
import { toPersianOptionLabel } from "@/utils/rentalOptions";

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

  const getStatusClass = (status: ReservationStatus) => {
    const statusClasses: Record<ReservationStatus, string> = {
      [ReservationStatus.PENDING]: "px-3 py-1 rounded-xl text-sm font-semibold bg-[#fff3cd] text-[#856404]",
      [ReservationStatus.CONFIRMED]: "px-3 py-1 rounded-xl text-sm font-semibold bg-[#cfe2ff] text-[#084298]",
      [ReservationStatus.ACTIVE]: "px-3 py-1 rounded-xl text-sm font-semibold bg-[#d1e7dd] text-[#0f5132]",
      [ReservationStatus.COMPLETED]: "px-3 py-1 rounded-xl text-sm font-semibold bg-[#d1e7dd] text-[#0f5132]",
      [ReservationStatus.CANCELLED]: "px-3 py-1 rounded-xl text-sm font-semibold bg-[#f8d7da] text-[#842029]",
    };
    return statusClasses[status] || "";
  };

  const getPaymentStatusClass = (status: string) => {
    const paymentClasses: Record<string, string> = {
      pending: "px-3 py-1 rounded-xl text-sm font-semibold bg-[#fff3cd] text-[#856404]",
      completed: "px-3 py-1 rounded-xl text-sm font-semibold bg-[#d1e7dd] text-[#0f5132]",
      failed: "px-3 py-1 rounded-xl text-sm font-semibold bg-[#f8d7da] text-[#842029]",
    };
    return paymentClasses[status] || "";
  };

  return (
    <div className="rtl max-w-[900px] mx-auto p-8 print:p-0">
      {showPrintButton && (
        <button onClick={handlePrint} className="block mb-8 px-8 py-3 bg-[var(--color-primary-darkeMod)] text-white border-none rounded-md text-base font-semibold cursor-pointer transition-all hover:bg-[var(--color-primary)] print:hidden">
          چاپ فاکتور
        </button>
      )}

      <div className="bg-[var(--color-surface-400)] p-8 border border-[var(--color-gray-80)] rounded-lg shadow-[var(--shadow-400)] print:shadow-none print:border-none">
        {/* Header */}
        <div className="grid grid-cols-2 gap-8 pb-8 border-b-2 border-[var(--color-gray-80)] mb-8">
          <div>
            <h1 className="text-3xl m-0 text-[var(--color-primary-darkeMod)]">کارمون</h1>
            <p className="m-2.5 mt-0 text-[var(--color-gray-70)]">خدمات اجاره خودرو</p>
          </div>
          <div className="text-left">
            <h2 className="text-2xl m-0 text-[var(--color-gray-99)]">فاکتور</h2>
            <p className="m-2.5 mt-0 text-[var(--color-gray-70)] text-sm">شماره: {reservation.id}</p>
            <p className="m-2.5 mt-0 text-[var(--color-gray-70)] text-sm">
              تاریخ:{" "}
              {new Date(reservation.createdAt).toLocaleDateString("fa-IR")}
            </p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="grid grid-cols-2 gap-8 py-6 mb-8 border-b border-[var(--color-gray-80)]">
          <div>
            <h3 className="text-lg m-0 mb-4 text-[var(--color-gray-99)] border-b-2 border-[var(--color-gray-80)] pb-2">اطلاعات مشتری</h3>
            <p className="m-3 mt-0 text-[var(--color-gray-70)] leading-relaxed">
              <strong className="text-[var(--color-gray-99)]">نام:</strong> {reservation.firstName}{" "}
              {reservation.lastName}
            </p>
            <p className="m-3 mt-0 text-[var(--color-gray-70)] leading-relaxed">
              <strong className="text-[var(--color-gray-99)]">ایمیل:</strong> {reservation.email}
            </p>
            <p className="m-3 mt-0 text-[var(--color-gray-70)] leading-relaxed">
              <strong className="text-[var(--color-gray-99)]">تلفن:</strong> {reservation.phone}
            </p>
          </div>

          <div>
            <h3 className="text-lg m-0 mb-4 text-[var(--color-gray-99)] border-b-2 border-[var(--color-gray-80)] pb-2">وضعیت سفارش</h3>
            <p className="m-3 mt-0 text-[var(--color-gray-70)] leading-relaxed">
              <strong className="text-[var(--color-gray-99)]">وضعیت:</strong>{" "}
              <span className={getStatusClass(reservation.status)}>
                {statusLabel[reservation.status]}
              </span>
            </p>
            <p className="m-3 mt-0 text-[var(--color-gray-70)] leading-relaxed">
              <strong className="text-[var(--color-gray-99)]">پرداخت:</strong>{" "}
              <span className={getPaymentStatusClass(reservation.paymentStatus)}>
                {paymentStatusLabel[reservation.paymentStatus]}
              </span>
            </p>
          </div>
        </div>

        {/* Items Section */}
        <div className="my-8">
          <h3 className="text-lg mb-4 text-[var(--color-gray-99)]">جزئیات خودرو</h3>
          <table className="w-full border-collapse mb-8">
            <thead className="bg-[var(--color-surface-300)]">
              <tr>
                <th className="p-4 text-right font-semibold text-[var(--color-gray-99)] border-b-2 border-[var(--color-gray-80)]">نام خودرو</th>
                <th className="p-4 text-right font-semibold text-[var(--color-gray-99)] border-b-2 border-[var(--color-gray-80)]">روزهای اجاره</th>
                <th className="p-4 text-right font-semibold text-[var(--color-gray-99)] border-b-2 border-[var(--color-gray-80)]">قیمت روزانه</th>
                <th className="p-4 text-right font-semibold text-[var(--color-gray-99)] border-b-2 border-[var(--color-gray-80)]">روزها</th>
                <th className="p-4 text-right font-semibold text-[var(--color-gray-99)] border-b-2 border-[var(--color-gray-80)]">مجموع</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b border-[var(--color-gray-80)] text-[var(--color-gray-70)]">
                  <div>
                    <strong className="block text-[var(--color-gray-99)] text-base">{rental.car.name}</strong>
                    <p className="text-[var(--color-gray-70)] text-sm m-1 mt-0">{rental.car.model}</p>
                    {rental.withDriver && (
                      <span className="inline-block px-2.5 py-1 bg-[rgba(33,150,243,0.1)] text-[var(--color-primary-darkeMod)] rounded text-xs mt-1">راننده شامل</span>
                    )}
                  </div>
                </td>
                <td className="p-4 border-b border-[var(--color-gray-80)] text-[var(--color-gray-70)]">
                  {new Date(rental.startDate).toLocaleDateString("fa-IR")} تا{" "}
                  {new Date(rental.endDate).toLocaleDateString("fa-IR")}
                </td>
                <td className="p-4 border-b border-[var(--color-gray-80)] text-[var(--color-gray-70)]">{rental.pricePerDay.toLocaleString("fa-IR")} تومان</td>
                <td className="p-4 border-b border-[var(--color-gray-80)] text-[var(--color-gray-70)]">{rental.rentalDays}</td>
                <td className="p-4 border-b border-[var(--color-gray-80)] text-[var(--color-primary-darkeMod)] font-semibold">
                  {rental.totalPrice.toLocaleString("fa-IR")} تومان
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Options */}
        {rental.selectedOptions.length > 0 && (
          <div className="bg-[var(--color-surface-300)] p-6 rounded-md my-8">
            <h3 className="mt-0 text-lg mb-4 text-[var(--color-gray-99)]">خدمات و اپشن‌های انتخاب شده</h3>
            <div className="flex flex-col gap-3">
              {rental.selectedOptions.map((option: string) => (
                <div key={option} className="flex gap-4 p-2 bg-[var(--color-surface-400)] rounded">
                  <span className="text-[var(--color-gray-70)]">{rental.car.name}:</span>
                  <strong className="text-[var(--color-gray-99)]">{toPersianOptionLabel(option)}</strong>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="bg-[var(--color-surface-300)] p-6 rounded-md border-r-4 border-[var(--color-primary-darkeMod)] my-8">
          <div className="flex justify-between py-3 text-[var(--color-gray-70)] text-base">
            <span className="font-medium">جمع اجاره:</span>
            <span className="text-[var(--color-gray-99)]">{subtotal.toLocaleString("fa-IR")} تومان</span>
          </div>
          <div className="flex justify-between py-3 text-[var(--color-gray-70)] text-base">
            <span className="font-medium">مالیات (9%):</span>
            <span className="text-[var(--color-gray-99)]">{tax.toLocaleString("fa-IR")} تومان</span>
          </div>
          <div className="flex justify-between py-4 border-t-2 border-b-2 border-[var(--color-gray-80)] my-4 text-xl font-bold">
            <span className="font-medium">مجموع کل:</span>
            <span className="text-[var(--color-primary-darkeMod)]">{total.toLocaleString("fa-IR")} تومان</span>
          </div>
          {reservation.paidAmount > 0 && (
            <>
              <div className="flex justify-between py-3 text-[var(--color-gray-70)] text-base">
                <span className="font-medium">مبلغ پرداخت شده:</span>
                <span className="text-[var(--color-gray-99)]">
                  {reservation.paidAmount.toLocaleString("fa-IR")} تومان
                </span>
              </div>
              {reservation.paidAmount < total && (
                <div className="flex justify-between py-3 px-3 rounded bg-[rgba(255,193,7,0.1)] text-[#ff9800] text-base">
                  <span className="font-medium">مبلغ باقی‌مانده:</span>
                  <span className="text-[#ff9800]">
                    {(total - reservation.paidAmount).toLocaleString("fa-IR")}{" "}
                    تومان
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Terms */}
        <div className="bg-[var(--color-surface-300)] p-4 rounded-md my-8 text-center text-[var(--color-gray-70)] text-sm leading-relaxed">
          <p className="m-0">
            این فاکتور به منزله توافق‌نامه اجاره است. لطفا شرایط و ضوابط خدمات
            را بررسی کنید.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-[var(--color-gray-80)] text-[var(--color-gray-70)] text-sm">
          <p className="m-2.5 mt-0">تشکر از انتخاب خدمات کارمون</p>
          <p className="m-2.5 mt-0">تلفن پشتیبانی: 021-1234-5678 | ایمیل: support@caremon.ir</p>
        </div>
      </div>
    </div>
  );
}
