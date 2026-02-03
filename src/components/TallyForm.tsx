"use client";

import Script from "next/script";
import { useEffect } from "react";

interface WindowWithTally extends Window {
  Tally?: {
    loadEmbeds: () => void;
  };
}

const TallyForm = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as WindowWithTally).Tally) {
      (window as WindowWithTally).Tally?.loadEmbeds();
    }
  }, []);

  return (
    <>
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
        onLoad={() => {
          if ((window as WindowWithTally).Tally) {
            (window as WindowWithTally).Tally?.loadEmbeds();
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
};

export default TallyForm;
