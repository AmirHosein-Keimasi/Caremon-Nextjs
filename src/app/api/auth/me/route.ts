import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/utils/api.utils";
import prisma from "@/lib/prisma";

/** POST /api/auth/me — برگرداندن کاربر جاری با توکن */
export async function POST(request: Request) {
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
