"use client";

import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { useEffect, useState } from "react";

export let lenisInstance: Lenis | null = null;

const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Force scroll to top on reload
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }

    const lenis = new Lenis({
      duration: 0.3,
      easing: (t) => t, // ❗ בלי easing
      wheelMultiplier: 1, // ❗ native delta
      smoothWheel: true,
    });

    lenisInstance = lenis;

    const onGsapTick = (time: number) => {
      if (!lenis.isStopped) {
        lenis.raf(time * 1000);
      }
    };

    gsap.ticker.add(onGsapTick);

    // Hide loader after a short delay to ensure scroll happened
    // We give it a small buffer to ensure the browser has repainted at the top
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => {
      gsap.ticker.remove(onGsapTick);
      lenis.destroy();
      lenisInstance = null;
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black z-[9999] transition-opacity duration-500 ease-out ${isLoading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden="true"
      />
      {children}
    </>
  );
};

export default LenisProvider;
