import React, { useState, useEffect } from 'react'
import { VirtualScroller } from 'primereact/virtualscroller';
import Settings from './Settings';
import axios from '../utils/httpgateway';
import AddUser from './AddUser';
function SideBar({ asignarIdChat }) {
    const [friends, setFriends] = useState([])
    const [isMounted, setIsMounted] = useState(false)
    const [state, setState] = useState("listChats")
    const [showAddUserModal, setShowAddUserModal] = useState(false)
    const [userData, setUserData] = useState(null);
    const fetchChats = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            await axios.doGet(`conversaciones/get/${user.id}/`)
                .then(response => {
                    const { conversaciones } = response.data;
                    setFriends(conversaciones);
                })
                .catch(error => {
                    console.error("Error al obtener los chats:", error);
                })
        } catch (error) {
        }
    };
    const getUser = (() => {
        const data = localStorage.getItem('user');
        if (data) {
            setUserData(JSON.parse(data));
        }
    });
    useEffect(() => {
        getUser();
        fetchChats();
    }, []);
    const handleAddUser = (newChat) => {
        setFriends((prevFriends) => [...prevFriends, newChat]);
    };
    const itemTemplate = (item) => {
        return (
            <div
                className="flex p-3 cursor-pointer hover:bg-gray-800"
                style={{ background: "var(--theme-color)", color: "var(--text-color)" }}
                onClick={() => asignarIdChat(item.id, item.nombre_conversacion)}
            >
                <img
                    src={item.url_photo}
                    alt={item.nombre_conversacion}
                    className="border-circle"
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
                <div className="ml-3">
                    <div className="font-bold text-white">{item.nombre_conversacion}</div>
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
                        <div className="flex flex-col h-full" style={{ background: "var(--theme-color)", color: "Var(--text-color)" }}>
                            <div className="flex w-full">
                                <div className="col-8 flex flex-row">
                                    <h3 className='text-3xl font-bold'>Chats</h3>
                                </div>
                                <div className="col-4 flex flex-row gap-2 align-items-center">
                                    <i className="pi pi-cog hover:text-blue-400 cursor-pointer" style={{ fontSize: '2rem' }} onClick={() => setState("config")}></i>
                                    <i className="pi pi-comment hover:text-blue-400 cursor-pointer" style={{ fontSize: '2rem' }} onClick={() => setShowAddUserModal(true)}></i>
                                </div>
                            </div>
                        </div>
                        <div style={{ background: "var(--theme-color)", color: "Var(--text-color)" }}>
                            {friends.length === 0 ? (
                                <div className='text-center text-gray-400 py-10'>No hay chats por el momento</div>
                            ) : (
                                <VirtualScroller
                                    itemSize={100}
                                    style={{ width: '100%', height: '87vh' }}
                                    items={friends}
                                    itemTemplate={itemTemplate}
                                />
                            )}
                        </div>
                        {showAddUserModal && (
                            <div
                                style={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    zIndex: 50,
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: 'black',
                                        padding: '20px',
                                        borderRadius: '8px',
                                        maxWidth: '400px',
                                        width: '100%',
                                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    <AddUser
                                        onClose={() => setShowAddUserModal(false)}
                                        onAddUser={handleAddUser}
                                    />
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <Settings setState={setState} userData={userData} getUser={getUser} />
                )
            }
        </>
    )
}
export default SideBar