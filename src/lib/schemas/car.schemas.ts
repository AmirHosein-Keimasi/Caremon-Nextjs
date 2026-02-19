import { z } from "zod";

export const addCarSchema = z.object({
  name: z.string().min(1, "نام خودرو الزامی است").trim(),
  model: z.string().min(1, "مدل (سال) الزامی است").trim(),
  location: z.string().min(1, "شهر / محل تحویل الزامی است").trim(),
  img: z.string().optional().default("default-car.png"),
  withDriver: z.enum(["بدون راننده", "با راننده"]).default("بدون راننده"),
  // قیمت و ظرفیت
  days_3_to_14: z.coerce.number().min(0, "قیمت روزانه نمی‌تواند منفی باشد"),
  more_than_14_days: z.coerce.number().min(0).optional(),
  deposit: z.coerce.number().min(0, "ودیعه نمی‌تواند منفی باشد"),
  minimum_rental: z.coerce.number().int().min(1, "حداقل ۱ روز"),
  passengers: z.coerce.number().int().min(1, "حداقل ۱ سرنشین"),
  luggage: z.coerce.number().int().min(0, "حداقل ۰"),
  door: z.coerce.number().int().min(2, "حداقل ۲ درب"),
  // امکانات (features)
  transmission: z.enum(["دستی", "اتوماتیک", "سی‌ویتی"]).default("دستی"),
  chassis_type: z.string().optional().default("سدان"),
  option_type: z.string().optional().default("استاندارد"),
  cruise_control: z.boolean().optional().default(false),
  hill_start_assist: z.boolean().optional().default(false),
  apple_carplay: z.boolean().optional().default(false),
  seat_heating: z.boolean().optional().default(false),
  seat_cooling: z.boolean().optional().default(false),
  air_conditioning: z.boolean().optional().default(true),
  rear_sensor: z.boolean().optional().default(false),
  audio_system: z.string().optional().default("استاندارد"),
  monitor: z.string().optional().default("—"),
  driver_seat_adjustment: z.string().optional().default("دستی"),
  panoramic_roof: z.boolean().optional().default(false),
  gps: z.boolean().optional().default(false),
  auto_park: z.boolean().optional().default(false),
  auto_drive: z.boolean().optional().default(false),
  connectivity: z.array(z.string()).optional().default([]),
  braking_system: z.array(z.string()).optional().default([]),
  // موتور (engine)
  engine_type: z.string().optional().default("بنزینی"),
  engine_capacity: z.coerce.number().min(0).optional().default(0),
  engine_cylinders: z.coerce.number().int().min(0).optional().default(0),
  engine_acceleration: z.coerce.number().min(0).optional().default(0),
  engine_fuel_consumption: z.coerce.number().min(0).optional().default(0),
  // قیمت با راننده (driverRental)
  driver_hourly_10: z.coerce.number().min(0).optional().default(0),
  driver_intercity_per_km: z.coerce.number().min(0).optional().default(0),
  driver_airport_transfer: z.coerce.number().min(0).optional().default(0),
});

export type AddCarInput = z.infer<typeof addCarSchema>;
