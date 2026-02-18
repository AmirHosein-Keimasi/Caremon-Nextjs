import { NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";
import * as jose from "jose";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.TOKEN_SECRET || "caremon-default-secret-change-in-production";
const JWT_EXPIRY = "7d";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "ایمیل و رمز عبور الزامی است" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { error: "ایمیل یا رمز عبور اشتباه است" },
        { status: 401 },
      );
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json(
        { error: "ایمیل یا رمز عبور اشتباه است" },
        { status: 401 },
      );
    }

    const secret = new TextEncoder().encode(JWT_SECRET);
    const accessToken = await new jose.SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(JWT_EXPIRY)
      .sign(secret);

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
      accessToken,
      expiresIn: 7 * 24 * 60 * 60,
      success: true,
    });
  } catch (error) {
    console.error("Signin error:", error);
    return NextResponse.json({ error: "خطا در ورود" }, { status: 500 });
  }
}
