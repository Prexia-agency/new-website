"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState, useLayoutEffect } from "react";

import { HeroButton } from "@/components/shared/hero-button";
import { lenisInstance } from "@/components/shared/LenisProvider";
import { MaskText } from "@/components/shared/textmask";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Configuration constants
const TOTAL_FRAMES = 145;
const COUNT_PRELOAD_FRAMES = 20; // Preload more frames for instant start
const PRELOAD_AMOUNT = 15; // Load more frames ahead for smoother scrolling

const HeroV = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const frameImagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const currentFrameRef = useRef({ contents: 1 });
  const isLoadingRef = useRef(false);
  const lastRenderedFrameRef = useRef<number | null>(null);
  const hasRevealRunRef = useRef(false);

  const [isReady, setIsReady] = useState(false);
  // Force MaskText remount on page transitions by providing unique keys
  const [mountId] = useState(() => `hero-${Date.now()}-${Math.random()}`);

  // Load a single frame
  const loadFrame = (frameNumber: number): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      // Check if frame is already loaded
      if (frameImagesRef.current.has(frameNumber)) {
        resolve(frameImagesRef.current.get(frameNumber)!);
        return;
      }

      const img = new Image();
      const paddedNumber = frameNumber.toString().padStart(4, "0");
      img.src = `/frames2/frame_${paddedNumber}.jpg`;

      img.onload = () => {
        frameImagesRef.current.set(frameNumber, img);
        resolve(img);
      };

      img.onerror = () => {
        reject(new Error(`Failed to load frame ${frameNumber}`));
      };
    });
  };

  // Preload a range of frames
  const preloadFrames = async (startFrame: number, endFrame: number) => {
    const start = Math.max(1, startFrame);
    const end = Math.min(TOTAL_FRAMES, endFrame);

    const promises: Promise<HTMLImageElement>[] = [];

    for (let i = start; i <= end; i++) {
      if (!frameImagesRef.current.has(i)) {
        promises.push(loadFrame(i));
      }
    }

    await Promise.all(promises);
  };

  // Render a specific frame on the canvas
  const renderFrame = (frameNumber: number) => {
    const canvas = canvasRef.current;
    const img = frameImagesRef.current.get(frameNumber);

    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear previous frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate dimensions for object-fit: cover behavior
    const canvasRatio = canvas.width / canvas.height;
    const imageRatio = img.width / img.height;

    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imageRatio) {
      // Canvas is wider than image
      drawHeight = canvas.width / imageRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      // Canvas is taller than image
      drawWidth = canvas.height * imageRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    // Draw image with proper scaling
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Safe render - only renders if frame actually changed
  const safeRender = (frameValue: number) => {
    const frame = Math.floor(frameValue);

    // Don't render if this is the same frame
    if (frame === lastRenderedFrameRef.current) return;

    // Check if frame is loaded
    if (!frameImagesRef.current.has(frame)) return;

    lastRenderedFrameRef.current = frame;
    renderFrame(frame);
  };

  // Handle scroll-based animation - SMOOTH CINEMATIC approach
  // Disabled: not currently used but kept for potential future scroll-based animations
  // const _handleScrollUpdate = (_self: ScrollTrigger) => {
  //   const currentScroll = window.scrollY;
  //   lastScrollPositionRef.current = currentScroll;

  //   // Use the tween from the context if available, or find it
  //   // We'll access the tween through a ref that we set in the context
  // };

  // Background loading of all frames - LOW PRIORITY, don't block scroll
  const loadFramesToHash = async () => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

    // Load remaining frames in smaller batches with delays to prevent blocking
    const batchSize = 8;
    for (let i = COUNT_PRELOAD_FRAMES + 1; i <= TOTAL_FRAMES; i += batchSize) {
      const end = Math.min(i + batchSize - 1, TOTAL_FRAMES);
      await preloadFrames(i, end);

      // Small delay between batches to let scroll breathe
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    isLoadingRef.current = false;
  };

  // Initialize canvas size
  const updateCanvasSize = () => {
    const canvas = canvasRef.current;
    const wrapper = canvasWrapperRef.current;
    if (!canvas || !wrapper) return;

    const pixelRatio = window.devicePixelRatio || 1;
    const width = wrapper.clientWidth;
    const height = wrapper.clientHeight;

    if (!width || !height) return;

    if (
      canvas.width !== width * pixelRatio ||
      canvas.height !== height * pixelRatio
    ) {
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
    }

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Re-render a safe frame after resize
    const fallbackFrame =
      lastRenderedFrameRef.current ?? currentFrameRef.current.contents ?? 1;
    const clampedFrame = Math.min(Math.max(1, fallbackFrame), TOTAL_FRAMES);

    // If current frame isn't loaded yet (can happen during rapid resize), fall back to frame 1
    const frameToDraw = frameImagesRef.current.has(clampedFrame)
      ? clampedFrame
      : frameImagesRef.current.has(1)
        ? 1
        : null;

    if (frameToDraw !== null) {
      renderFrame(frameToDraw);
    }
  };

  // 1. Initial Data Loading Effect
  useEffect(() => {
    let mounted = true;

    const initializeImages = async () => {
      try {
        updateCanvasSize();
        // Preload initial frames
        await preloadFrames(1, COUNT_PRELOAD_FRAMES);

        if (mounted) {
          // Render first frame immediately
          renderFrame(1);
          setIsReady(true);
          // Start background loading
          loadFramesToHash();
        }
      } catch (error) {
        console.error("Failed to initialize animation frames:", error);
      }
    };

    initializeImages();

    window.addEventListener("resize", updateCanvasSize);
    return () => {
      mounted = false;
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  // 2. GSAP Animation Setup Effect (Runs when ready)
  useLayoutEffect(() => {
    if (!isReady || !containerRef.current) return;

    // Use gsap.context for automatic cleanup of all GSAP instances created here
    const ctx = gsap.context(() => {
      // --- Frame Tween ---
      const frameTween = gsap.to(currentFrameRef.current, {
        contents: 1, // Initial value
        duration: 0.25,
        ease: "power2.out",
        paused: true,
        onUpdate: () => {
          safeRender(currentFrameRef.current.contents);
        },
      });

      // --- Main ScrollTrigger ---
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinRef.current,
        pinSpacing: true,
        scrub: 0.8,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Logic moved inside to access frameTween easily or we keep it external
          // We can inline the update logic here for better closure access

          // Calculate TARGET frame
          const targetFrame = Math.max(
            1,
            Math.min(TOTAL_FRAMES, self.progress * (TOTAL_FRAMES - 1) + 1),
          );

          // Update the tween
          frameTween.vars.contents = targetFrame;
          frameTween.invalidate().restart();

          // Preload logic (simplified)
          const currentFrameInt = Math.floor(targetFrame);
          const preloadStart = Math.max(1, currentFrameInt - 2);
          const preloadEnd = Math.min(
            TOTAL_FRAMES,
            currentFrameInt + PRELOAD_AMOUNT,
          );
          if (preloadStart <= preloadEnd) {
            preloadFrames(preloadStart, preloadEnd).catch(console.error);
          }
        },
      });

      // --- Expansion Animation ---
      const wrapper = canvasWrapperRef.current;
      const container = containerRef.current;

      if (wrapper && container) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        tl.to({}, { duration: 0.1 })
          .to(wrapper, {
            scaleX: 1.6,
            scaleY: 1.2,
            ease: "power2.out",
            duration: 0.25,
          })
          .to(wrapper, {
            scaleX: 1.6,
            scaleY: 1.2,
            duration: 0.6,
          });
      }

      // --- Reveal Animation ---
      if (wrapper && !hasRevealRunRef.current) {
        hasRevealRunRef.current = true;
        gsap.fromTo(
          wrapper,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "power2.out",
          },
        );
      }

      // --- Buttons Animation (GSAP instead of CSS) ---
      // This ensures the animation runs in the correct context and timeline
      if (container) {
        const buttons = container.querySelectorAll(".hero-btn-container");
        if (buttons.length > 0) {
          gsap.fromTo(
            buttons,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, delay: 2.2, ease: "power2.out" },
          );
        }
      }
    }, containerRef); // Scope to container

    // Force refresh to handle layout shifts from page transitions
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      // Ensure Lenis knows about the layout change
      lenisInstance?.resize();
    }, 200);

    return () => {
      clearTimeout(timer);
      ctx.revert(); // Cleans up EVERYTHING: ScrollTriggers, Tweens, etc.
    };
  }, [isReady]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black"
      style={{
        height: `${250}vh`,
      }}
    >
      <div
        ref={pinRef}
        className="relative w-full h-screen overflow-hidden bg-black"
      >
        {/* Example: GSAP letter-by-letter text animation */}
        <div className="absolute inset-y-0 right-0 flex items-center px-10 text-right z-10 pointer-events-none">
          <div className="max-w-2xl pointer-events-auto" dir="ltr">
            <h1 className="sr-only">Robust Digital Solutions, Built to Last</h1>
            <MaskText
              key={`${mountId}-title`}
              split="letters"
              lineClassName="overflow-hidden [&:first-child]:pr-[5px] [&>p]:whitespace-nowrap"
              textClassName="font-ppeiko text-white text-4xl md:text-5xl lg:text-6xl leading-tight"
              phrases={["Robust Digital Solutions,", "Built to Last"]}
            />
            <div className="mt-6 text-right" dir="rtl">
              <h2 className="sr-only">
                PREXIA מתמחה בתכנון, בפיתוח ובתחזוקה שוטפת של מוצרים דיגיטליים,
                תוך מתן פתרונות מותאמים אישית וביצוע מלא תחת קורת גג אחת.
              </h2>
              <MaskText
                key={`${mountId}-subtitle`}
                split="lines"
                lineClassName="overflow-hidden"
                textClassName="font-david-libre text-white text-20px md:text-20px leading-tight"
                delay={1}
                phrases={[
                  "PREXIA מתמחה בתכנון, בפיתוח ובתחזוקה שוטפת",
                  "של מוצרים דיגיטליים, תוך מתן פתרונות מותאמים אישית",
                  " וביצוע מלא תחת קורת גג אחת.",
                ]}
              />
              <div
                className="hero-btn-container mt-6 flex flex-wrap gap-3 justify-start opacity-0"
                dir="rtl"
              >
                <HeroButton href="/blog" variant="solid" ariaLabel="הבלוג">
                  הבלוג
                </HeroButton>
                <HeroButton href="/contact" variant="ghost" ariaLabel="צור קשר">
                  צור קשר
                </HeroButton>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-start sm:pr-4 md:pl-0 lg:pl-10">
          <div
            ref={canvasWrapperRef}
            className="relative w-full h-full sm:w-[320px] sm:h-auto md:w-[360px] lg:w-[400px] sm:aspect-[9/19.5] bg-black overflow-hidden shadow-2xl origin-center"
            style={{
              willChange: "transform",
              transform: "translateZ(0)",
            }}
          >
            <canvas
              ref={canvasRef}
              aria-label="אנימציית Hero"
              className="absolute inset-0 opacity-60 sm:opacity-100"
              style={{
                opacity: isReady ? undefined : 0,
                transition: "opacity 0.35s ease-in-out",
                willChange: "contents",
              }}
            />

            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300"
              style={{
                opacity: isReady ? 0 : 1,
                pointerEvents: isReady ? "none" : "auto",
              }}
              aria-live="polite"
            >
              <span className="sr-only">Loading video frames</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroV;
