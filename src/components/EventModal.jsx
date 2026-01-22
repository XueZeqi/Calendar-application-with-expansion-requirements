import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function EventModal({ event, onClose, onSave, onDelete }) {
  const [title, setTitle] = useState(event.title || '')
  const [start, setStart] = useState(new Date(event.start).toISOString().slice(0,16))
  const [end, setEnd] = useState(new Date(event.end || event.start).toISOString().slice(0,16))
  const [description, setDescription] = useState(event.description || '')
  const [reminderMinutes, setReminderMinutes] = useState(event.reminderMinutes || 0)

  function handleSave() {
    const ev = {
      id: event.id || uuidv4(),
      title,
      start: new Date(start).toISOString(),
      end: new Date(end).toISOString(),
      description,
      reminderMinutes: Number(reminderMinutes) || 0
    }
    onSave(ev)
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>{event.id ? 'Edit Event' : 'New Event'}</h3>
        <label>Title<input value={title} onChange={e=>setTitle(e.target.value)} /></label>
        <label>Start<input type="datetime-local" value={start} onChange={e=>setStart(e.target.value)} /></label>
        <label>End<input type="datetime-local" value={end} onChange={e=>setEnd(e.target.value)} /></label>
        <label>Description<textarea value={description} onChange={e=>setDescription(e.target.value)} /></label>
        <label>Reminder (minutes before)<input type="number" value={reminderMinutes} onChange={e=>setReminderMinutes(e.target.value)} /></label>
        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          {event.id && <button className="danger" onClick={()=>onDelete(event.id)}>Delete</button>}
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
