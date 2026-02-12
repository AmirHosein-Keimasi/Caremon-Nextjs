"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import useAuth from "@/utils/useAuth";
import styles from "./UserPanel.module.css";

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
      <Link href="/auth/signin" className={styles.ctaButton}>
        ورود | ثبت‌نام
      </Link>
    );
  }

  const handleLogout = async () => {
    Cookies.remove("token");
    toast.success("خروج با موفقیت انجام شد", {
      position: "bottom-right",
    });
    setIsOpen(false);
    router.push("/");
  };

  const userName = "کاربر";

  return (
    <div className={styles.userPanel} ref={menuRef}>
      <button
        className={styles.userButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="منوی کاربری"
      >
        <span className={styles.userName}>{userName}</span>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.open : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>{userName.charAt(0)}</div>
            <div>
              <p className={styles.name}>{userName}</p>
            </div>
          </div>

          <div className={styles.divider}></div>

          <nav className={styles.menu}>
            <Link href="/dashboard" className={styles.menuItem}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <span>داشبورد</span>
            </Link>

            <Link href="/dashboard" className={styles.menuItem}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>پروفایل</span>
            </Link>
          </nav>

          <div className={styles.divider}></div>

          <button onClick={handleLogout} className={styles.logoutBtn}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
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
