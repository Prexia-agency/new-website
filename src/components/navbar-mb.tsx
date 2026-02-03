"use client";

import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const NavbarMobile = () => {
  const navRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Initialize the timeline in a paused state to prevent auto-play on mount
    tlRef.current = gsap.timeline({
      defaults: { duration: 1, ease: "expo.inOut" },
      paused: true,
    });

    if (navRef.current && closeRef.current && hamburgerRef.current) {
      tlRef.current
        .to(hamburgerRef.current, { opacity: 0, pointerEvents: "none" }, 0)
        .to(
          navRef.current,
          {
            right: 0,
            borderWidth: "1px",
            borderStyle: "solid",
            borderImage:
              "linear-gradient(135deg, rgba(255, 106, 0, 0.2) 0%, rgba(139, 0, 255, 0.2) 50%, rgba(0, 212, 255, 0.2) 100%) 1",
            borderRadius: "12px",
          },
          0,
        )
        .to(
          navRef.current,
          {
            height: "100vh",
            top: 0,
            transform: "translateY(0)",
            borderWidth: "0px",
            borderRadius: "0px",
          },
          "-=.1",
        )
        .to(
          linksRef.current.filter(Boolean),
          {
            opacity: 1,
            pointerEvents: "all",
            stagger: 0.2,
          },
          "-=.8",
        )
        .to(closeRef.current, { opacity: 1, pointerEvents: "all" }, "-=.8");
    }
  }, []);

  const handleOpen = () => {
    if (tlRef.current) {
      if (tlRef.current.reversed()) {
        tlRef.current.play();
      } else {
        tlRef.current.restart();
      }
    }
  };

  const handleClose = () => {
    if (tlRef.current) {
      tlRef.current.reverse();
    }
  };

  return (
    <>
      {/* Mobile Navbar Bar with Backdrop Blur */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between px-5 py-3">
          {/* Logo on Left Side */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/LOGO-AK.png"
              alt="AK Agency Logo"
              width={48}
              height={48}
              className="w-12 h-12"
            />
          </Link>

          {/* Menu Button Container - holds both hamburger and close */}
          <div className="relative w-[18px] h-[18px]">
            {/* Hamburger Menu Button with Gradient */}
            <div
              ref={hamburgerRef}
              className="cursor-pointer w-[18px] h-[12px] absolute top-[3px]"
              role="button"
              tabIndex={0}
              aria-label="פתח תפריט"
              onClick={handleOpen}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleOpen();
              }}
            >
              <div className="relative w-full h-full">
                <div className="absolute w-[18px] h-[2.4px] gradient-bg rounded"></div>
                <div className="absolute w-[18px] h-[2.4px] gradient-bg rounded top-[5.4px]"></div>
                <div className="absolute w-[18px] h-[2.4px] gradient-bg rounded top-[10.8px]"></div>
              </div>
            </div>

            {/* Close Button - Takes place of hamburger when menu is open */}
            <div
              ref={closeRef}
              className="cursor-pointer w-[18px] h-[18px] opacity-0 pointer-events-none absolute top-0"
              role="button"
              tabIndex={0}
              aria-label="סגור תפריט"
              onClick={handleClose}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleClose();
              }}
            >
              <div className="relative w-full h-full">
                <div
                  className="absolute w-[18px] h-[2.4px] gradient-bg rounded transition-colors duration-500"
                  style={{
                    transform: "rotate(-45deg)",
                    top: "50%",
                    left: "0",
                    marginTop: "-1.2px",
                  }}
                ></div>
                <div
                  className="absolute w-[18px] h-[2.4px] gradient-bg rounded transition-colors duration-500"
                  style={{
                    transform: "rotate(45deg)",
                    top: "50%",
                    left: "0",
                    marginTop: "-1.2px",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Menu */}
      <nav
        ref={navRef}
        className="lg:hidden fixed w-full h-[30px] bg-white flex justify-center items-center z-40"
        style={{ right: "-200vw", top: "50%", transform: "translateY(-50%)" }}
        dir="rtl"
      >
        {/* Navigation Links */}
        <ul className="list-none">
          <li className="my-[50px]">
            <Link
              href="/"
              ref={(el) => {
                linksRef.current[0] = el;
              }}
              className="text-black text-3xl font-medium relative opacity-0 pointer-events-none inline-block after:content-[''] after:w-full after:absolute after:h-[3px] after:rounded-[5px] after:bg-black after:bottom-[-10px] after:left-0 after:origin-left after:transition-transform after:duration-500 after:ease-out after:scale-x-0 hover:after:scale-x-100"
              onClick={handleClose}
            >
              בית
            </Link>
          </li>
          <li className="my-[50px]">
            <Link
              href="/pricing"
              ref={(el) => {
                linksRef.current[1] = el;
              }}
              className="text-black text-3xl font-medium relative opacity-0 pointer-events-none inline-block after:content-[''] after:w-full after:absolute after:h-[3px] after:rounded-[5px] after:bg-black after:bottom-[-10px] after:left-0 after:origin-left after:transition-transform after:duration-500 after:ease-out after:scale-x-0 hover:after:scale-x-100"
              onClick={handleClose}
            >
              מחירון
            </Link>
          </li>
          <li className="my-[50px]">
            <Link
              href="/contact"
              ref={(el) => {
                linksRef.current[2] = el;
              }}
              className="gradient-text text-3xl font-medium relative opacity-0 pointer-events-none inline-block after:content-[''] after:w-full after:absolute after:h-[3px] after:rounded-[5px] after:bg-gradient-to-r after:from-[#FF6A00] after:via-[#8B00FF] after:to-[#00D4FF] after:bottom-[-10px] after:left-0 after:origin-left after:transition-transform after:duration-500 after:ease-out after:scale-x-0 hover:after:scale-x-100"
              onClick={handleClose}
            >
              צור קשר
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavbarMobile;
