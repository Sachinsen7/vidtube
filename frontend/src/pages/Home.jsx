import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Grid,
    CircularProgress,
    Button,
    Container,
    useMediaQuery,
    useTheme,
    Skeleton,
} from "@mui/material";
import { TrendingUp as TrendingIcon } from "@mui/icons-material";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchBar from "../components/common/SearchBar";
import VideoCard from "../components/video/VideoCard";
import { useVideos } from "../hooks/useVideo";

const Home = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const { trending, trendCursor, loadTrending } = useVideos();
    const [pageLoaded, setPageLoaded] = useState(false);

    useEffect(() => {
        loadTrending();
        setTimeout(() => setPageLoaded(true), 300);
    }, []);

    return (
        <Box sx={{ bgcolor: "#f5f5f5", py: 2, mr: "10px" }}>
            <Container sx={{ py: 2 }}>
                <Box
                    sx={{
                        bgcolor: "white",
                        p: 3,
                        borderRadius: 2,
                        mb: 2,
                        border: "1px solid #e0e0e0",
                        textAlign: "center",
                    }}
                >
                    <Typography
                        variant={isMobile ? "h5" : "h4"}
                        sx={{ color: "#1976d2", fontWeight: 600, mb: 1 }}
                        data-testid="hero-title"
                    >
                        Discover Amazing Content
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: "#757575",
                            mb: 2,
                            maxWidth: 600,
                            mx: "auto",
                        }}
                    >
                        Explore trending videos, connect with creators, and find
                        your next favorite content
                    </Typography>
                    <SearchBar />
                </Box>
                <Box
                    sx={{
                        bgcolor: "white",
                        p: 3,
                        borderRadius: 2,
                        border: "1px solid #e0e0e0",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <TrendingIcon
                            sx={{ fontSize: 28, color: "#1976d2", mr: 1 }}
                        />
                        <Typography
                            variant="h6"
                            sx={{ color: "#1976d2", fontWeight: 600 }}
                            data-testid="trending-title"
                        >
                            Trending Videos
                        </Typography>
                    </Box>
                    {!trending.length ? (
                        <Grid container spacing={2}>
                            {[...Array(6)].map((_, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Box
                                        sx={{
                                            bgcolor: "white",
                                            borderRadius: 2,
                                            border: "1px solid #e0e0e0",
                                        }}
                                    >
                                        <Skeleton
                                            variant="rectangular"
                                            height={180}
                                        />
                                        <Box sx={{ p: 2 }}>
                                            <Skeleton width="80%" height={16} />
                                            <Skeleton
                                                width="60%"
                                                height={12}
                                                sx={{ mt: 1 }}
                                            />
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <InfiniteScroll
                            dataLength={trending.length}
                            next={() => loadTrending(trendCursor)}
                            hasMore={Boolean(trendCursor)}
                            loader={
                                <CircularProgress
                                    sx={{
                                        display: "block",
                                        mx: "auto",
                                        my: 2,
                                        color: "#1976d2",
                                    }}
                                />
                            }
                        >
                            <Grid container spacing={2}>
                                {trending.map((video) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        lg={3}
                                        key={video._id}
                                    >
                                        <VideoCard video={video} />
                                    </Grid>
                                ))}
                            </Grid>
                        </InfiniteScroll>
                    )}
                    {Boolean(trendCursor) && (
                        <Box sx={{ textAlign: "center", mt: 2 }}>
                            <Button
                                variant="contained"
                                onClick={() => loadTrending(trendCursor)}
                                sx={{ bgcolor: "#1976d2", borderRadius: 1 }}
                                data-testid="load-more"
                            >
                                Load More Videos
                            </Button>
                        </Box>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default Home;
