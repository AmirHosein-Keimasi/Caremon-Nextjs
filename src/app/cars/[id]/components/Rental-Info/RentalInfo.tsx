import React, { PropsWithChildren } from "react";
import RentalRequirements from "./RentalRequirements";
import LuggageGuide from "./LuggageGuide";
import InsuranceInfo from "./InsuranceInfo";
import FAQ from "./FAQ";
import { CarsModel } from "@/models/cars.model";

import styles from "./RentalInfo.module.css";

type Props = PropsWithChildren & {
  car: CarsModel;
};
const RentalInfo = ({ car }: Props) => {
  return (
    <div className={styles.container}>
      <details className={styles.details} open>
        <summary className={styles.mainTitle}>
          مدارک و شرایط اجاره {car.name} در {car.location}
        </summary>
        <RentalRequirements />

        <LuggageGuide luggage={car.capacity.luggage} />

        <InsuranceInfo carName={car.name} />

        <FAQ car={car} />
      </details>
    </div>
  );
};

export default RentalInfo;
