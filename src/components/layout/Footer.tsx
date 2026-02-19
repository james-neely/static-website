"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import AdUnit from "@/components/common/AdUnit";
import { adsenseConfig } from "@/config/adsense";

export default function Footer() {
  const [canRevoke, setCanRevoke] = useState(false);

  useEffect(() => {
    if (!adsenseConfig.enabled) return;

    window.googlefc = window.googlefc || ({} as typeof window.googlefc);
    window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
    window.googlefc.callbackQueue.push({
      CONSENT_API_READY: () => {
        if (typeof window.googlefc.showRevocationMessage === "function") {
          setCanRevoke(true);
        }
      },
    });
  }, []);

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
      {canRevoke && (
        <Link
          component="button"
          variant="body2"
          color="text.secondary"
          onClick={() => window.googlefc.showRevocationMessage?.()}
          sx={{ mt: 1, cursor: "pointer" }}
        >
          Privacy Settings
        </Link>
      )}
    </Box>
  );
}
