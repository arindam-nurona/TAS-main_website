"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function BackgroundGrid() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-[-1] opacity-30 dark:opacity-20">
      <div
        className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.03] bg-[center_top_-1px] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"
        style={{
          backgroundSize: "40px 40px",
          backgroundImage: `linear-gradient(to right, ${theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} 1px, transparent 1px),
                            linear-gradient(to bottom, ${theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} 1px, transparent 1px)`,
        }}
      />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
    </div>
  )
}
