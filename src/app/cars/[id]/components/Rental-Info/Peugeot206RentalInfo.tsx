import React, { PropsWithChildren } from "react";
import styles from "./Peugeot206RentalInfo.module.css";
import RentalRequirements from "./RentalRequirements";
import LuggageGuide from "./LuggageGuide";
import InsuranceInfo from "./InsuranceInfo";
import FAQ from "./FAQ";
import { CarsModel } from "@/models/cars.model";

type Props = PropsWithChildren & {
  car: CarsModel;
};
const Peugeot206RentalInfo = ({ car }: Props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>
        مدارک و شرایط اجاره {car.name} در {car.location}
      </h1>

      <RentalRequirements />

      <LuggageGuide luggage={car.capacity.luggage} />

      <InsuranceInfo carName={car.name} />

      <FAQ car={car} />
    </div>
  );
};

export default Peugeot206RentalInfo;
