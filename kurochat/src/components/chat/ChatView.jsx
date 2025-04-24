import React, { useState, useEffect, useRef,useContext } from 'react';
import { VirtualScroller } from 'primereact/virtualscroller';
import { InputText } from 'primereact/inputtext';
import { LanguageContext } from '../LanguageContext';
import Message from './Message';
import axios from '../../utils/httpgateway';
import * as a from 'axios';
export const ChatView = ({idChat, name}) => {
    
    const {translations} = useContext(LanguageContext);
    const [isMounted, setIsMounted] = useState(false);
    const [items, setItems] = useState([]);
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState(null); // Estado para almacenar el ID del usuario autenticado
    const [file, setFile] = useState(null); // Estado para almacenar el archivo seleccionado
    const fileInputRef = useRef(null);
    const virtualScrollerRef = useRef(null);
    const [heartBeat, setHeartBeat] = useState(name);
    const [urlImage, setUrlImage] = useState('');

    const tratementMessage = (list) => {
        let previousDate = null;
        const newList = list.map((item) => {
            const date = item.fecha;
            if (date !== previousDate) {
                item.dateIdentificator = date;
                previousDate = date;
            }
            return item;
        });
        return newList;
    }

    const getMessage = async () => {
        try {
            await axios.doGet('mensajes/get/'+idChat+'/')
            .then(response => {
                const { mensajes } = response.data;
                setItems(tratementMessage(mensajes));
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
    
        let imagePath = null; // Inicializamos sin imagen
    
        // 1️⃣ Subir la imagen solo si existe
        if (file) {
            try {
                const response = await axios.doPostFormData(file);
    
                const data = await response.data;
    
                if (data.status !== 200) {
                    console.error('Error al subir el archivo:', data.message);
                    return; // Detener ejecución si hay un error al subir el archivo
                }
    
                imagePath = data.path; // Guardamos la URL de la imagen subida
            } catch (error) {
                console.error('Error al subir el archivo:', error);
                return; // Detener si hay un error
            }
        }
    
        // 2️⃣ Enviar el mensaje (con o sin imagen)
        const dataMessage = {
            "mensaje": message,
            "fecha": new Date().toISOString().split('T')[0],
            "url_photo": imagePath, // Será null si no hay imagen
            "usuario": user.id,
            "conversacion": idChat
        };
    
        axios.doPost(`mensajes/api/`, dataMessage)
            .then(() => {
                getMessage();
                setMessage('');
            })
            .catch(error => {
                console.error('Error al enviar el mensaje:', error);
            });
    };
    
    const handleSendImage = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file); // Actualizar el estado con el archivo seleccionado
            
        }
    };
    const itemTemplate = (item) => {
        if (!item) return null;
        return (
            <Message
                idUser={item.user}
                message={item.mensaje}
                date={item.fecha}
                img={item.url_photo}
                dateIdentificator={item.dateIdentificator}
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
                    itemSize={190}
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
                    onChange={(e) => setFile(e.target.files[0])}
                ></i>
                <InputText
                    placeholder={translations.writeMessage}
                    className="w-full"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                   style={{background: 'transparent'}}
                   onKeyDown={e => {
                    if (e.key === 'Enter') {
                        handleSendMessage();
                    }
                   }}
                   maxLength={250}
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