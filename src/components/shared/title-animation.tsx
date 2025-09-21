"use client"

import { motion, AnimationControls } from 'framer-motion';
import React from 'react';

interface TitleItem {
  value: string;
  color?: string;
  className?: string;
}

interface TitleAnimationProps {
  tag: keyof JSX.IntrinsicElements;
  className: string;
  items: TitleItem[];
  animationName: string;
  controls: AnimationControls;
}

const TitleAnimation: React.FC<TitleAnimationProps> = ({
  tag: Tag,
  className,
  items,
  controls,
}) => {
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
        ease: "easeOut",
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
          <motion.span
            key={index}
            variants={itemVariants}
            style={{ color: item.className ? 'inherit' : (item.color || 'inherit') }}
            className={`inline-block mr-2 ${item.className || ''}`}
          >
            {item.value}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
};

export default TitleAnimation;