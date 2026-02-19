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
import { User, Mail, Phone, MapPin, Hash, Calendar } from "lucide-react";
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
    icon?: React.ElementType;
  }
> = {
  firstName: {
    label: "نام",
    type: "text",
    placeholder: "نام",
    icon: User,
  },
  lastName: {
    label: "نام خانوادگی",
    type: "text",
    placeholder: "نام خانوادگی",
    icon: User,
  },
  username: {
    label: "نام کاربری",
    type: "text",
    placeholder: "username",
    icon: User,
  },
  email: {
    label: "ایمیل",
    type: "email",
    placeholder: "example@mail.com",
    icon: Mail,
  },
  phone: {
    label: "شماره تماس",
    type: "tel",
    placeholder: "۰۹۱۲۳۴۵۶۷۸۹",
    icon: Phone,
  },
  nationalId: {
    label: "کد ملی",
    type: "text",
    placeholder: "۱۰ رقم کد ملی",
    icon: Hash,
  },
  address: {
    label: "آدرس",
    type: "text",
    placeholder: "استان، شهر، خیابان، پلاک",
    icon: MapPin,
  },
  birthDate: {
    label: "تاریخ تولد",
    type: "date",
    placeholder: "",
    icon: Calendar,
  },
};

export default function DashboardProfilePage(): ReactElement {
  const profile = useUserProfileStore((state) => state.profile);
  const setProfile = useUserProfileStore((state) => state.setProfile);
  const [formData, setFormData] = useState<UserProfileData>(profile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  useEffect(() => {
    setError(null);
    setLoading(true);
    fetch("/api/auth/me", { method: "GET", credentials: "include" })
      .then((res) => {
        if (res.status === 401) return null;
        return res.json();
      })
      .then((data) => {
        if (data?.id) {
          const fullName = String(data.name ?? "").trim();
          const [firstName = "", ...lastNameParts] = fullName
            .split(/\s+/)
            .filter(Boolean);
          const lastName = lastNameParts.join(" ");
          setFormData((prev) => ({
            ...prev,
            firstName: firstName || prev.firstName,
            lastName: lastName || prev.lastName,
            username: String(data.username ?? prev.username ?? "").trim(),
            email: String(data.email ?? prev.email ?? "").trim(),
          }));
        }
      })
      .catch(() => setError("خطا در بارگذاری پروفایل"))
      .finally(() => setLoading(false));
  }, []);

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const name =
      `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();
    const username = formData.username.trim();
    const email = formData.email.trim();

    try {
      const res = await fetch("/api/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, username, email }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "خطا در ذخیره");
        setSaving(false);
        return;
      }

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
    } catch {
      setError("خطا در ارتباط با سرور");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
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
        <div className="flex min-h-[200px] items-center justify-center text-muted-foreground">
          در حال بارگذاری…
        </div>
      </div>
    );
  }

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
        <h1 className="m-0 text-xl font-bold text-foreground lg:text-2xl">
          پروفایل کاربر
        </h1>
        <p className="m-0 mt-1.5 text-sm text-muted-foreground lg:mt-2">
          اطلاعات خود را کامل کنید تا در رزرو و ارتباط با پشتیبانی از آن‌ها
          استفاده شود.
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

        {error && (
          <div className="mb-4 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <form
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          onSubmit={handleSubmit}
        >
          {(Object.keys(fieldMeta) as Array<keyof UserProfileData>).map(
            (field) => {
              const meta = fieldMeta[field];
              const Icon = meta.icon;
              if (field === "birthDate") {
                return (
                  <div
                    key={field}
                    className="flex flex-col gap-2 sm:col-span-1"
                  >
                    <BirthDatePicker
                      id={field}
                      label={meta.label}
                      value={formData.birthDate}
                      onChange={(v) =>
                        setFormData((prev) => ({ ...prev, birthDate: v }))
                      }
                      placeholder={
                        meta.placeholder || "تاریخ تولد را انتخاب کنید"
                      }
                    />
                  </div>
                );
              }
              return (
                <div
                  key={field}
                  className={`flex flex-col gap-2 ${field === "address" ? "sm:col-span-2" : "sm:col-span-1"}`}
                >
                  <Label htmlFor={field} className="flex items-center gap-2">
                    {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                    {meta.label}
                    {requiredFields.includes(field) && (
                      <span className="text-destructive">*</span>
                    )}
                  </Label>
                  <Input
                    id={field}
                    type={meta.type}
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    placeholder={meta.placeholder}
                    className="min-h-[44px] rounded-xl"
                  />
                </div>
              );
            },
          )}

          <Button
            type="submit"
            className="min-h-[44px] sm:col-span-2"
            disabled={saving}
          >
            {saving ? "در حال ذخیره…" : "ذخیره اطلاعات پروفایل"}
          </Button>
        </form>
      </section>

      <section className="mt-6 rounded-2xl border border-border bg-card p-4 shadow-sm lg:p-6">
        <h2 className="mb-1 text-lg font-bold text-foreground">ظاهر و تم</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          رنگ اصلی سایت را انتخاب کنید. تغییر به‌صورت زنده در همه‌ی صفحات اعمال
          می‌شود.
        </p>
        <PrimaryColorPicker />
      </section>
    </div>
  );
}
