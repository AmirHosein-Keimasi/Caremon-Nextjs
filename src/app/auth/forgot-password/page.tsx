import Image from "next/image";
import Link from "next/link";

import InputField from "../components/normal-input/normal-input.component";

import pageStyles from "../signup/page.module.css";
import styles from "./page.module.css";

export default function ForgotPasswordPage() {
  return (
    <div className={pageStyles.container}>
      <div className={pageStyles.formSection}>
        <form className={pageStyles.form}>
          <h2 className={styles.title}>بازیابی رمز عبور</h2>
          <p className={styles.description}>
            ایمیل خود را وارد کنید تا لینک بازیابی رمز عبور برایتان ارسال شود.
          </p>

          <InputField
            type="email"
            id="email"
            label="ایمیل"
            placeholder="example@example.com"
            required
          />

          <button type="submit" className={pageStyles.submitBtn}>
            ارسال لینک بازیابی
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
