"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateObject } from "react-multi-date-picker";
import { CarsModel } from "@/models/cars.model";
import { useCartStore, RentalItem } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
    { id: "gps", label: "جی‌پی‌اس" },
    { id: "child-seat", label: "صندلی کودک" },
    { id: "wifi", label: "وای فای" },
    { id: "insurance", label: "بیمه توسعه‌یافته" },
    { id: "fuel-full", label: "تانک پر بنزین" },
    { id: "parking", label: "پارکینگ رایگان" },
  ];

  return (
    <>
      <Button
        className="w-full py-4 text-base font-bold rounded-xl shadow-md hover:shadow-lg transition-shadow"
        onClick={() => setShowReservationForm(true)}
      >
        رزرو کنید
      </Button>

      {showReservationForm && (
        <div className="fixed inset-0 bg-[rgba(7,10,18,0.52)] backdrop-blur-sm flex items-center justify-center z-[1000] rtl">
          <div className="bg-card rounded-2xl max-w-[600px] w-[90%] max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-border/20">
              <h2 className="m-0 text-foreground text-[1.3rem]">
                رزرو {car.model}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                className="text-2xl"
                onClick={() => setShowReservationForm(false)}
              >
                ✕
              </Button>
            </div>

            <div className="p-6 grid gap-4">
              {/* Dates */}
              <div className="m-0 p-4 rounded-xl bg-muted">
                <h3 className="m-0 mb-4 text-foreground text-[1.1rem] font-semibold">
                  تاریخ‌های رزرو
                </h3>
                <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
                  <div className="flex flex-col gap-2 mb-4">
                    <label className="font-medium text-foreground text-[0.95rem]">
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
                    <label className="font-medium text-foreground text-[0.95rem]">
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
              <div className="m-0 p-4 rounded-xl bg-muted">
                <h3 className="m-0 mb-4 text-foreground text-[1.1rem] font-semibold">
                  محل تحویل و تسلیم
                </h3>
                <div className="grid grid-cols-[1fr_50px_1fr] gap-4 items-end max-[600px]:grid-cols-1">
                  <div className="flex flex-col gap-2 mb-4">
                    <Label>محل تحویل</Label>
                    <Select
                      value={formData.pickupLocation}
                      onValueChange={(v) =>
                        setFormData((prev) => ({ ...prev, pickupLocation: v }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((loc) => (
                          <SelectItem key={loc} value={loc}>
                            {loc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="self-end"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        pickupLocation: prev.dropoffLocation,
                        dropoffLocation: prev.pickupLocation,
                      }));
                    }}
                  >
                    ⇄
                  </Button>
                  <div className="flex flex-col gap-2 mb-4">
                    <Label>محل تسلیم</Label>
                    <Select
                      value={formData.dropoffLocation}
                      onValueChange={(v) =>
                        setFormData((prev) => ({ ...prev, dropoffLocation: v }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((loc) => (
                          <SelectItem key={loc} value={loc}>
                            {loc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Driver */}
              <div className="m-0 p-4 rounded-xl bg-muted">
                <h3 className="m-0 mb-4 text-foreground text-[1.1rem] font-semibold">
                  راننده
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <Checkbox
                    id="withDriver"
                    name="withDriver"
                    checked={formData.withDriver}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        withDriver: !!checked,
                      }))
                    }
                  />
                  <Label htmlFor="withDriver" className="cursor-pointer">
                    می‌خواهم راننده اختصاصی داشته باشم
                  </Label>
                </div>
                {formData.withDriver && (
                  <div className="flex flex-col gap-2 p-4 bg-muted rounded-[10px]">
                    <Label htmlFor="driverDays">
                      تعداد روزهایی که راننده را نیاز دارید
                    </Label>
                    <Input
                      id="driverDays"
                      type="number"
                      min={1}
                      max={calculateRentalDays()}
                      value={formData.driverDays || 1}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          driverDays: parseInt(e.target.value) || 0,
                        }))
                      }
                    />
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="m-0 p-4 rounded-xl bg-muted">
                <h3 className="m-0 mb-4 text-foreground text-[1.1rem] font-semibold">
                  خدمات اضافی
                </h3>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 max-[600px]:grid-cols-1">
                  {options.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center gap-2 py-3 px-3 bg-muted rounded-[10px] cursor-pointer transition-all duration-300 border border-border/30 hover:bg-card"
                      onClick={() => handleOptionChange(option.id)}
                    >
                      <Checkbox
                        id={option.id}
                        checked={formData.selectedOptions.includes(option.id)}
                        onCheckedChange={() => handleOptionChange(option.id)}
                      />
                      <Label
                        htmlFor={option.id}
                        className="cursor-pointer font-medium"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              {formData.startDate && formData.endDate && (
                <div className="bg-muted p-6 rounded-xl my-8 border border-border/20">
                  <div className="flex justify-between py-3 text-muted-foreground">
                    <span className="font-medium">قیمت روزانه:</span>
                    <span className="text-foreground">
                      {(car.rental.days_3_to_14 || 100000).toLocaleString(
                        "fa-IR",
                      )}{" "}
                      تومان
                    </span>
                  </div>
                  <div className="flex justify-between py-3 text-muted-foreground">
                    <span className="font-medium">تعداد روز:</span>
                    <span className="text-foreground">
                      {calculateRentalDays()} روز
                    </span>
                  </div>
                  {formData.withDriver && (
                    <div className="flex justify-between py-3 text-muted-foreground">
                      <span className="font-medium">
                        هزینه راننده (روزانه):
                      </span>
                      <span className="text-foreground">
                        {(
                          (car.rental.days_3_to_14 || 100000) *
                          0.5 *
                          formData.driverDays
                        ).toLocaleString("fa-IR")}{" "}
                        تومان
                      </span>
                    </div>
                  )}
                  <div className="border-y border-border/20 py-4 my-2 text-[1.1rem] font-bold flex justify-between">
                    <span>جمع کل:</span>
                    <span className="text-primary">
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

            <div className="flex gap-4 justify-center p-6 border-t border-border/20 bg-muted">
              <Button
                variant="outline"
                onClick={() => setShowReservationForm(false)}
                disabled={loading}
              >
                انصراف
              </Button>
              <Button
                className="bg-success text-success-foreground hover:bg-success/90"
                onClick={handleReserve}
                disabled={loading}
              >
                {loading ? "در حال پردازش..." : "تأیید و ادامه"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
