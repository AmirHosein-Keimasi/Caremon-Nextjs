"use client";

import dynamic from "next/dynamic";
import type { CarsModel } from "@/models/cars.model";
import Spinner from "@/components/Spinner/Spinner";

const MapView = dynamic(() => import("./MapView").then((m) => m.default), {
  ssr: false,
  loading: () => (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="h-[450px] rounded-2xl bg-muted flex flex-col items-center justify-center gap-3 text-muted-foreground">
        <Spinner size={40} />
        <p className="text-sm">در حال بارگذاری نقشه...</p>
      </div>
    </div>
  ),
});

type Props = { cars: CarsModel[] };

export default function MapViewClient({ cars }: Props) {
  return <MapView cars={cars} />;
}
