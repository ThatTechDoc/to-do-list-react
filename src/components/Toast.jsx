import React from 'react'

export default function Toast({ toast }) {
  // if toast.show is false → render nothing (hidden)
  if (!toast.show) return null

  // choose color exactly like vanilla CSS variables
  const bgColor =
    toast.type === 'error'   ? 'var(--danger-color)' :
    toast.type === 'loading' ? 'var(--warning-color)' :
    'var(--primary-color)'

  // same vanilla HTML structure
  return (
    <div
      className="toast"
      style={{ display: 'block', backgroundColor: bgColor }}
    >
      {toast.msg}
    </div>
  )
}