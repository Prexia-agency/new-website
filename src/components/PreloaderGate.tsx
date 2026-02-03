"use client";

import { useCallback, useEffect, useState } from "react";
import VideoPreloader from "./VideoPreloader";

export default function PreloaderGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldExit, setShouldExit] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    const { style } = document.body;
    const previousOverflow = style.overflow;
    style.overflow = "hidden";
    return () => {
      style.overflow = previousOverflow;
    };
  }, [isVisible]);

  const handleVideoEnd = useCallback(() => {
    setShouldExit(true);
  }, []);

  const handleExitComplete = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <>
      {isVisible && (
        <VideoPreloader
          exiting={shouldExit}
          onVideoEnd={handleVideoEnd}
          onExitComplete={handleExitComplete}
        />
      )}
      {children}
    </>
  );
}

