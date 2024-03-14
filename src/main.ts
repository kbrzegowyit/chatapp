import express from 'express';
const app = express();
import { createServer } from 'http';
const server = createServer(app);
import { Server } from "socket.io";
import { Database } from './db/index.js';
const io = new Server(server);

const PORT = process.env.PORT || 3000;

const database = new Database();
// Add 404 page
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (_req, res) => {
  res.render('login');
});
app.get('/register', (_req, res) => {
  res.render('register');
});
app.get('/chat', (_req, res) => {
  res.render('chat');
});

const users: { nick: string, socket: string }[] = [];

io.on('connection', (socket) => {
  socket.on('nickname', (nickname) => {
    users.push({ nick: nickname, socket: socket.id });
    console.log(users);
  });

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    const data = JSON.parse(msg);
    const user = users.find((user) => user.nick === data.to);
    console.log(user);
    if (!user) return;
    io.to(user.socket).emit('chat message', data.message);
  });
});

server.listen(PORT, () => {
  console.log('listening on port 3000');
});