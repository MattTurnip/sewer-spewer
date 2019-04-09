import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import Nav from './Nav.jsx';
import MessageList from './MessageList.jsx'


class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://localhost:3001');
    this.state = {
      currentUser: { name: "Matt" },
      messages: [
        {
          id: "1",
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: "2",
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }

  }

  addMessage = (username, content) => {
    const newMessage = {
      id: Math.random(),
      username: username,
      content: content
    };
    return this.socket.send(JSON.stringify(newMessage));
  }




  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket.onopen = (event) => {
      console.log("Connected to websocket server!")
      // this.socket.send(this.addMessage)

    }
    this.socket.onclose = (event) => {
      console.log("where websocket go?!1")

    }


  }


  // addMessage = (username, content) => {
  //   const oldMessages = this.state.messages;
  //   const newMessage = {
  //     id: Math.random(),
  //     username: username,
  //     content: content
  //   };
  //   const newMessages = [...oldMessages, newMessage]
  //   this.setState({ messages: newMessages })
  // }

  render() {
    return (
      <div>
        <Nav />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage} />
      </div>
    );
  }
}
export default App;
