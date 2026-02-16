import React, { PropsWithChildren } from "react";

import { CarsModel } from "@/models/cars.model";

type Props = PropsWithChildren & {
  car: CarsModel;
};

const DriverPriceCar = ({ car }: Props) => {
  const rentalOptions = [
    { label: "۱۰ ساعت داخل شهری", price: car.driver_rental.hourly_10 },
    {
      label: "بین شهری (هر کیلومتر)",
      price: car.driver_rental.intercity_per_km,
    },
    { label: "ترانسفر فرودگاهی", price: car.driver_rental.airport_transfer },
  ];
  return (
    <div className="bg-[var(--color-surface-400)] rounded-[var(--border-radius)] p-4 shadow-[var(--shadow-500)] mt-auto">
      <div className="text-[var(--color-primary)] py-2 text-start font-bold mb-4">
        اجاره همراه با راننده{" "}
      </div>
      <div className="text-[var(--color-text-400)] text-[var(--fz-300)]">
        هزینه اجاره {car.name}
      </div>{" "}
      <span className="text-[var(--fz-200)] text-[var(--color-gray-70)]">
        {car.model}
      </span>
      <div className="mt-2">
        {rentalOptions.map((option, index) => (
          <div
            key={index}
            className="flex justify-between py-3 border-b border-[var(--color-border)]"
          >
            <span>{option.label}:</span>
            <span className="font-bold text-[var(--color-primary)]">
              {option.price.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverPriceCar;
