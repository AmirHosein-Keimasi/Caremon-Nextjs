import React, { PropsWithChildren } from "react";

import CarInfoIcon from "@/components/car-info/car-infoIcon.component";
import CardComponent from "@/components/card-component/card-component";
import CompareButtonComponent from "@/components/compare-button/compare-button.component";

import { getCarImageUrl } from "@/lib/cars";
import { CarsModel } from "@/models/cars.model";

import Image from "next/image";

type Props = PropsWithChildren & {
  car: CarsModel;
};

const CarInfo = ({ car }: Props) => {
  return (
    <CardComponent>
      <div className="relative">
        <div className="relative rounded-lg overflow-hidden bg-muted/50 flex justify-center min-h-[200px] sm:min-h-[240px]">
          <Image
            src={getCarImageUrl(car.img)}
            alt={`${car.name} - ${car.model}`}
            className="object-contain w-full max-h-[280px]"
            width={580}
            height={280}
            priority
            unoptimized
          />
          <div className="absolute top-3 right-3 flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-amber-500 text-foreground shadow-md">
            <span className="font-bold tabular-nums">
              {Math.floor(car.ratingNumber * 10) / 10}
            </span>
            <span className="text-sm">از ۵</span>
            <span className="text-sm opacity-90">
              ({car.reviewCount.toLocaleString("fa-IR")} نظر)
            </span>
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center gap-3 pt-4 pb-1">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground m-0">
              {car.name}
            </h1>
            <p className="text-muted-foreground font-normal text-base mt-0.5 m-0">
              {car.model}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <CarInfoIcon
              doors={car.capacity.door}
              passengers={car.capacity.passengers}
              luggage={car.capacity.luggage}
              transmission={car.features.transmission}
            />
            <CompareButtonComponent carId={car.id} />
          </div>
        </div>
      </div>
    </CardComponent>
  );
};

export default CarInfo;
