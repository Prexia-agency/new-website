'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function AnimatedCalculator() {
  const calculatorRef = useRef<SVGSVGElement>(null)
  const displayTextRef = useRef<SVGTextElement>(null)

  useEffect(() => {
    if (!calculatorRef.current || !displayTextRef.current) return

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 })

    // Realistic button press sequences with multiple buttons
    const buttonSequences = [
      { buttons: [10], result: '2,500' },    // Press 2
      { buttons: [6], result: '5,000' },      // Press 5
      { buttons: [1], result: '7,500' },      // Press 7
      { buttons: [9, 13], result: '10,000' }, // Press 1, 0
      { buttons: [9, 6], result: '₪15,000' } // Press 1, 5
    ]

    // Helper function to animate button press with glow
    const pressButton = (buttonId: number, timeline: gsap.core.Timeline) => {
      const btnSelector = `#calc-btn-${buttonId}`
      const rectSelector = `#calc-btn-${buttonId} rect`
      
      timeline
        .to(btnSelector, {
          scale: 0.92,
          duration: 0.08,
          transformOrigin: 'center center',
          ease: 'power2.in'
        })
        .to(rectSelector, {
          filter: 'brightness(1.5) drop-shadow(0 0 8px rgba(255,255,255,0.6))',
          duration: 0.08
        }, '<')
        .to(btnSelector, {
          scale: 1,
          duration: 0.15,
          ease: 'elastic.out(1.5, 0.3)'
        })
        .to(rectSelector, {
          filter: 'brightness(1) drop-shadow(0 0 0px rgba(255,255,255,0))',
          duration: 0.15
        }, '<')
    }

    // Initial pause
    tl.to({}, { duration: 0.5 })

    // Animate through each sequence
    buttonSequences.forEach((sequence, index) => {
      // Press buttons in sequence
      sequence.buttons.forEach((btnId, btnIndex) => {
        pressButton(btnId, tl)
        if (btnIndex < sequence.buttons.length - 1) {
          tl.to({}, { duration: 0.1 })
        }
      })

      // Display border glow effect
      tl.to('#calc-display', {
        strokeWidth: 3,
        filter: 'drop-shadow(0 0 12px rgba(0,255,136,0.6))',
        duration: 0.2,
        ease: 'power2.out'
      })

      // Scale and fade out text with rotation
      tl.to(displayTextRef.current, {
        scale: 0.8,
        opacity: 0,
        y: -5,
        duration: 0.25,
        ease: 'power2.in',
        transformOrigin: 'center center'
      })

      // Change text
      tl.call(() => {
        if (displayTextRef.current) {
          displayTextRef.current.textContent = sequence.result
        }
      })

      // Scale and fade in text
      tl.to(displayTextRef.current, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: 'back.out(1.7)'
      })

      // Reset display border
      tl.to('#calc-display', {
        strokeWidth: 2,
        filter: 'drop-shadow(0 0 0px rgba(0,255,136,0))',
        duration: 0.3,
        ease: 'power2.in'
      }, '-=0.2')

      // Pause between calculations
      tl.to({}, { duration: 0.5 })
    })

    // Grand finale - celebration animation
    tl.to('#calc-display', {
      fill: 'url(#displayGradient)',
      strokeWidth: 4,
      duration: 0.4,
      ease: 'power2.inOut'
    })
    
    // Text color change to match golden display
    .to(displayTextRef.current, {
      fill: '#FFFFFF',
      duration: 0.4,
      ease: 'power2.inOut'
    }, '<')
    
    // Pulse animation
    .to('#calc-display', {
      scale: 1.08,
      duration: 0.4,
      transformOrigin: 'center center',
      ease: 'power2.inOut',
      yoyo: true,
      repeat: 2
    })
    
    // Rotate calculator body slightly
    .to(calculatorRef.current, {
      rotation: 2,
      duration: 0.3,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: 1,
      transformOrigin: 'center center'
    }, '-=0.8')
    
    // All buttons light up in sequence
    .to('[id^="calc-btn-"] rect', {
      filter: 'brightness(1.3)',
      duration: 0.15,
      stagger: {
        each: 0.03,
        from: 'start',
        ease: 'power2.out'
      }
    })
    .to('[id^="calc-btn-"] rect', {
      filter: 'brightness(1)',
      duration: 0.3
    })
    
    // Reset display for loop
    .to('#calc-display', {
      fill: '#1A1A1A',
      strokeWidth: 2,
      scale: 1,
      duration: 0.4,
      ease: 'power2.inOut'
    })
    .to(displayTextRef.current, {
      fill: '#00FF88',
      duration: 0.4,
      ease: 'power2.inOut'
    }, '<')
    .call(() => {
      if (displayTextRef.current) {
        displayTextRef.current.textContent = '0'
      }
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <svg
      ref={calculatorRef}
      width="180"
      height="234"
      viewBox="0 0 200 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0 mx-auto"
    >
      <defs>
        {/* Gradient definitions */}
        <linearGradient id="calcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6A00" />
          <stop offset="25%" stopColor="#FF00A8" />
          <stop offset="50%" stopColor="#8B00FF" />
          <stop offset="75%" stopColor="#007BFF" />
          <stop offset="100%" stopColor="#00D4FF" />
        </linearGradient>
        <linearGradient id="displayGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFD700">
            <animate attributeName="offset" values="0%;0.3%;0%" dur="2s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#FFA500">
            <animate attributeName="offset" values="100%;70%;100%" dur="2s" repeatCount="indefinite" />
          </stop>
        </linearGradient>

        {/* Enhanced shadow filter */}
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15"/>
        </filter>
        
        {/* Glow filter for special effects */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Calculator Body */}
      <rect
        x="10"
        y="10"
        width="180"
        height="240"
        rx="20"
        fill="url(#calcGradient)"
        filter="url(#shadow)"
      />

      {/* Inner body */}
      <rect
        x="18"
        y="18"
        width="164"
        height="224"
        rx="16"
        fill="#2A2A2A"
      />

      {/* Display Screen */}
      <rect
        id="calc-display"
        x="30"
        y="30"
        width="140"
        height="50"
        rx="8"
        fill="#1A1A1A"
        stroke="url(#calcGradient)"
        strokeWidth="2"
      />

      {/* Display Text */}
      <text
        ref={displayTextRef}
        x="100"
        y="60"
        textAnchor="middle"
        fill="#00FF88"
        fontSize="20"
        fontFamily="monospace"
        fontWeight="bold"
      >
        0
      </text>

      {/* Calculator Buttons Grid (4x4) */}
      {/* Row 1 */}
      <g id="calc-btn-1">
        <rect x="30" y="95" width="30" height="30" rx="6" fill="#3A3A3A" />
        <text x="45" y="113" textAnchor="middle" dominantBaseline="middle" fill="#FFFFFF" fontSize="16" fontWeight="600">7</text>
      </g>
      <g id="calc-btn-2">
        <rect x="68" y="95" width="30" height="30" rx="6" fill="#3A3A3A" />
        <text x="83" y="113" textAnchor="middle" dominantBaseline="middle" fill="#FFFFFF" fontSize="16" fontWeight="600">8</text>
      </g>
      <g id="calc-btn-3">
        <rect x="106" y="95" width="30" height="30" rx="6" fill="#3A3A3A" />
        <text x="121" y="113" textAnchor="middle" dominantBaseline="middle" fill="#FFFFFF" fontSize="16" fontWeight="600">9</text>
      </g>
      <g id="calc-btn-4">
        <rect x="144" y="95" width="26" height="30" rx="6" fill="#FF6A00" />
        <text x="157" y="113" textAnchor="middle" dominantBaseline="middle" fill="#FFFFFF" fontSize="18" fontWeight="700">÷</text>
      </g>

      {/* Row 2 */}
      <g id="calc-btn-5">
        <rect x="30" y="133" width="30" height="30" rx="6" fill="#3A3A3A" />
        <text x="45" y="151" textAnchor="middle" dominantBaseline="middle" fill="#FFFFFF" fontSize="16" fontWeight="600">4</text>
      </g>
      <g id="calc-btn-6">
        <rect x="68" y="133" width="30" height="30" rx="6" fill="#3A3A3A" />
        <text x="83" y="151" textAnchor="middle" dominantBaseline="middle" fill="#FFFFFF" fontSize="16" fontWeight="600">5</text>
      </g>
      <g id="calc-btn-7">
        <rect x="106" y="133" width="30" height="30" rx="6" fill="#3A3A3A" />
        <text x="121" y="151" textAnchor="middle" dominantBaseline="middle" fill="#FFFFFF" fontSize="16" fontWeight="600">6</text>
      </g>
      <g id="calc-btn-8">
        <rect x="144" y="133" width="26" height="30" rx="6" fill="#FF00A8" />
        <text x="157" y="151" textAnchor="middle" dominantBaseline="middle" fill="#FFFFFF" fontSize="18" fontWeight="700">×</text>
      </g>

      {/* Row 3 */}
      <g id="calc-btn-9">
        <rect x="30" y="171" width="30" height="30" rx="6" fill="#3A3A3A" />
        <text x="45" y="189" textAnchor="middle" dominantBaseline="middle" fill="#FFFFFF" fontSize="16" fontWeight="600">1</text>
      </g>
      <g id="calc-btn-10">
        <rect x="68" y="171" width="30" height="30" rx="6" fill="#3A3A3A" />
        <text x="83" y="189" textAnchor="middle" dominantBaseline="middle" fill="#FFFFFF" fontSize="16" fontWeight="600">2</text>
      </g>
      <g id="calc-btn-11">
        <rect x="106" y="171" width="30" height="30" rx="6" fill="#3A3A3A" />
        <text x="121" y="189" textAnchor="middle" dominantBaseline="middle" fill="#FFFFFF" fontSize="16" fontWeight="600">3</text>
      </g>
      <g id="calc-btn-12">
        <rect x="144" y="171" width="26" height="30" rx="6" fill="#8B00FF" />
        <text x="157" y="189" textAnchor="middle" dominantBaseline="middle" fill="#FFFFFF" fontSize="18" fontWeight="700">-</text>
      </g>

      {/* Row 4 */}
      <g id="calc-btn-13">
        <rect x="30" y="209" width="30" height="30" rx="6" fill="#3A3A3A" />
        <text x="45" y="227" textAnchor="middle" dominantBaseline="middle" fill="#FFFFFF" fontSize="16" fontWeight="600">0</text>
      </g>
      <g id="calc-btn-14">
        <rect x="68" y="209" width="30" height="30" rx="6" fill="#3A3A3A" />
        <text x="83" y="227" textAnchor="middle" dominantBaseline="middle" fill="#FFFFFF" fontSize="16" fontWeight="600">.</text>
      </g>
      <g id="calc-btn-15">
        <rect x="106" y="209" width="26" height="30" rx="6" fill="#007BFF" />
        <text x="119" y="227" textAnchor="middle" dominantBaseline="middle" fill="#FFFFFF" fontSize="18" fontWeight="700">=</text>
      </g>
      <g id="calc-btn-16">
        <rect x="140" y="209" width="30" height="30" rx="6" fill="#00D4FF" />
        <text x="155" y="227" textAnchor="middle" dominantBaseline="middle" fill="#FFFFFF" fontSize="18" fontWeight="700">+</text>
      </g>
    </svg>
  )
}