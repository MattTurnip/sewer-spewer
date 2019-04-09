import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import Nav from './Nav.jsx';
import MessageList from './MessageList.jsx'


class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <MessageList />
        <ChatBar />
      </div>
    );
  }
}
export default App;
