import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function TodoList() {
  const [todos, setTodos] = useLocalStorage('todos', [])
  const [inputValue, setInputValue] = useState('')

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputValue.trim(), completed: false }])
      setInputValue('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-8">
      <h3 className="text-2xl font-bold text-forest-green mb-6 text-center">🌿 Tasks</h3>
      
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a task..."
          className="flex-1 px-4 py-3 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-forest-green/20 focus:outline-none focus:border-forest-green/40 focus:ring-2 focus:ring-forest-green/20 text-forest-brown placeholder-forest-brown/50 shadow-sm"
        />
        <button
          onClick={addTodo}
          className="px-6 py-3 rounded-xl bg-forest-green text-white hover:bg-forest-green/90 transition-all transform hover:scale-105 shadow-md font-medium"
        >
          Add
        </button>
      </div>

      <div className="space-y-3">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-3 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border-2 border-forest-brown/20 hover:border-forest-green/30 hover:shadow-md transition-all shadow-sm"
            style={{
              background: todo.completed 
                ? 'linear-gradient(135deg, rgba(200, 247, 220, 0.6) 0%, rgba(245, 235, 216, 0.6) 100%)'
                : 'rgba(255, 255, 255, 0.6)'
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="w-6 h-6 rounded border-2 border-forest-green cursor-pointer accent-forest-green focus:ring-2 focus:ring-forest-green/20"
            />
            <span
              className={`flex-1 text-forest-brown font-medium ${
                todo.completed ? 'line-through opacity-60' : ''
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="opacity-60 hover:opacity-100 transition-opacity text-xl text-forest-brown hover:text-red-500 font-bold"
            >
              ×
            </button>
          </div>
        ))}
        {todos.length === 0 && (
          <div className="text-center py-12 bg-white/40 backdrop-blur-sm rounded-2xl border-2 border-dashed border-forest-green/20">
            <p className="text-forest-brown/60 text-lg">No tasks yet</p>
            <p className="text-forest-brown/40 text-sm mt-2">Add your first task to get started!</p>
          </div>
        )}
      </div>
    </div>
  )
}

