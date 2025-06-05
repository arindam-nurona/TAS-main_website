'use client';

import type React from 'react';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const features = [
	{
		title: 'Save Time & Resources',
		description:
			'Automate technical screening, coding tests, and phone interviews to reduce recruiter workload by up to 80%.',
		icon: (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="text-primary"
			>
				<path
					d="M12 8V12L15 15"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
	},
	{
		title: 'Unbiased Evaluations',
		description:
			'Get objective assessments based on real coding ability and communication skills, not just keywords on resumes.',
		icon: (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="text-primary"
			>
				<path
					d="M2 12H22"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M12 2V22"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M20 16L16 20"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M4 8L8 4"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M16 4L20 8"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M8 20L4 16"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
	},
	{
		title: 'Scale Effortlessly',
		description:
			"Screen 10x more candidates without increasing your hiring team's workload. Perfect for high-growth companies.",
		icon: (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="text-primary"
			>
				<path
					d="M21 16V8.00002C20.9996 7.6493 20.9071 7.30483 20.7315 7.00119C20.556 6.69754 20.3037 6.44539 20 6.27002L13 2.27002C12.696 2.09449 12.3511 2.00208 12 2.00208C11.6489 2.00208 11.304 2.09449 11 2.27002L4 6.27002C3.69626 6.44539 3.44398 6.69754 3.26846 7.00119C3.09294 7.30483 3.00036 7.6493 3 8.00002V16C3.00036 16.3508 3.09294 16.6952 3.26846 16.9989C3.44398 17.3025 3.69626 17.5547 4 17.73L11 21.73C11.304 21.9056 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9056 13 21.73L20 17.73C20.3037 17.5547 20.556 17.3025 20.7315 16.9989C20.9071 16.6952 20.9996 16.3508 21 16Z"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M3.27002 6.96002L12 12.01L20.73 6.96002"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M12 22.08V12"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
	},
	{
		title: 'Better Candidate Experience',
		description:
			'Deliver flexible, anytime interviews with instant feedback, creating a positive impression of your company.',
		icon: (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="text-primary"
			>
				<path
					d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
	},
];

export default function WhyTalmyra() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, threshold: 0.2 });

	return (
		<section id="features" className="section-spacing relative overflow-hidden">
			{/* Background elements */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
				<div className="absolute inset-0 bg-gradient-to-b from-background via-background/98 to-background"></div>
				<div
					className="floating-orb w-80 h-80 bg-purple-500/10 top-1/3 left-1/4"
					style={{ animationDelay: '-5s' }}
				></div>
			</div>

			<div className="container" ref={ref}>
				<div className="text-center mb-16">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
						transition={{ duration: 0.6 }}
						className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
					>
						Why Talmyra?
					</motion.div>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
					>
						The platform we wish we had,
						<br />
						<span className="text-gradient">so we built it for you</span>
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="text-xl text-muted-foreground max-w-2xl mx-auto"
					>
						Designed to transform your technical hiring process from start to finish
					</motion.p>
				</div>

				<div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
					{features.map((feature, index) => (
						<FeatureCard
							key={index}
							title={feature.title}
							description={feature.description}
							icon={feature.icon}
							index={index}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

function FeatureCard({
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
				delay: index * 0.2,
				ease: [0.22, 1, 0.36, 1],
			}}
			className="group"
		>
			<div className="flex items-start gap-6 p-6 rounded-xl border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all duration-300">
				<div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center transition-all duration-500 group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-6">
					{icon}
				</div>
				<div>
					<h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
						{title}
					</h3>
					<p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
						{description}
					</p>
				</div>
			</div>
		</motion.div>
	);
}
