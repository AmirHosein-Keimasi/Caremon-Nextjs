import { NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, username, email, password } = body;

    if (!name || !username || !email || !password) {
      return NextResponse.json(
        { error: "نام، نام کاربری، ایمیل و رمز عبور الزامی است" },
        { status: 400 },
      );
    }

    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (existing) {
      return NextResponse.json(
        { error: "این ایمیل یا نام کاربری قبلاً ثبت شده است" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, username, email, password: hashedPassword },
      select: { id: true, name: true, username: true, email: true },
    });

    return NextResponse.json({ user, success: true });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "خطا در ثبت نام" }, { status: 500 });
  }
}
