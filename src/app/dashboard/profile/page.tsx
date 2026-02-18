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
    <div className="p-6 lg:p-8 max-w-[860px] mx-auto">
      <BreadcrumbNav
        items={[
          { label: "خانه", href: "/" },
          { label: "پنل کاربری", href: "/dashboard" },
          { label: "پروفایل" },
        ]}
        className="mb-4"
      />
      <div className="mb-5">
        <h1 className="m-0 text-foreground text-xl lg:text-2xl font-bold">
          پروفایل کاربر
        </h1>
        <p className="mt-2 mb-0 text-muted-foreground text-sm">
          اطلاعات اصلی خود را اینجا ثبت کنید تا در رزرو تکرار نشود.
        </p>
      </div>

      <section className="bg-card rounded-2xl p-4 lg:p-6 shadow-lg border border-border">
        <div className="flex items-center justify-between text-foreground mb-3 text-sm">
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
          className="grid grid-cols-2 gap-4 max-[720px]:grid-cols-1"
          onSubmit={handleSubmit}
        >
          {requiredFields.map((field) => (
            <div key={field} className="flex flex-col gap-2">
              <Label htmlFor={field}>{fieldMeta[field].label}</Label>
              <Input
                id={field}
                type={fieldMeta[field].type}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                placeholder={fieldMeta[field].placeholder}
              />
            </div>
          ))}

          <Button
            type="submit"
            className="col-span-2 max-[720px]:col-span-1 mt-2"
          >
            ذخیره اطلاعات پروفایل
          </Button>
        </form>
      </section>
    </div>
  );
}
