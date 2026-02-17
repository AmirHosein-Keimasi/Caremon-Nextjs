"use client";

import { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useCompareStore } from "@/store/compareStore";
import { CarsModel } from "@/models/cars.model";

import { X, ExternalLink } from "lucide-react";

const toPersianNumbers = (num: number | string): string => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num
    .toString()
    .replace(/\d/g, (d) => persianDigits[parseInt(d, 10)]);
};

const formatPrice = (n: number) =>
  `${(n / 1_000_000).toFixed(1)} م.ت`;

type SpecRow = {
  label: string;
  getValue: (car: CarsModel) => string | number | boolean;
};

const SPEC_ROWS: SpecRow[] = [
  { label: "نام", getValue: (c) => c.name },
  { label: "مدل (سال)", getValue: (c) => c.model },
  { label: "مکان", getValue: (c) => c.location },
  { label: "امتیاز", getValue: (c) => c.ratingNumber },
  { label: "تعداد نظرات", getValue: (c) => c.reviewCount },
  { label: "قیمت ۳–۱۴ روز", getValue: (c) => formatPrice(c.rental.days_3_to_14) },
  { label: "قیمت ۱۴+ روز", getValue: (c) => formatPrice(c.rental.more_than_14_days) },
  { label: "حداقل اجاره (روز)", getValue: (c) => c.rental.minimum_rental },
  { label: "سپرده", getValue: (c) => formatPrice(c.rental.deposit) },
  { label: "نوع موتور", getValue: (c) => c.engine.type },
  { label: "حجم موتور (لیتر)", getValue: (c) => c.engine.capacity },
  { label: "سیلندر", getValue: (c) => c.engine.cylinders },
  { label: "شتاب (ثانیه)", getValue: (c) => c.engine.acceleration },
  { label: "مصرف سوخت", getValue: (c) => c.engine.fuel_consumption },
  { label: "انتقال قدرت", getValue: (c) => c.features.transmission },
  { label: "نوع شاسی", getValue: (c) => c.features.chassis_type },
  { label: "نوع آپشن", getValue: (c) => c.features.option_type },
  { label: "سرنشین", getValue: (c) => c.capacity.passengers },
  { label: "صندوق عقب", getValue: (c) => `${c.capacity.luggage} چمدان` },
  { label: "در", getValue: (c) => c.capacity.door },
  { label: "راننده", getValue: (c) => c.with_driver },
  { label: "کروز کنترل", getValue: (c) => (c.features.cruise_control ? "بله" : "خیر") },
  { label: "کمک حرکت سربالایی", getValue: (c) => (c.features.hill_start_assist ? "بله" : "خیر") },
  { label: "کولر", getValue: (c) => (c.features.air_conditioning ? "بله" : "خیر") },
  { label: "سنسور عقب", getValue: (c) => (c.features.rear_sensor ? "بله" : "خیر") },
  { label: "جی‌پی‌اس", getValue: (c) => (c.features.gps ? "بله" : "خیر") },
  { label: "اپل کارپلی", getValue: (c) => (c.features.apple_carplay ? "بله" : "خیر") },
  { label: "گرم‌کن صندلی", getValue: (c) => (c.features.seat_heating ? "بله" : "خیر") },
  { label: "سردکن صندلی", getValue: (c) => (c.features.seat_cooling ? "بله" : "خیر") },
  { label: "سانروف", getValue: (c) => (c.features.panoramic_roof ? "بله" : "خیر") },
  { label: "سیستم صوتی", getValue: (c) => c.features.audio_system },
  { label: "مانیتور", getValue: (c) => c.features.monitor },
  { label: "تنظیم صندلی", getValue: (c) => c.features.driver_seat_adjustment },
];

type Props = {
  cars: CarsModel[];
};

export default function CompareTable({ cars }: Props): ReactElement {
  const { removeCar, clearCompare } = useCompareStore();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={clearCompare}>
          پاک کردن همه
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-right p-3 font-semibold min-w-[140px] w-[140px]">
                مشخصات
              </th>
              {cars.map((car) => (
                <th
                  key={car.id}
                  className="text-center p-3 font-semibold min-w-[180px] border-s border-border"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Image
                      src={`https://cafeerent.com/storage/www/cars/single/${car.img}`}
                      alt={car.name}
                      width={120}
                      height={80}
                      className="rounded object-contain"
                    />
                    <div>
                      <div className="font-bold">{car.name}</div>
                      <div className="text-muted-foreground text-xs">
                        {car.model}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="text-xs"
                      >
                        <Link href={`/cars/${car.id}`}>
                          <ExternalLink className="size-3" />
                          مشاهده
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => removeCar(car.id)}
                        title="حذف از مقایسه"
                      >
                        <X className="size-4" />
                      </Button>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SPEC_ROWS.map((row, idx) => (
              <tr
                key={row.label}
                className={idx % 2 === 0 ? "bg-background" : "bg-muted/20"}
              >
                <td className="p-3 font-medium text-foreground">{row.label}</td>
                {cars.map((car) => (
                  <td
                    key={car.id}
                    className="p-3 text-center border-s border-border"
                  >
                    {row.getValue(car)
                      ? typeof row.getValue(car) === "number"
                        ? toPersianNumbers(row.getValue(car) as number)
                        : String(row.getValue(car))
                      : "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
