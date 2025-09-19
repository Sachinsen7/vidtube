import { useCallback } from "react";
import useThemeStore from "../stores/themeStore";

export const useTheme = () => {
    const { mode, toggleMode } = useThemeStore();

    const handleToggleMode = useCallback(() => {
        toggleMode();
    }, [toggleMode]);

    return {
        mode,
        toggleMode: handleToggleMode,
    };
};
