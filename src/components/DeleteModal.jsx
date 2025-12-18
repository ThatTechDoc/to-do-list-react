import React from 'react'

const API_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:3GfcDNxW'

export default function DeleteModal({ deletingId, onDelete, setDeletingId }) {
  if (!deletingId) return null // hidden by default

  async function confirmDelete() {
    await fetch(`${API_BASE_URL}/todo/${deletingId}`, { method: 'DELETE' })
    onDelete() // reload list
    close()
  }

  function close() {
    setDeletingId(null)
  }

  return (
    <div className="modal" style={{ display: 'block' }} onClick={close}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to permanently delete this task?</p>
        <div className="modal-buttons">
          <button className="btn btn-danger" onClick={confirmDelete}>Delete</button>
          <button className="btn btn-secondary" onClick={close}>Cancel</button>
        </div>
      </div>
    </div>
  )
}