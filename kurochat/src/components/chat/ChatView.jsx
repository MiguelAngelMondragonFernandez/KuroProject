import React, { useState, useEffect, useRef } from 'react';
import { VirtualScroller } from 'primereact/virtualscroller';
import { InputText } from 'primereact/inputtext';
import Message from './Message';
import axios from '../../utils/httpgateway';

export const ChatView = () => {
    const [items, setItems] = useState([]);
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState(null); // Estado para almacenar el ID del usuario autenticado
    const fileInputRef = useRef(null);
    const virtualScrollerRef = useRef(null);

    // Obtener el ID del usuario autenticado
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.doGet('auth/user/'); 
                setUserId(response.data.idUser); 
            } catch (error) {
                console.error('Error al obtener el usuario autenticado:', error);
            }
        };

        fetchUser();
    }, []);

    const getMessage = async () => {
        try {
            const response = await axios.doGet('mensajes/api/');
            setItems(response.data); 
        } catch (error) {
            console.error('Error al obtener mensajes:', error);
        }
    };

    useEffect(() => {
        getMessage();
    }, []);

    useEffect(() => {
        if (virtualScrollerRef.current) {
            virtualScrollerRef.current.scrollToIndex(items.length - 1);
        }
    }, [items]);

    const handleSendMessage = async () => {
        if (message.trim() !== '' && userId) {
            const newMessage = {
                idUser: userId, 
                message: message,
                date: new Date().toISOString(),
            };

            try {
                const response = await axios.doPost('mensajes/api/', newMessage);
                setItems((prevItems) => [...prevItems, response.data]); 
                setMessage(''); // Limpia el input
            } catch (error) {
                console.error('Error al enviar mensaje:', error);
            }
        }
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
                idUser={item.idUser}
                message={item.message}
                date={item.date}
            />
        );
    };

    return (
        <>
            <div className="flex flex-row " style={{background:"var(--theme-color)" ,color:"Var(--text-color)"}} >
                <p>nombre de la persona</p>
            </div>
            <div className="card flex justify-content-center"  style={{background:"var(--theme-color)" ,color:"Var(--text-color)"}}>
                <VirtualScroller
                    ref={virtualScrollerRef}
                    items={items}
                    itemSize={50}
                    itemTemplate={itemTemplate}
                    className="border-1 surface-border border-round w-full h-screen "
                />
            </div>
                    className="border-1 surface-border border-round w-full h-screen"
                    style={{ backgroundColor: '#EEE3CF' ,color:"Var(--text-color)" }}
                />
            </div>
            <div className="flex flex-row">
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
                    style={{ backgroundColor: 'var(--theme-color)', color: 'var(--text-color)', borderColor: 'var(--text-color)' }} 
                />
                <i
                    className="pi pi-send"
                    style={{ fontSize: '2rem', marginLeft: '15px' }}
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