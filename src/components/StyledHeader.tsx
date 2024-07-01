import { Typography, TypographyProps } from "@mui/material";
import { FC } from "react";

const StyledHeader: FC<TypographyProps> = ({ children, sx, ...rest }) => {
  return (
    <Typography
      variant="h1"
      fontWeight="bold"
      color="primary"
      sx={{ ...sx }}
      {...rest}
    >
      {children}
    </Typography>
  );
};

export default StyledHeader;
