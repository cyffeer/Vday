import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ConfettiEffect from '../components/ConfettiEffect'

export default function Final() {
  // show selected place and after-date activity stored in localStorage (if any)
  let selectedPlace = null
  let selectedAfter = null
  try {
    const rawPlace = typeof window !== 'undefined' && window.localStorage.getItem('selectedPlace')
    if (rawPlace) selectedPlace = JSON.parse(rawPlace)
    
    const rawAfter = typeof window !== 'undefined' && window.localStorage.getItem('selectedAfter')
    if (rawAfter) selectedAfter = JSON.parse(rawAfter)
  } catch (e) {
    selectedPlace = null
    selectedAfter = null
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ConfettiEffect play={true} />
      
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl opacity-30"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 500), 
              y: (typeof window !== 'undefined' ? window.innerHeight : 500) + 50 
            }}
            animate={{ 
              y: -50,
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 10 + Math.random() * 5, 
              repeat: Infinity, 
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            {['💕', '💗', '💖', '✨', '🌟'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>
      
      <motion.div
        className="text-center z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <motion.div
          className="text-8xl mb-6"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💕
        </motion.div>
        
        <h1 className="text-4xl md:text-6xl gradient-text font-extrabold mb-6 text-center">
          I can't wait! ✨
        </h1>

        {(selectedPlace || selectedAfter) ? (
          <motion.div 
            className="text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-lg text-gray-600 mb-6">Our Valentine's Plan 💝</p>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
              {selectedPlace && (
                <motion.div 
                  className="glass-card rounded-2xl p-6 min-w-[250px] border border-pink-200/50"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-4xl mb-3">🍽️</div>
                  <p className="text-sm text-pink-400 font-medium mb-1">Dinner at</p>
                  <h2 className="text-2xl font-bold gradient-text mb-2">{selectedPlace.name}</h2>
                  <p className="text-gray-600 text-sm">{selectedPlace.description}</p>
                </motion.div>
              )}
              
              {selectedPlace && selectedAfter && (
                <div className="flex items-center justify-center">
                  <motion.span 
                    className="text-3xl"
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </div>
              )}
              
              {selectedAfter && (
                <motion.div 
                  className="glass-card rounded-2xl p-6 min-w-[250px] border border-pink-200/50"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-4xl mb-3">🎉</div>
                  <p className="text-sm text-pink-400 font-medium mb-1">Then we'll</p>
                  <h2 className="text-2xl font-bold gradient-text mb-2">{selectedAfter.name}</h2>
                  <p className="text-gray-600 text-sm">{selectedAfter.description}</p>
                </motion.div>
              )}
            </div>
            
            <motion.p 
              className="text-xl text-pink-500 mt-8 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              It's going to be perfect! I love you so much! 💖
            </motion.p>
          </motion.div>
        ) : (
          <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
            This is going to be the best date ever. Thank you for saying yes! 💖
          </p>
        )}

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 mt-10 justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link to="/" className="btn-primary px-8 py-3 shadow-glow">
            🏠 Back to Home
          </Link>
          <Link to="/memories" className="btn-ghost px-8 py-3">
            📸 See Our Memories
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
