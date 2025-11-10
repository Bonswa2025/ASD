import DayColumn from '../components/rooster/DayColumn.jsx';
import { week, uren } from './rooster_data.js';

export default function RoosterPage(){
  return (
    <div className="space-y">
      <div className="card" style={{padding:16}}>
        <div className="rooster-header">
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            <button className="btn btn-ghost">Vandaag</button>
            <div className="week-toolbar">
              <button className="btn">◀︎</button>
              <div className="week-pill">Week 45 • 03–09 nov 2025</div>
              <button className="btn">▶︎</button>
            </div>
          </div>
          <div style={{display:'flex',gap:8}}>
            <button className="btn">Exporteer uren (CSV)</button>
            <button className="btn">Export geplande uren</button>
            <button className="btn">Export registratie</button>
          </div>
        </div>

        <div className="rooster-grid">
          {week.map((d,i)=><DayColumn key={i} day={d}/>)}
        </div>
      </div>

      <div className="card" style={{padding:16}}>
        <h3 style={{margin:'0 0 10px 4px'}}>Urenregistratie – deze week</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Medewerker</th><th>Gepland (hh:mm)</th><th>Geregistreerd (hh:mm)</th>
            </tr>
          </thead>
          <tbody>
            {uren.map((r,i)=>(
              <tr key={i}>
                <td>{r.medewerker}</td><td>{r.gepland}</td><td>{r.geregistreerd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
