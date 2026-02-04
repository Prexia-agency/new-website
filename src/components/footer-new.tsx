/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Matter from "matter-js";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import CookiePreferencesModal from "@/components/shared/CookiePreferencesModal";

// Design tokens
/* eslint-disable sonarjs/no-duplicate-string */
const FALLBACK_FONT = "Arial, sans-serif";
const WALL_COLOR = "rgba(0, 0, 0, 0.3)";
/* eslint-enable sonarjs/no-duplicate-string */

const EmailIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M4 7.5a2.5 2.5 0 0 1 2.5-2.5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 7.5 12 12l5.5-4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};

const PhoneIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M8.4 5.7c.3-.7 1.1-1 1.8-.8l1.8.6c.6.2 1 .9.8 1.5l-.8 2c-.2.5-.1 1 .3 1.4l3 3c.4.4.9.5 1.4.3l2-.8c.6-.2 1.3.2 1.5.8l.6 1.8c.2.7-.1 1.5-.8 1.8l-1.2.5c-1 .4-2.2.3-3.2-.2-2.7-1.4-5.9-4.5-7.3-7.3-.5-1-.6-2.2-.2-3.2l.5-1.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};

const ClockIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M12 7v5l3 2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const HoverSwapText = ({ text }: { text: string }) => {
  return (
    <span className="hover-swap">
      <span className="hover-swap__inner">{text}</span>
      <span className="hover-swap__clone" aria-hidden="true">
        {text}
      </span>
    </span>
  );
};

const FooterNew = () => {
  const [showCookieModal, setShowCookieModal] = useState(false);
  const [israelTime, setIsraelTime] = useState<string>("");
  const [isIsraelBusinessOpen, setIsIsraelBusinessOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    engine: Matter.Engine;
    render: Matter.Render;
    runner: Matter.Runner;
    letters: Matter.Body[];
    ground: Matter.Body;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const hasAnimatedRef = useRef(false);
  const fontFamilyRef = useRef(FALLBACK_FONT);
  const canvasSizeRef = useRef({ width: 0, height: 0, dpr: 1 });

  // Live clock (Israel time)
  useEffect(() => {
    const timeFormatter = new Intl.DateTimeFormat("he-IL", {
      timeZone: "Asia/Jerusalem",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const partsFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Jerusalem",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const tick = () => {
      const now = new Date();
      setIsraelTime(timeFormatter.format(now));

      const parts = partsFormatter.formatToParts(now);
      const weekday = parts.find((p) => p.type === "weekday")?.value; // Sun..Sat
      const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
      const minute = Number(
        parts.find((p) => p.type === "minute")?.value ?? "0",
      );

      const isBusinessDay =
        weekday === "Sun" ||
        weekday === "Mon" ||
        weekday === "Tue" ||
        weekday === "Wed" ||
        weekday === "Thu";

      const minutesSinceMidnight = hour * 60 + minute;
      const start = 8 * 60; // 08:00
      const end = 17 * 60 + 30; // 17:30
      const isWithinHours =
        minutesSinceMidnight >= start && minutesSinceMidnight < end;

      setIsIsraelBusinessOpen(isBusinessDay && isWithinHours);
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let isDisposed = false;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    hasAnimatedRef.current = false;

    const init = async () => {
      if (isDisposed) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      try {
        await document.fonts.ready;
      } catch {
        console.warn("Font loading check failed, using fallback");
      }

      const computedStyle = window.getComputedStyle(canvas);
      fontFamilyRef.current = computedStyle.fontFamily || "Arial, sans-serif";

      const canvasParent = canvas.parentElement as HTMLElement | null;
      const setCanvasSize = () => {
        // Calculate width based on letter measurements
        const letterText = "PREXIA";
        const fontSize = isMobile ? 56 : 110;
        const tracking = isMobile ? 6 : 10;
        ctx.font = `300 ${fontSize}px ${fontFamilyRef.current}`;
        const glyphWidths = letterText
          .split("")
          .map((letter) => Math.ceil(ctx.measureText(letter).width));
        const totalLetterWidth =
          glyphWidths.reduce((sum, w) => sum + w, 0) +
          tracking * (glyphWidths.length - 1);
        const leftPadding = isMobile ? 20 : 30;
        const rightPadding = isMobile ? 20 : 30;

        const width = totalLetterWidth + leftPadding + rightPadding;
        const height = canvasParent?.clientHeight || (isMobile ? 130 : 260);
        const dpr = window.devicePixelRatio || 1;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        canvasSizeRef.current = { width, height, dpr };
        return { width, height };
      };

      const { width, height } = setCanvasSize();

      // Create Matter.js engine with no initial gravity (enable later)
      const engine = Matter.Engine.create({
        gravity: { x: 0, y: 0, scale: 0.0025 },
      });
      engine.enableSleeping = true;
      // Increase iterations for better stacking collision detection
      engine.positionIterations = 10;
      engine.velocityIterations = 8;

      // Full width ground - nothing falls off
      const ground = Matter.Bodies.rectangle(
        width / 2,
        height - 4,
        width * 1.2, // Extra wide to catch everything
        12,
        {
          isStatic: true,
          render: { fillStyle: WALL_COLOR }, // Semi-transparent black for visualization
        },
      );

      // Side walls to prevent letters from escaping
      const leftWall = Matter.Bodies.rectangle(
        -6, // Just outside left edge
        height / 2,
        12,
        height * 2, // Tall enough to catch falling letters
        {
          isStatic: true,
          render: { fillStyle: "rgba(0, 0, 0, 0.3)" },
        },
      );

      const rightWall = Matter.Bodies.rectangle(
        width + 6, // Just outside right edge
        height / 2,
        12,
        height * 2, // Tall enough to catch falling letters
        {
          isStatic: true,
          render: { fillStyle: "rgba(0, 0, 0, 0.3)" },
        },
      );

      // Create letters for PREXIA using measured glyph widths
      const letterText = "PREXIA";
      const letters: Matter.Body[] = [];
      const fontSize = isMobile ? 84 : 165; // 50% larger
      ctx.font = `400 ${fontSize}px ${fontFamilyRef.current}`; // 30% thicker (400 vs 300)
      const glyphWidths = letterText
        .split("")
        .map((letter) => Math.ceil(ctx.measureText(letter).width));

      // Start letters stacked vertically above canvas - they'll fall into a pile
      const centerX = width / 2;
      const startY = -50; // Start above canvas (invisible)
      const paddingX = isMobile ? 2 : 3; // Minimal padding for tight fit like reference
      const paddingY = isMobile ? 2 : 3; // Same minimal padding for Y axis
      const baseHeight = Math.round(fontSize * 0.7); // Base height from font size
      const bodyHeight = baseHeight + paddingY; // Add minimal padding like X axis

      letterText.split("").forEach((letter, index) => {
        // Safe array access with bounds check
        const glyphWidth =
          index >= 0 && index < glyphWidths.length ? glyphWidths[index] : 50;
        // Letters start from varied horizontal positions - spread across the canvas width
        const horizontalSpread = width * 0.4; // Use 40% of canvas width for spread
        const x = centerX + (Math.random() - 0.5) * horizontalSpread; // Random position left or right of center
        const y = startY - index * bodyHeight; // Stacked vertically above canvas

        const body = Matter.Bodies.rectangle(
          x,
          y,
          glyphWidth + paddingX,
          bodyHeight,
          {
            restitution: 0.15, // Low bounce - letters settle quickly
            friction: 0.6, // Moderate friction allows sliding
            frictionStatic: 0.7, // Moderate static friction
            frictionAir: 0.002, // Very low air resistance for fast fall
            density: 0.01, // Heavy enough to push others when landing
            render: {
              fillStyle: "transparent",
            },
            label: letter,
          },
        );

        letters.push(body);
      });

      // Add all bodies to the world - ground, walls, and letters
      Matter.World.add(engine.world, [ground, leftWall, rightWall, ...letters]);

      // Run the engine
      const runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);

      // Store references
      sceneRef.current = {
        engine,
        render: null as any,
        runner,
        letters,
        ground,
      };

      // Handle resize
      const handleResize = () => {
        if (container && canvas) {
          const { width: newWidth, height: newHeight } = setCanvasSize();

          // Update ground position
          Matter.Body.setPosition(
            ground,
            Matter.Vector.create(newWidth / 2, newHeight - 4),
          );
          // Update wall positions
          Matter.Body.setPosition(
            leftWall,
            Matter.Vector.create(-6, newHeight / 2),
          );
          Matter.Body.setPosition(
            rightWall,
            Matter.Vector.create(newWidth + 6, newHeight / 2),
          );
        }
      };

      window.addEventListener("resize", handleResize);

      // Intersection Observer to trigger animation when footer is visible
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimatedRef.current) {
              hasAnimatedRef.current = true;

              // Very strong gravity for fast fall
              const targetGravity = 4.0; // Increased for faster fall
              const targetScale = 0.001;

              // Quick gravity ramp-up over 200ms for immediate response
              const start = performance.now();
              const ramp = (now: number) => {
                const elapsed = Math.min(1, (now - start) / 200);
                engine.gravity.y = targetGravity * elapsed;
                engine.gravity.scale = targetScale;
                if (elapsed < 1) requestAnimationFrame(ramp);
              };
              requestAnimationFrame(ramp);

              // Drop letters one by one with varied velocities for messy pile
              const dropLetter = (letter: Matter.Body) => {
                Matter.Sleeping.set(letter, false);
                // Varied horizontal velocity - letters fall at different angles
                const horizontalForce = (Math.random() - 0.5) * 1.5;
                Matter.Body.setVelocity(letter, {
                  x: horizontalForce, // Significant horizontal movement for spread
                  y: 2 + Math.random() * 1, // Increased downward velocity for faster fall
                });
                // Strong rotation for tumbling effect like reference images
                Matter.Body.setAngularVelocity(
                  letter,
                  (Math.random() - 0.5) * 0.15,
                );
              };

              // Drop letters sequentially with slight timing variation
              // Order: P, R, E, X, I, A (one after another with delay)
              letters.forEach((letter, index) => {
                setTimeout(
                  () => {
                    dropLetter(letter);
                  },
                  index * 150 + Math.random() * 50,
                ); // 150-200ms between letters for natural timing
              });
            }
          });
        },
        { threshold: 0.5 },
      );

      if (container) {
        observer.observe(container);
      }

      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize);
        observer.disconnect();
        if (sceneRef.current) {
          Matter.Runner.stop(sceneRef.current.runner);
          Matter.World.clear(sceneRef.current.engine.world, false);
          Matter.Engine.clear(sceneRef.current.engine);
        }
      };
    };

    let cleanup: (() => void) | undefined;
    init().then((result) => {
      cleanup = result;
    });

    return () => {
      isDisposed = true;
      if (cleanup) cleanup();
    };
  }, [isMobile]);

  // Custom rendering for letters on canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let resolvedFontFamily = "Arial, sans-serif";

    // Wait for fonts to load and get the resolved font family
    const setupFont = async () => {
      try {
        await document.fonts.ready;
        const computedStyle = window.getComputedStyle(canvas);
        resolvedFontFamily = computedStyle.fontFamily || "Arial, sans-serif";
      } catch {
        console.warn("Font loading check failed, using fallback");
      }
    };

    setupFont();

    const animate = () => {
      if (!sceneRef.current) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(
        0,
        0,
        canvasSizeRef.current.width,
        canvasSizeRef.current.height,
      );

      // Draw ground (visualization)
      const ground = sceneRef.current.ground;
      if (ground) {
        ctx.save();
        ctx.translate(ground.position.x, ground.position.y);
        ctx.rotate(ground.angle);
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        ctx.fillRect(
          -ground.bounds.max.x + ground.position.x,
          -6,
          ground.bounds.max.x - ground.bounds.min.x,
          12,
        );
        ctx.restore();
      }

      // Draw each letter with styling
      sceneRef.current.letters.forEach((body) => {
        const pos = body.position;
        const angle = body.angle;
        const label = body.label || "";

        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.rotate(angle);

        // Draw letter text with resolved ppeiko font - 50% larger, 30% thicker
        const fontSize = window.innerWidth < 768 ? 84 : 165;
        ctx.font = `400 ${fontSize}px ${resolvedFontFamily}`;
        ctx.fillStyle = "#000000";
        ctx.textAlign = "center";
        ctx.textBaseline = "top"; // Use top baseline for tighter letter stacking
        ctx.fillText(label, 0, -fontSize * 0.4); // Offset to center within body

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <>
      <CookiePreferencesModal
        isOpen={showCookieModal}
        onClose={() => setShowCookieModal(false)}
      />

      {/* Black background wrapper */}
      <div className="w-full bg-black py-3 px-3 md:px-6">
        <footer
          className="relative w-full max-w-[95%] mx-auto bg-white text-black py-4 overflow-hidden rounded-3xl"
          dir="rtl"
          ref={containerRef}
        >
          {/* Footer Content with Grid Layout */}
          <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
            {/* Flex layout: Links on right, Canvas on left in RTL */}
            <div className="flex flex-col md:flex-row gap-8 mb-8 items-start justify-between">
              {/* Matter.js Canvas for PREXIA - positioned first in RTL (appears right) */}
              <div className="w-full md:w-auto order-1">
                <div className="h-[130px] md:h-[260px]">
                  <canvas
                    ref={canvasRef}
                    aria-label="אנימציית לוגו PREXIA"
                    className="font-ppeiko"
                    style={{ touchAction: "none", border: "2px solid black" }}
                  />
                </div>
              </div>

              {/* Links container - positioned second in RTL (appears left) */}
              <div className="w-full md:w-auto order-2">
                <div className="h-[130px] md:h-[260px] flex flex-col justify-center">
                  <div className="flex flex-wrap gap-x-12 gap-y-8 justify-end">
                    {/* Quick Links Section */}
                    <div>
                      <h4 className="text-base font-semibold mb-3 text-black">
                        קישורים
                      </h4>
                      <ul className="space-y-2">
                        <li>
                          <Link
                            href="/"
                            className="hover-swap-trigger text-sm text-gray-600 hover:text-black transition-colors duration-200"
                          >
                            <HoverSwapText text="עמוד הבית" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/pricing"
                            className="hover-swap-trigger text-sm text-gray-600 hover:text-black transition-colors duration-200"
                          >
                            <HoverSwapText text="מחירים" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/contact"
                            className="hover-swap-trigger text-sm text-gray-600 hover:text-black transition-colors duration-200"
                          >
                            <HoverSwapText text="צור קשר" />
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                      <h4 className="text-base font-semibold mb-3 text-black">
                        משפטי
                      </h4>
                      <ul className="space-y-2">
                        <li>
                          <Link
                            href="/privacy"
                            className="hover-swap-trigger text-sm text-gray-600 hover:text-black transition-colors duration-200"
                          >
                            <HoverSwapText text="מדיניות פרטיות" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/terms"
                            className="hover-swap-trigger text-sm text-gray-600 hover:text-black transition-colors duration-200"
                          >
                            <HoverSwapText text="תנאי שימוש" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/accessibility"
                            className="hover-swap-trigger text-sm text-gray-600 hover:text-black transition-colors duration-200"
                          >
                            <HoverSwapText text="הצהרת נגישות" />
                          </Link>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="hover-swap-trigger text-sm text-gray-600 hover:text-black transition-colors duration-200 text-right"
                            onClick={() => setShowCookieModal(true)}
                          >
                            <HoverSwapText text="הגדרות עוגיות" />
                          </button>
                        </li>
                      </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                      <h4 className="text-base font-semibold mb-3 text-black">
                        יצירת קשר
                      </h4>
                      <div className="space-y-2">
                        <a
                          href="mailto:info@prexia.io"
                          className="hover-swap-trigger block text-sm text-gray-600 hover:text-black transition-colors duration-200"
                        >
                          <span className="inline-flex items-center gap-2">
                            <EmailIcon className="h-4 w-4 text-gray-500" />
                            <HoverSwapText text="info@prexia.io" />
                          </span>
                        </a>
                        <a
                          href="tel:+972505322336"
                          className="hover-swap-trigger block text-sm text-gray-600 hover:text-black transition-colors duration-200"
                        >
                          <span className="inline-flex items-center gap-2">
                            <PhoneIcon className="h-4 w-4 text-gray-500" />
                            <HoverSwapText text="050-532-2336" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Copyright Section */}
            <div className="border-t border-black/20 pt-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs text-gray-500 order-2 md:order-1">
                  ירושלים, ישראל
                </p>
                <p
                  className="text-xs text-gray-500 text-center order-1 md:order-2"
                  dir="ltr"
                >
                  © 2026 Prexia is a technology brand operated by Kinigma Ltd.
                  All rights reserved
                </p>
                <div
                  className="text-xs text-gray-500 order-3 md:order-3"
                  dir="ltr"
                >
                  <span className="relative inline-flex items-center gap-1 group">
                    {/* Status dot */}
                    <span
                      className={[
                        "inline-block h-2 w-2 rounded-full align-middle",
                        isIsraelBusinessOpen ? "bg-green-500" : "bg-gray-400",
                      ].join(" ")}
                      aria-hidden="true"
                    />
                    {/* Clock icon */}
                    <ClockIcon className="h-4 w-4 text-gray-500" />
                    {/* Time */}
                    <span className="tabular-nums">{israelTime}</span>

                    {/* Hover tooltip */}
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black px-2 py-1 text-[11px] text-gray-50 opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
                      {isIsraelBusinessOpen ? "Open" : "Closed"}
                    </span>

                    <span className="sr-only">
                      {isIsraelBusinessOpen ? "Open" : "Closed"}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default FooterNew;
