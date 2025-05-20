import * as React from "react";

import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { MultilineChartRounded } from "@mui/icons-material";

const Header = () => {
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          p: 1
        }}
      >
        <Box maxWidth="false">
          <Toolbar
            variant="regular"
            sx={{
              padding: "0 1rem !important",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              bgcolor: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(24px)",
              borderRadius: "12px",
              mr: 1,
              height: "auto"
            }}
          >
            <Typography variant="h6" color="primary" sx={{ fontWeight: 700, fontSize: "3rem", display: "flex", alignItems: "center" }}>
              <MultilineChartRounded /> User Management
            </Typography>
            {/* <Box sx={{ display: "flex", gap: 0.5 }}>
              <Tooltip title="Account">
                <IconButton
                  color="primary"
                  sx={{ fontWeight: "bold", display: { xs: "none", md: "inline-flex" } }}
                  onClick={() => navigate("/login")}
                >
                  <AccountCircleRounded />
                </IconButton>
              </Tooltip>
            </Box> */}
          </Toolbar>
        </Box>
      </AppBar>
    </div>
  );
};

export default Header;
