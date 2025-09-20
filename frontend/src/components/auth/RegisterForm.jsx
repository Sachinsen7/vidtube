import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import Button from "../common/Button";
import Input from "../common/Input";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        fullName: "",
        password: "",
        avatar: null,
        coverImage: null,
    });
    const { register, isLoading, error } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value) data.append(key, value);
        });
        await register(data);
        if (!error) navigate("/");
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: { xs: "100%", sm: 400 },
                width: "100%",
                mx: "auto",
                p: 2,
            }}
        >
            <Typography
                variant="h5"
                gutterBottom
                sx={{ color: "var(--primary-color)" }}
            >
                Register
            </Typography>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            <Input
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
            />
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
                label="Full Name"
                name="fullName"
                value={formData.fullName}
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
            <Input
                label="Avatar"
                name="avatar"
                type="file"
                accept="image/*"
                onChange={handleChange}
                sx={{ mb: 2 }}
            />
            <Input
                label="Cover Image"
                name="coverImage"
                type="file"
                accept="image/*"
                onChange={handleChange}
                sx={{ mb: 2 }}
            />
            <Button type="submit" disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} /> : "Register"}
            </Button>
        </Box>
    );
};

export default RegisterForm;
