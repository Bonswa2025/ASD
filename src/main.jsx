import React from 'react'
import { createRoot } from 'react-dom/client'
import StadslabSuiteHub from './app.jsx'
import './index.css'

// Modules (wired via props)
import Foodtruck from './modules/foodtruck.jsx'
import Backoffice from './modules/backoffice.jsx'
import Personeel from './modules/personeel/index.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StadslabSuiteHub
      foodtruckComponent={Foodtruck}
      backofficeComponent={Backoffice}
      staffComponent={Personeel}
    />
  </React.StrictMode>
)
