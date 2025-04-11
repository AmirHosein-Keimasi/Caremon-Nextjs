"use client";
import Image from "next/image";
import Link from "next/link";

import InputField from "../components/normal-input/normal-input.component";
import PasswordInput from "../components/password-input/password-input.component";

import { toast } from "react-toastify";
import { signupDto } from "@/dto/auth.dto";

import styles from "./page.module.css";

export default function page() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const dto: signupDto = {
      email: formData.get("email") as string,
      name: formData.get("name") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    const response = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    });

    const result = await response.json();

    if (!response.ok) {
      let message: string = "خطای غیر منتظره";
      if ("error" in result) message = result.error;

      toast.error(message, {
        position: "bottom-right",
      });
      return;
    }
    toast.success("ثبت نام با موفقیت انجام شد ", {
      position: "bottom-right",
    });

    // Redirect to login page or dashboard
    // window.location.href = '/dashboard';
  };
  return (
    <div className={styles.container}>
      {/* Form Section */}
      <div className={styles.formSection}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <InputField
            type="email"
            id="email"
            label="ایمیل"
            placeholder="example@example.com"
            required
          />

          <InputField
            type="text"
            id="name"
            label="نام  "
            placeholder="نام و نام خانوادگی"
            required
          />

          <InputField
            id="username"
            type="text"
            label="نام کاربری"
            placeholder="نام کاربری"
            required
          />

          <PasswordInput
            label="رمز عبور"
            name="password"
            placeholder="رمز عبور خود را وارد کنید"
            required
          />
          <button type="submit" className={styles.submitBtn}>
            ثبت نام
          </button>

          <div className={styles.divider}>
            <span className={styles.dividerText}>یا</span>
          </div>

          <button type="button" className={styles.googleBtn}>
            ثبت نام با گوگل
          </button>

          <p className={styles.loginText}>
            قبلاً حساب کاربری دارید؟{" "}
            <Link href="/auth/signin" className={styles.loginLink}>
              ورود
            </Link>
          </p>
        </form>
      </div>

      {/* Illustration Section */}
      <div className={styles.illustration}>
        <Image
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          className={styles.illustrationImg}
          width={500}
          height={400}
          alt="تصویر ثبت نام"
          priority
        />
      </div>
    </div>
  );
}
