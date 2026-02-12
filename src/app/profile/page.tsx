"use client";

import type { ReactElement } from "react";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useUserProfileStore, UserProfileData } from "@/store/userProfileStore";
import styles from "./page.module.css";

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
    <main className={styles.profilePage}>
      <div className={styles.header}>
        <h1>پروفایل کاربر</h1>
        <p>اطلاعات اصلی خود را اینجا ثبت کنید تا در رزرو تکرار نشود.</p>
      </div>

      <section className={styles.card}>
        <div className={styles.progressRow}>
          <span>تکمیل اطلاعات</span>
          <strong>
            {completionCount} از {requiredFields.length}
          </strong>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              width: `${(completionCount / requiredFields.length) * 100}%`,
            }}
          />
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {requiredFields.map((field) => (
            <div key={field} className={styles.formGroup}>
              <label htmlFor={field}>{fieldMeta[field].label}</label>
              <input
                id={field}
                type={fieldMeta[field].type}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                placeholder={fieldMeta[field].placeholder}
              />
            </div>
          ))}

          <button className={styles.submitBtn} type="submit">
            ذخیره اطلاعات پروفایل
          </button>
        </form>
      </section>
    </main>
  );
}
