'use client';

import { useEffect, useState } from 'react';
import { GoogleTagManager } from '@next/third-parties/google';
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

  if (!gtmId || !enabled) {
    return null;
  }

  console.log(`[GTM] Rendering GoogleTagManager component with ID: ${gtmId}`);
  return <GoogleTagManager gtmId={gtmId} />;
}


