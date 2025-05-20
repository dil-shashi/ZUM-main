import "@fontsource-variable/outfit";
import "@assets/scss/_base.scss";

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import CssBaseline from "@mui/material/CssBaseline";

// import components
import App from "./app";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/authProvider";
import { store, persistor } from "@redux/store";

// global variables
const container = document.getElementById("root");
const root = createRoot(container);

// render DOM
root.render(
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <CssBaseline />
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </PersistGate>
  </ReduxProvider>
);
