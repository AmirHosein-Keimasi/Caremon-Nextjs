import prisma from "@/lib/prisma";

import { signupDto } from "@/dto/auth.dto";

import { parseBody, wrapWithTryCatch } from "@/utils/api.utils";

import { ApiResponseType } from "@/types/api.response.tyle";

import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<ApiResponseType<null>> {
  return wrapWithTryCatch(async () => {
    const [parseError, body] = await parseBody<signupDto>(request);

    if (parseError !== null) {
      return NextResponse.json(
        { error: parseError, data: null },
        { status: 400 },
      );
    }
    let foundUser = await prisma.user.findUnique({
      where: { username: body.username },
    });

    if (foundUser) {
      return NextResponse.json(
        { error: "نام کاربر تکراری است" },
        { status: 400 },
      );
    }
    foundUser = await prisma.user.findUnique({
      where: { username: body.email },
    });

    if (foundUser) {
      return NextResponse.json(
        { error: "ایمیل کاربر تکراری است" },
        { status: 400 },
      );
    }
    await prisma.user.create({ data: body });
    return NextResponse.json({ data: null }, { status: 201 });
  });
}

// export async function GET(request: Request): Promise<NextResponse> {
//   const users = await prisma.user.findMany();
//   return NextResponse.json(users);
// }
