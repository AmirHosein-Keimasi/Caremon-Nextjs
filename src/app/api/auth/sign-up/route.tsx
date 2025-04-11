import prisma from "@/lib/prisma";

import { signupDto } from "@/dto/auth.dto";

import { parsBody, wrapWithTryCash } from "@/utils/api.utils";

import { ApiResponseType } from "@/types/api.response.tyle";

import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<ApiResponseType<null>> {
  return wrapWithTryCash(async () => {
    const [parseError, body] = await parsBody<signupDto>(request);

    if (parseError !== null) {
      return NextResponse.json({ data: parseError }, { status: 400 });
    }
    await prisma.user.create({ data: body });

    return NextResponse.json({ data: null }, { status: 201 });
  });
}

// export async function GET(request: Request): Promise<NextResponse> {
//   const users = await prisma.user.findMany();
//   return NextResponse.json(users);
// }
