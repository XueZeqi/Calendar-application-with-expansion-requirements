Submission notes

This repository contains a minimal calendar app implementing the core requested features:

- Month / Week / Day views
- Add / Edit / Delete / View events
- Reminders via browser notifications (when app is running and permission granted)
- Export / Import .ics files (basic RFC5545-like support)
- Subscription helper to fetch an .ics URL and import events into local storage

What I did NOT fully implement

- Precise Chinese lunar calendar conversion: a placeholder is provided. If needed I can integrate a tested lunar conversion library or implement a full algorithm.
- Full RFC5545 recurrence rules and alarms: the ICS export/import is intentionally small and straightforward for clarity.

To run

1. npm install
2. npm run dev


