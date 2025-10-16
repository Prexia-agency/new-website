'use client'

import { useRef, useImperativeHandle, forwardRef } from 'react'
import { gsap } from 'gsap'

export interface IconHandle {
  playHoverAnimation: () => void;
  playLeaveAnimation: () => void;
}

const BlogIcon = forwardRef<IconHandle>((props, ref) => {
  const phoneRef = useRef<SVGRectElement>(null)
  const message1Ref = useRef<SVGRectElement>(null)
  const message2Ref = useRef<SVGRectElement>(null)
  const message3Ref = useRef<SVGRectElement>(null)
  const dot1Ref = useRef<SVGCircleElement>(null)
  const dot2Ref = useRef<SVGCircleElement>(null)
  const dot3Ref = useRef<SVGCircleElement>(null)

  useImperativeHandle(ref, () => ({
    playHoverAnimation: () => {
      const phone = phoneRef.current
      const messages = [message1Ref.current, message2Ref.current, message3Ref.current]
      const dots = [dot1Ref.current, dot2Ref.current, dot3Ref.current]
      const tl = gsap.timeline()
      
      // Phone lifts up and glows (reduced movement to avoid cropping)
      tl.to(phone, {
        y: -1,
        scale: 1.03,
        stroke: '#8B00FF',
        strokeWidth: 2.5,
        filter: 'drop-shadow(0 6px 12px rgba(139, 0, 255, 0.3))',
        duration: 0.4,
        ease: 'power2.out',
        transformOrigin: 'center center'
      })
      
      // Messages appear one by one like a conversation
      messages.forEach((message, index) => {
        // Message slides in from right and fades in
        tl.fromTo(message,
          { x: 10, opacity: 0, scale: 0.8 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'back.out(1.5)',
            transformOrigin: 'center center'
          },
          0.3 + index * 0.25
        )
        
        // Typing dots appear briefly before each message
        if (index < dots.length) {
          tl.to(dots.slice(0, index + 1), {
            opacity: 1,
            scale: 1,
            duration: 0.2,
            stagger: 0.1,
            ease: 'power2.out'
          }, 0.2 + index * 0.25)
          .to(dots.slice(0, index + 1), {
            opacity: 0,
            duration: 0.2,
          }, 0.35 + index * 0.25)
        }
      })
    },
    playLeaveAnimation: () => {
      const phone = phoneRef.current
      const messages = [message1Ref.current, message2Ref.current, message3Ref.current]
      const dots = [dot1Ref.current, dot2Ref.current, dot3Ref.current]
      const tl = gsap.timeline()
      
      tl.to(phone, {
        y: 0,
        scale: 1,
        stroke: 'url(#blogGradient)',
        strokeWidth: 2,
        filter: 'drop-shadow(0 0 0px rgba(139, 0, 255, 0))',
        duration: 0.4,
        ease: 'power2.in'
      })
      
      tl.to(messages, {
        x: 10,
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power2.in'
      }, 0)
      
      tl.to(dots, {
        opacity: 0,
        scale: 0,
        duration: 0.2
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
        <linearGradient id="blogGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B00FF" />
          <stop offset="50%" stopColor="#007BFF" />
          <stop offset="100%" stopColor="#00D4FF" />
        </linearGradient>
      </defs>

      {/* Phone Frame */}
      <rect
        ref={phoneRef}
        x="10"
        y="4"
        width="20"
        height="32"
        rx="3"
        fill="none"
        stroke="url(#blogGradient)"
        strokeWidth="2"
      />

      {/* Screen top bar */}
      <line x1="13" y1="8" x2="27" y2="8" stroke="url(#blogGradient)" strokeWidth="1" opacity="0.5" />

      {/* Message Bubbles */}
      <rect
        ref={message1Ref}
        x="13"
        y="12"
        width="11"
        height="4"
        rx="2"
        fill="url(#blogGradient)"
        opacity="0"
      />
      <rect
        ref={message2Ref}
        x="13"
        y="18"
        width="13"
        height="4"
        rx="2"
        fill="url(#blogGradient)"
        opacity="0"
      />
      <rect
        ref={message3Ref}
        x="13"
        y="24"
        width="9"
        height="4"
        rx="2"
        fill="url(#blogGradient)"
        opacity="0"
      />

      {/* Typing dots (appear before messages) */}
      <circle ref={dot1Ref} cx="15" cy="30" r="0.8" fill="url(#blogGradient)" opacity="0" />
      <circle ref={dot2Ref} cx="17.5" cy="30" r="0.8" fill="url(#blogGradient)" opacity="0" />
      <circle ref={dot3Ref} cx="20" cy="30" r="0.8" fill="url(#blogGradient)" opacity="0" />
    </svg>
  )
})

BlogIcon.displayName = 'BlogIcon'

export default BlogIcon
