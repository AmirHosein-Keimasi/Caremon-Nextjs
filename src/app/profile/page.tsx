"use client";

import type { ReactElement } from "react";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
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

export default function ProfilePage(): ReactElement {
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
    <main className="rtl max-w-[860px] mx-auto p-[clamp(1.2rem,2vw,2rem)] min-h-screen">
      <div className="mb-5">
        <h1 className="m-0 text-[var(--color-gray-99)] text-[clamp(1.6rem,2vw,2rem)]">
          پروفایل کاربر
        </h1>
        <p className="mt-[0.7rem] mb-0 text-[var(--color-gray-70)]">
          اطلاعات اصلی خود را اینجا ثبت کنید تا در رزرو تکرار نشود.
        </p>
      </div>

      <section className="bg-[var(--color-surface-400)] rounded-2xl p-[clamp(1rem,2vw,1.5rem)] shadow-[0_12px_30px_rgba(12,17,29,0.08)]">
        <div className="flex items-center justify-between text-[var(--color-gray-99)] mb-[0.65rem] text-[0.95rem]">
          <span>تکمیل اطلاعات</span>
          <strong>
            {completionCount} از {requiredFields.length}
          </strong>
        </div>
        <div className="w-full h-2 rounded-full bg-[rgba(130,138,156,0.26)] overflow-hidden mb-5">
          <div
            className="h-full rounded-[inherit] bg-gradient-to-r from-[#1f7a4d] to-[#2ca56b] transition-[width] duration-300 ease-in-out"
            style={{
              width: `${(completionCount / requiredFields.length) * 100}%`,
            }}
          />
        </div>

        <form
          className="grid grid-cols-2 gap-[0.95rem] max-[720px]:grid-cols-1"
          onSubmit={handleSubmit}
        >
          {requiredFields.map((field) => (
            <div key={field} className="flex flex-col gap-[0.45rem]">
              <label
                htmlFor={field}
                className="text-[var(--color-gray-99)] text-[0.92rem]"
              >
                {fieldMeta[field].label}
              </label>
              <input
                id={field}
                type={fieldMeta[field].type}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                placeholder={fieldMeta[field].placeholder}
                className="w-full border-none rounded-[10px] bg-[var(--color-surface-300)] shadow-[inset_0_0_0_1px_rgba(136,145,164,0.34)] text-[var(--color-gray-99)] py-[0.7rem] px-[0.8rem] text-[0.96rem] font-inherit focus:outline-none focus:shadow-[inset_0_0_0_2px_rgba(31,122,77,0.45)]"
              />
            </div>
          ))}

          <button
            className="col-span-2 max-[720px]:col-span-1 mt-[0.45rem] border-none rounded-xl bg-[#1f7a4d] text-white py-[0.8rem] px-4 text-[0.96rem] font-semibold cursor-pointer transition-[background] duration-200 ease-in-out hover:bg-[#19623f]"
            type="submit"
          >
            ذخیره اطلاعات پروفایل
          </button>
        </form>
      </section>
    </main>
  );
}
