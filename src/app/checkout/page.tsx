"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  MapPin,
  User,
  ChevronLeft,
  CheckCircle2,
} from "lucide-react";
import { BreadcrumbNav } from "@/components/breadcrumb-nav/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/store/cartStore";
import { useUserProfileStore, UserProfileData } from "@/store/userProfileStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { toPersianOptionLabel } from "@/utils/rentalOptions";
import Loading from "@/app/loading";
import Spinner from "@/components/Spinner/Spinner";

const requiredFields: Array<keyof UserProfileData> = [
  "firstName",
  "lastName",
  "email",
  "phone",
];

const fieldMeta: Record<
  keyof UserProfileData,
  { label: string; type: "text" | "email" | "tel"; placeholder: string }
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
    placeholder: "۰۹۱۲۳۴۵۶۷۸۹",
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

  const allFieldsFilled = useMemo(
    () =>
      requiredFields.every((field) => !isFieldEmpty(customerInfo[field])),
    [customerInfo],
  );

  if (!currentRental) {
    return <Loading />;
  }

  const rentalBasePrice = currentRental.pricePerDay * currentRental.rentalDays;
  const driverCost = currentRental.withDriver
    ? currentRental.pricePerDay * 0.5 * (currentRental.driverDays || 1)
    : 0;

  const carImageUrl =
    currentRental.car.img.startsWith("http")
      ? currentRental.car.img
      : `https://cafeerent.com/storage/www/cars/single/${currentRental.car.img}`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
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
      toast.error("لطفاً تمام فیلدهای اطلاعات تماس را تکمیل کنید");
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
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <BreadcrumbNav
          items={[
            { label: "خانه", href: "/" },
            { label: "تسویه حساب" },
          ]}
          className="mb-6"
        />

        <header className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground m-0">
            تأیید و پرداخت
          </h1>
          <p className="text-muted-foreground mt-1 m-0">
            مشخصات رزرو را بررسی کنید و با تکمیل اطلاعات، پرداخت را نهایی کنید.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 xl:gap-8 items-start">
          {/* ستون اصلی: خلاصه رزرو + اطلاعات تماس */}
          <div className="flex flex-col gap-6 min-w-0">
            {/* کارت خلاصه رزرو */}
            <section
              className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden"
              aria-labelledby="rental-summary-heading"
            >
              <div className="p-4 sm:p-5 border-b border-border/50 bg-muted/30">
                <h2
                  id="rental-summary-heading"
                  className="text-lg font-bold text-foreground m-0"
                >
                  خلاصه رزرو
                </h2>
              </div>

              <div className="p-4 sm:p-5">
                <div className="flex gap-4 sm:gap-5">
                  <div className="relative w-28 h-20 sm:w-36 sm:h-24 rounded-xl overflow-hidden bg-muted shrink-0">
                    <Image
                      src={carImageUrl}
                      alt={currentRental.car.name}
                      fill
                      className="object-cover"
                      sizes="144px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-foreground text-lg m-0">
                      {currentRental.car.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-0.5 m-0">
                      {currentRental.car.model}
                    </p>
                    <p className="text-primary font-semibold text-sm mt-2 m-0">
                      {currentRental.pricePerDay.toLocaleString("fa-IR")} تومان
                      / روز
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 rounded-xl bg-muted/50 px-4 py-3">
                    <CalendarDays className="size-5 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground m-0">
                        تاریخ تحویل
                      </p>
                      <p className="font-semibold text-foreground text-sm m-0">
                        {new Date(
                          currentRental.startDate,
                        ).toLocaleDateString("fa-IR")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-muted/50 px-4 py-3">
                    <CalendarDays className="size-5 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground m-0">
                        تاریخ بازگشت
                      </p>
                      <p className="font-semibold text-foreground text-sm m-0">
                        {new Date(
                          currentRental.endDate,
                        ).toLocaleDateString("fa-IR")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-muted/50 px-4 py-3">
                    <MapPin className="size-5 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground m-0">
                        محل تحویل و تسلیم
                      </p>
                      <p className="font-semibold text-foreground text-sm m-0">
                        {currentRental.pickupLocation}
                        {currentRental.pickupLocation !==
                        currentRental.dropoffLocation
                          ? ` → ${currentRental.dropoffLocation}`
                          : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-muted/50 px-4 py-3">
                    <span className="size-5 shrink-0 flex items-center justify-center text-primary font-bold text-sm">
                      {currentRental.rentalDays}
                    </span>
                    <div>
                      <p className="text-xs text-muted-foreground m-0">
                        مدت اجاره
                      </p>
                      <p className="font-semibold text-foreground text-sm m-0">
                        {currentRental.rentalDays} روز
                      </p>
                    </div>
                  </div>
                </div>

                {currentRental.withDriver && (
                  <div className="mt-3 rounded-xl bg-primary/10 border border-primary/20 px-4 py-3 flex items-center gap-2">
                    <CheckCircle2 className="size-5 text-primary shrink-0" />
                    <span className="text-sm font-medium text-foreground">
                      راننده اختصاصی — {currentRental.driverDays} روز
                    </span>
                  </div>
                )}

                {currentRental.selectedOptions.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {currentRental.selectedOptions.map((option) => (
                      <span
                        key={option}
                        className="inline-flex items-center rounded-lg px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium"
                      >
                        {toPersianOptionLabel(option)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* اطلاعات تماس */}
            <section
              className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden"
              aria-labelledby="customer-info-heading"
            >
              <div className="p-4 sm:p-5 border-b border-border/50 bg-muted/30 flex flex-wrap items-center justify-between gap-3">
                <h2
                  id="customer-info-heading"
                  className="text-lg font-bold text-foreground m-0 flex items-center gap-2"
                >
                  <User className="size-5 text-primary" />
                  اطلاعات تماس
                </h2>
                <Link
                  href="/profile"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  ویرایش در پروفایل
                </Link>
              </div>

              <div className="p-4 sm:p-5">
                {allFieldsFilled && missingFields.length === 0 && (
                  <div className="mb-4 rounded-xl bg-success/10 border border-success/20 px-4 py-3 flex items-center gap-2">
                    <CheckCircle2 className="size-5 text-success shrink-0" />
                    <span className="text-sm text-foreground">
                      اطلاعات از پروفایل بارگذاری شده است.
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {requiredFields.map((field) => (
                    <div key={field} className="flex flex-col gap-2">
                      <Label htmlFor={field}>
                        {fieldMeta[field].label}
                      </Label>
                      <Input
                        id={field}
                        type={fieldMeta[field].type}
                        name={field}
                        value={customerInfo[field]}
                        onChange={handleInputChange}
                        placeholder={fieldMeta[field].placeholder}
                        className="rounded-xl h-11"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* سایدبار: صورتحساب + دکمه پرداخت */}
          <aside className="lg:sticky lg:top-24 flex flex-col gap-4">
            <div className="rounded-2xl border-2 border-border/60 bg-card shadow-sm overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-border/50">
                <h2 className="text-lg font-bold text-foreground m-0">
                  صورتحساب
                </h2>
              </div>

              <div className="p-4 sm:p-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    قیمت روزانه × {currentRental.rentalDays} روز
                  </span>
                  <span className="font-medium text-foreground">
                    {rentalBasePrice.toLocaleString("fa-IR")} تومان
                  </span>
                </div>
                {currentRental.withDriver && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      هزینه راننده
                    </span>
                    <span className="font-medium text-foreground">
                      {driverCost.toLocaleString("fa-IR")} تومان
                    </span>
                  </div>
                )}
              </div>

              <div className="px-4 sm:px-5 py-4 bg-primary/10 border-t border-primary/20">
                <div className="flex justify-between items-center gap-3">
                  <span className="font-bold text-foreground">جمع کل</span>
                  <span className="font-bold text-primary text-lg tabular-nums">
                    {currentRental.totalPrice.toLocaleString("fa-IR")} تومان
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-5 flex flex-col gap-3">
                <Button
                  size="lg"
                  className="w-full h-12 rounded-xl font-semibold text-base"
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner size={20} className="shrink-0" />
                      در حال پردازش...
                    </>
                  ) : (
                    "تأیید و پرداخت"
                  )}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full rounded-xl"
                  onClick={() => router.back()}
                  disabled={loading}
                >
                  <ChevronLeft className="size-4 ml-1" />
                  بازگشت
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
