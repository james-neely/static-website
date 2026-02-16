"use client";

import { useEffect } from "react";
import { adsenseConfig } from "@/config/adsense";

export default function AdSenseScript() {
  useEffect(() => {
    if (!adsenseConfig.enabled) return;

    const script = document.createElement("script");
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseConfig.publisherId}`;
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
