// Placeholder lunar function: returns a very basic "农历" label using month/day names.
export function simpleLunarLabel(date) {
  // This is NOT an accurate lunar conversion. It provides a readable placeholder.
  const m = date.getMonth() + 1
  const d = date.getDate()
  return `农历 ${m}月${d}日`;
}
