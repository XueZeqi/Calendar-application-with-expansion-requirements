import React from 'react'
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, isSameMonth, isSameDay } from 'date-fns'

export default function Calendar({ view, date, events, onDayClick, onEdit }) {
  if (view === 'month') return <MonthView date={date} events={events} onDayClick={onDayClick} onEdit={onEdit} />
  if (view === 'week') return <WeekView date={date} events={events} onDayClick={onDayClick} onEdit={onEdit} />
  return <DayView date={date} events={events} onEdit={onEdit} />
}

function MonthView({ date, events, onDayClick, onEdit }) {
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 1 })
  const end = endOfWeek(endOfMonth(date), { weekStartsOn: 1 })
  const rows = []
  let day = start
  while (day <= end) {
    const week = []
    for (let i = 0; i < 7; i++) {
      week.push(day)
      day = addDays(day, 1)
    }
    rows.push(week)
  }

  return (
    <div className="calendar month">
      <div className="weekdays">{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => <div key={d} className="weekday">{d}</div>)}</div>
      {rows.map((week, i) => (
        <div key={i} className="week-row">
          {week.map(d => (
            <div key={d.toISOString()} className={`day ${isSameMonth(d, date) ? '' : 'dim'}`} onDoubleClick={() => onDayClick(d)}>
              <div className="day-num">{format(d, 'd')}</div>
              <div className="events">
                {events.filter(ev => isSameDay(new Date(ev.start), d)).slice(0,3).map(ev => (
                  <div key={ev.id} className="event" onClick={(e)=>{e.stopPropagation(); onEdit(ev)}}>{ev.title}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function WeekView({ date, events, onDayClick, onEdit }) {
  const start = startOfWeek(date, { weekStartsOn: 1 })
  const days = Array.from({ length: 7 }).map((_,i) => addDays(start,i))
  return (
    <div className="calendar week">
      {days.map(d => (
        <div key={d.toISOString()} className="day-col">
          <div className="day-header" onDoubleClick={() => onDayClick(d)}>{format(d,'EEE d')}</div>
          <div className="events">
            {events.filter(ev => isSameDay(new Date(ev.start), d)).map(ev => (
              <div key={ev.id} className="event" onClick={(e)=>{e.stopPropagation(); onEdit(ev)}}>{format(new Date(ev.start), 'HH:mm')} {ev.title}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function DayView({ date, events, onEdit }) {
  const dayEvents = events.filter(ev => isSameDay(new Date(ev.start), date)).sort((a,b)=>new Date(a.start)-new Date(b.start))
  return (
    <div className="calendar day-view">
      <h2>{format(date,'EEEE, MMM d yyyy')}</h2>
      <div className="events-list">
        {dayEvents.map(ev => (
          <div key={ev.id} className="event-row" onClick={()=>onEdit(ev)}>
            <div className="time">{format(new Date(ev.start),'HH:mm')} - {format(new Date(ev.end),'HH:mm')}</div>
            <div className="title">{ev.title}</div>
          </div>
        ))}
        {dayEvents.length===0 && <p>No events</p>}
      </div>
    </div>
  )
}
