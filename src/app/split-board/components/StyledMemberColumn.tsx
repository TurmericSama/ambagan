import { Box, styled } from "@mui/material";

const StyledMemberColumn = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFF5C3",
  width: "350px",
  height: "500px",
  maxHeight: "500px",
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
  paddingTop: theme.spacing(4),
}));

export default StyledMemberColumn;
