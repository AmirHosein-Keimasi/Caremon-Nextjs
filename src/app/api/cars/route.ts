import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/utils/api.utils";
import { getCarsByOwnerId } from "@/lib/cars";
import prisma from "@/lib/prisma";

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

/** بدنه درخواست ثبت خودرو */
const createCarBodySchema = {
  name: "",
  model: "",
  img: "",
  location: "",
  withDriver: "بدون راننده",
  rental: {
    days_3_to_14: 0,
    more_than_14_days: 0,
    minimum_rental: 1,
    deposit: 0,
  },
  capacity: { passengers: 5, luggage: 2, door: 4 },
  features: {} as Record<string, unknown>,
  engine: {} as Record<string, unknown>,
  driverRental: {} as Record<string, unknown>,
};

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
    const {
      name,
      model,
      img,
      location,
      withDriver,
      rental,
      capacity,
      features,
      engine,
      driverRental,
    } = { ...createCarBodySchema, ...body };

    if (!name || !model || !location) {
      return NextResponse.json(
        { error: "نام، مدل و محل خودرو الزامی است" },
        { status: 400 },
      );
    }

    const id = `user-${userId.slice(0, 8)}-${Date.now()}`;

    await prisma.car.create({
      data: {
        id,
        name: String(name),
        model: String(model),
        img: String(img || "default-car.png"),
        location: String(location),
        reviewCount: 0,
        ratingNumber: 0,
        withDriver: String(withDriver ?? "بدون راننده"),
        rental: rental ?? createCarBodySchema.rental,
        capacity: capacity ?? createCarBodySchema.capacity,
        features: features ?? {},
        engine: engine ?? {},
        driverRental: driverRental ?? {},
        ownerId: userId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "خودرو با موفقیت ثبت شد",
      data: { id },
    });
  } catch (error) {
    console.error("Create car error:", error);
    return NextResponse.json({ error: "خطا در ثبت خودرو" }, { status: 500 });
  }
}
