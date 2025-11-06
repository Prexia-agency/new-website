'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { isAnalyticsEnabled, ensureConsentModeUpdated } from '@/utils/cookieConsent';

export default function GoogleTagManagerClient() {
  const [enabled, setEnabled] = useState(false);
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-P8X78VSW';

  useEffect(() => {
    // Check initial consent on component mount
    const initialConsent = isAnalyticsEnabled();
    if (initialConsent) {
      setEnabled(true);
    }

    // Listen for consent changes
    const handleConsentChange = (event: Event) => {
      const { detail } = event as CustomEvent<{ analytics: boolean }>;
      if (typeof detail?.analytics === 'boolean') {
        setEnabled(detail.analytics);
      }
    };

    window.addEventListener('cookiePreferencesChanged', handleConsentChange);
    return () => {
      window.removeEventListener('cookiePreferencesChanged', handleConsentChange);
    };
  }, []);

  // Ensure consent mode is updated before GTM loads
  // This uses the centralized consent utility for consistency
  useEffect(() => {
    if (enabled) {
      ensureConsentModeUpdated();
    }
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}


