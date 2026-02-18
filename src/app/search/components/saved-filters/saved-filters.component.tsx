"use client";

import {
  ChangeEvent,
  ReactElement,
  useContext,
  useMemo,
  useState,
} from "react";

import CardComponent from "@/components/card-component/card-component";

import { FiltersContext } from "../../providers/filter.providers";
import {
  countActiveSearchFilters,
  getActiveSearchFilters,
  isSearchFiltersEmpty,
  SEARCH_FILTER_LABELS,
  SearchFilterKey,
  formatFilterDisplayValue,
} from "@/app/search/utils/search-filters";
import {
  SearchPreset,
  useSearchPresetsStore,
} from "@/store/searchPresetsStore";

import { Bookmark, Trash2, Play, X } from "lucide-react";

export default function SavedFiltersComponent(): ReactElement {
  const { filters, dispatchFilters } = useContext(FiltersContext);
  const [presetName, setPresetName] = useState("");
  const [expandSave, setExpandSave] = useState(false);

  const { presets, addPreset, removePreset, touchPreset, clearPresets } =
    useSearchPresetsStore();

  const activeFiltersCount = useMemo(
    () => countActiveSearchFilters(filters),
    [filters],
  );

  const activeFilters = useMemo(
    () => getActiveSearchFilters(filters),
    [filters],
  );
  const hasActiveFilters = useMemo(
    () => !isSearchFiltersEmpty(filters),
    [filters],
  );

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setPresetName(event.currentTarget.value);
  };

  const saveClickHandler = (): void => {
    addPreset(presetName.trim() || "فیلتر ذخیره‌شده", filters);
    setPresetName("");
    setExpandSave(false);
  };

  const applyClickHandler = (preset: SearchPreset): void => {
    dispatchFilters({ type: "replaced_filters", filters: preset.filters });
    touchPreset(preset.id);
  };

  const removeAllButtonClickHandler = (): void => {
    dispatchFilters({ type: "removed_all" });
  };

  const filterClickHandler = (key: SearchFilterKey): void => {
    dispatchFilters({ type: "removed_filter", key });
  };

  return (
    <CardComponent>
      <div className="grid gap-4" dir="rtl">
        {/* عنوان */}
        <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-3">
          <Bookmark className="size-5 text-[var(--color-primary)]" />
          <h3 className="font-bold text-[var(--color-text-400)]">
            فیلترهای ذخیره‌شده
          </h3>
        </div>

        {/* فیلترهای فعلی */}
        {hasActiveFilters && (
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[var(--fz-300)] text-[var(--color-text-700)]">
                فیلترهای اعمال‌شده ({activeFiltersCount})
              </span>
              <button
                type="button"
                onClick={removeAllButtonClickHandler}
                className="inline-flex items-center gap-1 text-[var(--color-primary)] text-[var(--fz-300)] hover:underline"
              >
                <X className="size-3.5" />
                پاک کردن همه
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {activeFilters.map((filter) => (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => filterClickHandler(filter.key)}
                  className="inline-flex items-center gap-1 rounded-full bg-[var(--color-surface-400)] px-2.5 py-1 text-[var(--fz-300)] text-[var(--color-text-400)] transition-colors hover:bg-[var(--color-surface-300)]"
                >
                  <span>
                    {SEARCH_FILTER_LABELS[filter.key]}:{" "}
                    {formatFilterDisplayValue(filter.key, filter.value)}
                  </span>
                  <X className="size-3 opacity-70" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ذخیره فیلتر فعلی */}
        <div className="space-y-2">
          {!expandSave ? (
            <button
              type="button"
              onClick={() => setExpandSave(true)}
              disabled={!hasActiveFilters}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[var(--color-border)] py-2.5 text-[var(--fz-300)] text-[var(--color-text-700)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Bookmark className="size-4" />
              ذخیره این فیلترها
            </button>
          ) : (
            <div className="space-y-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-700)] p-3">
              <label className="block text-[var(--fz-300)] text-[var(--color-text-700)]">
                نام (اختیاری)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={presetName}
                  onChange={inputChangeHandler}
                  onKeyDown={(e) => e.key === "Escape" && setExpandSave(false)}
                  maxLength={40}
                  placeholder="مثلاً: تهران، ارزان"
                  className="flex-1 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-400)] px-2.5 py-1.5 text-[var(--fz-300)] text-[var(--color-text-400)] placeholder:text-[var(--color-text-700)] focus:border-[var(--color-primary)] focus:outline-none"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={saveClickHandler}
                  className="rounded-md bg-[var(--color-primary)] px-3 py-1.5 text-[var(--fz-300)] text-[var(--color-primary-opposite)] transition-opacity hover:opacity-90"
                >
                  ذخیره
                </button>
                <button
                  type="button"
                  onClick={() => setExpandSave(false)}
                  className="rounded-md px-2 text-[var(--color-text-700)] hover:bg-[var(--color-surface-400)]"
                  aria-label="لغو"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* لیست ذخیره‌شده‌ها */}
        <div className="space-y-2">
          {presets.length === 0 ? (
            <p className="rounded-lg bg-[var(--color-surface-700)] px-3 py-4 text-center text-[var(--fz-300)] text-[var(--color-text-700)]">
              هنوز فیلتری ذخیره نکرده‌اید. فیلترها را انتخاب و با دکمه بالا
              ذخیره کنید.
            </p>
          ) : (
            <>
              <span className="block text-[var(--fz-300)] text-[var(--color-text-700)]">
                {presets.length} ذخیره‌شده
              </span>
              <ul className="grid gap-2">
                {presets.map((preset) => (
                  <li
                    key={preset.id}
                    className="flex flex-col gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-700)] p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-medium text-[var(--color-text-400)]">
                        {preset.name || "بدون نام"}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => applyClickHandler(preset)}
                          className="inline-flex items-center gap-1 rounded-md bg-[var(--color-primary)] px-2 py-1 text-[var(--fz-300)] text-[var(--color-primary-opposite)] transition-opacity hover:opacity-90"
                          title="اعمال"
                        >
                          <Play className="size-3.5" />
                          اعمال
                        </button>
                        <button
                          type="button"
                          onClick={() => removePreset(preset.id)}
                          className="rounded-md p-1 text-[var(--color-text-700)] transition-colors hover:bg-[var(--color-danger)] hover:text-[var(--color-gray-93)]"
                          title="حذف"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {getActiveSearchFilters(preset.filters).map((filter) => (
                        <span
                          key={`${preset.id}-${filter.key}`}
                          className="rounded-full bg-[var(--color-surface-300)] px-2 py-0.5 text-[var(--fz-300)] text-[var(--color-text-700)]"
                        >
                          {formatFilterDisplayValue(filter.key, filter.value)}
                        </span>
                      ))}
                    </div>
                    {preset.usageCount > 0 && (
                      <span className="text-[var(--fz-300)] text-[var(--color-text-700)]">
                        استفاده‌شده {preset.usageCount} بار
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              {presets.length > 1 && (
                <button
                  type="button"
                  onClick={clearPresets}
                  className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-md py-2 text-[var(--fz-300)] text-[var(--color-danger)] transition-colors hover:bg-[var(--color-surface-700)]"
                >
                  <Trash2 className="size-3.5" />
                  حذف همه ذخیره‌ها
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </CardComponent>
  );
}
