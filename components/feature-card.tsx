"use client"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  number: string
  title: string
  description: string
}

export default function FeatureCard({ number, title, description }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative p-8 rounded-2xl border border-zinc-800 transition-all duration-300 overflow-hidden",
        isHovered ? "bg-zinc-900" : "bg-zinc-900/50",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute -top-2 -right-2 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-all duration-500"></div>

      <div className="relative z-10">
        <span className="text-zinc-600 text-5xl font-bold absolute -top-2 -left-1 group-hover:text-zinc-700 transition-colors">
          {number}
        </span>

        <h3 className="text-xl font-bold mb-3 mt-4">{title}</h3>
        <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors">{description}</p>
      </div>
    </div>
  )
}
