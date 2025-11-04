'use client';

import { useEffect, useState } from 'react';
import { GoogleTagManager } from '@next/third-parties/google';
import { isAnalyticsEnabled } from '@/utils/cookieConsent';

export default function GoogleTagManagerClient() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(isAnalyticsEnabled());
    const onChange = (event: Event) => {
      const { detail } = event as CustomEvent<{ analytics: boolean }>;
      if (typeof detail?.analytics === 'boolean') {
        setEnabled(detail.analytics);
      }
    };
    window.addEventListener('cookiePreferencesChanged', onChange);
    return () => window.removeEventListener('cookiePreferencesChanged', onChange);
  }, []);

  const gtmId = process.env.NEXT_PUBLIC_GTM_ID as string | undefined;
  if (!gtmId || !enabled) return null;

  return <GoogleTagManager gtmId={gtmId} />;
}


