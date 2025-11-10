import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '@/layout/MainLayout'
import Dashboard from '@/modules/dashboard'
import Backoffice from '@/modules/backoffice'
import Foodtruck from '@/modules/foodtruck'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'backoffice', element: <Backoffice /> },
      { path: 'foodtruck', element: <Foodtruck /> },
    ]
  }
])

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)