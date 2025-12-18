const API_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:3GfcDNxW'

export async function fetchTodos() {
  const res = await fetch(`${API_BASE_URL}/todo`)
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

export async function createTodo(todo) {
  const res = await fetch(`${API_BASE_URL}/todo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo)
  })
  if (!res.ok) throw new Error('Failed to create')
  return res.json()
}

export async function updateTodo(id, updates) {
  const res = await fetch(`${API_BASE_URL}/todo/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  })
  if (!res.ok) throw new Error('Failed to update')
  return res.json()
}

export async function deleteTodo(id) {
  const res = await fetch(`${API_BASE_URL}/todo/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete')
  return true
}