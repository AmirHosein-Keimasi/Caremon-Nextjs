import { ReactElement } from "react";

import SearchQueryBox from "./components/search-query-box/search-query-box.component";
import SavedFiltersComponent from "./components/saved-filters/saved-filters.component";

import { FiltersType } from "@/types/filter.type";

import ResultsComponent from "./components/results/results.component";
import FiltersSummaryComponent from "./components/filters-summary/filters-summary.component";
import StatsComponent from "./components/stats/stats.component";
import WithDriverFilterComponent from "./components/withdriver-filter/withdriver-filter.component";
import ModelFilterComponent from "./components/model-filter/model-filter.component";
import LocationFilterComponent from "./components/location-filter/location-filter.component";
import TransmissionFilterComponent from "./components/transmission-filter/transmission-filter.component";
import PriceRangeFilterComponent from "./components/price-range-filter/price-range-filter.component";
import ChassisTypeFilterComponent from "./components/chassis-type-filter/chassis-type-filter.component";

import FiltersProvider from "./providers/filter.providers";
import CarsProvider from "./providers/cars.provider";

import SortComponent from "./components/sort/sort.component";
import { normalizeSearchFilters } from "./utils/search-filters";

import { getCars } from "@/lib/cars";

type SearchParams = { [key: string]: string | string[] | undefined };

type Props = {
  searchParams: SearchParams;
};

export default async function Page({
  searchParams,
}: Props): Promise<ReactElement> {
  const defaultFilters = generateDefaultFilters(searchParams);
  const cars = await getCars();

  return (
    <FiltersProvider
      key={JSON.stringify(defaultFilters)}
      defaultFilters={defaultFilters}
    >
      <CarsProvider cars={cars}>
        <div 
          className="grid grid-cols-[1fr_3.5fr] gap-4 lg:max-w-7xl lg:px-6 lg:mx-auto"
          style={{
            gridTemplateAreas: `
              "search search"
              "filters toolbar"
              "filters results"
            `
          }}
        >
          <div className="[grid-area:search]">
            <SearchQueryBox />
          </div>
          <div className="[grid-area:filters] grid gap-4">
            <SavedFiltersComponent />
            <FiltersSummaryComponent />
            <LocationFilterComponent />
            <ModelFilterComponent />
            <TransmissionFilterComponent />
            <ChassisTypeFilterComponent />
            <PriceRangeFilterComponent />
            <WithDriverFilterComponent />
          </div>
          <div className="[grid-area:toolbar] flex items-center gap-4">
            <SortComponent />
            <div className="ms-auto">
              <StatsComponent />
            </div>
          </div>
          <div className="[grid-area:results]">
            <ResultsComponent />
          </div>
        </div>
      </CarsProvider>
    </FiltersProvider>
  );
}

function generateDefaultFilters(searchParams: SearchParams): FiltersType {
  const {
    query,
    model,
    transmission,
    location,
    with_driver,
    chassisType,
    price_min,
    price_max,
    sortType,
  } = searchParams;

  return normalizeSearchFilters({
    query: normalizeFilter(query),
    model: normalizeFilter(model),
    transmission: normalizeFilter(transmission),
    location: normalizeFilter(location),
    with_driver: normalizeFilter(with_driver),
    chassisType: normalizeFilter(chassisType),
    price_min: normalizeFilter(price_min),
    price_max: normalizeFilter(price_max),
    sortType: normalizeFilter(sortType),
  });
}

function normalizeFilter(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}
