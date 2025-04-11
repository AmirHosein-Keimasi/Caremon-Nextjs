import { ApiResponseType } from "@/types/api.response.tyle";
import { NextResponse } from "next/server";

export async function wrapWithTryCash<T>(callback :()=>Promise<ApiResponseType<T>>):Promise<ApiResponseType<T>>{
try {
   return await callback()
} catch (error) {
    if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      return NextResponse.json(
        { error: "خطای غیر منتظره رخ داده است" },
        { status: 500 },
      );
}
}