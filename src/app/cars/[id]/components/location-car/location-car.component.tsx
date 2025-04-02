import React, { PropsWithChildren } from "react";
import styles from "./location-car.module.css";
import MingcuteLocationLine from "@/icons/MingcuteLocationLine";
import CardComponent from "@/components/card-component/card-component";
import { CarsModel } from "@/models/cars.model";
type Props = PropsWithChildren & {
  car: CarsModel;
};
const LocationCar = ({ car }: Props) => {
  return (
    <CardComponent>
      <div className={styles.container}>
        <span>
          <p className={styles.title}>
            {" "}
            <MingcuteLocationLine className={styles.icon} />
            محل خودرو و تحویل
          </p>
          <p className={styles.loc}>{car.location}</p>
          <p className={styles.locText}>
            در محدوده {car.location}، خودرو در محل شما تحویل می‌شود.
          </p>
        </span>
      </div>
    </CardComponent>
  );
};

export default LocationCar;
