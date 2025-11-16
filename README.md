# Pomodoro Timer

A minimalistic, production-ready Pomodoro web application built with React, Vite, and TailwindCSS. Features a clean black/white/grey design with full timer customization, task management, reward system, and more.

## Features

- ⏱️ **Pomodoro Timer** - 25/30/50 minute focus sessions with 5/10 minute breaks
- ⚙️ **Full Settings Customization** - Adjust timer durations, sound alerts, and auto-start
- 📅 **Live Clock Widget** - 24-hour format with date and day display
- 💬 **Daily Quotes** - Inspirational quotes from quotable.io
- ✅ **To-Do List** - Task management with localStorage persistence
- 🌱 **Reward System** - Earn seeds and grow your garden with completed sessions
- 💝 **Donation Support** - Links to Buy Me a Coffee, Ko-Fi, and GitHub Sponsors
- 📱 **Fully Responsive** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling
- **LocalStorage** - Data persistence (no backend required)

## Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

## Building for Production

To create a production build:
```bash
npm run build
```

The built files will be in the `dist` directory.

To preview the production build:
```bash
npm run preview
```

## Usage

### Timer
- Click **Start** to begin a focus or break session
- Click **Pause** to pause the timer
- Click **Reset** to reset to the default duration
- The timer automatically switches between focus and break sessions

### Settings
- Click **Settings** in the top-right corner
- Choose focus duration: 25, 30, or 50 minutes
- Choose break duration: 5 or 10 minutes
- Toggle sound alerts on/off
- Enable/disable auto-start for the next session

### To-Do List
- Add tasks using the input field
- Check off completed tasks
- Delete tasks by clicking the × button
- All tasks are saved automatically

### Garden
- Click **Garden** in the top-left to view your progress
- Earn 1 seed for each completed focus session
- Watch your garden grow:
  - 0-2 seeds: 🌱 Seed
  - 3-5 seeds: 🌿 Sprout
  - 6-10 seeds: 🌳 Plant
  - 11+ seeds: 🌲 Tree

## Data Persistence

All data is stored locally in your browser's localStorage:
- Timer state (time left, running status, break status)
- Settings preferences
- To-do list items
- Garden seeds count

No backend or authentication required - everything works offline!

## Browser Support

Works in all modern browsers that support:
- ES6+ JavaScript
- LocalStorage API
- CSS Grid and Flexbox

## License

Free to use and modify.

