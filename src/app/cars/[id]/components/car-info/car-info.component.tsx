import React, { PropsWithChildren } from "react";

import CarInfoIcon from "@/components/car-info/car-infoIcon.component";
import CardComponent from "@/components/card-component/card-component";

import { CarsModel } from "@/models/cars.model";

import Image from "next/image";

import styles from "./car-info.module.css";

type Props = PropsWithChildren & {
  car: CarsModel;
};

const CarInfo = ({ car }: Props) => {
  return (
    <div className={styles.container}>
      {" "}
      <CardComponent>
        <div className={styles.info}>
          <div className={styles.images}>
            {" "}
            <Image
              src={`https://cafeerent.com/storage/www/cars/single/${car.img}`}
              alt={`${car.name} - ${car.model}`}
              className={styles.image}
              width={290}
              height={175}
              priority={false}
            />
            <div className={styles.rating}>
              <span className={styles.averagerating}>
                {Math.floor(car.ratingNumber * 10) / 10} از 5
              </span>
              <span className={styles.totalvotes}>
                ({car.ratingNumber.toLocaleString()} نظر)
              </span>
            </div>
          </div>
          <div className={styles.cardModel}>
            <div className={styles.title}>
              {car.name}
              <h5 className={styles.model}>({car.model})</h5>
            </div>

            <CarInfoIcon
              doors={car.capacity.door}
              passengers={car.capacity.passengers}
              luggage={car.capacity.luggage}
              transmission={car.features.transmission}
            />
          </div>
        </div>
      </CardComponent>
    </div>
  );
};

export default CarInfo;
