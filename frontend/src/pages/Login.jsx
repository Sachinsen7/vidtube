import React from "react";
import { Box, Typography } from "@mui/material";
import LoginForm from "../components/auth/loginForm";

function Login() {
    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "60vh",
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                sx={{ color: "var(--primary-color)", textAlign: "center" }}
            >
                Welcome Back
            </Typography>
            <LoginForm />
        </Box>
    );
}

export default Login;
