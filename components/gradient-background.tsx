"use client"

import { useEffect, useRef } from "react"

export default function GradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let mouseX = 0
    let mouseY = 0
    let time = 0

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth
      mouseY = e.clientY / window.innerHeight
    }

    const drawGradient = () => {
      time += 0.001

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient
      const gradient1 = ctx.createRadialGradient(
        canvas.width * (0.3 + mouseX * 0.1),
        canvas.height * (0.3 + mouseY * 0.1),
        0,
        canvas.width * (0.3 + mouseX * 0.1),
        canvas.height * (0.3 + mouseY * 0.1),
        canvas.width * 0.6,
      )

      gradient1.addColorStop(0, `rgba(20, 184, 166, ${0.03 + Math.sin(time) * 0.01})`) // teal-500
      gradient1.addColorStop(0.5, "rgba(20, 184, 166, 0)")
      gradient1.addColorStop(1, "rgba(20, 184, 166, 0)")

      const gradient2 = ctx.createRadialGradient(
        canvas.width * (0.7 - mouseX * 0.1),
        canvas.height * (0.7 - mouseY * 0.1),
        0,
        canvas.width * (0.7 - mouseX * 0.1),
        canvas.height * (0.7 - mouseY * 0.1),
        canvas.width * 0.6,
      )

      gradient2.addColorStop(0, `rgba(16, 185, 129, ${0.03 + Math.cos(time) * 0.01})`) // emerald-500
      gradient2.addColorStop(0.5, "rgba(16, 185, 129, 0)")
      gradient2.addColorStop(1, "rgba(16, 185, 129, 0)")

      // Fill with gradient
      ctx.fillStyle = gradient1
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationFrameId = requestAnimationFrame(drawGradient)
    }

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)
    resizeCanvas()
    drawGradient()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-70" />
}
