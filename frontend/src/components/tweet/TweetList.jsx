import React from "react";
import {
    Box,
    Typography,
    Grid,
    CircularProgress,
    Alert,
    useMediaQuery,
} from "@mui/material";
import { useTweets } from "../../hooks/useTweets";
import TweetCard from "./TweetCard";
import InfiniteScroll from "react-infinite-scroll-component";

const TweetList = ({ userId }) => {
    const isMobile = useMediaQuery("(max-width:600px)");
    const { tweets, isLoading, error, page, setPage, hasMore } =
        useTweets(userId);

    if (isLoading && page === 1) {
        return (
            <CircularProgress
                sx={{
                    display: "block",
                    mx: "auto",
                    my: 2,
                    color: "var(--secondary-color)",
                }}
            />
        );
    }

    if (error) {
        return (
            <Alert
                severity="error"
                sx={{ maxWidth: 600, mx: "auto", borderRadius: 2 }}
            >
                {error}
            </Alert>
        );
    }

    return (
        <Box
            sx={{
                p: { xs: 2, sm: 3, md: 4 },
                width: "100%",
                maxWidth: "100%",
                background: "linear-gradient(135deg, #fcffff 0%, #e6f0fa 100%)",
                borderRadius: 3,
                boxShadow: "0 6px 20px rgba(4, 54, 100, 0.15)",
            }}
        >
            <Typography
                variant={isMobile ? "h6" : "h5"}
                gutterBottom
                sx={{
                    color: "var(--primary-color)",
                    textAlign: { xs: "center", sm: "left" },
                    fontWeight: "bold",
                }}
            >
                Your Tweets
            </Typography>
            <InfiniteScroll
                dataLength={tweets.length}
                next={() => setPage(page + 1)}
                hasMore={hasMore}
                loader={
                    <CircularProgress
                        sx={{
                            display: "block",
                            mx: "auto",
                            my: 2,
                            color: "var(--secondary-color)",
                        }}
                    />
                }
            >
                <Grid container spacing={2}>
                    {tweets.map((tweet) => (
                        <Grid item xs={12} key={tweet._id}>
                            <TweetCard tweet={tweet} userId={userId} />
                        </Grid>
                    ))}
                </Grid>
            </InfiniteScroll>
        </Box>
    );
};

export default TweetList;
