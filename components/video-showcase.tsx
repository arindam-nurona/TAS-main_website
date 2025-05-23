"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Maximize, Volume2, VolumeX, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

// Updated video data with actual YouTube thumbnails
const videos = [
  {
    id: 1,
    title: "AI-Powered Technical Screening",
    description: "See how our platform automates the technical screening process with intelligent algorithms",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
  {
    id: 2,
    title: "Unbiased Candidate Evaluation",
    description: "Learn how we eliminate bias from the hiring process using advanced AI",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
  {
    id: 3,
    title: "Seamless Integration",
    description: "Discover how TalenDojo integrates with your existing workflow seamlessly",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
]

export default function VideoShowcase() {
  const [selectedVideo, setSelectedVideo] = useState<(typeof videos)[0] | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [autoplayVideo, setAutoplayVideo] = useState(0)
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showThumbnail, setShowThumbnail] = useState(true)
  const [thumbnailError, setThumbnailError] = useState<{[key: number]: boolean}>({})
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<HTMLIFrameElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const demoPlayerRef = useRef<HTMLIFrameElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const isMobile = useIsMobile()

  // Handle thumbnail loading error
  const handleThumbnailError = (index: number) => {
    setThumbnailError(prev => ({
      ...prev,
      [index]: true
    }))
  }
  
  // Get appropriate thumbnail URL with fallback
  const getThumbnailUrl = (videoId: string, index: number) => {
    if (thumbnailError[index]) {
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    }
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }
  
  // Auto-rotate featured video
  useEffect(() => {
    const interval = setInterval(() => {
      setAutoplayVideo((prev) => {
        const next = (prev + 1) % videos.length
        
        // Show thumbnail briefly before loading video
        setShowThumbnail(true)
        
        // Update the iframe src when changing videos
        setTimeout(() => {
          if (demoPlayerRef.current) {
            demoPlayerRef.current.src = `https://www.youtube.com/embed/${videos[next].videoId}?autoplay=1&mute=1&loop=1&playlist=${videos[next].videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&enablejsapi=1`
            
            // Hide thumbnail after video has loaded
            setTimeout(() => setShowThumbnail(false), 500)
          }
        }, 200)

        return next
      })
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  // Handle video selection
  const handleVideoSelect = (video: (typeof videos)[0]) => {
    setIsLoading(true)
    setSelectedVideo(video)
    document.body.style.overflow = "hidden"

    // Reset player state
    setIsPlaying(false)
    setIsMuted(false)

    // Simulate loading time
    setTimeout(() => setIsLoading(false), 1000)
  }

  // Handle modal close
  const handleCloseModal = () => {
    setSelectedVideo(null)
    setIsPlaying(false)
    setIsLoading(false)
    document.body.style.overflow = ""
  }

  // Handle play/pause
  const togglePlay = () => {
    if (playerRef.current) {
      const iframe = playerRef.current
      const message = isPlaying
        ? '{"event":"command","func":"pauseVideo","args":""}'
        : '{"event":"command","func":"playVideo","args":""}'
      iframe.contentWindow?.postMessage(message, "*")
      setIsPlaying(!isPlaying)
    }
  }

  // Handle mute/unmute
  const toggleMute = () => {
    if (playerRef.current) {
      const iframe = playerRef.current
      const message = isMuted
        ? '{"event":"command","func":"unMute","args":""}'
        : '{"event":"command","func":"mute","args":""}'
      iframe.contentWindow?.postMessage(message, "*")
      setIsMuted(!isMuted)
    }
  }

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (videoContainerRef.current) {
      if (!document.fullscreenElement) {
        videoContainerRef.current.requestFullscreen().catch((err) => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`)
        })
        setIsFullscreen(true)
      } else {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  // Listen for fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedVideo) {
        handleCloseModal()
      }
    }

    window.addEventListener("keydown", handleEscKey)
    return () => {
      window.removeEventListener("keydown", handleEscKey)
    }
  }, [selectedVideo])

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && selectedVideo) {
        handleCloseModal()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [selectedVideo])

  return (
    <section id="videos" className="section-spacing relative overflow-hidden" ref={sectionRef}>
      {/* Section background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-dot-pattern opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/98 to-background"></div>
        <div
          className="floating-orb w-72 h-72 bg-blue-500/10 top-1/4 right-1/4"
          style={{ animationDelay: "-3s" }}
        ></div>
      </div>

      <div className="container">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            See TalenDojo in Action
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Experience the future of <span className="text-gradient">technical hiring</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch how our AI-powered platform transforms technical hiring with real-world demonstrations
          </p>
        </motion.div>

        {/* Featured Demo Video (Autoplaying) */}
        <motion.div
          className="max-w-5xl mx-auto mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-primary/20 cursor-pointer group bg-gradient-to-br from-slate-900 to-slate-800"
            onClick={() => handleVideoSelect(videos[autoplayVideo])}
            onMouseEnter={() => setHoveredVideo(-1)}
            onMouseLeave={() => setHoveredVideo(null)}
          >
            {/* Video background */}
            <div className="w-full h-full">
              {/* Show thumbnail before video loads or when needed */}
              {showThumbnail && (
                <div className="absolute inset-0 z-5">
                  <img
                    src={getThumbnailUrl(videos[autoplayVideo].videoId, autoplayVideo)}
                    alt={videos[autoplayVideo].title}
                    className="w-full h-full object-cover"
                    onError={() => handleThumbnailError(autoplayVideo)}
                  />
                </div>
              )}
              
              <iframe
                ref={demoPlayerRef}
                src={`https://www.youtube.com/embed/${videos[autoplayVideo].videoId}?autoplay=1&mute=1&loop=1&playlist=${videos[autoplayVideo].videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&enablejsapi=1`}
                title="Featured Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="absolute inset-0 w-full h-full"
                style={{ opacity: showThumbnail ? 0 : 0.9 }}
                onLoad={() => setTimeout(() => setShowThumbnail(false), 500)}
              ></iframe>

              {/* Overlay to prevent immediate YouTube interaction */}
              <div className="absolute inset-0 z-5" onClick={(e) => e.preventDefault()}></div>
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>

            {/* Play button - properly centered */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: hoveredVideo === -1 ? 1 : 0,
                scale: hoveredVideo === -1 ? 1 : 0.8,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="bg-primary/90 backdrop-blur-sm rounded-full p-6 shadow-2xl shadow-primary/30 hover:bg-primary transition-all duration-300 hover:scale-110 border-2 border-white/20">
                <Play className="h-12 w-12 text-white ml-1" />
              </div>
            </motion.div>

            {/* Content - Hidden on mobile for autoplaying videos */}
            {(!isMobile) && (
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white z-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  key={autoplayVideo}
                  className="max-w-2xl"
                >
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                    {videos[autoplayVideo].title}
                  </h3>
                  <p className="text-lg md:text-xl text-white/90 mb-6">{videos[autoplayVideo].description}</p>

                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                  >
                    Watch Full Demo
                  </Button>
                </motion.div>
              </div>
            )}

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 8, ease: "linear", repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                key={autoplayVideo}
              />
            </div>
          </div>
        </motion.div>

        {/* Video Gallery - Desktop: Rectangle, Mobile: Circles */}
        <div className="mb-16">
          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                className={`group relative aspect-video rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${
                  index === autoplayVideo
                    ? "ring-4 ring-primary ring-offset-4 ring-offset-background shadow-2xl shadow-primary/20"
                    : "border border-primary/10 hover:border-primary/30"
                }`}
                onClick={() => handleVideoSelect(video)}
                onMouseEnter={() => setHoveredVideo(index)}
                onMouseLeave={() => setHoveredVideo(null)}
              >
                {/* Always show thumbnail for non-autoplaying videos */}
                <img
                  src={getThumbnailUrl(video.videoId, index)}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={() => handleThumbnailError(index)}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 group-hover:from-black/70 transition-colors duration-300 z-10"></div>

                {/* Active indicator */}
                {index === autoplayVideo && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-4 right-4 z-20"
                  >
                    <div className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                      Now Playing
                    </div>
                  </motion.div>
                )}

                {/* Play button - properly centered */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center z-20"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: hoveredVideo === index ? 1 : 0,
                    scale: hoveredVideo === index ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="bg-primary/90 backdrop-blur-sm rounded-full p-4 shadow-xl shadow-primary/20 hover:bg-primary transition-all duration-300 hover:scale-110 border-2 border-white/20">
                    <Play className="h-8 w-8 text-white ml-0.5" />
                  </div>
                </motion.div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-20">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {video.title}
                  </h3>
                  <p className="text-sm text-white/80 line-clamp-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    {video.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Layout - Circular */}
          <div className="md:hidden">
            <div className="flex justify-center items-center gap-6">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                  className={`group relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-110 ${
                    index === autoplayVideo
                      ? "ring-4 ring-primary ring-offset-4 ring-offset-background shadow-xl shadow-primary/30"
                      : "border-2 border-primary/20 hover:border-primary/50"
                  }`}
                  onClick={() => handleVideoSelect(video)}
                  onMouseEnter={() => setHoveredVideo(index)}
                  onMouseLeave={() => setHoveredVideo(null)}
                >
                  {/* Always show thumbnail for mobile videos */}
                  <img
                    src={getThumbnailUrl(video.videoId, index)}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={() => handleThumbnailError(index)}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/40 transition-colors duration-300 z-10"></div>

                  {/* Active indicator */}
                  {index === autoplayVideo && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 z-20"
                    >
                      <div className="w-full h-full rounded-full border-2 border-primary animate-pulse"></div>
                    </motion.div>
                  )}

                  {/* Play button - centered in circle */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center z-20"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                      opacity: hoveredVideo === index || index === autoplayVideo ? 1 : 0.7,
                      scale: hoveredVideo === index ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div className="bg-primary/90 backdrop-blur-sm rounded-full p-2 shadow-lg shadow-primary/20 hover:bg-primary transition-all duration-300">
                      <Play className="h-4 w-4 text-white ml-0.5" />
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Mobile video titles */}
            <div className="mt-6 text-center">
              <h3 className="text-lg font-semibold mb-2">{videos[autoplayVideo].title}</h3>
              <p className="text-sm text-muted-foreground">{videos[autoplayVideo].description}</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button asChild variant="gradient" size="lg" className="rounded-full px-8 py-6 text-lg btn-modern">
            <Link href="#contact" className="flex items-center">
              <span className="relative z-10">Get Your Personalized Demo</span>
              <ArrowRight className="relative z-10 ml-2 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Enhanced Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-5xl mx-4 bg-background/5 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              {/* Loading State */}
              {isLoading && (
                <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-white text-lg">Loading video...</p>
                  </div>
                </div>
              )}

              <div className="relative">
                <div className="absolute top-4 right-4 z-10">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm"
                    onClick={handleCloseModal}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div ref={videoContainerRef} className="relative aspect-video bg-black">
                  {/* Show thumbnail while iframe is loading */}
                  {isLoading && selectedVideo && (
                    <div className="absolute inset-0 z-5">
                      <img
                        src={getThumbnailUrl(selectedVideo.videoId, videos.findIndex(v => v.id === selectedVideo.id))}
                        alt={selectedVideo.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <iframe
                    ref={playerRef}
                    src={`https://www.youtube.com/embed/${selectedVideo.videoId}?enablejsapi=1&controls=1&rel=0&autoplay=1`}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="absolute inset-0 w-full h-full"
                  ></iframe>

                  {/* Enhanced Custom Controls */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={togglePlay}
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition-all hover:scale-110"
                        >
                          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </button>
                        <button
                          onClick={toggleMute}
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition-all hover:scale-110"
                        >
                          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>
                      </div>
                      <button
                        onClick={toggleFullscreen}
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition-all hover:scale-110"
                      >
                        <Maximize size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-slate-900/50 to-slate-800/50 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-2 text-white">{selectedVideo.title}</h3>
                <p className="text-white/70 mb-6">{selectedVideo.description}</p>

                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    className="rounded-full border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
                    onClick={handleCloseModal}
                  >
                    Close
                  </Button>

                  <Button asChild variant="gradient" className="rounded-full btn-modern">
                    <Link href="#contact" onClick={handleCloseModal}>
                      Get Full Demo
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
