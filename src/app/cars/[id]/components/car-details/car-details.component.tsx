import React from "react";
import CardComponent from "@/components/card-component/card-component";
import { CarsModel } from "@/models/cars.model";

type Props = {
  car: CarsModel;
};

const SpecsAndFeatures = ({ car }: Props) => {
  return (
    <CardComponent>
      <div className="grid text-[var(--color-text-400)] max-md:grid-cols-1">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[var(--color-text-700)] mb-2 pb-2 border-b-2 border-[var(--color-border)]">
            مشخصات فنی
          </h2>

          <div className="flex justify-between py-2 border-b border-dashed border-[var(--color-border)]">
            <span className="font-medium text-[var(--color-text-400)]">
              نوع موتور
            </span>
            <span className="font-normal text-[var(--color-text-700)]">
              {car.engine.type}
            </span>
          </div>

          <div className="flex justify-between py-2 border-b border-dashed border-[var(--color-border)]">
            <span className="font-medium text-[var(--color-text-400)]">
              حجم موتور (لیتر)
            </span>
            <span className="font-normal text-[var(--color-text-700)]">
              {car.engine.capacity}
            </span>
          </div>

          <div className="flex justify-between py-2 border-b border-dashed border-[var(--color-border)]">
            <span className="font-medium text-[var(--color-text-400)]">
              سیستم انتقال قدرت
            </span>
            <span className="font-normal text-[var(--color-text-700)]">
              {car.features.transmission}
            </span>
          </div>

          <div className="flex justify-between py-2 border-b border-dashed border-[var(--color-border)]">
            <span className="font-medium text-[var(--color-text-400)]">
              تعداد سیلندر
            </span>
            <span className="font-normal text-[var(--color-text-700)]">
              {car.engine.cylinders}
            </span>
          </div>

          <div className="flex justify-between py-2 border-b border-dashed border-[var(--color-border)]">
            <span className="font-medium text-[var(--color-text-400)]">
              ظرفیت سرنشین
            </span>
            <span className="font-normal text-[var(--color-text-700)]">
              {car.capacity.passengers} نفر
            </span>
          </div>

          <div className="flex justify-between py-2 border-b border-dashed border-[var(--color-border)]">
            <span className="font-medium text-[var(--color-text-400)]">
              حجم صندوق عقب
            </span>
            <span className="font-normal text-[var(--color-text-700)]">
              {car.capacity.luggage} چمدان
            </span>
          </div>
        </div>
      </div>
    </CardComponent>
  );
};

export default SpecsAndFeatures;
