"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";
import { useState, useEffect } from "react";

import {
  hasUserMadeChoice,
  acceptAllCookies,
  rejectAllCookies,
} from "@/utils/cookieConsent";

const CookiesBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice about cookies
    if (!hasUserMadeChoice()) {
      const timer = setTimeout(() => {
        setShowBanner(true);
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      }, 6000); // 6 seconds delay

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    acceptAllCookies();
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300); // Wait for animation to complete
  };

  const handleRejectAll = () => {
    rejectAllCookies();
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300); // Wait for animation to complete
  };

  if (!showBanner) return null;

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[80%] max-w-4xl transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="bg-white rounded-[16px] border border-gray-200 shadow-2xl">
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 lg:gap-4">
            {/* Top section: Animation + Heading (side by side on mobile) */}
            <div className="flex items-center gap-2 lg:hidden w-full" dir="rtl">
              {/* Lottie Animation */}
              <div className="w-16 sm:w-20 flex-shrink-0 aspect-[8/5] -m-2">
                <DotLottieReact
                  src="/animations/cookie policy.lottie"
                  speed={1.5}
                  className="w-full h-full scale-90"
                  loop
                  autoplay
                />
              </div>

              {/* Heading */}
              <h3 className="text-base sm:text-lg font-bold text-peaceful-dawn">
                אנו מעריכים את הפרטיות שלכם
              </h3>
            </div>

            {/* Desktop Animation (hidden on mobile) */}
            <div className="hidden lg:block w-40 flex-shrink-0 aspect-[8/5]">
              <DotLottieReact
                src="/animations/cookie policy.lottie"
                speed={1.5}
                className="w-full h-full"
                loop
                autoplay
              />
            </div>

            {/* Content */}
            <div className="flex-1 text-right" dir="rtl">
              {/* Desktop Heading (hidden on mobile) */}
              <h3 className="hidden lg:block text-base sm:text-lg font-bold mb-2 text-peaceful-dawn">
                אנו מעריכים את הפרטיות שלכם
              </h3>

              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-2 sm:mb-3">
                אנו משתמשים בעוגיות לעזור להתאים תוכן, לנתח תנועה באתר ולספק
                חוויית משתמש טובה יותר. עוגיות חיוניות פעילות תמיד כברירת מחדל
                ועוזרות לאתר לתפקד כראוי.
              </p>
              <p className="text-xs text-gray-600">
                עיינו ב
                <Link
                  href="/privacy"
                  className="text-black font-semibold hover:underline mx-1"
                >
                  מדיניות הפרטיות
                </Link>
                וב
                <Link
                  href="/terms"
                  className="text-black font-semibold hover:underline mx-1"
                >
                  תנאי השימוש
                </Link>
                שלנו למידע מפורט.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-row lg:flex-col gap-2 lg:gap-4 w-full lg:w-auto pb-2 sm:pb-3">
              <button
                className="flex-1 lg:flex-none bg-black hover:bg-black/80 text-gray-50 px-3 py-2 lg:px-5 lg:py-3 rounded-[12px] font-bold text-[12px] lg:text-[14px] transition-all duration-200 text-center lg:min-w-[140px]"
                onClick={handleAcceptAll}
              >
                קבל הכל
              </button>
              <button
                className="flex-1 lg:flex-none bg-transparent hover:bg-gray-50 text-black border-1 border-gray-300 px-3 py-2 lg:px-5 lg:py-3 rounded-[12px] font-semibold text-[12px] lg:text-[14px] transition-all duration-200 text-center lg:min-w-[140px]"
                onClick={handleRejectAll}
              >
                דחה הכל
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiesBanner;
