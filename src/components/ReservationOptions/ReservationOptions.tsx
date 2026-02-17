"use client";

import React, { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { CarsModel } from "@/models/cars.model";
import { useAddToCart } from "@/hooks/useAddToCart";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ReservationOptionsProps {
  car: CarsModel;
  onSuccess?: () => void;
}

/**
 * Reservation Options Component
 * کامپوننت گزینه های رزرو
 * Allows users to select dates, locations, driver, and additional options
 */
export default function ReservationOptions({
  car,
  onSuccess,
}: ReservationOptionsProps) {
  const router = useRouter();
  const { addItem } = useAddToCart();

  // Form state
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [withDriver, setWithDriver] = useState(false);
  const [driverDays, setDriverDays] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Available options based on car features
  const availableOptions: {
    label: string;
    key: keyof CarsModel["features"];
  }[] = [
    { label: "بدون سربند", key: "panoramic_roof" },
    { label: "سیستم صوتی پیشرفته", key: "audio_system" },
    { label: "گرمایش صندلی", key: "seat_heating" },
    { label: "خنک‌کننده صندلی", key: "seat_cooling" },
    { label: "کنترل تطبیقی سرعت", key: "cruise_control" },
    { label: "پارک خودکار", key: "auto_park" },
  ];

  const handleAddToCart = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = addItem({
        car,
        startDate,
        endDate,
        pickupLocation,
        dropoffLocation,
        pricePerDay: car.rental.minimum_rental,
        withDriver,
        driverDays: withDriver ? driverDays : undefined,
        selectedOptions,
      });

      if (success) {
        // Reset form
        setStartDate("");
        setEndDate("");
        setPickupLocation("");
        setDropoffLocation("");
        setWithDriver(false);
        setDriverDays(0);
        setSelectedOptions([]);

        if (onSuccess) {
          onSuccess();
        }

        // Optionally redirect to cart
        setTimeout(() => {
          router.push("/cart");
        }, 1500);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option],
    );
  };

  const handleLocationSwap = () => {
    const temp = pickupLocation;
    setPickupLocation(dropoffLocation);
    setDropoffLocation(temp);
  };

  // Simple date picker (you can replace with date-picker library)
  const minDate = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleAddToCart} className="bg-card p-8 rounded-lg shadow-md rtl">
      <h3 className="m-0 mb-6 text-xl text-foreground">گزینه های رزرو</h3>

      {/* Dates Section */}
      <div className="mb-8 pb-6 border-b border-border last:border-b-0">
        <h4 className="m-0 mb-4 text-lg text-foreground font-semibold">تاریخ و محل</h4>

        <div className="grid grid-cols-2 gap-4 mb-4 max-[600px]:grid-cols-1">
          <div className="flex flex-col gap-2">
            <label className="font-medium text-foreground text-sm">تاریخ شروع</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={minDate}
              required
              className="p-3 border border-border rounded bg-muted text-foreground text-base font-inherit focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-foreground text-sm">تاریخ پایان</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || minDate}
              required
              className="p-3 border border-border rounded bg-muted text-foreground text-base font-inherit focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-[1fr_50px_1fr] gap-4 items-end max-[600px]:grid-cols-1">
          <div className="flex flex-col gap-2">
            <label className="font-medium text-foreground text-sm">محل تحویل</label>
            <select
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              required
              className="p-3 border border-border rounded bg-muted text-foreground text-base font-inherit focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="">انتخاب کنید</option>
              <option value="تهران-مرکز">تهران - مرکز</option>
              <option value="تهران-فرودگاه">تهران - فرودگاه</option>
              <option value="تهران-شمال">تهران - شمال</option>
              <option value="تهران-جنوب">تهران - جنوب</option>
              <option value="کیش">کیش</option>
              <option value="دبی">دبی</option>
            </select>
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleLocationSwap}
            title="تعویض مکان"
          >
            ⇄
          </Button>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-foreground text-sm">محل تحویل</label>
            <select
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              required
              className="p-3 border border-border rounded bg-muted text-foreground text-base font-inherit focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="">انتخاب کنید</option>
              <option value="تهران-مرکز">تهران - مرکز</option>
              <option value="تهران-فرودگاه">تهران - فرودگاه</option>
              <option value="تهران-شمال">تهران - شمال</option>
              <option value="تهران-جنوب">تهران - جنوب</option>
              <option value="کیش">کیش</option>
              <option value="دبی">دبی</option>
            </select>
          </div>
        </div>
      </div>

      {/* Driver Section */}
      <div className="mb-8 pb-6 border-b border-border last:border-b-0">
        <h4 className="m-0 mb-4 text-lg text-foreground font-semibold">خدمات اضافی</h4>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Checkbox
              id="withDriver"
              checked={withDriver}
              onCheckedChange={(checked) => setWithDriver(!!checked)}
            />
            <Label htmlFor="withDriver" className="cursor-pointer">درخواست راننده</Label>
          </div>

          {withDriver && (
            <div className="flex flex-col gap-2 p-4 bg-muted rounded">
              <Label htmlFor="driverDays">تعداد روزهای راننده</Label>
              <Input
                id="driverDays"
                type="number"
                min={1}
                value={driverDays}
                onChange={(e) => setDriverDays(parseInt(e.target.value) || 0)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Options Section */}
      {availableOptions.length > 0 && (
        <div className="mb-8 pb-6 border-b border-border last:border-b-0">
          <h4 className="m-0 mb-4 text-lg text-foreground font-semibold">اپشن‌های اضافی</h4>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 max-[600px]:grid-cols-1">
            {availableOptions.map((option) => (
              <div
                key={option.key}
                className="flex items-center gap-2 p-3 bg-muted border border-border rounded cursor-pointer transition-all hover:bg-card hover:border-primary"
                onClick={() => toggleOption(option.label)}
              >
                <Checkbox
                  id={option.key}
                  checked={selectedOptions.includes(option.label)}
                  onCheckedChange={() => toggleOption(option.label)}
                />
                <Label htmlFor={option.key} className="cursor-pointer font-medium">{option.label}</Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="bg-muted p-6 rounded-md border-r-4 border-primary my-8">
        <div className="flex justify-between py-3 text-muted-foreground">
          <span className="font-medium">قیمت روزانه:</span>
          <span className="text-foreground font-medium">{car.rental.minimum_rental.toLocaleString("fa-IR")} تومان</span>
        </div>
        {startDate && endDate && (
          <>
            <div className="flex justify-between py-3 text-muted-foreground">
              <span className="font-medium">روزهای اجاره:</span>
              <span className="text-foreground font-medium">
                {Math.ceil(
                  (new Date(endDate).getTime() -
                    new Date(startDate).getTime()) /
                    (1000 * 60 * 60 * 24),
                )}{" "}
                روز
              </span>
            </div>
            <div className="flex justify-between py-4 border-t-2 border-b-2 border-border my-2 text-lg">
              <span className="font-medium">تخمین هزینه:</span>
              <span className="text-primary font-bold">
                {(
                  car.rental.minimum_rental *
                  Math.ceil(
                    (new Date(endDate).getTime() -
                      new Date(startDate).getTime()) /
                      (1000 * 60 * 60 * 24),
                  )
                ).toLocaleString("fa-IR")}{" "}
                تومان
              </span>
            </div>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
        <Button type="submit" disabled={loading} className="flex-1 bg-[#4caf50] hover:bg-[#45a049]">
          {loading ? (
            <>
              <Loader2Icon className="size-4 animate-spin" />
              در حال اضافه کردن...
            </>
          ) : (
            "اضافه به سبد خرید"
          )}
        </Button>
      </div>
    </form>
  );
}
