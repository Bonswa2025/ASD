export function generateWeekSchedule(employees){
  // very simple round-robin mock
  const days = ['Ma','Di','Wo','Do','Vr','Za','Zo'];
  const rows = days.map((d, idx) => ({
    day: d,
    shift: employees[idx % employees.length]?.name || '-'
  }));
  return rows;
}