"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function TallyForm() {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).Tally) {
      (window as any).Tally.loadEmbeds();
    }
  }, []);

  return (
    <>
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
        onLoad={() => {
          if ((window as any).Tally) {
            (window as any).Tally.loadEmbeds();
          }
        }}
      />

      <iframe
        data-tally-src="https://tally.so/embed/BzxEkQ?transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="100%"
        height="991"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="טופס אפיון ראשוני"
      />
    </>
  );
}
