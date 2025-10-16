'use client'

import { useRef, useImperativeHandle, forwardRef } from 'react'
import { gsap } from 'gsap'

export interface IconHandle {
  playHoverAnimation: () => void;
  playLeaveAnimation: () => void;
}

const SaasIcon = forwardRef<IconHandle>((props, ref) => {
  const windowRef = useRef<SVGRectElement>(null)
  const bar1Ref = useRef<SVGRectElement>(null)
  const bar2Ref = useRef<SVGRectElement>(null)
  const bar3Ref = useRef<SVGRectElement>(null)
  const graph1Ref = useRef<SVGPathElement>(null)
  const graph2Ref = useRef<SVGPathElement>(null)
  const dot1Ref = useRef<SVGCircleElement>(null)
  const dot2Ref = useRef<SVGCircleElement>(null)
  const dot3Ref = useRef<SVGCircleElement>(null)
  const notifRef = useRef<SVGCircleElement>(null)

  useImperativeHandle(ref, () => ({
    playHoverAnimation: () => {
      const windowEl = windowRef.current
      const bars = [bar1Ref.current, bar2Ref.current, bar3Ref.current]
      const graphs = [graph1Ref.current, graph2Ref.current]
      const dots = [dot1Ref.current, dot2Ref.current, dot3Ref.current]
      const notif = notifRef.current
      const tl = gsap.timeline()
      
      // Window glows and scales
      tl.to(windowEl, {
        stroke: '#8B00FF',
        strokeWidth: 2.5,
        scale: 1.05,
        filter: 'drop-shadow(0 0 12px rgba(139, 0, 255, 0.4))',
        duration: 0.4,
        ease: 'power2.out',
        transformOrigin: 'center center'
      })
      
      // Top bar dots pulse
      tl.to(dots, {
        scale: 1.5,
        opacity: 1,
        duration: 0.3,
        stagger: 0.1,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1
      }, 0.2)
      
      // Data bars grow with stagger effect
      bars.forEach((bar, index) => {
        tl.fromTo(bar,
          { scaleY: 0, transformOrigin: 'bottom center' },
          {
            scaleY: [0, 1.8, 1.5, 1.6, 1.5],
            duration: 0.8,
            ease: 'power2.out'
          },
          0.3 + index * 0.15
        )
      })
      
      // Graph lines draw in
      graphs.forEach((graph, index) => {
        tl.fromTo(graph,
          { strokeDashoffset: 50, opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out'
          },
          0.6 + index * 0.2
        )
      })
      
      // Notification badge pops in
      tl.fromTo(notif,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: 'back.out(2.5)',
          transformOrigin: 'center center'
        },
        1.2
      )
      .to(notif, {
        scale: 1.2,
        duration: 0.2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: 2
      })
    },
    playLeaveAnimation: () => {
      const windowEl = windowRef.current
      const bars = [bar1Ref.current, bar2Ref.current, bar3Ref.current]
      const graphs = [graph1Ref.current, graph2Ref.current]
      const dots = [dot1Ref.current, dot2Ref.current, dot3Ref.current]
      const notif = notifRef.current
      const tl = gsap.timeline()
      
      tl.to(windowEl, {
        stroke: 'url(#saasGradient)',
        strokeWidth: 2,
        scale: 1,
        filter: 'drop-shadow(0 0 0px rgba(139, 0, 255, 0))',
        duration: 0.4,
        ease: 'power2.in'
      })
      
      tl.to(bars, {
        scaleY: 1,
        duration: 0.3,
        ease: 'power2.in',
        stagger: 0.05
      }, 0)
      
      tl.to(graphs, {
        strokeDashoffset: 50,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      }, 0)
      
      tl.to(dots, {
        scale: 1,
        duration: 0.2
      }, 0)
      
      tl.to(notif, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
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
        <linearGradient id="saasGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B00FF" />
          <stop offset="50%" stopColor="#FF00A8" />
          <stop offset="100%" stopColor="#FF6A00" />
        </linearGradient>
      </defs>

      {/* Dashboard Window */}
      <rect
        ref={windowRef}
        x="4"
        y="8"
        width="32"
        height="26"
        rx="3"
        fill="none"
        stroke="url(#saasGradient)"
        strokeWidth="2"
      />

      {/* Top bar dots */}
      <circle ref={dot1Ref} cx="8" cy="12" r="1.5" fill="url(#saasGradient)" />
      <circle ref={dot2Ref} cx="13" cy="12" r="1.5" fill="url(#saasGradient)" />
      <circle ref={dot3Ref} cx="18" cy="12" r="1.5" fill="url(#saasGradient)" />

      {/* Dashboard bars/charts */}
      <rect
        ref={bar1Ref}
        x="10"
        y="20"
        width="5"
        height="10"
        rx="1"
        fill="url(#saasGradient)"
      />
      <rect
        ref={bar2Ref}
        x="18"
        y="16"
        width="5"
        height="14"
        rx="1"
        fill="url(#saasGradient)"
      />
      <rect
        ref={bar3Ref}
        x="26"
        y="22"
        width="5"
        height="8"
        rx="1"
        fill="url(#saasGradient)"
      />

      {/* Graph lines */}
      <path
        ref={graph1Ref}
        d="M 8 26 L 12 22 L 16 24 L 20 18"
        stroke="url(#saasGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="50"
        strokeDashoffset="50"
        opacity="0"
      />
      <path
        ref={graph2Ref}
        d="M 22 28 L 26 24 L 30 26 L 32 22"
        stroke="url(#saasGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="50"
        strokeDashoffset="50"
        opacity="0"
      />

      {/* Notification badge */}
      <circle
        ref={notifRef}
        cx="33"
        cy="10"
        r="2.5"
        fill="#FF00A8"
        opacity="0"
      />
    </svg>
  )
})

SaasIcon.displayName = 'SaasIcon'

export default SaasIcon
