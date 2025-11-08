// ─────────────────────────────────────────────
// Rooster Module (TS removed, pure React + JSX)
// ─────────────────────────────────────────────

import React, { useState } from "react";

function RoosterModule() {
  const [employees, setEmployees] = useState([
    // voorbeelddata — pas aan naar wens
    { id: "1", naam: "Jan", functie: "Kok" },
    { id: "2", naam: "Sanne", functie: "Bediening" },
  ]);

  const addEmployee = () => {
    setEmployees([
      ...employees,
      {
        id: Date.now().toString(),
        naam: "Nieuwe medewerker",
        functie: "Functie onbekend",
      },
    ]);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>👥 Personeel & Rooster</h1>
      <p>Beheer hier je medewerkers of voeg nieuwe toe.</p>

      {employees.length === 0 ? (
        <div className="text-sm text-gray-600">
          Nog geen medewerkers toegevoegd.
        </div>
      ) : (
        <ul style={{ marginTop: "1rem" }}>
          {employees.map((emp) => (
            <li key={emp.id} style={{ marginBottom: "0.5rem" }}>
              <strong>{emp.naam}</strong> — {emp.functie}
            </li>
          ))}
        </ul>
      )}

      <button onClick={addEmployee} style={{ marginTop: "1rem" }}>
        Voeg medewerker toe
      </button>
    </div>
  );
}

export default RoosterModule;
