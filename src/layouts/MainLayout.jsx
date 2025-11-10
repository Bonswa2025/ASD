// src/layout/MainLayout.jsx
import { Outlet, NavLink } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="logo">🍔 ASD Dashboard</div>
        <div className="hr" />
        <nav className="sidebar-nav">
          <NavLink to="/" end>Overzicht</NavLink>
          <NavLink to="/rooster">Rooster</NavLink>
          {/* Voeg later meer links toe: */}
          {/* <NavLink to="/bestellingen">Bestellingen</NavLink> */}
          {/* <NavLink to="/medewerkers">Medewerkers</NavLink> */}
          {/* <NavLink to="/rapportage">Rapportage</NavLink> */}
        </nav>
      </aside>

      <div>
        <header className="topbar">
          <div className="muted">Welkom</div>
          <div style={{ display:'flex', gap:8 }}>
            <button className="btn btn-ghost">Dienst toevoegen</button>
          </div>
        </header>

        <main className="page">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
