import React from "react";

import MingcuteUser2Fill from "@/icons/MingcuteUser2Fill";
import MingcuteSuitcaseFill from "@/icons/MingcuteSuitcaseFill";
import MingcuteCarWindowFill from "@/icons/MingcuteCarWindowFill";
import MaterialSymbolsAutoTransmission from "@/icons/MaterialSymbolsAutoTransmission";

import styles from "./car-infoIcon.module.css";

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
  <div className={styles.info}>
    <span>
      <MingcuteCarWindowFill className={styles.icon} />{" "}
      {toPersianNumbers(doors)}
    </span>
    <span>
      <MingcuteUser2Fill className={styles.icon} />{" "}
      {toPersianNumbers(passengers)}
    </span>
    <span>
      <MingcuteSuitcaseFill className={styles.icon} />{" "}
      {toPersianNumbers(luggage)}
    </span>
    <span>
      <MaterialSymbolsAutoTransmission className={styles.icon} />{" "}
      {toPersianNumbers(transmission)}
    </span>
  </div>
);

export default CarInfoIcon;
