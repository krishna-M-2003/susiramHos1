"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

export function HashScrollHandler() {
  const pathname = usePathname()

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const handleHashScroll = () => {
      const hash = window.location.hash
      if (hash) {
        const elementId = hash.substring(1)
        
        // Slight timeout delay to ensure lazy-loaded modules are mounted
        setTimeout(() => {
          const el = document.getElementById(elementId)
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        }, 150)
      }
    }

    // Process hash scroll on initial mount and pathname transitions
    handleHashScroll()

    window.addEventListener("hashchange", handleHashScroll)
    return () => {
      window.removeEventListener("hashchange", handleHashScroll)
    }
  }, [pathname])

  return null
}
