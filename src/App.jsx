import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import Nav from './Nav.jsx';
import MessageList from './MessageList.jsx'
import Notification from './Notification.jsx'


class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://localhost:3001');
    this.state = {
      peopleOnline: 0,
      currentUser: { name: "Anonymous" },
      messages: []
    }
  }


  imgs = data => {
    const imgRegex = /(http(s?):)([\/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
    const imgMatches = data.match(imgRegex);
    if (imgMatches) {
      return imgMatches[0];
    } else {
      return undefined;
    }
  }

  addMessage = (username, content) => {
    const imgRegex = /(http(s?):)([\/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
    const contentReplace = content.replace(imgRegex, '');
    const img = this.imgs(content);
    const newMessage = {
      type: "postMessage",
      username: username,
      content: contentReplace,
      img: img
    };
    return this.socket.send(JSON.stringify(newMessage));
  }


  changeUsername = (username) => {
    const newUsername = {
      username: username,
      content: `${this.state.currentUser.name} changed their name to ${username}`,
      type: "postNotification",
    }
    this.setState({
      currentUser: {
        name: username,
      }
    })
    return this.socket.send(JSON.stringify(newUsername));
  }


  messageHandler = (data) => {

    const oldMessages = this.state.messages;
    const newMessage = data
    const newMessages = [...oldMessages, newMessage]
    this.setState({ messages: newMessages });
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket.onopen = (event) => {
      console.log("Connected to websocket server!")
    }

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "incomingMessage") {
        this.messageHandler(data);
      }

      if (data.type === "incomingNotification") {
        this.messageHandler(data);
      }

      if (data.type === "onlineOffline") {
        this.setState({ peopleOnline: data.peopleOnline })
      }
    }

    this.socket.onclose = (event) => {
      console.log("Websockets not connected")

    }
  }

  render() {
    return (
      <div>
        <Nav peopleOnline={this.state.peopleOnline} />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage} changeUsername={this.changeUsername} />
      </div>
    );
  }
}
export default App;
