"use client";

import { MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import ConfirmationDialog from "../confirmation-dialog/confirmation-dialog.component";

import styles from "./Logout-Button.module.css";

export default function LogOutButton() {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);

  const signOutButtonHandler = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowDialog(true);
  };

  const confirmLogout = async () => {
    // فعلاً بدون اندپوینت بک‌اند، فقط کوکی نمایشی را پاک می‌کنیم
    Cookies.remove("token");

    toast.success("خروج با موفقیت انجام شد", {
      position: "bottom-right",
    });

    setShowDialog(false);
    router.push("/");
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
