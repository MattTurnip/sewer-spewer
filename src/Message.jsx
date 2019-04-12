import React from 'react';

function Message({ message }) {
    const userColor = message.color;
    let img;
    if (message.img) {
        img = <img src={message.img} />
    }
    return (
        <div className="message">
            <span className="message-username" style={{ color: userColor }}>
                {message.username}
            </span>
            <span className="message-content">
                {message.content}
                {img}
            </span>
        </div>
    );
}

export default Message;