const STORAGE_KEY = 'calendar_app_events_v1'

export function loadEventsFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch (err) {
    console.error('load events', err)
    return []
  }
}
export function saveEventsToStorage(events) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
  } catch (err) {
    console.error('save events', err)
  }
}
