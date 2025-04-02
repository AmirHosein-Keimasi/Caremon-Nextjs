import React, { ReactElement } from "react";
import { notFound } from "next/navigation";

import { cars } from "@/db/cars";

import styles from "./page.module.css";

import CarInfo from "./components/car-info/car-info.component";
import PriceCar from "./components/price-car/price-car.component";
import LocationCar from "./components/location-car/location-car.component";
import Features from "./components/features/features.component";
import DriverPriceCar from "./components/price-car-with-driver/price-car-with-driver.component";
import SpecsAndFeatures from "./components/car-details/car-details.component";
import Peugeot206RentalInfo from "./components/Rental-Info/Peugeot206RentalInfo";

type Props = {
  params: { id: string };
};

export default function Page({ params }: Props): ReactElement {
  const car = cars.find((x) => x.id === params.id);

  if (!car) {
    return notFound();
  }

  return (
    <div className={styles.page}>
      <div className={styles.carInfo}>
        <CarInfo car={car} />
      </div>

      <div className={styles.Prices}>
        <PriceCar car={car} />
        <DriverPriceCar car={car} />
      </div>

      <div className={styles.locationCar}>
        <LocationCar car={car} />
        <Features features={car.features} />
      </div>

      <div className={styles.SpecsAndFeatures}>
        <SpecsAndFeatures car={car} />
      </div>

      <div className={styles.rentalInfo}>
        <Peugeot206RentalInfo car={car} />
      </div>
    </div>
  );
}
