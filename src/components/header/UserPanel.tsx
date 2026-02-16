"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
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
      <Link
        href="/auth/signin"
        className="px-6 py-2 bg-[var(--color-primary-darkeMod)] text-white rounded-md font-semibold transition-all duration-300 no-underline inline-block hover:bg-[var(--color-primary-400)] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(33,150,243,0.3)]"
      >
        ورود | ثبت‌نام
      </Link>
    );
  }

  const handleLogout = async () => {
    tokenUtils.removeToken();
    toast.success("خروج با موفقیت انجام شد", {
      position: "bottom-right",
    });
    setIsOpen(false);
    router.push("/");
  };

  const userName = "کاربر";
  const profileImageSrc = "/images/avatar-placeholder.svg";

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="inline-flex items-center justify-center bg-transparent border border-[var(--color-gray-80)] w-12 h-12 p-0 rounded-full cursor-pointer transition-all duration-300 font-inherit overflow-hidden hover:bg-[var(--color-surface-400)] hover:border-[var(--color-primary-darkeMod)]"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="منوی کاربری"
      >
        <img
          src={profileImageSrc}
          alt="User profile"
          className="w-full h-full object-cover block"
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-auto -right-5 mt-3 bg-[var(--color-surface-400)] border border-[var(--color-gray-80)] rounded-lg shadow-[0_4px_24px_rgba(0,0,0,0.15)] overflow-hidden z-[100] min-w-[200px] animate-[slideDown_0.2s_ease-out] max-[600px]:right-0">
          <div className="flex items-center gap-4 p-4 bg-[var(--color-surface-300)]">
            <img
              src={profileImageSrc}
              alt="User profile"
              className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-[var(--color-gray-80)]"
            />
            <div className="overflow-hidden">
              <p className="m-0 text-[var(--color-gray-99)] font-semibold text-[0.95rem] whitespace-nowrap overflow-hidden text-ellipsis">
                {userName}
              </p>
            </div>
          </div>

          <div className="h-px bg-[var(--color-gray-80)]"></div>

          <nav className="flex flex-col list-none m-0 p-0">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 text-[var(--color-gray-99)] no-underline transition-all duration-200 border-l-[3px] border-l-transparent hover:bg-[var(--color-surface-300)] hover:border-l-[var(--color-primary-darkeMod)]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5 flex-shrink-0 text-[var(--color-primary-darkeMod)]"
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
              className="flex items-center gap-3 px-4 py-3 text-[var(--color-gray-99)] no-underline transition-all duration-200 border-l-[3px] border-l-transparent hover:bg-[var(--color-surface-300)] hover:border-l-[var(--color-primary-darkeMod)]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5 flex-shrink-0 text-[var(--color-primary-darkeMod)]"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>پروفایل</span>
            </Link>
          </nav>

          <div className="h-px bg-[var(--color-gray-80)]"></div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 bg-transparent border-none text-[#f44336] cursor-pointer text-[0.95rem] font-semibold transition-all duration-200 border-l-[3px] border-l-transparent font-inherit hover:bg-[rgba(244,67,54,0.1)] hover:border-l-[#f44336]"
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
          </button>
        </div>
      )}
    </div>
  );
}
