import { FC } from "react";
import { Box, BoxProps } from "@mui/material";

const ContainerRow: FC<BoxProps> = ({ children, ...restProps }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }} {...restProps}>
      {children}
    </Box>
  );
};

export default ContainerRow;
