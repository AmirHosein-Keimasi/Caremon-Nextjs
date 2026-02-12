import Image from "next/image";

import SignupForm from "./components/signup-form";

import styles from "./page.module.css";

export default function SignupPage() {
  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <SignupForm />
      </div>

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
