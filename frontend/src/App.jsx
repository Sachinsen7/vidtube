import React from "react";
import { ThemeProvider } from "@mui/material";
import useThemeStore from "./stores/themeStore";
import getTheme, { setCSSVariables } from "./styles/theme";
import { Outlet } from "react-router-dom";

function App() {
    const { mode } = useThemeStore();

    useEffect(() => {
        setCSSVariables(mode);
    }, [mode]);
    const theme = getTheme(mode);
    return (
        <ThemeProvider theme={theme}>
            <Outlet />
        </ThemeProvider>
    );
}

export default App;
