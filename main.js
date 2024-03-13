import express from 'express';
const app = express();
import { createServer } from 'http';
const server = createServer(app);
import { Server } from "socket.io";
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.render('login');
});
app.get('/register', (req, res) => {
  res.render('register');
});
app.get('/chat', (req, res) => {
  res.render('chat');
});

io.on('connection', (socket) => {
  socket.on('message-incoming', (msg) => {
    io.emit('message-outgoing', msg);
  });
});

server.listen(PORT, () => {
  console.log('listening on port 3000');
});