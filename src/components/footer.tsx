"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import Ballpit from "@/components/ballpit";
import CookiePreferencesModal from "@/components/shared/CookiePreferencesModal";

const Footer = () => {
  const [showCookieModal, setShowCookieModal] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mql.matches);
    update();
    if (mql.addEventListener) mql.addEventListener("change", update);
    else mql.addListener(update);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", update);
      else mql.removeListener(update);
    };
  }, []);

  return (
    <>
      <CookiePreferencesModal
        isOpen={showCookieModal}
        onClose={() => setShowCookieModal(false)}
      />
      <footer
        className="relative bg-black/100 text-white py-16 lg:py-12 sm:py-10 overflow-hidden rounded-t-4xl"
        dir="rtl"
      >
        {/* Ballpit Animation Background (render desktop only) */}
        {isDesktop && (
          <div className="absolute inset-0 opacity-50" aria-hidden="true">
            <Ballpit
              className="w-full h-full"
              followCursor={true}
              count={50}
              colors={[0xff6a00, 0xff00a8, 0x8b00ff, 0x007bff, 0x00d4ff]}
              gravity={0.2}
              maxVelocity={0.1}
            />
          </div>
        )}

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <Image
                  src="/images/LOGO-AK.png"
                  alt="AK Agency Logo"
                  width={80}
                  height={80}
                  className="w-16 h-16 lg:w-20 lg:h-20"
                  priority
                />
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-6 max-w-md lg:text-base">
                אנחנו בונים ומעצבים אתרים שמותאמים בדיוק לצרכים של העסק שלך – עם
                עיצוב מקצועי, חוויית משתמש מתקדמת ו־SEO שמביא תוצאות
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-base font-semibold font-noto-hebrew mb-4 text-white lg:text-lg">
                קישורים מהירים
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-200 lg:text-base"
                  >
                    עמוד הבית
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-200 lg:text-base"
                  >
                    המחירים שלנו
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-200 lg:text-base"
                  >
                    צור קשר
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-base font-semibold font-noto-hebrew mb-4 text-white lg:text-lg">
                יצירת קשר
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href="mailto:info.contact@prexia.io"
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-200 lg:text-base"
                  >
                    info.contact@prexia.io
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a
                    href="tel:+972501234567"
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-200 lg:text-base"
                  >
                    050-532-2336
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-6">
                <div className="flex gap-3"></div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/70 mt-12 pt-8 flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="text-white/70 text-xs lg:text-sm">
              PREXIA הוא מותג טכנולוגי המופעל על-ידי קיניגמאה בע&quot;מ. כל
              הזכויות שמורות לקיניגמאה בע&quot;מ 2026 ©
            </div>
            <div className="flex gap-4 text-xs lg:gap-6 lg:text-sm">
              <Link
                href="/privacy"
                className="text-white/80 hover:underline transition-colors duration-200"
              >
                מדיניות פרטיות
              </Link>
              <Link
                href="/terms"
                className="text-white/80 hover:underline transition-colors duration-200"
              >
                תנאי שימוש
              </Link>
              <Link
                href="/accessibility"
                className="text-white/80 hover:underline transition-colors duration-200"
              >
                הצהרת נגישות
              </Link>
              <button
                className="text-white/80 hover:underline transition-colors duration-200"
                onClick={() => setShowCookieModal(true)}
              >
                הגדרות עוגיות
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
