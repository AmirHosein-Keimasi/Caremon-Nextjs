"use client";

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useReducer,
} from "react";

import { usePathname, useRouter } from "next/navigation";

import { FiltersType } from "@/types/filter.type";

import { FiltersAction, filtersReducer } from "../reducers/filters.reducer";

type Value = {
  filters: FiltersType;
  dispatchFilters: Dispatch<FiltersAction>;
};

export const FiltersContext = createContext<Value>({
  filters: {},
  dispatchFilters: () => {},
});

const URL_FILTER_KEYS: (keyof FiltersType)[] = [
  "query",
  "model",
  "transmission",
  "location",
  "with_driver",
  "sortType",
];

function buildSearchParams(filters: FiltersType): string {
  const params = new URLSearchParams();
  for (const key of URL_FILTER_KEYS) {
    const value = filters[key];
    if (value != null && value !== "") {
      params.set(key, String(value));
    }
  }
  return params.toString();
}

type Props = PropsWithChildren & {
  defaultFilters: FiltersType;
};

export default function FiltersProvider({
  children,
  defaultFilters,
}: Props): ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const [filters, dispatchFilters] = useReducer(filtersReducer, defaultFilters);

  useEffect(() => {
    const search = buildSearchParams(filters);
    const targetUrl = pathname + (search ? `?${search}` : "");
    const currentUrl = window.location.pathname + window.location.search;
    if (currentUrl !== targetUrl) {
      router.replace(targetUrl, { scroll: false });
    }
  }, [filters, pathname, router]);

  return (
    <FiltersContext.Provider value={{ filters, dispatchFilters }}>
      {children}
    </FiltersContext.Provider>
  );
}
