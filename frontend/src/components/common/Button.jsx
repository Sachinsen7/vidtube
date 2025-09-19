import { Button as MuiButton } from "@mui/material";

const Button = ({
    children,
    variant = "contained",
    color = "primary",
    ...props
}) => {
    return (
        <MuiButton
            variant={variant}
            color={color}
            sx={{
                backgroundColor:
                    variant === "contained"
                        ? "var(--primary-color)"
                        : undefined,
                color:
                    variant === "contained"
                        ? "#fcffff"
                        : "var(--primary-color)",
                "&:hover": {
                    backgroundColor:
                        variant === "contained"
                            ? "var(--secondary-color)"
                            : undefined,
                },
            }}
            {...props}
        >
            {children}
        </MuiButton>
    );
};

export default Button;
