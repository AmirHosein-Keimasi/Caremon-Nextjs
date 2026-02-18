"use client";

import Link from "next/link";
import Image from "next/image";
import useAuth from "@/utils/useAuth";
import { Button } from "@/components/ui/button";

const profileImageSrc = "/images/avatar-placeholder.svg";

export default function UserPanel() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <Button asChild className="min-h-[44px] rounded-xl">
        <Link href="/auth/signin">ورود | ثبت‌نام</Link>
      </Button>
    );
  }

  return (
    <Link
      href="/dashboard"
      className="block size-11 min-h-[44px] min-w-[44px] rounded-full overflow-hidden border-2 border-primary hover:opacity-90 transition-opacity shrink-0"
      aria-label="پنل کاربری"
    >
      <Image
        src={profileImageSrc}
        alt="پروفایل"
        width={48}
        height={48}
        className="w-full h-full rounded-full object-cover"
      />
    </Link>
  );
}
