import { Box, Toolbar } from "@mui/material";

import Header from "./header";
import Footer from "./footer";
import { Outlet, useLocation } from "react-router-dom";

const BaseLayout = ({ ignore = [] }) => {
  const location = useLocation();
  const donthide = !ignore.includes(location.pathname) && location.pathname !== "/";

  return (
    <Box
      component="main"
      sx={{
        overflow: "auto",
        minHeight: "100vh",
        maxWidth: "100vw",
        p: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {donthide && (
        <>
          <Header />
          <Toolbar />
        </>
      )}

      <Box
        sx={{
          flex: 1, // Ensures the content takes up available space
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Outlet />
      </Box>

      {donthide && <Footer />}
    </Box>
  );
};

export default BaseLayout;