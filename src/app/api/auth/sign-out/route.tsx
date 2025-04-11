import { removeAuthCookie, wrapWithTryCatch } from "@/utils/api.utils";

import { ApiResponseType } from "@/types/api.response.tyle";

import { NextResponse } from "next/server";

export async function POST(): Promise<ApiResponseType<null>> {
  return wrapWithTryCatch(async () => {
    await removeAuthCookie();
    return NextResponse.json({ data: null }, { status: 201 });
  });
}
