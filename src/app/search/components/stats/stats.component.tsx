"use client";

import { ReactElement, useContext } from "react";

import { CarsContext } from "../../providers/cars.provider";

export default function StatsComponent(): ReactElement {
  const { filteredCars } = useContext(CarsContext);
  const persianNumber = new Intl.NumberFormat("fa-IR").format(
    filteredCars.length,
  );
  return (
    <div className="flex items-center rtl gap-1">
      {persianNumber}
      <span>نتیجه</span>
    </div>
  );
}
