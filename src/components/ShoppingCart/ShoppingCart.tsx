"use client";

import React from "react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";

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
      <div className="text-center py-16 px-8 bg-[var(--color-surface-300)] rounded-lg">
        <p className="text-lg text-[var(--color-gray-70)] mb-6">سبد خرید خالی است</p>
        <button
          onClick={() => router.push("/search")}
          className="px-8 py-3 bg-[var(--color-surface-300)] text-[var(--color-gray-99)] border border-[var(--color-gray-80)] rounded-md hover:bg-[var(--color-surface-400)] hover:border-[var(--color-gray-70)] transition-all"
        >
          جستجوی خودرو
        </button>
      </div>
    );
  }

  return (
    <div className="rtl p-8 max-w-[1200px] mx-auto">
      <h2 className="text-2xl mb-8 text-[var(--color-gray-99)]">رزرو فعلی</h2>

      <div className="flex flex-col gap-6 mb-8">
        <div className="grid grid-cols-[120px_1fr_200px_120px_50px] gap-6 items-center p-6 bg-[var(--color-surface-400)] border border-[var(--color-gray-80)] rounded-lg shadow-[var(--shadow-400)] max-lg:grid-cols-1 max-lg:gap-4">
          <div className="relative w-[120px] h-[100px] overflow-hidden rounded bg-[var(--color-surface-300)]">
            <img
              src={currentRental.car.img}
              alt={currentRental.car.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-[var(--color-gray-99)]">{currentRental.car.name}</h3>
            <p className="text-[var(--color-gray-70)] text-sm mb-2">{currentRental.car.model}</p>
            <div className="flex gap-2 text-sm text-[var(--color-gray-70)] mb-2">
              <span>
                {new Date(currentRental.startDate).toLocaleDateString("fa-IR")}
              </span>
              <span>تا</span>
              <span>
                {new Date(currentRental.endDate).toLocaleDateString("fa-IR")}
              </span>
            </div>
            {currentRental.withDriver && (
              <span className="inline-block px-3 py-1 bg-[rgba(33,150,243,0.1)] text-[var(--color-primary-darkeMod)] rounded-xl text-sm mr-2">راننده شامل</span>
            )}
            {currentRental.selectedOptions.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                <span>خدمات:</span>
                {currentRental.selectedOptions.map((opt) => (
                  <span key={opt} className="inline-block px-2 py-1 bg-[var(--color-surface-300)] rounded text-xs text-[var(--color-gray-70)]">
                    {opt}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 text-right">
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-[var(--color-gray-70)]">قیمت روزانه:</span>
              <span className="font-medium text-[var(--color-gray-99)]">
                {currentRental.pricePerDay.toLocaleString("fa-IR")} تومان
              </span>
            </div>
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-[var(--color-gray-70)]">روزها:</span>
              <span className="font-medium text-[var(--color-gray-99)]">{currentRental.rentalDays}</span>
            </div>
            <div className="flex justify-between gap-4 border-t border-[var(--color-gray-80)] pt-2 mt-2">
              <span className="text-[var(--color-gray-70)]">مجموع:</span>
              <span className="text-[var(--color-primary-darkeMod)] text-lg font-medium">
                {currentRental.totalPrice.toLocaleString("fa-IR")} تومان
              </span>
            </div>
          </div>

          <button
            className="w-10 h-10 border-none bg-[rgba(220,53,69,0.1)] text-[#dc3545] rounded cursor-pointer text-xl transition-all hover:bg-[rgba(220,53,69,0.2)]"
            onClick={handleClearRental}
            title="حذف از سبد"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="bg-[var(--color-surface-300)] p-6 rounded-lg mb-8 border-r-4 border-[var(--color-primary-darkeMod)]">
        <div className="flex justify-between py-3 text-base text-[var(--color-gray-70)]">
          <span>تعداد روزهای اجاره:</span>
          <span>{currentRental.rentalDays}</span>
        </div>
        <div className="flex justify-between py-3 border-t border-[var(--color-gray-80)] pt-4 mt-4 text-xl font-semibold text-[var(--color-primary-darkeMod)]">
          <span>مجموع:</span>
          <span>{totalPrice.toLocaleString("fa-IR")} تومان</span>
        </div>
      </div>

      <div className="flex gap-4 justify-center flex-wrap">
        <button
          onClick={() => router.push("/search")}
          className="px-8 py-3 bg-[var(--color-surface-300)] text-[var(--color-gray-99)] border border-[var(--color-gray-80)] rounded-md font-semibold cursor-pointer transition-all hover:bg-[var(--color-surface-400)] hover:border-[var(--color-gray-70)]"
        >
          جستجوی خودروهای دیگر
        </button>
        <button onClick={handleCheckout} className="px-8 py-3 bg-[#4caf50] text-white border-none rounded-md font-semibold cursor-pointer transition-all hover:bg-[#45a049]">
          ادامه برای پرداخت
        </button>
      </div>
    </div>
  );
}
