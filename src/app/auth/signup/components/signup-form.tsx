"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import InputField from "../../components/normal-input/normal-input.component";
import PasswordInput from "../../components/password-input/password-input.component";

import styles from "../page.module.css";

export default function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const password = formData.get("password") as string;
    const username = email.split("@")[0];

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, password, phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "خطا در ثبت نام");
        return;
      }

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

      <InputField
        type="text"
        id="name"
        name="name"
        label="نام کامل"
        placeholder="نام و نام خانوادگی"
        required
      />

      <InputField
        id="phone"
        name="phone"
        type="tel"
        label="شماره تلفن"
        placeholder="09123456789"
        required
      />

      <PasswordInput
        label="رمز عبور"
        name="password"
        placeholder="رمز عبور خود را وارد کنید"
        required
      />

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={isLoading}
      >
        {isLoading ? "در حال ثبت..." : "ثبت نام"}
      </button>

      <div className={styles.divider}>
        <span className={styles.dividerText}>یا</span>
      </div>

      <button type="button" className={styles.googleBtn} disabled>
        ثبت نام با گوگل (به زودی)
      </button>

      <p className={styles.loginText}>
        قبلاً حساب کاربری دارید؟{" "}
        <Link href="/auth/signin" className={styles.loginLink}>
          ورود
        </Link>
      </p>
    </form>
  );
}
