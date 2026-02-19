import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/utils/api.utils";
import prisma from "@/lib/prisma";
import {
  mergeRental,
  mergeCapacity,
  mergeFeatures,
  mergeEngine,
  mergeDriverRental,
} from "@/lib/car-api-helpers";
import { prismaCarToModel } from "@/lib/cars";

type Params = { params: Promise<{ id: string }> };

/** GET /api/cars/[id] — دریافت یک خودرو (فقط مالک برای ویرایش) */
export async function GET(_request: Request, { params }: Params) {
  const userId = await getCurrentUserId(_request);
  if (!userId) {
    return NextResponse.json(
      { error: "ورود به حساب کاربری الزامی است" },
      { status: 401 },
    );
  }

  const { id } = await params;
  const car = await prisma.car.findUnique({
    where: { id },
    include: { owner: { select: { name: true } } },
  });

  if (!car) {
    return NextResponse.json({ error: "خودرو یافت نشد" }, { status: 404 });
  }

  if (car.ownerId !== userId) {
    return NextResponse.json(
      { error: "شما اجازهٔ مشاهده یا ویرایش این خودرو را ندارید" },
      { status: 403 },
    );
  }

  return NextResponse.json({
    success: true,
    data: prismaCarToModel(car),
  });
}

/** PATCH /api/cars/[id] — ویرایش خودرو (فقط مالک) */
export async function PATCH(request: Request, { params }: Params) {
  const userId = await getCurrentUserId(request);
  if (!userId) {
    return NextResponse.json(
      { error: "ورود به حساب کاربری الزامی است" },
      { status: 401 },
    );
  }

  const { id } = await params;
  const existing = await prisma.car.findUnique({ where: { id } });

  if (!existing) {
    return NextResponse.json({ error: "خودرو یافت نشد" }, { status: 404 });
  }

  if (existing.ownerId !== userId) {
    return NextResponse.json(
      { error: "شما اجازهٔ ویرایش این خودرو را ندارید" },
      { status: 403 },
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

    const name = String(body.name ?? existing.name).trim();
    const model = String(body.model ?? existing.model).trim();
    const location = String(body.location ?? existing.location).trim();
    const img = String(body.img ?? existing.img).trim() || "default-car.png";
    const withDriver =
      String(body.withDriver ?? existing.withDriver).trim() || "بدون راننده";

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

    await prisma.car.update({
      where: { id },
      data: {
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
      },
    });

    return NextResponse.json({
      success: true,
      message: "خودرو با موفقیت به‌روزرسانی شد",
      data: { id },
    });
  } catch (error) {
    console.error("Update car error:", error);
    return NextResponse.json(
      { error: "خطا در به‌روزرسانی خودرو" },
      { status: 500 },
    );
  }
}

/** DELETE /api/cars/[id] — حذف خودرو (فقط مالک) */
export async function DELETE(_request: Request, { params }: Params) {
  const userId = await getCurrentUserId(_request);
  if (!userId) {
    return NextResponse.json(
      { error: "ورود به حساب کاربری الزامی است" },
      { status: 401 },
    );
  }

  const { id } = await params;
  const car = await prisma.car.findUnique({ where: { id } });

  if (!car) {
    return NextResponse.json({ error: "خودرو یافت نشد" }, { status: 404 });
  }

  if (car.ownerId !== userId) {
    return NextResponse.json(
      { error: "شما اجازهٔ حذف این خودرو را ندارید" },
      { status: 403 },
    );
  }

  try {
    await prisma.car.delete({ where: { id } });
    return NextResponse.json({
      success: true,
      message: "خودرو با موفقیت حذف شد",
    });
  } catch (error) {
    console.error("Delete car error:", error);
    return NextResponse.json({ error: "خطا در حذف خودرو" }, { status: 500 });
  }
}
