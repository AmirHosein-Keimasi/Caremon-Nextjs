import React, { PropsWithChildren } from "react";

import { CarsModel } from "@/models/cars.model";

type Props = PropsWithChildren & {
  car: CarsModel;
};

const PriceCar = ({ car }: Props) => {
  const prices = [
    { daysRange: "۳ تا ۱۴ روز", price: car.rental.days_3_to_14 },
    { daysRange: "بیشتر از ۱۴ روز", price: car.rental.more_than_14_days },
    { daysRange: "ودیعه (دیپوزیت)", price: car.rental.deposit },
  ];

  return (
    <div className="bg-[var(--color-surface-400)] rounded-[var(--border-radius)] p-4 shadow-[var(--shadow-500)] mt-auto">
      <div className="text-[var(--color-primary)] py-2 text-start font-bold mb-4">
        اجاره بدون راننده{" "}
      </div>
      <div className="text-[var(--color-text-400)] text-[var(--fz-300)]">
        هزینه اجاره {car.name}
      </div>{" "}
      <span className="text-[var(--fz-200)] text-[var(--color-gray-70)]">
        {car.model}
      </span>
      <div className="mt-2">
        {prices.map((item, index) => (
          <div
            key={index}
            className="flex justify-between py-3 border-b border-[var(--color-border)]"
          >
            <span>{item.daysRange}:</span>
            <span className="font-bold text-[var(--color-primary)]">
              {item.price.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceCar;
