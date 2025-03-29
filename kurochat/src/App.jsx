import { useState } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import { ThemeProvider } from './components/chat/ThemeProvider'; 

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;