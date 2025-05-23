"use client"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface FeatureItemProps {
  number: string
  title: string
  description: string
  align: "left" | "right"
}

export default function FeatureItem({ number, title, description, align }: FeatureItemProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.2,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        "grid md:grid-cols-2 gap-12 items-center transition-all duration-1000",
        align === "left" ? "md:text-left" : "md:text-right",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
      )}
    >
      <div className={cn(align === "right" && "md:order-last")}>
        <div className="relative">
          <span className="text-zinc-800 text-8xl font-bold absolute -top-10 -left-4">{number}</span>
          <h3 className="text-3xl font-bold mb-6 relative">{title}</h3>
          <p className="text-xl text-zinc-400 leading-relaxed">{description}</p>
        </div>
      </div>

      <div className={cn("relative h-80 rounded-3xl overflow-hidden", align === "left" && "md:order-first")}>
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-emerald-500/5 backdrop-blur-3xl"></div>
        <div className="absolute inset-0 border border-zinc-800/50 rounded-3xl"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-teal-500/20 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-teal-500/40 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-teal-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
