import React from 'react';

function ChatBar({ currentUser, addMessage, changeUsername }) {
    const handleMessageEnter = event => {
        const username = currentUser.name;
        const content = event.target.value.trim();
        if (event.keyCode === 13 && event.shiftKey === false && content.length > 0) {
            addMessage(username, content);
            event.target.value = '';
        }
    }
    const handleUserEnter = event => {
        const newUsername = event.target.value;
        if (event.keyCode === 13 && event.shiftKey === false && newUsername.length > 0) {
            changeUsername(newUsername);
        }
    }
    return (
        <footer className="chatbar">
            <input
                className="chatbar-username"
                defaultValue={currentUser.name}
                onKeyDown={handleUserEnter}
            />
            <input
                className="chatbar-message"
                placeholder="Type a message and hit ENTER"
                name="messageContent"
                onKeyDown={handleMessageEnter}
            />
        </footer >
    );
}


export default ChatBar;