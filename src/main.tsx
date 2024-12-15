import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './assets/components/App/App.tsx'
import './assets/styles/index.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
