import React from 'react'
import { ChatView } from '../components/chat/ChatView'
import SideBar from '../components/SideBar'

function View() {
  const [idChat, setIdChat] = React.useState(null)
  const [nameChat, setNameChat] = React.useState(null)
  const asignarIdChat = (id, name) => {
    setIdChat(id);
    setNameChat(name);
  };
  return (
    <>
    <div className="flex flex-row">
      <div className="flex flex-column col-3"><SideBar asignarIdChat={asignarIdChat} /></div>

      {
        idChat ? (
          <div className="flex flex-column col-9"><ChatView idChat={idChat} name={nameChat} /></div>
        ) : (
          <div className="flex flex-column col-9 " style={{width: '100vh'}}> No hay un chat seleccionado</div>
        )
      }
   
    </div>
    </>
  )
}

export default View