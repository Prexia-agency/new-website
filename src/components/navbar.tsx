"use client";

import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

import DrawLink from "./DrawLink";

const Navbar = () => {
  const [isOverDark, setIsOverDark] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const iconRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!isHomePage) {
      setIsOverDark(false);
      return;
    }

    const handleScroll = () => {
      const navbar = document.querySelector("nav.hidden.lg\\:block");
      if (!navbar) return;

      const navbarRect = navbar.getBoundingClientRect();
      const navbarCenter = navbarRect.top + navbarRect.height / 2;

      // Check if navbar is over Hero, Stack, or GSAP card sections (dark backgrounds)
      const heroSection = document.querySelector(
        '.hidden.lg\\:block[data-section="hero"]',
      );
      const stackSection = document.querySelector('[data-section="stack"]');
      const gsapCard = document.querySelector(".bg-\\[\\#0e100f\\]");
      const sitesSection = document.querySelector("section.bg-white");

      let overDark = false;

      // Check if over sites section (white background) - should use dark text
      if (sitesSection) {
        const sitesRect = sitesSection.getBoundingClientRect();
        if (navbarCenter >= sitesRect.top && navbarCenter <= sitesRect.bottom) {
          overDark = false; // Explicitly set to false for white background
          setIsOverDark(overDark);
          return;
        }
      }

      // Check if over dark sections (Hero, Stack, or GSAP card)
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        if (navbarCenter >= heroRect.top && navbarCenter <= heroRect.bottom) {
          overDark = true;
        }
      }

      if (stackSection) {
        const stackRect = stackSection.getBoundingClientRect();
        if (navbarCenter >= stackRect.top && navbarCenter <= stackRect.bottom) {
          overDark = true;
        }
      }

      if (gsapCard) {
        const gsapRect = gsapCard.getBoundingClientRect();
        if (navbarCenter >= gsapRect.top && navbarCenter <= gsapRect.bottom) {
          overDark = true;
        }
      }

      setIsOverDark(overDark);
    };

    handleScroll(); // Check initial position
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const textColor = isOverDark
    ? "text-white hover:text-gray-200"
    : "text-gray-800 hover:text-gray-600";

  const handleIconHover = () => {
    if (!iconRef.current) return;

    const tl = gsap.timeline();

    // Slide out to the left
    tl.to(iconRef.current, {
      x: -30,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    })
      // Instantly move to the right
      .set(iconRef.current, {
        x: 30,
      })
      // Slide in from the right
      .to(iconRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
  };

  return (
    <nav className="hidden lg:block fixed top-0 left-0 right-0 z-50" dir="rtl">
      <div className="w-full bg-transparent backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 py-3 px-6">
          {/* Logo - Far Right */}
          <Link href="/" aria-label="עמוד הבית" className="flex-shrink-0 pr-2">
            <Image
              src="/images/320 Logo.png"
              width={320}
              height={32}
              className="w-24 h-24"
              alt="לוגו PREXIA"
            />
          </Link>

          {/* Navigation Links - Center */}
          <div className="flex items-center gap-12 flex-grow justify-center">
            <DrawLink
              href="/"
              className={`${textColor} transition-colors duration-300 font-medium text-sm`}
            >
              עמוד הבית
            </DrawLink>
            <DrawLink
              href="/pricing"
              className={`${textColor} transition-colors duration-300 font-medium text-sm`}
            >
              המחירון שלנו
            </DrawLink>
          </div>

          {/* Contact Button - Far Left */}
          <style jsx global>{`
            .navbar-contact-button {
              transform: translateZ(0) scale(1);
              will-change: transform, opacity;
              transition:
                transform 700ms cubic-bezier(0.4, 0, 0.2, 1),
                opacity 800ms cubic-bezier(0.4, 0, 0.2, 1) !important;
            }

            .navbar-contact-button:hover {
              transform: translateZ(0) scale(1.02) !important;
              opacity: 0.85;
            }
          `}</style>
          <Link
            href="/contact"
            className="navbar-contact-button gradient-bg text-white px-5 py-3 rounded-[10px] font-semibold text-[10px] shadow-xl flex items-center gap-2 flex-shrink-0"
            style={{
              backdropFilter: "blur(10px)",
              border: "1px solid transparent",
              backgroundClip: "padding-box",
            }}
            onMouseEnter={handleIconHover}
          >
            <span className="font-semibold text-[14px] text-white">
              דבר איתנו
            </span>
            <svg
              ref={iconRef}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
