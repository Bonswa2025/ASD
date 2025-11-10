import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, NavLink, Outlet } from 'react-router-dom'
import Foodtruck from '@/modules/foodtruck'     // <— jouw component
import Dashboard from '@/modules/dashboard'   
import Rooster from '@/modules/rooster';// of een simpele placeholder

function Layout(){
  return (
    <div style={{display:'grid', gridTemplateColumns:'220px 1fr', minHeight:'100vh', fontFamily:'system-ui'}}>
      <aside style={{borderRight:'1px solid #e5e7eb', padding:16}}>
        <div style={{fontWeight:700, marginBottom:12}}>Stadslab</div>
        <nav style={{display:'grid', gap:8}}>
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/foodtruck">Foodtruck</NavLink>
        </nav>
      </aside>
      <main style={{padding:20}}>
        <Outlet />
      </main>
    </div>
  )
}

const router = createBrowserRouter([
  { path: '/', element: <Layout />, children: [
      { index: true, element: <Dashboard /> },
      { path: 'foodtruck', element: <Foodtruck /> },
      { path: '*', element: <Dashboard /> },
    { path: 'rooster', element: <Rooster /> },
  ] }
])

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
