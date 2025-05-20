import { ExpandMoreRounded } from "@mui/icons-material";
import { Accordion as MuiAccordion, AccordionDetails, AccordionSummary, Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

const Accordion = ({ children, title, isFilter, count, ...rest }) => {
  return (
    <MuiAccordion
      slotProps={{ transition: { unmountOnExit: true } }}
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        my: isFilter ? 0 : 2,
        ":before": { display: "none" },
        "&.Mui-expanded": { m: "0 !important" }
      }}
      {...rest}
    >
      <AccordionSummary
        sx={{
          p: 0,
          fontSize: ".75rem",
          fontWeight: 600,
          minHeight: "0px !important",
          "& .MuiAccordionSummary-content": {
            gap: 1,
            my: "10px !important",
            alignItems: "center",
            justifyContent: "space-between",
            "&.Mui-expanded": { my: "10px !important", mb: "6px !important" }
          }
        }}
        expandIcon={<ExpandMoreRounded />}
      >
        {title}
        {!!count && (
          <Avatar sx={{ bgcolor: deepOrange[500], width: 16, height: 14, fontSize: ".6rem" }}>{count}</Avatar>
        )}
      </AccordionSummary>
      <AccordionDetails sx={{ px: 1.5, pt: 0 }}>{children}</AccordionDetails>
    </MuiAccordion>
  );
};

export default Accordion;
