import React, { useRef, useState, useEffect } from 'react'

// Global music player that persists across pages
// Place your mp3 file at: src/assets/romantic.mp3
// Or use a direct URL to an mp3 file

export default function GlobalMusicPlayer({ src = '/src/assets/romantic.mp3' }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.15) // Low volume by default (15%)
  const [showControls, setShowControls] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Set initial volume to low
    audio.volume = volume

    // Try to autoplay on first user interaction
    const tryAutoplay = () => {
      audio.play()
        .then(() => setPlaying(true))
        .catch(() => {
          // Autoplay blocked - user needs to click
          console.debug('[Music] Autoplay blocked, waiting for user interaction')
        })
      // Remove listener after first attempt
      document.removeEventListener('click', tryAutoplay)
      document.removeEventListener('touchstart', tryAutoplay)
    }

    // Listen for first user interaction to start music
    document.addEventListener('click', tryAutoplay, { once: true })
    document.addEventListener('touchstart', tryAutoplay, { once: true })

    return () => {
      document.removeEventListener('click', tryAutoplay)
      document.removeEventListener('touchstart', tryAutoplay)
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  function toggle() {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      a.pause()
      setPlaying(false)
    } else {
      a.play().catch(() => {})
      setPlaying(true)
    }
  }

  return (
    <div className="music-player">
      <audio ref={audioRef} src={src} loop preload="auto" />
      
      <div 
        className="relative"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Volume slider - shows on hover */}
        {showControls && (
          <div className="absolute bottom-full right-0 mb-2 p-3 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-pink-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gray-500">🔈</span>
              <input
                type="range"
                min="0"
                max="0.5"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-24 h-1 bg-pink-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
              <span className="text-xs text-gray-500">🔊</span>
            </div>
            <p className="text-xs text-gray-400 text-center">Volume: {Math.round(volume * 200)}%</p>
          </div>
        )}

        {/* Main button */}
        <button
          onClick={toggle}
          className={`
            w-14 h-14 rounded-full flex items-center justify-center
            transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110
            ${playing 
              ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white pulse-glow' 
              : 'bg-white/90 backdrop-blur-sm text-pink-500 border-2 border-pink-200'
            }
          `}
          title={playing ? 'Pause Music' : 'Play Music'}
        >
          {playing ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>
        
        {/* Music note animation when playing */}
        {playing && (
          <div className="absolute -top-1 -right-1">
            <span className="text-sm animate-bounce">🎵</span>
          </div>
        )}
      </div>
    </div>
  )
}
