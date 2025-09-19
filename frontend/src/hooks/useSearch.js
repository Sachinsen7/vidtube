import { useState, useCallback } from "react";
import { getAllVideos } from "../services/video";
import { debounce } from "../utils/debounce";

export const useSearch = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = useCallback(
        debounce(async (query) => {
            if (!query.trim()) {
                setSearchResults([]);
                return;
            }
            setIsLoading(true);
            try {
                const videos = await getAllVideos({ query });
                setSearchResults(videos);
            } catch (err) {
                setError(err.response?.data?.message || "Search failed");
            }
            setIsLoading(false);
        }, 500),
        []
    );

    return { searchResults, isLoading, error, search: handleSearch };
};
