import { create } from "zustand";
import { persist } from "zustand/middleware";

const useThemeStore = create(
    persist(
        (set) => ({
            mode: "light",
            toggleMode: () => {
                set((state) => ({
                    mode: state.mode === "light" ? "dark" : "light",
                }));
            },
        }),
        { name: "theme-storage" }
    )
);

export default useThemeStore;
