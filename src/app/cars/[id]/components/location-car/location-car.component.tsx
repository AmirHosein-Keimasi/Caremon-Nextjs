import React, { PropsWithChildren } from "react";
import { MapPin } from "lucide-react";
import CardComponent from "@/components/card-component/card-component";
import { CarsModel } from "@/models/cars.model";
type Props = PropsWithChildren & {
  car: CarsModel;
};
const LocationCar = ({ car }: Props) => {
  return (
    <CardComponent className="h-full flex flex-col">
      <div className="flex flex-col h-full min-h-0">
        <h3 className="text-lg font-bold flex items-center gap-2 mb-3 m-0">
          <MapPin className="size-5 text-primary shrink-0" />
          محل خودرو و تحویل
        </h3>
        <div className="rounded-xl bg-primary/10 border border-primary/20 px-4 py-3 mb-3">
          <p className="text-sm text-muted-foreground mb-1 m-0">آدرس تحویل</p>
          <p className="font-semibold text-foreground m-0">{car.location}</p>
        </div>
        <p className="text-sm text-muted-foreground mt-auto m-0">
          در محدوده {car.location}، خودرو در محل شما تحویل می‌شود.
        </p>
      </div>
    </CardComponent>
  );
};

export default LocationCar;
