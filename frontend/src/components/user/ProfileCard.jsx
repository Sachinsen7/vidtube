import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import Avatar from "../common/Avatar";
import Button from "../common/Button";

const ProfileCard = () => {
    const { user, updateAvatar, updateCoverImage, isLoading, error } =
        useAuth();

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (file) await updateAvatar(file);
    };

    const handleCoverImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) await updateCoverImage(file);
    };

    if (!user) return null;

    return (
        <Card
            sx={{
                maxWidth: 600,
                mx: "auto",
                mb: 2,
                backgroundColor: "var(--background-color)",
            }}
        >
            <CardMedia
                component="img"
                height="200"
                image={user.coverImage || "https://via.placeholder.com/600x200"}
                alt="Cover Image"
            />
            <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar src={user.avatar} alt={user.username} size={80} />
                    <Box sx={{ ml: 2 }}>
                        <Typography
                            variant="h5"
                            sx={{ color: "var(--primary-color)" }}
                        >
                            {user.username}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: "var(--secondary-color)" }}
                        >
                            {user.email}
                        </Typography>
                    </Box>
                </Box>
                <Typography
                    variant="body1"
                    sx={{ color: "var(--primary-color)" }}
                >
                    {user.fullName}
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ my: 2 }}>
                        {error}
                    </Alert>
                )}
                <Box sx={{ mt: 2 }}>
                    <Button
                        variant="outlined"
                        component="label"
                        disabled={isLoading}
                    >
                        Update Avatar
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleAvatarChange}
                        />
                    </Button>
                    <Button
                        variant="outlined"
                        component="label"
                        disabled={isLoading}
                        sx={{ ml: 2 }}
                    >
                        Update Cover Image
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleCoverImageChange}
                        />
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProfileCard;
