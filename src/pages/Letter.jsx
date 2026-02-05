import React, { useState } from 'react'
import TypewriterText from '../components/TypewriterText'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const letterText = `
 Hi Baby,

Gusto ko lang sabihin na sobrang swerte ko sayo kasi pinagbigyan at pinatulan mo ako. HAHAHA.

Kidding aside, sobrang grateful ako kasi nandiyan ka palagi through ups and downs. Alam ko na hindi ako perfect, pero you still choose to love me for who I am, and I really appreciate that.

Ang saya lang isipin na pareho na tayong nagststart sa careers natin, and sabay tayong naggr-grow. Nakaka-proud ka sobra.

Ikaw yung laging nagpapasaya sakin, nagbibigay ng pahinga, and nag-iinspire sakin to do better every day.

Ngayon, gusto ko lang sabihin sayo na mahal na mahal kita. Thank you for being my pahinga, my happiness, and my home.

I will always love you baby. 💕
`; 

export default function Letter(){
  const [isComplete, setIsComplete] = useState(false)
  
  return (
    <motion.div 
      className="min-h-screen p-6 flex flex-col items-center justify-center relative overflow-hidden pt-20" 
      initial={{opacity:0}} 
      animate={{opacity:1}} 
      exit={{opacity:0}}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-30"
            style={{
              left: `${10 + (i % 4) * 25}%`,
              top: `${15 + Math.floor(i / 4) * 60}%`
            }}
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 3 + i * 0.5, 
              repeat: Infinity,
              delay: i * 0.3
            }}
          >
            {['💌', '✨', '💕', '🌸'][i % 4]}
          </motion.div>
        ))}
      </div>
      
      <motion.h2 
        className="text-4xl md:text-5xl gradient-text font-bold mb-8 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        💌 A Letter for You
      </motion.h2>
      
      <motion.div 
        className="relative max-w-2xl w-full"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {/* Paper effect */}
        <div className="absolute inset-0 bg-amber-50/50 rounded-2xl transform rotate-1" />
        <div className="absolute inset-0 bg-amber-50/30 rounded-2xl transform -rotate-1" />
        
        <div className="relative bg-white/90 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-xl border border-pink-100"
          style={{
            backgroundImage: `linear-gradient(to bottom, transparent 95%, rgba(255,182,193,0.3) 95%)`,
            backgroundSize: '100% 2rem',
            lineHeight: '2rem'
          }}
        >
          {/* Envelope seal decoration */}
          <motion.div 
            className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-4xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💗
          </motion.div>
          
          <div className="prose prose-pink max-w-none font-serif text-gray-700 leading-relaxed">
            <TypewriterText 
              text={letterText} 
              speed={25} 
              onComplete={() => setIsComplete(true)}
            />
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: isComplete ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link 
          to="/proposal" 
          className="btn-primary text-lg px-8 py-4 shadow-glow inline-flex items-center gap-2"
        >
          <span>One last thing…</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            💝
          </motion.span>
        </Link>
      </motion.div>
    </motion.div>
  )
}
