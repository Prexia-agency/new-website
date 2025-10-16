'use client'

import { useRef, useImperativeHandle, forwardRef } from 'react'
import { gsap } from 'gsap'

export interface IconHandle {
  playHoverAnimation: () => void;
  playLeaveAnimation: () => void;
}

const PortalIcon = forwardRef<IconHandle>((props, ref) => {
  const page1Ref = useRef<SVGRectElement>(null)
  const page2Ref = useRef<SVGRectElement>(null)
  const article1Ref = useRef<SVGRectElement>(null)
  const article2Ref = useRef<SVGRectElement>(null)
  const article3Ref = useRef<SVGRectElement>(null)
  const article4Ref = useRef<SVGRectElement>(null)
  const titleRef = useRef<SVGRectElement>(null)
  const glowRef = useRef<SVGRectElement>(null)

  useImperativeHandle(ref, () => ({
    playHoverAnimation: () => {
      const page1 = page1Ref.current
      const page2 = page2Ref.current
      const articles1 = [article1Ref.current, article2Ref.current]
      const articles2 = [article3Ref.current, article4Ref.current]
      const title = titleRef.current
      const glow = glowRef.current
      const tl = gsap.timeline()
      
      // Pages open dramatically
      tl.to(page1, {
        rotation: -8,
        x: -3,
        stroke: '#007BFF',
        strokeWidth: 2.5,
        transformOrigin: 'right center',
        duration: 0.5,
        ease: 'power2.out'
      })
      .to(page2, {
        rotation: 8,
        x: 3,
        stroke: '#00D4FF',
        strokeWidth: 2.5,
        transformOrigin: 'left center',
        duration: 0.5,
        ease: 'power2.out'
      }, 0)
      
      // Background glow
      .fromTo(glow,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 0.3,
          scale: 1.2,
          duration: 0.5,
          ease: 'power2.out'
        },
        0
      )
      
      // Title appears on left page
      .fromTo(title,
        { opacity: 0, y: -5, scaleX: 0 },
        {
          opacity: 1,
          y: 0,
          scaleX: 1,
          duration: 0.4,
          ease: 'power2.out',
          transformOrigin: 'left center'
        },
        0.3
      )
      
      // Articles load on left page
      articles1.forEach((article, index) => {
        tl.fromTo(article,
          { opacity: 0, scaleX: 0 },
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.3,
            ease: 'power2.out',
            transformOrigin: 'left center'
          },
          0.5 + index * 0.15
        )
      })
      
      // Articles load on right page
      articles2.forEach((article, index) => {
        tl.fromTo(article,
          { opacity: 0, scaleX: 0 },
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.3,
            ease: 'power2.out',
            transformOrigin: 'left center'
          },
          0.5 + index * 0.15
        )
      })
    },
    playLeaveAnimation: () => {
      const page1 = page1Ref.current
      const page2 = page2Ref.current
      const articles = [article1Ref.current, article2Ref.current, article3Ref.current, article4Ref.current]
      const title = titleRef.current
      const glow = glowRef.current
      const tl = gsap.timeline()
      
      tl.to([page1, page2], {
        rotation: 0,
        x: 0,
        stroke: 'url(#portalGradient)',
        strokeWidth: 2,
        duration: 0.4,
        ease: 'power2.in'
      })
      
      tl.to([...articles, title], {
        opacity: 0,
        scaleX: 0,
        duration: 0.3,
        ease: 'power2.in'
      }, 0)
      
      tl.to(glow, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      }, 0)
    }
  }))

  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <defs>
        <linearGradient id="portalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#007BFF" />
          <stop offset="50%" stopColor="#00D4FF" />
          <stop offset="100%" stopColor="#8B00FF" />
        </linearGradient>
      </defs>

      {/* Background glow */}
      <rect
        ref={glowRef}
        x="8"
        y="10"
        width="24"
        height="20"
        rx="4"
        fill="url(#portalGradient)"
        opacity="0"
      />

      {/* Left Page */}
      <rect
        ref={page1Ref}
        x="6"
        y="8"
        width="14"
        height="24"
        rx="2"
        fill="none"
        stroke="url(#portalGradient)"
        strokeWidth="2"
      />

      {/* Right Page */}
      <rect
        ref={page2Ref}
        x="20"
        y="8"
        width="14"
        height="24"
        rx="2"
        fill="none"
        stroke="url(#portalGradient)"
        strokeWidth="2"
      />

      {/* Title on left page */}
      <rect
        ref={titleRef}
        x="8"
        y="11"
        width="10"
        height="2"
        rx="1"
        fill="url(#portalGradient)"
        opacity="0"
      />

      {/* Article snippets on left page */}
      <rect
        ref={article1Ref}
        x="8"
        y="16"
        width="9"
        height="1.5"
        rx="0.75"
        fill="url(#portalGradient)"
        opacity="0"
      />
      <rect
        ref={article2Ref}
        x="8"
        y="20"
        width="8"
        height="1.5"
        rx="0.75"
        fill="url(#portalGradient)"
        opacity="0"
      />

      {/* Article snippets on right page */}
      <rect
        ref={article3Ref}
        x="22"
        y="16"
        width="9"
        height="1.5"
        rx="0.75"
        fill="url(#portalGradient)"
        opacity="0"
      />
      <rect
        ref={article4Ref}
        x="22"
        y="20"
        width="8"
        height="1.5"
        rx="0.75"
        fill="url(#portalGradient)"
        opacity="0"
      />
    </svg>
  )
})

PortalIcon.displayName = 'PortalIcon'

export default PortalIcon
