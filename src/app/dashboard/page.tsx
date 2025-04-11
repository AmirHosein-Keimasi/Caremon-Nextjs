"use client";

import { ReactElement } from "react";

import { useRouter } from "next/navigation";

import { fetchWithToast } from "@/utils/fetch-utils";

import styles from "./page.module.css";

export default function Page(): ReactElement {
  const router = useRouter();

  const signOutButtonHandeler = async () => {
    const result = await fetchWithToast<null>(
      "/api/auth/sign-out",
      {
        method: "POST",
      },
      "خروج با موفقیت انجام شد ",
    );
    if (result.error) {
      return;
    }
    router.push("/");
  };
  return (
    <div className={styles.page}>
      داشبورد
      <button onClick={signOutButtonHandeler}>خروج</button>
    </div>
  );
}
