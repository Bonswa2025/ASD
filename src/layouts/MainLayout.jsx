import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Home, Users2, Truck, CalendarDays } from "lucide-react";

export default function MainLayout() {
  const { pathname } = useLocation();

  const pageTitle =
    pathname === "/backoffice"
      ? "Backoffice"
      : pathname === "/foodtruck"
      ? "Foodtruck"
      : pathname === "/rooster"
      ? "Rooster"
      : "Dashboard";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "240px 1fr",
        minHeight: "100vh",
        background: "#f8fafc",
        color: "#0f172a",
      }}
    >
      {/* === Sidebar === */}
      <aside
        style={{
          background: "#0f172a",
          color: "white",
          padding: "20px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Brand / logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontWeight: 600,
            fontSize: 18,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "#22c55e",
              color: "#0f172a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
            }}
          >
            S
          </div>
          Stadslab
        </div>

        {/* Navigation */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            marginTop: 12,
          }}
        >
          <NavItem to="/" icon={<Home />} label="Dashboard" />
          <SectionLabel>Modules</SectionLabel>
          <NavItem to="/backoffice" icon={<Users2 />} label="Backoffice" />
          <NavItem to="/foodtruck" icon={<Truck />} label="Foodtruck" />
          <NavItem to="/rooster" icon={<CalendarDays />} label="Rooster" />
        </nav>

        <div
          style={{
            marginTop: "auto",
            opacity: 0.6,
            fontSize: 12,
            textAlign: "center",
            paddingTop: 12,
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          v0.1 • Stadslab demo
        </div>
      </aside>

      {/* === Content === */}
      <section>
        {/* Topbar */}
        <header
          style={{
            background: "white",
            borderBottom: "1px solid #e2e8f0",
            padding: "14px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <h1 style={{ fontSize: 18, fontWeight: 600 }}>{pageTitle}</h1>
          <div style={{ fontSize: 13, color: "#64748b" }}>GitHub → Vercel</div>
        </header>

        {/* Main outlet */}
        <main
          style={{
            padding: "24px",
            minHeight: "calc(100vh - 60px)",
            background: "#f8fafc",
          }}
        >
          <Outlet />
        </main>
      </section>
    </div>
  );
}

/* === Helpers === */

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      end
      style={({ isActive }) => ({
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 10px",
        borderRadius: 8,
        color: isActive ? "#22c55e" : "#cbd5e1",
        background: isActive ? "rgba(34,197,94,0.1)" : "transparent",
        textDecoration: "none",
        fontSize: 14,
        fontWeight: isActive ? 600 : 500,
        transition: "background 0.15s, color 0.15s",
      })}
    >
      <span style={{ width: 18, height: 18 }}>{icon}</span>
      {label}
    </NavLink>
  );
}

function SectionLabel({ children }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 600,
        textTransform: "uppercase",
        opacity: 0.6,
        margin: "10px 0 4px 6px",
      }}
    >
      {children}
    </div>
  );
}
