import React from 'react'
import { Link } from 'react-router-dom'
import FloatingHearts from '../components/FloatingHearts'
import { motion } from 'framer-motion'

export default function Landing(){
  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      <FloatingHearts count={20} />

      {/* Decorative background circles */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-pink-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-32 right-10 w-48 h-48 bg-rose-200/30 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-red-200/20 rounded-full blur-2xl"></div>

      <motion.div 
        className="max-w-xl z-10"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
      >
        {/* Heart icon above title */}
        <motion.div 
          className="text-6xl mb-4"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          💕
        </motion.div>

        <h1 className="text-6xl md:text-7xl font-extrabold romantic-title mb-4 text-glow">
          Hi Baby
        </h1>
        
        <motion.p 
          className="text-xl text-gray-600 mb-8 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          This is for you ✨
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Link to="/memories" className="btn-primary text-lg px-8 py-4 pulse-glow">
            Hope you'll like it hehe 💖
          </Link>
        </motion.div>
      </motion.div>

      {/* Decorative bottom hearts */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-4 opacity-50">
        <span className="text-2xl animate-bounce" style={{ animationDelay: '0s' }}>💗</span>
        <span className="text-3xl animate-bounce" style={{ animationDelay: '0.2s' }}>💖</span>
        <span className="text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>💗</span>
      </div>
    </motion.div>
  )
}
