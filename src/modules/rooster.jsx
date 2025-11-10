// src/modules/rooster.jsx
import React, { useMemo, useState } from "react";

/* -------------------- Date helpers -------------------- */
function startOfWeekMonday(d) {
  const date = new Date(d);
  const day = (date.getDay() + 6) % 7; // 0 = Monday
  date.setDate(date.getDate() - day);
  date.setHours(0, 0, 0, 0);
  return date;
}
function addDays(d, n) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}
function fmtISO(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function fmtNL(d) {
  const day = String(d.getDate()).padStart(2, "0");
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const y = d.getFullYear();
  return `${day}-${m}-${y}`;
}
function isoWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((Number(d) - Number(yearStart)) / 86400000 + 1) / 7);
  return weekNo;
}

/* -------------------- Demo data (uit jouw bestand) -------------------- */
// Concepten & locaties voor kleuraccenten
const SAMPLE_CONCEPTS = [
  { id: "gemaal", name: "Gemaal", color: "#52A8FF" },
  { id: "pinsa", name: "Pinsa", color: "#69E0C1" },
  { id: "bbq", name: "Barbeque Stadslab", color: "#FFD769" },
  { id: "storm", name: "Storm", color: "#FF8A8A" },
  { id: "broodjes", name: "Broodjes lunch", color: "#C6A4FF" },
  { id: "burger", name: "Burger concept", color: "#84E8E0" },
];
const SAMPLE_LOCATIONS = [
  { id: "home", name: "Stadslab", kind: "home", color: "#2E7D60" },
  { id: "ext-park", name: "Op locatie – Park", kind: "external", color: "#A24A4A" },
  { id: "ext-hall", name: "Op locatie – Eventhall", kind: "external", color: "#A24A4A" },
];

const ROLES = [
  { id: "shiftlead", name: "Shift leader" },
  { id: "keuken", name: "Keuken" },
  { id: "bediening", name: "Bediening" },
  { id: "afwas", name: "Afwas" },
];

// Shifts (zelfde inhoud, maar compacter weergegeven in onze UI)
const SAMPLE_SHIFTS = [
  { id: 10, date: "2025-11-03", day: "Ma", start: "09:00", end: "17:00", breakMin: 30, team: "Keuken", roleId: "keuken", employee: "Sam",  conceptId: "broodjes", locationId: "home",     status: "confirmed" },
  { id: 11, date: "2025-11-04", day: "Di", start: "10:00", end: "18:00", breakMin: 30, team: "Zaal",   roleId: "shiftlead", employee: "Eva",  conceptId: "gemaal",   locationId: "home",     status: "confirmed" },
  { id: 12, date: "2025-11-05", day: "Wo", start: "12:00", end: "20:00", breakMin: 30, team: "Bar",    roleId: "bediening", employee: "Luca", conceptId: "pinsa",    locationId: "ext-park", status: "pending" },
  { id: 13, date: "2025-11-06", day: "Do", start: "17:00", end: "23:00", breakMin: 30, team: "Afwas",  roleId: "afwas",     employee: "—",   conceptId: "burger",  locationId: "home",     status: "open" },
  { id: 14, date: "2025-11-07", day: "Vr", start: "18:00", end: "23:00", breakMin: 15, team: "Zaal",   roleId: "bediening", employee: "Eva",  conceptId: "bbq",      locationId: "ext-hall", status: "confirmed" },
  { id: 1,  date: "2025-11-08", day: "Za", start: "10:00", end: "18:00", breakMin: 30, team: "Zaal",   roleId: "bediening", employee: "Eva",  conceptId: "gemaal",   locationId: "home",     status: "confirmed" },
  { id: 2,  date: "2025-11-08", day: "Za", start: "11:00", end: "19:00", breakMin: 30, team: "Keuken", roleId: "keuken",    employee: "Sam",  conceptId: "bbq",      locationId: "ext-park", status: "pending" },
  { id: 3,  date: "2025-11-08", day: "Za", start: "12:00", end: "20:00", breakMin: 30, team: "Bar",    roleId: "bediening", employee: "Luca", conceptId: "storm",    locationId: "home",     status: "confirmed" },
  { id: 6,  date: "2025-11-08", day: "Za", start: "13:00", end: "21:00", breakMin: 30, team: "Afwas",  roleId: "afwas",     employee: "—",   conceptId: "gemaal",   locationId: "home",     status: "open" },
  { id: 4,  date: "2025-11-09", day: "Zo", start: "09:00", end: "17:00", breakMin: 30, team: "Zaal",   roleId: "shiftlead", employee: "Eva",  conceptId: "pinsa",    locationId: "ext-hall", status: "confirmed" },
  { id: 5,  date: "2025-11-09", day: "Zo", start: "12:00", end: "21:00", breakMin: 45, team: "Keuken", roleId: "keuken",    employee: "Sam",  conceptId: "burger",  locationId: "home",     status: "open" },
  { id: 7,  date: "2025-11-09", day: "Zo", start: "15:00", end: "22:00", breakMin: 30, team: "Afwas",  roleId: "afwas",     employee: "Luca", conceptId: "burger",  locationId: "home",     status: "pending" },
];

const SAMPLE_EVENTS = [
  { id: "e1", date: "2025-11-03", title: "30 x broodjes – Gemeentehuis" },
  { id: "e2", date: "2025-11-05", title: "120 x pizza – Pinsa promo" },
  { id: "e3", date: "2025-11-07", title: "200 x friet – Suikerunie" },
  { id: "e4", date: "2025-11-08", title: "80 x burgers – Stadslab BBQ" },
  { id: "e5", date: "2025-11-08", title: "Borrel – Gemaal" },
  { id: "e6", date: "2025-11-09", title: "Brunch – Pinsa pop-up" },
];

/* -------------------- Kleine helpers -------------------- */
const byId = (arr, id) => arr.find((x) => x.id === id);

/* -------------------- UI: Shift-kaart (matcht onze CSS) -------------------- */
function ShiftCard({ s }) {
  const loc = byId(SAMPLE_LOCATIONS, s.locationId);
  const concept = byId(SAMPLE_CONCEPTS, s.conceptId);
  const borderColor = (loc && loc.color) || "#6366f1";

  return (
    <div className="shift" style={{ borderLeft: `3px solid ${borderColor}` }}>
      <div className="title">
        {s.start}–{s.end} • {s.employee}
      </div>
      <div className="time">
        {byId(ROLES, s.roleId)?.name || "—"} • {s.team}
      </div>
      <div className="meta" style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span className="dot" style={{ background: concept?.color || "var(--good)" }} />
        <span className="muted">{concept?.name || "—"}</span>
        <span className="muted">• {loc?.name || "—"}</span>
        <span className="muted">• pauze {s.breakMin}m</span>
        <span className="muted">• {s.status}</span>
      </div>
    </div>
  );
}

/* -------------------- UI: Dagkolom (evenementen + diensten) -------------------- */
function DayColumn({ title, date, events, items }) {
  return (
    <section className="day-col">
      <header className="day-head">
        <div className="date">{date}</div>
        <div className="dow">{title}</div>
      </header>
      <div className="day-body">
        {/* Evenementen bovenaan, dunne regels */}
        {events.length ? (
          events.map((e) => (
            <div key={e.id} className="muted" style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
              <span className="dot" style={{ width: 6, height: 6, background: "rgba(255,255,255,.5)" }} />
              <span title={e.title} style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {e.title}
              </span>
            </div>
          ))
        ) : (
          <div className="muted" style={{ fontSize: 12 }}>
            Geen evenementen
          </div>
        )}

        {/* Diensten */}
        {items.length ? items.map((s) => <ShiftCard key={s.id} s={s} />) : <div className="muted">Geen diensten</div>}
      </div>
    </section>
  );
}

/* -------------------- CSV export (gepland) -------------------- */
function csvExport(rows) {
  const header = [
    "Employee",
    "Date",
    "Location",
    "Location Kind",
    "Team",
    "Role",
    "Shift Start",
    "Shift End",
    "Break (min)",
    "Concept",
    "Status",
  ];
  const lines = rows.map((r) => {
    const loc = byId(SAMPLE_LOCATIONS, r.locationId);
    const concept = byId(SAMPLE_CONCEPTS, r.conceptId);
    const role = byId(ROLES, r.roleId)?.name || "";
    return [
      r.employee,
      r.date,
      loc?.name || "",
      loc?.kind || "",
      r.team,
      role,
      r.start,
      r.end,
      r.breakMin,
      concept?.name || "",
      r.status,
    ]
      .map((v) => `"${String(v).replaceAll('"', '""')}"`)
      .join(",");
  });
  return [header.join(","), ...lines].join("\n");
}

/* -------------------- HOOFDPAGINA -------------------- */
export default function RoosterPage() {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => startOfWeekMonday(new Date("2025-11-03")));
  const [shifts] = useState(SAMPLE_SHIFTS);

  const weekDays = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));
    const names = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"];
    return days.map((d, i) => ({
      title: names[i],
      iso: fmtISO(d),
      date: fmtNL(d),
      items: shifts.filter((s) => s.date === fmtISO(d)),
      events: SAMPLE_EVENTS.filter((e) => e.date === fmtISO(d)),
    }));
  }, [currentWeekStart, shifts]);

  const handleExport = () => {
    const csv = csvExport(shifts.filter((s) => weekDays.some((d) => d.iso === s.date)));
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `uren-week-${fmtNL(currentWeekStart)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* bovenste kaart met week-toolbar en knoppen */}
      <div className="card" style={{ padding: 16 }}>
        <div className="rooster-header">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button className="btn btn-ghost" onClick={() => setCurrentWeekStart(startOfWeekMonday(new Date()))}>
              Vandaag
            </button>
            <div className="week-toolbar">
              <button className="btn" onClick={() => setCurrentWeekStart(addDays(currentWeekStart, -7))}>
                ◀︎
              </button>
              <div className="week-pill">
                Week {isoWeekNumber(currentWeekStart)} • {fmtNL(currentWeekStart)} – {fmtNL(addDays(currentWeekStart, 6))}
              </div>
              <button className="btn" onClick={() => setCurrentWeekStart(addDays(currentWeekStart, 7))}>
                ▶︎
              </button>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn" onClick={handleExport}>
              Exporteer uren (CSV)
            </button>
          </div>
        </div>

        {/* 7 kolommen */}
        <div className="rooster-grid">
          {weekDays.map((d) => (
            <DayColumn key={d.iso} title={d.title} date={d.date} events={d.events} items={d.items} />
          ))}
        </div>
      </div>

      {/* onderkaart met simpele urenregistratie-tabel */}
      <div className="card" style={{ padding: 16 }}>
        <h3 style={{ margin: "0 0 10px 4px" }}>Urenregistratie – deze week</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Medewerker</th>
              <th>Gepland (hh:mm)</th>
              <th>Geregistreerd (hh:mm)</th>
            </tr>
          </thead>
          <tbody>
            {/* simpel totaal: som per medewerker op basis van geplande tijden */}
            {(() => {
              const byEmp = new Map();
              function parseHHMM(str) {
                const [h, m] = String(str || "0:0").split(":").map(Number);
                return (h || 0) * 60 + (m || 0);
              }
              for (const s of SAMPLE_SHIFTS) {
                const key = s.employee;
                const planned = Math.max(0, parseHHMM(s.end) - parseHHMM(s.start) - (s.breakMin || 0));
                const rec = byEmp.get(key) || { planned: 0, actual: 0 };
                rec.planned += planned;
                byEmp.set(key, rec);
              }
              const rows = Array.from(byEmp.entries());
              const fmt = (min) => `${Math.floor(min / 60)}:${String(min % 60).padStart(2, "0")}`;
              return rows.map(([name, v]) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{fmt(v.planned)}</td>
                  <td>0:00</td>
                </tr>
              ));
            })()}
          </tbody>
        </table>
      </div>
    </div>
  );
}
