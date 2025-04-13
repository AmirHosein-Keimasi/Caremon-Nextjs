"use client";

import { ReactElement } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import DarkModeToggleComponent from "../dark-mode-toggle/dark-mode-toggle.component";

import clsx from "clsx";

import styles from "./header.module.css";

const links = [
  { href: "/", title: "خانه" },
  { href: "/search", title: "جستجو" },
  { href: "/questions", title: "سوالات متداول" },
  { href: "/Rules", title: "شرایط و قوانین" },
];

export default function HeaderComponent(): ReactElement {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <nav>
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={clsx(pathname === link.href && styles.active)}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* {isLoggedIn ? (
        <LogOutButton />
      ) : (
        <Link href="/auth/signin" className={styles.cta}>
          ورود | ثبت‌نام
        </Link>
      )} */}
      <Link href="/auth/signin" className={styles.cta}>
        ورود | ثبت‌نام
      </Link>
      <DarkModeToggleComponent />
    </header>
  );
}
