import React from "react";

import { Briefcase, CarFront, Gauge, Users } from "lucide-react";

interface CarInfoProps {
  doors: number;
  passengers: number;
  luggage: number;
  transmission: string;
}

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

const CarInfoIcon: React.FC<CarInfoProps> = ({
  doors,
  passengers,
  luggage,
  transmission,
}) => (
  <div className="flex justify-center items-center gap-8 text-base flex-wrap text-foreground">
    <span>
      <CarFront className="text-primary" />{" "}
      {toPersianNumbers(doors)}
    </span>
    <span>
      <Users className="text-primary" />{" "}
      {toPersianNumbers(passengers)}
    </span>
    <span>
      <Briefcase className="text-primary" />{" "}
      {toPersianNumbers(luggage)}
    </span>
    <span>
      <Gauge className="text-primary" />{" "}
      {toPersianNumbers(transmission)}
    </span>
  </div>
);

export default CarInfoIcon;
