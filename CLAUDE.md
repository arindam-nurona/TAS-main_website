# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Talmyra** (AI-powered hiring platform) marketing website built with Next.js 15, TypeScript, and modern React patterns. The project is configured for static export deployment and focuses on showcasing the platform's features through an interactive, animated interface.

## Development Commands

```bash
# Development server with hot reload
npm run dev

# Production build (generates static export in /out directory)
npm run build

# Lint code
npm run lint

# Start production server for testing
npm run start

# Test static build locally
npx serve out
```

## Architecture & Key Patterns

### Static Export Configuration
- **Static Site Generation**: Project uses `output: 'export'` in `next.config.mjs` for static hosting
- **Image Optimization**: Disabled (`unoptimized: true`) due to static export requirements
- **Build Tolerance**: ESLint and TypeScript errors are ignored during builds for deployment flexibility

### Component Architecture
- **Shadcn/UI Components**: Extensive use of Radix UI primitives via Shadcn (`@/components/ui/`)
- **Component Structure**: Feature components in `/components`, UI primitives in `/components/ui`
- **Path Aliases**: Uses `@/*` for absolute imports (configured in `tsconfig.json`)
- **Styling**: Tailwind CSS with CSS variables for theming, custom animations and keyframes

### State Management & Interactivity
- **Client Components**: Heavy use of `'use client'` for interactive features
- **Framer Motion**: Animations throughout the site, particularly in hero sections and video showcase
- **Theme Provider**: Dark/light mode support with system preference detection
- **Custom Hooks**: Located in `/hooks` directory (e.g., `use-mobile` hook)

### Video Content Management
Video content is centrally managed in `components/video-showcase.tsx`:
- Videos array contains YouTube video data (id, title, description, videoId, thumbnail)
- Supports YouTube iframe embedding with custom controls
- Fallback thumbnail handling (maxresdefault → hqdefault)
- To add videos: increment ID, add YouTube video ID, set thumbnail URL pattern

### Styling System
- **Design Tokens**: HSL-based color system using CSS variables
- **Typography**: Inter font with CSS variable (`--font-inter`)
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Custom Animations**: Float, pulse-slow, spin-slow, and custom fade animations
- **Grid Backgrounds**: Custom SVG grid patterns for visual enhancement

## Key Dependencies

### Core Framework
- **Next.js 15.2.4**: App Router with static export
- **React 19**: Latest React with concurrent features
- **TypeScript**: Strict configuration with path aliases

### UI & Styling
- **Tailwind CSS**: Utility-first styling with custom config
- **Radix UI**: Comprehensive primitive component library
- **Framer Motion**: Animation library for micro-interactions
- **Lucide React**: Icon library

### Form & Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation for forms
- **@hookform/resolvers**: Zod integration for React Hook Form

### Development Considerations
- **Image Preloading**: Hero images are preloaded in layout for performance
- **Font Optimization**: Inter font with swap display strategy
- **Bundle Optimization**: Tree-shaking enabled through modular imports
- **Static Assets**: All assets in `/public` directory for static hosting compatibility

## File Structure Notes
- **App Router**: Pages in `/app` directory following Next.js 13+ structure
- **Component Organization**: Feature components at root level, UI primitives in `/ui` subdirectory
- **Utilities**: Shared utilities in `/lib` (mainly `cn` utility for Tailwind class merging)
- **Styling**: Global styles in `app/globals.css`, theme definitions in Tailwind config