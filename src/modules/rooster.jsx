"use client";
import React, { useMemo, useState } from "react";

/* ──────────────────────────────────────────────────────────────────────────
   DEMO DATA (vervang later door echte API/webhook-data)
────────────────────────────────────────────────────────────────────────── */
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

const EMPLOYEES = [
  { id: "eva", name: "Eva" },
  { id: "sam", name: "Sam" },
  { id: "luca", name: "Luca" },
];

const ROLES = [
  { id: "shiftlead", name: "Shift leader" },
  { id: "keuken", name: "Keuken" },
  { id: "bediening", name: "Bediening" },
  { id: "afwas", name: "Afwas" },
];

const SAMPLE_SHIFTS = [
  { id: 10, date: "2025-11-03", day: "Ma", start: "09:00", end: "17:00", breakMin: 30, team: "Keuken", roleId: "keuken", employee: "Sam", conceptId: "broodjes", locationId: "home", status: "confirmed" },
  { id: 11, date: "2025-11-04", day: "Di", start: "10:00", end: "18:00", breakMin: 30, team: "Zaal", roleId: "shiftlead", employee: "Eva", conceptId: "gemaal", locationId: "home", status: "confirmed" },
  { id: 12, date: "2025-11-05", day: "Wo", start: "12:00", end: "20:00", breakMin: 30, team: "Bar", roleId: "bediening", employee: "Luca", conceptId: "pinsa", locationId: "ext-park", status: "pending" },
  { id: 13, date: "2025-11-06", day: "Do", start: "17:00", end: "23:00", breakMin: 30, team: "Afwas", roleId: "afwas", employee: "—", conceptId: "burger", locationId: "home", status: "open" },
  { id: 14, date: "2025-11-07", day: "Vr", start: "18:00", end: "23:00", breakMin: 15, team: "Zaal", roleId: "bediening", employee: "Eva", conceptId: "bbq", locationId: "ext-hall", status: "confirmed" },
  { id: 1,  date: "2025-11-08", day: "Za", start: "10:00", end: "18:00", breakMin: 30, team: "Zaal", roleId: "bediening", employee: "Eva", conceptId: "gemaal", locationId: "home", status: "confirmed" },
  { id: 2,  date: "2025-11-08", day: "Za", start: "11:00", end: "19:00", breakMin: 30, team: "Keuken", roleId: "keuken", employee: "Sam", conceptId: "bbq", locationId: "ext-park", status: "pending" },
  { id: 3,  date: "2025-11-08", day: "Za", start: "12:00", end: "20:00", breakMin: 30, team: "Bar", roleId: "bediening", employee: "Luca", conceptId: "storm", locationId: "home", status: "confirmed" },
  { id: 6,  date: "2025-11-08", day: "Za", start: "13:00", end: "21:00", breakMin: 30, team: "Afwas", roleId: "afwas", employee: "—", conceptId: "gemaal", locationId: "home", status: "open" },
  { id: 4,  date: "2025-11-09", day: "Zo", start: "09:00", end: "17:00", breakMin: 30, team: "Zaal", roleId: "shiftlead", employee: "Eva", conceptId: "pinsa", locationId: "ext-hall", status: "confirmed" },
  { id: 5,  date: "2025-11-09", day: "Zo", start: "12:00", end: "21:00", breakMin: 45, team: "Keuken", roleId: "keuken", employee: "Sam", conceptId: "burger", locationId: "home", status: "open" },
  { id: 7,  date: "2025-11-09", day: "Zo", start: "15:00", end: "22:00", breakMin: 30, team: "Afwas", roleId: "afwas", employee: "Luca", conceptId: "burger", locationId: "home", status: "pending" },
];

const SAMPLE_EVENTS = [
  { id: "e1", date: "2025-11-03", title: "30 x broodjes – Gemeentehuis" },
  { id: "e2", date: "2025-11-05", title: "120 x pizza – Pinsa promo" },
  { id: "e3", date: "2025-11-07", title: "200 x friet – Suikerunie" },
  { id: "e4", date: "2025-11-08", title: "80 x burgers – Stadslab BBQ" },
  { id: "e5", date: "2025-11-08", title: "Borrel – Gemaal" },
  { id: "e6", date: "2025-11-09", title: "Brunch – Pinsa pop-up" },
];

/* ──────────────────────────────────────────────────────────────────────────
   DATE HELPERS
────────────────────────────────────────────────────────────────────────── */
function startOfWeekMonday(d) {
  const date = new Date(d);
  const day = (date.getDay() + 6) % 7; // 0 = maandag
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

/* ──────────────────────────────────────────────────────────────────────────
   SELF-TESTS (optioneel, voor demo integriteit)
────────────────────────────────────────────────────────────────────────── */
function runSelfTests() {
  try {
    const fri = SAMPLE_EVENTS.filter((e) => e.date === "2025-11-07").length;
    const sat = SAMPLE_EVENTS.filter((e) => e.date === "2025-11-08").length;
    console.assert(fri >= 1 && sat >= 1, "SelfTest: events op Vr/Za verwacht");

    const requiredIso = [
      "2025-11-03","2025-11-04","2025-11-05","2025-11-06","2025-11-07","2025-11-08","2025-11-09",
    ];
    requiredIso.forEach((d) => {
      const count = SAMPLE_SHIFTS.filter((s) => s.date === d).length;
      console.assert(count >= 1, "SelfTest: ≥1 shift verwacht op: " + d);
    });
  } catch (e) {
    console.warn("SelfTests error", e);
  }
}

/* ──────────────────────────────────────────────────────────────────────────
   KLEINE UI HELPERS
────────────────────────────────────────────────────────────────────────── */
function byId(arr, id) {
  return arr.find((x) => x.id === id);
}

function RoleBadge({ roleId }) {
  const r = ROLES.find((x) => x.id === roleId);
  if (!r) return null;
  return (
    <span
      className="px-2 py-0.5 rounded-full text-[10px] bg-gray-100 text-gray-800 border border-gray-200 truncate max-w-[40%]"
      title={`Rol: ${r.name}`}
    >
      {r.name}
    </span>
  );
}

function LegendChip({ label, color }) {
  const style = { backgroundColor: color };
  return (
    <span className="px-3 py-1 rounded-full text-sm shadow-sm" style={style}>
      <span className="font-medium text-black/80">{label}</span>
    </span>
  );
}

function CollapsibleLegend({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-white shadow-sm text-sm hover:bg-gray-50"
        aria-expanded={open}
      >
        <span className="select-none">{title}</span>
        <span className="text-gray-500">{open ? "▾" : "▸"}</span>
      </button>
      {open && <div className="mt-2 flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}

function ConceptBadge({ conceptId }) {
  const c = byId(SAMPLE_CONCEPTS, conceptId);
  if (!c) return null;
  return (
    <span
      className="px-2 py-0.5 rounded-full text-xs font-medium truncate max-w-[60%]"
      style={{ backgroundColor: c.color }}
      title={`Concept: ${c.name}`}
    >
      {c.name}
    </span>
  );
}

function EventLine({ title }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className={`relative text-xs text-gray-700 flex flex-col gap-1 cursor-pointer transition-all duration-200 w-[70%] max-w-[70%] ${
        expanded
          ? "z-[999] w-[110%] max-w-[110%] md:w-[105%] md:max-w-[105%] lg:w-[110%] lg:max-w-[110%] p-2 bg-white border rounded-lg shadow-sm"
          : "z-0"
      }`}
    >
      <div className="flex items-center gap-2 min-h-[20px]">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400" />
        <span className="truncate font-medium whitespace-nowrap" title={title}>
          {title}
        </span>
      </div>
      {expanded && (
        <div className="text-[11px] text-gray-500 border-t pt-1">
          <div>Event-ID: —</div>
          <div>Bron: MICE webhook</div>
          <div>Status: gepland</div>
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   URENREGISTRATIE HELPERS
────────────────────────────────────────────────────────────────────────── */
function parseHHMM(str) {
  const [h, m] = String(str || "0:0").split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}
function minutesBetween(startHHMM, endHHMM) {
  return Math.max(0, parseHHMM(endHHMM) - parseHHMM(startHHMM));
}
function minutesBetweenISO(isoStart, isoEnd) {
  const a = new Date(isoStart);
  const b = new Date(isoEnd);
  return Math.max(0, Math.round((b.getTime() - a.getTime()) / 60000));
}
function fmtHours(min) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h}:${String(m).padStart(2, "0")}`;
}

/* ──────────────────────────────────────────────────────────────────────────
   KAARTJES
────────────────────────────────────────────────────────────────────────── */
function StatusChip({ status }) {
  const text =
    status === "confirmed" ? "Bevestigd" : status === "pending" ? "Wacht" : status === "open" ? "Open" : status;
  const classes =
    status === "confirmed"
      ? "bg-green-100 text-green-800"
      : status === "pending"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-blue-100 text-blue-800";
  return <span className={`px-2 py-0.5 rounded-full text-xs ${classes}`}>{text}</span>;
}

function ShiftCard({ shift, actual, onClockIn, onClockOut }) {
  const [expanded, setExpanded] = useState(false);
  const loc = byId(SAMPLE_LOCATIONS, shift.locationId);
  const concept = byId(SAMPLE_CONCEPTS, shift.conceptId);
  const borderColor = loc?.color || "#e5e7eb";

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      role="button"
      aria-expanded={expanded}
      className={`rounded-lg shadow-sm bg-white border flex flex-col shrink-0 relative ${
        expanded ? "z-[999]" : "z-0"
      } ${expanded ? "w-[110%] max-w-[110%] md:w-[105%] md:max-w-[105%] lg:w-[110%] lg:max-w-[110%]" : "w-[95%] max-w-[95%] md:w-[80%] md:max-w-[80%] lg:w-[70%] lg:max-w-[70%]"} cursor-pointer transition-all duration-200 ${
        expanded ? "p-2 gap-1 h-auto" : "p-2 h-14 overflow-hidden"
      }`}
      style={{ borderLeft: `6px solid ${borderColor}` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="font-semibold text-sm">
          {shift.start}–{shift.end}
        </div>
        <div className="flex items-center gap-1">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: concept?.color || "#e5e7eb" }}
            title={concept ? `Concept: ${concept.name}` : "Concept onbekend"}
          />
          {expanded && concept && (
            <span
              className="px-2 py-0.5 rounded-full text-xs font-medium truncate max-w-[60%]"
              style={{ backgroundColor: concept.color }}
              title={`Concept: ${concept.name}`}
            >
              {concept.name}
            </span>
          )}
        </div>
      </div>

      {/* Collapsed */}
      {!expanded && <div className="text-xs text-gray-700 truncate">{shift.employee}</div>}

      {/* Expanded */}
      {expanded && (
        <>
          <div className="text-xs text-gray-700 flex items-center gap-1 overflow-hidden">
            <span className="truncate">{shift.team}</span>
            <span>•</span>
            <span className="font-medium truncate">{shift.employee}</span>
            <span>•</span>
            <RoleBadge roleId={shift.roleId} />
          </div>
          <div className="text-[11px] text-gray-500 flex items-center gap-1.5">
            <span
              className="inline-flex items-center gap-1"
              title={loc?.kind === "home" ? "Thuis locatie" : "Externe locatie"}
            >
              <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: borderColor }} />
              {loc?.name}
            </span>
            <span>• Pauze {shift.breakMin}m</span>
            <StatusChip status={shift.status} />
          </div>
          <div className="mt-1 text-[11px] text-gray-600 border-t pt-1">
            <div>Shift-ID: {shift.id}</div>
            <div>Locatie-type: {loc?.kind}</div>
          </div>

          {/* Urenregistratie */}
          {(() => {
            const planned = Math.max(0, minutesBetween(shift.start, shift.end) - (shift.breakMin || 0));
            const aIn = actual?.in || null;
            const aOut = actual?.out || null;
            const actualMin = aIn && aOut ? Math.max(0, minutesBetweenISO(aIn, aOut) - (shift.breakMin || 0)) : null;
            return (
              <div className="mt-2 rounded-lg border bg-gray-50 p-2 text-[11px] flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Gepland</span>
                  <span className="font-medium">{fmtHours(planned)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Geregistreerd</span>
                  <span className="font-medium">{actualMin != null ? fmtHours(actualMin) : "—"}</span>
                </div>
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClockIn && onClockIn("shift");
                    }}
                    className="px-2 py-1 rounded border bg-white"
                  >
                    In (shift)
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClockIn && onClockIn("now");
                    }}
                    className="px-2 py-1 rounded border bg-white"
                  >
                    In (nu)
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClockOut && onClockOut("shift");
                    }}
                    className="px-2 py-1 rounded border bg-white"
                  >
                    Uit (shift)
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClockOut && onClockOut("now");
                    }}
                    className="px-2 py-1 rounded border bg-white"
                  >
                    Uit (nu)
                  </button>
                </div>
                {aIn && <div className="text-gray-500">In: {new Date(aIn).toLocaleString()}</div>}
                {aOut && <div className="text-gray-500">Uit: {new Date(aOut).toLocaleString()}</div>}
              </div>
            );
          })()}
        </>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   MODALS
────────────────────────────────────────────────────────────────────────── */
function AddShiftModal({ open, onClose, onCreate, weekStart, employeeOptions = [], defaultDayIndex = 0 }) {
  const [name, setName] = useState(employeeOptions[0] || "");
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("17:00");
  const [locationId, setLocationId] = useState(SAMPLE_LOCATIONS[0]?.id || "home");
  const [conceptId, setConceptId] = useState(SAMPLE_CONCEPTS[0]?.id || SAMPLE_CONCEPTS[0]?.id);
  const [dayIndex, setDayIndex] = useState(defaultDayIndex ?? 0);

  if (!open) return null;
  const dayLabels = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date(weekStart);
    date.setDate(date.getDate() + dayIndex);
    const iso = fmtISO(date);
    const newShift = {
      id: Date.now(),
      date: iso,
      day: dayLabels[dayIndex],
      start,
      end,
      breakMin: 30,
      team: "Keuken",
      roleId: "keuken",
      employee: name,
      conceptId,
      locationId,
      status: "open",
    };
    onCreate(newShift);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-[420px] bg-white rounded-2xl shadow-xl border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Dienst toevoegen</h3>
          <button onClick={onClose} className="px-2 py-1 rounded-md hover:bg-gray-100" aria-label="Sluiten">
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Naam</label>
            <select value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 rounded-lg border">
              {employeeOptions.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Start</label>
              <input type="time" value={start} onChange={(e) => setStart(e.target.value)} className="w-full px-3 py-2 rounded-lg border" required />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Einde</label>
              <input type="time" value={end} onChange={(e) => setEnd(e.target.value)} className="w-full px-3 py-2 rounded-lg border" required />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Locatie</label>
            <select value={locationId} onChange={(e) => setLocationId(e.target.value)} className="w-full px-3 py-2 rounded-lg border">
              {SAMPLE_LOCATIONS.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Concept</label>
            <select value={conceptId} onChange={(e) => setConceptId(e.target.value)} className="w-full px-3 py-2 rounded-lg border">
              {SAMPLE_CONCEPTS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Dag (deze week)</label>
            <select value={dayIndex} onChange={(e) => setDayIndex(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border">
              {dayLabels.map((d, i) => (
                <option key={d} value={i}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div className="pt-1 flex items-center justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-2 rounded-lg border">
              Annuleren
            </button>
            <button type="submit" className="px-3 py-2 rounded-lg bg-black text-white">
              Opslaan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FilterModal({ open, onClose, initial, onApply, employeeOptions }) {
  const [employee, setEmployee] = useState(initial.employeeFilter ?? "all");
  const [role, setRole] = useState(initial.roleFilter ?? "all");
  const [locKind, setLocKind] = useState(initial.locationKindFilter ?? "all");
  if (!open) return null;
  const reset = () => {
    setEmployee("all");
    setRole("all");
    setLocKind("all");
  };
  const apply = () => {
    onApply({ employeeFilter: employee, roleFilter: role, locationKindFilter: locKind });
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/30">
      <div className="w-[420px] bg-white rounded-2xl shadow-xl border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Filters</h3>
          <button onClick={onClose} className="px-2 py-1 rounded-md hover:bg-gray-100" aria-label="Sluiten">
            ✕
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Medewerker</label>
            <select value={employee} onChange={(e) => setEmployee(e.target.value)} className="w-full px-3 py-2 rounded-lg border">
              <option value="all">Iedereen</option>
              {employeeOptions.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Rol</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-3 py-2 rounded-lg border">
              <option value="all">Alle rollen</option>
              {ROLES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Locatie type</label>
            <select value={locKind} onChange={(e) => setLocKind(e.target.value)} className="w-full px-3 py-2 rounded-lg border">
              <option value="all">Alle</option>
              <option value="home">Stadslab</option>
              <option value="external">Op locatie</option>
            </select>
          </div>
          <div className="pt-1 flex items-center justify-between gap-2">
            <button onClick={reset} className="px-3 py-2 rounded-lg border">
              Reset
            </button>
            <div className="flex items-center gap-2">
              <button onClick={onClose} className="px-3 py-2 rounded-lg border">
                Annuleren
              </button>
              <button onClick={apply} className="px-3 py-2 rounded-lg bg-black text-white">
                Toepassen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   MAAND GRID (compact)
────────────────────────────────────────────────────────────────────────── */
function getInitials(name) {
  if (!name) return "?";
  const parts = String(name).trim().split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function MonthGridCompact({ anchorDate, shifts = [], onDayClick }) {
  const firstOfMonth = new Date(anchorDate.getFullYear(), anchorDate.getMonth(), 1);
  const start = startOfWeekMonday(firstOfMonth);
  const days = Array.from({ length: 42 }, (_, i) => addDays(start, i));
  const isSameMonth = (d) => d.getMonth() === anchorDate.getMonth();
  const weekLabels = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];
  const byDate = (iso) => shifts.filter((s) => s.date === iso);

  return (
    <div className="bg-white rounded-xl border p-2">
      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekLabels.map((l) => (
          <div key={l} className="text-xs font-medium text-gray-600 text-center">
            {l}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((d) => {
          const iso = fmtISO(d);
          const list = byDate(iso);
          const shown = list.slice(0, 3);
          const overflow = list.length - shown.length;
          return (
            <div
              key={d.toISOString()}
              onClick={() => onDayClick && onDayClick(d)}
              className={`h-28 p-1.5 rounded-lg border text-[11px] flex flex-col cursor-pointer group ${
                isSameMonth(d) ? "bg-white" : "bg-gray-50 text-gray-400"
              }`}
            >
              <div className="font-medium text-xs mb-1 flex items-center justify-between">
                <span>{d.getDate()}</span>
                <span className="text-[10px] px-1 rounded border bg-white opacity-0 group-hover:opacity-100" title="Snel dienst toevoegen">
                  + dienst
                </span>
              </div>
              <div className="flex-1 flex flex-col gap-1 overflow-hidden">
                {shown.length === 0 ? (
                  <div className="text-[10px] text-gray-300">—</div>
                ) : (
                  shown.map((s) => {
                    const loc = byId(SAMPLE_LOCATIONS, s.locationId);
                    const concept = byId(SAMPLE_CONCEPTS, s.conceptId);
                    return (
                      <div
                        key={s.id}
                        className="flex items-center gap-1 truncate rounded-md border bg-white px-1 py-0.5"
                        style={{ borderLeft: `4px solid ${loc?.color || "#e5e7eb"}` }}
                        title={`${s.start}–${s.end} • ${s.employee}`}
                      >
                        <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: concept?.color || "#9ca3af" }} />
                        <span className="truncate">
                          {s.start}-{s.end}
                        </span>
                        <span className="opacity-40">•</span>
                        <span className="truncate">{getInitials(s.employee)}</span>
                      </div>
                    );
                  })
                )}
                {overflow > 0 && <div className="text-[10px] text-gray-500">+{overflow} meer…</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   CSV EXPORT
────────────────────────────────────────────────────────────────────────── */
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
    return [
      r.employee,
      r.date,
      loc?.name || "",
      loc?.kind || "",
      r.team,
      (ROLES.find((x) => x.id === r.roleId)?.name) || "",
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

/* ──────────────────────────────────────────────────────────────────────────
   DAGKOLOM
────────────────────────────────────────────────────────────────────────── */
function DayColumn({ title, date, events, items, dayIndex, onQuickAdd, actuals, onClockIn, onClockOut }) {
  return (
    <div className="flex-1 min-w-[190px]">
      <div
        className="sticky top-0 z-10 bg-gray-50/80 backdrop-blur p-2 rounded-xl border mb-3 cursor-pointer group"
        onClick={() => onQuickAdd && onQuickAdd(dayIndex)}
      >
        <div className="text-sm text-gray-500">{date}</div>
        <div className="text-lg font-bold flex items-center justify-between">
          <span>{title}</span>
          <span className="text-xs px-2 py-0.5 rounded-md border bg-white opacity-0 group-hover:opacity-100 transition" title="Snel dienst toevoegen">
            + dienst
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[60vh] pr-1 border-t pt-2">
        <div className="flex flex-col gap-1">
          {events.length === 0 ? <div className="text-xs text-gray-400">Geen evenementen</div> : events.map((e) => <EventLine key={e.id} title={e.title} />)}
        </div>
        <div className="flex flex-col gap-2">
          {items.length === 0 ? (
            <div className="text-sm text-gray-500">Geen diensten</div>
          ) : (
            items.map((s) => (
              <ShiftCard key={s.id} shift={s} actual={actuals?.[s.id]} onClockIn={(mode) => onClockIn(s, mode)} onClockOut={(mode) => onClockOut(s, mode)} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   HOOFD-COMPONENT (pagina)
────────────────────────────────────────────────────────────────────────── */
export default function Page() {
  const [viewMode, setViewMode] = useState("week"); // 'day' | 'week' | 'month'
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [currentWeekStart, setCurrentWeekStart] = useState(() => startOfWeekMonday(new Date("2025-11-03")));

  const [employeeFilter, setEmployeeFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [locationKindFilter, setLocationKindFilter] = useState("all");

  const [shifts, setShifts] = useState(SAMPLE_SHIFTS);
  const [actuals, setActuals] = useState({});
  const [showAdd, setShowAdd] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [quickAddDayIndex, setQuickAddDayIndex] = useState(0);

  const employeeOptions = useMemo(() => {
    const set = new Set([...EMPLOYEES.map((e) => e.name), ...shifts.map((s) => s.employee)].filter(Boolean));
    return Array.from(set);
  }, [shifts]);

  const filtered = useMemo(() => {
    return shifts.filter((s) => {
      if (employeeFilter !== "all" && s.employee !== employeeFilter) return false;
      if (roleFilter !== "all" && s.roleId !== roleFilter) return false;
      if (locationKindFilter !== "all") {
        const loc = byId(SAMPLE_LOCATIONS, s.locationId);
        if (loc?.kind !== locationKindFilter) return false;
      }
      return true;
    });
  }, [employeeFilter, roleFilter, locationKindFilter, shifts]);

  const weekDays = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));
    const names = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"];
    const codes = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];
    return days.map((d, i) => ({
      code: codes[i],
      title: names[i],
      iso: fmtISO(d),
      date: fmtNL(d),
      items: filtered.filter((s) => s.date === fmtISO(d)),
      events: SAMPLE_EVENTS.filter((e) => e.date === fmtISO(d)),
    }));
  }, [filtered, currentWeekStart]);

  const handleExport = () => {
    const csv = csvExport(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "uren-week-gepland.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportActual = () => {
    const rows = filtered.map((s) => {
      const act = actuals[s.id];
      return { ...s, actualIn: act?.in || "", actualOut: act?.out || "" };
    });
    const header = [
      "Employee",
      "Date",
      "Shift Start",
      "Shift End",
      "Break (min)",
      "Actual In",
      "Actual Out",
      "Role",
      "Team",
      "Location",
      "Location Kind",
      "Concept",
      "Status",
    ];
    const lines = rows.map((r) => {
      const loc = byId(SAMPLE_LOCATIONS, r.locationId);
      const role = ROLES.find((x) => x.id === r.roleId)?.name || "";
      const concept = byId(SAMPLE_CONCEPTS, r.conceptId)?.name || "";
      const vals = [
        r.employee,
        r.date,
        r.start,
        r.end,
        r.breakMin,
        r.actualIn,
        r.actualOut,
        role,
        r.team,
        loc?.name || "",
        loc?.kind || "",
        concept,
        r.status,
      ];
      return vals.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(",");
    });
    const csv = [header.join(","), ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "uren-week-registratie.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  function handleClockIn(shift, mode) {
    const datePart = shift.date;
    const timePart = mode === "now" ? new Date().toTimeString().slice(0, 5) : shift.start;
    const iso = `${datePart}T${timePart}:00`;
    setActuals((prev) => ({ ...prev, [shift.id]: { ...prev[shift.id], in: iso } }));
  }
  function handleClockOut(shift, mode) {
    const datePart = shift.date;
    const timePart = mode === "now" ? new Date().toTimeString().slice(0, 5) : shift.end;
    const iso = `${datePart}T${timePart}:00`;
    setActuals((prev) => ({ ...prev, [shift.id]: { ...prev[shift.id], out: iso } }));
  }

  const totals = useMemo(() => {
    const byEmp = new Map();
    for (const s of filtered) {
      const planned = Math.max(0, minutesBetween(s.start, s.end) - (s.breakMin || 0));
      const act = actuals[s.id];
      const actual = act?.in && act?.out ? Math.max(0, minutesBetweenISO(act.in, act.out) - (s.breakMin || 0)) : 0;
      const rec = byEmp.get(s.employee) || { planned: 0, actual: 0 };
      rec.planned += planned;
      rec.actual += actual;
      byEmp.set(s.employee, rec);
    }
    return Array.from(byEmp.entries()).map(([employee, v]) => ({ employee, ...v }));
  }, [filtered, actuals]);

  useMemo(() => runSelfTests(), []);

  return (
    <div className="p-6 bg-gray-50 min-h-[100vh]">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <header className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold">Rooster – Week (Ma–Zo) Demo</h1>
          <p className="text-gray-600">
            7-daagse weergave. Onder elke dag staan <strong>evenementregels</strong> en daaronder de ingeplande diensten.
          </p>
          <div className="flex flex-wrap items-center gap-3 py-2 border-b">
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentWeekStart(addDays(currentWeekStart, -7))} className="px-2 py-1 rounded-lg border bg-white">
                ◂
              </button>
              <button onClick={() => setCurrentWeekStart(startOfWeekMonday(new Date()))} className="px-2 py-1 rounded-lg border bg-white">
                Vandaag
              </button>
              <button onClick={() => setCurrentWeekStart(addDays(currentWeekStart, 7))} className="px-2 py-1 rounded-lg border bg-white">
                ▸
              </button>
            </div>
            <div className="text-sm text-gray-700 font-medium">
              Week {isoWeekNumber(currentWeekStart)} • {fmtNL(currentWeekStart)} – {fmtNL(addDays(currentWeekStart, 6))}
            </div>
            <div className="ml-auto flex flex-col items-end gap-2">
              <button onClick={() => setShowAdd(true)} className="px-3 py-2 rounded-lg bg-black text-white">
                Dienst toevoegen
              </button>
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                <button onClick={() => setViewMode("day")} className={`px-3 py-1 rounded-md ${viewMode === "day" ? "bg-white border" : "opacity-70"}`}>
                  Dag
                </button>
                <button onClick={() => setViewMode("week")} className={`px-3 py-1 rounded-md ${viewMode === "week" ? "bg-white border" : "opacity-70"}`}>
                  Week
                </button>
                <button onClick={() => setViewMode("month")} className={`px-3 py-1 rounded-md ${viewMode === "month" ? "bg-white border" : "opacity-70"}`}>
                  Maand
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Legenda + Filters */}
        <section className="flex flex-row gap-4 items-start w-full">
          <div className="flex-shrink-0">
            <button onClick={() => setShowFilter(true)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-white shadow-sm hover:bg-gray-50">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 5h18l-7 8v6l-4 2v-8L3 5z" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
              <span className="text-sm">Filters</span>
            </button>
          </div>
          <div className="flex-shrink-0">
            <CollapsibleLegend title="Concepten" defaultOpen>
              {SAMPLE_CONCEPTS.map((c) => (
                <LegendChip key={c.id} label={c.name} color={c.color} />
              ))}
            </CollapsibleLegend>
          </div>
          <div className="flex-shrink-0">
            <CollapsibleLegend title="Locaties" defaultOpen>
              {SAMPLE_LOCATIONS.map((l) => (
                <LegendChip key={l.id} label={l.name} color={l.color} />
              ))}
            </CollapsibleLegend>
          </div>
        </section>

        {/* Weergaven */}
        {viewMode === "week" && (
          <main className="grid gap-2 grid-cols-1 md:grid-cols-7 auto-rows-min">
            {weekDays.map((d, i) => (
              <DayColumn
                key={d.code}
                title={d.title}
                date={d.date}
                events={d.events}
                items={d.items}
                dayIndex={i}
                onQuickAdd={(idx) => {
                  setQuickAddDayIndex(idx);
                  setShowAdd(true);
                }}
                actuals={actuals}
                onClockIn={handleClockIn}
                onClockOut={handleClockOut}
              />
            ))}
          </main>
        )}

        {viewMode === "day" && (
          <div>
            <div className="flex gap-2 mb-2">
              {weekDays.map((d, idx) => (
                <button key={d.code} onClick={() => setSelectedDayIdx(idx)} className={`px-3 py-1 rounded-lg border ${selectedDayIdx === idx ? "bg-white" : "bg-gray-100"}`}>
                  {d.code}
                </button>
              ))}
            </div>
            <DayColumn
              title={weekDays[selectedDayIdx].title}
              date={weekDays[selectedDayIdx].date}
              events={weekDays[selectedDayIdx].events}
              items={weekDays[selectedDayIdx].items}
              dayIndex={selectedDayIdx}
              onQuickAdd={(idx) => {
                setQuickAddDayIndex(idx);
                setShowAdd(true);
              }}
              actuals={actuals}
              onClockIn={handleClockIn}
              onClockOut={handleClockOut}
            />
          </div>
        )}

        {viewMode === "month" && (
          <MonthGridCompact
            anchorDate={currentWeekStart}
            shifts={filtered}
            onDayClick={(date) => {
              const start = startOfWeekMonday(date);
              const idx = (date.getDay() + 6) % 7;
              setCurrentWeekStart(start);
              setQuickAddDayIndex(idx);
              setShowAdd(true);
            }}
          />
        )}

        <footer className="pt-4">
          <div className="flex items-center justify-between">
            <button onClick={handleExport} className="px-4 py-2 rounded-xl bg-black text-white hover:opacity-90">
              Exporteer uren (CSV)
            </button>
            <span className="text-xs text-gray-400">
              Demo component – vervang SAMPLE_* met echte API-data. Events komen straks uit de MICE webhook
              (<code>/api/integrations/mice/webhook</code>).
            </span>
          </div>
        </footer>

        {/* Uren totaal per medewerker */}
        <section className="bg-white rounded-xl border p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Urenregistratie – deze week</h3>
            <div className="flex gap-2">
              <button onClick={handleExport} className="px-3 py-1.5 rounded-lg border bg-white">
                Export geplande uren
              </button>
              <button onClick={handleExportActual} className="px-3 py-1.5 rounded-lg border bg-white">
                Export registratie
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[480px] w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-2">Medewerker</th>
                  <th className="py-2">Gepland (hh:mm)</th>
                  <th className="py-2">Geregistreerd (hh:mm)</th>
                </tr>
              </thead>
              <tbody>
                {totals.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-6 text-center text-gray-400">
                      Geen rijen
                    </td>
                  </tr>
                ) : (
                  totals.map((row) => (
                    <tr key={row.employee} className="border-t">
                      <td className="py-2">{row.employee}</td>
                      <td className="py-2">{fmtHours(row.planned)}</td>
                      <td className="py-2">{fmtHours(row.actual)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {showFilter && (
          <FilterModal
            open={showFilter}
            onClose={() => setShowFilter(false)}
            initial={{ employeeFilter, roleFilter, locationKindFilter }}
            onApply={({ employeeFilter: eF, roleFilter: rF, locationKindFilter: lF }) => {
              setEmployeeFilter(eF);
              setRoleFilter(rF);
              setLocationKindFilter(lF);
            }}
            employeeOptions={employeeOptions}
          />
        )}

        {showAdd && (
          <AddShiftModal
            open={showAdd}
            onClose={() => setShowAdd(false)}
            onCreate={(shift) => setShifts((prev) => [...prev, shift])}
            weekStart={currentWeekStart}
            employeeOptions={employeeOptions}
            defaultDayIndex={quickAddDayIndex}
          />
        )}
      </div>
    </div>
  );
}
