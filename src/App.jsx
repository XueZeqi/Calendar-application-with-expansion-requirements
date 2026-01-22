import React, { useEffect, useState, useRef } from 'react'
import Calendar from './components/Calendar'
import EventModal from './components/EventModal'
import { loadEventsFromStorage, saveEventsToStorage } from './utils/storage'
import { exportEventsAsICS, importICSEventsFromText, importICSEventsFromURL } from './utils/ics'

export default function App() {
  const [events, setEvents] = useState(() => loadEventsFromStorage())
  const [view, setView] = useState('month') // month | week | day
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [modalEvent, setModalEvent] = useState(null)
  const reminderTimersRef = useRef({})

  useEffect(() => {
    saveEventsToStorage(events)
    scheduleReminders(events)
  }, [events])

  useEffect(() => {
    // request notification permission
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission()
    }
  }, [])

  function scheduleReminders(list) {
    // clear existing timers
    Object.values(reminderTimersRef.current).forEach(id => clearTimeout(id))
    reminderTimersRef.current = {}

    const now = Date.now()
    list.forEach(ev => {
      if (!ev.reminderMinutes) return
      const remindAt = new Date(ev.start).getTime() - ev.reminderMinutes * 60000
      if (remindAt > now) {
        const id = setTimeout(() => {
          showNotification(ev)
        }, remindAt - now)
        reminderTimersRef.current[ev.id] = id
      }
    })
  }

  function showNotification(ev) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(ev.title || 'Event reminder', {
        body: ev.description || (new Date(ev.start)).toLocaleString(),
      })
    } else {
      alert(`Reminder: ${ev.title || ''} — ${new Date(ev.start).toLocaleString()}`)
    }
  }

  function addEvent(event) {
    setEvents(prev => [...prev, event])
  }
  function updateEvent(updated) {
    setEvents(prev => prev.map(e => e.id === updated.id ? updated : e))
  }
  function deleteEvent(id) {
    setEvents(prev => prev.filter(e => e.id !== id))
  }

  async function handleExport() {
    const ics = exportEventsAsICS(events)
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'calendar-export.ics'
    a.click()
    URL.revokeObjectURL(url)
  }

  async function handleImportFile(file) {
    const text = await file.text()
    const imported = importICSEventsFromText(text)
    setEvents(prev => [...prev, ...imported])
  }

  async function handleSubscribe(url) {
    try {
      const imported = await importICSEventsFromURL(url)
      setEvents(prev => [...prev, ...imported])
    } catch (err) {
      alert('Failed to fetch/parse subscription: ' + err.message)
    }
  }

  return (
    <div className="app">
      <header>
        <h1>Calendar App</h1>
        <div className="controls">
          <select value={view} onChange={e => setView(e.target.value)}>
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="day">Day</option>
          </select>
          <input type="date" value={selectedDate.toISOString().slice(0,10)} onChange={e => setSelectedDate(new Date(e.target.value))} />
          <button onClick={() => setModalEvent({ start: selectedDate, end: selectedDate, title: '' })}>New Event</button>
          <button onClick={handleExport}>Export .ics</button>
          <label className="file-label">Import .ics<input type="file" accept="text/calendar" onChange={e => e.target.files && handleImportFile(e.target.files[0])} hidden /></label>
        </div>
      </header>

      <main>
        <Calendar
          view={view}
          date={selectedDate}
          events={events}
          onDayClick={(d) => { setSelectedDate(d); setModalEvent({ start: d, end: d, title: '' }) }}
          onEdit={(ev) => setModalEvent(ev)}
        />
      </main>

      <aside>
        <h3>Subscription</h3>
        <SubscriptionForm onSubscribe={handleSubscribe} />
        <p>Events stored locally in browser storage. Export to .ics to move to another calendar.</p>
      </aside>

      {modalEvent && (
        <EventModal
          event={modalEvent}
          onClose={() => setModalEvent(null)}
          onSave={(ev) => {
            if (!ev.id) addEvent(ev)
            else updateEvent(ev)
            setModalEvent(null)
          }}
          onDelete={(id) => { deleteEvent(id); setModalEvent(null) }}
        />
      )}
    </div>
  )
}

function SubscriptionForm({ onSubscribe }) {
  const [url, setUrl] = useState('')
  return (
    <div className="sub-form">
      <input placeholder="https://example.com/calendar.ics" value={url} onChange={e => setUrl(e.target.value)} />
      <button onClick={() => { if (url) onSubscribe(url) }}>Subscribe</button>
    </div>
  )
}
