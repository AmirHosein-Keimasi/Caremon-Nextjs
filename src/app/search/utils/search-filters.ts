import { FiltersType } from "@/types/filter.type";

export const SEARCH_FILTER_KEYS = [
  "query",
  "model",
  "transmission",
  "location",
  "with_driver",
  "chassisType",
  "price_min",
  "price_max",
  "sortType",
] as const;

export type SearchFilterKey = (typeof SEARCH_FILTER_KEYS)[number];

type SearchFilterValues = Pick<FiltersType, SearchFilterKey>;

type SearchFilterEntries = Array<{
  key: SearchFilterKey;
  value: string;
}>;

export const SEARCH_FILTER_LABELS: Record<SearchFilterKey, string> = {
  query: "جستجو",
  model: "مدل",
  transmission: "انتقال قدرت",
  location: "مکان",
  with_driver: "راننده",
  chassisType: "نوع خودرو",
  price_min: "حداقل قیمت",
  price_max: "حداکثر قیمت",
  sortType: "مرتب‌سازی",
};

/** فیلترهایی که چند مقدار می‌گیرند (چند انتخاب هم‌زمان) — مقدار در state به‌صورت کاما جدا ذخیره می‌شود */
export const MULTI_VALUE_FILTER_KEYS: SearchFilterKey[] = ["model", "location"];

function normalizeFilterValue(value: string | undefined): string | undefined {
  if (value == null) {
    return undefined;
  }

  const trimmedValue = value.trim();
  return trimmedValue === "" ? undefined : trimmedValue;
}

export function normalizeSearchFilters(
  filters: Partial<SearchFilterValues>,
): FiltersType {
  const normalized: FiltersType = {};

  for (const key of SEARCH_FILTER_KEYS) {
    const normalizedValue = normalizeFilterValue(filters[key]);
    if (normalizedValue) {
      normalized[key] = normalizedValue;
    }
  }

  return normalized;
}

export function buildSearchParams(
  filters: Partial<SearchFilterValues>,
): string {
  const normalized = normalizeSearchFilters(filters);
  const params = new URLSearchParams();

  for (const key of SEARCH_FILTER_KEYS) {
    const value = normalized[key];
    if (value) {
      params.set(key, value);
    }
  }

  return params.toString();
}

export function getActiveSearchFilters(
  filters: Partial<SearchFilterValues>,
): SearchFilterEntries {
  const normalized = normalizeSearchFilters(filters);

  return SEARCH_FILTER_KEYS.reduce<SearchFilterEntries>((entries, key) => {
    const value = normalized[key];

    if (!value) {
      return entries;
    }

    if (MULTI_VALUE_FILTER_KEYS.includes(key)) {
      const parts = value
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);
      parts.forEach((part) => entries.push({ key, value: part }));
    } else {
      entries.push({ key, value });
    }
    return entries;
  }, []);
}

const SORT_TYPE_LABELS: Record<string, string> = {
  "price-to-up": "ارزان‌ترین",
  "price-to-down": "گران‌ترین",
  model: "جدیدترین (مدل)",
  "model-asc": "قدیمی‌ترین (مدل)",
  name: "حروف الفبا (الف-ی)",
  "name-desc": "حروف الفبا (ی-الف)",
  rating: "بالاترین امتیاز",
  passengers: "ظرفیت سرنشین",
};

export function formatFilterDisplayValue(
  key: SearchFilterKey,
  value: string,
): string {
  if (key === "price_min" || key === "price_max") {
    const num = parseInt(value, 10);
    if (!Number.isNaN(num)) {
      return `${(num / 1_000_000).toFixed(1)} م.ت`;
    }
  }
  if (key === "sortType") {
    return SORT_TYPE_LABELS[value] ?? value;
  }
  return value;
}

export function countActiveSearchFilters(
  filters: Partial<SearchFilterValues>,
): number {
  return getActiveSearchFilters(filters).length;
}

export function isSearchFiltersEmpty(
  filters: Partial<SearchFilterValues>,
): boolean {
  return countActiveSearchFilters(filters) === 0;
}
