import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CarsModel } from '@/models/cars.model';

/**
 * Cart Item Type
 * نوع آیتم سبد خرید
 */
export interface CartItem {
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
  quantity: number;
  addedAt: number;
}

/**
 * Cart Store State & Actions
 * استیت و اکشن های فروشگاه سبد
 */
interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;

  // Actions
  addToCart: (item: CartItem) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartItem: (cartItemId: string, updates: Partial<CartItem>) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Computed
  getCartItem: (cartItemId: string) => CartItem | undefined;
  getTotal: () => number;
  getItemCount: () => number;
}

/**
 * Calculate total price for a cart item
 */
const calculateItemTotal = (item: Omit<CartItem, 'totalPrice'>) => {
  let total = item.pricePerDay * item.rentalDays * item.quantity;

  if (item.withDriver && item.driverDays) {
    // Driver cost (approximation - adjust based on business logic)
    const driverCostPerDay = item.pricePerDay * 0.5;
    total += driverCostPerDay * item.driverDays;
  }

  return total;
};

/**
 * Zustand Cart Store with Persistence
 */
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addToCart: (item: CartItem) =>
        set((state) => {
          // Check if item already exists
          const existingIndex = state.items.findIndex(
            (i) =>
              i.car.id === item.car.id &&
              i.startDate === item.startDate &&
              i.endDate === item.endDate
          );

          let newItems = [...state.items];

          if (existingIndex >= 0) {
            // Update quantity
            newItems[existingIndex].quantity += item.quantity;
            newItems[existingIndex].totalPrice = calculateItemTotal(newItems[existingIndex]);
          } else {
            // Add new item
            const newItem = {
              ...item,
              id: `${item.car.id}-${item.startDate}-${Date.now()}`,
              totalPrice: calculateItemTotal(item),
            };
            newItems = [...newItems, newItem];
          }

          return {
            items: newItems,
            totalItems: newItems.reduce((sum, i) => sum + i.quantity, 0),
            totalPrice: newItems.reduce((sum, i) => sum + i.totalPrice, 0),
          };
        }),

      removeFromCart: (cartItemId: string) =>
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== cartItemId);
          return {
            items: newItems,
            totalItems: newItems.reduce((sum, i) => sum + i.quantity, 0),
            totalPrice: newItems.reduce((sum, i) => sum + i.totalPrice, 0),
          };
        }),

      updateCartItem: (cartItemId: string, updates: Partial<CartItem>) =>
        set((state) => {
          const newItems = state.items.map((item) => {
            if (item.id === cartItemId) {
              const updated = { ...item, ...updates };
              updated.totalPrice = calculateItemTotal(updated);
              return updated;
            }
            return item;
          });

          return {
            items: newItems,
            totalItems: newItems.reduce((sum, i) => sum + i.quantity, 0),
            totalPrice: newItems.reduce((sum, i) => sum + i.totalPrice, 0),
          };
        }),

      updateQuantity: (cartItemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(cartItemId);
          return;
        }

        set((state) => {
          const newItems = state.items.map((item) => {
            if (item.id === cartItemId) {
              const updated = { ...item, quantity };
              updated.totalPrice = calculateItemTotal(updated);
              return updated;
            }
            return item;
          });

          return {
            items: newItems,
            totalItems: newItems.reduce((sum, i) => sum + i.quantity, 0),
            totalPrice: newItems.reduce((sum, i) => sum + i.totalPrice, 0),
          };
        });
      },

      clearCart: () =>
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        }),

      getCartItem: (cartItemId: string) => get().items.find((i) => i.id === cartItemId),

      getTotal: () => get().totalPrice,

      getItemCount: () => get().totalItems,
    }),
    {
      name: 'caremon-cart', // Name of the storage
      version: 1,
    }
  )
);
