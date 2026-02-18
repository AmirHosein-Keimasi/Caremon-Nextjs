import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "نام و نام خانوادگی الزامی است").trim(),
  email: z.string().min(1, "ایمیل الزامی است").email("ایمیل معتبر وارد کنید"),
  subject: z.string().min(1, "موضوع الزامی است").trim(),
  message: z.string().min(1, "متن پیام الزامی است").min(10, "حداقل ۱۰ کاراکتر").trim(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
