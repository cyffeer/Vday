import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

// Auto-import any images placed in src/assets/afterdate/
const afterModules = import.meta.glob('../assets/afterdate/*.{jpg,jpeg,png,webp}', { eager: true })
const afterImages = Object.values(afterModules).map(m => m?.default ?? m).filter(Boolean)

// Debugging: list imported after-date images (check browser console)
console.debug('[AfterDate] afterImages count:', afterImages.length)
console.debug('[AfterDate] afterImages:', afterImages)

const activities = [
  {
    id: 1,
    name: 'Movie Night 🎬',
    description: 'Watch a movie together',
    emoji: '🎬',
    // Movie theater interior
    image: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 2,
    name: 'Bowling & Arcade 🎳',
    description: 'Para makakuha tayo tickets and laro',
    emoji: '🎳',
    // Person bowling or arcade action shot
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 3,
    name: 'Coffee ☕',
    description: 'Para chill and relax lang',
    emoji: '☕',
    // Coffee shop interior with latte art
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 4,
    name: 'Cake Boutique 🎂',
    description: 'Para ma try natin gumawa cake',
    emoji: '🎂',
    // Person decorating a cake
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 5,
    name: 'Photo Booth 📸',
    description: 'Routine natin lagi',
    emoji: '📸',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop&q=60'
  }
]

export default function AfterDate() {
  const [selected, setSelected] = useState(null)
  const [showCustom, setShowCustom] = useState(false)
  const [customName, setCustomName] = useState('')
  const [customDesc, setCustomDesc] = useState('')
  const navigate = useNavigate()

  function handleSelect(activity) {
    setSelected(activity)
  }

  function handleConfirm() {
    if (!selected) return
    // persist selection so Final page can show it
    try {
      localStorage.setItem('selectedAfter', JSON.stringify(selected))
    } catch (e) {
      // ignore localStorage errors
    }
    navigate('/final')
  }

  return (
    <motion.div
      className="min-h-screen p-6 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-4xl text-pink-600 font-extrabold mb-3">
        After kain 💕
      </h1>
      <p className="text-gray-600 mb-8 text-center max-w-lg">
        If kaya pa after, ano pa gusto mo gawin baby?
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
        {activities.map((activity, i) => {
          const isSelected = selected?.id === activity.id
          return (
            <motion.button
              key={activity.id}
              onClick={() => handleSelect(activity)}
              className={`text-left bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 ${
                isSelected ? 'ring-4 ring-pink-500' : ''
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={afterImages[i] ?? activity.image}
                alt={activity.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-pink-600 mb-1">
                  {activity.name}
                </h3>
                <p className="text-gray-600 text-sm">{activity.description}</p>
              </div>
              {isSelected && (
                <div className="absolute top-3 right-3 bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                  ✓
                </div>
              )}
            </motion.button>
          )
        })}

        {/* Custom option */}
        <div className="relative">
          <button
            onClick={() => setShowCustom((s) => !s)}
            className={`w-full h-full text-left bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 p-4 flex items-center justify-center`}
          >
            <div>
              <div className="text-3xl text-pink-500 mb-2">➕</div>
              <div className="font-semibold">Something else</div>
              <div className="text-sm text-gray-500">Your idea</div>
            </div>
          </button>
        </div>
      </div>

      {showCustom && (
        <div className="mt-6 w-full max-w-2xl">
          <div className="bg-white p-4 rounded-lg shadow">
            <label className="block text-sm font-medium text-gray-700">Your idea</label>
            <input
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="e.g. Walk in the park"
              className="mt-2 w-full border rounded px-3 py-2"
            />
            <label className="block text-sm font-medium text-gray-700 mt-3">Notes (optional)</label>
            <input
              value={customDesc}
              onChange={(e) => setCustomDesc(e.target.value)}
              placeholder="Short note"
              className="mt-2 w-full border rounded px-3 py-2"
            />
            <div className="mt-3 flex space-x-2">
              <button
                onClick={() => {
                  if (!customName.trim()) return
                  const activity = {
                    id: 'custom',
                    name: customName.trim(),
                    description: customDesc.trim() || 'Something special',
                    emoji: '💡',
                    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&auto=format&fit=crop&q=60'
                  }
                  setSelected(activity)
                  setShowCustom(false)
                }}
                className="btn-primary"
              >
                Select this
              </button>
              <button onClick={() => { setShowCustom(false); setCustomName(''); setCustomDesc('') }} className="btn-ghost">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {selected && (
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button onClick={handleConfirm} className="btn-primary px-8 py-3 text-lg">
            Perfect! 💖
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
