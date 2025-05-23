"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface FeatureSectionProps {
  title: string
  description: string
  children: React.ReactNode
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ title, description, children }) => {
  const { ref, inView: isInView } = useInView({ threshold: 0.2 })

  return (
    <section className="section-spacing relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div
          className="floating-orb w-80 h-80 bg-purple-500/10 top-1/3 left-1/4"
          style={{ animationDelay: "-5s" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/98 to-background"></div>
      </div>

      <div className="container" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-white">{title}</h2>
          <p className="text-gray-400">{description}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{children}</div>
      </div>
    </section>
  )
}

export default FeatureSection
