"use client";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import AdUnit from "@/components/common/AdUnit";
import { adsenseConfig } from "@/config/adsense";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        textAlign: "center",
        borderTop: 1,
        borderColor: "divider",
        mt: "auto",
      }}
    >
      {adsenseConfig.enabled && (
        <>
          <AdUnit slotId={adsenseConfig.adSlotId} />
          <Divider sx={{ my: 2 }} />
        </>
      )}
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} James Neely. All rights reserved.
      </Typography>
    </Box>
  );
}
