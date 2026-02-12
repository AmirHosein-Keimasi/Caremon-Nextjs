import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface UserProfileStore {
  profile: UserProfileData;
  setProfile: (profile: UserProfileData) => void;
  updateProfile: (updates: Partial<UserProfileData>) => void;
  clearProfile: () => void;
  isProfileComplete: () => boolean;
}

const emptyProfile: UserProfileData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

const requiredFields: Array<keyof UserProfileData> = [
  "firstName",
  "lastName",
  "email",
  "phone",
];

export const useUserProfileStore = create<UserProfileStore>()(
  persist(
    (set, get) => ({
      profile: emptyProfile,
      setProfile: (profile) => set({ profile }),
      updateProfile: (updates) =>
        set((state) => ({
          profile: {
            ...state.profile,
            ...updates,
          },
        })),
      clearProfile: () => set({ profile: emptyProfile }),
      isProfileComplete: () =>
        requiredFields.every((field) => !!get().profile[field].trim()),
    }),
    {
      name: "caremon-user-profile",
      version: 1,
    },
  ),
);
