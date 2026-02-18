import { z } from "zod";

export const reserveFormSchema = z
  .object({
    name: z.string().min(1, "نام و نام خانوادگی الزامی است").trim(),
    phone: z
      .string()
      .min(1, "شماره تماس الزامی است")
      .regex(/^09\d{9}$/, "شماره تماس را به‌صورت ۱۱ رقمی و با ۰۹ وارد کنید"),
    email: z.string().min(1, "ایمیل الزامی است").email("ایمیل معتبر وارد کنید"),
    startDate: z.string().min(1, "تاریخ تحویل الزامی است"),
    endDate: z.string().min(1, "تاریخ بازگرداندن الزامی است"),
  })
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return end >= start;
    },
    { message: "تاریخ بازگشت باید بعد از تاریخ تحویل باشد", path: ["endDate"] },
  )
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return start >= today;
    },
    { message: "تاریخ تحویل نمی‌تواند قبل از امروز باشد", path: ["startDate"] },
  );

export type ReserveFormInput = z.infer<typeof reserveFormSchema>;
