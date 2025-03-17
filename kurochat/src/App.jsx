import { useState } from 'react'
import './App.css'
import SideBar from './components/SideBar'
import { ChatView } from './components/ChatView'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="flex flex-row">
      <aside className="col-3">
        <SideBar />
      </aside>
      <div className="col-9">
        <ChatView />
        </div>
    </div>
    </>
  )
}

export default App
