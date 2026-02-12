import { cars as staticCars } from "@/db/cars";
import { CarsModel } from "@/models/cars.model";
import prisma from "./prisma";

function prismaCarToModel(car: {
  id: string;
  name: string;
  model: string;
  img: string;
  location: string;
  reviewCount: number;
  ratingNumber: number;
  withDriver: string;
  rental: unknown;
  capacity: unknown;
  features: unknown;
  engine: unknown;
  driverRental: unknown;
}): CarsModel {
  return {
    id: car.id,
    name: car.name,
    model: car.model,
    img: car.img,
    location: car.location,
    reviewCount: car.reviewCount,
    ratingNumber: car.ratingNumber,
    with_driver: car.withDriver,
    rental: car.rental as CarsModel["rental"],
    capacity: car.capacity as CarsModel["capacity"],
    features: car.features as CarsModel["features"],
    engine: car.engine as CarsModel["engine"],
    driver_rental: car.driverRental as CarsModel["driver_rental"],
  };
}

export async function getCars(): Promise<CarsModel[]> {
  try {
    const dbCars = await prisma.car.findMany({ orderBy: { name: "asc" } });
    if (dbCars.length > 0) {
      return dbCars.map(prismaCarToModel);
    }
  } catch {
    // Fallback to static data if DB fails or is empty
  }
  return staticCars;
}

export async function getCarById(id: string): Promise<CarsModel | null> {
  try {
    const car = await prisma.car.findUnique({ where: { id } });
    if (car) return prismaCarToModel(car);
  } catch {
    // Fallback
  }
  return staticCars.find((c) => c.id === id) ?? null;
}
