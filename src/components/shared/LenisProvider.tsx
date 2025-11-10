"use client"

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // ככל שגדול יותר, הגלילה איטית וחלקה יותר
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // תחושת ריחוף
      wheelMultiplier: 0.7, // מפחית את כמות הגלילה בכל תזוזת גלגל (ברירת מחדל: 1)
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}

