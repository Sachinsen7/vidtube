import { TextField } from "@mui/material";

const Input = ({ label, variant = "outlined", ...props }) => {
    return (
        <TextField
            label={label}
            variant={variant}
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
            {...props}
        />
    );
};

export default Input;
