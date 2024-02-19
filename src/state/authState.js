import { create } from "zustand"
import { persist } from "zustand/middleware"
export const useAuthState = create(
    persist(
        (set) => ({
            isLogged: false,
            user: {},
            setIsLogged: (state) => set({ isLogged: state }),
            setUser: (user) => set({ user }),
        }),
        {
            name: "auth_storage",
            getStorage: () => localStorage,
        }
    )
)
