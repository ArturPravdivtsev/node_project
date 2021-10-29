const socket = require('socket.io');
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    const readStream = fs.createReadStream(indexPath);
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    readStream.pipe(res);
    // const indexHTML = fs.readFileSync(indexPath);
    // res.end(indexHTML);
});
const io = socket(server);

io.on('connection', client => {
    console.log('Connected');

    const users = [];
    for (let [id, client] of io.of("/").sockets) {

        users.push({
            userID: id,
            username: id,
        });
    }

    client.emit("count", users.length);

    client.broadcast.emit("user connected", {
        userID: client.id,
        username: client.id,
    });

    client.on('client-msg', ({ message }) => {
        // console.log(data);
        const data = {
            message: message.split('').reverse().join(''),
            username: client.id
        }
        client.broadcast.emit('server-msg', data);
        client.emit('server-msg', data);
    });

    client.broadcast.emit('connected');
    client.emit('connected');

    client.on('disconnect', () => {
        console.log('user disconnected');
        client.broadcast.emit('disconnected');
        client.emit('disconnected');
    });
});

server.listen(5555);
