import type { CarsModel } from "@/models/cars.model";
import type { AddCarInput } from "@/lib/schemas";

/** تبدیل خودرو به مقادیر اولیه فرم ثبت/ویرایش */
export function carToAddCarInput(car: CarsModel): AddCarInput {
  const transmission =
    car.features?.transmission === "اتوماتیک"
      ? "اتوماتیک"
      : car.features?.transmission === "سی‌ویتی"
        ? "سی‌ویتی"
        : "دستی";

  return {
    name: car.name ?? "",
    model: car.model ?? "",
    location: car.location ?? "",
    img: car.img ?? "default-car.png",
    withDriver: car.with_driver === "با راننده" ? "با راننده" : "بدون راننده",
    days_3_to_14: car.rental?.days_3_to_14 ?? 0,
    more_than_14_days: car.rental?.more_than_14_days ?? 0,
    deposit: car.rental?.deposit ?? 0,
    minimum_rental: car.rental?.minimum_rental ?? 1,
    passengers: car.capacity?.passengers ?? 5,
    luggage: car.capacity?.luggage ?? 2,
    door: car.capacity?.door ?? 4,
    transmission,
    chassis_type: car.features?.chassis_type ?? "سدان",
    option_type: car.features?.option_type ?? "استاندارد",
    cruise_control: car.features?.cruise_control ?? false,
    hill_start_assist: car.features?.hill_start_assist ?? false,
    apple_carplay: car.features?.apple_carplay ?? false,
    seat_heating: car.features?.seat_heating ?? false,
    seat_cooling: car.features?.seat_cooling ?? false,
    air_conditioning: car.features?.air_conditioning ?? true,
    rear_sensor: car.features?.rear_sensor ?? false,
    audio_system: car.features?.audio_system ?? "استاندارد",
    monitor: car.features?.monitor ?? "—",
    driver_seat_adjustment: car.features?.driver_seat_adjustment ?? "دستی",
    panoramic_roof: car.features?.panoramic_roof ?? false,
    gps: car.features?.gps ?? false,
    auto_park: car.features?.auto_park ?? false,
    auto_drive: car.features?.auto_drive ?? false,
    connectivity: car.features?.connectivity ?? [],
    braking_system: car.features?.braking_system ?? [],
    engine_type: car.engine?.type ?? "بنزینی",
    engine_capacity: car.engine?.capacity ?? 0,
    engine_cylinders: car.engine?.cylinders ?? 0,
    engine_acceleration: car.engine?.acceleration ?? 0,
    engine_fuel_consumption: car.engine?.fuel_consumption ?? 0,
    driver_hourly_10: car.driver_rental?.hourly_10 ?? 0,
    driver_intercity_per_km: car.driver_rental?.intercity_per_km ?? 0,
    driver_airport_transfer: car.driver_rental?.airport_transfer ?? 0,
  };
}
