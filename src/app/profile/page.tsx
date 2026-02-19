"use client";

import type { ReactElement } from "react";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BreadcrumbNav } from "@/components/breadcrumb-nav/breadcrumb-nav";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useUserProfileStore, UserProfileData } from "@/store/userProfileStore";
import BirthDatePicker from "@/components/calendar/BirthDatePicker-component";

const requiredFields: Array<keyof UserProfileData> = [
  "firstName",
  "lastName",
  "username",
  "email",
  "phone",
];

const fieldMeta: Record<
  keyof UserProfileData,
  {
    label: string;
    type: "text" | "email" | "tel" | "date";
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
  username: {
    label: "نام کاربری",
    type: "text",
    placeholder: "username",
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
  nationalId: {
    label: "کد ملی",
    type: "text",
    placeholder: "۱۰ رقم کد ملی",
  },
  address: {
    label: "آدرس",
    type: "text",
    placeholder: "استان، شهر، خیابان، پلاک",
  },
  birthDate: {
    label: "تاریخ تولد",
    type: "date",
    placeholder: "",
  },
};

export default function ProfilePage(): ReactElement {
  const profile = useUserProfileStore((state) => state.profile);
  const setProfile = useUserProfileStore((state) => state.setProfile);
  const [formData, setFormData] = useState<UserProfileData>(profile);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const completionCount = useMemo(
    () =>
      requiredFields.filter((field) => !!String(formData[field] ?? "").trim())
        .length,
    [formData],
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sanitizedProfile: UserProfileData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      username: formData.username.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      nationalId: formData.nationalId.trim(),
      address: formData.address.trim(),
      birthDate: formData.birthDate.trim(),
    };
    setProfile(sanitizedProfile);
    toast.success("اطلاعات پروفایل ذخیره شد");
  };

  return (
    <main className="rtl mx-auto min-h-screen max-w-[860px] p-[clamp(1.2rem,2vw,2rem)]">
      <BreadcrumbNav
        items={[{ label: "خانه", href: "/" }, { label: "پروفایل" }]}
        className="mb-4"
      />
      <div className="mb-5">
        <h1 className="m-0 text-[clamp(1.6rem,2vw,2rem)] text-foreground">
          پروفایل کاربر
        </h1>
        <p className="m-0 mt-[0.7rem] text-muted-foreground">
          اطلاعات خود را کامل کنید. برای ذخیره در سرور به{" "}
          <Link href="/dashboard/profile" className="underline">
            پنل کاربری → پروفایل
          </Link>{" "}
          بروید.
        </p>
      </div>

      <section className="rounded-2xl bg-card p-[clamp(1rem,2vw,1.5rem)] shadow-lg">
        <div className="mb-[0.65rem] flex items-center justify-between text-[0.95rem] text-foreground">
          <span>تکمیل اطلاعات</span>
          <strong>
            {completionCount} از {requiredFields.length}
          </strong>
        </div>
        <Progress
          value={(completionCount / requiredFields.length) * 100}
          className="mb-5 h-2"
        />

        <form
          className="grid grid-cols-2 gap-[0.95rem] max-[720px]:grid-cols-1"
          onSubmit={handleSubmit}
        >
          {(Object.keys(fieldMeta) as Array<keyof UserProfileData>).map(
            (field) => {
              if (field === "birthDate") {
                return (
                  <div key={field} className="flex flex-col gap-2">
                    <BirthDatePicker
                      id={field}
                      label={fieldMeta[field].label}
                      value={formData.birthDate}
                      onChange={(v) =>
                        setFormData((prev) => ({ ...prev, birthDate: v }))
                      }
                      placeholder="تاریخ تولد را انتخاب کنید"
                    />
                  </div>
                );
              }
              return (
                <div
                  key={field}
                  className={field === "address" ? "col-span-2" : ""}
                >
                  <div className="flex flex-col gap-2">
                    <Label htmlFor={field}>
                      {fieldMeta[field].label}
                      {requiredFields.includes(field) && (
                        <span className="text-destructive">*</span>
                      )}
                    </Label>
                    <Input
                      id={field}
                      type={fieldMeta[field].type}
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      placeholder={fieldMeta[field].placeholder}
                    />
                  </div>
                </div>
              );
            },
          )}

          <Button
            type="submit"
            className="col-span-2 mt-2 max-[720px]:col-span-1"
          >
            ذخیره در مرورگر
          </Button>
        </form>
      </section>
    </main>
  );
}
