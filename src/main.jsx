// src/main.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, NavLink, Outlet } from 'react-router-dom'

// Pagina's
import Dashboard from '@/modules/dashboard'
import Foodtruck from '@/modules/foodtruck'
import Rooster from '@/modules/rooster'

// Simpele layout met sidebar + menu
function Layout(){
  return (
    <div style={{display:'grid', gridTemplateColumns:'220px 1fr', minHeight:'100vh', fontFamily:'system-ui'}}>
      <aside style={{borderRight:'1px solid #e5e7eb', padding:16}}>
        <div style={{fontWeight:700, marginBottom:12}}>Stadslab</div>
        <nav style={{display:'grid', gap:8}}>
          <NavLink to="/" end>Dashboard</NavLink>
          <div style={{fontSize:12, color:'#64748b', margin:'8px 0 0'}}>Modules</div>
          <NavLink to="/foodtruck">Foodtruck</NavLink>
          {/* ✅ Rooster zichtbaar in menu */}
          <NavLink to="/rooster">Rooster</NavLink>
        </nav>
      </aside>
      <main style={{padding:20}}>
        <Outlet />
      </main>
    </div>
  )
}

// Router met extra route voor /rooster
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'foodtruck', element: <Foodtruck /> },
      { path: 'rooster', element: <Rooster /> },   // ✅ deze opent jouw roosterpagina
      { path: '*', element: <Dashboard /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
