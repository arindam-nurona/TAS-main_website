"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export default function AnimatedHero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 md:mb-10 leading-[1.1]">
        <div className="mb-4 md:mb-6">
          <span className="inline-block relative">
            <span className="relative z-10 text-primary">Interview Smarter.</span>
            <span className="absolute bottom-2 left-0 w-full h-3 bg-primary/20 -z-10 transform skew-x-12"></span>
          </span>
        </div>
        <div className="mb-4 md:mb-6">
          <span className="inline-block relative">
            <span className="relative z-10">Hire Faster.</span>
            <span className="absolute bottom-2 left-0 w-full h-3 bg-primary/10 -z-10 transform -skew-x-12"></span>
          </span>
        </div>
        <div className={cn("transition-all duration-1000", isVisible ? "opacity-100" : "opacity-0")}>
          <span className="inline-block relative">
            <span className="relative z-10">Transform Your Hiring</span>
            <span className="absolute bottom-2 left-0 w-full h-3 bg-primary/20 -z-10 transform skew-x-12"></span>
          </span>
        </div>
      </h1>
    </motion.div>
  )
}
