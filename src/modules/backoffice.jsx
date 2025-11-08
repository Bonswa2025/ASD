// ─────────────────────────────────────────────
// Backoffice Module (PDF functionaliteit tijdelijk verwijderd)
// ─────────────────────────────────────────────

import React, { useState } from "react";

function Backoffice() {
  const [docs, setDocs] = useState([
    { id: "1", naam: "Voorbeeld document", beschrijving: "Upload PDF functie later" },
  ]);

  const addDoc = () => {
    setDocs([
      ...docs,
      { id: Date.now().toString(), naam: "Nieuw document", beschrijving: "Nog geen PDF gekoppeld" },
    ]);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📁 Backoffice Module</h1>
      <p>Hier kun je later PDF-documenten beheren. Voor nu is de functie uitgezet.</p>

      <ul>
        {docs.map((doc) => (
          <li key={doc.id}>
            <strong>{doc.naam}</strong>
            <br />
            <small>{doc.beschrijving}</small>
          </li>
        ))}
      </ul>

      <button onClick={addDoc} style={{ marginTop: "1rem" }}>
        Voeg document toe
      </button>
    </div>
  );
}

export default Backoffice;
