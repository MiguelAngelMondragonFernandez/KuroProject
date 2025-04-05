import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router'
import { AuthProvider } from './auth/AuthContext'
import { ThemeProvider } from './components/chat/ThemeProvider'; 

import 'primeicons/primeicons.css';
import { LanguageProvider } from './components/LanguageContext';
        

function App() {

  return (
    <AuthProvider>
    <LanguageProvider>
    <ThemeProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
    </LanguageProvider>
    </AuthProvider>
  )
}

export default App;