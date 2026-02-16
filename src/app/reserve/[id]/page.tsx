import React, { ReactElement } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

import { getCarById } from "@/lib/cars";

import CarInfo from "@/app/cars/[id]/components/car-info/car-info.component";
import PriceCar from "@/app/cars/[id]/components/price-car/price-car.component";

import ReserveForm from "./components/reserve-form";

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

  return (
    <div className="py-8 max-w-[var(--full-width)] mx-auto">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-2xl text-[var(--color-text-700)]">رزرو خودرو: {car.name}</h1>
        <Link href={`/cars/${car.id}`} className="text-[var(--color-primary)] text-sm transition-colors hover:text-[var(--color-primary-lighter)] hover:underline">
          بازگشت به جزئیات خودرو
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-8 items-start max-md:grid-cols-1">
        <div className="flex flex-col gap-4">
          <CarInfo car={car} />
          <PriceCar car={car} />
        </div>

        <div className="sticky top-4">
          <ReserveForm carId={car.id} carName={car.name} />
        </div>
      </div>
    </div>
  );
}
