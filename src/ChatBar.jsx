import React, { Component } from 'react';

class ChatBar extends Component {


    render() {
        const handleEnter = event => {
            const username = this.props.currentUser.name;
            const content = event.target.value;
            if (event.keyCode === 13 && event.shiftKey === false && content.length > 0) {
                this.props.addMessage(username, content);
                event.target.value = '';
            }
        }
        const handleUserEnter = event => {
            const newUsername = event.target.value;
            if (event.keyCode === 13 && event.shiftKey === false && newUsername.length > 0) {
                this.props.changeUsername(newUsername);
            }
        }
        return (
            <footer className="chatbar">

                <input
                    className="chatbar-username"
                    defaultValue={this.props.currentUser.name}
                    onKeyDown={handleUserEnter}
                />
                <input
                    className="chatbar-message"
                    placeholder="Type a message and hit ENTER"
                    name="messageContent"
                    onKeyDown={handleEnter}
                />

            </footer >
        );
    }
}

export default ChatBar;