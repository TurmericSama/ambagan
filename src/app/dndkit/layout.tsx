import { Box, BoxProps } from "@mui/material";

import { FC } from "react";

const DndKitLayout: FC<BoxProps> = ({ children }) => {
  return (
    <Box
      sx={{
        height: "calc(100% - 50px)",
        display: "flex",
        flex: 1,
        padding: 5,
      }}
    >
      {children}
    </Box>
  );
};

export default DndKitLayout;
