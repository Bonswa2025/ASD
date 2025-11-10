export function formatClock(ts){
  const d = new Date(ts);
  return d.toLocaleTimeString('nl-NL', {hour:'2-digit', minute:'2-digit'});
}