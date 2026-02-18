import React from "react";
import CardComponent from "@/components/card-component/card-component";
import { CarsModel } from "@/models/cars.model";

type Props = {
  car: CarsModel;
};

const SpecsAndFeatures = ({ car }: Props) => {
  return (
    <CardComponent>
      <div className="grid text-foreground max-md:grid-cols-1">
        <div className="flex flex-col gap-4 [&>div:last-child]:border-b-0">
          <h2 className="text-xl font-semibold text-foreground mb-2 pb-2 border-b-2 border-border">
            مشخصات فنی
          </h2>

          <div className="flex justify-between py-2 border-b border-dashed border-border">
            <span className="font-medium text-foreground">نوع موتور</span>
            <span className="font-normal text-foreground">
              {car.engine.type}
            </span>
          </div>

          <div className="flex justify-between py-2 border-b border-dashed border-border">
            <span className="font-medium text-foreground">
              حجم موتور (لیتر)
            </span>
            <span className="font-normal text-foreground">
              {car.engine.capacity}
            </span>
          </div>

          <div className="flex justify-between py-2 border-b border-dashed border-border">
            <span className="font-medium text-foreground">
              سیستم انتقال قدرت
            </span>
            <span className="font-normal text-foreground">
              {car.features.transmission}
            </span>
          </div>

          <div className="flex justify-between py-2 border-b border-dashed border-border">
            <span className="font-medium text-foreground">تعداد سیلندر</span>
            <span className="font-normal text-foreground">
              {car.engine.cylinders}
            </span>
          </div>

          <div className="flex justify-between py-2 border-b border-dashed border-border">
            <span className="font-medium text-foreground">ظرفیت سرنشین</span>
            <span className="font-normal text-foreground">
              {car.capacity.passengers} نفر
            </span>
          </div>

          <div className="flex justify-between py-2 border-b border-dashed border-border">
            <span className="font-medium text-foreground">حجم صندوق عقب</span>
            <span className="font-normal text-foreground">
              {car.capacity.luggage} چمدان
            </span>
          </div>
        </div>
      </div>
    </CardComponent>
  );
};

export default SpecsAndFeatures;
