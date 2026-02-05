import React, { useState } from 'react'
import MemoryCard from '../components/MemoryCard'
import { motion } from 'framer-motion'

// Vite's import.meta.glob MUST be called at top-level (not inside if/else)
// so Vite can statically analyze and transform it at build time.
const modules = import.meta.glob('../assets/memories/*.{jpg,jpeg,png,webp}', { eager: true })

const images = Object.values(modules)
  .map((m) => m?.default ?? m)
  .filter(Boolean)

// Provide default captions (will rotate if there are more images than captions)
const defaultCaptions = [
  'Unang picture 💕',
  'Prom natin 💃🕺',
  'First labas natin 🥰',
  'Number 1 Fan kahit bangko ako HAHAHA',
  'Nung sinagot mo ako hehe',
  'Nabaliw ka siguro sa akin dito',
  'Bday date',
  'Elyu',
]

export default function Memories() {
  const [index, setIndex] = useState(0)

  // Debug logs — check browser console
  console.debug('[Memories] images count:', images.length)
  console.debug('[Memories] images:', images)

  function next() {
    if(images.length === 0) return
    setIndex((i) => (i + 1) % images.length)
  }

  const hasImages = images.length > 0
  const current = hasImages ? images[index] : 'https://picsum.photos/seed/1/800/600'
  const caption = hasImages ? (defaultCaptions[index % defaultCaptions.length] || 'Memory') : 'Our first date 💕'

  return (
    <motion.div className="min-h-screen p-6 flex flex-col items-center" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
      <h2 className="text-3xl text-pink-600 font-bold mb-4">Memories</h2>
      <div className="w-full max-w-2xl">
        <MemoryCard image={current} caption={caption} onNext={next} />
      </div>
      {hasImages && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl w-full">
          {images.map((src, i) => (
            <button key={i} onClick={() => setIndex(i)} className="focus:outline-none">
              <img src={src} alt={`thumb-${i}`} className="w-full h-24 object-contain rounded-md shadow-sm bg-white p-1" />
            </button>
          ))}
        </div>
      )}
      <div className="mt-6">
        <a href="/letter" className="btn-primary">Next</a>
      </div>
    </motion.div>
  )
}
