import React, { useState } from 'react';
import './Message.css'; // Asegúrate de crear este archivo para los estilos

function Message(message) {
    const [item, setItem] = useState(message);

    return (
        <div className={`message-container ${item.idUser === 1 ? 'align-right' : 'align-left'}`}>
            {item.idUser === 1 && <div className="message-spacer"></div>}
            <div className="message-content">
                <span className="message-text">{item.message}</span>
                <span className="message-date">{item.date}</span>
            </div>
            {item.idUser !== 1 && <div className="message-spacer"></div>}
        </div>
    );
}

export default Message;