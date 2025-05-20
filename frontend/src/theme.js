import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: "#228A22",
      light: "#4CAF50",
      dark: "#1B5E20",
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#FFA000",
      light: "#FFB74D",
      dark: "#F57C00",
      contrastText: "#000000"
    },
    background: {
      default: mode === "light" ? "#F5F5F5" : "#121212",
      paper: mode === "light" ? "#FFFFFF" : "#1E1E1E"
    },
    text: {
      primary: mode === "light" ? "#333333" : "#FFFFFF",
      secondary: mode === "light" ? "#666666" : "#B0B0B0"
    },
    error: {
      main: mode === "light" ? "#D32F2F" : "#FF5252"
    },
    warning: {
      main: mode === "light" ? "#FFA000" : "#FFB74D"
    },
    info: {
      main: mode === "light" ? "#1976D2" : "#64B5F6"
    },
    success: {
      main: mode === "light" ? "#43A047" : "#81C784"
    }
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 400
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 400
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400
    },
    button: {
      textTransform: "none"
    }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: "none",
          fontWeight: 600
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: "#1B5E20"
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: mode === "light" ? "#BDBDBD" : "#424242"
            },
            "&:hover fieldset": {
              borderColor: "#228A22"
            },
            "&.Mui-focused fieldset": {
              borderColor: "#228A22"
            }
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: mode === "light" ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "0 4px 6px rgba(255, 255, 255, 0.1)",
          borderRadius: 12
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === "light" ? "#FFFFFF" : "#1E1E1E",
          color: mode === "light" ? "#333333" : "#FFFFFF"
        }
      }
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
          margin: 8
        },
        switchBase: {
          padding: 1,
          "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + $track": {
              opacity: 1,
              border: "none"
            }
          }
        },
        thumb: {
          width: 24,
          height: 24
        },
        track: {
          borderRadius: 13,
          border: "1px solid #bdbdbd",
          backgroundColor: "#fafafa",
          opacity: 1,
          transition:
            "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
        }
      }
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  }
});

const getThemedComponents = () => ({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: "all 0.3s linear"
        }
      }
    }
  }
});

const getTheme = (mode) => {
  let theme = createTheme(getDesignTokens(mode));
  theme = responsiveFontSizes(theme);
  theme = createTheme(theme, getThemedComponents(mode));
  return theme;
};

export default getTheme;
