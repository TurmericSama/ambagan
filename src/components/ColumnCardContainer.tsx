import React, { FC } from "react";
import { Card, styled, CardProps } from "@mui/material";
interface ColumnCardContainerProps extends CardProps {
  children: React.ReactNode;
}

const ColumnCardContainer: FC<ColumnCardContainerProps> = ({
  children,
  sx,
  ...props
}) => {
  return (
    <StyledCardComponent elevation={2} {...props} sx={{ ...sx }}>
      {children}
    </StyledCardComponent>
  );
};

export default ColumnCardContainer;

const StyledCardComponent = styled(Card)(({ theme }) => ({
  borderRadius: "10px",
  border: "solid 1px #ACB4FF",
  height: "100%",
  minWidth: 400,
  maxWidth: 400,
  flex: 1,
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#FFF5C3",

  scrollbarColor: "transparent transparent",
  "&::-webkit-scrollbar": {
    scrollbarWidth: "none",
    backgroundColor: "transparent",
  },
}));
