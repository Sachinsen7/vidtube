import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import Button from "../common/Button";
import Input from "../common/Input";

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { login, isLoading, error } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData);
        if (!error) {
            navigate("/");
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ maxWidth: 400, mx: "auto", p: 2 }}
        >
            <Typography variant="h5" gutterBottom>
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
