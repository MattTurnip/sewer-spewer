// server.js

const express = require('express');
const SocketServer = require('ws');
const uuidv1 = require('uuid/v1');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
    // Make the express server serve static assets (html, javascript, css) from the /public folder
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });

function compileMessage(data) {
    const parsed = JSON.parse(data);
    const username = parsed.username;
    const content = parsed.content;
    let message = {
        username: username,
        content: content,
        id: uuidv1()
    }
    if (parsed.type === "postMessage") {
        message.type = "incomingMessage";
    }
    if (parsed.type === "postNotification") {
        message.type = "incomingNotification";
    }
    return JSON.stringify(message);
}

function online(clientsOnline) {
    const online = {
        type: "onlineOffline",
        peopleOnline: clientsOnline
    }
    return JSON.stringify(online);
}

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === SocketServer.OPEN) {
            client.send(data);
        }
    });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
    console.log('Client connected. Number of Clients:', wss.clients.size)
    wss.broadcast(online(wss.clients.size));

    ws.on('message', function incoming(message) {
        message = compileMessage(message);
        console.log('outgoing:', message);
        wss.broadcast(message);

    });

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => {
        wss.broadcast(online(wss.clients.size));
        console.log('Client disconnected. Number of Clients:', wss.clients.size)
    });
});