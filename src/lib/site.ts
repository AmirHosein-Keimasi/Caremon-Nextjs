/**
 * تنظیمات پایه سایت برای SEO و لینک‌های مطلق
 * برای تولید می‌توانید NEXT_PUBLIC_SITE_URL را در env تنظیم کنید
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://caremon.ir";

export const SITE_NAME = "کارِمون";
export const DEFAULT_DESCRIPTION =
  "پلتفرمی یکپارچه برای اجاره خودرو و رزرو آنلاین ماشین در سراسر ایران";

export const defaultOpenGraph = {
  locale: "fa_IR" as const,
  type: "website" as const,
  siteName: SITE_NAME,
};
