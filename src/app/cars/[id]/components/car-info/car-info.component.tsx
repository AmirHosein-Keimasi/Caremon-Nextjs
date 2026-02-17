import React, { PropsWithChildren } from "react";

import CarInfoIcon from "@/components/car-info/car-infoIcon.component";
import CardComponent from "@/components/card-component/card-component";
import CompareButtonComponent from "@/components/compare-button/compare-button.component";

import { CarsModel } from "@/models/cars.model";

import Image from "next/image";

type Props = PropsWithChildren & {
  car: CarsModel;
};

const CarInfo = ({ car }: Props) => {
  return (
    <div>
      {" "}
      <CardComponent>
        <div className="relative">
          <div>
            {" "}
            <Image
              src={`https://cafeerent.com/storage/www/cars/single/${car.img}`}
              alt={`${car.name} - ${car.model}`}
              className="rounded-lg object-contain"
              width={290}
              height={175}
              priority={false}
            />
            <div className="bg-amber-500 flex items-baseline gap-1 justify-between py-1 px-3 rounded-full absolute top-2 left-2 text-foreground">
              <span className="font-bold">
                {Math.floor(car.ratingNumber * 10) / 10} از 5
              </span>
              <span className="text-sm">
                ({car.reviewCount.toLocaleString("fa-IR")} نظر)
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center p-2 relative">
            <div className="font-bold">
              {car.name}
              <h5 className="flex justify-between items-center p-2 relative font-light">
                ({car.model})
              </h5>
            </div>

            <CarInfoIcon
              doors={car.capacity.door}
              passengers={car.capacity.passengers}
              luggage={car.capacity.luggage}
              transmission={car.features.transmission}
            />
            <CompareButtonComponent carId={car.id} className="mt-2" />
          </div>
        </div>
      </CardComponent>
    </div>
  );
};

export default CarInfo;
