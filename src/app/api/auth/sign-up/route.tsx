import prisma from "@/lib/prisma";
import { ApiResponseType } from "@/types/api.response.tyle";
import { wrapWithTryCash } from "@/utils/api.utils";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<ApiResponseType<null>> {
  return wrapWithTryCash(async () => {
    const body = await request.json();

    await prisma.user.create({ data: body });

    return NextResponse.json({ data: null }, { status: 201 });
  });
}

// export async function GET(request: Request): Promise<NextResponse> {
//   const users = await prisma.user.findMany();
//   return NextResponse.json(users);
// }
