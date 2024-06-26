import { FC } from "react";
import { Box, BoxProps } from "@mui/material";

const Layout: FC<BoxProps> = ({ children }) => {
  return <Box sx={{ padding: 4, height: "calc(100% - 64px)" }}>{children}</Box>;
};

export default Layout;
