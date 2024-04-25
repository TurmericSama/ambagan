import { Box, BoxProps, Container, ContainerProps } from "@mui/material";
import { FC } from "react";

const ManageViewLayout: FC<ContainerProps> = ({ children }) => {
  return (
    <Container sx={{ height: "100%", pt: 10, width: "100%" }}>
      {children}
    </Container>
  );
};

export default ManageViewLayout;
