import React, { ReactElement } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { getCarById } from "@/lib/cars";

import ReserveForm from "./components/reserve-form";
import Image from "next/image";

type Props = {
  params: { id: string };
};

export default async function ReservePage({
  params,
}: Props): Promise<ReactElement> {
  const car = await getCarById(params.id);

  if (!car) {
    return notFound();
  }

  const pricePerDay = car.rental.days_3_to_14 ?? 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/40 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        {/* Breadcrumb + Back */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 lg:mb-8">
          <Link
            href={`/cars/${car.id}`}
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <ChevronLeft className="size-4" />
            بازگشت به جزئیات خودرو
          </Link>
          <span className="opacity-60">/</span>
          <span className="text-foreground font-medium">رزرو</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-6 xl:gap-10 items-start">
          {/* Left: Car summary card */}
          <div className="order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden border border-border/60 bg-card shadow-lg">
              <div className="relative aspect-[16/10] sm:aspect-[2/1] bg-muted/60">
                <Image
                  src={`https://cafeerent.com/storage/www/cars/single/${car.img}`}
                  alt={car.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                  <h1 className="text-xl sm:text-2xl font-bold m-0 drop-shadow-md">
                    {car.name}
                  </h1>
                  <p className="text-white/90 text-sm mt-0.5 m-0">{car.model}</p>
                </div>
              </div>
              <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 border-t border-border/50">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5 m-0">
                    قیمت از
                  </p>
                  <p className="text-lg font-bold text-primary m-0">
                    {pricePerDay.toLocaleString("fa-IR")}
                    <span className="text-sm font-normal text-muted-foreground mr-1">
                      تومان / روز
                    </span>
                  </p>
                </div>
                <Link
                  href={`/cars/${car.id}`}
                  className="text-sm text-primary hover:underline font-medium"
                >
                  مشاهده مشخصات
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-6">
            <ReserveForm
              carId={car.id}
              carName={car.name}
              carImage={car.img}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
