import { z } from "zod";

export const addCarSchema = z.object({
  name: z.string().min(1, "نام خودرو الزامی است").trim(),
  model: z.string().min(1, "مدل (سال) الزامی است").trim(),
  location: z.string().min(1, "شهر / محل تحویل الزامی است").trim(),
  img: z.string().optional().default("default-car.png"),
  withDriver: z.enum(["بدون راننده", "با راننده"]).default("بدون راننده"),
  transmission: z.enum(["دستی", "اتوماتیک"]).default("دستی"),
  days_3_to_14: z.coerce.number().min(0, "قیمت روزانه نمی‌تواند منفی باشد"),
  deposit: z.coerce.number().min(0, "ودیعه نمی‌تواند منفی باشد"),
  minimum_rental: z.coerce.number().int().min(1, "حداقل ۱ روز"),
  passengers: z.coerce.number().int().min(1, "حداقل ۱ سرنشین"),
  luggage: z.coerce.number().int().min(0, "حداقل ۰"),
  door: z.coerce.number().int().min(2, "حداقل ۲ درب"),
});

export type AddCarInput = z.infer<typeof addCarSchema>;
