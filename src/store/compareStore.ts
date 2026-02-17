import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_COMPARE = 5;
const STORAGE_KEY = "caremon-compare";

interface CompareStore {
  carIds: string[];
  addCar: (id: string) => void;
  removeCar: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      carIds: [],

      addCar: (id: string) =>
        set((state) => {
          if (state.carIds.includes(id) || state.carIds.length >= MAX_COMPARE) {
            return state;
          }
          return { carIds: [...state.carIds, id] };
        }),

      removeCar: (id: string) =>
        set((state) => ({
          carIds: state.carIds.filter((cid) => cid !== id),
        })),

      clearCompare: () => set({ carIds: [] }),

      isInCompare: (id: string) => get().carIds.includes(id),
    }),
    {
      name: STORAGE_KEY,
      version: 1,
    },
  ),
);
