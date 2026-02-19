"use client";

import { useEffect } from "react";
import { adsenseConfig } from "@/config/adsense";

declare global {
  interface Window {
    googlefc: {
      callbackQueue: Array<Record<string, () => void>>;
      showRevocationMessage?: () => void;
    };
  }
}

export default function ConsentScript() {
  useEffect(() => {
    if (!adsenseConfig.enabled) return;

    window.googlefc = window.googlefc || {};
    window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];

    const script = document.createElement("script");
    script.src = `https://fundingchoicesmessages.google.com/i/${adsenseConfig.publisherId}?ers=1`;
    script.async = true;
    document.head.appendChild(script);

    const iframe = document.createElement("iframe");
    iframe.id = "googlefcPresent";
    iframe.name = "googlefcPresent";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    iframe.style.position = "absolute";
    document.body.appendChild(iframe);

    return () => {
      document.head.removeChild(script);
      document.body.removeChild(iframe);
    };
  }, []);

  return null;
}
