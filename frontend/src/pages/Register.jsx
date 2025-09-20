import React from "react";
import { Box, Typography } from "@mui/material";
import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
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
                Join VidTube
            </Typography>
            <RegisterForm />
        </Box>
    );
};

export default Register;
