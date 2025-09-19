import { TextField } from "@mui/material";

const Input = ({ label, variant = "outlined", ...props }) => {
    return <TextField label={label} variant={variant} fullWidth {...props} />;
};

export default Input;
