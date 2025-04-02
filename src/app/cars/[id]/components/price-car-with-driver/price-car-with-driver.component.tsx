import React, { PropsWithChildren } from "react";

import { CarsModel } from "@/models/cars.model";

import styles from "./price-car-with-driver.module.css";

type Props = PropsWithChildren & {
  car: CarsModel;
};

const DriverPriceCar = ({ car }: Props) => {
  const rentalOptions = [
    { label: "۱۰ ساعت داخل شهری", price: car.driver_rental.hourly_10 },
    {
      label: "بین شهری (هر کیلومتر)",
      price: car.driver_rental.intercity_per_km,
    },
    { label: "ترانسفر فرودگاهی", price: car.driver_rental.airport_transfer },
  ];
  return (
    <div className={styles.card}>
      <div className={styles.header}>اجاره همراه با راننده </div>
      <div className={styles.model}>هزینه اجاره {car.name}</div>{" "}
      <span className={styles.year}>{car.model}</span>
      <div className={styles.priceList}>
        {rentalOptions.map((option, index) => (
          <div key={index} className={styles.priceItem}>
            <span>{option.label}:</span>
            <span className={styles.price}>
              {option.price.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverPriceCar;
