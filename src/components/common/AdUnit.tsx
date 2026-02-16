"use client";

import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { adsenseConfig } from "@/config/adsense";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdUnitProps {
  slotId: string;
}

export default function AdUnit({ slotId }: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    if (!adsenseConfig.enabled || pushedRef.current) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushedRef.current = true;
    } catch {
      // AdSense script not yet loaded
    }
  }, []);

  if (!adsenseConfig.enabled) return null;

  return (
    <Box sx={{ width: "100%", textAlign: "center", my: 2 }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adsenseConfig.publisherId}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </Box>
  );
}
