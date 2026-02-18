"use client";

import dynamic from "next/dynamic";
import type { CarsModel } from "@/models/cars.model";

const MapView = dynamic(
  () => import("./MapView").then((m) => m.default),
  {
    ssr: false,
    loading: () => (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="h-[450px] rounded-2xl bg-muted animate-pulse flex items-center justify-center text-muted-foreground">
          در حال بارگذاری نقشه...
        </div>
      </div>
    ),
  },
);

type Props = { cars: CarsModel[] };

export default function MapViewClient({ cars }: Props) {
  return <MapView cars={cars} />;
}
