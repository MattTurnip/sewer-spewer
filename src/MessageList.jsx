import React, { Component } from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
    render() {
        const messages = this.props.messages.map((message) => {
            return <Message messages={message} key={message.id} />
        })
        return (
            <main className="messages">
                {messages}
                <div className="message system">
                    Anonymous1 changed their name to nomnom.
                </div>
            </main>
        );
    }
}

export default MessageList;