import { TextField, styled } from "@mui/material";

const StyledInput = styled(TextField)(({ theme }) => ({
  border: "solid 1px #ACB4FF",
  borderRadius: "10px",
  backgroundColor: "white",

  "& .MuiInputBase-input": {
    fontWeight: "bolder",
    fontSize: "1.5rem",
    px: 4,
    borderRadius: "10px",
    paddingLeft: theme.spacing(4),
  },
  flex: 1,
}));

export default StyledInput;
