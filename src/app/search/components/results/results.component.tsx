"use client";

import { ReactElement, useContext } from "react";

import Link from "next/link";
import Image from "next/image";

import { CarsContext } from "../../providers/cars.provider";

import CarInfoIcon from "@/components/car-info/car-infoIcon.component";

import MingcuteSettings4Line from "@/icons/MingcuteSettings4Line";
import MingcuteLocationLine from "@/icons/MingcuteLocationLine";
import MingcuteCheckboxFill from "@/icons/MingcuteCheckboxFill";

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

interface BadgeProps {
  label: string | boolean | number;
}

const Badge = ({ label }: BadgeProps) => {
  const displayValue =
    typeof label === "boolean" ? (label ? "بله" : "خیر") : label.toString();
  return (
    <div className="px-2 py-1 bg-[var(--color-surface-400)] rounded-md text-sm">
      {displayValue}
    </div>
  );
};

export default function ResultsComponent(): ReactElement {
  const { filteredCars } = useContext(CarsContext);

  if (!filteredCars?.length) {
    return (
      <div className="text-center py-8 text-[var(--color-text-700)]">
        نتیجه‌ای یافت نشد
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-[repeat(3,minmax(280px,1fr))] gap-4 justify-center">
      {filteredCars.map((car) => (
        <li
          key={car.id}
          className="bg-[var(--color-surface-700)] rounded-[var(--border-radius)] shadow-[var(--shadow-400)] p-8 text-center transition-[box-shadow] duration-[var(--animation-duration-normal)] relative hover:shadow-[var(--shadow-700)]"
        >
          <div className="flex items-center gap-2 absolute top-4 right-4 rounded-[var(--border-radius)] text-[var(--fz-300)] text-[var(--color-text-700)]">
            <MingcuteLocationLine className="text-[var(--color-star)] text-[var(--fz-400)] mb-[-0.05em]" />
            <Badge label={car.location} />
          </div>

          <div>
            <Image
              src={`https://cafeerent.com/storage/www/cars/single/${car.img}`}
              alt={`${car.name} - ${car.model}`}
              className="rounded-[var(--border-radius)] object-contain"
              width={270}
              height={160}
              priority={false}
            />
          </div>

          <div className="flex justify-between items-center p-2 relative">
            <h3 className="text-[var(--fz-500)] font-bold my-1.5 mx-0 text-[var(--color-primary)]">
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
            <div className="flex justify-between w-full text-[var(--fz-400)]">
              <span>حداقل اجاره: </span>
              <span>
                <span className="font-semibold pl-0.5 text-[var(--color-text-400)]">
                  {toPersianNumbers(car.rental.minimum_rental)}
                </span>
                روز{" "}
              </span>
            </div>
            <div className="flex justify-between w-full text-[var(--fz-400)]">
              <span>۳ تا ۱۴ روز:</span>
              <span>
                <span className="font-semibold pl-0.5 text-[var(--color-text-400)]">
                  {toPersianNumbers(car.rental.days_3_to_14)}
                </span>{" "}
                تومان
              </span>
            </div>
          </div>

          <Link
            className="px-8 py-2 rounded-[var(--border-radius)] text-[var(--color-default-background)] text-center font-bold flex items-center justify-center gap-2 mt-2 transition-[color] duration-[var(--animation-duration-normal)] bg-[var(--color-primary)] text-[var(--color-gray-93)]"
            href={`/cars/${car.id}`}
          >
            بیشتر... <MingcuteSettings4Line />
          </Link>

          <Link
            className="px-8 py-2 rounded-[var(--border-radius)] text-[var(--color-default-background)] text-center font-bold flex items-center justify-center gap-2 mt-2 transition-[color] duration-[var(--animation-duration-normal)] bg-[var(--color-danger)] text-[var(--color-gray-93)]"
            href={`/reserve/${car.id}`}
          >
            همین الان رزرو کنید <MingcuteCheckboxFill />
          </Link>
        </li>
      ))}
    </ul>
  );
}
