import React, { PropsWithChildren } from "react";
import { MapPin } from "lucide-react";
import CardComponent from "@/components/card-component/card-component";
import { CarsModel } from "@/models/cars.model";
type Props = PropsWithChildren & {
  car: CarsModel;
};
const LocationCar = ({ car }: Props) => {
  return (
    <CardComponent>
      <div>
        <span>
          <p className="text-lg font-bold flex items-center mb-2.5">
            {" "}
            <MapPin className="ml-2" />
            محل خودرو و تحویل
          </p>
          <p className="mb-2">{car.location}</p>
          <p className="text-foreground">
            در محدوده {car.location}، خودرو در محل شما تحویل می‌شود.
          </p>
        </span>
      </div>
    </CardComponent>
  );
};

export default LocationCar;
