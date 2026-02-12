"use client";

import React, { useRef, useState } from "react";
import { DateObject } from "react-multi-date-picker";
import { CarsModel } from "@/models/cars.model";
import { useCartStore, RentalItem } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import StartDatePicker from "@/components/calendar/StartDatePicker-component";
import EndDatePicker from "@/components/calendar/EndDatePicker-component";
import styles from "./ReserveButton.module.css";

interface ReserveButtonProps {
  car: CarsModel;
}

/**
 * Reserve Button Component
 * کمپوننت باتن رزرو
 */
export default function ReserveButton({ car }: ReserveButtonProps) {
  const router = useRouter();
  const setRental = useCartStore((state) => state.setRental);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<DateObject | null>(null);
  const [endDate, setEndDate] = useState<DateObject | null>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const today = new DateObject();

  // Form state
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    pickupLocation: "تهران",
    dropoffLocation: "تهران",
    withDriver: false,
    driverDays: 0,
    selectedOptions: [] as string[],
  });

  const toLocalDateTime = (date: DateObject) => {
    const d = date.toDate();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hour = String(d.getHours()).padStart(2, "0");
    const minute = String(d.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hour}:${minute}`;
  };

  const handleStartDateChange = (date: DateObject | null) => {
    setStartDate(date);
    setFormData((prev) => ({
      ...prev,
      startDate: date ? toLocalDateTime(date) : "",
    }));

    if (date && endDate) {
      const startTime = date.toDate().getTime();
      const endTime = endDate.toDate().getTime();

      if (startTime > endTime) {
        setEndDate(null);
        setFormData((prev) => ({
          ...prev,
          endDate: "",
        }));
      }
    }
  };

  const handleEndDateChange = (date: DateObject | null) => {
    setEndDate(date);
    setFormData((prev) => ({
      ...prev,
      endDate: date ? toLocalDateTime(date) : "",
    }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDriverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: parseInt(value) || 0,
      }));
    }
  };

  const handleOptionChange = (option: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedOptions: prev.selectedOptions.includes(option)
        ? prev.selectedOptions.filter((o) => o !== option)
        : [...prev.selectedOptions, option],
    }));
  };

  const calculateRentalDays = () => {
    if (!formData.startDate || !formData.endDate) return 0;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const days = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );
    return Math.max(1, days);
  };

  const handleReserve = async () => {
    // Validation
    if (!formData.startDate || !formData.endDate) {
      toast.error("لطفا تاریخ شروع و پایان رزرو را انتخاب کنید");
      return;
    }

    const rentalDays = calculateRentalDays();
    if (rentalDays < 1) {
      toast.error("تاریخ پایان باید بعد از تاریخ شروع باشد");
      return;
    }

    setLoading(true);

    try {
      const rentalItem: RentalItem = {
        id: `${car.id}-${Date.now()}`,
        car,
        rentalDays,
        startDate: formData.startDate,
        endDate: formData.endDate,
        pickupLocation: formData.pickupLocation,
        dropoffLocation: formData.dropoffLocation,
        withDriver: formData.withDriver,
        driverDays: formData.withDriver ? formData.driverDays : undefined,
        selectedOptions: formData.selectedOptions,
        pricePerDay: car.rental.days_3_to_14 || 100000, // Default price
        totalPrice: 0, // Will be calculated by store
        addedAt: Date.now(),
      };

      setRental(rentalItem);
      toast.success("رزرو با موفقیت ایجاد شد!");
      setShowReservationForm(false);

      // Redirect to checkout/summary
      router.push("/checkout");
    } catch (error) {
      toast.error("خطا در ایجاد رزرو");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const locations = ["تهران", "مشهد", "اصفهان", "شیراز", "کرج", "تبریز"];
  const options = [
    { id: "gps", label: "GPS" },
    { id: "child-seat", label: "صندلی کودک" },
    { id: "wifi", label: "وای فای" },
    { id: "insurance", label: "بیمه توسعه‌یافته" },
    { id: "fuel-full", label: "تانک پر بنزین" },
    { id: "parking", label: "پارکینگ رایگان" },
  ];

  return (
    <>
      <button
        className={styles.reserveBtn}
        onClick={() => setShowReservationForm(true)}
      >
        رزرو کنید
      </button>

      {showReservationForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>رزرو {car.model}</h2>
              <button
                className={styles.closeBtn}
                onClick={() => setShowReservationForm(false)}
              >
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* Dates */}
              <div className={styles.section}>
                <h3>تاریخ‌های رزرو</h3>
                <div className={styles.dateRow}>
                  <div className={styles.formGroup}>
                    <label>تاریخ شروع</label>
                    <StartDatePicker
                      ref={startDateRef}
                      value={startDate}
                      onChange={handleStartDateChange}
                      minDate={today}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>تاریخ پایان</label>
                    <EndDatePicker
                      ref={endDateRef}
                      value={endDate}
                      onChange={handleEndDateChange}
                      minDate={startDate || today}
                      disabled={!startDate}
                    />
                  </div>
                </div>
              </div>

              {/* Locations */}
              <div className={styles.section}>
                <h3>محل تحویل و تسلیم</h3>
                <div className={styles.locationRow}>
                  <div className={styles.formGroup}>
                    <label>محل تحویل</label>
                    <select
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleLocationChange}
                    >
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    className={styles.swapBtn}
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        pickupLocation: prev.dropoffLocation,
                        dropoffLocation: prev.pickupLocation,
                      }));
                    }}
                  >
                    ⇄
                  </button>
                  <div className={styles.formGroup}>
                    <label>محل تسلیم</label>
                    <select
                      name="dropoffLocation"
                      value={formData.dropoffLocation}
                      onChange={handleLocationChange}
                    >
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Driver */}
              <div className={styles.section}>
                <h3>راننده</h3>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="withDriver"
                    checked={formData.withDriver}
                    onChange={handleDriverChange}
                  />
                  <span>می‌خواهم راننده اختصاصی داشته باشم</span>
                </label>
                {formData.withDriver && (
                  <div className={styles.driverDays}>
                    <label>تعداد روزهایی که راننده را نیاز دارید</label>
                    <input
                      type="number"
                      name="driverDays"
                      min="1"
                      max={calculateRentalDays()}
                      value={formData.driverDays || 1}
                      onChange={handleDriverChange}
                    />
                  </div>
                )}
              </div>

              {/* Options */}
              <div className={styles.section}>
                <h3>خدمات اضافی</h3>
                <div className={styles.optionsGrid}>
                  {options.map((option) => (
                    <label key={option.id} className={styles.optionCheckbox}>
                      <input
                        type="checkbox"
                        checked={formData.selectedOptions.includes(option.id)}
                        onChange={() => handleOptionChange(option.id)}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Summary */}
              {formData.startDate && formData.endDate && (
                <div className={styles.summary}>
                  <div className={styles.summaryRow}>
                    <span>قیمت روزانه:</span>
                    <span>
                      {(car.rental.days_3_to_14 || 100000).toLocaleString(
                        "fa-IR",
                      )}{" "}
                      تومان
                    </span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>تعداد روز:</span>
                    <span>{calculateRentalDays()} روز</span>
                  </div>
                  {formData.withDriver && (
                    <div className={styles.summaryRow}>
                      <span>هزینه راننده (روزانه):</span>
                      <span>
                        {(
                          (car.rental.days_3_to_14 || 100000) *
                          0.5 *
                          formData.driverDays
                        ).toLocaleString("fa-IR")}{" "}
                        تومان
                      </span>
                    </div>
                  )}
                  <div className={styles.summaryRow + " " + styles.total}>
                    <span>جمع کل:</span>
                    <span>
                      {(
                        (car.rental.days_3_to_14 || 100000) *
                          calculateRentalDays() +
                        (formData.withDriver
                          ? (car.rental.days_3_to_14 || 100000) *
                            0.5 *
                            formData.driverDays
                          : 0)
                      ).toLocaleString("fa-IR")}{" "}
                      تومان
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.modalFooter}>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowReservationForm(false)}
                disabled={loading}
              >
                انصراف
              </button>
              <button
                className={styles.submitBtn}
                onClick={handleReserve}
                disabled={loading}
              >
                {loading ? "در حال پردازش..." : "تأیید و ادامه"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
