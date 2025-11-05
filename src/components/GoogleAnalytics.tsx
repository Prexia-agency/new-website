'use client';

import { useGoogleAnalytics } from '@/utils/useGoogleAnalytics';

/**
 * Google Analytics and Google Ads component that respects cookie preferences
 * Only loads GA/Ads if user has accepted analytics cookies
 */
export default function GoogleAnalytics() {
  // Your GA4 Measurement ID - can be overridden by environment variable
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string;
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID as string;
  
  // Only initialize if measurementId is available
  if (!measurementId) {
    if (typeof window !== 'undefined') {
      console.warn('[GA] NEXT_PUBLIC_GA_MEASUREMENT_ID environment variable is not set.');
    }
    return null;
  }
  
  // This hook will only load GA/Ads if analytics cookies are accepted
  useGoogleAnalytics(measurementId, adsId);
  
  return null;
}

