import ShiftCard from './ShiftCard.jsx';

export default function DayColumn({ day }) {
  return (
    <section className="day-col">
      <header className="day-head">
        <div className="date">{day.date}</div>
        <div className="dow">{day.dow}</div>
      </header>
      <div className="day-body">
        {day.shifts?.length ? (
          day.shifts.map((s,i)=><ShiftCard key={i} shift={s}/>)
        ) : (
          <div className="muted">Geen evenementen</div>
        )}
      </div>
    </section>
  );
}
