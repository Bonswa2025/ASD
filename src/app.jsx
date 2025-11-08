// src/App.jsx
import React from "react";
import { Outlet } from "react-router-dom"; // als je geen router gebruikt, mag dit weg

export default function App() {
  return (
    <div className="min-h-screen">
      {/* Sidebar-component is verwijderd */}
      {/* <Sidebar />  ← dit bestond eerst, is nu weg */}
      <main className="w-full">
        {/* Als je React Router gebruikt: */}
        <Outlet />
        {/* Of render hier je bestaande content / pagina-componenten */}
      </main>
    </div>
  );
}
