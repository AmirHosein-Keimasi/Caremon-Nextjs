import { FiltersType } from "@/types/filter.type";

export const SEARCH_FILTER_KEYS = [
  "query",
  "model",
  "transmission",
  "location",
  "with_driver",
  "sortType",
] as const;

export type SearchFilterKey = (typeof SEARCH_FILTER_KEYS)[number];

type SearchFilterValues = Pick<FiltersType, SearchFilterKey>;

type SearchFilterEntries = Array<{
  key: SearchFilterKey;
  value: string;
}>;

export const SEARCH_FILTER_LABELS: Record<SearchFilterKey, string> = {
  query: "Search",
  model: "Model",
  transmission: "Transmission",
  location: "Location",
  with_driver: "Driver",
  sortType: "Sort",
};

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

export function buildSearchParams(filters: Partial<SearchFilterValues>): string {
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

    entries.push({ key, value });
    return entries;
  }, []);
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
