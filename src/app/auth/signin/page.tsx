import Image from "next/image";
import Link from "next/link";

import InputField from "../components/normal-input/normal-input.component";
import PasswordInput from "../components/password-input/password-input.component";

import styles from "../signup/page.module.css";

export default function SigninPage() {
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

          <button type="submit" className={styles.submitBtn}>
            ورود
          </button>

          <div className={styles.divider}>
            <span className={styles.dividerText}>یا</span>
          </div>

          <button type="button" className={styles.googleBtn}>
            ورود با گوگل
          </button>

          <p className={styles.loginText}>
            حساب کاربری ندارید؟{" "}
            <Link href="/auth/signup" className={styles.loginLink}>
              ثبت نام
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
          alt="تصویر ورود"
          priority
        />
      </div>
    </div>
  );
}
