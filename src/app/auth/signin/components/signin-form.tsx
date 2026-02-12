"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useUserProfileStore } from "@/store/userProfileStore";

import InputField from "../../components/normal-input/normal-input.component";
import PasswordInput from "../../components/password-input/password-input.component";

import styles from "../../signup/page.module.css";

export default function SigninForm() {
  const router = useRouter();
  const updateProfile = useUserProfileStore((state) => state.updateProfile);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "خطا در ورود");
        return;
      }

      const fullName = String(data?.user?.name || "").trim();
      const [firstName = "", ...lastNameParts] = fullName
        .split(/\s+/)
        .filter(Boolean);
      const lastName = lastNameParts.join(" ");

      updateProfile({
        ...(firstName ? { firstName } : {}),
        ...(lastName ? { lastName } : {}),
        email: String(data?.user?.email || email).trim(),
      });

      // فعلا بدون بک‌اند واقعی، فقط یک توکن نمایشی ست می‌کنیم
      // تا هدر و useAuth بتوانند وضعیت ورود کاربر را تشخیص دهند.
      Cookies.set("token", "dummy-token", {
        expires: 7,
      });

      router.push("/dashboard");
    } catch {
      setError("خطا در ارتباط با سرور");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && (
        <p style={{ color: "var(--color-danger)", fontSize: "0.875rem" }}>
          {error}
        </p>
      )}

      <InputField
        type="email"
        id="email"
        name="email"
        label="ایمیل"
        placeholder="example@example.com"
        required
      />

      <PasswordInput
        label="رمز عبور"
        name="password"
        placeholder="رمز عبور خود را وارد کنید"
        required
      />
      <div className={styles.forgotPassword}>
        <Link href="/auth/forgot-password" className={styles.forgotLink}>
          رمز عبور را فراموش کرده‌اید؟
        </Link>
      </div>

      <button type="submit" className={styles.submitBtn} disabled={isLoading}>
        {isLoading ? "در حال ورود..." : "ورود"}
      </button>

      <div className={styles.divider}>
        <span className={styles.dividerText}>یا</span>
      </div>

      <button type="button" className={styles.googleBtn} disabled>
        ورود با گوگل (به زودی)
      </button>

      <p className={styles.loginText}>
        حساب کاربری ندارید؟{" "}
        <Link href="/auth/signup" className={styles.loginLink}>
          ثبت نام
        </Link>
      </p>
    </form>
  );
}
