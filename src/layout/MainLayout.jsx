import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const linkStyle = ({ isActive }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '10px 12px',
  borderRadius: '10px',
  textDecoration: 'none',
  color: isActive ? '#0f172a' : '#334155',
  background: isActive ? '#e2e8f0' : 'transparent',
  fontWeight: 500
});

export default function Layout(){
  return (
    <div style={{display:'grid', gridTemplateColumns:'240px 1fr', minHeight:'100vh', fontFamily:'ui-sans-serif, system-ui'}}>
      <aside style={{borderRight:'1px solid #e2e8f0', background:'#fff', padding:'16px'}}>
        <div style={{fontSize:18, fontWeight:700, marginBottom:12}}>Stadslab</div>
        <nav style={{display:'grid', gap:6}}>
          <NavLink style={linkStyle} to="/">Dashboard</NavLink>
          <div style={{fontSize:12, color:'#64748b', margin:'10px 0 6px'}}>Modules</div>
          <NavLink style={linkStyle} to="/backoffice">Backoffice</NavLink>
          <NavLink style={linkStyle} to="/foodtruck">Foodtruck manuals</NavLink>
        </nav>
      </aside>
      <main style={{padding:'20px'}}>
        <Outlet />
      </main>
    </div>
  )
}