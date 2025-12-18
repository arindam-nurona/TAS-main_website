'use client';

import type React from 'react';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
	ArrowRight,
	Clock,
	TrendingUp,
	Star,
	ClipboardCheck,
	Target,
	FileText,
	Mail,
	Shield,
	Mic,
	Zap,
	Brain,
	Eye,
	BarChart,
	FileBarChart,
	Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const atsFeatures = [
	{
		title: 'Faster time-to-fill',
		description: 'Reduce time-to-hire by up to 60%',
		icon: Clock,
	},
	{
		title: 'Higher recruiter productivity',
		description: '3x recruiter efficiency with automation',
		icon: TrendingUp,
	},
	{
		title: 'Better candidate quality',
		description: 'AI-powered candidate matching',
		icon: Star,
	},
	{
		title: 'Reduced screening workload',
		description: 'Automated resume screening',
		icon: ClipboardCheck,
	},
	{
		title: 'Stronger submittals and win-rate',
		description: 'Data-driven candidate insights',
		icon: Target,
	},
	{
		title: 'Applicant tracking',
		description: 'Complete candidate pipeline management',
		icon: FileText,
	},
	{
		title: 'Outreach',
		description: 'Automated candidate engagement',
		icon: Mail,
	},
	{
		title: 'Resume integrity check',
		description: 'AI-powered resume verification',
		icon: Shield,
	},
];

const interviewFeatures = [
	{
		title: 'Smart AI voice interview',
		description: 'Natural conversation AI interviews',
		icon: Mic,
	},
	{
		title: 'Whole interview pipeline automated',
		description: 'End-to-end interview automation',
		icon: Zap,
	},
	{
		title: 'AI evaluation',
		description: 'Objective skill assessment',
		icon: Brain,
	},
	{
		title: 'Proctoring',
		description: 'Advanced fraud detection',
		icon: Eye,
	},
	{
		title: 'Scale',
		description: 'Interview unlimited candidates simultaneously',
		icon: TrendingUp,
	},
	{
		title: 'Real-time analytics',
		description: 'Instant candidate performance insights',
		icon: BarChart,
	},
	{
		title: 'Hiring manager report',
		description: 'Detailed candidate evaluation reports',
		icon: FileBarChart,
	},
	{
		title: 'Customizable assessments',
		description: 'Tailored interview questions',
		icon: Settings,
	},
];

export default function BenefitsSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.2 });

	return (
		<section id="benefits" className="section-spacing relative overflow-hidden">
			<div className="absolute inset-0 -z-10">
				<div className="absolute inset-0 bg-dot-pattern opacity-30"></div>
				<div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background"></div>
				<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
				<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
			</div>

			{/* Animated background shapes */}
			<div className="absolute inset-0 -z-10 overflow-hidden">
				<div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-primary/5 animate-float blur-3xl"></div>
				<div
					className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-primary/10 animate-float blur-3xl"
					style={{ animationDelay: '-3s' }}
				></div>
			</div>

			<div ref={ref} className="container relative">
				<div className="max-w-3xl mx-auto mb-16 text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
						transition={{ duration: 0.6 }}
						className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
					>
						Platform Features
					</motion.div>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
					>
						Powerful tools for
						<span className="text-gradient ml-2">modern hiring</span>
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="text-xl text-muted-foreground"
					>
						Everything you need to streamline your recruitment process from start to
						finish
					</motion.p>
				</div>

				<div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
					<FeatureCard
						title="ATS"
						description="Complete applicant tracking system to manage your entire recruitment pipeline"
						features={atsFeatures}
						index={0}
					/>
					<FeatureCard
						title="Interviewer"
						description="AI-powered interview platform that automates candidate assessment and evaluation"
						features={interviewFeatures}
						index={1}
					/>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					transition={{ duration: 0.6, delay: 0.8 }}
					className="mt-16 text-center"
				>
					<Button
						asChild
						variant="gradient"
						size="lg"
						className="rounded-full px-8 btn-modern group relative overflow-hidden"
					>
						<Link href="#pricing" className="flex items-center">
							<span className="relative z-10">Get your Free Trial</span>
							<ArrowRight className="relative z-10 ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
							<span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 rounded-full"></span>
						</Link>
					</Button>

					<p className="mt-4 text-sm text-muted-foreground">
						No credit card required. See how Talmyra can transform your hiring process.
					</p>
				</motion.div>
			</div>
		</section>
	);
}

function FeatureCard({
	title,
	description,
	features,
	index,
}: {
	title: string;
	description: string;
	features: Array<{
		title: string;
		description: string;
		icon: React.ComponentType<{ className?: string }>;
	}>;
	index: number;
}) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
			animate={
				isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index === 0 ? -20 : 20 }
			}
			transition={{
				duration: 0.6,
				ease: [0.22, 1, 0.36, 1],
			}}
			className="glass-card rounded-2xl border border-primary/20 p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300"
		>
			<div className="mb-8">
				<h3 className="text-2xl font-bold mb-2">{title}</h3>
				<p className="text-muted-foreground">{description}</p>
			</div>

			<div className="space-y-0">
				{features.map((feature, featureIndex) => {
					const IconComponent = feature.icon;
					return (
						<div key={featureIndex}>
							<div className="flex items-start gap-4 py-4 group">
								<div className="mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
									<IconComponent className="h-5 w-5 text-primary" />
								</div>
								<div className="flex-1 min-w-0">
									<h4 className="text-base font-semibold mb-1 group-hover:text-primary transition-colors duration-300">
										{feature.title}
									</h4>
									<p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
										{feature.description}
									</p>
								</div>
							</div>
							{featureIndex < features.length - 1 && (
								<div className="border-b border-border/50"></div>
							)}
						</div>
					);
				})}
			</div>
		</motion.div>
	);
}
