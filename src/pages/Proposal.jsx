import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Proposal(){
  const navigate = useNavigate()
  const [pos, setPos] = useState({left: '65%', top: '50%'})
  const [noCount, setNoCount] = useState(0)
  const [yesScale, setYesScale] = useState(1)

  const noMessages = [
    "NO 😅",
    "Are you sure? 🥺",
    "Really really sure? 😢",
    "Think again! 💭",
    "Last chance! 😭",
    "Don't do this! 💔",
    "I'll be sad... 😿",
    "Please? 🙏",
  ]

  function moveRandom(){
    const left = Math.random() * 70 + 10
    const top = Math.random() * 50 + 25
    setPos({left: `${left}%`, top: `${top}%`})
    setNoCount(prev => Math.min(prev + 1, noMessages.length - 1))
    setYesScale(prev => Math.min(prev + 0.15, 2))
  }

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden" 
      initial={{opacity:0}} 
      animate={{opacity:1}} 
      exit={{opacity:0}}
    >
      {/* Decorative hearts in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl opacity-20"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: window.innerHeight + 50 
            }}
            animate={{ 
              y: -50,
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 8 + Math.random() * 5, 
              repeat: Infinity, 
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            {['💕', '💗', '💖', '💝', '❤️'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="glass-card bg-white/80 p-10 rounded-3xl text-center max-w-lg relative z-10 border border-pink-200/50"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <motion.div
          className="text-6xl mb-4"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
        >
          💘
        </motion.div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold gradient-text mb-4">
          Will you be my Valentine?
        </h1>
        
        <p className="text-gray-600 mb-8 text-lg">
          Finally makakapag date uli tayo ng Valentines. 🥰
        </p>
        
        <div className="relative" style={{height: 150}}>
          <motion.button 
            onClick={() => navigate('/yes')} 
            className="btn-primary px-8 py-4 text-xl font-bold shadow-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: yesScale }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            YES 💖
          </motion.button>

          <motion.button
            onMouseEnter={moveRandom}
            onClick={moveRandom}
            className="btn-ghost px-6 py-3 absolute whitespace-nowrap transition-all duration-200"
            style={{left: pos.left, top: pos.top, transform: 'translate(-50%, -50%)'}}
            whileHover={{ scale: 0.9 }}
          >
            {noMessages[noCount]}
          </motion.button>
        </div>
        
        {noCount > 2 && (
          <motion.p 
            className="text-pink-400 mt-4 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            The YES button is getting bigger... just saying 😉
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  )
}
