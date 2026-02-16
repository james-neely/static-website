"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: { colorSchemeSelector: "data-mui-color-scheme" },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#b8860b" },
        secondary: { main: "#8b6914" },
        background: {
          default: "#faf9f6",
          paper: "#ffffff",
        },
      },
    },
    dark: {
      palette: {
        primary: { main: "#e6b422" },
        secondary: { main: "#f0c75e" },
        background: {
          default: "#1c1c1e",
          paper: "#2c2c2e",
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
