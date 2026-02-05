import React, { useEffect } from 'react'
import confetti from 'canvas-confetti'

export default function ConfettiEffect({play=true}){
  useEffect(() => {
    if(!play) return
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { origin: { y: 0.6 } }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) return clearInterval(interval)

      const particleCount = 50 * (timeLeft / duration)
      // since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, {
        particleCount: Math.floor(particleCount),
        spread: 60,
        startVelocity: 30
      }))
    }, 250)

    return () => clearInterval(interval)
  }, [play])

  return null
}
