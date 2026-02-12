import { useCartStore, CartItem } from '@/store/cartStore';
import { useCallback } from 'react';
import { showSuccessNotification, showErrorNotification } from '@/lib/error-notifications';
import { CarsModel } from '@/models/cars.model';

/**
 * Hook to add cars to cart with reservation options
 * هوک برای اضافه کردن خودرو به سبد با گزینه های رزرو
 */
export function useAddToCart() {
  const { addToCart } = useCartStore();

  const addItem = useCallback(
    (params: {
      car: CarsModel;
      startDate: string;
      endDate: string;
      pickupLocation: string;
      dropoffLocation: string;
      pricePerDay: number;
      withDriver?: boolean;
      driverDays?: number;
      selectedOptions?: string[];
      quantity?: number;
    }) => {
      try {
        // Validate dates
        const start = new Date(params.startDate);
        const end = new Date(params.endDate);

        if (start >= end) {
          showErrorNotification('تاریخ پایان باید بعد از تاریخ شروع باشد');
          return false;
        }

        // Calculate rental days
        const rentalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

        if (rentalDays <= 0) {
          showErrorNotification('مدت اجاره باید حداقل 1 روز باشد');
          return false;
        }

        const cartItem: CartItem = {
          id: '', // Will be set by store
          car: params.car,
          rentalDays,
          startDate: params.startDate,
          endDate: params.endDate,
          pickupLocation: params.pickupLocation,
          dropoffLocation: params.dropoffLocation,
          withDriver: params.withDriver ?? false,
          driverDays: params.driverDays,
          selectedOptions: params.selectedOptions ?? [],
          pricePerDay: params.pricePerDay,
          totalPrice: 0, // Will be calculated by store
          quantity: params.quantity ?? 1,
          addedAt: Date.now(),
        };

        addToCart(cartItem);
        showSuccessNotification(`${params.car.name} به سبد خرید اضافه شد`);
        return true;
      } catch (error) {
        console.error('Error adding to cart:', error);
        showErrorNotification('خطا در اضافه کردن به سبد خرید');
        return false;
      }
    },
    [addToCart]
  );

  return { addItem };
}
