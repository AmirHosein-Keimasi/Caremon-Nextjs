"use client";

import React from "react";
import { Button } from "@/components/ui/button";
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
        <Button onClick={handlePrint} className="block mb-8 print:hidden">
          چاپ فاکتور
        </Button>
      )}

      <div className="bg-card p-8 border border-border rounded-lg shadow-md print:shadow-none print:border-none">
        {/* Header */}
        <div className="grid grid-cols-2 gap-8 pb-8 border-b-2 border-border mb-8">
          <div>
            <h1 className="text-3xl m-0 text-primary">کارمون</h1>
            <p className="m-2.5 mt-0 text-muted-foreground">خدمات اجاره خودرو</p>
          </div>
          <div className="text-left">
            <h2 className="text-2xl m-0 text-foreground">فاکتور</h2>
            <p className="m-2.5 mt-0 text-muted-foreground text-sm">شماره: {reservation.id}</p>
            <p className="m-2.5 mt-0 text-muted-foreground text-sm">
              تاریخ:{" "}
              {new Date(reservation.createdAt).toLocaleDateString("fa-IR")}
            </p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="grid grid-cols-2 gap-8 py-6 mb-8 border-b border-border">
          <div>
            <h3 className="text-lg m-0 mb-4 text-foreground border-b-2 border-border pb-2">اطلاعات مشتری</h3>
            <p className="m-3 mt-0 text-muted-foreground leading-relaxed">
              <strong className="text-foreground">نام:</strong> {reservation.firstName}{" "}
              {reservation.lastName}
            </p>
            <p className="m-3 mt-0 text-muted-foreground leading-relaxed">
              <strong className="text-foreground">ایمیل:</strong> {reservation.email}
            </p>
            <p className="m-3 mt-0 text-muted-foreground leading-relaxed">
              <strong className="text-foreground">تلفن:</strong> {reservation.phone}
            </p>
          </div>

          <div>
            <h3 className="text-lg m-0 mb-4 text-foreground border-b-2 border-border pb-2">وضعیت سفارش</h3>
            <p className="m-3 mt-0 text-muted-foreground leading-relaxed">
              <strong className="text-foreground">وضعیت:</strong>{" "}
              <span className={getStatusClass(reservation.status)}>
                {statusLabel[reservation.status]}
              </span>
            </p>
            <p className="m-3 mt-0 text-muted-foreground leading-relaxed">
              <strong className="text-foreground">پرداخت:</strong>{" "}
              <span className={getPaymentStatusClass(reservation.paymentStatus)}>
                {paymentStatusLabel[reservation.paymentStatus]}
              </span>
            </p>
          </div>
        </div>

        {/* Items Section */}
        <div className="my-8">
          <h3 className="text-lg mb-4 text-foreground">جزئیات خودرو</h3>
          <table className="w-full border-collapse mb-8">
            <thead className="bg-muted">
              <tr>
                <th className="p-4 text-right font-semibold text-foreground border-b-2 border-border">نام خودرو</th>
                <th className="p-4 text-right font-semibold text-foreground border-b-2 border-border">روزهای اجاره</th>
                <th className="p-4 text-right font-semibold text-foreground border-b-2 border-border">قیمت روزانه</th>
                <th className="p-4 text-right font-semibold text-foreground border-b-2 border-border">روزها</th>
                <th className="p-4 text-right font-semibold text-foreground border-b-2 border-border">مجموع</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b border-border text-muted-foreground">
                  <div>
                    <strong className="block text-foreground text-base">{rental.car.name}</strong>
                    <p className="text-muted-foreground text-sm m-1 mt-0">{rental.car.model}</p>
                    {rental.withDriver && (
                      <span className="inline-block px-2.5 py-1 bg-primary/10 text-primary rounded text-xs mt-1">راننده شامل</span>
                    )}
                  </div>
                </td>
                <td className="p-4 border-b border-border text-muted-foreground">
                  {new Date(rental.startDate).toLocaleDateString("fa-IR")} تا{" "}
                  {new Date(rental.endDate).toLocaleDateString("fa-IR")}
                </td>
                <td className="p-4 border-b border-border text-muted-foreground">{rental.pricePerDay.toLocaleString("fa-IR")} تومان</td>
                <td className="p-4 border-b border-border text-muted-foreground">{rental.rentalDays}</td>
                <td className="p-4 border-b border-border text-primary font-semibold">
                  {rental.totalPrice.toLocaleString("fa-IR")} تومان
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Options */}
        {rental.selectedOptions.length > 0 && (
          <div className="bg-muted p-6 rounded-md my-8">
            <h3 className="mt-0 text-lg mb-4 text-foreground">خدمات و اپشن‌های انتخاب شده</h3>
            <div className="flex flex-col gap-3">
              {rental.selectedOptions.map((option: string) => (
                <div key={option} className="flex gap-4 p-2 bg-card rounded">
                  <span className="text-muted-foreground">{rental.car.name}:</span>
                  <strong className="text-foreground">{toPersianOptionLabel(option)}</strong>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="bg-muted p-6 rounded-md border-r-4 border-primary my-8">
          <div className="flex justify-between py-3 text-muted-foreground text-base">
            <span className="font-medium">جمع اجاره:</span>
            <span className="text-foreground">{subtotal.toLocaleString("fa-IR")} تومان</span>
          </div>
          <div className="flex justify-between py-3 text-muted-foreground text-base">
            <span className="font-medium">مالیات (9%):</span>
            <span className="text-foreground">{tax.toLocaleString("fa-IR")} تومان</span>
          </div>
          <div className="flex justify-between py-4 border-t-2 border-b-2 border-border my-4 text-xl font-bold">
            <span className="font-medium">مجموع کل:</span>
            <span className="text-primary">{total.toLocaleString("fa-IR")} تومان</span>
          </div>
          {reservation.paidAmount > 0 && (
            <>
              <div className="flex justify-between py-3 text-muted-foreground text-base">
                <span className="font-medium">مبلغ پرداخت شده:</span>
                <span className="text-foreground">
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
        <div className="bg-muted p-4 rounded-md my-8 text-center text-muted-foreground text-sm leading-relaxed">
          <p className="m-0">
            این فاکتور به منزله توافق‌نامه اجاره است. لطفا شرایط و ضوابط خدمات
            را بررسی کنید.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-border text-muted-foreground text-sm">
          <p className="m-2.5 mt-0">تشکر از انتخاب خدمات کارمون</p>
          <p className="m-2.5 mt-0">تلفن پشتیبانی: 021-1234-5678 | ایمیل: support@caremon.ir</p>
        </div>
      </div>
    </div>
  );
}
