import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Home, Users2, Truck, Settings } from 'lucide-react';
import { Home, Users2, Truck, CalendarDays } from 'lucide-react'; // ← CalendarDays erbij

const linkClass = ({ isActive }) => 'menu-link' + (isActive ? ' active' : '');
export default function Layout(){
  const { pathname } = useLocation();
  const label = pathname==='/backoffice' ? 'Backoffice' : pathname==='/foodtruck' ? 'Foodtruck' : 'Dashboard';
  return (
    <div style={{display:'grid', gridTemplateColumns:'260px 1fr', minHeight:'100vh'}}>
      <aside className="sidebar" style={{padding:'18px 16px'}}>
        <div className="brand" style={{marginBottom:14}}>
          <div className="brand-badge">S</div>
          <div>Stadslab</div>
        </div>
        <nav className="menu" style={{display:'grid', gap:8}}>
          <NavLink to="/" className={({isActive})=> isActive ? 'active' : ''} >
            <span className="icon"><Home /></span> Dashboard
          </NavLink>
          <div style={{fontSize:12, color:'#94a3b8', margin:'12px 0 6px'}}>Modules</div>
          <NavLink to="/backoffice" className={({isActive})=> isActive ? 'active' : ''} >
            <span className="icon"><Users2 /></span> Backoffice
        <NavLink to="/foodtruck" className={({isActive})=> isActive ? 'active' : ''} >
  <span className="icon">F</span> Foodtruck manuals
</NavLink>

        </nav>
        <div style={{marginTop:'auto', opacity:.8, fontSize:12, color:'#94a3b8'}}>v0.1 • demo</div>
<nav className="menu" style={{ display: 'grid', gap: 8 }}>
  <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
    <span className="icon"><Home /></span> Dashboard
  </NavLink>

  <div style={{ fontSize: 12, color: '#94a3b8', margin: '12px 0 6px' }}>Modules</div>

  <NavLink to="/backoffice" className={({ isActive }) => (isActive ? 'active' : '')}>
    <span className="icon"><Users2 /></span> Backoffice
  </NavLink>

  <NavLink to="/foodtruck" className={({ isActive }) => (isActive ? 'active' : '')}>
    <span className="icon"><Truck /></span> Foodtruck manuals
  </NavLink>

  {/* ← NIEUW: Rooster */}
  <NavLink to="/rooster" className={({ isActive }) => (isActive ? 'active' : '')}>
    <span className="icon"><CalendarDays /></span> Rooster
  </NavLink>
</nav>
        </aside>
      <section>
        <div className="topbar">
          <div className="container" style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <div style={{fontWeight:600}}>{label}</div>
            <div style={{fontSize:13, color:'#94a3b8'}}>GitHub → Vercel</div>
          </div>
        </div>
        <main className="container" style={{padding:'20px'}}>
          <Outlet />
        </main>
      </section>
    </div>
  )
}
