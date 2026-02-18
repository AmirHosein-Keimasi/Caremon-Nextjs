"use client";

import { ReactElement } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import errorImage from "@/assets/illustrations/errorImage.png";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props): ReactElement {
  return (
    <div className="flex min-h-[60vh] w-full max-w-4xl flex-col items-center justify-center gap-8 px-4 py-12 mx-auto">
      <div className="grid w-full gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="flex flex-col gap-4 text-center lg:text-right">
          <h1 className="text-2xl font-bold">مشکل پیش آمده!</h1>
          <p className="text-muted-foreground">
            یک خطای غیرمنتظره رخ داده است.
          </p>
          <p className="text-sm text-muted-foreground">
            با عرض پوزش، لطفاً با تیم پشتیبانی سایت{" "}
            <span className="font-medium text-foreground">کارمون</span> تماس
            بگیرید.
          </p>
          <div className="flex justify-center lg:justify-start">
            <Button onClick={reset} className="mt-2">
              تلاش مجدد
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src={errorImage}
            alt=""
            width={250}
            height={250}
            className="object-contain"
          />
        </div>
      </div>

      <details className="w-full max-w-2xl rounded-lg border bg-muted/30">
        <summary className="cursor-pointer px-4 py-3 font-medium">
          لاگ خطا
        </summary>
        <pre
          className="overflow-auto max-h-48 p-4 text-xs text-muted-foreground"
          dir="ltr"
        >
          {error?.message}
          {error?.stack}
        </pre>
      </details>
    </div>
  );
}
