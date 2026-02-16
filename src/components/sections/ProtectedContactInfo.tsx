"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import { decode } from "@/utils/obfuscate";

const HCAPTCHA_SITEKEY = "9af0321a-0aa8-4d1c-950a-590a6e8017fa";

declare global {
  interface Window {
    hcaptcha?: {
      render: (container: string | HTMLElement, params: Record<string, unknown>) => string;
      reset: (widgetId: string) => void;
    };
    onHCaptchaLoad?: () => void;
  }
}

interface ProtectedContactInfoProps {
  encodedEmail: string;
  encodedPhone: string;
}

export default function ProtectedContactInfo({ encodedEmail, encodedPhone }: ProtectedContactInfoProps) {
  const [verified, setVerified] = useState(false);
  const captchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const renderCaptcha = useCallback(() => {
    if (!captchaRef.current || !window.hcaptcha || widgetIdRef.current !== null) return;

    widgetIdRef.current = window.hcaptcha.render(captchaRef.current, {
      sitekey: HCAPTCHA_SITEKEY,
      callback: () => setVerified(true),
    });
  }, []);

  useEffect(() => {
    if (verified) return;

    if (window.hcaptcha) {
      renderCaptcha();
      return;
    }

    window.onHCaptchaLoad = renderCaptcha;

    const script = document.createElement("script");
    script.src = "https://js.hcaptcha.com/1/api.js?onload=onHCaptchaLoad&render=explicit";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      window.onHCaptchaLoad = undefined;
    };
  }, [verified, renderCaptcha]);

  if (verified) {
    const email = decode(encodedEmail);
    const phone = decode(encodedPhone);

    return (
      <Stack spacing={2} sx={{ maxWidth: 360 }}>
        <Button
          variant="outlined"
          size="large"
          startIcon={<EmailIcon />}
          href={`mailto:${email}`}
        >
          {email}
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<PhoneIcon />}
          href={`tel:${phone}`}
        >
          {phone}
        </Button>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
          This is a unique hidden email address. If it appears in marketing lists,
          I&apos;ll know exactly where it was leaked from.
        </Typography>
      </Stack>
    );
  }

  return (
    <Box sx={{ maxWidth: 360 }}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
        <LockIcon fontSize="small" color="action" />
        <Typography variant="body2" color="text.secondary">
          Verify you&apos;re human to see contact details
        </Typography>
      </Stack>
      <Box ref={captchaRef} />
    </Box>
  );
}
