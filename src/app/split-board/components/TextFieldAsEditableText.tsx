import { styled, TextField, Theme } from "@mui/material";

const TextFieldAsEditableText = styled(TextField)(({ theme }) => ({
  width: "100%",
  border: "none",
  backgroundColor: "none",
  "& :focus": {
    outline: "none",
  },
  "& .MuiInputBase-input": {
    fontSize: theme.typography.h6.fontSize,
    fontWeight: "bold",
    "& :focus": {
      outline: "none",
    },
    padding: theme.spacing(1),
  },
}));

export default TextFieldAsEditableText;
