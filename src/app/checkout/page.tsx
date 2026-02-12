"use client";

import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import styles from "./page.module.css";

export default function CheckoutPage() {
  const router = useRouter();
  const currentRental = useCartStore((state) => state.currentRental);
  const clearRental = useCartStore((state) => state.clearRental);
  const [loading, setLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (!currentRental) {
      toast.error("هیچ رزرو فعالی وجود ندارد");
      router.push("/");
    }
  }, [currentRental, router]);

  if (!currentRental) {
    return <div className={styles.loading}>درحال بارگذاری...</div>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = async () => {
    // Validation
    if (
      !customerInfo.firstName ||
      !customerInfo.lastName ||
      !customerInfo.email ||
      !customerInfo.phone
    ) {
      toast.error("لطفا تمام اطلاعات را پر کنید");
      return;
    }

    setLoading(true);

    try {
      // TODO: Send to backend for payment processing
      toast.success("درخواست رزرو با موفقیت ثبت شد!");
      clearRental();
      router.push("/dashboard");
    } catch (error) {
      toast.error("خطا در پردازش رزرو");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.checkoutPage}>
      <h1>تأیید و پرداخت رزرو</h1>

      <div className={styles.container}>
        {/* Summary */}
        <div className={styles.section}>
          <h2>خلاصه رزرو</h2>
          <div className={styles.summary}>
            <div className={styles.carInfo}>
              <img
                src={currentRental.car.img}
                alt={currentRental.car.model}
                className={styles.carImage}
              />
              <div>
                <h3>{currentRental.car.model}</h3>
                <p>{currentRental.car.name}</p>
              </div>
            </div>

            <div className={styles.rentalDetails}>
              <div className={styles.detailRow}>
                <span>تاریخ شروع:</span>
                <strong>
                  {new Date(currentRental.startDate).toLocaleDateString(
                    "fa-IR",
                  )}
                </strong>
              </div>
              <div className={styles.detailRow}>
                <span>تاریخ پایان:</span>
                <strong>
                  {new Date(currentRental.endDate).toLocaleDateString("fa-IR")}
                </strong>
              </div>
              <div className={styles.detailRow}>
                <span>تعداد روز:</span>
                <strong>{currentRental.rentalDays} روز</strong>
              </div>
              <div className={styles.detailRow}>
                <span>محل تحویل:</span>
                <strong>{currentRental.pickupLocation}</strong>
              </div>
              <div className={styles.detailRow}>
                <span>محل تسلیم:</span>
                <strong>{currentRental.dropoffLocation}</strong>
              </div>
              {currentRental.withDriver && (
                <div className={styles.detailRow}>
                  <span>راننده:</span>
                  <strong>بلی ({currentRental.driverDays} روز)</strong>
                </div>
              )}
              {currentRental.selectedOptions.length > 0 && (
                <div className={styles.detailRow}>
                  <span>خدمات اضافی:</span>
                  <strong>{currentRental.selectedOptions.join("، ")}</strong>
                </div>
              )}
            </div>

            {/* Pricing */}
            <div className={styles.pricing}>
              <div className={styles.pricingRow}>
                <span>قیمت روزانه:</span>
                <span>
                  {currentRental.pricePerDay.toLocaleString("fa-IR")} تومان
                </span>
              </div>
              <div className={styles.pricingRow}>
                <span>قیمت برای {currentRental.rentalDays} روز:</span>
                <span>
                  {(
                    currentRental.pricePerDay * currentRental.rentalDays
                  ).toLocaleString("fa-IR")}{" "}
                  تومان
                </span>
              </div>
              {currentRental.withDriver && (
                <div className={styles.pricingRow}>
                  <span>هزینه راننده:</span>
                  <span>
                    {(
                      currentRental.pricePerDay *
                      0.5 *
                      (currentRental.driverDays || 1)
                    ).toLocaleString("fa-IR")}{" "}
                    تومان
                  </span>
                </div>
              )}
              <div className={`${styles.pricingRow} ${styles.total}`}>
                <span>جمع کل:</span>
                <span>
                  {currentRental.totalPrice.toLocaleString("fa-IR")} تومان
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className={styles.section}>
          <h2>اطلاعات مشتری</h2>
          <form className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>نام</label>
                <input
                  type="text"
                  name="firstName"
                  value={customerInfo.firstName}
                  onChange={handleInputChange}
                  placeholder="نام شما"
                />
              </div>
              <div className={styles.formGroup}>
                <label>نام خانوادگی</label>
                <input
                  type="text"
                  name="lastName"
                  value={customerInfo.lastName}
                  onChange={handleInputChange}
                  placeholder="نام خانوادگی شما"
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>ایمیل</label>
                <input
                  type="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  placeholder="ایمیل شما"
                />
              </div>
              <div className={styles.formGroup}>
                <label>شماره تلفن</label>
                <input
                  type="tel"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  placeholder="شماره تلفن شما"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            className={styles.backBtn}
            onClick={() => router.back()}
            disabled={loading}
          >
            بازگشت
          </button>
          <button
            className={styles.checkoutBtn}
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? "درحال پردازش..." : "تأیید و ادامه برای پرداخت"}
          </button>
        </div>
      </div>
    </div>
  );
}
