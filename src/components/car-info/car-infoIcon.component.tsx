import React from "react";

import MingcuteUser2Fill from "@/icons/MingcuteUser2Fill";
import MingcuteSuitcaseFill from "@/icons/MingcuteSuitcaseFill";
import MingcuteCarWindowFill from "@/icons/MingcuteCarWindowFill";
import MaterialSymbolsAutoTransmission from "@/icons/MaterialSymbolsAutoTransmission";

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
  <div className="flex justify-center items-center gap-8 text-[var(--fz-400)] flex-wrap text-[var(--color-text-400)]">
    <span>
      <MingcuteCarWindowFill className="text-[var(--color-primary)]" />{" "}
      {toPersianNumbers(doors)}
    </span>
    <span>
      <MingcuteUser2Fill className="text-[var(--color-primary)]" />{" "}
      {toPersianNumbers(passengers)}
    </span>
    <span>
      <MingcuteSuitcaseFill className="text-[var(--color-primary)]" />{" "}
      {toPersianNumbers(luggage)}
    </span>
    <span>
      <MaterialSymbolsAutoTransmission className="text-[var(--color-primary)]" />{" "}
      {toPersianNumbers(transmission)}
    </span>
  </div>
);

export default CarInfoIcon;
