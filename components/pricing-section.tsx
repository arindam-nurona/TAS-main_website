'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, BadgePercent } from 'lucide-react';
import ContactForm from '@/components/contact-form';

const bullets = [
	'$99/month for up to 5 active jobs',
	'Unlimited candidates/applicants (no per-candidate fees)',
	'AI-powered ATS + interviewer in one workspace',
	'No setup fees. Cancel anytime.',
];

export default function PricingSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.2 });

	return (
		<section id="pricing" className="section-spacing relative overflow-hidden">
			<div className="absolute inset-0 -z-10">
				<div className="absolute inset-0 bg-dot-pattern opacity-30"></div>
				<div className="absolute inset-0 bg-gradient-to-b from-background via-background/98 to-background"></div>
				<div
					className="floating-orb w-80 h-80 bg-primary/10 top-1/3 right-1/4"
					style={{ animationDelay: '-4s' }}
				></div>
				<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
				<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
			</div>

			<div className="container" ref={ref}>
				<div className="max-w-3xl mx-auto mb-16 text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
						transition={{ duration: 0.6 }}
						className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
					>
						Simple, Usage-Based Pricing
					</motion.div>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
					>
						Pay for jobs, not seats
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="text-xl text-muted-foreground"
					>
						Start with 5 active roles for $99/month — first 2 months free. No credit card
						required.
					</motion.p>
				</div>

				<div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto items-start">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
						transition={{ duration: 0.6 }}
						className="glass-card rounded-2xl border border-primary/20 p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300"
					>
						<div className="flex items-start justify-between gap-6 mb-8">
							<div>
								<div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
									<BadgePercent className="h-4 w-4" />
									Promo offer
								</div>
								<h3 className="text-2xl font-bold">Talmyra Suite</h3>
								<p className="text-muted-foreground mt-2">
									Perfect for lean teams getting started with AI recruiting.
								</p>
							</div>
							<div className="text-right">
								<div className="text-4xl font-bold">
									$99
									<span className="text-base font-medium text-muted-foreground">/mo</span>
								</div>
								<div className="text-sm text-muted-foreground mt-1">
									Up to 5 active jobs
								</div>
							</div>
						</div>

						<ul className="space-y-4 mb-8">
							{bullets.map((b) => (
								<li key={b} className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
									<span className="text-muted-foreground">{b}</span>
								</li>
							))}
						</ul>

						<div className="rounded-xl border border-border/50 bg-background/40 p-5">
							<p className="text-sm text-muted-foreground">
								Need more jobs? Contact us for customized, high-volume pricing by signing
								up for a demo.
							</p>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
						transition={{ duration: 0.6 }}
						className="glass-card rounded-2xl border border-primary/20 p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300"
					>
						<ContactForm />
					</motion.div>
				</div>
			</div>
		</section>
	);
}
