import React from "react";
import { ThemeProvider } from "@mui/material";
import { Routes } from "./routes";
import useThemeStore from "./stores/themeStore";
import getTheme from "./styles/theme";

function App() {
    const { mode } = useThemeStore();
    const theme = getTheme(mode);
    return (
        <ThemeProvider theme={theme}>
            <Routes />
        </ThemeProvider>
    );
}

export default App;
