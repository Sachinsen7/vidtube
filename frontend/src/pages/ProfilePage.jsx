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
                    p: 2,
                    textAlign: "center",
                    bgcolor: "white",
                    borderRadius: 2,
                    border: "1px solid #e0e0e0",
                }}
            >
                <Typography
                    variant="h5"
                    sx={{ color: "#1976d2" }}
                    data-testid="login-required"
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
        <Box sx={{ bgcolor: "#f5f5f5", p: 2 }}>
            <Box
                sx={{
                    maxWidth: 800,
                    mx: "auto",
                    bgcolor: "white",
                    borderRadius: 2,
                    border: "1px solid #e0e0e0",
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        height: { xs: 120, sm: 150 },
                        backgroundImage: `url(${user.coverImage || "https://via.placeholder.com/800x150?text=Cover+Image"})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {editMode && (
                        <Box sx={{ position: "absolute", bottom: 8, right: 8 }}>
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
                                    variant="contained"
                                    sx={{ bgcolor: "#1976d2", borderRadius: 1 }}
                                    data-testid="change-cover"
                                >
                                    Change Cover
                                </Button>
                            </label>
                        </Box>
                    )}
                </Box>
                <Box sx={{ p: 3, mt: -5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Avatar
                            src={user.avatar}
                            sx={{
                                width: 80,
                                height: 80,
                                border: "2px solid white",
                            }}
                            data-testid="user-avatar"
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
                                        variant="contained"
                                        sx={{
                                            bgcolor: "#1976d2",
                                            borderRadius: 1,
                                        }}
                                        data-testid="change-avatar"
                                    >
                                        Change Avatar
                                    </Button>
                                </label>
                            </Box>
                        )}
                    </Box>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Typography
                            variant="h5"
                            sx={{ color: "#1976d2", fontWeight: 600 }}
                            data-testid="user-fullname"
                        >
                            {user.fullName}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: "#757575", mb: 1 }}
                            data-testid="user-info"
                        >
                            @{user.username} • {user.email}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: "#757575", mb: 2 }}
                            data-testid="user-stats"
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
                                        "& .Mui-focused fieldset": {
                                            borderColor: "#1976d2",
                                        },
                                    }}
                                    data-testid="fullname-input"
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
                                        "& .Mui-focused fieldset": {
                                            borderColor: "#1976d2",
                                        },
                                    }}
                                    data-testid="email-input"
                                />
                                <Box sx={{ display: "flex", gap: 2 }}>
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        variant="contained"
                                        sx={{
                                            bgcolor: "#1976d2",
                                            borderRadius: 1,
                                        }}
                                        data-testid="save-changes"
                                    >
                                        {isLoading ? (
                                            <CircularProgress
                                                size={24}
                                                sx={{ color: "white" }}
                                            />
                                        ) : (
                                            "Save Changes"
                                        )}
                                    </Button>
                                    <Button
                                        onClick={() => setEditMode(false)}
                                        variant="outlined"
                                        sx={{
                                            borderColor: "#757575",
                                            color: "#757575",
                                            borderRadius: 1,
                                        }}
                                        data-testid="cancel-edit"
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                            </>
                        ) : (
                            <Button
                                onClick={() => setEditMode(true)}
                                variant="contained"
                                sx={{ bgcolor: "#1976d2", borderRadius: 1 }}
                                data-testid="edit-profile"
                            >
                                Edit Profile
                            </Button>
                        )}
                        {error && (
                            <Alert
                                severity="error"
                                sx={{ mt: 2, borderRadius: 2 }}
                                data-testid="error-alert"
                            >
                                {error}
                            </Alert>
                        )}
                    </Box>
                </Box>
            </Box>
            <Box sx={{ maxWidth: 800, mx: "auto", mt: 2 }}>
                <Tabs
                    value={tabValue}
                    onChange={(e, newValue) => setTabValue(newValue)}
                    sx={{
                        "& .MuiTab-root": { color: "#757575" },
                        "& .Mui-selected": { color: "#1976d2" },
                        "& .MuiTabs-indicator": { bgcolor: "#1976d2" },
                    }}
                >
                    <Tab label="Tweets" data-testid="tweets-tab" />
                    <Tab label="Videos" data-testid="videos-tab" />
                </Tabs>
                {tabValue === 0 && (
                    <>
                        <TweetForm userId={user._id} />
                        <TweetList userId={user._id} />
                    </>
                )}
                {tabValue === 1 && <VideoList />}
            </Box>
        </Box>
    );
};

export default ProfilePage;
