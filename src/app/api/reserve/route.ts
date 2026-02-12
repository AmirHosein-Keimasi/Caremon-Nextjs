import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { carId, carName, name, phone, email, startDate, endDate } = body;

    if (
      !carId ||
      !carName ||
      !name ||
      !phone ||
      !email ||
      !startDate ||
      !endDate
    ) {
      return NextResponse.json(
        { error: "تمام فیلدها الزامی است" },
        { status: 400 },
      );
    }

    await prisma.reservation.create({
      data: {
        carId,
        carName,
        name: String(name),
        phone: String(phone),
        email: String(email),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    return NextResponse.json({
      success: true,
      message: "رزرو با موفقیت ثبت شد",
    });
  } catch (error) {
    console.error("Reserve error:", error);
    return NextResponse.json({ error: "خطا در ثبت رزرو" }, { status: 500 });
  }
}
