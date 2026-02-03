"use client";

import { motion, type Variants, useInView } from "framer-motion";
import { useState, useRef } from "react";

import styles from "./projectItem.module.css";

export type FeaturedProject = {
  title1: string;
  title2: string;
  /** Filename inside /public/images */
  src: string;
};

const anim: Variants = {
  initial: { width: 0 },
  open: {
    width: "auto",
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] as const },
  },
  closed: { width: 0 },
};

const borderAnim: Variants = {
  initial: { scaleX: 0 },
  animate: {
    scaleX: 1,
    transition: { duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.1 },
  },
};

const ProjectItem = ({ project }: { project: FeaturedProject }) => {
  const [isActive, setIsActive] = useState(false);
  const { title1, title2, src } = project;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div
      ref={ref}
      className={styles.project}
      role="button"
      tabIndex={0}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setIsActive(!isActive);
        }
      }}
    >
      {/* Animated border top */}
      <motion.div
        className={styles.borderTop}
        variants={borderAnim}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
      />

      <p>{title1}</p>

      <motion.div
        className={styles.imgContainer}
        variants={anim}
        initial="initial"
        animate={isActive ? "open" : "closed"}
      >
        <img
          className={styles.img}
          src={`/images/${src}`}
          alt={`${title1} ${title2}`}
        />
      </motion.div>

      <p>{title2}</p>
    </div>
  );
};

export default ProjectItem;
