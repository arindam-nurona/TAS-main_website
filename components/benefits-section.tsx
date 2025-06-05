'use client';

import type React from 'react';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const benefits = [
	{
		title: 'Reduce Time-to-Hire by 60%',
		description:
			'Automate early-stage technical screening and interviews to dramatically speed up your hiring process.',
		icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
	},
	{
		title: 'Improve Candidate Quality',
		description:
			'Evaluate candidates based on actual skills and problem-solving abilities, not just resume keywords.',
		icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
	},
	{
		title: 'Eliminate Hiring Bias',
		description:
			'Our AI evaluates candidates objectively, focusing solely on technical abilities and communication skills.',
		icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
	},
	{
		title: 'Scale Your Hiring Process',
		description:
			"Screen 10x more candidates without increasing your recruiting team's workload.",
		icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
	},
];

export default function BenefitsSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, threshold: 0.2 });

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
						Key Benefits
					</motion.div>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
					>
						Transform your
						<span className="text-gradient ml-2">technical hiring</span>
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="text-xl text-muted-foreground"
					>
						Join forward-thinking companies that are already saving time and making better
						hiring decisions
					</motion.p>
				</div>

				<div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
					{benefits.map((benefit, index) => (
						<BenefitCard
							key={index}
							title={benefit.title}
							description={benefit.description}
							icon={benefit.icon}
							index={index}
						/>
					))}
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
						<Link href="#contact" className="flex items-center">
							<span className="relative z-10">Get Your Personalized Demo</span>
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

function BenefitCard({
	title,
	description,
	icon,
	index,
}: {
	title: string;
	description: string;
	icon: React.ReactNode;
	index: number;
}) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 30 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
			transition={{
				duration: 0.6,
				delay: index * 0.1,
				ease: [0.22, 1, 0.36, 1],
			}}
			className="glass-card rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:bg-primary/5 group"
		>
			<div className="flex items-start gap-4">
				<div className="mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
					{icon}
				</div>
				<div>
					<h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
						{title}
					</h3>
					<p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
						{description}
					</p>
				</div>
			</div>
		</motion.div>
	);
}
