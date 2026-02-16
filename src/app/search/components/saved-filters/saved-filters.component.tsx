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

import styles from "./saved-filters.module.css";

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
      <div className={styles.savedFilters}>
        <div className={styles.header}>
          <div className={styles.title}>Saved filters</div>
          <div className={styles.activeBadge}>{activeFiltersCount} active</div>
        </div>

        <div className={styles.form}>
          <input
            type="text"
            value={presetName}
            onChange={inputChangeHandler}
            maxLength={40}
            placeholder="Preset name (optional)"
            className={styles.nameInput}
          />

          <button
            type="button"
            onClick={saveClickHandler}
            className={styles.saveButton}
            disabled={activeFiltersCount === 0}
          >
            Save
          </button>
        </div>

        {!presets.length && (
          <div className={styles.empty}>No saved presets yet.</div>
        )}

        {presets.length > 0 && (
          <>
            <ul className={styles.list}>
              {presets.map((preset) => (
                <li key={preset.id} className={styles.item}>
                  <div className={styles.itemHead}>
                    <div className={styles.itemName}>{preset.name}</div>
                    <div className={styles.meta}>
                      {countActiveSearchFilters(preset.filters)} filters | used{" "}
                      {preset.usageCount}
                    </div>
                  </div>

                  <div className={styles.tags}>
                    {getActiveSearchFilters(preset.filters).map((filter) => (
                      <span key={`${preset.id}-${filter.key}`}>
                        {filter.value}
                      </span>
                    ))}
                  </div>

                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={styles.applyButton}
                      onClick={() => applyClickHandler(preset)}
                    >
                      Apply
                    </button>

                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => removePreset(preset.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className={styles.clearButton}
              onClick={clearPresets}
            >
              Clear presets
            </button>
          </>
        )}
      </div>
    </CardComponent>
  );
}
