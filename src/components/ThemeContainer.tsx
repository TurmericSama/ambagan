"use client";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
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

  const StyledAppbar = styled(AppBar)(({}) => ({
    backgroundColor: "#D9DDFF",
    width: "100%",
    top: 0,
  }));

  return (
    <ThemeProvider theme={theme}>
      <StyledAppbar position="fixed">
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            fontWeight="bold"
            fontStyle="italic"
            component={Link}
            href="split-board"
            color="primary"
          >
            SPLTR.io
          </Typography>
          <Box sx={{ display: "flex", flex: 1, justifyContent: "end" }}>
            <Button
              variant="text"
              LinkComponent={Link}
              href="split-board"
              sx={{ fontWeight: "bold" }}
            >
              Split Board
            </Button>
          </Box>
        </Toolbar>
      </StyledAppbar>
      <Toolbar variant="dense" />
      {children}
    </ThemeProvider>
  );
};

export default ThemeContainer;
