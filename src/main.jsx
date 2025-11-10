import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'

// super simpele, veilige pagina's
function SafeLayout() {
  return (
    <div style={{fontFamily:'system-ui', padding:20}}>
      <h1>App online ✅</h1>
      <nav style={{display:'flex', gap:10, margin:'12px 0'}}>
        <Link to="/">Dashboard</Link>
        <Link to="/foodtruck">Foodtruck</Link>
      </nav>
      <div id="page"><OutletFallback /></div>
    </div>
  )
}

function OutletFallback() {
  return <div>Route geladen.</div>
}

function Dashboard() {
  return <div>Dashboard OK</div>
}

function Foodtruck() {
  return <div>Foodtruck OK (dummy). Als je dit ziet, werkt routing correct.</div>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <SafeLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'foodtruck', element: <Foodtruck /> },
      { path: '*', element: <Dashboard /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
