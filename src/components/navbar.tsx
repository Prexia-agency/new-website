'use client'

import Image from 'next/image';
import Link from 'next/link';
import DrawLink from './DrawLink';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOverDark, setIsOverDark] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    if (!isHomePage) {
      setIsOverDark(false);
      return;
    }

    const handleScroll = () => {
      const navbar = document.querySelector('nav.hidden.lg\\:block');
      if (!navbar) return;

      const navbarRect = navbar.getBoundingClientRect();
      const navbarCenter = navbarRect.top + navbarRect.height / 2;

      // Check if navbar is over Hero or Stack sections
      const heroSection = document.querySelector('.hidden.lg\\:block[data-section="hero"]');
      const stackSection = document.querySelector('[data-section="stack"]');

      let overDark = false;

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

      setIsOverDark(overDark);
    };

    handleScroll(); // Check initial position
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const textColor = isOverDark ? 'text-white hover:text-gray-200' : 'text-gray-800 hover:text-gray-600';

  return (
    <nav 
      className="hidden lg:block fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[500px]"
      dir="rtl"
    >
      <div className="bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl py-0 pl-2 pr-2 w-full">
        <div className="flex items-center justify-between gap-4">
          {/* Logo - Far Right */}
          <Link href="/" className="flex-shrink-0 pr-2">
            <Image
              src="/images/LOGO-AK.png"
              alt="AK Agency Logo"
              width={60}
              height={60}
              className="w-12 h-12"
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
          <Link
            href="/contact"
            className="gradient-bg hover:opacity-90 text-white px-5 py-3 rounded-full font-medium text-sm transition-all duration-200 hover:shadow-xl flex items-center gap-2 flex-shrink-0"
          >
            <span className="font-medium text-xs text-white">
              דבר איתנו
            </span>
            <svg
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
}