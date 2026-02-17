"use client";

import {
  ChangeEvent,
  ReactElement,
  useContext,
  useMemo,
  useState,
} from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { FiltersContext } from "../../providers/filter.providers";
import {
  countActiveSearchFilters,
  getActiveSearchFilters,
  formatFilterDisplayValue,
  SEARCH_FILTER_LABELS,
  SearchFilterKey,
} from "@/app/search/utils/search-filters";
import {
  SearchPreset,
  useSearchPresetsStore,
} from "@/store/searchPresetsStore";

export default function SavedFiltersComponent(): ReactElement {
  const { filters, dispatchFilters } = useContext(FiltersContext);
  const [presetName, setPresetName] = useState("");

  const { presets, addPreset, removePreset, touchPreset, clearPresets } =
    useSearchPresetsStore();

  const activeFiltersCount = useMemo(
    () => countActiveSearchFilters(filters),
    [filters],
  );

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setPresetName(event.currentTarget.value);
  };

  const generateDefaultPresetName = (): string => {
    const parts = getActiveSearchFilters(filters)
      .slice(0, 3)
      .map(
        (f) =>
          `${SEARCH_FILTER_LABELS[f.key as SearchFilterKey]}: ${formatFilterDisplayValue(f.key as SearchFilterKey, f.value)}`,
      );
    return parts.length > 0 ? parts.join(" • ") : "فیلتر پیش‌فرض";
  };

  const saveClickHandler = (): void => {
    addPreset(presetName.trim() || generateDefaultPresetName(), filters);
    setPresetName("");
  };

  const applyClickHandler = (preset: SearchPreset): void => {
    dispatchFilters({ type: "replaced_filters", filters: preset.filters });
    touchPreset(preset.id);
  };

  return (
    <Card>
      <CardContent className="p-4">
      <div className="grid gap-3">
        <div className="flex items-center justify-between gap-2">
          <div className="font-black">فیلترهای ذخیره شده</div>
          <Badge variant="secondary">{activeFiltersCount} فعال</Badge>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-2 max-[48rem]:grid-cols-1">
          <Input
            type="text"
            value={presetName}
            onChange={inputChangeHandler}
            maxLength={40}
            placeholder="نام پیش‌فرض (اختیاری)"
          />

          <Button
            type="button"
            size="sm"
            onClick={saveClickHandler}
            disabled={activeFiltersCount === 0}
          >
            ذخیره
          </Button>
        </div>

        {!presets.length && (
          <div className="text-foreground text-sm">
            هنوز فیلتری ذخیره نشده است.
          </div>
        )}

        {presets.length > 0 && (
          <>
            <ul className="grid gap-2">
              {presets.map((preset) => (
                <li
                  key={preset.id}
                  className="bg-card border border-border rounded-lg p-2.5 grid gap-1.5"
                >
                  <div className="flex items-center justify-between gap-2 max-[48rem]:items-start max-[48rem]:flex-col">
                    <div className="font-bold">{preset.name}</div>
                    <div className="text-sm text-foreground">
                      {countActiveSearchFilters(preset.filters)} فیلتر | استفاده{" "}
                      {preset.usageCount}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {getActiveSearchFilters(preset.filters).map((filter) => (
                      <span
                        key={`${preset.id}-${filter.key}`}
                        className="bg-muted rounded-full px-2 py-0.5 text-sm"
                        title={`${SEARCH_FILTER_LABELS[filter.key as SearchFilterKey]}: ${formatFilterDisplayValue(filter.key as SearchFilterKey, filter.value)}`}
                      >
                        {SEARCH_FILTER_LABELS[filter.key as SearchFilterKey]}:{" "}
                        {formatFilterDisplayValue(
                          filter.key as SearchFilterKey,
                          filter.value,
                        )}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-1.5">
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => applyClickHandler(preset)}
                    >
                      اعمال
                    </Button>

                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      onClick={() => removePreset(preset.id)}
                    >
                      حذف
                    </Button>
                  </div>
                </li>
              ))}
            </ul>

            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={clearPresets}
            >
              پاک کردن پیش‌فرض‌ها
            </Button>
          </>
        )}
      </div>
      </CardContent>
    </Card>
  );
}
