"use client";

import type { ReactElement } from "react";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { BreadcrumbNav } from "@/components/breadcrumb-nav/breadcrumb-nav";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useUserProfileStore, UserProfileData } from "@/store/userProfileStore";
import { PrimaryColorPicker } from "@/components/primary-color-picker";

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
    placeholder: "09xxxxxxxxx",
  },
};

export default function DashboardProfilePage(): ReactElement {
  const profile = useUserProfileStore((state) => state.profile);
  const setProfile = useUserProfileStore((state) => state.setProfile);
  const [formData, setFormData] = useState<UserProfileData>(profile);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const completionCount = useMemo(
    () => requiredFields.filter((field) => !!formData[field].trim()).length,
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
      email: formData.email.trim(),
      phone: formData.phone.trim(),
    };
    setProfile(sanitizedProfile);
    toast.success("اطلاعات پروفایل ذخیره شد");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-5 lg:max-w-[860px] lg:px-8 lg:py-8">
      <BreadcrumbNav
        items={[
          { label: "خانه", href: "/" },
          { label: "پنل کاربری", href: "/dashboard" },
          { label: "پروفایل" },
        ]}
        className="mb-4 lg:mb-6"
      />
      <div className="mb-4 lg:mb-5">
        <h1 className="text-xl font-bold text-foreground m-0 lg:text-2xl">
          پروفایل کاربر
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground m-0 lg:mt-2">
          اطلاعات اصلی خود را اینجا ثبت کنید تا در رزرو تکرار نشود.
        </p>
      </div>

      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm lg:p-6">
        <div className="mb-3 flex items-center justify-between text-sm text-foreground">
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
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          onSubmit={handleSubmit}
        >
          {requiredFields.map((field) => (
            <div key={field} className="flex flex-col gap-2 sm:col-span-1">
              <Label htmlFor={field}>{fieldMeta[field].label}</Label>
              <Input
                id={field}
                type={fieldMeta[field].type}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                placeholder={fieldMeta[field].placeholder}
                className="min-h-[44px] rounded-xl"
              />
            </div>
          ))}

          <Button type="submit" className="min-h-[44px] sm:col-span-2">
            ذخیره اطلاعات پروفایل
          </Button>
        </form>
      </section>

      <section className="mt-6 rounded-2xl border border-border bg-card p-4 shadow-sm lg:p-6">
        <h2 className="text-lg font-bold text-foreground mb-1">ظاهر و تم</h2>
        <p className="text-sm text-muted-foreground mb-4">
          رنگ اصلی سایت را انتخاب کنید. تغییر به‌صورت زنده در همه‌ی صفحات اعمال
          می‌شود.
        </p>
        <PrimaryColorPicker />
      </section>
    </div>
  );
}
