import { Container } from "@mui/material";
import { FC, ReactNode } from "react";

export default ({ children }: { children: ReactNode }) => {
  return (
    <Container sx={{ height: "100%", pt: 10, width: "100%" }}>
      {children}
    </Container>
  );
};
