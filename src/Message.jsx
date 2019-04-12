import React, { Component } from 'react';

class Message extends Component {
    render() {
        const userColor = this.props.message.color;
        let img;
        if (this.props.message.img) {
            img = <img src={this.props.message.img} />
        }
        return (
            <div className="message">
                <span className="message-username" style={{ color: userColor }}>
                    {this.props.message.username}
                </span>
                <span className="message-content">
                    {this.props.message.content}
                    {img}
                </span>
            </div>
        );
    }
}

export default Message;