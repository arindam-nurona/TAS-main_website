'use client';

import type React from 'react';

import { useState, useRef } from 'react';
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { motion, useInView } from 'framer-motion';

type SubmissionType = 'trial' | 'demo' | null;

export default function ContactForm() {
	const [formData, setFormData] = useState({
		name: '',
		company: '',
		email: '',
		phone: '',
		website: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submittingType, setSubmittingType] = useState<'trial' | 'demo' | null>(null);
	const [submitted, setSubmitted] = useState(false);
	const [submissionType, setSubmissionType] = useState<SubmissionType>(null);
	const [error, setError] = useState('');
	const [fieldErrors, setFieldErrors] = useState({
		name: '',
		company: '',
		email: '',
		phone: '',
		website: '',
	});
	const formRef = useRef(null);
	const isInView = useInView(formRef, { once: true, amount: 0.3 });

	// Validation functions
	const validateEmail = (email: string): boolean => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const validatePhone = (phone: string): boolean => {
		if (!phone) return false; // Phone is required
		// Check if phone has a valid format (country code + number)
		// Allow validation to be more lenient - just check format, not actual validity
		try {
			// Check if it's a valid format (has country code and digits)
			const hasCountryCode = phone.startsWith('+');
			const digitsOnly = phone.replace(/\D/g, '');
			// Should have at least country code (1-3 digits) + 7-15 digits for the number
			return hasCountryCode && digitsOnly.length >= 8 && digitsOnly.length <= 15;
		} catch {
			return false;
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Clear field error when user starts typing
		if (fieldErrors[name as keyof typeof fieldErrors]) {
			setFieldErrors((prev) => ({ ...prev, [name]: '' }));
		}
	};

	const handlePhoneChange = (value: string | undefined) => {
		setFormData((prev) => ({ ...prev, phone: value || '' }));
		// Clear phone error when user starts typing
		if (fieldErrors.phone) {
			setFieldErrors((prev) => ({ ...prev, phone: '' }));
		}
	};

	const handlePhoneBlur = () => {
		if (formData.phone) {
			if (!validatePhone(formData.phone)) {
				setFieldErrors((prev) => ({
					...prev,
					phone: 'Please enter a valid phone number',
				}));
			} else {
				setFieldErrors((prev) => ({ ...prev, phone: '' }));
			}
		} else {
			setFieldErrors((prev) => ({
				...prev,
				phone: 'Phone number is required',
			}));
		}
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		if (name === 'name') {
			if (!value || value.trim() === '') {
				setFieldErrors((prev) => ({
					...prev,
					name: 'Name is required',
				}));
			} else {
				setFieldErrors((prev) => ({ ...prev, name: '' }));
			}
		}

		if (name === 'company') {
			if (!value || value.trim() === '') {
				setFieldErrors((prev) => ({
					...prev,
					company: 'Company is required',
				}));
			} else {
				setFieldErrors((prev) => ({ ...prev, company: '' }));
			}
		}

		if (name === 'email' && value) {
			if (!validateEmail(value)) {
				setFieldErrors((prev) => ({
					...prev,
					email: 'Please enter a valid email address',
				}));
			} else {
				setFieldErrors((prev) => ({ ...prev, email: '' }));
			}
		}

		if (name === 'website') {
			if (!value || value.trim() === '') {
				setFieldErrors((prev) => ({
					...prev,
					website: 'Website is required',
				}));
			} else {
				const trimmedValue = value.trim();
				// Check if it looks like a valid URL/domain
				// Allow: company.com, www.company.com, linkedin.com/company, https://company.com, etc.
				const urlPattern =
					/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
				const isValidFormat = urlPattern.test(trimmedValue);

				if (!isValidFormat) {
					setFieldErrors((prev) => ({
						...prev,
						website:
							'Please enter a valid URL (e.g., company.com or linkedin.com/company)',
					}));
				} else {
					// Try to validate as URL (prepend https:// if no protocol)
					try {
						const urlToValidate =
							trimmedValue.startsWith('http://') || trimmedValue.startsWith('https://')
								? trimmedValue
								: `https://${trimmedValue}`;
						new URL(urlToValidate);
						setFieldErrors((prev) => ({ ...prev, website: '' }));
					} catch {
						setFieldErrors((prev) => ({
							...prev,
							website: 'Please enter a valid URL',
						}));
					}
				}
			}
		}
	};

	const handleSubmit = async (e: React.FormEvent, type: 'trial' | 'demo') => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmittingType(type);
		setError('');

		// Validate required fields and set individual field errors
		let hasEmptyFields = false;
		const newFieldErrors = { ...fieldErrors };

		if (!formData.name) {
			newFieldErrors.name = 'Name is required';
			hasEmptyFields = true;
		}
		if (!formData.company) {
			newFieldErrors.company = 'Company is required';
			hasEmptyFields = true;
		}
		if (!formData.email) {
			newFieldErrors.email = 'Email is required';
			hasEmptyFields = true;
		}
		if (!formData.phone) {
			newFieldErrors.phone = 'Phone number is required';
			hasEmptyFields = true;
		}
		if (!formData.website) {
			newFieldErrors.website = 'Website is required';
			hasEmptyFields = true;
		}

		if (hasEmptyFields) {
			setFieldErrors(newFieldErrors);
			setIsSubmitting(false);
			setSubmittingType(null);
			return;
		}

		// Validate email format
		if (!validateEmail(formData.email)) {
			setError('Please enter a valid email address');
			setIsSubmitting(false);
			setSubmittingType(null);
			return;
		}

		// Validate phone format
		if (!validatePhone(formData.phone)) {
			setError('Please enter a valid phone number');
			setIsSubmitting(false);
			setSubmittingType(null);
			return;
		}

		try {
			// Create FormData for Google Forms submission
			const googleFormData = new FormData();
			googleFormData.append('entry.998475948', formData.name); // Full Name
			googleFormData.append('entry.1297365854', formData.company); // Company
			googleFormData.append('entry.1963485054', formData.email); // Work Email
			googleFormData.append('entry.2112992557', formData.phone); // Phone with country code
			googleFormData.append('entry.1022966270', formData.website); // Website/LinkedIn
			googleFormData.append(
				'entry.1996826289',
				type === 'demo' ? 'Book Demo' : 'Get Free Trial'
			); // Action

			// Submit to Google Forms
			await fetch(
				'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfwG2TpHYO1r_xDOvqq_zGduR5fZO8oNxYCkeScxADd0D28ww/formResponse',
				{
					method: 'POST',
					body: googleFormData,
					mode: 'no-cors', // Google Forms requires this
				}
			);

			setSubmissionType(type);
			setSubmitted(true);
		} catch (err) {
			console.error('Error submitting contact form:', err);
			setError('Something went wrong. Please try again.');
		} finally {
			setIsSubmitting(false);
			setSubmittingType(null);
		}
	};

	if (submitted) {
		const isDemo = submissionType === 'demo';

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
					{isDemo ? 'Demo Booked!' : "We're Setting Up Your Account"}
				</motion.h3>
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.6, duration: 0.5 }}
					className="text-muted-foreground max-w-md mx-auto"
				>
					{isDemo
						? "Perfect! We'll reach out within 24 hours to schedule your personalized demo and show you how Talmyra can transform your hiring process."
						: "Great! We're preparing your free trial access. You'll receive your account details via email within 24 hours, and our team will reach out to help you get started."}
				</motion.p>
			</motion.div>
		);
	}

	return (
		<motion.form
			ref={formRef}
			onSubmit={(e) => handleSubmit(e, 'trial')}
			noValidate
			className="space-y-6"
			initial={{ opacity: 0, y: 30 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
			transition={{ duration: 0.6 }}
		>
			<h3 className="text-2xl font-bold mb-6">Get Started</h3>

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
					onBlur={handleBlur}
					className={`h-12 rounded-lg transition-all duration-200 focus-visible:ring-primary bg-background/50 backdrop-blur-sm ${
						fieldErrors.name
							? 'border-destructive focus-visible:border-destructive'
							: 'focus-visible:border-primary border-border'
					}`}
					required
					placeholder="John Smith"
				/>
				{fieldErrors.name && (
					<p className="text-sm text-destructive mt-1">{fieldErrors.name}</p>
				)}
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
					onBlur={handleBlur}
					className={`h-12 rounded-lg transition-all duration-200 focus-visible:ring-primary bg-background/50 backdrop-blur-sm ${
						fieldErrors.company
							? 'border-destructive focus-visible:border-destructive'
							: 'focus-visible:border-primary border-border'
					}`}
					required
					placeholder="Your Company"
				/>
				{fieldErrors.company && (
					<p className="text-sm text-destructive mt-1">{fieldErrors.company}</p>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="website" className="text-foreground font-medium">
					Company Website / LinkedIn <span className="text-primary">*</span>
				</Label>
				<Input
					type="url"
					id="website"
					name="website"
					value={formData.website}
					onChange={handleChange}
					onBlur={handleBlur}
					className={`h-12 rounded-lg transition-all duration-200 focus-visible:ring-primary bg-background/50 backdrop-blur-sm ${
						fieldErrors.website
							? 'border-destructive focus-visible:border-destructive'
							: 'focus-visible:border-primary border-border'
					}`}
					required
					placeholder="https://company.com"
				/>
				{fieldErrors.website && (
					<p className="text-sm text-destructive mt-1">{fieldErrors.website}</p>
				)}
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
					onBlur={handleBlur}
					className={`h-12 rounded-lg transition-all duration-200 focus-visible:ring-primary bg-background/50 backdrop-blur-sm ${
						fieldErrors.email
							? 'border-destructive focus-visible:border-destructive'
							: 'focus-visible:border-primary border-border'
					}`}
					required
					placeholder="john@company.com"
				/>
				{fieldErrors.email && (
					<p className="text-sm text-destructive mt-1">{fieldErrors.email}</p>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="phone" className="text-foreground font-medium">
					Phone <span className="text-primary">*</span>
				</Label>
				<div
					className={`phone-input-wrapper ${
						fieldErrors.phone ? 'phone-input-error' : ''
					}`}
				>
					<PhoneInput
						international
						defaultCountry="US"
						value={formData.phone}
						onChange={handlePhoneChange}
						onBlur={handlePhoneBlur}
						className={`h-12 rounded-lg transition-all duration-200 bg-background/50 backdrop-blur-sm ${
							fieldErrors.phone
								? 'border-destructive focus-within:border-destructive'
								: 'border-border focus-within:border-primary'
						}`}
						numberInputProps={{
							required: true,
							className: 'h-12 rounded-lg',
						}}
					/>
				</div>
				{fieldErrors.phone && (
					<p className="text-sm text-destructive mt-1">{fieldErrors.phone}</p>
				)}
				<style jsx global>{`
					.phone-input-wrapper .PhoneInput {
						display: flex;
						align-items: center;
						border: 1px solid hsl(var(--border));
						border-radius: 0.5rem;
						background: hsl(var(--background) / 0.5);
						backdrop-filter: blur(4px);
						transition: all 0.2s;
					}
					.phone-input-wrapper .PhoneInput:focus-within {
						outline: 2px solid hsl(var(--ring));
						outline-offset: 2px;
					}
					.phone-input-error .PhoneInput {
						border-color: hsl(var(--destructive));
					}
					.phone-input-error .PhoneInput:focus-within {
						border-color: hsl(var(--destructive));
						outline-color: hsl(var(--destructive));
					}
					.phone-input-wrapper .PhoneInputInput {
						flex: 1;
						height: 3rem;
						border: none;
						background: transparent;
						padding: 0 0.75rem;
						font-size: 1rem;
						color: hsl(var(--foreground));
						outline: none;
					}
					.phone-input-wrapper .PhoneInputInput::placeholder {
						color: hsl(var(--muted-foreground));
					}
					.phone-input-wrapper .PhoneInputCountry {
						padding: 0 0.75rem;
						border-right: 1px solid hsl(var(--border));
					}
					.phone-input-wrapper .PhoneInputCountryIcon {
						width: 1.5rem;
						height: 1.5rem;
						border-radius: 0.25rem;
					}
					.phone-input-wrapper .PhoneInputCountrySelect {
						margin-left: 0.5rem;
						padding: 0.25rem;
						border: none;
						background: transparent;
						color: hsl(var(--foreground));
						cursor: pointer;
					}
				`}</style>
			</div>

			<div className="flex flex-col sm:flex-row gap-4 mt-4">
				<Button
					type="submit"
					disabled={isSubmitting}
					variant="gradient"
					className="flex-1 h-14 rounded-lg flex items-center justify-center group relative overflow-hidden text-base font-medium btn-modern"
				>
					<span className="relative z-10 flex items-center">
						{submittingType === 'trial' ? (
							<>
								<Loader2 className="animate-spin mr-2 h-5 w-5" />
								Processing...
							</>
						) : (
							<>
								Get Free Trial
								<ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
							</>
						)}
					</span>
					<span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 rounded-lg"></span>
				</Button>
				<Button
					type="button"
					onClick={(e) => handleSubmit(e as any, 'demo')}
					disabled={isSubmitting}
					variant="outline"
					className="flex-1 h-14 rounded-lg border-primary/20 hover:bg-primary/5 transition-all duration-300 text-base font-medium"
				>
					{submittingType === 'demo' ? (
						<>
							<Loader2 className="animate-spin mr-2 h-5 w-5" />
							Processing...
						</>
					) : (
						'Book Demo'
					)}
				</Button>
			</div>

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
