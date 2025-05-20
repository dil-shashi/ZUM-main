import { FacebookTwoTone, Instagram, MultilineChartRounded, Twitter } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "rgba(0,0,0,.8)", color: "#fff", padding: 4, borderRadius: "12px", mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              gutterBottom
              variant="h6"
              sx={{ color: "#fff", fontWeight: 900, display: "flex", alignItems: "center" }}
            >
              <MultilineChartRounded /> User Management
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" }
            }}
          >
            <Typography gutterBottom>Contact us</Typography>
            <Typography gutterBottom>About us</Typography>
            <Typography gutterBottom>{`Faq's`}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Typography gutterBottom>{`Terms and conditions`}</Typography>
            <Typography gutterBottom>Return Policy</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: ".8rem",
              pr: { xs: 0, md: 4 },
              alignItems: { xs: "center", md: "flex-end" }
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Follow us on
            </Typography>
            <Box sx={{ display: "flex", gap: ".8rem" }}>
              <Instagram />
              <FacebookTwoTone />
              <Twitter />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="caption" sx={{ m: 3 }}>
              © 2025 User Management. All Rights Reserved
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
