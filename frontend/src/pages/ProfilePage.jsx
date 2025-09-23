import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Avatar,
    Button,
    TextField,
    CircularProgress,
    Alert,
    useMediaQuery,
    Tabs,
    Tab,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import TweetList from "../components/tweet/TweetList";
import TweetForm from "../components/tweet/TweetForm";
import VideoList from "../components/dashboard/VideoList";
import { useVideos } from "../hooks/useVideo";

const ProfilePage = () => {
    const {
        user,
        updateAccount,
        updateAvatar,
        updateCoverImage,
        isLoading,
        error,
    } = useAuth();
    const navigate = useNavigate();
    const { videos, loadVideos, setPages } = useVideos({ userId: user?._id });
    const isMobile = useMediaQuery("(max-width:600px)");
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ fullName: "", email: "" });
    const [avatarFile, setAvatarFile] = useState(null);
    const [coverFile, setCoverFile] = useState(null);
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        if (user) {
            setFormData({ fullName: user.fullName, email: user.email });
        }
    }, [user]);

    if (!user) {
        return (
            <Box
                sx={{
                    p: { xs: 2, sm: 3, md: 4 },
                    textAlign: "center",
                    background:
                        "linear-gradient(135deg, #fcffff 0%, #e6f0fa 100%)",
                    borderRadius: 3,
                    boxShadow: "0 6px 20px rgba(4, 54, 100, 0.15)",
                }}
            >
                <Typography
                    variant={isMobile ? "h5" : "h4"}
                    sx={{ color: "var(--primary-color)", fontWeight: "bold" }}
                >
                    Please log in to view your profile
                </Typography>
            </Box>
        );
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAvatarChange = (e) => {
        setAvatarFile(e.target.files[0]);
    };

    const handleCoverChange = (e) => {
        setCoverFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editMode) {
                await updateAccount(formData);
                if (avatarFile) await updateAvatar(avatarFile);
                if (coverFile) await updateCoverImage(coverFile);
                setEditMode(false);
                setAvatarFile(null);
                setCoverFile(null);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "100%",
                background: "linear-gradient(135deg, #fcffff 0%, #e6f0fa 100%)",
            }}
        >
            {/* Cover Image */}
            <Box
                sx={{
                    height: { xs: 150, sm: 200, md: 250 },
                    backgroundImage: `url(${user.coverImage || "https://via.placeholder.com/1200x300?text=Cover+Image"})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "0 0 20px 20px",
                    boxShadow: "0 6px 20px rgba(4, 54, 100, 0.15)",
                    position: "relative",
                }}
            >
                {editMode && (
                    <Box sx={{ position: "absolute", bottom: 10, right: 10 }}>
                        <input
                            accept="image/*"
                            style={{ display: "none" }}
                            id="cover-upload"
                            type="file"
                            onChange={handleCoverChange}
                        />
                        <label htmlFor="cover-upload">
                            <Button
                                component="span"
                                sx={{
                                    background:
                                        "linear-gradient(45deg, var(--primary-color) 30%, var(--secondary-color) 90%)",
                                    color: "#fcffff",
                                    borderRadius: 2,
                                    "&:hover": {
                                        background:
                                            "linear-gradient(45deg, #032e4b 30%, #e04416 90%)",
                                    },
                                }}
                            >
                                Change Cover
                            </Button>
                        </label>
                    </Box>
                )}
            </Box>

            <Box
                sx={{
                    maxWidth: { xs: "100%", sm: 800 },
                    mx: "auto",
                    p: { xs: 2, sm: 3 },
                    mt: -10,
                    background:
                        "linear-gradient(135deg, #fcffff 0%, #f0f4f8 100%)",
                    borderRadius: 3,
                    boxShadow: "0 6px 20px rgba(4, 54, 100, 0.15)",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Avatar
                        src={user.avatar}
                        sx={{
                            width: { xs: 80, sm: 100 },
                            height: { xs: 80, sm: 100 },
                            border: "3px solid var(--background-color)",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        }}
                    />
                    {editMode && (
                        <Box sx={{ ml: 2 }}>
                            <input
                                accept="image/*"
                                style={{ display: "none" }}
                                id="avatar-upload"
                                type="file"
                                onChange={handleAvatarChange}
                            />
                            <label htmlFor="avatar-upload">
                                <Button
                                    component="span"
                                    sx={{
                                        background:
                                            "linear-gradient(45deg, var(--primary-color) 30%, var(--secondary-color) 90%)",
                                        color: "#fcffff",
                                        borderRadius: 2,
                                        "&:hover": {
                                            background:
                                                "linear-gradient(45deg, #032e4b 30%, #e04416 90%)",
                                        },
                                    }}
                                >
                                    Change Avatar
                                </Button>
                            </label>
                        </Box>
                    )}
                </Box>
                <Box component="form" onSubmit={handleSubmit}>
                    <Typography
                        variant={isMobile ? "h5" : "h4"}
                        sx={{
                            color: "var(--primary-color)",
                            fontWeight: "bold",
                        }}
                    >
                        {user.fullName}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ color: "var(--secondary-color)", mb: 2 }}
                    >
                        @{user.username} • {user.email}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: "var(--primary-color)", mb: 2 }}
                    >
                        {user.subscribersCount || 0} Subscribers •{" "}
                        {user.subscribedToCount || 0} Subscribed
                    </Typography>
                    {editMode ? (
                        <>
                            <TextField
                                label="Full Name"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                fullWidth
                                required
                                sx={{
                                    mb: 2,
                                    "& fieldset": {
                                        borderColor: "var(--primary-color)",
                                    },
                                }}
                            />
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                fullWidth
                                required
                                sx={{
                                    mb: 2,
                                    "& fieldset": {
                                        borderColor: "var(--primary-color)",
                                    },
                                }}
                            />
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    sx={{
                                        background:
                                            "linear-gradient(45deg, var(--success-color) 30%, var(--secondary-color) 90%)",
                                        color: "#fcffff",
                                        borderRadius: 2,
                                        "&:hover": {
                                            background:
                                                "linear-gradient(45deg, #3e5714 30%, #e04416 90%)",
                                        },
                                    }}
                                >
                                    {isLoading ? (
                                        <CircularProgress
                                            size={24}
                                            sx={{ color: "#fcffff" }}
                                        />
                                    ) : (
                                        "Save Changes"
                                    )}
                                </Button>
                                <Button
                                    onClick={() => setEditMode(false)}
                                    sx={{
                                        background:
                                            "linear-gradient(45deg, #ccc 30%, #aaa 90%)",
                                        color: "#fcffff",
                                        borderRadius: 2,
                                        "&:hover": {
                                            background:
                                                "linear-gradient(45deg, #bbb 30%, #999 90%)",
                                        },
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <Button
                            onClick={() => setEditMode(true)}
                            sx={{
                                background:
                                    "linear-gradient(45deg, var(--primary-color) 30%, var(--secondary-color) 90%)",
                                color: "#fcffff",
                                borderRadius: 2,
                                "&:hover": {
                                    background:
                                        "linear-gradient(45deg, #032e4b 30%, #e04416 90%)",
                                },
                            }}
                        >
                            Edit Profile
                        </Button>
                    )}
                    {error && (
                        <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
                            {error}
                        </Alert>
                    )}
                </Box>
            </Box>

            <Box sx={{ maxWidth: { xs: "100%", sm: 800 }, mx: "auto", mt: 3 }}>
                <Tabs
                    value={tabValue}
                    onChange={(e, newValue) => setTabValue(newValue)}
                    sx={{
                        "& .MuiTab-root": {
                            color: "var(--primary-color)",
                            fontWeight: "bold",
                            "&.Mui-selected": {
                                color: "var(--secondary-color)",
                            },
                        },
                        "& .MuiTabs-indicator": {
                            backgroundColor: "var(--secondary-color)",
                        },
                    }}
                >
                    <Tab label="Tweets" />
                    <Tab label="Videos" />
                </Tabs>
                {tabValue === 0 && (
                    <>
                        <TweetForm userId={user._id} />
                        <TweetList userId={user._id} />
                    </>
                )}
                {tabValue === 1 && (
                    <Box sx={{ mt: 2 }}>
                        <VideoList />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default ProfilePage;
