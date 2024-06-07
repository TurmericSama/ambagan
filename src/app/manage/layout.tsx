import { Container, Toolbar } from "@mui/material";
import { FC, ReactNode } from "react";

interface ManageViewLayoutProps {
  children: ReactNode;
}

const APP_BAR_HEIGHT = 50;

const ManageViewLayout: FC<ManageViewLayoutProps> = ({ children }) => {
  return (
    <Container
      sx={{
        height: `calc(100% - ${APP_BAR_HEIGHT}px)`,
        width: "100%",
        paddingTop: 4,
      }}
      maxWidth="xl"
    >
      {children}
    </Container>
  );
};

export default ManageViewLayout;
