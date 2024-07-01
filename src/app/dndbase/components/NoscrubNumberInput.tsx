import { TextField, Typography, useTheme } from "@mui/material";
import { FocusEventHandler } from "react";

interface NoscrubNumberInputProps {
  handleOnBlur: FocusEventHandler<HTMLInputElement>;
  amount: number;
  handleChangeInternalAmount: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoFocus: boolean;
}

const NoscrubNumberInput: React.FC<NoscrubNumberInputProps> = ({
  handleChangeInternalAmount,
  handleOnBlur,
  amount,
  autoFocus,
}) => {
  const theme = useTheme();
  return (
    <TextField
      type="number"
      autoFocus={autoFocus}
      onBlur={handleOnBlur}
      sx={{
        "& .MuiInputBase-input": {
          fontSize: theme.typography.body1.fontSize,
          fontWeight: "bold",
          padding: theme.spacing(0),
          paddingLeft: 0,
          "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
            "-webkit-appearance": "none",
            margin: 0,
          },
        },
        "& .MuiOutlinedInput-root": {
          padding: 0,
          paddingLeft: theme.spacing(1),
        },
      }}
      InputProps={{
        startAdornment: (
          <Typography
            fontWeight="bold"
            sx={{ marginRight: theme.spacing(0.5) }}
          >
            Php
          </Typography>
        ),
      }}
      value={amount}
      onChange={handleChangeInternalAmount}
      placeholder="0.00"
    />
  );
};

export default NoscrubNumberInput;
