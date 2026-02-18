import { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";

import notFoundImage from "@/assets/illustrations/404.png";
import { Button } from "@/components/ui/button";

export default function NotFound(): ReactElement {
  return (
    <div className="flex min-h-[60vh] w-full max-w-4xl flex-col items-center justify-center gap-8 px-4 py-12 mx-auto">
      <div className="grid w-full gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="flex flex-col gap-4 text-center lg:text-right order-2 lg:order-1">
          <div className="text-6xl font-light leading-none text-primary lg:text-7xl">
            404
          </div>
          <h1 className="text-xl font-semibold">صفحه‌ی مورد نظر پیدا نشد!</h1>
          <p className="max-w-[50ch] text-sm text-muted-foreground mx-auto lg:mx-0">
            با عرض پوزش، صفحه مورد نظر شما در{" "}
            <span className="font-medium text-primary">کارمون</span> پیدا نشد.
            لطفاً از دکمه زیر به صفحه جستجو بروید یا از منو استفاده کنید.
          </p>
          <div className="flex justify-center lg:justify-start">
            <Button asChild>
              <Link href="/search">برو به جستجو</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center order-1 lg:order-2">
          <Image
            src={notFoundImage}
            alt="صفحه یافت نشد"
            width={300}
            height={200}
            className="h-auto max-h-[250px] w-full max-w-[80%] object-contain"
          />
        </div>
      </div>
    </div>
  );
}
