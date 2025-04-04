import React from "react";
import styles from "./features.module.css";
import CardComponent from "@/components/card-component/card-component";
import MingcuteCarLine from "@/icons/MingcuteCarLine";

type FeaturesProps = {
  features: {
    chassis_type: string;
    cruise_control: boolean;
    hill_start_assist: boolean;
    air_conditioning: boolean;
    rear_sensor: boolean;
    gps: boolean;
    apple_carplay: boolean;
    seat_heating: boolean;
    seat_cooling: boolean;
    auto_park: boolean;
    auto_drive: boolean;
    panoramic_roof: boolean;
    [key: string]: boolean | string | string[];
  };
  connectivity?: string[];
  braking_system?: string[];
};

const featureNames: { [key: string]: string } = {
  chassis_type: "مدل ماشین",
  cruise_control: "کروز کنترل",
  panoramic_roof: "سانروف",
  hill_start_assist: "دستیار حرکت در سربالایی",
  air_conditioning: "سیستم تهویه هوا",
  rear_sensor: "سنسور دنده عقب",
  gps: "جی‌پی‌اس",
  apple_carplay: "اپل کارپلی",
  seat_heating: "گرم‌کن صندلی",
  seat_cooling: "سردکن صندلی",
  auto_park: "پارک خودکار",
  auto_drive: "رانندگی خودکار",
};

const Features: React.FC<FeaturesProps> = ({ features }) => {
  const enabledFeatures = Object.keys(features)
    .filter(
      (key) => typeof features[key] === "boolean" && features[key] === true,
    )
    .map((key) => featureNames[key] || key);

  const extraFeatures = [
    ...(Array.isArray(features.connectivity) ? features.connectivity : []),
    ...(Array.isArray(features.braking_system) ? features.braking_system : []),
  ];

  return (
    <CardComponent>
      <div className={styles.container}>
        <div className={styles.title}>
          <MingcuteCarLine />
          امکانات
        </div>
        <div className={styles.featuresList}>
          {enabledFeatures.map((feature, index) => (
            <div key={index} className={styles.featureItem}>
              {feature}
            </div>
          ))}
          {extraFeatures.map((feature, index) => (
            <div key={`extra-${index}`} className={styles.featureItem}>
              {feature}
            </div>
          ))}
        </div>
      </div>
    </CardComponent>
  );
};

export default Features;
