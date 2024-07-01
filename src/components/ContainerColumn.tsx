import { FC } from "react";
import { Box, BoxProps } from "@mui/material";

const ContainerColumn: FC<BoxProps> = ({ children, ...restProps }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }} {...restProps}>
      {children}
    </Box>
  );
};

export default ContainerColumn;
