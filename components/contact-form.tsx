'use client';

import type React from 'react';

import { useState, useRef } from 'react';
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion, useInView } from 'framer-motion';

export default function ContactForm() {
	const [formData, setFormData] = useState({
		name: '',
		company: '',
		email: '',
		phone: '',
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

		// Validate form
		if (!formData.name || !formData.company || !formData.email) {
			setError('Please fill in all required fields');
			setIsSubmitting(false);
			return;
		}

		try {
			// Create FormData for Google Forms submission
			const googleFormData = new FormData();
			googleFormData.append('entry.998475948', formData.name); // Full Name
			googleFormData.append('entry.1297365854', formData.company); // Company
			googleFormData.append('entry.1963485054', formData.email); // Work Email
			googleFormData.append('entry.2112992557', formData.phone || ''); // Phone (optional)

			// Submit to Google Forms
			await fetch(
				'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfwG2TpHYO1r_xDOvqq_zGduR5fZO8oNxYCkeScxADd0D28ww/formResponse',
				{
					method: 'POST',
					body: googleFormData,
					mode: 'no-cors', // Google Forms requires this
				}
			);

			setSubmitted(true);
		} catch (err) {
			console.error('Error submitting contact form:', err);
			setError('Something went wrong. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	if (submitted) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-center py-8"
			>
				<motion.div
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.5 }}
					className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6"
				>
					<CheckCircle2 className="h-10 w-10 text-primary" />
				</motion.div>
				<motion.h3
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.4, duration: 0.5 }}
					className="text-2xl font-semibold mb-3"
				>
					Thank you!
				</motion.h3>
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.6, duration: 0.5 }}
					className="text-muted-foreground max-w-md mx-auto"
				>
					We've received your request and will send you trial access details shortly. One
					of our team members will reach out to help you get started.
				</motion.p>
			</motion.div>
		);
	}

	return (
		<motion.form
			ref={formRef}
			onSubmit={handleSubmit}
			className="space-y-6"
			initial={{ opacity: 0, y: 30 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
			transition={{ duration: 0.6 }}
		>
			<h3 className="text-2xl font-bold mb-6">Get Your Free Trial</h3>

			{error && (
				<motion.div
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: 'auto' }}
					exit={{ opacity: 0, height: 0 }}
					className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm"
				>
					{error}
				</motion.div>
			)}

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
					className="h-12 rounded-lg transition-all duration-200 focus-visible:ring-primary focus-visible:border-primary bg-background/50 backdrop-blur-sm"
					required
					placeholder="John Smith"
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
					className="h-12 rounded-lg transition-all duration-200 focus-visible:ring-primary focus-visible:border-primary bg-background/50 backdrop-blur-sm"
					required
					placeholder="Your Company"
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
					className="h-12 rounded-lg transition-all duration-200 focus-visible:ring-primary focus-visible:border-primary bg-background/50 backdrop-blur-sm"
					required
					placeholder="john@company.com"
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="phone" className="text-foreground font-medium">
					Phone (optional)
				</Label>
				<Input
					type="tel"
					id="phone"
					name="phone"
					value={formData.phone}
					onChange={handleChange}
					className="h-12 rounded-lg transition-all duration-200 focus-visible:ring-primary focus-visible:border-primary bg-background/50 backdrop-blur-sm"
					placeholder="+1 (555) 123-4567"
				/>
			</div>

			<Button
				type="submit"
				disabled={isSubmitting}
				variant="gradient"
				className="w-full h-14 rounded-lg mt-4 flex items-center justify-center group relative overflow-hidden text-base font-medium"
			>
				<span className="relative z-10 flex items-center">
					{isSubmitting ? (
						<>
							<Loader2 className="animate-spin mr-2 h-5 w-5" />
							Processing...
						</>
					) : (
						<>
							Get Your Free Trial
							<ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
						</>
					)}
				</span>
				<span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 rounded-lg"></span>
			</Button>

			<div className="flex items-center gap-4 pt-2">
				<div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="text-primary"
					>
						<path
							d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M12 6V12L16 14"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
				<p className="text-sm text-muted-foreground">
					<span className="font-medium text-foreground">Quick setup</span> - Get your
					trial access within 24 hours
				</p>
			</div>
		</motion.form>
	);
}
