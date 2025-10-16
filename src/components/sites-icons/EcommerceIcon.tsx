'use client'

import { useRef, useImperativeHandle, forwardRef } from 'react'
import { gsap } from 'gsap'

const EcommerceIcon = forwardRef((props, ref) => {
  const cartRef = useRef<SVGPathElement>(null)
  const wheel1Ref = useRef<SVGCircleElement>(null)
  const wheel2Ref = useRef<SVGCircleElement>(null)
  const item1Ref = useRef<SVGRectElement>(null)
  const item2Ref = useRef<SVGRectElement>(null)
  const item3Ref = useRef<SVGRectElement>(null)
  const coinRef = useRef<SVGCircleElement>(null)

  useImperativeHandle(ref, () => ({
    playHoverAnimation: () => {
      const cart = cartRef.current
      const wheel1 = wheel1Ref.current
      const wheel2 = wheel2Ref.current
      const items = [item1Ref.current, item2Ref.current, item3Ref.current]
      const coin = coinRef.current
      const tl = gsap.timeline()
      
      // Cart glows
      tl.to(cart, {
        stroke: '#FF00A8',
        strokeWidth: 2.5,
        filter: 'drop-shadow(0 0 10px rgba(255, 0, 168, 0.4))',
        duration: 0.3,
        ease: 'power2.out'
      })
      
      // Items drop into cart one by one
      items.forEach((item, index) => {
        tl.fromTo(item,
          { y: -15, opacity: 0, scale: 0.5 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'bounce.out'
          },
          0.2 + index * 0.2
        )
      })
      
      // Cart moves forward (reduced to avoid cropping)
      tl.to(cart, {
        x: 2,
        duration: 0.5,
        ease: 'power2.out'
      }, 0.8)
      
      // Wheels rotate
      tl.to([wheel1, wheel2], {
        rotation: 720,
        transformOrigin: 'center center',
        duration: 0.8,
        ease: 'power1.inOut'
      }, 0.8)
      
      // Coin sparkles and spins
      tl.fromTo(coin,
        { scale: 0, rotation: 0, opacity: 0 },
        {
          scale: 1.2,
          rotation: 360,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
          transformOrigin: 'center center'
        },
        1.2
      )
      .to(coin, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      })
    },
    playLeaveAnimation: () => {
      const cart = cartRef.current
      const wheel1 = wheel1Ref.current
      const wheel2 = wheel2Ref.current
      const items = [item1Ref.current, item2Ref.current, item3Ref.current]
      const tl = gsap.timeline()
      
      tl.to(cart, {
        x: 0,
        stroke: 'url(#ecommerceGradient)',
        strokeWidth: 2,
        filter: 'drop-shadow(0 0 0px rgba(255, 0, 168, 0))',
        duration: 0.4,
        ease: 'power2.in'
      })
      
      tl.to([wheel1, wheel2], {
        rotation: 0,
        duration: 0.3,
        ease: 'power2.in'
      }, 0)
      
      tl.to(items, {
        y: 0,
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        stagger: 0.05,
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
        <linearGradient id="ecommerceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF00A8" />
          <stop offset="50%" stopColor="#8B00FF" />
          <stop offset="100%" stopColor="#00D4FF" />
        </linearGradient>
      </defs>

      {/* Shopping Cart */}
      <path
        ref={cartRef}
        d="M8 8 L12 8 L16 28 L32 28 L35 15 L14 15"
        fill="none"
        stroke="url(#ecommerceGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Items in cart */}
      <rect ref={item1Ref} x="18" y="18" width="4" height="4" rx="1" fill="url(#ecommerceGradient)" opacity="0" />
      <rect ref={item2Ref} x="23" y="18" width="4" height="4" rx="1" fill="url(#ecommerceGradient)" opacity="0" />
      <rect ref={item3Ref} x="28" y="18" width="4" height="4" rx="1" fill="url(#ecommerceGradient)" opacity="0" />

      {/* Wheels */}
      <circle
        ref={wheel1Ref}
        cx="18"
        cy="32"
        r="2.5"
        fill="url(#ecommerceGradient)"
      />
      <circle
        ref={wheel2Ref}
        cx="28"
        cy="32"
        r="2.5"
        fill="url(#ecommerceGradient)"
      />

      {/* Dollar/Coin symbol */}
      <circle
        ref={coinRef}
        cx="32"
        cy="10"
        r="3"
        fill="none"
        stroke="#FFD700"
        strokeWidth="2"
        opacity="0"
      />
    </svg>
  )
})

EcommerceIcon.displayName = 'EcommerceIcon'

export default EcommerceIcon
