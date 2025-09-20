import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import SearchBar from "../components/common/SearchBar";
import VideoList from "../components/dashboard/VideoList";

const Home = () => {
    const isMobile = useMediaQuery("(max-width:600px)");

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "100%",
            }}
        >
            <Typography
                variant={isMobile ? "h5" : "h4"}
                gutterBottom
                sx={{
                    color: "var(--primary-color)",
                    textAlign: { xs: "center", sm: "left" },
                }}
            ></Typography>
            <SearchBar />
            <VideoList />
        </Box>
    );
};

export default Home;
