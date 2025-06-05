'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [activeSection, setActiveSection] = useState('');

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 10);

			// Update active section based on scroll position
			const sections = ['videos', 'features', 'benefits', 'contact'];
			const currentSection = sections.find((section) => {
				const element = document.getElementById(section);
				if (element) {
					const rect = element.getBoundingClientRect();
					return rect.top <= 100 && rect.bottom >= 100;
				}
				return false;
			});

			if (currentSection) {
				setActiveSection(currentSection);
			} else if (window.scrollY < 100) {
				setActiveSection('');
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleNavClick = (sectionId: string) => {
		setIsOpen(false);
		setActiveSection(sectionId);
	};

	return (
		<header
			className={cn(
				'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
				scrolled
					? 'bg-background/80 backdrop-blur-xl border-b border-border/50 py-2'
					: 'bg-transparent py-4'
			)}
		>
			<div className="container">
				<div className="flex items-center justify-between">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
					>
						<Link href="/" className="flex items-center">
							<Image
								src="/logo.png"
								alt="Talmyra"
								width={32}
								height={32}
								className="h-8 w-auto"
							/>
							<span className="ml-2 text-xl font-medium text-foreground">
								<span className="text-primary font-bold">Tal</span>
								<span className="font-bold">myra</span>
							</span>
						</Link>
					</motion.div>

					<div className="hidden md:flex items-center space-x-8">
						<motion.nav
							className="flex items-center space-x-8"
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
						>
							<Link
								href="#videos"
								className={cn(
									'text-sm transition-colors relative group',
									activeSection === 'videos'
										? 'text-primary'
										: 'text-muted-foreground hover:text-foreground'
								)}
								onClick={() => handleNavClick('videos')}
							>
								Demo
								<span
									className={cn(
										'absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300',
										activeSection === 'videos' ? 'w-full' : 'w-0 group-hover:w-full'
									)}
								></span>
							</Link>
							<Link
								href="#features"
								className={cn(
									'text-sm transition-colors relative group',
									activeSection === 'features'
										? 'text-primary'
										: 'text-muted-foreground hover:text-foreground'
								)}
								onClick={() => handleNavClick('features')}
							>
								Features
								<span
									className={cn(
										'absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300',
										activeSection === 'features' ? 'w-full' : 'w-0 group-hover:w-full'
									)}
								></span>
							</Link>
							<Link
								href="#benefits"
								className={cn(
									'text-sm transition-colors relative group',
									activeSection === 'benefits'
										? 'text-primary'
										: 'text-muted-foreground hover:text-foreground'
								)}
								onClick={() => handleNavClick('benefits')}
							>
								Benefits
								<span
									className={cn(
										'absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300',
										activeSection === 'benefits' ? 'w-full' : 'w-0 group-hover:w-full'
									)}
								></span>
							</Link>
							<Link
								href="#contact"
								className={cn(
									'text-sm transition-colors relative group',
									activeSection === 'contact'
										? 'text-primary'
										: 'text-muted-foreground hover:text-foreground'
								)}
								onClick={() => handleNavClick('contact')}
							>
								Contact
								<span
									className={cn(
										'absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300',
										activeSection === 'contact' ? 'w-full' : 'w-0 group-hover:w-full'
									)}
								></span>
							</Link>
						</motion.nav>
						<motion.div
							className="flex items-center gap-4"
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							<ThemeToggle />
							<Button
								asChild
								variant="gradient"
								size="sm"
								className="rounded-full px-5 py-2 btn-modern"
							>
								<Link href="#contact" onClick={() => handleNavClick('contact')}>
									<span className="relative z-10">Get Demo</span>
								</Link>
							</Button>
						</motion.div>
					</div>

					<div className="md:hidden flex items-center gap-2">
						<ThemeToggle />
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="text-muted-foreground hover:text-foreground p-2 rounded-full bg-background/10 backdrop-blur-sm hover:bg-background/20 transition-all"
							aria-label="Toggle menu"
						>
							{isOpen ? <X size={20} /> : <Menu size={20} />}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border"
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3 }}
					>
						<div className="container py-6 space-y-6">
							<Link
								href="#videos"
								className="block py-2 text-lg font-medium hover:text-primary transition-colors"
								onClick={() => handleNavClick('videos')}
							>
								Demo
							</Link>
							<Link
								href="#features"
								className="block py-2 text-lg font-medium hover:text-primary transition-colors"
								onClick={() => handleNavClick('features')}
							>
								Features
							</Link>
							<Link
								href="#benefits"
								className="block py-2 text-lg font-medium hover:text-primary transition-colors"
								onClick={() => handleNavClick('benefits')}
							>
								Benefits
							</Link>
							<Link
								href="#contact"
								className="block py-2 text-lg font-medium hover:text-primary transition-colors"
								onClick={() => handleNavClick('contact')}
							>
								Contact
							</Link>
							<Button
								asChild
								variant="gradient"
								className="w-full rounded-full py-6 btn-modern"
							>
								<Link href="#contact" onClick={() => handleNavClick('contact')}>
									Get Demo
								</Link>
							</Button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
