import { Avatar as MuiAvatar } from "@mui/material";

const Avatar = ({ src, alt, size = 40, ...props }) => {
    return (
        <MuiAvatar
            src={src}
            alt={alt}
            sx={{ width: size, height: size }}
            {...props}
        />
    );
};

export default Avatar;
