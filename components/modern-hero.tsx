'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
	ArrowRight,
	Play,
	Zap,
	Target,
	TrendingUp,
	Shield,
	Clock,
	Globe,
	BarChart3,
	Users,
	Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';

// Hero image configuration with bubbles positioned strictly on borders/outside
const heroConfig = [
	{
		id: 3,
		image: '/hero-image-3.webp',
		alt: 'AI Voice Interview Interface',
		title: 'AI Voice Interview',
		subtitle: 'AI-powered natural conversation-based interviews',
		badges: ['Voice Recognition', 'Real-time Analysis', 'Natural Flow'],
		bubbles: [
			{
				id: 1,
				text: 'Human-like Conversation',
				position: { x: '-10%', y: '15%' },
				delay: 0.3,
				color: 'secondary',
				icon: Users,
			},
			{
				id: 2,
				text: 'Smart Follow-up Questions',
				position: { x: '92%', y: '50%' },
				delay: 0.5,
				color: 'primary',
				icon: Target,
			},
			{
				id: 3,
				text: 'Personalized Voice Selection',
				position: { x: '-8%', y: '75%' },
				delay: 0.7,
				color: 'accent',
				icon: Globe,
			},
		],
		icon: Target,
	},
	{
		id: 4,
		image: '/hero-image-4.webp',
		alt: 'Voice Interview Results and Full Trace',
		title: 'Interview Results & Trace',
		subtitle: 'Complete interview analysis with full conversation trace',
		badges: ['Full Transcript', 'Performance Analysis', 'Detailed Feedback'],
		bubbles: [
			{
				id: 1,
				text: 'Complete Transcript',
				position: { x: '-5%', y: '10%' },
				delay: 0.2,
				color: 'primary',
				icon: BarChart3,
			},
			{
				id: 3,
				text: 'Detailed Performance Analysis',
				position: { x: '92%', y: '74%' },
				delay: 0.6,
				color: 'accent',
				icon: Award,
			},
		],
		icon: TrendingUp,
	},
	{
		id: 1,
		image: '/hero-image-1.webp',
		alt: 'AI Resume Analysis Dashboard',
		title: 'AI Resume Analysis',
		subtitle: 'Intelligent resume screening and evaluation',
		badges: ['Smart Parsing', 'Skills Extraction', 'Compatibility Score'],
		bubbles: [
			{
				id: 1,
				text: 'Smart Resume Parsing',
				position: { x: '-8%', y: '10%' },
				delay: 0.7,
				color: 'success',
				icon: Clock,
			},
			{
				id: 2,
				text: 'Skills Matching',
				position: { x: '92%', y: '60%' },
				delay: 0.2,
				color: 'primary',
				icon: BarChart3,
			},
			{
				id: 3,
				text: 'AI Compatibility Score',
				position: { x: '-8%', y: '80%' },
				delay: 0.6,
				color: 'accent',
				icon: Zap,
			},
		],
		icon: Zap,
	},
	{
		id: 2,
		image: '/hero-image-2.webp',
		alt: 'Advanced Coding Assessment Platform',
		title: 'Advanced Coding Assessment',
		subtitle: 'AI-powered hints generated in real-time',
		badges: ['Real-time AI Hints', 'Multi-Language', 'Plagiarism Detection'],
		bubbles: [
			{
				id: 1,
				text: 'Code Quality Analysis',
				position: { x: '-5%', y: '10%' },
				delay: 0.2,
				color: 'primary',
				icon: BarChart3,
			},
			{
				id: 2,
				text: 'AI-Generated Hints',
				position: { x: '92%', y: '30%' },
				delay: 0.4,
				color: 'success',
				icon: Zap,
			},
		],
		icon: TrendingUp,
	},
];

// Enhanced bubble variants with more prominence
const bubbleVariants = {
	primary:
		'bg-white/80 dark:bg-slate-900/60 backdrop-blur-md text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-600/40 shadow-xl shadow-primary/15 dark:shadow-primary/25',
	success:
		'bg-white/80 dark:bg-slate-900/60 backdrop-blur-md text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-600/40 shadow-xl shadow-emerald-500/15 dark:shadow-emerald-500/25',
	accent:
		'bg-white/80 dark:bg-slate-900/60 backdrop-blur-md text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-600/40 shadow-xl shadow-violet-500/15 dark:shadow-violet-500/25',
	secondary:
		'bg-white/80 dark:bg-slate-900/60 backdrop-blur-md text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-600/40 shadow-xl shadow-blue-500/15 dark:shadow-blue-500/25',
};

export default function ModernHero() {
	const [isLoaded, setIsLoaded] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);
	const heroRef = useRef(null);
	const isInView = useInView(heroRef, { once: true });
	const controls = useAnimation();

	useEffect(() => {
		if (isInView) {
			controls.start('visible');
			setIsLoaded(true);
		}
	}, [isInView, controls]);

	// Auto-rotate images
	useEffect(() => {
		if (!isAutoPlaying) return;

		const interval = setInterval(() => {
			setCurrentImageIndex((prev) => (prev + 1) % heroConfig.length);
		}, 5000); // Change every 5 seconds

		return () => clearInterval(interval);
	}, [isAutoPlaying]);

	const handleImageSelect = (index: number) => {
		setCurrentImageIndex(index);
		setIsAutoPlaying(false);
		// Resume auto-play after 10 seconds
		setTimeout(() => setIsAutoPlaying(true), 10000);
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15,
				delayChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
		},
	};

	const currentConfig = heroConfig[currentImageIndex];

	return (
		<section
			className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden"
			ref={heroRef}
		>
			{/* Animated background elements */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
				<div className="floating-orb floating-orb-1"></div>
				<div className="floating-orb floating-orb-2"></div>
				<div className="floating-orb floating-orb-3"></div>

				{/* Gradient overlays */}
				<div className="absolute inset-0 bg-gradient-to-b from-background via-background/98 to-background"></div>
				<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
			</div>

			<div className="container">
				<motion.div
					className="max-w-6xl mx-auto text-center"
					variants={containerVariants}
					initial="hidden"
					animate={controls}
				>
					{/* Badge */}
					<motion.div
						className="inline-flex items-center rounded-full border border-border/40 bg-background/90 backdrop-blur-sm px-6 py-2 text-sm mb-8 relative overflow-hidden group shadow-sm"
						variants={itemVariants}
					>
						<span className="text-muted-foreground relative z-10">
							Your AI recruiter, hire smarter with
						</span>
						{/* <div className="mx-3 h-4 w-px bg-border/60"></div> */}
						<span className="text-primary font-medium relative z-10 px-1">90%</span>
						<span className="text-muted-foreground relative z-10">less cost</span>
						<div className="absolute inset-0 bg-primary/3 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
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
								<span className="absolute bottom-2 left-0 w-full h-3 bg-primary/15 -z-10 transform skew-x-12"></span>
							</span>
						</span>
						<span className="block">
							<span className="relative inline-block">
								<span className="relative z-10">Hire Faster.</span>
								<span
									className="absolute bottom-2 left-0 w-full h-3 bg-primary/8 -z-10 transform -skew-x-12"
									style={{ animationDelay: '1s' }}
								></span>
							</span>
						</span>
					</motion.h1>

					{/* Subtitle */}
					<motion.p
						className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
						variants={itemVariants}
					>
						The AI-powered platform that revolutionizes your hiring process with
						<span className="text-primary font-medium"> automated screening</span> and
						<span className="text-primary font-medium"> unbiased evaluations</span>.
					</motion.p>

					{/* CTA Buttons */}
					{/* TEMPORARY: Webinar promotion until November 5, 2025, 12 noon PST */}
					{/* After this date, enable the commented code below and disable this webinar section */}
					<motion.div
						className="flex flex-col sm:flex-row gap-4 justify-center mb-16 relative"
						variants={itemVariants}
					>
						<div className="relative">
							<Button
								asChild
								variant="gradient"
								size="lg"
								className="rounded-full px-8 py-6 text-lg btn-modern group relative"
							>
								<Link href="/webinar" className="flex items-center">
									<span className="relative z-10">Join Live Webinar</span>
									<ArrowRight className="relative z-10 ml-2 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
								</Link>
							</Button>
						</div>

						{/* Temporarily disabled - restore after November 5, 2025, 12 noon PST */}
						{/*
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
						*/}

						<div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 backdrop-blur-sm px-4 py-2 text-sm">
							<div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
							<span className="text-red-600 dark:text-red-400 font-medium">
								Nov 5 • 12 PM PST
							</span>
						</div>
					</motion.div>

					{/* ORIGINAL BUTTONS - Restore after November 5, 2025, 12 noon PST and remove webinar section above */}
					{/*
					<motion.div
						className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
						variants={itemVariants}
					>
						<Button
							asChild
							variant="gradient"
							size="lg"
							className="rounded-full px-8 py-6 text-lg btn-modern group"
						>
							<Link href="#contact" className="flex items-center">
								<span className="relative z-10">Get your Free Trial</span>
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
					*/}

					{/* Enhanced Hero Image with Better Navigation */}
					<motion.div
						className="relative max-w-6xl mx-auto"
						variants={itemVariants}
						initial={{ opacity: 0, scale: 0.95, y: 40 }}
						animate={{
							opacity: isLoaded ? 1 : 0,
							scale: isLoaded ? 1 : 0.95,
							y: isLoaded ? 0 : 40,
						}}
						transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
					>
						{/* Minimal Inline Navigation */}
						<div className="flex justify-center gap-8 mb-12 relative z-20">
							{heroConfig.map((config, index) => {
								const IconComponent = config.icon;
								return (
									<motion.button
										key={index}
										onClick={() => handleImageSelect(index)}
										className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
											index === currentImageIndex
												? 'text-primary'
												: 'text-muted-foreground hover:text-foreground'
										}`}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									></motion.button>
								);
							})}
						</div>

						<div className="relative">
							{/* Enhanced glow effect with primary color */}
							<motion.div
								className="absolute -inset-4 rounded-3xl blur-2xl opacity-60 bg-gradient-to-r from-primary/40 via-primary/20 to-primary/40"
								animate={{
									opacity: [0.4, 0.7, 0.4],
									scale: [1, 1.02, 1],
								}}
								transition={{
									duration: 3,
									repeat: Infinity,
									repeatType: 'reverse',
									ease: 'easeInOut',
								}}
							/>

							{/* Main container with reduced padding/bezel - removed overflow-hidden */}
							<div className="relative bg-background/95 backdrop-blur-sm border border-border/50 rounded-3xl shadow-2xl shadow-primary/20">
								{/* Image carousel with extra padding for border bubbles */}
								<div className="relative rounded-2xl aspect-[16/10] sm:aspect-[16/9] p-3 overflow-visible">
									{/* Inner container with overflow hidden only for image */}
									<div className="relative w-full h-full overflow-hidden rounded-2xl">
										<AnimatePresence mode="wait">
											<motion.div
												key={currentImageIndex}
												initial={{ opacity: 0, x: 50, scale: 0.98 }}
												animate={{ opacity: 1, x: 0, scale: 1 }}
												exit={{ opacity: 0, x: -50, scale: 1.02 }}
												transition={{
													duration: 0.6,
													ease: [0.22, 1, 0.36, 1],
												}}
												className="relative w-full h-full"
											>
												<Image
													src={currentConfig.image}
													alt={currentConfig.alt}
													fill
													className="object-cover object-center rounded-2xl"
													priority
													onLoad={() => setIsLoaded(true)}
												/>

												{/* Subtle overlay */}
												<div className="absolute inset-0 bg-gradient-to-t from-background/10 via-transparent to-transparent rounded-2xl"></div>
											</motion.div>
										</AnimatePresence>
									</div>

									{/* Enhanced Google-style Clean Bubbles - Positioned on borders only */}
									<AnimatePresence>
										{currentConfig.bubbles.map((bubble) => {
											const IconComponent = bubble.icon;
											return (
												<motion.div
													key={`${currentImageIndex}-${bubble.id}`}
													initial={{
														opacity: 0,
														scale: 0.7,
														y: 30,
													}}
													animate={{
														opacity: 1,
														scale: 1,
														y: 0,
													}}
													exit={{
														opacity: 0,
														scale: 0.7,
														y: -20,
													}}
													transition={{
														duration: 0.6,
														delay: bubble.delay,
														ease: [0.25, 0.46, 0.45, 0.94],
													}}
													className={`absolute px-4 py-2.5 rounded-full text-sm font-semibold cursor-pointer select-none ${
														bubbleVariants[bubble.color as keyof typeof bubbleVariants]
													}`}
													style={{
														left: bubble.position.x,
														top: bubble.position.y,
														transform: 'translate(-50%, -50%)',
														zIndex: 30,
														minWidth: 'fit-content',
													}}
													whileHover={{
														scale: 1.08,
														y: -4,
														transition: {
															duration: 0.2,
															ease: 'easeOut',
														},
													}}
													whileTap={{
														scale: 0.96,
														transition: { duration: 0.1 },
													}}
												>
													{/* Enhanced glass morphism background */}
													<div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-white/10 to-transparent dark:from-white/10 dark:via-white/5 dark:to-transparent"></div>

													{/* Content with icon - Enhanced Google style */}
													<div className="relative flex items-center gap-2.5 whitespace-nowrap">
														<div
															className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full shadow-sm ${
																bubble.color === 'primary'
																	? 'bg-primary/15 dark:bg-primary/25 text-primary'
																	: bubble.color === 'success'
																	? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400'
																	: bubble.color === 'accent'
																	? 'bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400'
																	: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
															}`}
														>
															<IconComponent className="w-3.5 h-3.5" />
														</div>
														<span className="text-slate-700 dark:text-slate-200 font-semibold text-sm tracking-wide">
															{bubble.text}
														</span>
													</div>

													{/* Enhanced accent line with gradient */}
													<div
														className={`absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r ${
															bubble.color === 'primary'
																? 'from-transparent via-primary/30 to-transparent'
																: bubble.color === 'success'
																? 'from-transparent via-emerald-500/30 to-transparent'
																: bubble.color === 'accent'
																? 'from-transparent via-violet-500/30 to-transparent'
																: 'from-transparent via-blue-500/30 to-transparent'
														}`}
													/>

													{/* Subtle outer glow for prominence */}
													<div
														className={`absolute inset-0 rounded-full -z-10 blur-sm opacity-40 ${
															bubble.color === 'primary'
																? 'bg-primary/20'
																: bubble.color === 'success'
																? 'bg-emerald-500/20'
																: bubble.color === 'accent'
																? 'bg-violet-500/20'
																: 'bg-blue-500/20'
														}`}
													/>
												</motion.div>
											);
										})}
									</AnimatePresence>
								</div>
							</div>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
