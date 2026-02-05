import React from 'react'

export default function MemoryCard({image, caption, onNext}){
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-101 transition">
      {/* Main image: use object-contain and limit max height so the whole image is visible */}
      <div className="w-full flex items-center justify-center bg-gray-50">
        <img src={image} alt={caption} className="w-full max-h-[60vh] object-contain" />
      </div>
      <div className="p-4">
        <p className="text-gray-700">{caption}</p>
        {onNext && (
          <button onClick={onNext} className="mt-3 btn-primary">Next</button>
        )}
      </div>
    </div>
  )
}
