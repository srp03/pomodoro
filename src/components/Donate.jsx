export default function Donate() {
  return (
    <footer className="w-full px-6 py-8 mt-12">
      <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 border-2 border-forest-green/20 shadow-lg max-w-2xl mx-auto">
        <h3 className="text-xl font-bold text-forest-green mb-4 text-center">💝 Support This Project</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://www.buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-forest-yellow to-forest-brown text-forest-brown font-semibold hover:shadow-lg transition-all transform hover:scale-105 text-sm shadow-md flex items-center gap-2"
          >
            <span>☕</span>
            <span>Buy Me a Coffee</span>
          </a>
          <a
            href="https://ko-fi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-forest-blue to-blue-300 text-blue-700 font-semibold hover:shadow-lg transition-all transform hover:scale-105 text-sm shadow-md flex items-center gap-2"
          >
            <span>💙</span>
            <span>Ko-Fi</span>
          </a>
          <a
            href="https://github.com/sponsors"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-200 to-pink-300 text-pink-700 font-semibold hover:shadow-lg transition-all transform hover:scale-105 text-sm shadow-md flex items-center gap-2"
          >
            <span>💖</span>
            <span>GitHub Sponsors</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

