// ─────────────────────────────────────────────
// Foodtruck Module (JS version, no TypeScript)
// Types converted to comments for clarity
// ─────────────────────────────────────────────

// ChecklistItem
// { id, text, required? }

// MenuItem
// { id, naam, prijs?, beschrijving?, allergenen?, fotoUrl? }

// PakItem
// { id, naam, aantal?, eenheid?, opmerking?, verplicht? }

// Manual
// { id, naam, beschrijving?, actief, fotoTruckUrl?, infra, menu, apparatuur, logistiek?, opbouw, afbouw, bijzonderheden?, paklijst? }

import React, { useState } from "react";

// ----------------------------------------------------------------------------
// Component Start
// ----------------------------------------------------------------------------

function Foodtruck() {
  const [menuItems, setMenuItems] = useState([
    // voorbeelddata, pas aan naar wens
    { id: "1", naam: "Friet", prijs: "3.50", beschrijving: "Vers gebakken friet" },
    { id: "2", naam: "Bitterballen", prijs: "4.50", beschrijving: "Met mosterd" },
  ]);

  const addMenuItem = () => {
    setMenuItems([
      ...menuItems,
      { id: Date.now().toString(), naam: "Nieuw item", prijs: "", beschrijving: "" },
    ]);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🍟 Foodtruck Module</h1>
      <p>Beheer hier je foodtruck menu-items.</p>

      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            <strong>{item.naam}</strong> — €{item.prijs}
            <br />
            <small>{item.beschrijving}</small>
          </li>
        ))}
      </ul>

      <button onClick={addMenuItem} style={{ marginTop: "1rem" }}>
        Voeg menu-item toe
      </button>
    </div>
  );
}

// ----------------------------------------------------------------------------
// Export — nodig zodat Vercel en main.jsx dit component kunnen laden
// ----------------------------------------------------------------------------

export default Foodtruck;
