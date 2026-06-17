"use client"

import * as React from "react"

export function AmbientGlow() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="ambient-glow-container" aria-hidden="true">
      <div className="ambient-glow-frame" />
      <div className="ambient-glow ambient-glow-top" />
      <div className="ambient-glow ambient-glow-bottom" />
      <div className="ambient-glow ambient-glow-left" />
      <div className="ambient-glow ambient-glow-right" />
    </div>
  )
}
