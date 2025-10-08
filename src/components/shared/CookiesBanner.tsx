"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function CookiesBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already ACCEPTED cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (cookieConsent !== 'accepted') {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    // Don't save rejection - let them choose again if they come back
    localStorage.removeItem('cookieConsent');
    // Redirect user away from the site
    window.location.href = 'https://www.google.com';
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[80%] max-w-4xl">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl">
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 lg:gap-4">

            {/* Top section: Animation + Heading (side by side on mobile) */}
            <div className="flex items-center gap-3 lg:hidden w-full" dir="rtl">
              {/* Lottie Animation */}
              <div className="w-20 h-20 sm:w-18 sm:h-18 flex-shrink-0">
                <DotLottieReact
                  src="/animations/cookie policy.lottie"
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
            <div className="hidden lg:block w-40 h-25 flex-shrink-0">
              <DotLottieReact
                src="/animations/cookie policy.lottie"
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
                אנו משתמשים בעוגיות
                לעזור להתאים תוכן, לנתח תנועה באתר ולספק חוויית משתמש טובה יותר. עוגיות חיוניות
                פעילות תמיד כברירת מחדל ועוזרות לאתר לתפקד כראוי.
              </p>
              <p className="text-xs text-gray-600">
                עיינו ב
                <Link href="/privacy-policy" className="text-black font-semibold hover:underline mx-1">
                  מדיניות הפרטיות
                </Link>
                וב
                <Link href="/terms-of-use" className="text-black font-semibold hover:underline mx-1">
                  תנאי השימוש
                </Link>
                שלנו למידע מפורט.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-row lg:flex-col gap-2 sm:gap-3 lg:gap-4 w-full lg:w-auto pb-2 sm:pb-3">
              <button
                onClick={handleAcceptAll}
                className="flex-1 lg:flex-none bg-black hover:bg-black/80 text-white px-5 py-3 rounded-full font-bold text-[14px] transition-all duration-200 text-center lg:min-w-[140px]"
              >
                קבל הכל
              </button>
              <button
                onClick={handleRejectAll}
                className="flex-1 lg:flex-none bg-transparent hover:bg-gray-50 text-black border-1 border-gray-300 px-5 py-3 rounded-full font-semibold text-[14px] transition-all duration-200 text-center lg:min-w-[140px]"
              >
                דחה הכל
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 