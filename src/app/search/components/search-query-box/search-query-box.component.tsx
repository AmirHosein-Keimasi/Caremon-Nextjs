"use client";

import { ReactElement, useContext, useEffect, useState } from "react";

import GlobalSearchBoxComponent from "@/components/globall-search-box/globall-search-box.component";

import { FiltersContext } from "../../providers/filter.providers";

/**
 * Connects the global search box to the Filters context so updates
 * immediately drive the search results and URL params.
 */
export default function SearchQueryBox(): ReactElement {
  const { filters, dispatchFilters } = useContext(FiltersContext);
  const [query, setQuery] = useState(filters.query ?? "");

  // Keep local state in sync when filters are reset elsewhere.
  useEffect(() => {
    setQuery(filters.query ?? "");
  }, [filters.query]);

  const dispatchQueryChange = (value: string): void => {
    setQuery(value);

    const trimmed = value.trim();
    if (trimmed === "") {
      dispatchFilters({ type: "removed_filter", key: "query" });
    } else {
      dispatchFilters({ type: "updated_filter", key: "query", value: trimmed });
    }
  };

  const handleSubmit = (): void => {
    const trimmed = query.trim();
    if (trimmed === "") {
      dispatchFilters({ type: "removed_filter", key: "query" });
      return;
    }

    dispatchFilters({ type: "updated_filter", key: "query", value: trimmed });
  };

  return (
    <GlobalSearchBoxComponent
      value={query}
      onValueChange={dispatchQueryChange}
      onSubmit={handleSubmit}
    />
  );
}
