import React from "react";
import { Button as MuiButton } from "@mui/material";

const Button = ({
    children,
    variant = "contained",
    color = "primary",
    ...props
}) => {
    return (
        <MuiButton variant={variant} color={color} {...props}>
            {children}
        </MuiButton>
    );
};

export default Button;
