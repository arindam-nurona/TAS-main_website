'use client';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import ModernHero from '@/components/modern-hero';
import VideoShowcase from '@/components/video-showcase';
import WhyTalmyra from '@/components/why-talendojo';
import BenefitsSection from '@/components/benefits-section';
import PricingSection from '@/components/pricing-section';

export default function Home() {
	return (
		<div className="min-h-screen bg-background text-foreground">
			<Navbar />
			<ModernHero />
			<VideoShowcase />
			<BenefitsSection />
			<WhyTalmyra />
			<PricingSection />
			<Footer />
		</div>
	);
}
