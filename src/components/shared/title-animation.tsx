"use client";

import { motion, useAnimation } from "framer-motion";
import React from "react";

import { AuroraText } from "@/components/ui/aurora-text";
import { WordRotate } from "@/components/ui/word-rotate";

interface TitleItem {
  value: string;
  color?: string;
  className?: string;
  useAurora?: boolean;
  auroraColors?: string[];
  useWordRotate?: boolean;
  rotateWords?: string[];
  rotateDuration?: number;
}

interface TitleAnimationProps {
  tag: keyof React.JSX.IntrinsicElements;
  className: string;
  items: TitleItem[];
  animationName: string;
  controls: ReturnType<typeof useAnimation>;
}

const TitleAnimation: React.FC<TitleAnimationProps> = ({
  tag,
  className,
  items,
  controls,
}) => {
  const Tag = tag as React.ElementType;
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate={controls}
      variants={containerVariants}
    >
      <Tag className={className}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.useWordRotate ? (
              <motion.span
                variants={itemVariants}
                className="inline-flex items-center mr-2"
                style={{ verticalAlign: "baseline" }}
              >
                <WordRotate
                  words={item.rotateWords || [item.value]}
                  duration={item.rotateDuration || 3000}
                  className="inline-block align-baseline"
                  motionProps={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: -20 },
                    transition: { duration: 0.3, ease: "easeOut" as const },
                  }}
                />
              </motion.span>
            ) : (
              <motion.span
                variants={itemVariants}
                style={{
                  color: item.className ? "inherit" : item.color || "inherit",
                }}
                className={`inline-block mr-2 ${item.useAurora ? "" : item.className || ""}`}
              >
                {item.useAurora ? (
                  <AuroraText colors={item.auroraColors} speed={1.2}>
                    {item.value}
                  </AuroraText>
                ) : (
                  item.value
                )}
              </motion.span>
            )}
          </React.Fragment>
        ))}
      </Tag>
    </motion.div>
  );
};

export default TitleAnimation;
