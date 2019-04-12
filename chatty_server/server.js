//
const express = require('express');
const SocketServer = require('ws');
const uuidv1 = require('uuid/v1');
const PORT = 3001;
const server = express()
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));
const wss = new SocketServer.Server({ server });

//helper functions
const colorPicker = () => {
    const colors = ['#ffff00', '#ff6600', '#83f52c', '#ff0099'];
    const index = Math.floor(Math.random() * 4)
    return colors[index];
}

const compileMessage = (data, color) => {
    const parsed = JSON.parse(data);
    let message = {
        username: parsed.username,
        content: parsed.content,
        img: parsed.img,
        id: uuidv1(),
        color: color
    }
    if (parsed.type === 'postMessage') {
        message.type = 'incomingMessage';
    }
    if (parsed.type === 'postNotification') {
        message.type = 'incomingNotification';
    }
    return JSON.stringify(message);
}

const amountOnline = (clientsOnline) => {
    const online = {
        type: 'onlineOffline',
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

//server events
wss.on('connection', (ws) => {
    console.log('Client connected. Number of Clients:', wss.clients.size)
    const uniqueColor = colorPicker();
    wss.broadcast(amountOnline(wss.clients.size));

    ws.on('message', function incoming(message) {
        message = compileMessage(message, uniqueColor);
        wss.broadcast(message);

    });

    ws.on('close', () => {
        wss.broadcast(amountOnline(wss.clients.size));
        console.log('Client disconnected. Number of Clients:', wss.clients.size)
    });
});