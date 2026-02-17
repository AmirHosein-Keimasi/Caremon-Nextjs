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
    <div className="bg-card rounded-lg p-4 shadow-lg mt-auto">
      <div className="text-primary py-2 text-start font-bold mb-4">
        اجاره بدون راننده{" "}
      </div>
      <div className="text-foreground text-sm">
        هزینه اجاره {car.name}
      </div>{" "}
      <span className="text-xs text-muted-foreground">
        {car.model}
      </span>
      <div className="mt-2">
        {prices.map((item, index) => (
          <div
            key={index}
            className="flex justify-between py-3 border-b border-border"
          >
            <span>{item.daysRange}:</span>
            <span className="font-bold text-primary">
              {item.price.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceCar;
