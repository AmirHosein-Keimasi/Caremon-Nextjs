"use client";

import React from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
      <Card className="text-center py-16 px-8">
        <CardContent>
          <p className="text-lg text-muted-foreground mb-6">سبد خرید خالی است</p>
          <Button variant="outline" onClick={() => router.push("/search")}>
            جستجوی خودرو
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="rtl p-8 max-w-[1200px] mx-auto">
      <h2 className="text-2xl mb-8 text-foreground">رزرو فعلی</h2>

      <div className="flex flex-col gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
        <div className="grid grid-cols-[120px_1fr_200px_120px_50px] gap-6 items-center max-lg:grid-cols-1 max-lg:gap-4">
          <div className="relative w-[120px] h-[100px] overflow-hidden rounded bg-muted">
            <Image
              src={
                currentRental.car.img.startsWith("http")
                  ? currentRental.car.img
                  : `https://cafeerent.com/storage/www/cars/single/${currentRental.car.img}`
              }
              alt={currentRental.car.name}
              width={120}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">{currentRental.car.name}</h3>
            <p className="text-muted-foreground text-sm mb-2">{currentRental.car.model}</p>
            <div className="flex gap-2 text-sm text-muted-foreground mb-2">
              <span>
                {new Date(currentRental.startDate).toLocaleDateString("fa-IR")}
              </span>
              <span>تا</span>
              <span>
                {new Date(currentRental.endDate).toLocaleDateString("fa-IR")}
              </span>
            </div>
            {currentRental.withDriver && (
              <Badge variant="secondary" className="mr-2">راننده شامل</Badge>
            )}
            {currentRental.selectedOptions.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                <span>خدمات:</span>
                {currentRental.selectedOptions.map((opt) => (
                  <span key={opt} className="inline-block px-2 py-1 bg-muted rounded text-xs text-muted-foreground">
                    {opt}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 text-right">
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-muted-foreground">قیمت روزانه:</span>
              <span className="font-medium text-foreground">
                {currentRental.pricePerDay.toLocaleString("fa-IR")} تومان
              </span>
            </div>
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-muted-foreground">روزها:</span>
              <span className="font-medium text-foreground">{currentRental.rentalDays}</span>
            </div>
            <div className="flex justify-between gap-4 border-t border-border pt-2 mt-2">
              <span className="text-muted-foreground">مجموع:</span>
              <span className="text-primary text-lg font-medium">
                {currentRental.totalPrice.toLocaleString("fa-IR")} تومان
              </span>
            </div>
          </div>

          <Button
            variant="destructive"
            size="icon"
            className="w-10 h-10"
            onClick={handleClearRental}
            title="حذف از سبد"
          >
            ✕
          </Button>
        </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted p-6 rounded-lg mb-8 border-r-4 border-primary">
        <div className="flex justify-between py-3 text-base text-muted-foreground">
          <span>تعداد روزهای اجاره:</span>
          <span>{currentRental.rentalDays}</span>
        </div>
        <div className="flex justify-between py-3 border-t border-border pt-4 mt-4 text-xl font-semibold text-primary">
          <span>مجموع:</span>
          <span>{totalPrice.toLocaleString("fa-IR")} تومان</span>
        </div>
      </div>

      <div className="flex gap-4 justify-center flex-wrap">
        <Button variant="outline" onClick={() => router.push("/search")}>
          جستجوی خودروهای دیگر
        </Button>
        <Button onClick={handleCheckout} className="bg-success text-success-foreground hover:bg-success/90">
          ادامه برای پرداخت
        </Button>
      </div>
    </div>
  );
}
