import React, { useContext } from 'react';
import { ChatView } from '../components/chat/ChatView'
import SideBar from '../components/SideBar'
import { LanguageContext } from '../components/LanguageContext';

function View() {
  const {translations} = useContext(LanguageContext);
  const [idChat, setIdChat] = React.useState(null)
  const [nameChat, setNameChat] = React.useState(null)
  const asignarIdChat = (id, name) => {
    setIdChat(id);
    setNameChat(name);
  };
  return (
    <>
    <div className="flex flex-row h-full" style={{ background: "var(--theme-color)", color: "Var(--text-color)" }}>
      <div className="flex flex-column col-3"><SideBar asignarIdChat={asignarIdChat} /></div>

      {
        idChat ? (
          <div className="flex flex-column col-9 h-full"><ChatView idChat={idChat} name={nameChat} /></div>
        ) : (
          <div className="flex flex-column col-9 " style={{width: '100vh'}}>{translations.selectChat}</div>
        )
      }
   
    </div>
    </>
  )
}

export default View