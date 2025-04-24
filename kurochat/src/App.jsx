import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router'
import { AuthProvider } from './auth/AuthContext'
import { ThemeProvider } from './components/chat/ThemeProvider'; 

import 'primeicons/primeicons.css';
import { LanguageProvider } from './components/LanguageContext';
        

function App() {

  const [update, setUpdate] = React.useState(false);

  const handleUpdate = () => {
    setUpdate(!update);
    localStorage.setItem('update', JSON.stringify(!update));
  }

  React.useEffect(() => {
    const storedUpdate = localStorage.getItem('update');
    if (!storedUpdate) {
      localStorage.setItem('update', JSON.stringify(false));
      window.location.reload();
    }
  }, []); // Removed dependency on `update` to avoid reload loop

  return (
    <AuthProvider>
    <LanguageProvider>
    <ThemeProvider>
      <BrowserRouter>
        <Router updateLast = {handleUpdate} />
      </BrowserRouter>
    </ThemeProvider>
    </LanguageProvider>
    </AuthProvider>
  )
}

export default App;