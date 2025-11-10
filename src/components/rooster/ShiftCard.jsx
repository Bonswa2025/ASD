export default function ShiftCard({ shift }) {
  return (
    <div className="shift">
      <div className="title">{shift.title || '—'}</div>
      <div className="time">{shift.time}</div>
      <div className="meta">
        <span className={`dot ${shift.tone==='warn'?'warn':shift.tone==='bad'?'bad':''}`} />
        <span className="muted">{shift.who}</span>
      </div>
    </div>
  );
}
