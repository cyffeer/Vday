import React, { useEffect, useState, useRef } from 'react'

export default function TypewriterText({text='', speed=40, className='', onComplete}){
  const [display, setDisplay] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const onCompleteRef = useRef(onComplete)
  
  // Keep the ref updated with the latest callback
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    setDisplay('')
    setIsComplete(false)
    let i = 0
    const id = setInterval(() => {
      setDisplay(prev => prev + text.charAt(i))
      i++
      if(i >= text.length) {
        clearInterval(id)
        setIsComplete(true)
        if (onCompleteRef.current) onCompleteRef.current()
      }
    }, speed)
    return () => clearInterval(id)
  }, [text, speed]) // removed onComplete from deps

  return (
    <div className={`prose prose-pink max-w-none ${className}`}>
      <p style={{whiteSpace: 'pre-wrap'}}>
        {display}
        {!isComplete && <span className="ml-1 animate-pulse text-pink-400">|</span>}
      </p>
    </div>
  )
}
