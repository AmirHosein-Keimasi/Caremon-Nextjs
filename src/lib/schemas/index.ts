/**
 * تمام اسکیماهای Zod برای فرم‌ها و اعتبارسنجی ورودی
 * مدیریت متمرکز و یکپارچه
 */

export {
  signinSchema,
  signupSchema,
  forgotPasswordSchema,
  type SigninInput,
  type SignupInput,
  type ForgotPasswordInput,
} from "./auth.schemas";

export {
  reserveFormSchema,
  type ReserveFormInput,
} from "./reserve.schemas";

export {
  addCarSchema,
  type AddCarInput,
} from "./car.schemas";

export {
  contactFormSchema,
  type ContactFormInput,
} from "./contact.schemas";
