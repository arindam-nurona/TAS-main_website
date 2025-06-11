import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Talmyra - Interview Smarter, Hire Faster',
	description:
		'Revolutionize early-stage hiring with AI-driven coding tests, voice-based interviews, and automated candidate evaluations.',
	icons: {
		icon: '/logo.png',
		shortcut: '/logo.png',
		apple: '/logo.png',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="scroll-smooth" suppressHydrationWarning>
			<head>
				<link rel="preload" href="/logo.png" as="image" />
				<link rel="preload" href="/hero-image-1.webp" as="image" />
				<link rel="preload" href="/hero-image-2.webp" as="image" />
				<link rel="preload" href="/hero-image-3.webp" as="image" />
				<link rel="preload" href="/hero-image-4.webp" as="image" />
			</head>
			<body className={`${inter.variable} font-sans antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
