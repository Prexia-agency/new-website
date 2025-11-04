'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { isAnalyticsEnabled } from '@/utils/cookieConsent';

export default function GoogleTagManagerClient() {
  const [enabled, setEnabled] = useState(false);
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID as string | undefined;

  useEffect(() => {
    if (!gtmId) {
      console.warn('[GTM] Environment variable NEXT_PUBLIC_GTM_ID is not set. GTM will not be loaded.');
    }
  }, [gtmId]);

  useEffect(() => {
    const initialConsent = isAnalyticsEnabled();
    console.log('[GTM] Initial consent check:', initialConsent ? 'granted' : 'denied');
    setEnabled(initialConsent);

    const handleConsentChange = (event: Event) => {
      const { detail } = event as CustomEvent<{ analytics: boolean }>;
      if (typeof detail?.analytics === 'boolean') {
        console.log('[GTM] Consent changed, analytics is now:', detail.analytics ? 'granted' : 'denied');
        setEnabled(detail.analytics);
      }
    };

    window.addEventListener('cookiePreferencesChanged', handleConsentChange);
    return () => window.removeEventListener('cookiePreferencesChanged', handleConsentChange);
  }, []);

  // After consent is enabled and GTM/gtag is present, update consent mode to granted
  useEffect(() => {
    if (!enabled) return;
    let attempts = 0;
    const timer = setInterval(() => {
      const gtag = (window as Window & { gtag?: (...a: unknown[]) => void }).gtag;
      if (gtag) {
        gtag('consent', 'update', {
          ad_storage: 'granted',
          analytics_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
        });
        console.log('[GTM] Consent updated to granted via gtag');
        clearInterval(timer);
      } else if (++attempts > 20) {
        clearInterval(timer);
        console.warn('[GTM] gtag not detected after consent; skipping consent update');
      }
    }, 100);
    return () => clearInterval(timer);
  }, [enabled]);

  if (!gtmId || !enabled) {
    return null;
  }

  console.log(`[GTM] Rendering standard GTM snippet with ID: ${gtmId}`);
  return (
    <>
      <Script id="gtm-base" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
      </Script>
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        }}
      />
    </>
  );
}


