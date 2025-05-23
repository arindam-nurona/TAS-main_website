"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, useAnimation, useInView } from "framer-motion"

export default function ModernHero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const heroRef = useRef(null)
  const isInView = useInView(heroRef, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
      setIsLoaded(true)
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden"
      ref={heroRef}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>
        <div className="floating-orb floating-orb-1"></div>
        <div className="floating-orb floating-orb-2"></div>
        <div className="floating-orb floating-orb-3"></div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      </div>

      <div className="container">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center rounded-full border border-border/50 bg-background/80 backdrop-blur-sm px-6 py-2 text-sm mb-8 relative overflow-hidden group"
            variants={itemVariants}
          >
            <span className="text-muted-foreground relative z-10">Revolutionizing Technical Hiring</span>
            <div className="mx-3 h-4 w-px bg-border"></div>
            <span className="text-primary font-medium relative z-10">2025</span>
            <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[0.9]"
            variants={itemVariants}
          >
            <span className="block mb-4">
              <span className="relative inline-block">
                <span className="relative z-10 text-gradient animate-gradient bg-gradient-to-r from-primary via-primary/80 to-primary">
                  Interview Smarter.
                </span>
                <span className="absolute bottom-2 left-0 w-full h-4 bg-primary/20 -z-10 transform skew-x-12 animate-pulse-subtle"></span>
              </span>
            </span>
            <span className="block">
              <span className="relative inline-block">
                <span className="relative z-10">Hire Faster.</span>
                <span
                  className="absolute bottom-2 left-0 w-full h-4 bg-primary/10 -z-10 transform -skew-x-12 animate-pulse-subtle"
                  style={{ animationDelay: "1s" }}
                ></span>
              </span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
            variants={itemVariants}
          >
            The AI-powered platform that revolutionizes your technical hiring process with
            <span className="text-primary font-medium"> automated screening</span> and
            <span className="text-primary font-medium"> unbiased evaluations</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center mb-16" variants={itemVariants}>
            <Button asChild variant="gradient" size="lg" className="rounded-full px-8 py-6 text-lg btn-modern group">
              <Link href="#contact" className="flex items-center">
                <span className="relative z-10">Get Your Demo</span>
                <ArrowRight className="relative z-10 ml-2 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-6 text-lg border-primary/20 hover:bg-primary/5 transition-all duration-300 group"
            >
              <Link href="#videos" className="flex items-center">
                <Play className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                <span>Watch Demo</span>
              </Link>
            </Button>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="relative max-w-4xl mx-auto"
            variants={itemVariants}
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{
              opacity: isLoaded ? 1 : 0,
              scale: isLoaded ? 1 : 0.9,
              y: isLoaded ? 0 : 40,
            }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 rounded-3xl blur-3xl opacity-50 animate-pulse-subtle"></div>

              {/* Main container */}
              <div className="relative bg-background/80 backdrop-blur-sm border border-primary/20 rounded-3xl p-4 shadow-2xl">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="/hero-image.svg"
                    alt="TalenDojo Platform Interface"
                    width={800}
                    height={500}
                    className="w-full h-auto"
                    priority
                    onLoad={() => setIsLoaded(true)}
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent"></div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -left-8 top-1/4 glass-card px-4 py-3 rounded-2xl shadow-lg"
                initial={{ opacity: 0, x: -30, rotate: -5 }}
                animate={{
                  opacity: isLoaded ? 1 : 0,
                  x: isLoaded ? 0 : -30,
                  rotate: isLoaded ? 0 : -5,
                }}
                transition={{ delay: 0.8, duration: 0.6 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <span className="text-sm font-medium">AI-Powered</span>
              </motion.div>

              <motion.div
                className="absolute -right-8 top-1/3 glass-card px-4 py-3 rounded-2xl shadow-lg"
                initial={{ opacity: 0, x: 30, rotate: 5 }}
                animate={{
                  opacity: isLoaded ? 1 : 0,
                  x: isLoaded ? 0 : 30,
                  rotate: isLoaded ? 0 : 5,
                }}
                transition={{ delay: 1, duration: 0.6 }}
                whileHover={{ scale: 1.05, rotate: -2 }}
              >
                <span className="text-sm font-medium">Unbiased</span>
              </motion.div>

              <motion.div
                className="absolute -left-12 bottom-1/4 glass-card px-4 py-3 rounded-2xl shadow-lg"
                initial={{ opacity: 0, x: -30, rotate: 3 }}
                animate={{
                  opacity: isLoaded ? 1 : 0,
                  x: isLoaded ? 0 : -30,
                  rotate: isLoaded ? 0 : 3,
                }}
                transition={{ delay: 1.2, duration: 0.6 }}
                whileHover={{ scale: 1.05, rotate: -3 }}
              >
                <span className="text-sm font-medium">Accurate</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
