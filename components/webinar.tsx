'use client';

import type React from 'react';
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
	CheckCircle2,
	Clock,
	Users,
	Target,
	Calendar,
	ArrowRight,
	Zap,
	TrendingUp,
	Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Webinar() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		jobTitle: '',
		company: '',
		industry: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState('');

	const formRef = useRef(null);
	const isInView = useInView(formRef, { once: true, amount: 0.3 });

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError('');

		if (!formData.name || !formData.email || !formData.jobTitle || !formData.company) {
			setError('Please fill in all required fields');
			setIsSubmitting(false);
			return;
		}

		try {
			// Google Forms submission
			const googleFormData = new FormData();
			googleFormData.append('entry.998475948', formData.name); // Full Name
			googleFormData.append('entry.1963485054', formData.email); // Work Email
			googleFormData.append('entry.2112992557', formData.jobTitle); // Job Title
			googleFormData.append('entry.1297365854', formData.company); // Company
			googleFormData.append('entry.659775968', formData.industry || ''); // Industry (optional)

			// Submit to Google Forms
			await fetch(
				'https://docs.google.com/forms/u/0/d/e/1FAIpQLScrKuEDdIfQ4dU2CoDq4O4TT__-uVRczBN9f5huiM-6wHWoSg/formResponse',
				{
					method: 'POST',
					body: googleFormData,
					mode: 'no-cors',
				}
			);

			setSubmitted(true);
		} catch (err) {
			console.error('Error submitting webinar registration:', err);
			setError('Something went wrong. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
		},
	};

	return (
		<div className="min-h-screen bg-background text-foreground">
			{/* Hero Section - Redesigned for Better Hierarchy */}
			<section className="relative pt-20 pb-16 overflow-hidden">
				<div className="absolute inset-0 -z-10">
					<div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
					<div className="floating-orb floating-orb-1"></div>
					<div className="floating-orb floating-orb-2"></div>
					<div className="absolute inset-0 bg-gradient-to-b from-background via-background/98 to-background"></div>
				</div>

				<div className="container max-w-7xl mx-auto px-4">
					<motion.div
						className="grid lg:grid-cols-5 gap-12 items-start"
						variants={containerVariants}
						initial="hidden"
						animate="visible"
					>
						{/* Main Content - Left Column (3/5 width) */}
						<div className="lg:col-span-3 space-y-6">
							{/* Compact Status Badge */}
							<motion.div
								className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 backdrop-blur-sm px-4 py-2 text-sm"
								variants={itemVariants}
							>
								<div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
								<span className="text-red-600 dark:text-red-400 font-medium">
									LIVE WEBINAR
								</span>
							</motion.div>

							{/* Main Title - Streamlined */}
							<motion.h1
								className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[0.95]"
								variants={itemVariants}
							>
								<span className="block mb-2">
									<span className="relative inline-block">
										<span className="relative z-10 text-gradient animate-gradient bg-gradient-to-r from-primary via-primary/80 to-primary">
											AI in Recruiting:
										</span>
										<span className="absolute bottom-2 left-0 w-full h-3 bg-primary/15 -z-10 transform skew-x-12"></span>
									</span>
								</span>
								<span className="block text-2xl sm:text-3xl md:text-4xl text-muted-foreground font-normal">
									What It Means for You, Your Team, and Your Career
								</span>
							</motion.h1>

							{/* Value Proposition - Condensed */}
							<motion.p
								className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
								variants={itemVariants}
							>
								Join industry experts for a{' '}
								<span className="text-primary font-medium">no-pitch, insight-rich</span>{' '}
								session exploring how AI is reshaping HR and your career trajectory.
							</motion.p>

							{/* Key Differentiators - Reduced to 2 */}
							<motion.div className="flex flex-wrap gap-4" variants={itemVariants}>
								<Badge variant="outline" className="text-sm py-2 px-4">
									<Users className="w-4 h-4 mr-2" />
									Expert Panel + Live Q&A
								</Badge>
								<Badge variant="outline" className="text-sm py-2 px-4">
									<CheckCircle2 className="w-4 h-4 mr-2" />
									No Sales Pitch
								</Badge>
							</motion.div>

							{/* Primary CTA - Prominent */}
							<motion.div className="pt-4" variants={itemVariants}>
								<Button
									onClick={() => {
										const formSection = document.getElementById('registration-form');
										formSection?.scrollIntoView({ behavior: 'smooth' });
									}}
									variant="gradient"
									size="lg"
									className="rounded-full px-8 py-6 text-lg btn-modern group"
								>
									<span className="relative z-10 flex items-center">
										Register Free
										<ArrowRight className="ml-2 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
									</span>
								</Button>
							</motion.div>
						</div>

						{/* Event Details Card - Right Column (2/5 width) */}
						<motion.div className="lg:col-span-2 mt-8" variants={itemVariants}>
							<div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 space-y-6">
								{/* Event DateTime */}
								<div className="text-center border-b border-border/50 pb-6">
									<div className="text-sm text-muted-foreground mb-2">Next Session</div>
									<div className="text-xl font-bold mb-1">September 23, 2025</div>
									<div className="text-lg text-muted-foreground">12:00 PM PST</div>
								</div>

								{/* What You'll Learn - Condensed */}
								<div className="space-y-3">
									<h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
										What You'll Learn
									</h3>
									<div className="space-y-2 text-sm">
										{[
											'Real AI applications in HR',
											'Boost productivity strategies',
											'Position for career growth',
											'Actionable implementation tips',
										].map((item, index) => (
											<div key={index} className="flex items-start gap-2">
												<CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
												<span>{item}</span>
											</div>
										))}
									</div>
								</div>

								{/* Future Sessions Note - Enhanced Visibility */}
								<div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center">
									<p className="text-sm">
										<span className="font-semibold text-foreground">Can't make this date?</span>{' '}
										<span className="text-muted-foreground">Register to get notified of future sessions.</span>
									</p>
								</div>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* Value Proposition Hub - Consolidated Section */}
			<section className="py-20 bg-muted/30">
				<div className="container max-w-7xl mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="text-center mb-16"
					>
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							Why This Session Matters
						</h2>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
							<strong>
								AI is already driving change across Sales, Customer Support, and
								Marketing. Now it's HR's turn.
							</strong>
						</p>
					</motion.div>

					<div className="grid lg:grid-cols-3 gap-12">
						{/* What You'll Learn */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-xl p-8"
						>
							<div className="text-center mb-6">
								<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
									<Target className="w-6 h-6 text-primary" />
								</div>
								<h3 className="text-xl font-bold">What You'll Learn</h3>
							</div>
							<div className="space-y-4">
								{[
									'Real AI applications in HR operations',
									'How to boost team productivity without adding headcount',
									'Key signals HR leaders are using to drive better decision-making',
									'How to position yourself for career growth in an AI-driven org',
									'Myths vs. realities: What AI can and cannot do',
								].map((item, index) => (
									<div key={index} className="flex items-start gap-3">
										<CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
										<span className="text-sm">{item}</span>
									</div>
								))}
							</div>
						</motion.div>

						{/* Why Now + Market Context */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-xl p-8"
						>
							<div className="text-center mb-6">
								<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
									<TrendingUp className="w-6 h-6 text-primary" />
								</div>
								<h3 className="text-xl font-bold">Who Should Attend</h3>
							</div>
							<div className="space-y-4">
								<p className="text-sm text-muted-foreground">Perfect for:</p>
								{[
									'HR Directors and VPs',
									'Recruiting and Talent Acquisition Managers',
									'People Operations Professionals',
									'HR Tech Curators and Innovators',
								].map((role, index) => (
									<div key={index} className="flex items-center gap-3">
										<Users className="w-4 h-4 text-primary flex-shrink-0" />
										<span className="text-sm">{role}</span>
									</div>
								))}
							</div>
						</motion.div>

						{/* Expert Panel */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-xl p-8"
						>
							<div className="text-center mb-6">
								<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
									<Users className="w-6 h-6 text-primary" />
								</div>
								<h3 className="text-xl font-bold">Expert Panel</h3>
							</div>
							<div className="space-y-4">
								{[
									{
										name: 'Christina L',
										role: 'HRBP, Recruiting Leader',
										icon: Users,
									},
									{
										name: 'TBD',
										role: 'Head of Recruiting Agency',
										icon: Users,
									},
									{
										name: 'Ben G.',
										role: 'CEO, Talmyra (Moderator)',
										icon: Users,
									},
								].map((panelist, index) => (
									<div key={index} className="flex items-center gap-3">
										<div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
											<panelist.icon className="w-5 h-5 text-primary" />
										</div>
										<div>
											<div className="text-sm font-semibold">{panelist.name}</div>
											<div className="text-xs text-muted-foreground">{panelist.role}</div>
										</div>
									</div>
								))}
								<div className="mt-6 pt-4 border-t border-border/50">
									<p className="text-sm font-medium text-primary">+ Live Q&A Session</p>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Registration Section */}
			<section id="registration-form" className="py-20">
				<div className="container max-w-4xl mx-auto px-4">
					<motion.div
						ref={formRef}
						initial={{ opacity: 0, y: 30 }}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
						transition={{ duration: 0.6 }}
						className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12"
					>
						<div className="text-center mb-8">
							<h2 className="text-3xl md:text-4xl font-bold mb-4">🎫 Save Your Seat</h2>
							<p className="text-xl text-muted-foreground mb-6">
								Join HR leaders shaping the future of recruiting
							</p>

							{/* Social Proof */}
							<div className="flex items-center justify-center gap-8 mb-8 text-sm text-muted-foreground">
								<div className="flex items-center gap-2">
									<div className="flex -space-x-2">
										<div className="w-8 h-8 rounded-full overflow-hidden border-2 border-background">
											<img
												src="https://images.unsplash.com/photo-1730663454733-a82313c3f35d?q=32&w=32&fit=crop&crop=face"
												alt="HR Professional"
												className="w-full h-full object-cover"
											/>
										</div>
										<div className="w-8 h-8 rounded-full overflow-hidden border-2 border-background">
											<img
												src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
												alt="HR Professional"
												className="w-full h-full object-cover"
											/>
										</div>
										<div className="w-8 h-8 rounded-full overflow-hidden border-2 border-background">
											<img
												src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
												alt="HR Professional"
												className="w-full h-full object-cover"
											/>
										</div>
									</div>
									<span>HR leaders joining</span>
								</div>
								<div className="flex items-center gap-2">
									<Clock className="w-4 h-4" />
									<span>Limited seats</span>
								</div>
								<div className="flex items-center gap-2">
									<CheckCircle2 className="w-4 h-4 text-primary" />
									<span>Free access</span>
								</div>
							</div>

							<p className="text-sm text-muted-foreground">
								Perfect for HR Directors, VPs, Recruiting Managers, and People Operations
								Professionals
							</p>
						</div>

						{error && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm mb-6"
							>
								{error}
							</motion.div>
						)}

						{submitted ? (
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.5 }}
								className="text-center py-8"
							>
								<motion.div
									initial={{ scale: 0.8, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									transition={{ delay: 0.2, duration: 0.5 }}
									className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6"
								>
									<CheckCircle2 className="h-8 w-8 text-primary" />
								</motion.div>
								<motion.h3
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.4, duration: 0.5 }}
									className="text-2xl font-bold mb-4"
								>
									You're Registered!
								</motion.h3>
								<motion.p
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.6, duration: 0.5 }}
									className="text-muted-foreground mb-6"
								>
									Thank you for registering! We've sent you a confirmation email with the
									webinar details and calendar invite.
								</motion.p>
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.8, duration: 0.5 }}
									className="bg-primary/5 border border-primary/20 rounded-lg p-4 max-w-sm mx-auto"
								>
									<div className="flex items-center justify-center gap-3 mb-2">
										<Calendar className="h-4 w-4 text-primary" />
										<span className="font-semibold text-sm">September 23, 2025</span>
									</div>
									<div className="flex items-center justify-center gap-3">
										<Clock className="h-4 w-4 text-primary" />
										<span className="text-sm">12:00 PM PST</span>
									</div>
								</motion.div>
							</motion.div>
						) : (
							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="space-y-2">
									<Label htmlFor="name" className="text-foreground font-medium">
										Full Name <span className="text-primary">*</span>
									</Label>
									<Input
										type="text"
										id="name"
										name="name"
										value={formData.name}
										onChange={handleChange}
										className="h-12 rounded-lg"
										required
										placeholder="John Smith"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="email" className="text-foreground font-medium">
										Work Email <span className="text-primary">*</span>
									</Label>
									<Input
										type="email"
										id="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										className="h-12 rounded-lg"
										required
										placeholder="john@company.com"
									/>
								</div>

								<div className="grid md:grid-cols-2 gap-6">
									<div className="space-y-2">
										<Label htmlFor="jobTitle" className="text-foreground font-medium">
											Job Title <span className="text-primary">*</span>
										</Label>
										<Input
											type="text"
											id="jobTitle"
											name="jobTitle"
											value={formData.jobTitle}
											onChange={handleChange}
											className="h-12 rounded-lg"
											required
											placeholder="HR Director"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="company" className="text-foreground font-medium">
											Company <span className="text-primary">*</span>
										</Label>
										<Input
											type="text"
											id="company"
											name="company"
											value={formData.company}
											onChange={handleChange}
											className="h-12 rounded-lg"
											required
											placeholder="Your Company"
										/>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="industry" className="text-foreground font-medium">
										Industry (optional)
									</Label>
									<Input
										type="text"
										id="industry"
										name="industry"
										value={formData.industry}
										onChange={handleChange}
										className="h-12 rounded-lg"
										placeholder="Technology, Healthcare, etc."
									/>
								</div>

								<Button
									type="submit"
									disabled={isSubmitting}
									variant="gradient"
									className="w-full h-14 rounded-lg mt-6 flex items-center justify-center group text-lg font-medium"
								>
									<span className="relative z-10 flex items-center">
										{isSubmitting ? (
											<>
												<motion.div
													className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
													animate={{ rotate: 360 }}
													transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
												/>
												Registering...
											</>
										) : (
											<>
												Register for Free Webinar
												<ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
											</>
										)}
									</span>
								</Button>

								<div className="text-center text-sm text-muted-foreground">
									By registering, you'll receive a confirmation email with webinar details
									and calendar invite.
								</div>
							</form>
						)}
					</motion.div>
				</div>
			</section>

			{/* No Pitch Section */}
			<section className="py-16">
				<div className="container max-w-4xl mx-auto px-4 text-center">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">
							🔐 Not a Sales Pitch — Just Real Talk
						</h2>
						<p className="text-xl text-muted-foreground mb-8">
							We know the hesitation — this isn't about selling software.
						</p>
						<div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
							{['No demos', 'No product tours', 'No hard pitch'].map((item, index) => (
								<div key={index} className="flex items-center justify-center gap-2">
									<CheckCircle2 className="w-5 h-5 text-primary" />
									<span className="font-medium">{item}</span>
								</div>
							))}
						</div>
						<p className="text-lg text-muted-foreground mt-8">
							Just <strong>actionable insights</strong>,{' '}
							<strong>career-advancing knowledge</strong>, and a chance to
							<strong> ask what you've been wondering</strong> about AI in HR.
						</p>
					</motion.div>
				</div>
			</section>
		</div>
	);
}
