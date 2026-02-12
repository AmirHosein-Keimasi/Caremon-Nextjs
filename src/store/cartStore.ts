import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CarsModel } from '@/models/cars.model';

/**
 * Rental Item Type (Single Car Rental)
 * نوع آیتم رزرو (رزرو یک ماشین)
 */
export interface RentalItem {
  id: string;
  car: CarsModel;
  rentalDays: number;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  withDriver: boolean;
  driverDays?: number;
  selectedOptions: string[]; // Additional options/features
  pricePerDay: number;
  totalPrice: number;
  addedAt: number;
}

/**
 * Cart Store State & Actions (Single Rental System)
 * استیت و اکشن های سیستم رزرو منفرد
 */
interface CartStore {
  currentRental: RentalItem | null;
  totalPrice: number;
  totalItems: number; // For compatibility - always 0 or 1

  // Actions
  setRental: (item: RentalItem) => void;
  clearRental: () => void;
  updateRental: (updates: Partial<RentalItem>) => void;
  
  // Computed
  getRental: () => RentalItem | null;
  getTotal: () => number;
}

/**
 * Calculate total price for rental item
 */
const calculateRentalTotal = (item: Omit<RentalItem, 'totalPrice'>) => {
  let total = item.pricePerDay * item.rentalDays;

  if (item.withDriver && item.driverDays) {
    // Driver cost (approximation - adjust based on business logic)
    const driverCostPerDay = item.pricePerDay * 0.5;
    total += driverCostPerDay * item.driverDays;
  }

  return total;
};

/**
 * Zustand Cart Store with Persistence (Single Rental System)
 */
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      currentRental: null,
      totalPrice: 0,
      totalItems: 0,

      setRental: (item: RentalItem) => {
        const totalPrice = calculateRentalTotal({
          id: item.id,
          car: item.car,
          rentalDays: item.rentalDays,
          startDate: item.startDate,
          endDate: item.endDate,
          pickupLocation: item.pickupLocation,
          dropoffLocation: item.dropoffLocation,
          withDriver: item.withDriver,
          driverDays: item.driverDays,
          selectedOptions: item.selectedOptions,
          pricePerDay: item.pricePerDay,
          addedAt: item.addedAt,
        });

        set({
          currentRental: {
            ...item,
            totalPrice,
            id: `${item.car.id}-${item.startDate}-${Date.now()}`,
          },
          totalPrice,
          totalItems: 1,
        });
      },

      clearRental: () =>
        set({
          currentRental: null,
          totalPrice: 0,
          totalItems: 0,
        }),

      updateRental: (updates: Partial<RentalItem>) =>
        set((state) => {
          if (!state.currentRental) return state;

          const updated = { ...state.currentRental, ...updates };
          const totalPrice = calculateRentalTotal({
            id: updated.id,
            car: updated.car,
            rentalDays: updated.rentalDays,
            startDate: updated.startDate,
            endDate: updated.endDate,
            pickupLocation: updated.pickupLocation,
            dropoffLocation: updated.dropoffLocation,
            withDriver: updated.withDriver,
            driverDays: updated.driverDays,
            selectedOptions: updated.selectedOptions,
            pricePerDay: updated.pricePerDay,
            addedAt: updated.addedAt,
          });

          return {
            currentRental: { ...updated, totalPrice },
            totalPrice,
          };
        }),

      getRental: () => get().currentRental,

      getTotal: () => get().totalPrice,
    }),
    {
      name: 'caremon-rental', // Name of the storage
      version: 1,
    }
  )
);
