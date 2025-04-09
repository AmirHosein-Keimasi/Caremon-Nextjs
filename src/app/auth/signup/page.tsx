import Image from "next/image";
import Link from "next/link";

import InputField from "../components/normal-input/normal-input.component";
import PasswordInput from "../components/password-input/password-input.component";

import styles from "./page.module.css";

export default function page() {
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Form submitted");
  // };

  return (
    <div className={styles.container}>
      {/* Form Section */}
      <div className={styles.formSection}>
        <form className={styles.form}>
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
            label="نام کامل"
            placeholder="نام و نام خانوادگی"
            required
          />

          <InputField
            id="phone"
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
