import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

// Auto-import any images placed in src/assets/choices/
// Put your choice images there (jpg/png/webp). Vite will bundle them and
// they will be used automatically on the cards below.
const choiceModules = import.meta.glob('../assets/choices/*.{jpg,jpeg,png,webp}', { eager: true })
const choiceImages = Object.values(choiceModules).map(m => m?.default ?? m).filter(Boolean)

// Debugging: list imported choice images (check browser console)
console.debug('[DatePlaces] choiceImages count:', choiceImages.length)
console.debug('[DatePlaces] choiceImages:', choiceImages)

const datePlaces = [
  {
    id: 1,
    name: 'Din Tai Fung 🍜',
    description: 'Dahil nag crave ka last time',
    emoji: '☕',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400'
  },
  {
    id: 2,
    name: 'Cubao Expo',
    description: 'Hmmm pero baka madami tao',
    emoji: '🎬',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400'
  },
  {
    id: 3,
    name: 'Tablo',
    description: 'Fav place natin',
    emoji: '🌳',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400'
  },
  {
    id: 4,
    name: 'Ginza Gyu',
    description: 'Try natin yung Steak',
    emoji: '🍽️',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400'
  },
  {
    id: 5,
    name: 'Dean and Deluca',
    description: 'Burgers baby!',
    emoji: '🏖️',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400'
  },
  // 6th slot reserved for "Suggest a place" (custom entry)
]

export default function DatePlaces() {
  const [selected, setSelected] = useState(null)
  const [showCustom, setShowCustom] = useState(false)
  const [customName, setCustomName] = useState('')
  const [customDesc, setCustomDesc] = useState('')
  const navigate = useNavigate()

  function handleSelect(place) {
    setSelected(place)
  }

  function handleConfirm() {
    if (!selected) return
    // persist selection so Final page can show it
    try {
      localStorage.setItem('selectedPlace', JSON.stringify(selected))
    } catch (e) {
      // ignore localStorage errors
    }
    // Navigate to after-date activity picker
    navigate('/after-date')
  }

  return (
    <motion.div
      className="min-h-screen p-6 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-4xl text-pink-600 font-extrabold mb-3">
        Choose your resto? 💕
      </h1>
      <p className="text-gray-600 mb-8 text-center max-w-lg">
        
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
        {datePlaces.map((place, i) => {
          const isSelected = selected?.id === place.id
          return (
            <motion.button
              key={place.id}
              onClick={() => handleSelect(place)}
              className={`text-left bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 ${
                isSelected ? 'ring-4 ring-pink-500' : ''
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={choiceImages[i] ?? place.image}
                alt={place.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-pink-600 mb-1">
                  {place.name}
                </h3>
                <p className="text-gray-600 text-sm">{place.description}</p>
              </div>
              {isSelected && (
                <div className="absolute top-3 right-3 bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                  ✓
                </div>
              )}
            </motion.button>
          )
        })}

        {/* Other / Custom option */}
        <div className="relative">
          <button
            onClick={() => setShowCustom((s) => !s)}
            className={`w-full h-full text-left bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 p-4 flex items-center justify-center`}
          >
            <div>
              <div className="text-3xl text-pink-500 mb-2">➕</div>
              <div className="font-semibold">Suggest a resto</div>
              <div className="text-sm text-gray-500">Saan?</div>
            </div>
          </button>
        </div>
      </div>

      {showCustom && (
        <div className="mt-6 w-full max-w-2xl">
          <div className="bg-white p-4 rounded-lg shadow">
            <label className="block text-sm font-medium text-gray-700">Your choice</label>
            <input
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="e.g. Mcdo"
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
                  const place = {
                    id: 'custom',
                    name: customName.trim(),
                    description: customDesc.trim() || 'A special plan',
                    emoji: '💡',
                    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&auto=format&fit=crop&q=60'
                  }
                  setSelected(place)
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
            Let's do it! 💖
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
