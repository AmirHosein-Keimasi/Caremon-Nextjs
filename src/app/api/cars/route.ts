import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getCurrentUserId } from "@/utils/api.utils";
import { getCarsByOwnerId } from "@/lib/cars";
import prisma from "@/lib/prisma";
import {
  // defaultRental,
  // defaultCapacity,
  // defaultFeatures,
  // defaultEngine,
  // defaultDriverRental,
  mergeRental,
  mergeCapacity,
  mergeFeatures,
  mergeEngine,
  mergeDriverRental,
} from "@/lib/car-api-helpers";

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
    const img =
      String(body.img ?? "default-car.png").trim() || "default-car.png";
    const withDriver =
      String(body.withDriver ?? "بدون راننده").trim() || "بدون راننده";

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
    return NextResponse.json({ error: userMessage }, { status: 500 });
  }
}
