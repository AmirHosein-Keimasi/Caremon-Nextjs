"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserProfileStore } from "@/store/userProfileStore";
import { tokenUtils } from "@/lib/api-client";
import Spinner from "@/components/Spinner/Spinner";

import InputField from "../../components/normal-input/normal-input.component";
import PasswordInput from "../../components/password-input/password-input.component";

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

      // فعلا بدون بک‌اند واقعی، فقط یک توکن ذخیره می‌شود تا UI وضعیت ورود را بداند
      const token =
        (data && (data.accessToken as string | undefined)) || "dummy-token";
      const expiresIn =
        (data && (data.expiresIn as number | undefined)) || 7 * 24 * 60 * 60;
      tokenUtils.setToken(token, expiresIn);

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

      <PasswordInput
        label="رمز عبور"
        name="password"
        placeholder="رمز عبور خود را وارد کنید"
        required
      />
      <div className="text-right -mt-2 mb-2">
        <Link
          href="/auth/forgot-password"
          className="text-sm text-[var(--color-primary)] transition-[color] duration-[var(--animation-duration-normal)] ease-in-out hover:underline hover:text-[var(--color-primary-lighter)]"
        >
          رمز عبور را فراموش کرده‌اید؟
        </Link>
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-[var(--border-radius)] bg-[var(--color-primary)] text-[var(--color-primary-opposite)] font-medium uppercase border-none cursor-pointer transition-[background-color] duration-[var(--animation-duration-normal)] ease-in-out shadow-[var(--shadow-400)] hover:bg-[var(--color-primary-lighter)]"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Spinner size={18} />
            <span>در حال ورود...</span>
          </>
        ) : (
          "ورود"
        )}
      </button>

      <div className="flex items-center my-4 text-[var(--color-text-400)] before:content-[''] before:flex-1 before:border-t before:border-[var(--color-border)] before:mx-2 after:content-[''] after:flex-1 after:border-t after:border-[var(--color-border)] after:mx-2">
        <span className="px-2 font-semibold">یا</span>
      </div>

      <button
        type="button"
        className="w-full py-3 flex justify-center items-center gap-2 bg-[#4285f4] text-white border-none rounded-[var(--border-radius)] cursor-pointer transition-[background-color] duration-[var(--animation-duration-normal)] ease-in-out shadow-[var(--shadow-400)] hover:bg-[#357ae8]"
        disabled
      >
        ورود با گوگل (به زودی)
      </button>

      <p className="text-center text-sm text-[var(--color-text-400)]">
        حساب کاربری ندارید؟{" "}
        <Link
          href="/auth/signup"
          className="text-[var(--color-primary)] font-medium transition-[color] duration-[var(--animation-duration-normal)] ease-in-out hover:underline hover:text-[var(--color-primary-lighter)]"
        >
          ثبت نام
        </Link>
      </p>
    </form>
  );
}
