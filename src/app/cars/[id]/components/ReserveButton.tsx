"use client";

import React, { useRef, useState } from "react";
import { DateObject } from "react-multi-date-picker";
import { CarsModel } from "@/models/cars.model";
import { useCartStore, RentalItem } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import StartDatePicker from "@/components/calendar/StartDatePicker-component";
import EndDatePicker from "@/components/calendar/EndDatePicker-component";

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
        className="px-8 py-3 bg-[var(--color-primary-darkeMod)] text-white border-none rounded-md text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-[var(--color-primary)] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(33,150,243,0.3)]"
        onClick={() => setShowReservationForm(true)}
      >
        رزرو کنید
      </button>

      {showReservationForm && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(7,10,18,0.52)] backdrop-blur-sm flex items-center justify-center z-[1000] rtl">
          <div className="bg-[var(--color-surface-400)] rounded-2xl max-w-[600px] w-[90%] max-h-[90vh] overflow-y-auto shadow-[0_18px_48px_rgba(0,0,0,0.28)]">
            <div className="flex justify-between items-center p-6 shadow-[inset_0_-1px_0_rgba(148,163,184,0.2)]">
              <h2 className="m-0 text-[var(--color-gray-99)] text-[1.3rem]">
                رزرو {car.model}
              </h2>
              <button
                className="bg-none border-none text-2xl text-[var(--color-gray-70)] cursor-pointer p-0 transition-[color] duration-300 hover:text-[var(--color-gray-99)]"
                onClick={() => setShowReservationForm(false)}
              >
                ✕
              </button>
            </div>

            <div className="p-6 grid gap-4">
              {/* Dates */}
              <div className="m-0 p-4 rounded-xl bg-[var(--color-surface-300)]">
                <h3 className="m-0 mb-4 text-[var(--color-gray-99)] text-[1.1rem] font-semibold">
                  تاریخ‌های رزرو
                </h3>
                <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
                  <div className="flex flex-col gap-2 mb-4">
                    <label className="font-medium text-[var(--color-gray-99)] text-[0.95rem]">
                      تاریخ شروع
                    </label>
                    <StartDatePicker
                      ref={startDateRef}
                      value={startDate}
                      onChange={handleStartDateChange}
                      minDate={today}
                    />
                  </div>
                  <div className="flex flex-col gap-2 mb-4">
                    <label className="font-medium text-[var(--color-gray-99)] text-[0.95rem]">
                      تاریخ پایان
                    </label>
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
              <div className="m-0 p-4 rounded-xl bg-[var(--color-surface-300)]">
                <h3 className="m-0 mb-4 text-[var(--color-gray-99)] text-[1.1rem] font-semibold">
                  محل تحویل و تسلیم
                </h3>
                <div className="grid grid-cols-[1fr_50px_1fr] gap-4 items-end max-[600px]:grid-cols-1">
                  <div className="flex flex-col gap-2 mb-4">
                    <label className="font-medium text-[var(--color-gray-99)] text-[0.95rem]">
                      محل تحویل
                    </label>
                    <select
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleLocationChange}
                      className="py-3 px-3 border-none rounded-[10px] bg-[var(--color-surface-300)] text-[var(--color-gray-99)] text-base font-inherit shadow-[inset_0_0_0_1px_rgba(148,163,184,0.28)] focus:outline-none focus:shadow-[inset_0_0_0_1px_var(--color-primary-darkeMod),0_0_0_3px_rgba(33,150,243,0.12)]"
                    >
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    className="py-3 px-3 border-none bg-[var(--color-surface-300)] rounded-[10px] cursor-pointer text-xl transition-all duration-300 text-[var(--color-gray-99)] shadow-[inset_0_0_0_1px_rgba(148,163,184,0.28)] hover:bg-[var(--color-surface-400)] hover:-translate-y-0.5"
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
                  <div className="flex flex-col gap-2 mb-4">
                    <label className="font-medium text-[var(--color-gray-99)] text-[0.95rem]">
                      محل تسلیم
                    </label>
                    <select
                      name="dropoffLocation"
                      value={formData.dropoffLocation}
                      onChange={handleLocationChange}
                      className="py-3 px-3 border-none rounded-[10px] bg-[var(--color-surface-300)] text-[var(--color-gray-99)] text-base font-inherit shadow-[inset_0_0_0_1px_rgba(148,163,184,0.28)] focus:outline-none focus:shadow-[inset_0_0_0_1px_var(--color-primary-darkeMod),0_0_0_3px_rgba(33,150,243,0.12)]"
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
              <div className="m-0 p-4 rounded-xl bg-[var(--color-surface-300)]">
                <h3 className="m-0 mb-4 text-[var(--color-gray-99)] text-[1.1rem] font-semibold">
                  راننده
                </h3>
                <label className="flex items-center gap-3 cursor-pointer text-base text-[var(--color-gray-99)] mb-4">
                  <input
                    type="checkbox"
                    name="withDriver"
                    checked={formData.withDriver}
                    onChange={handleDriverChange}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <span>می‌خواهم راننده اختصاصی داشته باشم</span>
                </label>
                {formData.withDriver && (
                  <div className="flex flex-col gap-2 p-4 bg-[var(--color-surface-300)] rounded-[10px]">
                    <label className="font-medium text-[var(--color-gray-99)]">
                      تعداد روزهایی که راننده را نیاز دارید
                    </label>
                    <input
                      type="number"
                      name="driverDays"
                      min="1"
                      max={calculateRentalDays()}
                      value={formData.driverDays || 1}
                      onChange={handleDriverChange}
                      className="py-3 px-3 border-none rounded-[10px] bg-[var(--color-surface-300)] text-[var(--color-gray-99)] shadow-[inset_0_0_0_1px_rgba(148,163,184,0.28)]"
                    />
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="m-0 p-4 rounded-xl bg-[var(--color-surface-300)]">
                <h3 className="m-0 mb-4 text-[var(--color-gray-99)] text-[1.1rem] font-semibold">
                  خدمات اضافی
                </h3>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 max-[600px]:grid-cols-1">
                  {options.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center gap-2 py-3 px-3 bg-[var(--color-surface-300)] border-none rounded-[10px] cursor-pointer transition-all duration-300 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.28)] hover:bg-[var(--color-surface-400)] hover:-translate-y-0.5"
                    >
                      <input
                        type="checkbox"
                        checked={formData.selectedOptions.includes(option.id)}
                        onChange={() => handleOptionChange(option.id)}
                        className="w-[18px] h-[18px] cursor-pointer"
                      />
                      <span className="text-[var(--color-gray-99)] font-medium">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Summary */}
              {formData.startDate && formData.endDate && (
                <div className="bg-[var(--color-surface-300)] p-6 rounded-xl my-8 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.2)]">
                  <div className="flex justify-between py-3 text-[var(--color-gray-70)]">
                    <span className="font-medium">قیمت روزانه:</span>
                    <span className="text-[var(--color-gray-99)]">
                      {(car.rental.days_3_to_14 || 100000).toLocaleString(
                        "fa-IR",
                      )}{" "}
                      تومان
                    </span>
                  </div>
                  <div className="flex justify-between py-3 text-[var(--color-gray-70)]">
                    <span className="font-medium">تعداد روز:</span>
                    <span className="text-[var(--color-gray-99)]">
                      {calculateRentalDays()} روز
                    </span>
                  </div>
                  {formData.withDriver && (
                    <div className="flex justify-between py-3 text-[var(--color-gray-70)]">
                      <span className="font-medium">هزینه راننده (روزانه):</span>
                      <span className="text-[var(--color-gray-99)]">
                        {(
                          (car.rental.days_3_to_14 || 100000) *
                          0.5 *
                          formData.driverDays
                        ).toLocaleString("fa-IR")}{" "}
                        تومان
                      </span>
                    </div>
                  )}
                  <div className="shadow-[inset_0_1px_0_rgba(148,163,184,0.2),inset_0_-1px_0_rgba(148,163,184,0.2)] py-4 my-2 text-[1.1rem] font-bold flex justify-between">
                    <span>جمع کل:</span>
                    <span className="text-[var(--color-primary-darkeMod)]">
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

            <div className="flex gap-4 justify-center p-6 shadow-[inset_0_1px_0_rgba(148,163,184,0.2)] bg-[var(--color-surface-300)]">
              <button
                className="px-8 py-3 border-none rounded-md text-base font-semibold cursor-pointer transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed bg-[var(--color-surface-400)] text-[var(--color-gray-99)] shadow-[inset_0_0_0_1px_rgba(148,163,184,0.32)] hover:bg-[var(--color-surface-300)] disabled:hover:bg-[var(--color-surface-400)]"
                onClick={() => setShowReservationForm(false)}
                disabled={loading}
              >
                انصراف
              </button>
              <button
                className="px-8 py-3 border-none rounded-md text-base font-semibold cursor-pointer transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed bg-[#4caf50] text-white hover:bg-[#45a049] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(76,175,80,0.3)] disabled:hover:bg-[#4caf50] disabled:hover:translate-y-0 disabled:hover:shadow-none"
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
