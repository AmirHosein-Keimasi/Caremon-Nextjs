import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/utils/api.utils";
import prisma from "@/lib/prisma";

/** GET /api/auth/me — برگرداندن کاربر جاری با توکن */
export async function GET(request: Request) {
  const userId = await getCurrentUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "احراز هویت نشده" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, username: true, email: true },
  });

  if (!user) {
    return NextResponse.json({ error: "کاربر یافت نشد" }, { status: 404 });
  }

  return NextResponse.json(user);
}

/** POST /api/auth/me — برگرداندن کاربر جاری با توکن (سازگار با قبل) */
export async function POST(request: Request) {
  return GET(request);
}

/** PATCH /api/auth/me — به‌روزرسانی نام، نام کاربری و ایمیل */
export async function PATCH(request: Request) {
  const userId = await getCurrentUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "احراز هویت نشده" }, { status: 401 });
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
    const username = String(body.username ?? "").trim();
    const email = String(body.email ?? "").trim();

    if (!name) {
      return NextResponse.json(
        { error: "نام و نام خانوادگی الزامی است" },
        { status: 400 },
      );
    }
    if (!username) {
      return NextResponse.json(
        { error: "نام کاربری الزامی است" },
        { status: 400 },
      );
    }
    if (!email) {
      return NextResponse.json(
        { error: "ایمیل الزامی است" },
        { status: 400 },
      );
    }

    const existing = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!existing) {
      return NextResponse.json({ error: "کاربر یافت نشد" }, { status: 404 });
    }

    const [usernameTaken, emailTaken] = await Promise.all([
      prisma.user.findFirst({
        where: {
          username: username,
          id: { not: userId },
        },
      }),
      prisma.user.findFirst({
        where: {
          email: email,
          id: { not: userId },
        },
      }),
    ]);

    if (usernameTaken) {
      return NextResponse.json(
        { error: "این نام کاربری قبلاً استفاده شده است" },
        { status: 400 },
      );
    }
    if (emailTaken) {
      return NextResponse.json(
        { error: "این ایمیل قبلاً استفاده شده است" },
        { status: 400 },
      );
    }

    await prisma.user.update({
      where: { id: userId },
      data: { name, username, email },
    });

    const updated = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, username: true, email: true },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { error: "خطا در به‌روزرسانی پروفایل" },
      { status: 500 },
    );
  }
}
