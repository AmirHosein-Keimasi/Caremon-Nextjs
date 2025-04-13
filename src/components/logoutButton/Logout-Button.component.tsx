"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";

import { fetchWithToast } from "@/utils/fetch-utils";

import ConfirmationDialog from "../confirmation-dialog/confirmation-dialog.component";

import styles from "./Logout-Button.module.css";

export default function LogOutButton() {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);

  const signOutButtonHandler = async (e) => {
    e.preventDefault();
    setShowDialog(true);
  };

  const confirmLogout = async () => {
    const result = await fetchWithToast<null>(
      "/api/auth/sign-out",
      {
        method: "POST",
      },
      "خروج با موفقیت انجام شد",
    );

    if (!result.error) {
      router.push("/");
    }
    setShowDialog(false);
  };

  return (
    <>
      <Link
        href="/auth/signout"
        className={styles.cta}
        onClick={signOutButtonHandler}
      >
        خروج
      </Link>

      <ConfirmationDialog
        isOpen={showDialog}
        onConfirm={confirmLogout}
        onCancel={() => setShowDialog(false)}
        title="تأیید خروج"
        message="آیا مطمئن هستید که می‌خواهید خارج شوید؟"
        confirmText="بله، خارج شو"
        cancelText="انصراف"
      />
    </>
  );
}
