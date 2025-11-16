import { useState, useMemo } from 'react'
import Header from './components/Header'
import ClockWidget from './components/ClockWidget'
import Timer from './components/Timer'
import Quote from './components/Quote'
import TodoList from './components/TodoList'
import Garden from './components/Garden'
import Donate from './components/Donate'
import Settings from './components/Settings'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const [showSettings, setShowSettings] = useState(false)
  const [showGarden, setShowGarden] = useState(false)
  const [seeds, setSeeds] = useLocalStorage('seeds', 0)

  const handleSessionComplete = () => {
    setSeeds(seeds + 1)
  }

  // Generate leaf positions once
  const leafPositions = useMemo(() => {
    return Array.from({ length: 8 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 8 + Math.random() * 4,
    }))
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-forest-gradient animate-pulse opacity-80"></div>
      
      {/* Floating leaves decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {leafPositions.map((leaf, i) => (
          <div
            key={i}
            className="absolute text-forest-green/10 animate-float"
            style={{
              left: `${leaf.left}%`,
              top: `${leaf.top}%`,
              animationDelay: `${leaf.delay}s`,
              animationDuration: `${leaf.duration}s`,
            }}
          >
            <svg className="w-16 h-16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.5 2 5.5 4.5 4 8C2.5 11.5 3 15.5 5 18.5C7 21.5 10 22 12 22C14 22 17 21.5 19 18.5C21 15.5 21.5 11.5 20 8C18.5 4.5 15.5 2 12 2Z" />
            </svg>
          </div>
        ))}
      </div>

      <div className="relative z-10">
        <Header
          onSettingsClick={() => setShowSettings(true)}
          onGardenClick={() => setShowGarden(!showGarden)}
          showGarden={showGarden}
        />
        
        <div className="pt-4 pb-8 flex justify-center">
          <ClockWidget />
        </div>

        {showGarden ? (
          <Garden />
        ) : (
          <>
            <Timer onSessionComplete={handleSessionComplete} />
            <Quote />
            <TodoList />
            <Donate />
          </>
        )}

        <Settings
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
        />
      </div>
    </div>
  )
}

export default App

