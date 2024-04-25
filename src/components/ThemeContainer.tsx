"use client";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FC } from "react";

const headerHeight = "50px";

const ThemeContainer: FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#5F6FFF",
      },
      secondary: {
        main: "#D9DDFF",
      },
    },
    typography: {
      fontWeightBold: 700,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ backgroundColor: "#D9DDFF" }}>
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            fontWeight="bold"
            fontStyle="italic"
            component={Link}
            href="/"
            sx={{ color: "#5F6FFF" }}
          >
            SPLTR.io
          </Typography>
          <Box sx={{ display: "flex", flex: 1, justifyContent: "end" }}>
            <Button
              variant="text"
              LinkComponent={Link}
              href="manage"
              sx={{ fontWeight: "bold" }}
            >
              Manage
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2, height: `calc(100% - ${headerHeight})` }}>
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default ThemeContainer;
