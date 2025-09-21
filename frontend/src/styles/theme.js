import { createTheme } from "@mui/material/styles";

const getTheme = (mode) =>
    createTheme({
        palette: {
            mode,
            primary: {
                main: "#043664",
            },
            secondary: {
                main: "#ff4d1a",
            },
            success: {
                main: "#52711a",
            },
            background: {
                default: mode === "light" ? "#fcffff" : "#121212",
                paper: mode === "light" ? "#ffffff" : "#1e1e1e",
            },
            text: {
                primary: mode === "light" ? "#043664" : "#fcffff",
                secondary: mode === "light" ? "#52711a" : "#ff4d1a",
            },
        },
        typography: {
            fontFamily:
                // '"Bebas Neue", "Roboto", "Helvetica", "Arial", sans-serif',
                '"Ubuntu", sans-serif',
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: "none",
                    },
                },
            },
            MuiContainer: {
                styleOverrides: {
                    root: {
                        width: "100%",
                        maxWidth: "100% !important",
                        paddingLeft: "0 !important",
                        paddingRight: "0 !important",
                    },
                },
            },
            MuiBox: {
                styleOverrides: {
                    root: {
                        boxSizing: "border-box",
                    },
                },
            },
        },
    });

const setCSSVariables = (mode) => {
    const root = document.documentElement;
    root.style.setProperty("--primary-color", "#043664");
    root.style.setProperty("--secondary-color", "#ff4d1a");
    root.style.setProperty("--success-color", "#52711a");
    root.style.setProperty(
        "--background-color",
        mode === "light" ? "#fcffff" : "#121212"
    );
};

export default getTheme;
export { setCSSVariables };
