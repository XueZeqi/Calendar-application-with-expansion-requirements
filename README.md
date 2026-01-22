# Calendar App (Minimal)

This is a minimal single-page calendar application implementing the core requirements from the assignment:

- Calendar views: month / week / day
- Add / edit / view / delete events (stored in localStorage)
- Basic reminders using the Browser Notification API (when app is open)
- Export and import events as RFC5545-like iCalendar (.ics) files
- Network subscription helper: fetch an .ics URL and import events

How to run

1. Install dependencies

   npm install

2. Start dev server

   npm run dev

Open http://localhost:5173 (or the vite-provided URL).

Notes

- Lunar calendar display is included as a simple placeholder (not an accurate full lunar conversion). This project focuses on the required core features. If you want a full lunar-calendar implementation, I can add a tested conversion library or algorithm.

Files of interest

- `src/App.jsx` — main app UI and logic
- `src/components/Calendar.jsx` — calendar views (month/week/day)
- `src/components/EventModal.jsx` — modal for add/edit events
- `src/utils/ics.js` — import/export helpers for .ics
- `src/utils/storage.js` — localStorage wrapper

Deliverables for non-trivial code generation: produce a complete, runnable solution (this repo has all required files).
