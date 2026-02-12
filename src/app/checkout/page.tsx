"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useUserProfileStore, UserProfileData } from "@/store/userProfileStore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { toPersianOptionLabel } from "@/utils/rentalOptions";
import styles from "./page.module.css";

const requiredFields: Array<keyof UserProfileData> = [
  "firstName",
  "lastName",
  "email",
  "phone",
];

const fieldMeta: Record<
  keyof UserProfileData,
  {
    label: string;
    type: "text" | "email" | "tel";
    placeholder: string;
  }
> = {
  firstName: {
    label: "نام",
    type: "text",
    placeholder: "نام خود را وارد کنید",
  },
  lastName: {
    label: "نام خانوادگی",
    type: "text",
    placeholder: "نام خانوادگی خود را وارد کنید",
  },
  email: {
    label: "ایمیل",
    type: "email",
    placeholder: "example@mail.com",
  },
  phone: {
    label: "شماره تماس",
    type: "tel",
    placeholder: "09xxxxxxxxx",
  },
};

const isFieldEmpty = (value: string) => !value.trim();

export default function CheckoutPage() {
  const router = useRouter();
  const currentRental = useCartStore((state) => state.currentRental);
  const clearRental = useCartStore((state) => state.clearRental);
  const profile = useUserProfileStore((state) => state.profile);
  const updateProfile = useUserProfileStore((state) => state.updateProfile);

  const [loading, setLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<UserProfileData>(profile);

  useEffect(() => {
    setCustomerInfo(profile);
  }, [profile]);

  useEffect(() => {
    if (!currentRental) {
      toast.error("هیچ رزرو فعالی وجود ندارد");
      router.push("/");
    }
  }, [currentRental, router]);

  const missingFields = useMemo(
    () => requiredFields.filter((field) => isFieldEmpty(profile[field])),
    [profile],
  );

  const needsCustomerInfo = missingFields.length > 0;

  if (!currentRental) {
    return <div className={styles.loading}>در حال بارگذاری...</div>;
  }

  const rentalBasePrice = currentRental.pricePerDay * currentRental.rentalDays;
  const driverCost = currentRental.withDriver
    ? currentRental.pricePerDay * 0.5 * (currentRental.driverDays || 1)
    : 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = async () => {
    const normalizedInfo: UserProfileData = {
      firstName: customerInfo.firstName.trim(),
      lastName: customerInfo.lastName.trim(),
      email: customerInfo.email.trim(),
      phone: customerInfo.phone.trim(),
    };

    const hasMissingInfo = requiredFields.some((field) =>
      isFieldEmpty(normalizedInfo[field]),
    );

    if (hasMissingInfo) {
      toast.error("لطفا اطلاعات ناقص مشتری را تکمیل کنید");
      return;
    }

    if (requiredFields.some((field) => normalizedInfo[field] !== profile[field])) {
      updateProfile(normalizedInfo);
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
      <div className={styles.pageHeader}>
        <h1>تایید و پرداخت رزرو</h1>
        <p>مشخصات رزرو را بررسی کنید و پرداخت را نهایی کنید.</p>
      </div>

      <div className={styles.layout}>
        <div className={styles.mainColumn}>
          <section className={styles.section}>
            <h2>خلاصه رزرو</h2>

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
                <span>تاریخ شروع</span>
                <strong>
                  {new Date(currentRental.startDate).toLocaleDateString("fa-IR")}
                </strong>
              </div>
              <div className={styles.detailRow}>
                <span>تاریخ پایان</span>
                <strong>
                  {new Date(currentRental.endDate).toLocaleDateString("fa-IR")}
                </strong>
              </div>
              <div className={styles.detailRow}>
                <span>مدت اجاره</span>
                <strong>{currentRental.rentalDays} روز</strong>
              </div>
              <div className={styles.detailRow}>
                <span>محل تحویل</span>
                <strong>{currentRental.pickupLocation}</strong>
              </div>
              <div className={styles.detailRow}>
                <span>محل تسلیم</span>
                <strong>{currentRental.dropoffLocation}</strong>
              </div>
              {currentRental.withDriver && (
                <div className={styles.detailRow}>
                  <span>راننده</span>
                  <strong>بله ({currentRental.driverDays} روز)</strong>
                </div>
              )}
            </div>

            {currentRental.selectedOptions.length > 0 && (
              <div className={styles.optionsBlock}>
                <span className={styles.optionsLabel}>خدمات اضافی:</span>
                <div className={styles.optionChips}>
                  {currentRental.selectedOptions.map((option) => (
                    <span key={option} className={styles.optionChip}>
                      {toPersianOptionLabel(option)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>اطلاعات مشتری</h2>
              <Link href="/profile" className={styles.profileLink}>
                ویرایش در پروفایل
              </Link>
            </div>

            {needsCustomerInfo ? (
              <>
                <p className={styles.infoHint}>
                  اطلاعات مشتری از پروفایل خوانده می‌شود. لطفا فقط موارد ناقص را تکمیل
                  کنید.
                </p>
                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                  {missingFields.map((field) => (
                    <div key={field} className={styles.formGroup}>
                      <label htmlFor={field}>{fieldMeta[field].label}</label>
                      <input
                        id={field}
                        type={fieldMeta[field].type}
                        name={field}
                        value={customerInfo[field]}
                        onChange={handleInputChange}
                        placeholder={fieldMeta[field].placeholder}
                      />
                    </div>
                  ))}
                </form>
              </>
            ) : (
              <div className={styles.profileSummary}>
                <p>تمام اطلاعات مشتری از پروفایل تکمیل شده است.</p>
                <div className={styles.profileGrid}>
                  <span>
                    {customerInfo.firstName} {customerInfo.lastName}
                  </span>
                  <span>{customerInfo.phone}</span>
                  <span>{customerInfo.email}</span>
                </div>
              </div>
            )}
          </section>
        </div>

        <aside className={styles.invoiceCard}>
          <h2>صورتحساب</h2>

          <div className={styles.pricingRow}>
            <span>قیمت روزانه</span>
            <strong>{currentRental.pricePerDay.toLocaleString("fa-IR")} تومان</strong>
          </div>

          <div className={styles.pricingRow}>
            <span>اجاره {currentRental.rentalDays} روز</span>
            <strong>{rentalBasePrice.toLocaleString("fa-IR")} تومان</strong>
          </div>

          {currentRental.withDriver && (
            <div className={styles.pricingRow}>
              <span>هزینه راننده</span>
              <strong>{driverCost.toLocaleString("fa-IR")} تومان</strong>
            </div>
          )}

          <div className={`${styles.pricingRow} ${styles.totalRow}`}>
            <span>جمع کل</span>
            <strong>{currentRental.totalPrice.toLocaleString("fa-IR")} تومان</strong>
          </div>

          <div className={styles.actionStack}>
            <button
              className={styles.checkoutBtn}
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "در حال پردازش..." : "تایید و ادامه برای پرداخت"}
            </button>
            <button
              className={styles.backBtn}
              onClick={() => router.back()}
              disabled={loading}
            >
              بازگشت
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
