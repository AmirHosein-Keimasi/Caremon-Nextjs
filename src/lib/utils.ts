import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** تبدیل اعداد انگلیسی به فارسی (۰–۹) برای نمایش در UI */
export function toPersianDigits(str: string | number): string {
  const s = String(str);
  const persian = "۰۱۲۳۴۵۶۷۸۹";
  return s.replace(/\d/g, (d) => persian[parseInt(d, 10)] ?? d);
}

/** نرمال کردن شماره موبایل: حذف فاصله و تبدیل ۰ فارسی به 0 */
export function normalizePhoneForValidation(phone: string): string {
  return phone
    .replace(/\s/g, "")
    .replace(/۰/g, "0")
    .replace(/۱/g, "1")
    .replace(/۲/g, "2")
    .replace(/۳/g, "3")
    .replace(/۴/g, "4")
    .replace(/۵/g, "5")
    .replace(/۶/g, "6")
    .replace(/۷/g, "7")
    .replace(/۸/g, "8")
    .replace(/۹/g, "9");
}
