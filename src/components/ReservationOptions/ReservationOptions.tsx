"use client";

import React, { useState } from "react";
import { CarsModel } from "@/models/cars.model";
import { useAddToCart } from "@/hooks/useAddToCart";
import { useRouter } from "next/navigation";
import styles from "./ReservationOptions.module.css";

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
    <form onSubmit={handleAddToCart} className={styles.reservationOptions}>
      <h3>گزینه های رزرو</h3>

      {/* Dates Section */}
      <div className={styles.section}>
        <h4>تاریخ و محل</h4>

        <div className={styles.dateRow}>
          <div className={styles.formGroup}>
            <label>تاریخ شروع</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={minDate}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>تاریخ پایان</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || minDate}
              required
            />
          </div>
        </div>

        <div className={styles.locationRow}>
          <div className={styles.formGroup}>
            <label>محل تحویل</label>
            <select
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              required
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

          <button
            type="button"
            onClick={handleLocationSwap}
            className={styles.swapBtn}
            title="تعویض مکان"
          >
            ⇄
          </button>

          <div className={styles.formGroup}>
            <label>محل تحویل</label>
            <select
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              required
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
      <div className={styles.section}>
        <h4>خدمات اضافی</h4>

        <div className={styles.driverOption}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={withDriver}
              onChange={(e) => setWithDriver(e.target.checked)}
            />
            <span>درخواست راننده</span>
          </label>

          {withDriver && (
            <div className={styles.driverDays}>
              <label>تعداد روزهای راننده</label>
              <input
                type="number"
                min="1"
                value={driverDays}
                onChange={(e) => setDriverDays(parseInt(e.target.value))}
              />
            </div>
          )}
        </div>
      </div>

      {/* Options Section */}
      {availableOptions.length > 0 && (
        <div className={styles.section}>
          <h4>اپشن‌های اضافی</h4>

          <div className={styles.optionsGrid}>
            {availableOptions.map((option) => (
              <label key={option.key} className={styles.optionCheckbox}>
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option.label)}
                  onChange={() => toggleOption(option.label)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span>قیمت روزانه:</span>
          <span>{car.rental.minimum_rental.toLocaleString("fa-IR")} تومان</span>
        </div>
        {startDate && endDate && (
          <>
            <div className={styles.summaryRow}>
              <span>روزهای اجاره:</span>
              <span>
                {Math.ceil(
                  (new Date(endDate).getTime() -
                    new Date(startDate).getTime()) /
                    (1000 * 60 * 60 * 24),
                )}{" "}
                روز
              </span>
            </div>
            <div className={styles.summaryRow + " " + styles.total}>
              <span>تخمین هزینه:</span>
              <span>
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
      <div className={styles.actions}>
        <button type="submit" disabled={loading} className={styles.addBtn}>
          {loading ? "در حال اضافه کردن..." : "اضافه به سبد خرید"}
        </button>
      </div>
    </form>
  );
}
