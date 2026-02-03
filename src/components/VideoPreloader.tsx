"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./VideoPreloader.module.css";

type VideoPreloaderProps = {
  exiting: boolean;
  onVideoEnd: () => void;
  onExitComplete: () => void;
};

export default function VideoPreloader({
  exiting,
  onVideoEnd,
  onExitComplete,
}: VideoPreloaderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleFinish = () => onVideoEnd();

    video.addEventListener("ended", handleFinish);
    video.addEventListener("error", handleFinish);

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => onVideoEnd());
    }

    const fallback = window.setTimeout(onVideoEnd, 8000);

    return () => {
      window.clearTimeout(fallback);
      video.removeEventListener("ended", handleFinish);
      video.removeEventListener("error", handleFinish);
    };
  }, [onVideoEnd]);

  useEffect(() => {
    if (!exiting) return;
    const overlay = overlayRef.current;
    const video = videoRef.current;

    if (!overlay) {
      onExitComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: onExitComplete,
      });

      const videoContainer = videoContainerRef.current;

      // Zoom center point (adjustable) - where on screen to zoom towards
      const zoomCenterX = 50; // percentage (50 = center)
      const zoomCenterY = 50; // percentage (50 = center)

      // Set transform origin for the zoom effect
      tl.set(overlay, { 
        transformOrigin: `${zoomCenterX}% ${zoomCenterY}%` 
      });

      // Phase 0: Expand video container and remove border radius (0s - 0.5s)
      // This makes the video blend into the full screen before the zoom
      if (videoContainer) {
        tl.to(
          videoContainer,
          {
            width: "100vw",
            height: "100vh",
            maxWidth: "none",
            borderRadius: "0px",
            duration: 0.5,
            ease: "power2.out",
          },
          0
        );
      }

      // Phase 1: Zoom in dramatically (0.3s - 1.3s)
      // Faster, continuous zoom with no stalling
      tl.to(
        overlay,
        {
          scale: 4.5,
          duration: 1.0,
          ease: "power1.in",
        },
        0.3
      );

      // Phase 2: Fade out video near end of zoom (1.0s - 1.3s)
      if (video) {
        tl.to(
          video,
          {
            opacity: 0,
            duration: 0.3,
            ease: "power1.in",
          },
          0.4
        );
      }

      // Phase 3: Background color transition white -> black (1.1s - 1.5s)
      // Using smooth backgroundColor transition like the reference
      tl.to(
        overlay,
        {
          backgroundColor: "#000000",
          duration: 0.4,
          ease: "power1.inOut",
        },
        0.4
      );

      // Phase 4: Fade out the entire overlay to reveal the page (1.4s - 1.8s)
      tl.to(
        overlay,
        {
          opacity: 0,
          duration: 0.4,
          ease: "power1.in",
        },
        1.4
      );
    }, overlay);

    return () => ctx.revert();
  }, [exiting, onExitComplete]);

  return (
    <div className={styles.wrapper}>
      <div
        ref={overlayRef}
        className={styles.overlay}
        aria-live="polite"
        aria-label="Loading"
      >
        <div ref={videoContainerRef} className={styles.videoContainer}>
          <video
            ref={videoRef}
            src="/pre.mp4"
            muted
            autoPlay
            playsInline
            preload="auto"
            className={styles.video}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
