import React, { useEffect } from "react";
import {
    Box,
    Typography,
    useMediaQuery,
    Grid,
    CircularProgress,
    Button,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchBar from "../components/common/SearchBar";
import { useVideos } from "../hooks/useVideo";
import VideoCard from "../components/video/VideoCard";

const Home = () => {
    const isMobile = useMediaQuery("(max-width:600px)");
    const { trending, trendCursor, loadTrending } = useVideos();

    useEffect(() => {
        loadTrending();
    }, []);

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: 1400,
                mx: "auto",
                p: { xs: 2, sm: 3, md: 4 },
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
            {!trending.length ? (
                <CircularProgress
                    sx={{ display: "block", mx: "auto", my: 4 }}
                />
            ) : (
                <InfiniteScroll
                    dataLength={trending.length}
                    next={() => loadTrending(trendCursor)}
                    hasMore={Boolean(trendCursor)}
                    loader={
                        <CircularProgress
                            sx={{ display: "block", mx: "auto", my: 2 }}
                        />
                    }
                >
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        {trending.map((video) => (
                            <Grid item xs={12} sm={6} md={4} key={video._id}>
                                <VideoCard video={video} />
                            </Grid>
                        ))}
                    </Grid>
                </InfiniteScroll>
            )}

            {Boolean(trendCursor) && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={() => loadTrending(trendCursor)}
                    >
                        Load more
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default Home;
