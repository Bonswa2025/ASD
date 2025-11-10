// src/pages/Medewerkers.jsx
import { useEffect, useMemo, useState } from "react";
import { isValidPin, hashPin } from "../lib/security";
import { loadEmployees, saveEmployees } from "../lib/storage";

function masked(pinTail) {
  // toont alleen de laatste 2 cijfers van de pin (als memory aid), rest sterretjes
  return `***${pinTail}`;
}

const emptyForm = {
  id: null,
  naam: "",
  rol: "",
  email: "",
  telefoon: "",
  pin: "", // plaintext input alleen tijdelijk in formulier; we slaan hash op
};

export default function Medewerkers() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setList(loadEmployees());
  }, []);

  useEffect(() => {
    saveEmployees(list);
  }, [list]);

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return list;
    return list.filter(m =>
      [m.naam, m.rol, m.email, m.telefoon].some(v => (v || "").toLowerCase().includes(q))
    );
  }, [list, filter]);

  async function handleSave(e) {
    e.preventDefault();

    // basis validaties
    if (!form.naam.trim()) return alert("Voer een naam in.");
    if (form.pin && !isValidPin(form.pin)) return alert("PIN moet 5 cijfers zijn.");

    if (form.id == null) {
      // nieuw
      const id = crypto.randomUUID();
      const hashed = form.pin ? await hashPin(form.pin) : null;
      const pinTail = form.pin ? form.pin.slice(-2) : null;

      const nieuw = {
        id,
        naam: form.naam.trim(),
        rol: form.rol.trim(),
        email: form.email.trim(),
        telefoon: form.telefoon.trim(),
        pinHash: hashed,   // nooit de echte PIN opslaan
        pinTail,           // zodat medewerker z’n eigen code kan herkennen (laatste 2)
        actief: true,
        aangemaaktOp: new Date().toISOString(),
      };
      setList(prev => [nieuw, ...prev]);
    } else {
      // update
      const hashed = form.pin ? await hashPin(form.pin) : undefined;
      setList(prev =>
        prev.map(m =>
          m.id === form.id
            ? {
                ...m,
                naam: form.naam.trim(),
                rol: form.rol.trim(),
                email: form.email.trim(),
                telefoon: form.telefoon.trim(),
                ...(form.pin
                  ? { pinHash: hashed, pinTail: form.pin.slice(-2) }
                  : {}), // pin wijzigen is optioneel
              }
            : m
        )
      );
    }
    setForm(emptyForm);
  }

  function handleEdit(m) {
    setForm({
      id: m.id,
      naam: m.naam || "",
      rol: m.rol || "",
      email: m.email || "",
      telefoon: m.telefoon || "",
      pin: "", // leeg laten; alleen invullen als je PIN wil wijzigen
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(id) {
    if (!confirm("Weet je zeker dat je deze medewerker wilt verwijderen?")) return;
    setList(prev => prev.filter(m => m.id !== id));
  }

  function toggleActief(id) {
    setList(prev => prev.map(m => (m.id === id ? { ...m, actief: !m.actief } : m)));
  }

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Medewerkers</h1>

      {/* Formulier */}
      <form onSubmit={handleSave} className="grid gap-3 p-4 rounded-2xl border">
        <div className="grid md:grid-cols-2 gap-3">
          <input
            className="border rounded-xl p-3"
            placeholder="Naam"
            value={form.naam}
            onChange={e => setForm(f => ({ ...f, naam: e.target.value }))}
            required
          />
          <input
            className="border rounded-xl p-3"
            placeholder="Rol (bijv. Barista)"
            value={form.rol}
            onChange={e => setForm(f => ({ ...f, rol: e.target.value }))}
          />
          <input
            className="border rounded-xl p-3"
            placeholder="E-mail"
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          />
          <input
            className="border rounded-xl p-3"
            placeholder="Telefoon"
            value={form.telefoon}
            onChange={e => setForm(f => ({ ...f, telefoon: e.target.value }))}
          />
          <input
            className="border rounded-xl p-3"
            placeholder="5-cijferige PIN (alleen invullen om in te stellen/wijzigen)"
            value={form.pin}
            onChange={e => setForm(f => ({ ...f, pin: e.target.value }))}
            inputMode="numeric"
            maxLength={5}
            pattern="\d{5}"
          />
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl bg-black text-white">
            {form.id == null ? "Toevoegen" : "Opslaan"}
          </button>
          {form.id != null && (
            <button
              type="button"
              className="px-4 py-2 rounded-xl border"
              onClick={() => setForm(emptyForm)}
            >
              Annuleren
            </button>
          )}
        </div>

        <p className="text-sm text-gray-600">
          ⚠️ We bewaren <b>alleen</b> een beveiligde hash van de PIN (nooit de echte PIN in GitHub).
        </p>
      </form>

      {/* Zoeken/filter */}
      <div className="flex items-center gap-2">
        <input
          className="border rounded-xl p-3 w-full"
          placeholder="Zoek op naam, rol, e-mail of telefoon…"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </div>

      {/* Lijst kaarten */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(m => (
          <article key={m.id} className="rounded-2xl border p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{m.naam}</h2>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  m.actief ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                }`}
              >
                {m.actief ? "Actief" : "Inactief"}
              </span>
            </div>
            {m.rol && <p className="text-sm text-gray-700">{m.rol}</p>}
            <div className="text-sm text-gray-600 space-y-1">
              {m.email && <p>E-mail: {m.email}</p>}
              {m.telefoon && <p>Tel: {m.telefoon}</p>}
              {m.pinTail && (
                <p>
                  PIN: {masked(m.pinTail)}{" "}
                  <span className="text-xs">(alleen laatste 2 zichtbaar)</span>
                </p>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <button className="px-3 py-1 rounded-lg border" onClick={() => handleEdit(m)}>
                Bewerken
              </button>
              <button
                className="px-3 py-1 rounded-lg border"
                onClick={() => toggleActief(m.id)}
                title="Actief/Inactief"
              >
                {m.actief ? "Deactiveer" : "Activeer"}
              </button>
              <button
                className="px-3 py-1 rounded-lg bg-red-600 text-white"
                onClick={() => handleDelete(m.id)}
              >
                Verwijderen
              </button>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-600">Geen medewerkers gevonden. Voeg er hierboven eentje toe.</p>
      )}
    </div>
  );
}
