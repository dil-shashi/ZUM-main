// import packages
import React, { useMemo } from "react";
import RoutesList from "./routes";
import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material";
import theme from "./theme";
import { SnackbarProvider } from "notistack";

const App = () => {
  const themeWithMode = responsiveFontSizes(useMemo(() => createTheme(theme("light")), []));
  return (
    <SnackbarProvider
      maxSnack={3}
      preventDuplicate
      anchorOrigin={{
        horizontal: "center",
        vertical: "top"
      }}
    >
      <ThemeProvider theme={themeWithMode}>
        <RoutesList />
      </ThemeProvider>
    </SnackbarProvider>
  );
};

export default App;
