'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from './theme-toggle';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<motion.footer
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="border-t border-border/50 py-12 bg-background relative"
		>
			<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

			<div className="container">
				<div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between">
					<motion.div
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.2, duration: 0.5 }}
						className="mb-6 md:mb-0"
					>
						<Link href="/" className="flex items-center group">
							<Image
								src="/logo.png"
								alt="Talmyra"
								width={24}
								height={24}
								className="h-6 w-auto mr-2"
							/>
							<span className="text-xl font-bold text-foreground">
								<span className="text-primary group-hover:text-primary/80 transition-colors">
									Tal
								</span>
								<span className="group-hover:text-primary/80 transition-colors">
									myra
								</span>
							</span>
						</Link>
					</motion.div>

					<motion.div
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.3, duration: 0.5 }}
						className="flex flex-col md:flex-row items-center gap-6"
					>
						<div className="flex items-center gap-4">
							<Link
								href="#features"
								className="text-sm text-muted-foreground hover:text-foreground transition-colors"
							>
								Features
							</Link>
							<Link
								href="#pricing"
								className="text-sm text-muted-foreground hover:text-foreground transition-colors"
							>
								Pricing
							</Link>
							<Link
								href="#videos"
								className="text-sm text-muted-foreground hover:text-foreground transition-colors"
							>
								Demo
							</Link>
							<Link
								href="#pricing"
								className="text-sm text-muted-foreground hover:text-foreground transition-colors"
							>
								Contact
							</Link>
						</div>

						<div className="flex items-center gap-4">
							<ThemeToggle />
							<button
								onClick={scrollToTop}
								className="w-9 h-9 rounded-full bg-background/10 backdrop-blur-sm hover:bg-background/20 transition-all flex items-center justify-center text-muted-foreground hover:text-foreground"
								aria-label="Scroll to top"
							>
								<ArrowUp className="h-5 w-5" />
							</button>
						</div>
					</motion.div>
				</div>

				<div className="mt-8 pt-8 border-t border-border/50 text-center">
					<p className="text-sm text-muted-foreground">
						© {new Date().getFullYear()} Talmyra. All rights reserved.
					</p>
				</div>
			</div>
		</motion.footer>
	);
}
