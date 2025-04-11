import { ApiResponseType } from "@/types/api.response.tyle";

import { cookies } from "next/headers";
import * as jose  from 'jose'

import { NextResponse } from "next/server";

type ParseBodyResult<T> = [error: null, data: T] | [error: string, data: null];
export async function parseBody<T>(
  request: Request,
): Promise<ParseBodyResult<T>> {
  try {
    const body = await request.json();
    return [null, body];
  } catch (error) {
    if (error instanceof Error) {
      return [error.message, null];
    }
    if (error === "string") {
      return [error, null];
    }
    return ["خطای غیر منتظره رخ داده است", null];
  }
}

export async function wrapWithTryCatch<T>(
  callback: () => Promise<ApiResponseType<T>>,
): Promise<ApiResponseType<T>> {
  try {
    return await callback();
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


const alg= "HS256"
const secretKey = new TextEncoder().encode(process.env.TOKEN_SECRET)
export async function setauthCookie() {
  const cookieStore = cookies()

  const token = await new jose.SignJWT().setProtectedHeader({alg}).setIssuedAt().setExpirationTime("3d").sign(secretKey)
  cookieStore.set (process.env.TOKEN_KEY!,token,{
    secure : true,
    httpOnly:true,
    sameSite:'none',
    maxAge:3*24*3600
  })
}