import { useState, useEffect } from 'react'

export default function Quote() {
  const [quote, setQuote] = useState('Loading...')
  const [author, setAuthor] = useState('')

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('https://api.quotable.io/random')
        if (response.ok) {
          const data = await response.json()
          setQuote(data.content)
          setAuthor(data.author)
        } else {
          throw new Error('Failed to fetch')
        }
      } catch (error) {
        setQuote('The way to get started is to quit talking and begin doing.')
        setAuthor('Walt Disney')
      }
    }

    fetchQuote()
    const interval = setInterval(fetchQuote, 24 * 60 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center px-6 py-8 max-w-2xl mx-auto relative">
      {/* Decorative leaf corners */}
      <div className="absolute top-0 left-0 text-forest-green/20">
        <svg className="w-12 h-12 transform rotate-45" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.5 2 5.5 4.5 4 8C2.5 11.5 3 15.5 5 18.5C7 21.5 10 22 12 22C14 22 17 21.5 19 18.5C21 15.5 21.5 11.5 20 8C18.5 4.5 15.5 2 12 2Z" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 text-forest-green/20">
        <svg className="w-12 h-12 transform -rotate-45" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.5 2 5.5 4.5 4 8C2.5 11.5 3 15.5 5 18.5C7 21.5 10 22 12 22C14 22 17 21.5 19 18.5C21 15.5 21.5 11.5 20 8C18.5 4.5 15.5 2 12 2Z" />
        </svg>
      </div>

      <div className="bg-gradient-to-br from-forest-mint/80 via-forest-blue/60 to-forest-yellow/40 backdrop-blur-sm rounded-3xl p-8 border-2 border-forest-green/20 shadow-lg relative z-10">
        <p className="text-base sm:text-lg text-forest-brown leading-relaxed mb-4 font-medium italic">
          "{quote}"
        </p>
        <p className="text-sm text-forest-brown/70 font-semibold">— {author}</p>
      </div>
    </div>
  )
}

