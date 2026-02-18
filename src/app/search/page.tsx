import { ReactElement } from "react";
import type { Metadata } from "next";

import SearchQueryBox from "./components/search-query-box/search-query-box.component";
import SavedFiltersComponent from "./components/saved-filters/saved-filters.component";
import MobileFiltersSheetComponent from "./components/mobile-filters-sheet/mobile-filters-sheet.component";

import { FiltersType } from "@/types/filter.type";

import ResultsComponent from "./components/results/results.component";
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
import { BreadcrumbNav } from "@/components/breadcrumb-nav/breadcrumb-nav";
import { SITE_URL, defaultOpenGraph } from "@/lib/site";

/** ISR: هر ۶۰ ثانیه کش جستجو و لیست خودروها به‌روز می‌شود */
export const revalidate = 60;

const title = "جستجوی خودرو";
const description =
  "جستجو و فیلتر خودروهای اجاره‌ای در کارِمون. بر اساس شهر، مدل، گیربکس، قیمت و راننده خودروی مناسب را پیدا کنید.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["جستجوی خودرو", "اجاره ماشین", "فیلتر خودرو", "رزرو آنلاین"],
  openGraph: {
    ...defaultOpenGraph,
    title: `${title} | کارِمون`,
    description,
    url: `${SITE_URL}/search`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | کارِمون`,
    description,
  },
  alternates: {
    canonical: `${SITE_URL}/search`,
  },
};

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
        <div className="grid grid-cols-1 gap-4 px-4 py-4 lg:grid-cols-[1fr_3fr] lg:max-w-7xl lg:px-6 lg:mx-auto">
          <div className="col-span-full mb-1">
            <BreadcrumbNav
              items={[{ label: "خانه", href: "/" }, { label: "جستجو" }]}
            />
          </div>
          {/* موبایل: اول محتوا، بعد فیلترها. دسکتاپ: ستون چپ فیلتر، راست محتوا */}
          <div className="order-1 flex min-w-0 flex-col gap-4 lg:order-2">
            <SearchQueryBox />
            <div className="flex flex-wrap items-center gap-3 gap-y-2">
              <SortComponent />
              <div className="ms-auto">
                <StatsComponent />
              </div>
            </div>
            <MobileFiltersSheetComponent />
            <div className="min-h-0">
              <ResultsComponent />
            </div>
          </div>
          <div className="order-2 hidden auto-rows-min items-start gap-3 lg:order-1 lg:grid lg:gap-4">
            <SavedFiltersComponent />
            <LocationFilterComponent />
            <ModelFilterComponent />
            <TransmissionFilterComponent />
            <ChassisTypeFilterComponent />
            <PriceRangeFilterComponent />
            <WithDriverFilterComponent />
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
