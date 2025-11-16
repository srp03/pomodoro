import { useLocalStorage } from '../hooks/useLocalStorage'

export default function Settings({ isOpen, onClose }) {
  const [focusDuration, setFocusDuration] = useLocalStorage('focusDuration', 25)
  const [breakDuration, setBreakDuration] = useLocalStorage('breakDuration', 5)
  const [soundEnabled, setSoundEnabled] = useLocalStorage('soundEnabled', false)
  const [autoStart, setAutoStart] = useLocalStorage('autoStart', false)

  if (!isOpen) return null

  const playSound = () => {
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
  }

  return (
    <div className="fixed inset-0 bg-forest-brown/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-forest-beige/95 to-forest-mint/80 backdrop-blur-md rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto border-2 border-forest-green/30 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-forest-green">⚙️ Settings</h2>
          <button
            onClick={onClose}
            className="text-3xl text-forest-brown hover:text-forest-green transition-colors transform hover:scale-110"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-forest-brown mb-3">Focus Duration</label>
            <div className="flex gap-3">
              {[25, 30, 50].map((duration) => (
                <button
                  key={duration}
                  onClick={() => setFocusDuration(duration)}
                  className={`flex-1 py-3 rounded-xl border-2 transition-all font-medium ${
                    focusDuration === duration
                      ? 'border-forest-green bg-forest-green text-white shadow-lg transform scale-105'
                      : 'border-forest-green/30 bg-white/60 text-forest-brown hover:border-forest-green/50 hover:bg-white/80'
                  }`}
                >
                  {duration} min
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-forest-brown mb-3">Break Duration</label>
            <div className="flex gap-3">
              {[5, 10].map((duration) => (
                <button
                  key={duration}
                  onClick={() => setBreakDuration(duration)}
                  className={`flex-1 py-3 rounded-xl border-2 transition-all font-medium ${
                    breakDuration === duration
                      ? 'border-forest-green bg-forest-green text-white shadow-lg transform scale-105'
                      : 'border-forest-green/30 bg-white/60 text-forest-brown hover:border-forest-green/50 hover:bg-white/80'
                  }`}
                >
                  {duration} min
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-forest-brown mb-3">Sound Alert</label>
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled)
                if (!soundEnabled) {
                  setTimeout(playSound, 100)
                }
              }}
              className={`w-full py-3 rounded-xl border-2 transition-all font-medium ${
                soundEnabled
                  ? 'border-forest-green bg-forest-green text-white shadow-lg'
                  : 'border-forest-green/30 bg-white/60 text-forest-brown hover:border-forest-green/50 hover:bg-white/80'
              }`}
            >
              {soundEnabled ? '🔔 Enabled' : '🔕 Disabled'}
            </button>
          </div>

          <div>
            <label className="block text-sm font-semibold text-forest-brown mb-3">Auto-Start Next Session</label>
            <button
              onClick={() => setAutoStart(!autoStart)}
              className={`w-full py-3 rounded-xl border-2 transition-all font-medium ${
                autoStart
                  ? 'border-forest-green bg-forest-green text-white shadow-lg'
                  : 'border-forest-green/30 bg-white/60 text-forest-brown hover:border-forest-green/50 hover:bg-white/80'
              }`}
            >
              {autoStart ? '✅ Enabled' : '❌ Disabled'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

