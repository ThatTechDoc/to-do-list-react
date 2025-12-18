import React from 'react'
import TodoItem from './TodoItem.jsx'

export default function TodoList({
  todos,
  onUpdate,
  editingId,
  setEditingId,
  deletingId,
  setDeletingId,
  searchTerm,
  filter
}) {
  // 1.  search filter (same as vanilla)
  let filtered = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchTerm) ||
    (todo.description && todo.description.toLowerCase().includes(searchTerm))
  )

  // 2.  dropdown filter (same switch)
  switch (filter) {
    case 'completed':
      filtered = filtered.filter(t => t.is_completed)
      break
    case 'pending':
      filtered = filtered.filter(t => !t.is_completed)
      break
    case 'overdue':
      filtered = filtered.filter(t => !t.is_completed && new Date(t.due_date) < new Date())
      break
    // 'all' → no extra filter
  }

  // 3.  sort by due date (same as vanilla)
  filtered.sort((a, b) => new Date(a.due_date) - new Date(b.due_date))

  // 4.  add isOverdue flag (pure)
  const now = new Date()
  const sorted = filtered.map(todo => ({
    ...todo,
    isOverdue: !todo.is_completed && new Date(todo.due_date) < now
  }))

  // 5.  render
  if (sorted.length === 0) return <div className="loading">No tasks found</div>

  return (
    <div className="todo-list">
      {sorted.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isOverdue={todo.isOverdue}
          onUpdate={onUpdate}
          editingId={editingId}
          setEditingId={setEditingId}
          deletingId={deletingId}
          setDeletingId={setDeletingId}
        />
      ))}
    </div>
  )
}