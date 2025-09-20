// src/components/auth/LoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    CircularProgress,
    Alert,
    useMediaQuery,
} from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import Button from "../common/Button";
import Input from "../common/Input";

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
    });
    const { login, isLoading, error } = useAuth();
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width:600px)");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData);
            navigate("/");
        } catch (err) {
            // Error is handled by useAuth hook
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: { xs: "100%", sm: 400 },
                width: "100%",
                mx: "auto",
                p: { xs: 2, sm: 3 },
            }}
        >
            <Typography
                variant={isMobile ? "h6" : "h5"}
                gutterBottom
                sx={{
                    color: "var(--primary-color)",
                    textAlign: { xs: "center", sm: "left" },
                }}
            >
                Login
            </Typography>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
            />
            <Input
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
            />
            <Input
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
            />
            <Button type="submit" disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} /> : "Login"}
            </Button>
        </Box>
    );
};

export default LoginForm;
