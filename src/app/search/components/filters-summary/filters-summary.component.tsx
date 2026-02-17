"use client";

import { ReactElement, useContext, useMemo } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { FiltersContext } from "../../providers/filter.providers";
import {
  getActiveSearchFilters,
  isSearchFiltersEmpty,
  formatFilterDisplayValue,
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
    <Card>
      <CardContent className="p-4">
      <div className="flex flex-col gap-4">
        <div className="text-lg font-semibold">فیلترهای فعال</div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="self-end"
          onClick={removeAllButtonClickHandler}
        >
          پاک کردن همه
        </Button>

        <ul className="flex flex-wrap gap-2 list-none">
          {activeFilters.map((filter) => (
            <Badge
              key={filter.key}
              variant="secondary"
              className="cursor-pointer hover:bg-accent/80 transition-colors"
              onClick={() => filterClickHandler(filter.key)}
            >
              {SEARCH_FILTER_LABELS[filter.key]}: {formatFilterDisplayValue(filter.key, filter.value)}
            </Badge>
          ))}
        </ul>
      </div>
      </CardContent>
    </Card>
  );
}
