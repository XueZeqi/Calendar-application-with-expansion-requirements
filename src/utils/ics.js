// Very small helper implementing basic RFC5545-ish export and a minimal import

function formatDateTimeISOForICS(dt) {
  const d = new Date(dt)
  // use UTC format: YYYYMMDDTHHMMSSZ
  return d.getUTCFullYear().toString().padStart(4,'0') +
    String(d.getUTCMonth()+1).padStart(2,'0') +
    String(d.getUTCDate()).padStart(2,'0') + 'T' +
    String(d.getUTCHours()).padStart(2,'0') +
    String(d.getUTCMinutes()).padStart(2,'0') +
    String(d.getUTCSeconds()).padStart(2,'0') + 'Z'
}

export function exportEventsAsICS(events) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//MinimalCalendar//EN'
  ]
  events.forEach(ev => {
    lines.push('BEGIN:VEVENT')
    lines.push('UID:' + (ev.id || Math.random().toString(36).slice(2)))
    lines.push('DTSTAMP:' + formatDateTimeISOForICS(new Date()))
    lines.push('DTSTART:' + formatDateTimeISOForICS(ev.start))
    lines.push('DTEND:' + formatDateTimeISOForICS(ev.end))
    if (ev.title) lines.push('SUMMARY:' + ev.title.replace(/\n/g,'\\n'))
    if (ev.description) lines.push('DESCRIPTION:' + ev.description.replace(/\n/g,'\\n'))
    lines.push('END:VEVENT')
  })
  lines.push('END:VCALENDAR')
  return lines.join('\r\n')
}

export function importICSEventsFromText(text) {
  // naive parser: split VEVENTs and extract DTSTART/DTEND/SUMMARY/DESCRIPTION/UID
  const events = []
  const vevents = text.split(/BEGIN:VEVENT/i).slice(1)
  vevents.forEach(block => {
    const lines = block.split(/\r?\n/)
    const ev = { id: undefined, title: '', description: '', start: new Date().toISOString(), end: new Date().toISOString(), reminderMinutes: 0 }
    lines.forEach(l => {
      if (/^UID:/i.test(l)) ev.id = l.replace(/^UID:/i,'').trim()
      if (/^DTSTART:/i.test(l)) {
        const v = l.replace(/^DTSTART:/i,'').trim()
        ev.start = parseICSTime(v)
      }
      if (/^DTEND:/i.test(l)) {
        const v = l.replace(/^DTEND:/i,'').trim()
        ev.end = parseICSTime(v)
      }
      if (/^SUMMARY:/i.test(l)) ev.title = l.replace(/^SUMMARY:/i,'').trim().replace(/\\n/g,'\n')
      if (/^DESCRIPTION:/i.test(l)) ev.description = l.replace(/^DESCRIPTION:/i,'').trim().replace(/\\n/g,'\n')
    })
    events.push(ev)
  })
  return events
}

function parseICSTime(v) {
  // support UTC basic format YYYYMMDDTHHMMSSZ or date-only YYYYMMDD
  if (/Z$/.test(v)) {
    const y = Number(v.slice(0,4))
    const m = Number(v.slice(4,6)) - 1
    const d = Number(v.slice(6,8))
    const hh = Number(v.slice(9,11))
    const mm = Number(v.slice(11,13))
    const ss = Number(v.slice(13,15))
    return new Date(Date.UTC(y,m,d,hh,mm,ss)).toISOString()
  }
  if (/^\d{8}$/.test(v)) {
    const y = Number(v.slice(0,4))
    const m = Number(v.slice(4,6)) - 1
    const d = Number(v.slice(6,8))
    return new Date(y,m,d).toISOString()
  }
  // fallback
  const parsed = new Date(v)
  return isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString()
}

export async function importICSEventsFromURL(url) {
  const resp = await fetch(url)
  if (!resp.ok) throw new Error('Network error ' + resp.status)
  const text = await resp.text()
  return importICSEventsFromText(text)
}
