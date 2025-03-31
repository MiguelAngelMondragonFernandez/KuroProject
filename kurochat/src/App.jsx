import { useState } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import { useState } from 'react'
import './App.css'
import SideBar from './components/SideBar'
import { ChatView } from './components/chat/ChatView'
import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import { AuthProvider } from './auth/AuthContext'
import { ThemeProvider } from './components/chat/ThemeProvider'; 

function App() {
  const [count, setCount] = useState(0);

  return (
    <AuthProvider>
    <ThemeProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
    </AuthProvider>
  )
}

export default App;