import Image from "next/image";

import SigninForm from "./components/signin-form";

import styles from "../signup/page.module.css";

export default function SigninPage() {
  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <SigninForm />
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
