import { FiltersType } from "@/types/filter.type";

const MULTI_VALUE_KEYS: Array<keyof FiltersType> = ["model", "location"];

function isMultiValueKey(key: keyof FiltersType): boolean {
  return MULTI_VALUE_KEYS.includes(key);
}

export type FiltersAction =
  | {
      type: "updated_filter";
      key: keyof FiltersType;
      value: string;
    }
  | {
      type: "removed_filter";
      key: keyof FiltersType;
      value?: string;
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
      const key = action.key;
      const toRemove = action.value?.trim();

      if (toRemove && isMultiValueKey(key)) {
        const current = clonedFilters[key];
        if (typeof current === "string") {
          const parts = current.split(",").map((p) => p.trim()).filter(Boolean);
          const next = parts.filter((p) => p !== toRemove).join(",");
          if (next) clonedFilters[key] = next;
          else delete clonedFilters[key];
        } else {
          delete clonedFilters[key];
        }
      } else {
        delete clonedFilters[key];
      }
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
