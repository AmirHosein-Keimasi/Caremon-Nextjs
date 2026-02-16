"use client";

import { ReactElement } from "react";

import Image from "next/image";

import errorImage from "@/assets/illustrations/errorImage.png";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props): ReactElement {
  return (
    <div className="grid grid-areas-[writings_visuals;actions_actions;trace_trace] grid-cols-2 place-content-center gap-x-20 mb-12 min-h-full">
      <div className="[grid-area:writings]">
        <div className="text-[var(--fz-700)] font-bold">مشکل پیش آمده!</div>
        <h1 className="mb-8 text-[var(--fz-500)]">یک خطای غیرمنتظره رخ داده است.</h1>
        <p>
          با عرض پوزش، لطفاً با تیم پشتیبانی سایت <span>کا‌‌‌‌رِمون</span> تماس
          بگیرید.
        </p>
        <div className="[grid-area:actions] col-span-2">
          <button
            onClick={reset}
            className="bg-[var(--color-primary)] text-[var(--color-primary-opposite)] px-8 py-2 border-none rounded-[var(--border-radius)] text-base font-black mt-4 cursor-pointer"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
      <div className="[grid-area:visuals] object-contain">
        <Image src={errorImage} alt="" width={250} />
      </div>

      <div className="[grid-area:trace] min-w-full w-0">
        <details>
          <summary className="cursor-pointer">لاگ خطا</summary>
          <pre className="overflow-auto max-h-48" dir="ltr">
            {error.stack}
          </pre>
        </details>
      </div>
    </div>
  );
}
