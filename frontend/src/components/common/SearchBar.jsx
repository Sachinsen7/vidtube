import React, { useState } from "react";
import { Grid, Box, TextField, CircularProgress } from "@mui/material";
import { useSearch } from "../../hooks/useSearch";
import VideoCard from "../video/VideoCard";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const { searchResults, isLoading, error, search } = useSearch();

    const handleSearch = (e) => {
        setQuery(e.target.value);
        search(e.target.value);
    };

    return (
        <Box
            sx={{
                maxWidth: 600,
                mx: "auto",
                p: 2,
                backgroundColor: "var(--background-color)",
            }}
        >
            <TextField
                label="Search Videos"
                variant="outlined"
                value={query}
                onChange={handleSearch}
                fullWidth
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "var(--primary-color)" },
                        "&:hover fieldset": {
                            borderColor: "var(--secondary-color)",
                        },
                    },
                    "& .MuiInputLabel-root": { color: "var(--primary-color)" },
                }}
            />
            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}
            {isLoading && (
                <CircularProgress
                    sx={{ display: "block", mx: "auto", my: 2 }}
                />
            )}
            <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    {searchResults.map((video) => (
                        <Grid item xs={12} sm={6} md={4} key={video._id}>
                            <VideoCard video={video} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default SearchBar;
