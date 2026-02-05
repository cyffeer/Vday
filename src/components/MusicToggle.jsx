import React, { useRef, useState } from 'react'

export default function MusicToggle({src='/src/assets/romantic.mp3'}){
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  function toggle(){
    const a = audioRef.current
    if(!a) return
    if(playing){
      a.pause(); setPlaying(false)
    } else {
      a.play().catch(()=>{}); setPlaying(true)
    }
  }

  return (
    <div className="flex items-center space-x-3">
      <audio ref={audioRef} src={src} loop />
      <button onClick={toggle} className="btn-ghost">
        {playing ? 'Pause Music' : 'Play Music'}
      </button>
    </div>
  )
}
