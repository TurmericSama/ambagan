import { FC } from "react";
import { Box, BoxProps } from "@mui/material";

const Layout: FC<BoxProps> = ({ children }) => {
  return <Box>{children}</Box>;
};

export default Layout;
