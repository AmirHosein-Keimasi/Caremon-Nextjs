import React, { PropsWithChildren } from "react";
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
    <div className="max-w-[var(--full-width)] mx-auto p-8 px-[var(--full-width-padding-inline)] text-[var(--color-text-400)]">
      <details className="[&_summary]:cursor-pointer [&_summary]:font-bold [&_summary]:list-none [&_summary]:before:content-['+'] [&_summary]:before:mr-2 [&[open]_summary]:before:content-['-']" open>
        <summary className="text-[1.8rem] text-[var(--color-primary)] mb-8 text-center pb-4 border-b-2 border-[var(--color-primary)] max-md:text-2xl">
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

export default Peugeot206RentalInfo;
