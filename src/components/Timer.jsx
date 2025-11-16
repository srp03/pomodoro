import { useEffect, useRef, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function Timer({ onSessionComplete }) {
  const [focusDuration] = useLocalStorage('focusDuration', 25)
  const [breakDuration] = useLocalStorage('breakDuration', 5)
  const [soundEnabled] = useLocalStorage('soundEnabled', false)
  const [autoStart] = useLocalStorage('autoStart', false)
  const [isBreak, setIsBreak] = useLocalStorage('isBreak', false)
  const [isRunning, setIsRunning] = useLocalStorage('isRunning', false)
  const initialTime = isBreak ? breakDuration * 60 : focusDuration * 60
  const [timeLeft, setTimeLeft] = useLocalStorage('timeLeft', initialTime)
  const intervalRef = useRef(null)
  const initializedRef = useRef(false)

  const playSound = useCallback(() => {
    if (soundEnabled) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = 800
      oscillator.type = 'sine'

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    }
  }, [soundEnabled])

  const handleTimerComplete = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    playSound()

    setIsBreak((prev) => {
      const newIsBreak = !prev
      if (!prev) {
        onSessionComplete()
      }
      setTimeLeft(newIsBreak ? breakDuration * 60 : focusDuration * 60)
      setIsRunning(autoStart)
      return newIsBreak
    })
  }, [playSound, onSessionComplete, breakDuration, focusDuration, autoStart])

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, handleTimerComplete])

  useEffect(() => {
    if (!initializedRef.current) {
      const savedTimeLeft = localStorage.getItem('timeLeft')
      if (!savedTimeLeft) {
        const targetTime = isBreak ? breakDuration * 60 : focusDuration * 60
        setTimeLeft(targetTime)
      }
      initializedRef.current = true
    }
  }, [])

  useEffect(() => {
    if (!isRunning && initializedRef.current) {
      const targetTime = isBreak ? breakDuration * 60 : focusDuration * 60
      if (Math.abs(timeLeft - targetTime) > 1) {
        setTimeLeft(targetTime)
      }
    }
  }, [focusDuration, breakDuration, isBreak, isRunning, setTimeLeft, timeLeft])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const handleStart = () => {
    setIsRunning(true)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(isBreak ? breakDuration * 60 : focusDuration * 60)
  }

  const currentDuration = isBreak ? breakDuration : focusDuration
  const progress = ((currentDuration * 60 - timeLeft) / (currentDuration * 60)) * 100
  const circumference = 2 * Math.PI * 120
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 relative">
      {/* Decorative leaves */}
      <div className="absolute top-10 left-10 text-forest-green/20 animate-float">
        <svg className="w-16 h-16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.5 2 5.5 4.5 4 8C2.5 11.5 3 15.5 5 18.5C7 21.5 10 22 12 22C14 22 17 21.5 19 18.5C21 15.5 21.5 11.5 20 8C18.5 4.5 15.5 2 12 2Z" />
        </svg>
      </div>
      <div className="absolute top-20 right-10 text-forest-green/15 animate-float-delayed">
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.5 2 5.5 4.5 4 8C2.5 11.5 3 15.5 5 18.5C7 21.5 10 22 12 22C14 22 17 21.5 19 18.5C21 15.5 21.5 11.5 20 8C18.5 4.5 15.5 2 12 2Z" />
        </svg>
      </div>

      <div className="mb-8 relative z-10">
        <div className="text-sm text-forest-green font-medium mb-4 text-center">
          {isBreak ? '🌿 Break Time' : '🌱 Focus Time'}
        </div>
        
        {/* Circular Progress Ring */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto">
          <svg className="transform -rotate-90 w-full h-full">
            {/* Background circle */}
            <circle
              cx="50%"
              cy="50%"
              r="120"
              fill="none"
              stroke="#E8F5E9"
              strokeWidth="12"
            />
            {/* Progress circle */}
            <circle
              cx="50%"
              cy="50%"
              r="120"
              fill="none"
              stroke={isBreak ? "#D5E8F5" : "#4CAF50"}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-1000 ease-out"
              style={{ filter: 'drop-shadow(0 0 8px rgba(76, 175, 80, 0.5))' }}
            />
          </svg>
          {/* Timer text in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="text-5xl sm:text-6xl md:text-7xl font-mono font-semibold text-forest-green transition-all duration-300"
              style={{
                transform: `scale(${1 + (progress / 100) * 0.05})`,
              }}
            >
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-8 z-10">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="px-8 py-3 rounded-full bg-forest-green text-white hover:bg-forest-green/90 transition-all transform hover:scale-105 shadow-lg font-medium"
          >
            Start
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="px-8 py-3 rounded-full bg-forest-brown text-white hover:bg-forest-brown/90 transition-all transform hover:scale-105 shadow-lg font-medium"
          >
            Pause
          </button>
        )}
        <button
          onClick={handleReset}
          className="px-8 py-3 rounded-full bg-white/80 backdrop-blur-sm border-2 border-forest-green/30 text-forest-green hover:bg-white transition-all transform hover:scale-105 shadow-sm font-medium"
        >
          Reset
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-xs h-2 bg-white/60 rounded-full overflow-hidden shadow-inner z-10">
        <div
          className="h-full bg-gradient-to-r from-forest-green to-forest-mint transition-all duration-1000 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

