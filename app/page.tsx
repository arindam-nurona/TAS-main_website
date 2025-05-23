"use client"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ModernHero from "@/components/modern-hero"
import VideoShowcase from "@/components/video-showcase"
import WhyTalenDojo from "@/components/why-talendojo"
import BenefitsSection from "@/components/benefits-section"
import ContactSection from "@/components/contact-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <ModernHero />
      <VideoShowcase />
      <WhyTalenDojo />
      <BenefitsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
