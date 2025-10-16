'use client';

import { useGoogleAnalytics } from '@/utils/useGoogleAnalytics';

/**
 * Google Analytics component that respects cookie preferences
 * Only loads GA if user has accepted analytics cookies
 */
export default function GoogleAnalytics() {
  // Your GA4 Measurement ID - can be overridden by environment variable
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-QDWLLBCVS8';
  
  // This hook will only load GA if analytics cookies are accepted
  useGoogleAnalytics(measurementId);
  
  return null;
}

