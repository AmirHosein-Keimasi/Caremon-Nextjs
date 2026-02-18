"use client";

import { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

function formatCellValue(value: string | number | boolean): string {
  if (value === undefined || value === null) return "—";
  if (typeof value === "number") return toPersianNumbers(value);
  return String(value);
}

type Props = {
  cars: CarsModel[];
};

export default function CompareTable({ cars }: Props): ReactElement {
  const router = useRouter();
  const { removeCar, clearCompare } = useCompareStore();

  const handleRemoveCar = (carId: string) => {
    removeCar(carId);
    const newIds = cars.filter((c) => c.id !== carId).map((c) => c.id);
    if (newIds.length === 0) {
      router.push("/compare");
    } else {
      router.push(`/compare?ids=${newIds.join(",")}`);
    }
  };

  const handleClearAll = () => {
    clearCompare();
    router.push("/compare");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={handleClearAll}>
          پاک کردن همه
        </Button>
      </div>

      {/* موبایل: کارت‌ها (زیر 1024) — بدون اسکرول افقی */}
      <div className="flex flex-col gap-6 lg:hidden">
        {cars.map((car) => (
          <div
            key={car.id}
            className="rounded-xl border border-border bg-card overflow-hidden"
          >
            <div className="flex flex-col items-center gap-2 p-4 border-b border-border bg-muted/30">
              <Image
                src={`https://cafeerent.com/storage/www/cars/single/${car.img}`}
                alt={car.name}
                width={160}
                height={100}
                className="rounded object-contain"
              />
              <div className="text-center">
                <div className="font-bold">{car.name}</div>
                <div className="text-muted-foreground text-sm">{car.model}</div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild className="text-xs">
                  <Link href={`/cars/${car.id}`}>
                    <ExternalLink className="size-3" />
                    مشاهده
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleRemoveCar(car.id)}
                  title="حذف از مقایسه"
                >
                  <X className="size-4" />
                </Button>
              </div>
            </div>
            <dl className="divide-y divide-border">
              {SPEC_ROWS.map((row, idx) => (
                <div
                  key={row.label}
                  className={idx % 2 === 0 ? "bg-background" : "bg-muted/40"}
                >
                  <div className="flex justify-between items-center gap-4 px-4 py-2.5 text-sm">
                    <dt className="font-medium text-muted-foreground shrink-0">
                      {row.label}
                    </dt>
                    <dd className="text-left min-w-0">
                      {formatCellValue(row.getValue(car))}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      {/* دسکتاپ: جدول (از 1024 به بالا) — بدون اسکرول افقی، ردیف‌ها یکی‌درمیان */}
      <div className="hidden lg:block overflow-hidden rounded-lg border border-border">
        <table className="w-full table-fixed text-sm min-w-0">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-right p-3 font-semibold w-48 max-w-48 min-w-0">
                مشخصات
              </th>
              {cars.map((car) => (
                <th
                  key={car.id}
                  className="text-center p-3 font-semibold border-s border-border min-w-0"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Image
                      src={`https://cafeerent.com/storage/www/cars/single/${car.img}`}
                      alt={car.name}
                      width={100}
                      height={64}
                      className="rounded object-contain"
                    />
                    <div className="min-w-0 overflow-hidden text-ellipsis">
                      <div className="font-bold truncate">{car.name}</div>
                      <div className="text-muted-foreground text-xs truncate">
                        {car.model}
                      </div>
                    </div>
                    <div className="flex gap-1 flex-wrap justify-center">
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
                        onClick={() => handleRemoveCar(car.id)}
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
                className={
                  idx % 2 === 0
                    ? "bg-background"
                    : "bg-muted/40"
                }
              >
                <td className="p-3 font-medium text-foreground w-48 max-w-48 min-w-0">
                  {row.label}
                </td>
                {cars.map((car) => (
                  <td
                    key={car.id}
                    className="p-3 text-center border-s border-border min-w-0 overflow-hidden text-ellipsis"
                  >
                    {formatCellValue(row.getValue(car))}
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
