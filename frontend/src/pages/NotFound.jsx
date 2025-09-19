import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                backgroundColor: "var(--background-color)",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
            }}
        >
            <Typography
                variant="h2"
                sx={{ color: "var(--primary-color)", mb: 2 }}
            >
                404
            </Typography>
            <Typography
                variant="h5"
                sx={{ color: "var(--secondary-color)", mb: 2 }}
            >
                Page Not Found
            </Typography>
            <Button
                variant="contained"
                onClick={() => navigate("/")}
                sx={{ backgroundColor: "var(--secondary-color)" }}
            >
                Go to Home
            </Button>
        </Box>
    );
};

export default NotFound;
