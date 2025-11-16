/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          green: '#4CAF50',
          mint: '#C8F7DC',
          brown: '#6B4F30',
          beige: '#F5EBD8',
          blue: '#D5E8F5',
          yellow: '#FFF7C2',
        },
      },
      backgroundImage: {
        'forest-gradient': 'linear-gradient(135deg, #C8F7DC 0%, #D5E8F5 50%, #FFF7C2 100%)',
        'sunlight-gradient': 'linear-gradient(180deg, #FFF7C2 0%, #C8F7DC 50%, #F5EBD8 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'grow': 'grow 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        grow: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(76, 175, 80, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(76, 175, 80, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}

