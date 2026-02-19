import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getCurrentUserId } from "@/utils/api.utils";
import { getCarsByOwnerId } from "@/lib/cars";
import prisma from "@/lib/prisma";

/** پیام خطای قابل نمایش به کاربر بر اساس خطای Prisma/دیتابیس */
function getCarCreateErrorMessage(error: unknown): string {
  const msg = error instanceof Error ? error.message : String(error);
  const isPrisma = error instanceof Prisma.PrismaClientKnownRequestError;

  // ستون یا جدول در دیتابیس وجود ندارد → احتمالاً migration اجرا نشده
  if (
    isPrisma ||
    /column .* does not exist/i.test(msg) ||
    /table .* does not exist/i.test(msg) ||
    /Unknown column/i.test(msg)
  ) {
    return "ساختار دیتابیس با برنامه همخوان نیست. لطفاً در پروژه دستور migration را اجرا کنید: npx prisma migrate deploy یا npx prisma db push";
  }

  // خطای اتصال یا timeout
  if (/connect|ECONNREFUSED|timeout/i.test(msg)) {
    return "اتصال به دیتابیس برقرار نشد. لطفاً بعداً تلاش کنید.";
  }

  // در حالت توسعه متن اصلی را هم نشان بده
  if (process.env.NODE_ENV === "development") {
    return msg;
  }

  return "خطا در ثبت خودرو. لطفاً دوباره تلاش کنید.";
}

/** GET /api/cars?my=1 — خودروهای من (نیاز به لاگین) */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get("my") !== "1") {
    return NextResponse.json(
      { error: "پارامتر my=1 الزامی است" },
      { status: 400 },
    );
  }

  const userId = await getCurrentUserId(request);
  if (!userId) {
    return NextResponse.json(
      { error: "ورود به حساب کاربری الزامی است" },
      { status: 401 },
    );
  }

  const cars = await getCarsByOwnerId(userId);
  return NextResponse.json({ success: true, data: cars });
}

/** مقادیر پیش‌فرض مطابق مدل خودرو برای ذخیره در دیتابیس */
const defaultRental = {
  days_3_to_14: 0,
  more_than_14_days: 0,
  minimum_rental: 1,
  deposit: 0,
};

const defaultCapacity = { passengers: 5, luggage: 2, door: 4 };

const defaultFeatures = {
  cruise_control: false,
  chassis_type: "سدان",
  option_type: "استاندارد",
  hill_start_assist: false,
  transmission: "دستی",
  apple_carplay: false,
  seat_heating: false,
  seat_cooling: false,
  air_conditioning: true,
  rear_sensor: false,
  audio_system: "استاندارد",
  monitor: "—",
  driver_seat_adjustment: "دستی",
  panoramic_roof: false,
  gps: false,
  connectivity: [] as string[],
  braking_system: [] as string[],
  auto_park: false,
  auto_drive: false,
};

const defaultEngine = {
  type: "بنزینی",
  capacity: 0,
  cylinders: 0,
  acceleration: 0,
  fuel_consumption: 0,
};

const defaultDriverRental = {
  hourly_10: 0,
  intercity_per_km: 0,
  airport_transfer: 0,
};

function toNum(v: unknown): number {
  if (typeof v === "number" && !Number.isNaN(v)) return v;
  if (typeof v === "string") return Number(v) || 0;
  return 0;
}

function mergeRental(body: unknown): typeof defaultRental {
  if (!body || typeof body !== "object") return defaultRental;
  const b = body as Record<string, unknown>;
  return {
    days_3_to_14: toNum(b.days_3_to_14 ?? defaultRental.days_3_to_14),
    more_than_14_days: toNum(b.more_than_14_days ?? defaultRental.more_than_14_days),
    minimum_rental: Math.max(1, toNum(b.minimum_rental ?? defaultRental.minimum_rental)),
    deposit: Math.max(0, toNum(b.deposit ?? defaultRental.deposit)),
  };
}

function mergeCapacity(body: unknown): typeof defaultCapacity {
  if (!body || typeof body !== "object") return defaultCapacity;
  const b = body as Record<string, unknown>;
  return {
    passengers: Math.max(1, toNum(b.passengers ?? defaultCapacity.passengers)),
    luggage: Math.max(0, toNum(b.luggage ?? defaultCapacity.luggage)),
    door: Math.max(2, toNum(b.door ?? defaultCapacity.door)),
  };
}

function mergeFeatures(body: unknown): typeof defaultFeatures {
  if (!body || typeof body !== "object") return { ...defaultFeatures };
  const b = body as Record<string, unknown>;
  return {
    cruise_control: Boolean(b.cruise_control ?? defaultFeatures.cruise_control),
    chassis_type: String(b.chassis_type ?? defaultFeatures.chassis_type),
    option_type: String(b.option_type ?? defaultFeatures.option_type),
    hill_start_assist: Boolean(b.hill_start_assist ?? defaultFeatures.hill_start_assist),
    transmission: String(b.transmission ?? defaultFeatures.transmission),
    apple_carplay: Boolean(b.apple_carplay ?? defaultFeatures.apple_carplay),
    seat_heating: Boolean(b.seat_heating ?? defaultFeatures.seat_heating),
    seat_cooling: Boolean(b.seat_cooling ?? defaultFeatures.seat_cooling),
    air_conditioning: Boolean(b.air_conditioning ?? defaultFeatures.air_conditioning),
    rear_sensor: Boolean(b.rear_sensor ?? defaultFeatures.rear_sensor),
    audio_system: String(b.audio_system ?? defaultFeatures.audio_system),
    monitor: String(b.monitor ?? defaultFeatures.monitor),
    driver_seat_adjustment: String(b.driver_seat_adjustment ?? defaultFeatures.driver_seat_adjustment),
    panoramic_roof: Boolean(b.panoramic_roof ?? defaultFeatures.panoramic_roof),
    gps: Boolean(b.gps ?? defaultFeatures.gps),
    connectivity: Array.isArray(b.connectivity) ? b.connectivity.map(String) : defaultFeatures.connectivity,
    braking_system: Array.isArray(b.braking_system) ? b.braking_system.map(String) : defaultFeatures.braking_system,
    auto_park: Boolean(b.auto_park ?? defaultFeatures.auto_park),
    auto_drive: Boolean(b.auto_drive ?? defaultFeatures.auto_drive),
  };
}

function mergeEngine(body: unknown): typeof defaultEngine {
  if (!body || typeof body !== "object") return defaultEngine;
  const b = body as Record<string, unknown>;
  return {
    type: String(b.type ?? defaultEngine.type),
    capacity: toNum(b.capacity ?? defaultEngine.capacity),
    cylinders: Math.max(0, toNum(b.cylinders ?? defaultEngine.cylinders)),
    acceleration: toNum(b.acceleration ?? defaultEngine.acceleration),
    fuel_consumption: toNum(b.fuel_consumption ?? defaultEngine.fuel_consumption),
  };
}

function mergeDriverRental(body: unknown): typeof defaultDriverRental {
  if (!body || typeof body !== "object") return defaultDriverRental;
  const b = body as Record<string, unknown>;
  return {
    hourly_10: toNum(b.hourly_10 ?? defaultDriverRental.hourly_10),
    intercity_per_km: toNum(b.intercity_per_km ?? defaultDriverRental.intercity_per_km),
    airport_transfer: toNum(b.airport_transfer ?? defaultDriverRental.airport_transfer),
  };
}

/** POST /api/cars — ثبت خودرو برای اجاره (مارکت‌پلیس) */
export async function POST(request: Request) {
  const userId = await getCurrentUserId(request);
  if (!userId) {
    return NextResponse.json(
      { error: "ورود به حساب کاربری الزامی است" },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "بدنه درخواست نامعتبر است" },
        { status: 400 },
      );
    }

    const name = String(body.name ?? "").trim();
    const model = String(body.model ?? "").trim();
    const location = String(body.location ?? "").trim();
    const img = String(body.img ?? "default-car.png").trim() || "default-car.png";
    const withDriver = String(body.withDriver ?? "بدون راننده").trim() || "بدون راننده";

    if (!name || !model || !location) {
      return NextResponse.json(
        { error: "نام، مدل و محل خودرو الزامی است" },
        { status: 400 },
      );
    }

    const rental = mergeRental(body.rental);
    const capacity = mergeCapacity(body.capacity);
    const features = mergeFeatures(body.features);
    const engine = mergeEngine(body.engine);
    const driverRental = mergeDriverRental(body.driverRental);

    const id = `user-${userId.slice(0, 8)}-${Date.now()}`;

    await prisma.car.create({
      data: {
        id,
        name,
        model,
        img,
        location,
        reviewCount: 0,
        ratingNumber: 0,
        withDriver,
        rental,
        capacity,
        features,
        engine,
        driverRental,
        ownerId: userId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "خودرو با موفقیت ثبت شد",
      data: { id },
    });
  } catch (error) {
    const userMessage = getCarCreateErrorMessage(error);
    console.error("Create car error:", error);
    return NextResponse.json(
      { error: userMessage },
      { status: 500 },
    );
  }
}
