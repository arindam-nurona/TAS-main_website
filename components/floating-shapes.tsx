"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface Shape {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  rotation: number
  type: "circle" | "square" | "triangle"
}

export default function FloatingShapes() {
  const [shapes, setShapes] = useState<Shape[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Generate random shapes
    const newShapes: Shape[] = []
    const shapeTypes: ("circle" | "square" | "triangle")[] = ["circle", "square", "triangle"]

    for (let i = 0; i < 6; i++) {
      newShapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 40 + 20,
        opacity: Math.random() * 0.2 + 0.05,
        rotation: Math.random() * 360,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
      })
    }

    setShapes(newShapes)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className={cn(
            "absolute blur-xl",
            shape.type === "circle" && "rounded-full",
            shape.type === "square" && "rounded-md",
            shape.type === "triangle" && "triangle",
          )}
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            opacity: shape.opacity,
            transform: `rotate(${shape.rotation}deg)`,
            background: `linear-gradient(45deg, var(--primary) 0%, transparent 100%)`,
            animation: `float-${shape.id} ${10 + shape.id * 2}s ease-in-out infinite alternate`,
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes float-0 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(20px, 20px) rotate(10deg); }
        }
        @keyframes float-1 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-20px, 10px) rotate(-10deg); }
        }
        @keyframes float-2 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(15px, -15px) rotate(5deg); }
        }
        @keyframes float-3 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-15px, -10px) rotate(-5deg); }
        }
        @keyframes float-4 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(10px, 15px) rotate(15deg); }
        }
        @keyframes float-5 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-10px, -20px) rotate(-15deg); }
        }
        .triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
      `}</style>
    </div>
  )
}
