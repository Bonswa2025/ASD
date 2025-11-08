import React, { useMemo, useState } from "react";
import RoosterModule from "./rooster_module";
import EmployeeCard from "./components/EmployeeCard";
import { EmployeesContext } from "./context/EmployeesContext";

/**
 * PersoneelsbeheerDemoApp.jsx (herschreven)
 * - Eén gedeelde bron van waarheid via EmployeesContext
 * - Rooster gebruikt dezelfde EmployeeCard als Beheer
 * - Zelfde sample data als startpunt
 */

// Helpers
const to2 = (n) => String(n).padStart(2, "0");
const todayISO = () => { const d=new Date(); return `${d.getFullYear()}-${to2(d.getMonth()+1)}-${to2(d.getDate())}`; };
const addDaysISO = (base, days) => { const d = new Date(base); d.setDate(d.getDate()+days); return `${d.getFullYear()}-${to2(d.getMonth()+1)}-${to2(d.getDate())}`; };

// Sample data
const SAMPLE_EMPLOYEES = [
  { id: "eva",  name: "Eva Janssen",  role: "Bediening",  phone: "+31 6 1234 0000", emergencyPhone: "+31 6 9999 1111", notes: "Bar en terras" },
  { id: "sam",  name: "Sam de Vries", role: "Keuken",     phone: "+31 6 1234 1111", emergencyPhone: "+31 6 2222 4444", notes: "Allergenen-specialist" },
  { id: "luca", name: "Luca Peters",  role: "Bar",        phone: "+31 6 1234 2222", emergencyPhone: "+31 6 5555 6666", notes: "Cocktail training gedaan" },
];
const BASE = todayISO();
const SAMPLE_SHIFTS = [
  { id: 1, date: BASE,               start: "10:00", end: "18:00", employeeId: "eva",  team: "Bediening", roleId: "service",   status: "confirmed" },
  { id: 2, date: BASE,               start: "11:00", end: "19:00", employeeId: "sam",  team: "Keuken",    roleId: "kitchen",  status: "pending" },
  { id: 3, date: BASE,               start: "12:00", end: "20:00", employeeId: "luca", team: "Bar",       roleId: "bar",      status: "confirmed" },
  { id: 4, date: addDaysISO(BASE,1), start: "09:00", end: "17:00", employeeId: "eva",  team: "Bediening", roleId: "service",  status: "confirmed" },
  { id: 5, date: addDaysISO(BASE,1), start: "13:00", end: "21:00", employeeId: "sam",  team: "Keuken",    roleId: "kitchen",  status: "confirmed" },
  { id: 6, date: addDaysISO(BASE,2), start: "12:00", end: "18:00", employeeId: "luca", team: "Bar",       roleId: "bar",      status: "confirmed" },
];

// UI shells
const TabButton = ({ active, children, ...rest }) => (
  <button
    {...rest}
    className={`px-3 py-2 rounded-xl border ${active ? "bg-black text-white" : "bg-white hover:bg-gray-50"}`}
  >
    {children}
  </button>
);

const Section = ({ title, children, right }) => (
  <section className="space-y-3">
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold">{title}</h2>
      {right}
    </div>
    <div>{children}</div>
  </section>
);

// Personeelsbeheer lijst die dezelfde EmployeeCard gebruikt
function BeheerLijst() {
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState({ id: "", name: "", role: "", phone: "" });
  const { employees, setEmployees, shifts, setShifts } = React.useContext(EmployeesContext);

  const onDeleteEmployee = (id) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
    setShifts(prev => prev.filter(s => s.employeeId !== id));
  };

  const onEdit = (emp) => {
    setDraft(emp);
    setShowForm(true);
  };

  const saveDraft = () => {
    setEmployees(prev => {
      const exists = prev.some(e => e.id === draft.id);
      return exists ? prev.map(e => e.id === draft.id ? draft : e) : [...prev, draft];
    });
    setShowForm(false);
    setDraft({ id: "", name: "", role: "", phone: "" });
  };

  return (
    <div className="space-y-6">
      <Section
        title="Medewerkers"
        right={<button className="px-3 py-2 rounded-xl border" onClick={() => setShowForm(true)}>Nieuw</button>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map(emp => (
            <EmployeeCard
              key={emp.id}
              employee={emp}
              shifts={shifts.filter(s => s.employeeId === emp.id)}
              onEdit={() => onEdit(emp)}
              onDelete={() => onDeleteEmployee(emp.id)}
            />
          ))}
        </div>
      </Section>

      {showForm && (
        <Section title={draft?.id ? "Medewerker bewerken" : "Nieuwe medewerker"}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="text-sm">ID
              <input className="mt-1 w-full border rounded-lg p-2" value={draft.id} onChange={e => setDraft({...draft, id: e.target.value})} />
            </label>
            <label className="text-sm">Naam
              <input className="mt-1 w-full border rounded-lg p-2" value={draft.name} onChange={e => setDraft({...draft, name: e.target.value})} />
            </label>
            <label className="text-sm">Rol
              <input className="mt-1 w-full border rounded-lg p-2" value={draft.role} onChange={e => setDraft({...draft, role: e.target.value})} />
            </label>
            <label className="text-sm">Telefoon
              <input className="mt-1 w-full border rounded-lg p-2" value={draft.phone} onChange={e => setDraft({...draft, phone: e.target.value})} />
            </label>
          </div>
          <div className="flex gap-2 mt-3">
            <button className="px-3 py-2 rounded-xl border" onClick={saveDraft}>Opslaan</button>
            <button className="px-3 py-2 rounded-xl border" onClick={() => setShowForm(false)}>Annuleren</button>
          </div>
        </Section>
      )}
    </div>
  );
}

// Demo app
export default function PersoneelsbeheerDemoApp() {
  const [tab, setTab] = useState("rooster");
  const [employees, setEmployees] = useState(SAMPLE_EMPLOYEES);
  const [shifts, setShifts] = useState(SAMPLE_SHIFTS);

  return (
    <EmployeesContext.Provider value={{ employees, setEmployees, shifts, setShifts }}>
      <div className="p-4 space-y-6">
        <div className="flex items-center gap-2">
          <TabButton active={tab==="rooster"} onClick={() => setTab("rooster")}>Rooster</TabButton>
          <TabButton active={tab==="uren"} onClick={() => setTab("uren")}>Uren</TabButton>
          <TabButton active={tab==="beheer"} onClick={() => setTab("beheer")}>Beheer</TabButton>
        </div>

        {tab==="rooster" && (
          <div className="space-y-6">
            <Section title="Weekrooster">
              <RoosterModule
                onEditEmployee={(emp)=>{}}
                onDeleteEmployee={(id)=>{
                  setEmployees(prev=>prev.filter(e=>e.id!==id));
                  setShifts(prev=>prev.filter(s=>s.employeeId!==id));
                }}
              />
            </Section>
          </div>
        )}

        {tab==="uren" && (
          <div className="text-sm text-gray-600">Uren-registratie (demo placeholder).</div>
        )}

        {tab==="beheer" && (
          <BeheerLijst />
        )}
      </div>
    </EmployeesContext.Provider>
  );
}
