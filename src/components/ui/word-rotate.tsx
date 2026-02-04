"use client";

import { AnimatePresence, motion, MotionProps } from "motion/react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface WordRotateProps {
  words: string[];
  duration?: number;
  motionProps?: MotionProps;
  className?: string;
}

export const WordRotate = ({
  words,
  duration = 2500,
  motionProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: "easeOut" },
  },
  className,
}: WordRotateProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <div className="overflow-hidden inline-block align-baseline">
      <AnimatePresence mode="wait">
        {(() => {
          // Safe array access with bounds check
          // eslint-disable-next-line security/detect-object-injection
          const currentWord =
            index >= 0 && index < words.length ? words[index] : words[0];
          return (
            <motion.span
              key={currentWord}
              className={cn("inline-block", className)}
              {...motionProps}
            >
              {currentWord}
            </motion.span>
          );
        })()}
      </AnimatePresence>
    </div>
  );
};
