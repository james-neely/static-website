"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: { colorSchemeSelector: "data-mui-color-scheme" },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#1a365d" },
        secondary: { main: "#2c7a7b" },
        background: {
          default: "#f7f8fa",
          paper: "#ffffff",
        },
      },
    },
    dark: {
      palette: {
        primary: { main: "#63b3ed" },
        secondary: { main: "#4fd1c5" },
        background: {
          default: "#1a202c",
          paper: "#2d3748",
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none" },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
        },
      },
    },
  },
});

export default theme;
