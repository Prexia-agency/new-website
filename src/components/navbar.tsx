import Image from 'next/image';
import Link from 'next/link';
import DrawLink from './DrawLink';

export default function Navbar() {
  return (
    <nav 
      className="hidden lg:block fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
      dir="rtl"
    >
      <div className="bg-white/95 backdrop-blur-md rounded-full border border-gray-300/90 shadow-lg px-2 py-0">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/LOGO-AK.png"
              alt="AK Agency Logo"
              width={60}
              height={60}
              className="w-12 h-12"
            />
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <DrawLink 
              href="/"
              className="text-gray-800 hover:text-gray-600 transition-colors duration-200 font-medium text-sm"
            >
              עמוד הבית
            </DrawLink>
            <DrawLink 
              href="/pricing"
              className="text-gray-800 hover:text-gray-600 transition-colors duration-200 font-medium text-sm"
            >
              המחירון שלנו
            </DrawLink>
          </div>

          {/* Contact Button */}
          <Link
            href="/contact"
            className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-3 rounded-full font-medium text-sm transition-all duration-200 hover:shadow-xl flex items-center gap-2"
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