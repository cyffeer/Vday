import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Landing from './pages/Landing'
import Memories from './pages/Memories'
import Letter from './pages/Letter'
import Proposal from './pages/Proposal'
import Yes from './pages/Yes'
import DatePlaces from './pages/DatePlaces'
import AfterDate from './pages/AfterDate'
import Final from './pages/Final'
import Navbar from './components/Navbar'
import GlobalMusicPlayer from './components/GlobalMusicPlayer'
import FloatingHearts from './components/FloatingHearts'

// Import background music
import backgroundMusic from './assets/music/Spandau Ballet   True Instrumental Original Official.mp3'

export default function App(){
  const location = useLocation()

  return (
    <div className="min-h-screen relative">
      {/* Global floating hearts - subtle background */}
      <FloatingHearts count={12} />
      
      <Navbar />
      <main className="pt-16"> {/* Padding for fixed navbar */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Landing />} />
            <Route path="/memories" element={<Memories />} />
            <Route path="/letter" element={<Letter />} />
            <Route path="/proposal" element={<Proposal />} />
            <Route path="/yes" element={<Yes />} />
            <Route path="/date-places" element={<DatePlaces />} />
            <Route path="/after-date" element={<AfterDate />} />
            <Route path="/final" element={<Final />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      {/* Global music player - fixed position bottom-right */}
      <GlobalMusicPlayer src={backgroundMusic} />
    </div>
  )
}
