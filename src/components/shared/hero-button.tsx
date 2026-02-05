"use client";

import clsx from "clsx";
import Link from "next/link";

type HeroButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
  ariaLabel?: string;
};

export const HeroButton = ({
  href,
  children,
  variant = "solid",
  className,
  ariaLabel,
}: HeroButtonProps) => {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm md:text-base font-noto-hebrew transition-colors duration-200";

  const variants = {
    solid: "bg-white text-black hover:bg-white/70",
    ghost:
      "bg-[#bababa99] sm:bg-[#bababa33] border border-[#bababa99] sm:border-[#bababa33] text-foreground hover:bg-[#bababaaa] sm:hover:bg-[#bababa66]",
  } as const;

  // Safe variant access with ternary guard
  const variantClass = variant === "solid" ? variants.solid : variants.ghost;

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={clsx(base, variantClass, className)}
    >
      {children}
    </Link>
  );
};
