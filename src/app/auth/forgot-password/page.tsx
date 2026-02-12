"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import InputField from "../components/normal-input/normal-input.component";

import pageStyles from "../signup/page.module.css";
import styles from "./page.module.css";

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
    <div className={pageStyles.container}>
      <div className={pageStyles.formSection}>
        <form className={pageStyles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>بازیابی رمز عبور</h2>
          <p className={styles.description}>
            ایمیل خود را وارد کنید تا لینک بازیابی رمز عبور برایتان ارسال شود.
          </p>

          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}

          {status === "success" && (
            <p className={styles.successMessage}>
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
            className={pageStyles.submitBtn}
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "در حال ارسال..." : "ارسال لینک بازیابی"}
          </button>

          <p className={pageStyles.loginText}>
            رمز عبور را به یاد آوردید؟{" "}
            <Link href="/auth/signin" className={pageStyles.loginLink}>
              ورود
            </Link>
          </p>
        </form>
      </div>

      <div className={pageStyles.illustration}>
        <Image
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          className={pageStyles.illustrationImg}
          width={500}
          height={400}
          alt="بازیابی رمز عبور"
          priority
        />
      </div>
    </div>
  );
}
