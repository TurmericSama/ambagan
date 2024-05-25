import { FC } from "react";
import { Avatar, Stack, styled } from "@mui/material";

const StackingContainer = styled(Stack)(({ theme }) => ({
  "& > :not(:first-of-type)": {
    marginLeft: -theme.spacing(2),
  },
  "& > :hover": {
    zIndex: 1,
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  height: "30px",
  width: "30px",
}));

const AvatarStack: FC = () => {
  return (
    <StackingContainer spacing={-1} direction="row" flex={1}>
      <StyledAvatar>A</StyledAvatar>
    </StackingContainer>
  );
};

export default AvatarStack;
