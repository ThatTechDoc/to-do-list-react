import React from 'react'

const API_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:3GfcDNxW';

export default function TodoItem({ todo, isOverdue, onUpdate, setEditingId, setDeletingId }) {
    // old toggleComplete, openEditModal, openConfirmModal
    async function toggleComplete() {
            const updates = {
            title: todo.title,
            description: todo.description || '',
            due_date: todo.due_date,
            due_time: todo.due_time,
            is_completed: !todo.is_completed
        }

        await fetch(`${API_BASE_URL}/todo/${todo.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
        })
        onUpdate() // reload list
    }

    function openEditModal() { setEditingId(todo.id) }
    function openConfirmModal() { setDeletingId(todo.id) }

    // old createTodoElement HTML → JSX
    const dueDateTime = new Date(todo.due_date)
    const dateStr = isNaN(dueDateTime) ? 'No due date' : dueDateTime.toLocaleDateString('en-GB')
    const timeStr = todo.due_time || ''

    // CSS classes exactly like vanilla
    const cardClasses = ['todo-item']
    if (todo.is_completed) cardClasses.push('completed')
    if (isOverdue) cardClasses.push('overdue')

    return (
        <div className={cardClasses.join(' ')}>
            <div className="todo-content">
                <div className="todo-title">{todo.title}</div>
                {todo.description && <div className="todo-description">{todo.description}</div>}
                <div className="todo-due">Due: {dateStr} {timeStr}</div>
            </div>
            <div className="todo-actions">
                <button className={`btn btn-small ${todo.is_completed ? 'btn-secondary' : 'btn-primary'}`} onClick={toggleComplete}>{todo.is_completed ? '✓' : '○'}
                </button>
                <button className="btn btn-small btn-secondary" onClick={openEditModal}>Edit</button>
                <button className="btn btn-small btn-danger" onClick={openConfirmModal}>Delete</button>
            </div>
        </div>
    )
}