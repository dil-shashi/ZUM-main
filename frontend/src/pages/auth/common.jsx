import { Box, Typography } from "@mui/material";
import { MultilineChartRounded } from "@mui/icons-material";

const Common = ({ type = "Login", title, subTitle, footer = () => {}, children, width }) => {
  return (
    <Box
      sx={{
        width: `calc(100vw - 1rem)`,
        height: `calc(100vh - 1rem)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        borderRadius: 3,
        background: "linear-gradient(90deg, hsla(113, 96%, 81%, .3) 0%, hsla(188, 90%, 51%, .4) 100%)",
        overflow: "hidden"
      }}
    >
      <Box
        sx={{
          width: "60%",
          height: `100%`,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          p: 4,
          alignItems: "flex-start",
          justifyContent: "flex-start"
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 900, display: "flex", alignItems: "center", zIndex: 2, color: "#00416a", fontSize: "2rem" }}
        >
          <MultilineChartRounded fontSize="4rem" />
          User Management
        </Typography>
      </Box>
      <Box
        sx={{
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          justifyContent: { xs: "flex-start", md: "center" },
          p: { xs: 4, md: 8 },
          height: "100%",
          overflow: "auto",
          width: { xs: "100%", md: "40%" },
          borderRadius: 3,
          bgcolor: { xs: "rgba(	0, 99, 0,.02)", md: "rgba(255, 255, 255, .8)" },
          backdropFilter: { xs: "blur(1px)", md: "blur(10px)" },
          boxShadow: `0px 2.3px 4.1px 0px rgba(0, 107, 255, 0.04), 0px 11.1px 16.2px 0px rgba(0, 107, 255, 0.06), 0px 29px 51px 0px rgba(0, 107, 255, 0.10)`
        }}
      >
        <Typography
          variant="h6"
          color="primary"
          sx={{
            fontWeight: 900,
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            zIndex: 2,
            position: "absolute",
            top: 20
          }}
        >
          <MultilineChartRounded /> ZUM
        </Typography>
        <Box sx={{ width: { xs: "100%", md: width || "80%" } }}>
          <Typography
            color="primary"
            variant="h4"
            component="h4"
            gutterBottom
            sx={{ fontWeight: 700, mt: { xs: 10, md: 4 } }}
          >
            {type}
          </Typography>

          <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          <Typography gutterBottom sx={{ textAlign: "center", color: "#051E41", mb: 5 }}>
            {subTitle instanceof Function ? subTitle() : subTitle}
          </Typography>
          {children}
        </Box>
        {footer()}
      </Box>
    </Box>
  );
};

export default Common;
