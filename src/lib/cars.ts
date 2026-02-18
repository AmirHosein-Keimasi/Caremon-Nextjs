import { cars as staticCars } from "@/db/cars";
import { CarsModel } from "@/models/cars.model";
import prisma from "./prisma";

/** مسیر پوشهٔ تصاویر خودروها در public - نام فایل در دیتابیس/داده باید با اسم فایل اینجا یکی باشد */
export const CAR_IMAGES_BASE = "/images/carsImag";

/**
 * آدرس نهایی تصویر خودرو.
 * اگر img با http شروع شود (لینک خارجی) همان برگردانده می‌شود، وگرنه از public/images/carsImag استفاده می‌شود.
 * نام فایل encode می‌شود تا فاصله و کاراکترهای خاص در URL درست کار کنند.
 */
export function getCarImageUrl(img: string): string {
  if (!img) return `${CAR_IMAGES_BASE}/default-car.png`;
  if (img.startsWith("http")) return img;
  const encoded = img
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
  return `${CAR_IMAGES_BASE}/${encoded}`;
}

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
  ownerId?: string | null;
  owner?: { name: string } | null;
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
    ownerId: car.ownerId ?? undefined,
    ownerName: car.owner?.name ?? undefined,
  };
}

export async function getCars(): Promise<CarsModel[]> {
  try {
    const dbCars = await prisma.car.findMany({
      orderBy: { name: "asc" },
      include: { owner: { select: { name: true } } },
    });
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
    const car = await prisma.car.findUnique({
      where: { id },
      include: { owner: { select: { name: true } } },
    });
    if (car) return prismaCarToModel(car);
  } catch {
    // Fallback
  }
  return staticCars.find((c) => c.id === id) ?? null;
}

export async function getCarsByIds(ids: string[]): Promise<CarsModel[]> {
  if (ids.length === 0) return [];
  const uniqueIds = Array.from(new Set(ids));
  try {
    const dbCars = await prisma.car.findMany({
      where: { id: { in: uniqueIds } },
    });
    if (dbCars.length > 0) {
      const orderMap = Object.fromEntries(uniqueIds.map((id, i) => [id, i]));
      return dbCars
        .map(prismaCarToModel)
        .sort((a, b) => (orderMap[a.id] ?? 0) - (orderMap[b.id] ?? 0));
    }
  } catch {
    // Fallback
  }
  return uniqueIds
    .map((id) => staticCars.find((c) => c.id === id))
    .filter((c): c is CarsModel => c != null);
}

/** خودروهای ثبت‌شده توسط یک کاربر (مارکت‌پلیس) */
export async function getCarsByOwnerId(ownerId: string): Promise<CarsModel[]> {
  try {
    const dbCars = await prisma.car.findMany({
      where: { ownerId },
      orderBy: { name: "asc" },
      include: { owner: { select: { name: true } } },
    });
    return dbCars.map(prismaCarToModel);
  } catch {
    return [];
  }
}
