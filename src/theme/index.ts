import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#646cff",
      light: "#8b8fff",
      dark: "#4a4fcc",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#535bf2",
      light: "#7a7fff",
      dark: "#3a40cc",
      contrastText: "#ffffff",
    },
    background: {
      default: "#242424",
      paper: "#1a1a1a",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255, 255, 255, 0.87)",
      disabled: "rgba(255, 255, 255, 0.5)",
    },
    divider: "rgba(255, 255, 255, 0.12)",
    action: {
      active: "#646cff",
      hover: "rgba(100, 108, 255, 0.08)",
      selected: "rgba(100, 108, 255, 0.16)",
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
    },
  },
  typography: {
    fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
    h1: {
      fontSize: "3.2em",
      lineHeight: 1.1,
    },
    h2: {
      fontSize: "2.4em",
      lineHeight: 1.2,
    },
    h3: {
      fontSize: "2em",
      lineHeight: 1.3,
    },
    h4: {
      fontSize: "1.6em",
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.4em",
      lineHeight: 1.5,
    },
    h6: {
      fontSize: "1.2em",
      lineHeight: 1.6,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#242424",
          color: "rgba(255, 255, 255, 0.87)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1a1a1a",
          color: "#ffffff",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1a1a1a",
          color: "#ffffff",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1a1a1a",
          color: "#ffffff",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1a1a1a",
          color: "#ffffff",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
          },
        },
      },
    },
  },
});
