import React, { useEffect, useState } from 'react'
import ConfettiEffect from '../components/ConfettiEffect'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Yes(){
  const [showContent, setShowContent] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const celebrationEmojis = ['🎉', '💖', '🥳', '💕', '✨', '🎊', '💗', '🌟']
  
  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden" 
      initial={{opacity:0}} 
      animate={{opacity:1}} 
      exit={{opacity:0}}
    >
      <ConfettiEffect play={true} />
      
      {/* Floating celebration emojis */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 500), 
              y: (typeof window !== 'undefined' ? window.innerHeight : 500) + 100,
              opacity: 0
            }}
            animate={{ 
              y: -100,
              opacity: [0, 1, 1, 0],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 4 + Math.random() * 3, 
              repeat: Infinity, 
              delay: Math.random() * 3,
              ease: "easeOut"
            }}
          >
            {celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)]}
          </motion.div>
        ))}
      </div>
      
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="text-center z-10"
          >
            <motion.div 
              className="text-8xl mb-6"
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 15, -15, 0]
              }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
            >
              💖
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold gradient-text mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              YAYYYY!
            </motion.h1>
            
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-pink-500 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              I LOVE YOUUU ❤️❤️❤️
            </motion.h2>
            
            <motion.p
              className="text-xl text-gray-600 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Kinilig ako dito! Can't wait for our date! 🥰
            </motion.p>
            
            <div className="flex justify-center space-x-3 mb-8">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: ['#FF6B6B', '#FF8E8E', '#FFB1B1', '#FF8E8E', '#FF6B6B'][i] }}
                  animate={{ 
                    scale: [1, 1.5, 1],
                    y: [0, -10, 0]
                  }}
                  transition={{ 
                    duration: 0.6, 
                    repeat: Infinity, 
                    delay: i * 0.1 
                  }}
                />
              ))}
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link to="/date-places" className="btn-primary text-lg px-8 py-4 shadow-glow">
                Where should we go? 💕
              </Link>
              <Link to="/" className="btn-ghost text-lg px-8 py-4">
                🔄 Replay
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
