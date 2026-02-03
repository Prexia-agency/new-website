'use client';

import styles from './featuredWork.module.css';
import ProjectItem, { type FeaturedProject } from './ProjectItem';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export type FeaturedWorkGalleryProps = {
  heading?: string;
  projects?: FeaturedProject[];
  className?: string;
};

const defaultProjects: FeaturedProject[] = [
  { title1: 'Portfolio', title2: 'Kinigma', src: 'P-KINIGMA.png' },
  { title1: 'Kindergarden', title2: 'Sagit', src: 'sagit.png' },
  { title1: 'Line', title2: 'Proof', src: 'ED.png' },
  { title1: 'Nothing', title2: 'Design Studio', src: 'nothing_design_studio.png' },
  { title1: 'Mambo', title2: 'Mambo', src: 'mambo_mambo.jpeg' },
];

export default function FeaturedWorkGallery({
  heading = 'what we already did in 2026',
  projects = defaultProjects,
  className,
}: FeaturedWorkGalleryProps) {
  const bottomBorderRef = useRef(null);
  const isBottomBorderInView = useInView(bottomBorderRef, { once: true, amount: 0.3 });

  return (
    <main className={[styles.main, className].filter(Boolean).join(' ')}>
      <div className={styles.gallery}>
        <p className={styles.heading}>{heading}</p>
        {projects.map((project, idx) => (
          <ProjectItem key={`${idx}-${project.title1}-${project.title2}`} project={project} />
        ))}
        
        {/* Animated bottom border */}
        <div ref={bottomBorderRef} className={styles.bottomBorderContainer}>
          <motion.div
            className={styles.bottomBorder}
            initial={{ scaleX: 0 }}
            animate={isBottomBorderInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
          />
        </div>
      </div>
    </main>
  );
}


