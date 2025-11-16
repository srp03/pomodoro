import { useLocalStorage } from '../hooks/useLocalStorage'
import { SeedIcon, SproutIcon, PlantIcon, TreeIcon } from '../assets/PlantIcons'

export default function Garden() {
  const [seeds, setSeeds] = useLocalStorage('seeds', 0)

  const getPlantStage = (seedCount) => {
    if (seedCount === 0) return null
    if (seedCount <= 2) return 'seed'
    if (seedCount <= 5) return 'sprout'
    if (seedCount <= 10) return 'plant'
    return 'tree'
  }

  const getPlantComponent = (stage, index) => {
    const baseClass = "w-full h-full animate-grow"
    switch (stage) {
      case 'seed':
        return <SeedIcon className={baseClass} />
      case 'sprout':
        return <SproutIcon className={baseClass} />
      case 'plant':
        return <PlantIcon className={baseClass} />
      case 'tree':
        return <TreeIcon className={baseClass} />
      default:
        return null
    }
  }

  const stage = getPlantStage(seeds)

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12 relative overflow-hidden">
      {/* Sunlight gradient background */}
      <div className="absolute inset-0 bg-sunlight-gradient opacity-60"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-forest-yellow/40 rounded-full animate-float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <h2 className="text-4xl font-bold mb-8 text-center text-forest-green drop-shadow-sm">
          🌿 Your Garden 🌿
        </h2>
        
        {/* Main plant display */}
        <div className="text-center mb-8 bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-forest-green/20">
          <div className="mb-4 flex justify-center">
            {seeds > 0 ? (
              <div className="animate-grow">
                {getPlantComponent(stage, 0)}
              </div>
            ) : (
              <div className="text-6xl opacity-50">🌱</div>
            )}
          </div>
          <div className="text-3xl font-bold text-forest-green mb-2">{seeds}</div>
          <div className="text-sm text-forest-brown font-medium">
            {stage ? `${stage.charAt(0).toUpperCase() + stage.slice(1)} Stage` : 'No seeds yet - Start focusing!'}
          </div>
        </div>

        {/* Garden grid */}
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-forest-green/20 mb-6">
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
            {Array.from({ length: 20 }).map((_, index) => {
              const plantStage = index < seeds ? getPlantStage(index + 1) : null
              return (
                <div
                  key={index}
                  className="aspect-square flex items-end justify-center rounded-2xl bg-gradient-to-b from-forest-beige to-forest-brown/30 border-2 border-forest-brown/20 shadow-sm hover:shadow-md transition-all overflow-hidden relative"
                >
                  {plantStage ? (
                    <div className="absolute inset-0 flex items-center justify-center p-2">
                      {getPlantComponent(plantStage, index)}
                    </div>
                  ) : (
                    <div className="w-full h-2 bg-forest-brown/20 rounded-b-2xl"></div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Soil card */}
        <div className="bg-gradient-to-b from-forest-brown/40 to-forest-brown/60 rounded-2xl p-4 text-center shadow-lg border border-forest-brown/30">
          <p className="text-forest-beige text-sm font-medium">
            Complete focus sessions to earn seeds and grow your garden 🌱
          </p>
        </div>
      </div>
    </div>
  )
}

