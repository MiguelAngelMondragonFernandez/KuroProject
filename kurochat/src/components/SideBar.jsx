import React, { useState, useEffect } from 'react'
import { VirtualScroller } from 'primereact/virtualscroller';
import Settings from './Settings';
import { LanguageProvider } from './LanguageContext';

function SideBar({ asignarIdChat }) {
    const [friends, setFriends] = useState([{}])
    const [isMounted, setIsMounted] = useState(false)
    const [state, setState] = useState("listChats")

    const getListFriends = () => {
        const list = [
            {
                id: 1,
                name: "John Doe",
                avatar: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png",
            },
            {
                id: 2,
                name: "Jane Doe",
                avatar: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png",
            },
            {
                id: 2,
                name: "Jane Doe",
                avatar: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png",
            },
            {
                id: 2,
                name: "Jane Doe",
                avatar: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
            },
            {
                id: 2,
                name: "Jane Doe",
                avatar: "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png",
            },
        ]
        if (list.length > 0)
            setFriends(list)
    }

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (isMounted) {
            getListFriends()
        }
    }, [isMounted])

    const itemTemplate = (item) => {
        return (
            <div className="flex flex-row"    style={{background:"var(--theme-color)" ,color:"Var(--text-color)"}} onClick={() => asignarIdChat(item.id)}>
                <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full" />
                <div className="flex flex-col">
                    <span>{item.name}</span>
                    <span>Online</span>
                </div>
            </div>
        )
    }
    return (
        <>
            {
                state === "listChats" ? (
                    <>
                        <div className="flex flex-col"   style={{background:"var(--theme-color)" ,color:"Var(--text-color)"}}>
                            <div className="grid">
                                <div className="col-6 flex flex-row">
                                    <h3>Chats</h3>
                                </div>
                                <div className="col-6 flex flex-row">
                                    <i className="pi pi-cog hover:bg-blue-50" style={{ fontSize: '2rem' }} onClick={() => setState("config")}></i>
                                    <i className="pi pi-comment  hover:bg-blue-50" style={{ fontSize: '2rem' }} onClick={() => setState("addChat")}></i>
                                </div>
                            </div>
                        </div>
                        <div   style={{background:"var(--theme-color)" ,color:"Var(--text-color)"}}>
                            <VirtualScroller
                                itemSize={100}
                                style={{ width: '50%', height: '500px' }}
                                items={friends}
                                itemTemplate={itemTemplate}
                            />
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