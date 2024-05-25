import { Container } from "@mui/material";
import { FC, ReactNode } from "react";

interface ManageViewLayoutProps {
  children: ReactNode;
}

const DndViewLayout: FC<ManageViewLayoutProps> = ({ children }) => {
  return (
    <Container
      sx={{
        height: "100%",
        width: "100%",
        backgroundColor: "red",
      }}
      maxWidth="xl"
    >
      {children}
    </Container>
  );
};

export default DndViewLayout;
