import { ReactElement } from "react";
import { getCars } from "@/lib/cars";
import MapViewClient from "./components/MapViewClient";

export default async function MapPage(): Promise<ReactElement> {
  const cars = await getCars();
  return <MapViewClient cars={cars} />;
}
