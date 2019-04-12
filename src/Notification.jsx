import React from 'react';

function Notification({ message }) {
    return (
        < div className="message system" >
            <span className="notification-content">{message.content}</span>
        </div >
    );
}

export default Notification;