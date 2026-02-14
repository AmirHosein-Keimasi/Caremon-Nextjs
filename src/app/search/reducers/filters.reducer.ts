import { FiltersType } from "@/types/filter.type";

export type FiltersAction =
  | {
      type: "updated_filter";
      key: keyof FiltersType;
      value: string;
    }
  | {
      type: "removed_filter";
      key: keyof FiltersType;
    }
  | {
      type: "removed_all";
    }
  | {
      type: "replaced_filters";
      filters: FiltersType;
    };

export function filtersReducer(filters: FiltersType, action: FiltersAction) {
  switch (action.type) {
    case "updated_filter": {
      const value = action.value.trim();

      if (!value) {
        const clonedFilters = { ...filters };
        delete clonedFilters[action.key];
        return clonedFilters;
      }

      return { ...filters, [action.key]: value };
    }
    case "removed_filter": {
      const clonedFilters = { ...filters };
      delete clonedFilters[action.key];
      return clonedFilters;
    }
    case "removed_all": {
      return {};
    }
    case "replaced_filters": {
      return { ...action.filters };
    }
  }
}
