import React from "react";
import { Box, Typography } from "@mui/material";
import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
    return (
        <Box
            sx={{
                backgroundColor: "var(--background-color)",
                minHeight: "100vh",
                p: 2,
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
