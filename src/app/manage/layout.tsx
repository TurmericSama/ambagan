import { Container } from "@mui/material";
import { FC, ReactNode } from "react";

interface ManageViewLayoutProps {
  children: ReactNode;
}

const ManageViewLayout: FC<ManageViewLayoutProps> = ({ children }) => {
  return (
    <Container
      sx={{
        height: "100%",
        pt: 10,
        width: "100%",
        zIndex: 1,
      }}
      maxWidth="xl"
    >
      {children}
    </Container>
  );
};

export default ManageViewLayout;
