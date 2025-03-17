import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'
import '/node_modules/primeflex/primeflex.css'
import 'primeflex/themes/primeone-light.css';
import 'primeicons/primeicons.css';
import App from './App.jsx'
import UserForm from './users/UserForm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
