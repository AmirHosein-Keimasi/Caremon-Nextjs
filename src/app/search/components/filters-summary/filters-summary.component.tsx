"use client";

import { ReactElement, useContext, useMemo } from "react";

import CardComponent from "@/components/card-component/card-component";

import { FiltersContext } from "../../providers/filter.providers";
import {
  getActiveSearchFilters,
  isSearchFiltersEmpty,
  SEARCH_FILTER_LABELS,
  SearchFilterKey,
} from "@/app/search/utils/search-filters";

export default function FiltersSummaryComponent(): ReactElement | null {
  const { filters, dispatchFilters } = useContext(FiltersContext);

  const activeFilters = useMemo(
    () => getActiveSearchFilters(filters),
    [filters],
  );
  const isEmpty = useMemo(() => isSearchFiltersEmpty(filters), [filters]);

  const removeAllButtonClickHandler = (): void => {
    dispatchFilters({ type: "removed_all" });
  };

  const filterClickHandler = (key: SearchFilterKey): void => {
    dispatchFilters({ type: "removed_filter", key });
  };

  if (isEmpty) {
    return null;
  }

  return (
    <CardComponent>
      <div className="flex flex-col gap-4">
        <div className="text-lg font-semibold">Active filters</div>

        <button
          type="button"
          onClick={removeAllButtonClickHandler}
          className="self-end px-4 py-2 bg-transparent text-[var(--color-primary)] border border-[var(--color-primary)] rounded-md hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-opposite)] transition-colors"
        >
          Clear all
        </button>

        <ul className="flex flex-wrap gap-2 list-none">
          {activeFilters.map((filter) => (
            <li
              key={filter.key}
              onClick={() => filterClickHandler(filter.key)}
              className="px-3 py-1 bg-[var(--color-surface-400)] text-[var(--color-text-400)] rounded-md cursor-pointer hover:bg-[var(--color-surface-300)] transition-colors"
            >
              {SEARCH_FILTER_LABELS[filter.key]}: {filter.value}
            </li>
          ))}
        </ul>
      </div>
    </CardComponent>
  );
}
