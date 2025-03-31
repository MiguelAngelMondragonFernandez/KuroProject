import React, { useState, useEffect, useRef } from 'react';
import { VirtualScroller } from 'primereact/virtualscroller';
import { InputText } from 'primereact/inputtext';
import Message from './Message';
import axios from '../../utils/httpgateway';

export const ChatView = ({idChat, name}) => {
    const [isMounted, setIsMounted] = useState(false);
    const [items, setItems] = useState([]);
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState(null); // Estado para almacenar el ID del usuario autenticado
    const fileInputRef = useRef(null);
    const virtualScrollerRef = useRef(null);
    const [heartBeat, setHeartBeat] = useState(name);


    const getMessage = async () => {
        try {
            await axios.doGet('mensajes/get/'+idChat+'/')
            .then(response => {
                const { mensajes } = response.data;
                setItems(mensajes);
                setHeartBeat(name)
                
            })
        } catch (error) {
            console.error('Error al obtener mensajes:', error);
        }
    };

    useEffect(() => {
        setIsMounted(true);
    },[])

    useEffect(() => {
        getMessage();
    }, [isMounted, idChat]);

    useEffect(() => {
        if (virtualScrollerRef.current) {
            virtualScrollerRef.current.scrollToIndex(items.length - 1);
        }
    }, [items]);

    const handleSendMessage = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const data = {
            "mensaje": message,
            "fecha": new Date().toISOString().split('T')[0],
            "url_image": '',
            "usuario": user.id,
            "conversacion": idChat
        }
        if(user)
            await axios.doPost(`mensajes/post/${idChat}/`, data)
        .then(response => {
            getMessage();
            setMessage('');
        })
        .catch(error => {
            console.error('Error al enviar el mensaje:', error);
        })
    };

    const handleSendImage = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Archivo seleccionado:', file);
            
        }
    };

    const itemTemplate = (item) => {
        if (!item) return null;

        return (
            <Message
                idUser={item.user}
                message={item.mensaje}
                date={item.fecha}
            />
        );
    };

    return (
        <>
            <div className="flex flex-row " style={{background:"var(--theme-color)" ,color:"Var(--text-color)"}} >
                <p>{heartBeat}</p>
            </div>
            <div className="flex justify-content-center"  style={{background:"var(--theme-color)" ,color:"Var(--text-color)"}}>
                <VirtualScroller
                    ref={virtualScrollerRef}
                    items={items}
                    itemSize={50}
                    itemTemplate={itemTemplate}
                    className="border-1 surface-border border-round w-full "
                    style={{ height: '85vh', overflowY: 'auto', background: "#EEE3CF" }}
                />
            </div>
            <div className="flex flex-row p-2" style={{ backgroundColor: 'var(--theme-color)', color: 'var(--text-color)', borderColor: 'var(--text-color)' }} >
                <i
                    className="pi pi-image"
                    style={{ fontSize: '2rem', marginLeft: '10px', marginRight: '15px' }}
                    onClick={handleSendImage}
                ></i>
                <InputText
                    placeholder="Escribe tu mensaje"
                    className="w-full"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                   style={{background: 'transparent'}}
                />
                <i
                    className="pi pi-send"
                    style={{ fontSize: '2rem', marginLeft: '10px' }}
                    onClick={handleSendMessage}
                ></i>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
            </div>
        </>
    );
};