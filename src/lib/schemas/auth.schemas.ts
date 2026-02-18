import { z } from "zod";

/** پیام‌های خطای فارسی برای Zod */
const faMessages = {
  required: "این فیلد الزامی است",
  email: "ایمیل معتبر وارد کنید",
  min: (n: number) => `حداقل ${n} کاراکتر`,
  max: (n: number) => `حداکثر ${n} کاراکتر`,
};

export const signinSchema = z.object({
  email: z
    .string()
    .min(1, faMessages.required)
    .email(faMessages.email),
  password: z
    .string()
    .min(1, faMessages.required),
});

export const signupSchema = z.object({
  name: z
    .string()
    .min(1, faMessages.required)
    .min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  email: z
    .string()
    .min(1, faMessages.required)
    .email(faMessages.email),
  phone: z
    .string()
    .optional()
    .refine((v) => !v || v === "" || /^09\d{9}$/.test(v), "شماره موبایل را با ۰۹ و ۱۱ رقم وارد کنید"),
  password: z
    .string()
    .min(1, faMessages.required)
    .min(6, "رمز عبور حداقل ۶ کاراکتر"),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, faMessages.required)
    .email(faMessages.email),
});

export type SigninInput = z.infer<typeof signinSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
