import { create } from "zustand";
import { useReservationStore, ReservationStatus } from "./reservationStore";
import { useCartStore } from "./cartStore";

/**
 * Dashboard Stats
 * آمارهای داشبورد
 */
export interface DashboardStats {
  totalReservations: number;
  activeReservations: number;
  completedReservations: number;
  cancelledReservations: number;
  totalRevenue: number;
  averageReservationValue: number;
  pendingPayments: number;
  cartValue: number;
  cartItemCount: number;
}

/**
 * Dashboard Store
 */
interface DashboardStore {
  stats: DashboardStats;
  refreshStats: (userId?: string) => void;
  getStats: () => DashboardStats;
}

/**
 * Zustand Dashboard Store
 */
export const useDashboardStore = create<DashboardStore>((set, get) => ({
  stats: {
    totalReservations: 0,
    activeReservations: 0,
    completedReservations: 0,
    cancelledReservations: 0,
    totalRevenue: 0,
    averageReservationValue: 0,
    pendingPayments: 0,
    cartValue: 0,
    cartItemCount: 0,
  },

  refreshStats: (userId?: string) => {
    const reservationStore = useReservationStore.getState();
    const cartStore = useCartStore.getState();
    const currentStats = get().stats;

    // Get reservations (filter by userId if provided)
    let reservations = reservationStore.reservations;
    if (userId) {
      reservations = reservations.filter((res) => res.userId === userId);
    }

    // Calculate stats
    const totalReservations = reservations.length;
    const activeReservations = reservations.filter(
      (res) => res.status === ReservationStatus.ACTIVE,
    ).length;
    const completedReservations = reservations.filter(
      (res) => res.status === ReservationStatus.COMPLETED,
    ).length;
    const cancelledReservations = reservations.filter(
      (res) => res.status === ReservationStatus.CANCELLED,
    ).length;

    // Revenue calculation
    const totalRevenue = reservations
      .filter((res) => res.paymentStatus === "completed")
      .reduce((sum, res) => sum + res.paidAmount, 0);

    const averageReservationValue =
      totalReservations > 0 ? totalRevenue / totalReservations : 0;

    // Pending payments
    const pendingPayments = reservations.filter(
      (res) => res.paymentStatus === "pending",
    ).length;

    // Cart stats
    const cartValue = cartStore.totalPrice;
    const cartItemCount = cartStore.totalItems;

    // Only update if values have changed
    const newStats = {
      totalReservations,
      activeReservations,
      completedReservations,
      cancelledReservations,
      totalRevenue,
      averageReservationValue,
      pendingPayments,
      cartValue,
      cartItemCount,
    };

    // Check if any value changed before calling set to prevent unnecessary updates
    const hasChanged =
      newStats.totalReservations !== currentStats.totalReservations ||
      newStats.activeReservations !== currentStats.activeReservations ||
      newStats.completedReservations !== currentStats.completedReservations ||
      newStats.cancelledReservations !== currentStats.cancelledReservations ||
      newStats.totalRevenue !== currentStats.totalRevenue ||
      newStats.averageReservationValue !==
        currentStats.averageReservationValue ||
      newStats.pendingPayments !== currentStats.pendingPayments ||
      newStats.cartValue !== currentStats.cartValue ||
      newStats.cartItemCount !== currentStats.cartItemCount;

    if (hasChanged) {
      set({ stats: newStats });
    }
  },

  getStats: () => get().stats,
}));
