"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const GlassNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl"
      dir="rtl"
      role="navigation"
      aria-label="ניווט ראשי"
    >
      {/* Glass Container */}
      <div className="backdrop-blur-xl bg-white/5 rounded-[8px] border border-white/10 px-5 py-2 md:px-6 md:py-2">
        <div className="flex items-center justify-between">
          {/* Prexia Logo/Brand - Right Side (in RTL) */}
          <Link
            href="/"
            className="flex items-center gap-2 text-white font-bold text-lg md:text-xl hover:opacity-80 transition-opacity duration-200 focus:outline-none rounded"
            aria-label="Prexia - דף הבית"
          >
            <Image
              src="/images/Thelogo1.png"
              alt="Prexia Logo"
              width={240}
              height={45}
              className="object-contain h-10 w-auto md:h-12"
              priority
            />
          </Link>

          {/* Navigation Links - Desktop Only */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/"
              className="group flex items-center gap-2 text-white/90 hover:text-white text-[14px] font-medium transition-all duration-300 ease-out focus:outline-none rounded-md px-3 py-3 hover:bg-white/10 relative overflow-hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-[-2px]">
                הבית
              </span>
            </Link>
            <Link
              href="/blog"
              className="group flex items-center gap-2 text-white/90 hover:text-white text-[14px] font-medium transition-all duration-300 ease-out focus:outline-none rounded-md px-3 py-3 hover:bg-white/10 relative overflow-hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-[-2px]">
                בלוג
              </span>
            </Link>
            <Link
              href="/contact"
              className="group flex items-center gap-2 text-white/90 hover:text-white text-[14px] font-medium transition-all duration-300 ease-out focus:outline-none rounded-md px-3 py-3 hover:bg-white/10 relative overflow-hidden"
              aria-label="צור קשר"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-[-2px]">
                צור קשר
              </span>
            </Link>
          </div>

          {/* Hamburger Menu - Mobile Only */}
          <button
            className="md:hidden flex items-center justify-center w-7 h-8 text-white rounded-md transition-all duration-300 ease-out focus:outline-none"
            aria-label="תפריט ניווט"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-300 ease-out ${isMenuOpen ? "rotate-90" : ""}`}
            >
              {isMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Popup */}
      <div
        className={`md:hidden mt-2 backdrop-blur-xl bg-white/5 rounded-[12px] border border-white/20 overflow-hidden transition-all duration-300 ease-out ${
          isMenuOpen
            ? "max-h-64 opacity-100"
            : "max-h-0 opacity-0 border-transparent"
        }`}
      >
        <div className="p-3 flex flex-col gap-1">
          <Link
            href="/"
            className="group flex items-center gap-2 text-white/90 hover:text-white text-[14px] font-medium transition-all duration-300 ease-out focus:outline-none rounded-lg px-3 py-2.5 hover:bg-white/10"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="transition-transform duration-300 ease-out group-hover:translate-x-[-2px]">
              הבית
            </span>
          </Link>
          <Link
            href="/blog"
            className="group flex items-center gap-2 text-white/90 hover:text-white text-[14px] font-medium transition-all duration-300 ease-out focus:outline-none rounded-lg px-3 py-2.5 hover:bg-white/10"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <span className="transition-transform duration-300 ease-out group-hover:translate-x-[-2px]">
              בלוג
            </span>
          </Link>
          <Link
            href="/contact"
            className="group flex items-center gap-2 text-white/90 hover:text-white text-[14px] font-medium transition-all duration-300 ease-out focus:outline-none rounded-lg px-3 py-2.5 hover:bg-white/10"
            aria-label="צור קשר"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="transition-transform duration-300 ease-out group-hover:translate-x-[-2px]">
              צור קשר
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default GlassNavbar;
