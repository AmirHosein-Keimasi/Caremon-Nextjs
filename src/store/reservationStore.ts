import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RentalItem } from "./cartStore";

/**
 * Reservation Status Enum
 * حالت رزرو
 */
export enum ReservationStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  ACTIVE = "active",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

/**
 * Reservation/Order Type
 * نوع رزرو/سفارش
 */
export interface Reservation {
  id: string;
  userId: string;
  rental: RentalItem;
  status: ReservationStatus;
  totalPrice: number;

  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Dates
  createdAt: number;
  reservationStartDate: string;
  reservationEndDate: string;

  // Payment
  paymentStatus: "pending" | "completed" | "failed";
  paymentMethod?: "card" | "bank_transfer" | "cash";
  paidAmount: number;

  // Additional Info
  notes?: string;
  cancellationReason?: string;
  cancelledAt?: number;
}

/**
 * Reservation Store State & Actions
 */
interface ReservationStore {
  reservations: Reservation[];
  currentReservation: Reservation | null;

  // Actions
  createReservation: (
    reservation: Omit<Reservation, "id" | "createdAt">,
  ) => string;
  updateReservation: (id: string, updates: Partial<Reservation>) => void;
  deleteReservation: (id: string) => void;
  setCurrentReservation: (reservation: Reservation | null) => void;
  getReservation: (id: string) => Reservation | undefined;
  getReservationsByStatus: (status: ReservationStatus) => Reservation[];
  getReservationsByUserId: (userId: string) => Reservation[];

  // Payment
  updatePaymentStatus: (
    id: string,
    paymentStatus: "pending" | "completed" | "failed",
    amount: number,
  ) => void;

  // Status
  updateStatus: (id: string, status: ReservationStatus) => void;
  cancelReservation: (id: string, reason: string) => void;
}

/**
 * Zustand Reservation Store with Persistence
 */
export const useReservationStore = create<ReservationStore>()(
  persist(
    (set, get) => ({
      reservations: [],
      currentReservation: null,

      createReservation: (
        reservation: Omit<Reservation, "id" | "createdAt">,
      ) => {
        const id = `RES-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newReservation: Reservation = {
          ...reservation,
          id,
          createdAt: Date.now(),
        };

        set((state) => ({
          reservations: [...state.reservations, newReservation],
          currentReservation: newReservation,
        }));

        return id;
      },

      updateReservation: (id: string, updates: Partial<Reservation>) =>
        set((state) => {
          const newReservations = state.reservations.map((res) =>
            res.id === id ? { ...res, ...updates } : res,
          );

          return {
            reservations: newReservations,
            currentReservation:
              state.currentReservation?.id === id
                ? { ...state.currentReservation, ...updates }
                : state.currentReservation,
          };
        }),

      deleteReservation: (id: string) =>
        set((state) => {
          const newReservations = state.reservations.filter(
            (res) => res.id !== id,
          );
          return {
            reservations: newReservations,
            currentReservation:
              state.currentReservation?.id === id
                ? null
                : state.currentReservation,
          };
        }),

      setCurrentReservation: (reservation: Reservation | null) =>
        set({
          currentReservation: reservation,
        }),

      getReservation: (id: string) =>
        get().reservations.find((res) => res.id === id),

      getReservationsByStatus: (status: ReservationStatus) =>
        get().reservations.filter((res) => res.status === status),

      getReservationsByUserId: (userId: string) =>
        get().reservations.filter((res) => res.userId === userId),

      updatePaymentStatus: (
        id: string,
        paymentStatus: "pending" | "completed" | "failed",
        amount: number,
      ) =>
        set((state) => {
          const newReservations = state.reservations.map((res) =>
            res.id === id
              ? {
                  ...res,
                  paymentStatus,
                  paidAmount: amount,
                  status:
                    paymentStatus === "completed"
                      ? ReservationStatus.CONFIRMED
                      : res.status,
                }
              : res,
          );

          return {
            reservations: newReservations,
            currentReservation:
              state.currentReservation?.id === id
                ? newReservations.find((res) => res.id === id) || null
                : state.currentReservation,
          };
        }),

      updateStatus: (id: string, status: ReservationStatus) =>
        set((state) => {
          const newReservations = state.reservations.map((res) =>
            res.id === id ? { ...res, status } : res,
          );

          return {
            reservations: newReservations,
            currentReservation:
              state.currentReservation?.id === id
                ? { ...state.currentReservation, status }
                : state.currentReservation,
          };
        }),

      cancelReservation: (id: string, reason: string) =>
        set((state) => {
          const newReservations = state.reservations.map((res) =>
            res.id === id
              ? {
                  ...res,
                  status: ReservationStatus.CANCELLED,
                  cancellationReason: reason,
                  cancelledAt: Date.now(),
                }
              : res,
          );

          return {
            reservations: newReservations,
            currentReservation:
              state.currentReservation?.id === id
                ? newReservations.find((res) => res.id === id) || null
                : state.currentReservation,
          };
        }),
    }),
    {
      name: "caremon-reservations",
      version: 1,
    },
  ),
);
