import { useState } from 'react'
import './App.css'
import SideBar from './components/SideBar'
import { ChatView } from './components/chat/ChatView'
import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import { AuthProvider } from './auth/AuthContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
