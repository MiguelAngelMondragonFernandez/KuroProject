import React, { useState } from 'react';

function Message({ idUser, message, date, img, dateIdentificator }) {
    const [userId] = useState(JSON.parse(localStorage.getItem('user')).id);

    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        justifyContent: idUser === userId ? 'flex-end' : 'flex-start',
        marginTop: '10px',
    };

    const avatarStyle = {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        margin: '0 10px',
    };

    const messageContentStyle = {
        maxWidth: '60%',
        padding: '10px',
        borderRadius: '10px',
        backgroundColor: idUser === userId ? '#000' : '#696362',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
        textAlign: 'left',
    };

    const messageTextStyle = {
        marginBottom: '5px',
        fontSize: '14px',
        color: '#fff',
    };

    const messageDateStyle = {
        fontSize: '12px',
        color: '#fff',
        textAlign: 'right',
    };

    return (
        <>
        {
            dateIdentificator && (
                <div style={{ textAlign: 'center', margin: '10px 0', color: '#fff' }}>
                    <div style={{backgroundColor: "#000", borderRadius: '10px', padding: '5px 10px', display: 'inline-block'}}>
                    {dateIdentificator}
                    </div>
                </div>
            )}
        <div style={containerStyle}>
            {idUser !== userId && (
                <div>
                    <img
                        src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
                        alt="avatar"
                        style={avatarStyle}
                    />
                </div>
            )}
            <div style={messageContentStyle}>
                <div style={messageTextStyle}>{message}</div>
                {img && (
                    <img
                        src={img}
                        alt="img"
                        style={{
                            width: 'auto',
                            height: 'auto',
                            maxHeight: '150px',
                            borderRadius: '10px',
                        }}
                    />
                )}
                <div style={messageDateStyle}>{date}</div>
            </div>
            {idUser === userId && (
                <div>
                    <img
                        src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
                        alt="avatar"
                        style={avatarStyle}
                    />
                </div>
            )}
        </div>
        </>
    );
}

export default Message;
