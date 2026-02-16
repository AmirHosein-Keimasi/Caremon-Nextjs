import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  countActiveSearchFilters,
  normalizeSearchFilters,
} from "@/app/search/utils/search-filters";
import { FiltersType } from "@/types/filter.type";

const MAX_PRESETS = 8;

export interface SearchPreset {
  id: string;
  name: string;
  filters: FiltersType;
  createdAt: number;
  updatedAt: number;
  usageCount: number;
}

interface SearchPresetsStore {
  presets: SearchPreset[];
  addPreset: (name: string, filters: FiltersType) => void;
  removePreset: (id: string) => void;
  touchPreset: (id: string) => void;
  clearPresets: () => void;
}

function generatePresetId(): string {
  return `preset-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function serializeFilters(filters: FiltersType): string {
  return JSON.stringify(normalizeSearchFilters(filters));
}

export const useSearchPresetsStore = create<SearchPresetsStore>()(
  persist(
    (set) => ({
      presets: [],

      addPreset: (name: string, filters: FiltersType) =>
        set((state) => {
          const normalizedFilters = normalizeSearchFilters(filters);

          if (countActiveSearchFilters(normalizedFilters) === 0) {
            return state;
          }

          const now = Date.now();
          const normalizedName =
            name.trim() || `Preset ${state.presets.length + 1}`;
          const serializedFilters = serializeFilters(normalizedFilters);

          const existingPreset = state.presets.find(
            (preset) => serializeFilters(preset.filters) === serializedFilters,
          );

          if (existingPreset) {
            const updatedPreset: SearchPreset = {
              ...existingPreset,
              name: normalizedName,
              filters: normalizedFilters,
              updatedAt: now,
            };

            return {
              presets: [
                updatedPreset,
                ...state.presets.filter(
                  (preset) => preset.id !== existingPreset.id,
                ),
              ].slice(0, MAX_PRESETS),
            };
          }

          const preset: SearchPreset = {
            id: generatePresetId(),
            name: normalizedName,
            filters: normalizedFilters,
            createdAt: now,
            updatedAt: now,
            usageCount: 0,
          };

          return {
            presets: [preset, ...state.presets].slice(0, MAX_PRESETS),
          };
        }),

      removePreset: (id: string) =>
        set((state) => ({
          presets: state.presets.filter((preset) => preset.id !== id),
        })),

      touchPreset: (id: string) =>
        set((state) => {
          const preset = state.presets.find((candidate) => candidate.id === id);

          if (!preset) {
            return state;
          }

          const updatedPreset: SearchPreset = {
            ...preset,
            usageCount: preset.usageCount + 1,
            updatedAt: Date.now(),
          };

          return {
            presets: [
              updatedPreset,
              ...state.presets.filter((candidate) => candidate.id !== id),
            ],
          };
        }),

      clearPresets: () =>
        set({
          presets: [],
        }),
    }),
    {
      name: "caremon-search-presets",
      version: 1,
    },
  ),
);
