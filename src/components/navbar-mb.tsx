import Image from 'next/image';
import Link from 'next/link';
import { HyperText } from '@/components/magicui/hyper-text';

export default function NavbarMobile() {
  return (
    <nav 
      className="lg:hidden fixed top-3 left-1/2 transform -translate-x-1/2 z-50 py-3"
      dir="rtl"
    >
      <div className="bg-white/95 backdrop-blur-md rounded-full border border-gray-300/90 shadow-lg px-9 py-0.5">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 ml-0">
            <Image
              src="/images/LOGO-AK.png"
              alt="AK Agency Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-5">
            <Link 
              href="/"
              className="text-gray-800 hover:text-gray-600 transition-colors duration-200"
            >
              <HyperText
                className="font-medium text-[10px] py-0"
                duration={600}
                animateOnHover={true}
                as="span"
              >
                בית
              </HyperText>
            </Link>
            <Link 
              href="/pricing"
              className="text-gray-800 hover:text-gray-600 transition-colors duration-200"
            >
              <HyperText
                className="font-medium text-[10px] py-0"
                duration={600}
                animateOnHover={true}
                as="span"
              >
                מחירון
              </HyperText>
            </Link>
          </div>

          {/* Contact Button */}
          <Link
            href="/contact"
            className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-0.5 rounded-full font-medium text-[10px] transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center gap-3"
          >
            <HyperText
              className="font-medium text-[9px] py-0 text-white"
              duration={600}
              animateOnHover={true}
              as="span"
            >
              צור קשר
            </HyperText>
            <svg
              width="12"
              height="12"
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