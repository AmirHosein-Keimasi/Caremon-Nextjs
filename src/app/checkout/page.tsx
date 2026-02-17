"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/store/cartStore";
import { useUserProfileStore, UserProfileData } from "@/store/userProfileStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { toPersianOptionLabel } from "@/utils/rentalOptions";

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
    placeholder: "مثال@example.com",
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
    return <div className="flex items-center justify-center min-h-screen text-foreground text-lg">در حال بارگذاری...</div>;
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

    if (
      requiredFields.some((field) => normalizedInfo[field] !== profile[field])
    ) {
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
    <div className="rtl max-w-[1200px] mx-auto p-[clamp(1rem,2vw,2rem)] min-h-screen bg-background">
      <div className="mb-5">
        <h1 className="text-foreground m-0 text-[clamp(1.7rem,2.4vw,2.2rem)]">تایید و پرداخت رزرو</h1>
        <p className="m-2.5 mt-0 text-muted-foreground text-sm">مشخصات رزرو را بررسی کنید و پرداخت را نهایی کنید.</p>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_340px] gap-5 items-start max-[1024px]:grid-cols-1">
        <div className="flex flex-col gap-4">
          <section className="bg-card rounded-2xl p-[clamp(0.95rem,1.6vw,1.3rem)] shadow-lg">
            <h2 className="m-0 mb-4 text-foreground text-lg">خلاصه رزرو</h2>

            <div className="flex gap-4 p-3 bg-muted rounded-xl mb-4">
              <Image
                src={
                  currentRental.car.img.startsWith("http")
                    ? currentRental.car.img
                    : `https://cafeerent.com/storage/www/cars/single/${currentRental.car.img}`
                }
                alt={currentRental.car.model}
                width={116}
                height={88}
                className="w-[116px] h-[88px] object-cover rounded-[10px] flex-shrink-0"
              />
              <div>
                <h3 className="m-0 text-foreground text-base">{currentRental.car.model}</h3>
                <p className="m-1.5 mt-0 text-muted-foreground text-sm">{currentRental.car.name}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 max-[700px]:grid-cols-1">
              <div className="flex items-center justify-between gap-3 rounded-[10px] bg-[rgba(130,138,156,0.12)] px-3 py-2.5">
                <span className="text-muted-foreground text-sm">تاریخ شروع</span>
                <strong className="text-foreground text-sm">
                  {new Date(currentRental.startDate).toLocaleDateString(
                    "fa-IR",
                  )}
                </strong>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-[10px] bg-[rgba(130,138,156,0.12)] px-3 py-2.5">
                <span className="text-muted-foreground text-sm">تاریخ پایان</span>
                <strong className="text-foreground text-sm">
                  {new Date(currentRental.endDate).toLocaleDateString("fa-IR")}
                </strong>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-[10px] bg-[rgba(130,138,156,0.12)] px-3 py-2.5">
                <span className="text-muted-foreground text-sm">مدت اجاره</span>
                <strong className="text-foreground text-sm">{currentRental.rentalDays} روز</strong>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-[10px] bg-[rgba(130,138,156,0.12)] px-3 py-2.5">
                <span className="text-muted-foreground text-sm">محل تحویل</span>
                <strong className="text-foreground text-sm">{currentRental.pickupLocation}</strong>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-[10px] bg-[rgba(130,138,156,0.12)] px-3 py-2.5">
                <span className="text-muted-foreground text-sm">محل تسلیم</span>
                <strong className="text-foreground text-sm">{currentRental.dropoffLocation}</strong>
              </div>
              {currentRental.withDriver && (
                <div className="flex items-center justify-between gap-3 rounded-[10px] bg-[rgba(130,138,156,0.12)] px-3 py-2.5">
                  <span className="text-muted-foreground text-sm">راننده</span>
                  <strong className="text-foreground text-sm">بله ({currentRental.driverDays} روز)</strong>
                </div>
              )}
            </div>

            {currentRental.selectedOptions.length > 0 && (
              <div className="mt-4 flex flex-col gap-2">
                <span className="text-muted-foreground text-sm">خدمات اضافی:</span>
                <div className="flex flex-wrap gap-2">
                  {currentRental.selectedOptions.map((option) => (
                    <span key={option} className="inline-flex items-center rounded-full px-3 py-1 bg-[rgba(31,122,77,0.15)] text-[#205f42] text-sm font-semibold">
                      {toPersianOptionLabel(option)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section className="bg-card rounded-2xl p-[clamp(0.95rem,1.6vw,1.3rem)] shadow-lg">
            <div className="flex justify-between items-center gap-3 mb-4">
              <h2 className="m-0 text-foreground text-lg">اطلاعات مشتری</h2>
              <Link href="/profile" className="text-[#1f7a4d] no-underline text-sm font-semibold hover:underline">
                ویرایش در پروفایل
              </Link>
            </div>

            {needsCustomerInfo ? (
              <>
                <p className="m-0 mb-4 text-muted-foreground text-sm leading-relaxed">
                  اطلاعات مشتری از پروفایل خوانده می‌شود. لطفا فقط موارد ناقص را
                  تکمیل کنید.
                </p>
                <form
                  className="grid grid-cols-2 gap-3 max-[700px]:grid-cols-1"
                  onSubmit={(e) => e.preventDefault()}
                >
                  {missingFields.map((field) => (
                    <div key={field} className="flex flex-col gap-2">
                      <Label htmlFor={field}>{fieldMeta[field].label}</Label>
                      <Input
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
              <div className="rounded-xl bg-[rgba(31,122,77,0.12)] p-4">
                <p className="m-0 text-[#205f42] text-sm">تمام اطلاعات مشتری از پروفایل تکمیل شده است.</p>
                <div className="mt-3 grid grid-cols-1 gap-2 text-foreground text-sm">
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

        <aside className="sticky top-5 bg-card rounded-2xl p-4 shadow-lg max-[1024px]:static">
          <h2 className="m-0 mb-4 text-foreground text-base">صورتحساب</h2>

          <div className="flex items-center justify-between gap-3 py-2.5 text-muted-foreground text-sm">
            <span>قیمت روزانه</span>
            <strong className="text-foreground text-sm">
              {currentRental.pricePerDay.toLocaleString("fa-IR")} تومان
            </strong>
          </div>

          <div className="flex items-center justify-between gap-3 py-2.5 text-muted-foreground text-sm">
            <span>اجاره {currentRental.rentalDays} روز</span>
            <strong className="text-foreground text-sm">{rentalBasePrice.toLocaleString("fa-IR")} تومان</strong>
          </div>

          {currentRental.withDriver && (
            <div className="flex items-center justify-between gap-3 py-2.5 text-muted-foreground text-sm">
              <span>هزینه راننده</span>
              <strong className="text-foreground text-sm">{driverCost.toLocaleString("fa-IR")} تومان</strong>
            </div>
          )}

          <div className="mt-1 px-3 py-3 rounded-[10px] bg-[rgba(31,122,77,0.14)]">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[#205f42] font-bold">جمع کل</span>
              <strong className="text-[#205f42] font-bold">
                {currentRental.totalPrice.toLocaleString("fa-IR")} تومان
              </strong>
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-2">
            <Button
              className="bg-[#1f7a4d] hover:bg-[#19623f]"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2Icon className="size-4 animate-spin" />
                  در حال پردازش...
                </>
              ) : (
                "تایید و ادامه برای پرداخت"
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => router.back()}
              disabled={loading}
            >
              بازگشت
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
