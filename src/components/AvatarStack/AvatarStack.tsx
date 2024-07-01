import { FC } from "react";
import { Avatar, Stack, styled } from "@mui/material";

const StackingContainer = styled(Stack)(({ theme }) => ({
  "& > :not(:first-of-type)": {
    marginLeft: -theme.spacing(2),
  },
  "& > :hover": {
    zIndex: 1,
  },
  alignItems: "flex-end",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  height: "18px",
  width: "18px",
  fontSize: "0.7rem",
  border: "1px solid red",
}));

const AvatarStack: FC = () => {
  return (
    <StackingContainer spacing={-0.4} direction="row" flex={1}>
      <StyledAvatar>A</StyledAvatar>
      <StyledAvatar>B</StyledAvatar>
      <StyledAvatar>C</StyledAvatar>
    </StackingContainer>
  );
};

export default AvatarStack;
