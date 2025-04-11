import prisma from "@/lib/prisma";

import { signinDto } from "@/dto/auth.dto";

import { parseBody, wrapWithTryCatch } from "@/utils/api.utils";

import { ApiResponseType } from "@/types/api.response.tyle";

import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<ApiResponseType<null>> {
  return wrapWithTryCatch(async () => {
    const [parseError, body] = await parseBody<signinDto>(request);

    if (parseError !== null) {
      return NextResponse.json(
        { error: parseError, data: null },
        { status: 400 },
      );
    }
    const foundUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!foundUser) {
      return NextResponse.json(
        { error: "کاربری با این مشخصات پیدا نشد " },
        { status: 404 },
      );
    }

    if (body.password !== foundUser.password) {
      return NextResponse.json(
        { error: "اطلاعات وارد شده اشتباه است" },
        { status: 401 },
      );
    }
    return NextResponse.json({ data: null }, { status: 201 });
  });
}

// export async function GET(request: Request): Promise<NextResponse> {
//   const users = await prisma.user.findMany();
//   return NextResponse.json(users);
// }
