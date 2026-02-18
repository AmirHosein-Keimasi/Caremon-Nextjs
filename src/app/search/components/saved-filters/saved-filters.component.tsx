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
    <CardComponent>
      <div className="grid gap-3">
        <div className="flex items-center justify-between gap-2">
          <div className="font-black text-(--color-text-700) text-[length:var(--fz-300)]">فیلترهای ذخیره‌شده</div>
          <div className="bg-[var(--color-surface-700)] text-(--color-text-700) rounded-full px-2.5 py-0.5 text-[length:var(--fz-300)]">
            {activeFiltersCount} فعال
          </div>
        </div>

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
                    <div className="font-bold text-(--color-text-700) text-[length:var(--fz-300)]">{preset.name}</div>
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
