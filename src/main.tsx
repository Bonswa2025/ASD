import React from 'react'
import { createRoot } from 'react-dom/client'
import StadslabSuiteHub from './app.jsx'
import './index.css'

// Modules (wired via props)
import Foodtruck from './modules/foodtruck'
import Backoffice from './modules/backoffice'
import Personeel from './modules/personeel/index'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StadslabSuiteHub
      foodtruckComponent={Foodtruck}
      backofficeComponent={Backoffice}
      staffComponent={Personeel}
    />
  </React.StrictMode>
)
