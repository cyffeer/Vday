import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Navbar(){
  const location = useLocation()
  const isHome = location.pathname === '/'
  
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-50 glass-card border-b border-pink-200/30"
    >
      <Link to="/" className="group flex items-center gap-2">
        <span className="text-2xl">💕</span>
        <span className="text-xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-red-400 bg-clip-text text-transparent group-hover:from-pink-600 group-hover:to-red-500 transition-all">
          Baby
        </span>
      </Link>
      
      {!isHome && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-1 text-sm text-pink-400"
        >
          <span className="animate-pulse">💗</span>
          <span className="font-medium">For You</span>
        </motion.div>
      )}
    </motion.nav>
  )
}
