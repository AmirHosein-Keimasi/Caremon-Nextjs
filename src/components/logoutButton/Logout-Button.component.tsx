"use client";

import { MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import ConfirmationDialog from "../confirmation-dialog/confirmation-dialog.component";

export default function LogOutButton() {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);

  const signOutButtonHandler = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowDialog(true);
  };

  const confirmLogout = async () => {
    Cookies.remove("token");
    toast.success("خروج با موفقیت انجام شد");
    setShowDialog(false);
    router.push("/");
  };

  return (
    <>
      <Button variant="outline" asChild>
        <Link
          href="/auth/signout"
          className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
          onClick={signOutButtonHandler}
        >
          خروج
        </Link>
      </Button>

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
