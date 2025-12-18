import React, { useState, useEffect } from 'react'
import TodoForm from './components/TodoForm.jsx'
import TodoList from './components/TodoList.jsx'
import TodoFilter from './components/TodoFilter.jsx'
import EditModal from './components/EditModal.jsx'
import DeleteModal from './components/DeleteModal.jsx'
import Toast from './components/Toast.jsx'
import Loading from './components/Loading.jsx'
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api/todoApi.js'

const API_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:3GfcDNxW'

/* ----------  API wrappers  ---------- */
async function _fetchTodos(setTodos, setLoading, _showToast) {
  setLoading(true)
  try {
    const data = await fetchTodos()
    setTodos(data)
  } catch (_err) {
    console.log(_err)
    _showToast('Error loading tasks', 'error')
    setTodos([])
  } finally {
    setLoading(false)
  }
}

async function _createTodo(todo, _showToast) {
  try {
    _showToast('Creating task...', 'loading')
    await createTodo(todo)
    _showToast('Task created!', 'success')
  } catch (_err) {
    console.log(_err)
    _showToast('Error creating task', 'error')
  }
}

async function _updateTodo(id, updates, _showToast) {
  try {
    _showToast('Updating task...', 'loading')
    await updateTodo(id, updates)
    _showToast('Task updated!', 'success')
  } catch (_err) {
    console.log(_err)
    _showToast('Error updating task', 'error')
  }
}

async function _deleteTodo(id, _showToast) {
  try {
    _showToast('Deleting task...', 'loading')
    await deleteTodo(id)
    _showToast('Task deleted!', 'success')
  } catch (_err) {
    console.log(_err)
    _showToast('Error deleting task', 'error')
  }
}

/* ----------  CRUD FLOW FUNCTIONS  ---------- */
async function handleCreateTodo(e, setTodos, _showToast) {
  e.preventDefault()
  const todo = {
    title: e.target.title.value,
    description: e.target.description.value,
    due_date: e.target.date.value,
    due_time: e.target.time.value,
    is_completed: false
  }
  await _createTodo(todo, _showToast)
  e.target.reset()
  await _fetchTodos(setTodos, () => {}, _showToast)
}

function openEditModal(todo, setEditingId) {
  setEditingId(todo.id)
}

function closeEditModal(setEditingId) {
  setEditingId(null)
}

async function _handleUpdateTodo(e, editingId, setEditingId, setTodos, _showToast) {
  e.preventDefault()
  const updates = {
    title: e.target.title.value,
    description: e.target.description.value,
    due_date: e.target.date.value,
    due_time: e.target.time.value,
    is_completed: false
  }
  await _updateTodo(editingId, updates, _showToast)
  closeEditModal(setEditingId)
  await _fetchTodos(setTodos, () => {}, _showToast)
}

function openConfirmModal(id, setDeletingId) {
  setDeletingId(id)
}

function closeConfirmModal(setDeletingId) {
  setDeletingId(null)
}

async function _confirmDelete(setDeletingId, setTodos, _showToast) {
  await _deleteTodo(deletingId, _showToast)
  closeConfirmModal(setDeletingId)
  await _fetchTodos(setTodos, () => {}, _showToast)
}

async function _toggleComplete(id, setTodos, _showToast) {
  const task = todos.find(t => t.id === id)
  if (!task) return
  const updates = {
    title: task.title,
    description: task.description || '',
    due_date: task.due_date,
    due_time: task.due_time,
    is_completed: !task.is_completed
  }
  await _updateTodo(id, updates, _showToast)
  await _fetchTodos(setTodos, () => {}, _showToast)
}

/* ----------  THEME  ---------- */
function checkTheme(setTheme) {
  const saved = localStorage.getItem('theme') || 'light'
  setTheme(saved)
  document.documentElement.setAttribute('data-theme', saved)
}

function toggleTheme(theme, setTheme) {
  const newTheme = theme === 'light' ? 'dark' : 'light'
  setTheme(newTheme)
  localStorage.setItem('theme', newTheme)
  document.documentElement.setAttribute('data-theme', newTheme)
}

/* ----------  TOAST  ---------- */
function showToast(msg, type = 'success', setToast) {
  setToast({ show: true, msg, type })
  if (type !== 'loading') {
    setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 3000)
  }
}

/* ----------  OVERDUE ALERTS  ---------- */
function _checkOverdueTasks(todos, _showToast) {
  todos.forEach(todo => {
    if (todo.is_completed) return
    const due = new Date(todo.due_date)
    const minsLeft = (due - Date.now()) / 1000 / 60
    if (minsLeft > 0 && minsLeft <= 5) {
      _showToast(`Task "${todo.title}" is due in ${Math.round(minsLeft)} minutes!`, 'warning')
    }
  })
}

function _checkOverdueOnLoad(todos) {
  todos.forEach(todo => {
    if (todo.is_completed) return
    const due = new Date(todo.due_date)
    const minsLate = (Date.now() - due) / 1000 / 60
    if (minsLate > 0) {
      alert(`Task "${todo.title}" is already ${Math.round(minsLate)} minutes overdue!`)
    }
  })
}

/* ----------  REACT COMPONENT  ---------- */
export default function App() {
  const [todos, setTodos] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [theme, setTheme] = useState('light')
  const [toast, setToast] = useState({ show: false, msg: '', type: 'success' })
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  /* ----------  LIFECYCLE (mount only)  ---------- */
  useEffect(() => {
  setLoading(true)
  _fetchTodos(setTodos, setLoading, (m, t) => showToast(m, t, setToast))
  checkTheme(setTheme)
  _checkOverdueOnLoad(todos)
  const id = setInterval(() => _checkOverdueTasks(todos, (m, t) => showToast(m, t, setToast)), 60000)
  return () => clearInterval(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  /* ----------  RENDER  ---------- */
  return (
    <div className="container">
      <header>
        <h1>My Tasks</h1>
        <div className="header-controls">
          <TodoFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} filter={filter} setFilter={setFilter} />
          <button className="theme-toggle" onClick={() => toggleTheme(theme, setTheme)}>
            <img src={theme === 'dark' ? './component/icons/LightMode.jsx' : './component/icons/DarkMode.jsx'} alt="Toggle theme" />
          </button>
        </div>
      </header>

      <TodoForm onAdd={(e) => handleCreateTodo(e, setTodos, (m, t) => showToast(m, t, setToast))} />

      {/*  LOADING SPINNER  */}
      {loading && <Loading />}

      {/*  LIST AFTER DATA ARRIVES  */}
      {!loading && (
        <TodoList
          todos={todos}
          onUpdate={() => _fetchTodos(setTodos, setLoading, (m, t) => showToast(m, t, setToast))}
          onEdit={(todo) => openEditModal(todo, setEditingId)}
          onDelete={(id) => openConfirmModal(id, setDeletingId)}
          editingId={editingId}
          setEditingId={setEditingId}
          deletingId={deletingId}
          setDeletingId={setDeletingId}
          searchTerm={searchTerm}
          filter={filter}
        />
      )}

      <EditModal editingId={editingId} todos={todos} onUpdate={() => _fetchTodos(setTodos, setLoading, (m, t) => showToast(m, t, setToast))} setEditingId={setEditingId} />
      <DeleteModal deletingId={deletingId} onDelete={() => _confirmDelete(setDeletingId, setTodos, (m, t) => showToast(m, t, setToast))} setDeletingId={setDeletingId} />
      <Toast toast={toast} />
    </div>
  )
}