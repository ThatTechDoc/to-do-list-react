import React, { useState, useEffect } from 'react'

const API_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:3GfcDNxW'

export default function EditModal({ editingId, todos, onUpdate, setEditingId }) {
  // local form state
  const [form, setForm] = useState({
    title: '',
    description: '',
    due_date: '',
    due_time: ''
  })

  // when modal opens, fill form with current task
  useEffect(() => {
    if (!editingId) return
    const task = todos.find(t => t.id === editingId)
    if (task) {
        setTimeout(() => { 
            setForm({
                title: task.title,
                description: task.description || '',
                due_date: new Date(task.due_date).toISOString().split('T')[0], // yyyy-mm-dd
                due_time: task.due_time
            })
        }, 0)
    }
  }, [editingId, todos])

  async function handleUpdate(e) {
    e.preventDefault()
    const updates = {
      title: form.title,
      description: form.description,
      due_date: form.due_date,
      due_time: form.due_time,
      is_completed: false // keep existing state
    }
    await fetch(`${API_BASE_URL}/todo/${editingId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    })
    onUpdate() // reload list
    close()    // close modal
  }

  function close() {
    setEditingId(null)
    setForm({ title: '', description: '', due_date: '', due_time: '' })
  }

  // same vanilla HTML → JSX
  if (!editingId) return null // hidden by default

  return (
    <div className="modal" style={{ display: 'block' }} onClick={close}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Edit Task</h2>
        <form className="edit-form" onSubmit={handleUpdate}>
          <input
            type="text"
            className="input"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            required
          />
          <textarea
            className="input"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
          <div className="datetime-group">
            <input
              type="date"
              className="input"
              value={form.due_date}
              onChange={e => setForm({ ...form, due_date: e.target.value })}
              required
            />
            <input
              type="time"
              className="input"
              value={form.due_time}
              onChange={e => setForm({ ...form, due_time: e.target.value })}
              required
            />
          </div>
          <div className="modal-buttons">
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" className="btn btn-secondary" onClick={close}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}