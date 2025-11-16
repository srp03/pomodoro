import LeafIcon from '../assets/LeafIcon'

export default function Header({ onSettingsClick, onGardenClick, showGarden }) {
  return (
    <header className="w-full px-6 py-4 flex justify-between items-center">
      <button
        onClick={onGardenClick}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-forest-green/20 text-forest-green hover:bg-white/80 transition-all transform hover:scale-105 shadow-sm"
      >
        <LeafIcon className="w-4 h-4" />
        <span className="text-sm sm:text-base font-medium">
          {showGarden ? 'Timer' : 'Garden'}
        </span>
      </button>
      <button
        onClick={onSettingsClick}
        className="px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-forest-green/20 text-forest-green hover:bg-white/80 transition-all transform hover:scale-105 shadow-sm"
      >
        <span className="text-sm sm:text-base font-medium">Settings</span>
      </button>
    </header>
  )
}

