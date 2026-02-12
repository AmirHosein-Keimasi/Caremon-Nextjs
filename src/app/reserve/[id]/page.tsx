import React, { ReactElement } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

import { getCarById } from "@/lib/cars";

import CarInfo from "@/app/cars/[id]/components/car-info/car-info.component";
import PriceCar from "@/app/cars/[id]/components/price-car/price-car.component";

import ReserveForm from "./components/reserve-form";

import styles from "./page.module.css";

type Props = {
  params: { id: string };
};

export default async function ReservePage({ params }: Props): Promise<ReactElement> {
  const car = await getCarById(params.id);

  if (!car) {
    return notFound();
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>رزرو خودرو: {car.name}</h1>
        <Link href={`/cars/${car.id}`} className={styles.backLink}>
          بازگشت به جزئیات خودرو
        </Link>
      </div>

      <div className={styles.content}>
        <div className={styles.carSummary}>
          <CarInfo car={car} />
          <PriceCar car={car} />
        </div>

        <div className={styles.formSection}>
          <ReserveForm carId={car.id} carName={car.name} />
        </div>
      </div>
    </div>
  );
}
