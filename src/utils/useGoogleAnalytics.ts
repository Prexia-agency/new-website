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

'use client';

import { useEffect } from 'react';
import { isAnalyticsEnabled } from './cookieConsent';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const useGoogleAnalytics = (measurementId: string) => {
  useEffect(() => {
    // Check if analytics is enabled
    if (!isAnalyticsEnabled()) {
      console.log('[GA] Analytics disabled by user preferences');
      return;
    }

    // Check if GA is already loaded
    if (window.gtag) {
      console.log('[GA] Already loaded');
      return;
    }

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    
    // Define gtag function
    window.gtag = function gtag() {
      window.dataLayer?.push(arguments);
    };

    // Set initial timestamp
    window.gtag('js', new Date());
    
    // Configure GA
    window.gtag('config', measurementId, {
      page_path: window.location.pathname,
    });

    // Load GA script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;
    document.head.appendChild(script);

    console.log('[GA] Initialized with ID:', measurementId);

    // Listen for cookie preference changes
    const handlePreferencesChanged = (event: Event) => {
      const customEvent = event as CustomEvent;
      const preferences = customEvent.detail;
      
      if (!preferences.analytics && window.gtag) {
        // User disabled analytics - disable GA
        window.gtag('config', measurementId, {
          'anonymize_ip': true,
          'send_page_view': false
        });
        console.log('[GA] Analytics disabled by user');
      } else if (preferences.analytics && window.gtag) {
        // User enabled analytics - re-enable GA
        window.gtag('config', measurementId, {
          page_path: window.location.pathname,
        });
        console.log('[GA] Analytics enabled by user');
      }
    };

    window.addEventListener('cookiePreferencesChanged', handlePreferencesChanged);

    return () => {
      window.removeEventListener('cookiePreferencesChanged', handlePreferencesChanged);
    };
  }, [measurementId]);
};

/**
 * Track a custom event in Google Analytics
 * This will only track if analytics is enabled
 */
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (!isAnalyticsEnabled()) {
    console.log('[GA] Event tracking skipped - analytics disabled');
    return;
  }

  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
    console.log('[GA] Event tracked:', eventName, eventParams);
  } else {
    console.warn('[GA] gtag not loaded yet');
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
    console.log('[GA] Page view tracking skipped - analytics disabled');
    return;
  }

  const gaId = measurementId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  
  if (!gaId) {
    console.warn('[GA] No measurement ID provided');
    return;
  }

  if (window.gtag) {
    window.gtag('config', gaId, {
      page_path: url,
    });
    console.log('[GA] Page view tracked:', url);
  }
};

