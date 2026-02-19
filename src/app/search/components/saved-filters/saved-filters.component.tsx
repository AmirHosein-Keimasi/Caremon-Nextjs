"use client";

import {
  ChangeEvent,
  ReactElement,
  useContext,
  useMemo,
  useState,
} from "react";

import { X } from "lucide-react";

import CardComponent from "@/components/card-component/card-component";

import { FiltersContext } from "../../providers/filter.providers";
import {
  countActiveSearchFilters,
  formatFilterDisplayValue,
  getActiveSearchFilters,
  MULTI_VALUE_FILTER_KEYS,
  SEARCH_FILTER_LABELS,
  type SearchFilterKey,
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

  const activeFiltersList = useMemo(
    () => getActiveSearchFilters(filters),
    [filters],
  );

  const activeFiltersCount = activeFiltersList.length;

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

  const removeOneFilter = (key: SearchFilterKey, value?: string): void => {
    if (MULTI_VALUE_FILTER_KEYS.includes(key) && value != null) {
      dispatchFilters({ type: "removed_filter", key, value });
    } else {
      dispatchFilters({ type: "removed_filter", key });
    }
  };

  const removeAllFilters = (): void => {
    dispatchFilters({ type: "removed_all" });
  };

  return (
    <CardComponent>
      <div className="grid gap-3">
        <div className="flex items-center justify-between gap-2">
          <div className="font-black text-(--color-text-700) text-[length:var(--fz-300)]">
            فیلترهای ذخیره‌شده
          </div>
          <div className="bg-[var(--color-surface-700)] text-(--color-text-700) rounded-full px-2.5 py-0.5 text-[length:var(--fz-300)]">
            {activeFiltersCount} فعال
          </div>
        </div>

        {/* فیلترهای انتخاب‌شده فعلی — حذف تکی یا همه */}
        {activeFiltersList.length > 0 && (
          <div className="grid gap-2 rounded-(--border-radius) border border-[var(--color-border)] bg-[var(--color-surface-700)] p-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-(--color-text-700) text-[length:var(--fz-300)] font-medium">
                فیلترهای اعمال‌شده
              </span>
              <button
                type="button"
                onClick={removeAllFilters}
                className="border-none rounded-(--border-radius) cursor-pointer px-2 py-1 text-[length:var(--fz-300)] text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
              >
                حذف همه
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {activeFiltersList.map(({ key, value }) => (
                <span
                  key={`${key}-${value}`}
                  className="inline-flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-300)] py-1 pr-2 pl-1 text-[length:var(--fz-300)] text-(--color-text-700)"
                >
                  <span className="font-medium text-[var(--color-primary)]">
                    {SEARCH_FILTER_LABELS[key]}:
                  </span>
                  <span>{formatFilterDisplayValue(key, value)}</span>
                  <button
                    type="button"
                    onClick={() => removeOneFilter(key, value)}
                    className="flex size-5 shrink-0 items-center justify-center rounded-full border-none bg-[var(--color-danger)]/20 text-[var(--color-danger)] hover:bg-[var(--color-danger)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                    title="حذف این فیلتر"
                    aria-label="حذف این فیلتر"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-[1fr_auto] gap-2 max-[48rem]:grid-cols-1">
          <input
            type="text"
            value={presetName}
            onChange={inputChangeHandler}
            maxLength={40}
            placeholder="نام پیش‌فرض (اختیاری)"
            className="bg-[var(--color-surface-700)] text-[var(--color-text-400)] text-[length:var(--fz-300)] border border-[var(--color-border)] rounded-(--border-radius) px-2.5 py-1.5 focus-visible:border-[var(--color-primary)] focus-visible:outline-none"
          />

          <button
            type="button"
            onClick={saveClickHandler}
            className="border-none rounded-(--border-radius) cursor-pointer transition-[filter] duration-[var(--animation-duration-fast)] ease-in-out disabled:cursor-not-allowed disabled:grayscale disabled:opacity-70 hover:brightness-105 bg-[var(--color-primary)] text-[var(--color-primary-opposite)] text-[length:var(--fz-300)] px-2.5 py-1.5 disabled:hover:brightness-100"
            disabled={activeFiltersCount === 0}
          >
            ذخیره
          </button>
        </div>

        {!presets.length && (
          <div className="text-(--color-text-700) text-[length:var(--fz-300)]">
            هنوز فیلتری ذخیره نشده.
          </div>
        )}

        {presets.length > 0 && (
          <>
            <ul className="grid gap-2">
              {presets.map((preset) => (
                <li
                  key={preset.id}
                  className="bg-[var(--color-surface-700)] border border-[var(--color-border)] rounded-(--border-radius) p-2.5 grid gap-1.5"
                >
                  <div className="flex items-center justify-between gap-2 max-[48rem]:items-start max-[48rem]:flex-col">
                    <div className="font-bold text-(--color-text-700) text-[length:var(--fz-300)]">
                      {preset.name}
                    </div>
                    <div className="text-(--color-text-700) text-[length:var(--fz-300)]">
                      {countActiveSearchFilters(preset.filters)} فیلتر · استفاده{" "}
                      {preset.usageCount}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {getActiveSearchFilters(preset.filters).map((filter) => (
                      <span
                        key={`${preset.id}-${filter.key}`}
                        className="bg-[var(--color-surface-300)] rounded-full px-2 py-0.5 text-[length:var(--fz-300)]"
                      >
                        {filter.value}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      className="border-none rounded-(--border-radius) cursor-pointer transition-[filter] duration-[var(--animation-duration-fast)] ease-in-out disabled:cursor-not-allowed disabled:grayscale disabled:opacity-70 hover:brightness-105 bg-[var(--color-primary)] text-[var(--color-primary-opposite)] px-2 py-1 text-[length:var(--fz-300)] disabled:hover:brightness-100"
                      onClick={() => applyClickHandler(preset)}
                    >
                      اعمال
                    </button>

                    <button
                      type="button"
                      className="border-none rounded-(--border-radius) cursor-pointer transition-[filter] duration-[var(--animation-duration-fast)] ease-in-out disabled:cursor-not-allowed disabled:grayscale disabled:opacity-70 hover:brightness-105 bg-[var(--color-danger)] text-[var(--color-gray-93)] px-2 py-1 text-[length:var(--fz-300)] disabled:hover:brightness-100"
                      onClick={() => removePreset(preset.id)}
                    >
                      حذف
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="border-none rounded-(--border-radius) cursor-pointer transition-[filter] duration-[var(--animation-duration-fast)] ease-in-out disabled:cursor-not-allowed disabled:grayscale disabled:opacity-70 hover:brightness-105 bg-[var(--color-danger)] text-[var(--color-gray-93)] text-[length:var(--fz-300)] px-2.5 py-1.5 disabled:hover:brightness-100"
              onClick={clearPresets}
            >
              پاک کردن همهٔ پیش‌فرض‌ها
            </button>
          </>
        )}
      </div>
    </CardComponent>
  );
}
