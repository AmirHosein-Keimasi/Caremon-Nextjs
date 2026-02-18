import React from "react";
import CardComponent from "@/components/card-component/card-component";
import { Car } from "lucide-react";

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

  const allFeatures = [...enabledFeatures, ...extraFeatures];

  return (
    <CardComponent className="h-full flex flex-col">
      <div className="flex flex-col h-full min-h-0">
        <h3 className="text-lg font-bold flex items-center gap-2 mb-3 m-0">
          <Car className="size-5 text-primary shrink-0" />
          امکانات
        </h3>
        <div className="flex flex-wrap gap-2">
          {allFeatures.map((feature, index) => (
            <span
              key={index}
              className="inline-flex items-center py-2 px-3 rounded-lg text-sm font-medium text-foreground bg-muted/80 border border-border/60 hover:border-primary/30 hover:bg-primary/5 transition-colors"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </CardComponent>
  );
};

export default Features;
