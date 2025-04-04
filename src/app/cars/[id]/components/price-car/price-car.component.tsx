import React, { PropsWithChildren } from "react";

import styles from "./price-car.module.css";
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
    <div className={styles.card}>
      <div className={styles.header}>اجاره بدون راننده </div>
      <div className={styles.model}>هزینه اجاره {car.name}</div>{" "}
      <span className={styles.year}>{car.model}</span>
      <div className={styles.priceList}>
        {prices.map((item, index) => (
          <div key={index} className={styles.priceItem}>
            <span>{item.daysRange}:</span>
            <span className={styles.price}>
              {item.price.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceCar;
