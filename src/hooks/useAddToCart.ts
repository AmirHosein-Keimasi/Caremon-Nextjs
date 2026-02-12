import { useCartStore, RentalItem } from "@/store/cartStore";
import { useCallback } from "react";
import {
  showSuccessNotification,
  showErrorNotification,
} from "@/lib/error-notifications";
import { CarsModel } from "@/models/cars.model";

/**
 * Hook to add cars to cart with reservation options (Single Rental)
 * هوک برای اضافه کردن خودرو به سبد با گزینه های رزرو (رزرو منفرد)
 */
export function useAddToCart() {
  const { setRental } = useCartStore();

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
    }) => {
      try {
        // Validate dates
        const start = new Date(params.startDate);
        const end = new Date(params.endDate);

        if (start >= end) {
          showErrorNotification("تاریخ پایان باید بعد از تاریخ شروع باشد");
          return false;
        }

        // Calculate rental days
        const rentalDays = Math.ceil(
          (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
        );

        if (rentalDays <= 0) {
          showErrorNotification("مدت اجاره باید حداقل 1 روز باشد");
          return false;
        }

        const rentalItem: RentalItem = {
          id: `rental-${params.car.id}-${Date.now()}`,
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
          addedAt: Date.now(),
        };

        setRental(rentalItem);
        showSuccessNotification(`${params.car.name} به سبد خرید اضافه شد`);
        return true;
      } catch (error) {
        console.error("Error adding to cart:", error);
        showErrorNotification("خطا در اضافه کردن به سبد خرید");
        return false;
      }
    },
    [setRental],
  );

  return { addItem };
}
