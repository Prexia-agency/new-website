/**
 * Google Analytics Integration Hook
 *
 * This hook handles Google Analytics initialization based on user cookie preferences.
 *
 * Usage:
 * 1. Get your GA4 Measurement ID from Google Analytics
 * 2. Add it to your environment variables as NEXT_PUBLIC_GA_MEASUREMENT_ID
 * 3. Import and use this hook in your layout or a client component
 *
 * Example:
 * ```tsx
 * import { useGoogleAnalytics } from '@/utils/useGoogleAnalytics';
 *
 * function MyComponent() {
 *   useGoogleAnalytics('G-XXXXXXXXXX'); // Your GA4 Measurement ID
 *   return <div>...</div>;
 * }
 * ```
 */

"use client";

import { useEffect } from "react";

import { isAnalyticsEnabled, ensureConsentModeUpdated } from "./cookieConsent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const useGoogleAnalytics = (measurementId: string) => {
  useEffect(() => {
    // Check if GA script is actually loaded, not just if gtag exists
    // (gtag exists from consent script, but GA script might not be loaded)
    const isScriptLoaded = () => {
      if (typeof window === "undefined") return false;
      const scripts = document.querySelectorAll(
        'script[src*="googletagmanager.com/gtag/js"]',
      );
      return scripts.length > 0;
    };

    let initialized = isScriptLoaded();

    const init = () => {
      if (initialized) {
        return;
      }

      // Validate measurementId before proceeding
      if (!measurementId) {
        console.warn(
          "[GA] Measurement ID is missing. Cannot initialize Google Analytics.",
        );
        return;
      }

      // Initialize dataLayer and gtag (might already exist from consent script)
      window.dataLayer = window.dataLayer || [];
      if (!window.gtag) {
        window.gtag = function gtag(...args: unknown[]) {
          window.dataLayer?.push(args);
        };
      }

      // Ensure consent mode is updated before initializing GA
      // This uses the centralized consent utility for consistency
      ensureConsentModeUpdated();

      window.gtag("js", new Date());
      window.gtag("config", measurementId, {
        page_path: window.location.pathname,
      });

      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      script.async = true;
      document.head.appendChild(script);

      initialized = true;
      // eslint-disable-next-line no-console
      console.log("[GA] Initialized with ID:", measurementId);
    };

    // Initialize immediately if user already allowed analytics
    if (isAnalyticsEnabled()) {
      init();
    } else {
      // eslint-disable-next-line no-console
      console.log("[GA] Analytics disabled by user preferences");
    }

    // Always listen for consent changes and init when enabled
    const handlePreferencesChanged = (event: Event) => {
      const { detail } = event as CustomEvent<{ analytics: boolean }>;
      if (detail?.analytics) {
        init();
      }
    };

    window.addEventListener(
      "cookiePreferencesChanged",
      handlePreferencesChanged,
    );

    return () => {
      window.removeEventListener(
        "cookiePreferencesChanged",
        handlePreferencesChanged,
      );
    };
  }, [measurementId]);
};

/**
 * Track a custom event in Google Analytics
 * This will only track if analytics is enabled
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>,
) => {
  if (!isAnalyticsEnabled()) {
    // eslint-disable-next-line no-console
    console.log("[GA] Event tracking skipped - analytics disabled");
    return;
  }

  if (window.gtag) {
    window.gtag("event", eventName, eventParams);
    // eslint-disable-next-line no-console
    console.log("[GA] Event tracked:", eventName, eventParams);
  } else {
    console.warn("[GA] gtag not loaded yet");
  }
};

/**
 * Track a page view in Google Analytics
 * This is useful for client-side navigation in Next.js
 * @param url - The URL to track
 * @param measurementId - Optional GA4 Measurement ID (uses env var if not provided)
 */
export const trackPageView = (url: string, measurementId?: string) => {
  if (!isAnalyticsEnabled()) {
    // eslint-disable-next-line no-console
    console.log("[GA] Page view tracking skipped - analytics disabled");
    return;
  }

  const gaId = measurementId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!gaId) {
    console.warn("[GA] No measurement ID provided");
    return;
  }

  if (window.gtag) {
    window.gtag("config", gaId, {
      page_path: url,
    });
    // eslint-disable-next-line no-console
    console.log("[GA] Page view tracked:", url);
  }
};
