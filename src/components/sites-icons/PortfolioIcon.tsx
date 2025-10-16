'use client'

import { useRef, useImperativeHandle, forwardRef } from 'react'
import { gsap } from 'gsap'

const PortfolioIcon = forwardRef((props, ref) => {
  const frameRef = useRef<SVGRectElement>(null)
  const image1Ref = useRef<SVGRectElement>(null)
  const image2Ref = useRef<SVGRectElement>(null)
  const image3Ref = useRef<SVGRectElement>(null)
  const sparkle1Ref = useRef<SVGCircleElement>(null)
  const sparkle2Ref = useRef<SVGCircleElement>(null)
  const sparkle3Ref = useRef<SVGCircleElement>(null)

  useImperativeHandle(ref, () => ({
    playHoverAnimation: () => {
      const frame = frameRef.current
      const images = [image1Ref.current, image2Ref.current, image3Ref.current]
      const sparkles = [sparkle1Ref.current, sparkle2Ref.current, sparkle3Ref.current]
      const tl = gsap.timeline()
      
      // Frame glows and expands
      tl.to(frame, {
        stroke: '#FF00A8',
        strokeWidth: 3,
        scale: 1.05,
        filter: 'drop-shadow(0 0 12px rgba(255, 0, 168, 0.4))',
        duration: 0.4,
        ease: 'power2.out',
        transformOrigin: 'center center'
      })
      
      // Images scale and pop in sequence with rotation
      images.forEach((img, index) => {
        tl.to(img, {
          scale: 1.2,
          rotation: index % 2 === 0 ? 2 : -2,
          opacity: 1,
          duration: 0.3,
          ease: 'back.out(1.7)',
          transformOrigin: 'center center'
        }, index * 0.15)
      })
      
      // Sparkles appear and twinkle
      sparkles.forEach((sparkle, index) => {
        tl.fromTo(sparkle,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: 'back.out(2)',
            transformOrigin: 'center center'
          },
          0.3 + index * 0.1
        )
        .to(sparkle, {
          scale: 1.3,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out'
        }, '+=0.1')
      })
    },
    playLeaveAnimation: () => {
      const frame = frameRef.current
      const images = [image1Ref.current, image2Ref.current, image3Ref.current]
      const tl = gsap.timeline()
      
      // Reset frame
      tl.to(frame, {
        stroke: 'url(#portfolioGradient)',
        strokeWidth: 2,
        scale: 1,
        filter: 'drop-shadow(0 0 0px rgba(255, 0, 168, 0))',
        duration: 0.4,
        ease: 'power2.in'
      })
      
      // Reset images
      tl.to(images, {
        scale: 1,
        rotation: 0,
        opacity: 0.9,
        duration: 0.3,
        ease: 'power2.in',
        stagger: 0.05
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
        <linearGradient id="portfolioGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6A00" />
          <stop offset="50%" stopColor="#FF00A8" />
          <stop offset="100%" stopColor="#8B00FF" />
        </linearGradient>
      </defs>

      {/* Outer Frame */}
      <rect
        ref={frameRef}
        x="3"
        y="3"
        width="34"
        height="34"
        rx="6"
        fill="none"
        stroke="url(#portfolioGradient)"
        strokeWidth="2"
      />

      {/* Gallery Grid - 3 images */}
      <rect
        ref={image1Ref}
        x="7"
        y="7"
        width="26"
        height="10"
        rx="2"
        fill="url(#portfolioGradient)"
        opacity="0.9"
      />
      <rect
        ref={image2Ref}
        x="7"
        y="20"
        width="12"
        height="13"
        rx="2"
        fill="url(#portfolioGradient)"
        opacity="0.9"
      />
      <rect
        ref={image3Ref}
        x="21"
        y="20"
        width="12"
        height="13"
        rx="2"
        fill="url(#portfolioGradient)"
        opacity="0.9"
      />

      {/* Sparkles */}
      <circle
        ref={sparkle1Ref}
        cx="10"
        cy="10"
        r="1.5"
        fill="#FFD700"
        opacity="0"
      />
      <circle
        ref={sparkle2Ref}
        cx="30"
        cy="12"
        r="1.5"
        fill="#FFD700"
        opacity="0"
      />
      <circle
        ref={sparkle3Ref}
        cx="20"
        cy="30"
        r="1.5"
        fill="#FFD700"
        opacity="0"
      />
    </svg>
  )
})

PortfolioIcon.displayName = 'PortfolioIcon'

export default PortfolioIcon
