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

  const saveClickHandler = (): void => {
    addPreset(presetName, filters);
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
          <div className="font-black">Saved filters</div>
          <Badge variant="secondary">{activeFiltersCount} active</Badge>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-2 max-[48rem]:grid-cols-1">
          <Input
            type="text"
            value={presetName}
            onChange={inputChangeHandler}
            maxLength={40}
            placeholder="Preset name (optional)"
          />

          <Button
            type="button"
            size="sm"
            onClick={saveClickHandler}
            disabled={activeFiltersCount === 0}
          >
            Save
          </Button>
        </div>

        {!presets.length && (
          <div className="text-[var(--color-text-700)] text-[var(--fz-300)]">
            No saved presets yet.
          </div>
        )}

        {presets.length > 0 && (
          <>
            <ul className="grid gap-2">
              {presets.map((preset) => (
                <li
                  key={preset.id}
                  className="bg-[var(--color-surface-700)] border border-[var(--color-border)] rounded-[var(--border-radius)] p-2.5 grid gap-1.5"
                >
                  <div className="flex items-center justify-between gap-2 max-[48rem]:items-start max-[48rem]:flex-col">
                    <div className="font-bold">{preset.name}</div>
                    <div className="text-[var(--fz-300)] text-[var(--color-text-700)]">
                      {countActiveSearchFilters(preset.filters)} filters | used{" "}
                      {preset.usageCount}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {getActiveSearchFilters(preset.filters).map((filter) => (
                      <span
                        key={`${preset.id}-${filter.key}`}
                        className="bg-[var(--color-surface-300)] rounded-full px-2 py-0.5 text-[var(--fz-300)]"
                      >
                        {filter.value}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-1.5">
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => applyClickHandler(preset)}
                    >
                      Apply
                    </Button>

                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      onClick={() => removePreset(preset.id)}
                    >
                      Delete
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
              Clear presets
            </Button>
          </>
        )}
      </div>
      </CardContent>
    </Card>
  );
}
