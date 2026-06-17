"use client"

import { useState, useEffect } from "react"

export function useScroll(threshold = 20) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    // Run check on mount
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [threshold])

  return scrolled
}
