import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserProfileData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  nationalId: string;
  address: string;
  birthDate: string;
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
  username: "",
  email: "",
  phone: "",
  nationalId: "",
  address: "",
  birthDate: "",
};

const requiredFields: Array<keyof UserProfileData> = [
  "firstName",
  "lastName",
  "username",
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
      version: 2,
    },
  ),
);
