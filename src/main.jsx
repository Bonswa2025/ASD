// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './styles/app.css';            // ← stap 1: globale styling
import MainLayout from './layout/MainLayout.jsx'; // ← stap 3: jouw layout met sidebar
import App from './App.jsx';          // home (laat jouw bestaande App.jsx staan)
import RoosterPage from './modules/rooster.jsx';  // ← stap 4: roosterpagina

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Alle pagina’s krijgen dezelfde layout + sidebar */}
        <Route element={<MainLayout />}>
          {/* Homepagina gebruikt je bestaande App.jsx */}
          <Route index element={<App />} />

          {/* Rooster */}
          <Route path="/rooster" element={<RoosterPage />} />

          {/* 👉 hier kun je later je andere routes toevoegen, b.v.:
              <Route path="/bestellingen" element={<BestellingenPage />} />
              <Route path="/medewerkers" element={<MedewerkersPage />} />
          */}

          {/* Fallback voor onbekende routes */}
          <Route
            path="*"
            element={
              <div className="page">
                <h2>Pagina niet gevonden</h2>
                <p className="muted">Controleer het adres of ga terug naar de startpagina.</p>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

