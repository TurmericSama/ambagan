import { Box, BoxProps } from "@mui/material";
import { FC } from "react";

const MarginWrapper: FC<BoxProps> = ({ children, sx, ...rest }) => {
  return (
    <Box sx={{ margin: 3, ...sx }} {...rest}>
      {children}
    </Box>
  );
};

export default MarginWrapper;
