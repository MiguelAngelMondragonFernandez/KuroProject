import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css'
import '/node_modules/primeflex/primeflex.css'
import 'primeflex/themes/primeone-dark.css';
import 'primeicons/primeicons.css';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)