import React from "react";
import styles from "./car-details.module.css";
import CardComponent from "@/components/card-component/card-component";
import { CarsModel } from "@/models/cars.model";

type Props = {
  car: CarsModel;
};

const SpecsAndFeatures = ({ car }: Props) => {
  return (
    <CardComponent>
      <div className={styles.container}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>مشخصات فنی</h2>

          <div className={styles.specItem}>
            <span className={styles.specLabel}>نوع موتور</span>
            <span className={styles.specValue}>{car.engine.type}</span>
          </div>

          <div className={styles.specItem}>
            <span className={styles.specLabel}>حجم موتور (لیتر)</span>
            <span className={styles.specValue}>{car.engine.capacity}</span>
          </div>

          <div className={styles.specItem}>
            <span className={styles.specLabel}>سیستم انتقال قدرت</span>
            <span className={styles.specValue}>
              {car.features.transmission}
            </span>
          </div>

          <div className={styles.specItem}>
            <span className={styles.specLabel}>تعداد سیلندر</span>
            <span className={styles.specValue}>{car.engine.cylinders}</span>
          </div>

          <div className={styles.specItem}>
            <span className={styles.specLabel}>ظرفیت سرنشین</span>
            <span className={styles.specValue}>
              {car.capacity.passengers} نفر
            </span>
          </div>

          <div className={styles.specItem}>
            <span className={styles.specLabel}>حجم صندوق عقب</span>
            <span className={styles.specValue}>
              {car.capacity.luggage} چمدان
            </span>
          </div>
        </div>
      </div>
    </CardComponent>
  );
};

export default SpecsAndFeatures;
