"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import InputField from "../components/normal-input/normal-input.component";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !/.+@.+\..+/.test(trimmedEmail)) {
      setErrorMessage("ایمیل وارد شده معتبر نیست.");
      setStatus("error");
      return;
    }

    // فعلاً بدون بک‌اند فقط یک پیام نمایشی نشان می‌دهیم
    // بعداً اینجا می‌توان فراخوانی API واقعی را اضافه کرد.
    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");
    }, 500);
  };

  return (
    <div className="flex flex-wrap items-center justify-center lg:justify-between lg:p-16">
      <div className="w-full max-w-[28rem]">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold mb-2 text-[var(--color-text-700)]">
            بازیابی رمز عبور
          </h2>
          <p className="text-[var(--fz-300)] text-[var(--color-text-400)] mb-4 leading-relaxed">
            ایمیل خود را وارد کنید تا لینک بازیابی رمز عبور برایتان ارسال شود.
          </p>

          {errorMessage && (
            <p className="text-center bg-[var(--color-danger)] py-4 mb-6 rounded-[var(--border-radius)] text-[var(--color-gray-99)] text-[var(--fz-300)]">
              {errorMessage}
            </p>
          )}

          {status === "success" && (
            <p className="text-center bg-[var(--color-success)] py-4 mb-6 rounded-[var(--border-radius)] text-white text-[var(--fz-300)]">
              اگر حساب فعالی با این ایمیل وجود داشته باشد، لینک بازیابی برای شما
              ارسال خواهد شد. این بخش فعلاً به بک‌اند متصل نیست و در نسخه‌های
              بعدی تکمیل می‌شود.
            </p>
          )}

          <InputField
            type="email"
            id="email"
            name="email"
            label="ایمیل"
            placeholder="example@example.com"
            required
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />

          <button
            type="submit"
            className="w-full py-3 rounded-[var(--border-radius)] bg-[var(--color-primary)] text-[var(--color-primary-opposite)] font-medium uppercase border-none cursor-pointer transition-[background-color] duration-[var(--animation-duration-normal)] ease-in-out shadow-[var(--shadow-400)] hover:bg-[var(--color-primary-lighter)]"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "در حال ارسال..." : "ارسال لینک بازیابی"}
          </button>

          <p className="text-right text-[var(--color-text-400)] text-[var(--fz-300)]">
            رمز عبور را به یاد آوردید؟{" "}
            <Link
              href="/auth/signin"
              className="text-[var(--color-primary)] font-medium text-[var(--fz-300)] transition-[color] duration-[var(--animation-duration-normal)] ease-in-out hover:underline hover:text-[var(--color-primary-lighter)]"
            >
              ورود
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden lg:block lg:w-1/2 lg:max-w-[600px]">
        <Image
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          className="w-full h-auto object-contain"
          width={500}
          height={400}
          alt="بازیابی رمز عبور"
          priority
        />
      </div>
    </div>
  );
}
