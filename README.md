# Talendojo Website

## Project Overview
This is a modern web application built with:
- Next.js 15.2.4
- TypeScript
- Tailwind CSS
- SchadCN Components
- Framer Motion for animations

## Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (version 18 or higher)
- npm or pnpm package manager
- Git

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd talendojowebsite1
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

## Development

To run the development server:
```bash
npm run dev
# or
pnpm dev
```

The development server will start at `http://localhost:3000`. The application supports hot-reloading, so any changes you make will be reflected immediately in the browser.

## Building for Production

To generate a static site for production:

1. Update `next.config.mjs` to enable static exports:
```javascript
export default {
  output: 'export',
  // ... other config options
}
```

2. Build the project:
```bash
npm run build
# or
pnpm build
```

This will create a static version of your site in the `out` directory.

## Deployment

The static site files will be in the `out` directory after building. You can deploy these files to any static hosting service:

1. **Vercel** (Recommended):
   - Simply connect your repository to Vercel
   - It will automatically detect Next.js and deploy accordingly

2. **Other Static Hosts** (Netlify, GitHub Pages, etc.):
   - Upload the contents of the `out` directory to your hosting provider
   - Configure your hosting provider to serve `index.html` for 404 routes

### Important Notes

- Ensure all dynamic routes are properly handled in `next.config.mjs`
- Test the static build locally before deploying:
  ```bash
  npx serve out
  ```
- The site uses client-side navigation for better performance
- All assets should be placed in the `public` directory

## Project Structure

```
talendojowebsite1/
├── app/           # Next.js app directory
├── components/    # React components
├── public/        # Static assets
├── styles/        # Global styles
├── lib/          # Utility functions
└── hooks/        # Custom React hooks
```

## Managing Video Content

### Location
Video content is managed in the `components/video-showcase.tsx` file. The videos are defined in the `videos` array at the beginning of the file.

### Data Structure
Each video entry requires the following properties:
```typescript
{
  id: number,           // Unique identifier for the video
  title: string,        // Title of the video
  description: string,  // Description of the video
  videoId: string,      // YouTube video ID
  thumbnail: string     // YouTube thumbnail URL
}
```

### Adding or Changing Videos
1. Locate the `videos` array in `components/video-showcase.tsx`
2. To add a new video:
   - Add a new object to the array
   - Increment the `id` field
   - Get the YouTube video ID from your video URL (e.g., 'dQw4w9WgXcQ' from 'https://youtube.com/watch?v=dQw4w9WgXcQ')
   - Set the thumbnail URL using the video ID: `https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg`

Example:
```typescript
const videos = [
  {
    id: 4,  // Increment from the last ID
    title: "New Feature Demo",
    description: "Showcase of our latest feature",
    videoId: "YOUR_VIDEO_ID",
    thumbnail: "https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg",
  },
  // ... existing videos
]
```

### Important Notes
- Always use high-quality video thumbnails (maxresdefault.jpg)
- The component includes a fallback to 'hqdefault.jpg' if maxresdefault is not available
- Keep descriptions concise but informative
- Ensure video IDs are correct and videos are accessible
- The first video in the array will be the default featured video
- Videos autoplay in sequence on the showcase section

## Additional Commands

- `npm run lint` - Run ESLint to check code quality
- `npm run start` - Start production server (for testing build)

## Support

For any additional help or questions, please refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives/overview/introduction)


## Author

Designed and developed by Shahid Mollick
