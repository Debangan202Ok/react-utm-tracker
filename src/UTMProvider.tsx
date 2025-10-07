import React, { useEffect, createContext, useContext, useState } from "react";
import { setCookie, getCookie } from "./utils/cookies";

interface UTMProviderProps {
  captureParams?: string[];
  cookieExpiryDays?: number;
  requireReferrer?: boolean;
  requireConsent?: boolean;
  consentGiven?: boolean;
  children: React.ReactNode;
}

const defaultParams = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
const UTMContext = createContext<Record<string, string>>({});

export const UTMProvider: React.FC<UTMProviderProps> = ({
  captureParams = defaultParams,
  cookieExpiryDays = 30,
  requireReferrer = false,
  requireConsent = false,
  consentGiven = true,
  children
}) => {
  const [utms, setUtms] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Consent & Do Not Track check
    if (requireConsent && !consentGiven) return;
    if (navigator.doNotTrack === "1") return;

    const urlParams = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    captureParams.forEach(key => {
      const val = urlParams.get(key);
      if (val) found[key] = val;
    });

    const referrerOK = !requireReferrer || (document.referrer && document.referrer !== "");

    if (referrerOK && Object.keys(found).length > 0) {
      Object.entries(found).forEach(([key, val]) => setCookie(key, val, cookieExpiryDays));
      setUtms(found);
    } else {
      const stored: Record<string, string> = {};
      captureParams.forEach(key => {
        const val = getCookie(key);
        if (val) stored[key] = val;
      });
      setUtms(stored);
    }
  }, [captureParams, cookieExpiryDays, requireReferrer, requireConsent, consentGiven]);

  return <UTMContext.Provider value={utms}>{children}</UTMContext.Provider>;
};

export const useUTM = () => useContext(UTMContext);
