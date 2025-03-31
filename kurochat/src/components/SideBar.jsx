import React, { useState, useEffect } from 'react'
import { VirtualScroller } from 'primereact/virtualscroller';
import Settings from './Settings';
import { LanguageProvider } from './LanguageContext';
import axios from '../utils/httpgateway';

function SideBar({ asignarIdChat }) {
    const [friends, setFriends] = useState([])
    const [isMounted, setIsMounted] = useState(false)
    const [state, setState] = useState("listChats")

    const fetchChats = async () => {
        try {
            const response = await axios.doGet('chats'); 
            setFriends(response.data); 
        } catch (error) {
            console.error("Error al obtener los chats:", error);
        }
    };
    

    useEffect(() => {
        fetchChats();
    }, []);

    const itemTemplate = (item) => {
        return (
            <div
                className="flex p-3 cursor-pointer hover:bg-gray-800 rounded-lg"
                style={{ background: "var(--theme-color)", color: "var(--text-color)" }}
                onClick={() => asignarIdChat(item.usuario_id)}
            >
                <img
                    src={item.url_imagen}
                    alt={item.name}
                    className="w-2 h-2 rounded-full object-cover mt-1"
                />
                <div className="ml-3">
                    <div className="font-bold text-white">{item.name}</div>
                    <div className="text-sm text-gray-400">{item.ultimo_mensaje}</div>
                </div>
            </div>
        )
    }
    return (
        <>
            {
                state === "listChats" ? (
                    <>
                        <div className="flex flex-col" style={{ background: "var(--theme-color)", color: "Var(--text-color)" }}>
                            <div className="flex">
                                <div className="col-6 flex flex-row">
                                    <h3>Chats</h3>
                                </div>
                                <div className="col-6 flex flex-row align-items-center ">
                                    <i className="pi pi-cog hover:text-blue-400 cursor-pointer" style={{ fontSize: '2rem' }} onClick={() => setState("config")}></i>
                                    <i className="pi pi-comment  hover:text-blue-400 cursor-pointer" style={{ fontSize: '2rem' }} onClick={() => setState("addChat")}></i>
                                </div>
                            </div>
                        </div>
                        <div style={{ background: "var(--theme-color)", color: "Var(--text-color)" }}>
                            {friends.length === 0 ? (
                              <div className='text-center text-gray-400 py-10'>No hay chats por el momento</div>  
                            ) : (
                                <VirtualScroller
                                itemSize={100}
                                style={{ width: '30%', height: '500px' }}
                                items={friends}
                                itemTemplate={itemTemplate}
                            />
                            )}
                        </div>
                    </>
                ) : (
                    <LanguageProvider>
                        <Settings />
                    </LanguageProvider>
                )
            }
        </>
    )
}

export default SideBar