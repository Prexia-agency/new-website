"use client";

import { useGoogleAnalytics } from "@/utils/useGoogleAnalytics";

/**
 * Google Analytics and Google Ads component that respects cookie preferences
 * Only loads GA/Ads if user has accepted analytics cookies
 */
const GoogleAnalytics = () => {
  // Your GA4 Measurement ID - can be overridden by environment variable
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string;

  // Always call hook (React Hooks rule - hooks must be called unconditionally)
  // The hook will handle validation internally and skip initialization if measurementId is missing
  useGoogleAnalytics(measurementId);

  // Log warning if measurementId is missing (client-side only)
  if (typeof window !== "undefined" && !measurementId) {
    console.warn(
      "[GA] NEXT_PUBLIC_GA_MEASUREMENT_ID environment variable is not set.",
    );
  }

  return null;
};

export default GoogleAnalytics;
