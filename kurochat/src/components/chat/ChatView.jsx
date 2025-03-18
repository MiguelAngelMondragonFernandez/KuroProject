import React, { useState, useEffect, useRef } from 'react';
import { VirtualScroller } from 'primereact/virtualscroller';
import { InputText } from 'primereact/inputtext';
import Message from './Message';

export const ChatView = () => {
    const [items, setItems] = useState([]);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef(null);
    const virtualScrollerRef = useRef(null); // Referencia al VirtualScroller

    const getMessage = () => {
        const listMessages = [
            { idUser: 1, message: 'Hello', date: "2021-09-01T00:00:00.000Z" },
            { idUser: 2, message: 'Hi', date: "2021-09-01T00:00:00.000Z" },
            { idUser: 1, message: 'How are you?', date: "2021-09-01T00:00:00.000Z" },
            { idUser: 2, message: 'I am fine', date: "2021-09-01T00:00:00.000Z" },
            { idUser: 1, message: 'Good to hear that', date: "2021-09-01T00:00:00.000Z" }
        ];
        setItems(listMessages);
    };

    useEffect(() => {
        getMessage();
    }, []);

    // Forzar el scroll al final cuando se actualiza la lista de mensajes
    useEffect(() => {
        if (virtualScrollerRef.current) {
            virtualScrollerRef.current.scrollToIndex(items.length - 1); // Scroll al último elemento
        }
    }, [items]);

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            const newMessage = {
                idUser: 1,
                message: message,
                date: new Date().toISOString()
            };
            setItems((prevItems) => [...prevItems, newMessage]); // Agregar el nuevo mensaje
            setMessage(''); // Limpiar el input
        }
    };

    const handleSendImage = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Archivo seleccionado:', file);
            // Aquí puedes agregar la lógica para enviar la imagen
        }
    };
const itemTemplate = (item) => {
    if (!item) return null; // Manejo de elementos vacíos

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
            <div className="flex flex-row">
                <p>nombre de la persona</p>
            </div>
            <div className="card flex justify-content-center">
                <VirtualScroller
                    ref={virtualScrollerRef} // Referencia al VirtualScroller
                    items={items}
                    itemSize={50}
                    itemTemplate={itemTemplate}
                    className="border-1 surface-border border-round w-full h-screen"
                />
            </div>
            <div className="flex flex-row">
                <InputText
                    placeholder="Escribe tu mensaje"
                    className="w-full"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <i
                    className="pi pi-image"
                    style={{ fontSize: '2rem', marginLeft: '10px' }}
                    onClick={handleSendImage}
                ></i>
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