"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import InputField from "../../components/normal-input/normal-input.component";
import PasswordInput from "../../components/password-input/password-input.component";

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
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
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
        className="w-full py-3 rounded-[var(--border-radius)] bg-[var(--color-primary)] text-[var(--color-primary-opposite)] font-medium text-[var(--fz-300)] uppercase border-none cursor-pointer transition-[background-color] duration-[var(--animation-duration-normal)] ease-in-out shadow-[var(--shadow-400)] inline-flex items-center justify-center gap-2 hover:bg-[var(--color-primary-lighter)]"
        disabled={isLoading}
      >
        {isLoading ? "در حال ثبت..." : "ثبت نام"}
      </button>

      <div className="flex items-center my-4 text-[var(--color-text-400)] text-[var(--fz-300)] before:content-[''] before:flex-1 before:border-t before:border-[var(--color-border)] before:mx-2 after:content-[''] after:flex-1 after:border-t after:border-[var(--color-border)] after:mx-2">
        <span className="px-2 font-semibold text-[var(--fz-300)]">یا</span>
      </div>

      <button
        type="button"
        className="w-full py-3 flex justify-center items-center gap-2 bg-[#4285f4] text-white border-none rounded-[var(--border-radius)] cursor-pointer text-[var(--fz-300)] transition-[background-color] duration-[var(--animation-duration-normal)] ease-in-out shadow-[var(--shadow-400)] hover:bg-[#357ae8]"
        disabled
      >
        ثبت نام با گوگل (به زودی)
      </button>

      <p className="text-right text-[var(--color-text-400)] text-[var(--fz-300)]">
        قبلاً حساب کاربری دارید؟{" "}
        <Link
          href="/auth/signin"
          className="text-[var(--color-primary)] font-medium text-[var(--fz-300)] transition-[color] duration-[var(--animation-duration-normal)] ease-in-out hover:underline hover:text-[var(--color-primary-lighter)]"
        >
          ورود
        </Link>
      </p>
    </form>
  );
}
