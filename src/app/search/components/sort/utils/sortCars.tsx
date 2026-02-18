import { CarsModel } from "@/models/cars.model";

export function sortCars(cars: CarsModel[], sortType: string): CarsModel[] {
  const copy = [...cars];

  switch (sortType) {
    case "price-to-up":
      return copy.sort((a, b) => a.rental.days_3_to_14 - b.rental.days_3_to_14);
    case "price-to-down":
      return copy.sort((a, b) => b.rental.days_3_to_14 - a.rental.days_3_to_14);
    case "model":
      return copy.sort((a, b) => parseInt(b.model) - parseInt(a.model));
    case "model-asc":
      return copy.sort((a, b) => parseInt(a.model) - parseInt(b.model));
    case "name":
      return copy.sort((a, b) => a.name.localeCompare(b.name, "fa"));
    case "name-desc":
      return copy.sort((a, b) => b.name.localeCompare(a.name, "fa"));
    case "rating":
      return copy.sort((a, b) => b.ratingNumber - a.ratingNumber);
    case "passengers":
      return copy.sort((a, b) => b.capacity.passengers - a.capacity.passengers);
    default:
      return cars;
  }
}
