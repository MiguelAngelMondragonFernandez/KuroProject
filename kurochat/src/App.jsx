import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router'
import { AuthProvider } from './auth/AuthContext'
import { ThemeProvider } from './components/chat/ThemeProvider'; 

import 'primeicons/primeicons.css';
        

function App() {

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