import React from 'react'

const API_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:3GfcDNxW'

export default function TodoForm({ onAdd }) {
    async function handleCreateTodo(e) {
        e.preventDefault()
        const form = e.target              // the <form> itself
        const todo = {
        title: form.title.value,
        description: form.description.value,
        due_date: form.date.value,
        due_time: form.time.value,
        is_completed: false
        }
        try {
        await fetch(`${API_BASE_URL}/todo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo)
        })
        form.reset()          // old todoForm.reset()
        onAdd()               // old loadTodos()
        } catch (err) {
        console.error(err);
        alert('Error creating task')   // old showToast (we’ll upgrade later)
        }
    }
    // same HTML as old <form id="todoForm"> but JSX
    return (
        <form className="todo-form" onSubmit={handleCreateTodo}>
        <h2>Create New Task</h2>
        <input name="title" type="text" className="input" placeholder="What do you need to do?" required />
        <textarea name="description" className="input" placeholder="Add a description (optional)" />
        <div className="datetime-group">
            <input name="date" type="date" className="input" required />
            <input name="time" type="time" className="input" required />
        </div>
        <button type="submit" className="btn btn-primary">Save To-Do</button>
        </form>
    )
}