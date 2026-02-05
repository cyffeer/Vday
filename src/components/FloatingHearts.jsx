import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

const heartEmojis = ['💕', '💗', '💖', '💝', '❤️', '💓', '💘', '✨', '🌟', '💫']

function Heart({ emoji, style, duration, delay }) {
  return (
    <motion.div
      className="absolute text-2xl select-none"
      style={style}
      initial={{ 
        y: 0, 
        opacity: 0.7,
        scale: 0.5
      }}
      animate={{ 
        y: [-20, -40, -20],
        opacity: [0.3, 0.8, 0.3],
        scale: [0.5, 1, 0.5],
        rotate: [0, 10, -10, 0]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      aria-hidden="true"
    >
      {emoji}
    </motion.div>
  )
}

export default function FloatingHearts({ count = 15 }) {
  const hearts = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const left = Math.random() * 100
      const top = Math.random() * 100
      const delay = Math.random() * 5
      const duration = 3 + Math.random() * 4
      const emoji = heartEmojis[Math.floor(Math.random() * heartEmojis.length)]
      const fontSize = 16 + Math.random() * 20
      
      return (
        <Heart
          key={i}
          emoji={emoji}
          duration={duration}
          delay={delay}
          style={{
            left: `${left}%`,
            top: `${top}%`,
            fontSize: `${fontSize}px`,
          }}
        />
      )
    })
  }, [count])

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {hearts}
    </div>
  )
}
