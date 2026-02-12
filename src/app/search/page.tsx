import { ReactElement } from "react";

import GlobalSearchBoxComponent from "@/components/globall-search-box/globall-search-box.component";

import { FiltersType } from "@/types/filter.type";

import ResultsComponent from "./components/results/results.component";
import FiltersSummaryComponent from "./components/filters-summary/filters-summary.component";
import StatsComponent from "./components/stats/stats.component";
import WithDriverFilterComponent from "./components/withdriver-filter/withdriver-filter.component";
import ModelFilterComponent from "./components/model-filter/model-filter.component";
import LocationFilterComponent from "./components/location-filter/location-filter.component";
import TransmissionFilterComponent from "./components/transmission-filter/transmission-filter.component";

import FiltersProvider from "./providers/filter.providers";
import CarsProvider from "./providers/cars.provider";

import SortComponent from "./components/sort/sort.component";

import { getCars } from "@/lib/cars";

import styles from "./page.module.css";

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
        <div className={styles.page}>
          <div className={styles.search}>
            <GlobalSearchBoxComponent initialQuery={defaultFilters.query} />
          </div>
          <div className={styles.filters}>
            <FiltersSummaryComponent />
            <LocationFilterComponent />
            <ModelFilterComponent />
            <TransmissionFilterComponent />
            <WithDriverFilterComponent />
          </div>
          <div className={styles.toolbar}>
            <SortComponent />
            <div className={styles.stats}>
              <StatsComponent />
            </div>
          </div>
          <div className={styles.results}>
            <ResultsComponent />
          </div>
        </div>
      </CarsProvider>
    </FiltersProvider>
  );
}

function generateDefaultFilters(searchParams: SearchParams): FiltersType {
  const { query, model, transmission, location, with_driver } = searchParams;

  return {
    query: normalizeFilter(query),
    model: normalizeFilter(model),
    transmission: normalizeFilter(transmission),
    location: normalizeFilter(location),
    with_driver: normalizeFilter(with_driver),
  };
}

function normalizeFilter(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}
