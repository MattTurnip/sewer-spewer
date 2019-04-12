import React from 'react';
import Message from './Message.jsx'
import Notification from './Notification.jsx'

function MessageList({ messages }) {
    const message = messages.map((message) => {
        if (message.type === 'incomingMessage') {
            return <Message message={message} key={message.id} />
        } else {
            return <Notification message={message} key={message.id} />
        }
    })
    return (
        <main className="messages">
            {message}
            <div ref={(el) => el && el.scrollIntoView({ behavior: "smooth" })}>
            </div>
        </main >
    );
}

export default MessageList;