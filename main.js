import express from 'express';
const app = express();
import { createServer } from 'http';
const server = createServer(app);
import { Server } from "socket.io";
const io = new Server(server);
import path from 'path';

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/index.html'));
});

io.on('connection', (socket) => {
  socket.on('message-incoming', (msg) => {
    io.emit('message-outgoing', msg);
  });
});

server.listen(PORT, () => {
  console.log('listening on port 3000');
});