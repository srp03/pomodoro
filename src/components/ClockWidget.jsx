import { useState, useEffect } from 'react'

export default function ClockWidget() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  }

  const formatDate = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]
    const day = days[date.getDay()]
    const dayNum = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    return `${day}, ${dayNum} ${month} ${year}`
  }

  return (
    <div className="text-center px-4 py-2 rounded-2xl bg-white/40 backdrop-blur-sm border border-forest-green/10 inline-block shadow-sm">
      <div className="font-mono text-forest-green font-semibold text-lg sm:text-xl">{formatTime(time)}</div>
      <div className="text-xs sm:text-sm mt-1 text-forest-brown opacity-70">{formatDate(time)}</div>
    </div>
  )
}

