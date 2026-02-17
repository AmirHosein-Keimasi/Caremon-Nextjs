"use client";

import { ReactElement, useContext } from "react";
import Link from "next/link";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CarsContext } from "../../providers/cars.provider";
import CarInfoIcon from "@/components/car-info/car-infoIcon.component";
import CompareButtonComponent from "@/components/compare-button/compare-button.component";

import { Settings, MapPin, Check } from "lucide-react";

const toPersianNumbers = (num: number | string): string => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const numStr = num.toString();
  if (!/\d/.test(numStr)) {
    return numStr;
  }
  return numStr
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    .replace(/\d/g, (d) => persianDigits[parseInt(d, 10)]);
};

const LocationBadge = ({ label }: { label: string | boolean | number }) => {
  const displayValue =
    typeof label === "boolean" ? (label ? "بله" : "خیر") : label.toString();
  return <Badge variant="secondary">{displayValue}</Badge>;
};

export default function ResultsComponent(): ReactElement {
  const { filteredCars } = useContext(CarsContext);

  if (!filteredCars?.length) {
    return (
      <div className="text-center py-8 text-foreground">
        نتیجه‌ای یافت نشد
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-[repeat(3,minmax(280px,1fr))] gap-4 justify-center">
      {filteredCars.map((car) => (
        <Card key={car.id} className="relative overflow-hidden">
          <CardContent className="p-8 text-center">
            <div className="flex items-center gap-2 absolute top-4 right-4">
              <MapPin className="text-amber-500 text-base mb-[-0.05em]" />
              <LocationBadge label={car.location} />
            </div>

            <div>
              <Image
                src={`https://cafeerent.com/storage/www/cars/single/${car.img}`}
                alt={`${car.name} - ${car.model}`}
                className="rounded-lg object-contain"
                width={270}
                height={160}
                priority={false}
              />
            </div>

            <div className="flex justify-between items-center p-2 relative">
              <h3 className="text-lg font-bold my-1.5 mx-0 text-primary">
                {car.name}
              </h3>
              <p className="flex justify-between items-center p-2 relative">{car.model}</p>
            </div>

            <CarInfoIcon
              doors={car.capacity.door}
              passengers={car.capacity.passengers}
              luggage={car.capacity.luggage}
              transmission={car.features.transmission}
            />

            <div className="flex flex-col items-start p-3 mt-4">
              <div className="flex justify-between w-full text-base">
                <span>حداقل اجاره: </span>
                <span>
                  <span className="font-semibold pl-0.5 text-foreground">
                    {toPersianNumbers(car.rental.minimum_rental)}
                  </span>
                  روز{" "}
                </span>
              </div>
              <div className="flex justify-between w-full text-base">
                <span>۳ تا ۱۴ روز:</span>
                <span>
                  <span className="font-semibold pl-0.5 text-foreground">
                    {toPersianNumbers(car.rental.days_3_to_14)}
                  </span>{" "}
                  تومان
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <div className="flex flex-wrap gap-2">
                <Button asChild>
                  <Link href={`/cars/${car.id}`} className="gap-2">
                    بیشتر... <Settings />
                  </Link>
                </Button>
                <CompareButtonComponent carId={car.id} />
              </div>
              <Button asChild variant="destructive">
                <Link href={`/reserve/${car.id}`} className="gap-2">
                  همین الان رزرو کنید <Check />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </ul>
  );
}
