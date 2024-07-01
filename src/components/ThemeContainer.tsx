"use client";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Drawer,
} from "@mui/material";
import Link from "next/link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FC } from "react";
import "../components/font.css";

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
      fontFamily: "Euclid",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#D9DDFF",
          width: "100%",
          top: 0,
        }}
      >
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
            <Button
              variant="text"
              LinkComponent={Link}
              href="dndkit"
              sx={{ fontWeight: "bold" }}
            >
              DND kit
            </Button>
            <Button
              variant="text"
              LinkComponent={Link}
              href="dndbase"
              sx={{ fontWeight: "bold" }}
            >
              dnd base
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar variant="dense" />
      {children}
    </ThemeProvider>
  );
};

export default ThemeContainer;
