"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useAuth from "@/utils/useAuth";
import { tokenUtils } from "@/lib/api-client";

export default function UserPanel() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // بستن منو هنگام کلیک بیرون
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isLoggedIn) {
    return (
      <Button asChild>
        <Link href="/auth/signin">ورود | ثبت‌نام</Link>
      </Button>
    );
  }

  const handleLogout = async () => {
    tokenUtils.removeToken();
    toast.success("خروج با موفقیت انجام شد");
    setIsOpen(false);
    router.push("/");
  };

  const userName = "کاربر";
  const profileImageSrc = "/images/avatar-placeholder.svg";

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full w-12 h-12 overflow-hidden p-0"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="منوی کاربری"
      >
        <Image
          src={profileImageSrc}
          alt="تصویر پروفایل کاربر"
          width={48}
          height={48}
          className="w-full h-full rounded-full object-cover"
        />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-auto -right-5 mt-3 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-[100] min-w-[200px] animate-[slideDown_0.2s_ease-out] max-[600px]:right-0">
          <div className="flex items-center gap-4 p-4 bg-muted">
            <Image
              src={profileImageSrc}
              alt="تصویر پروفایل کاربر"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-border"
            />
            <div className="overflow-hidden">
              <p className="m-0 text-foreground font-semibold text-[0.95rem] whitespace-nowrap overflow-hidden text-ellipsis">
                {userName}
              </p>
            </div>
          </div>

          <div className="h-px bg-border"></div>

          <nav className="flex flex-col list-none m-0 p-0">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 text-foreground no-underline transition-all duration-200 border-l-[3px] border-l-transparent hover:bg-muted hover:border-l-primary"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5 flex-shrink-0 text-primary"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <span>داشبورد</span>
            </Link>

            <Link
              href="/profile"
              className="flex items-center gap-3 px-4 py-3 text-foreground no-underline transition-all duration-200 border-l-[3px] border-l-transparent hover:bg-muted hover:border-l-primary"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5 flex-shrink-0 text-primary"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>پروفایل</span>
            </Link>
          </nav>

          <div className="h-px bg-border"></div>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive border-l-[3px] border-l-transparent hover:border-l-destructive rounded-none"
            onClick={handleLogout}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5 flex-shrink-0"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>خروج</span>
          </Button>
        </div>
      )}
    </div>
  );
}
