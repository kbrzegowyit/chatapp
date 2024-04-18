import express from 'express';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from "socket.io";
import { Database } from './db/index.js';
import { DefaultRoutes, MainRoutes } from './routers/constatns.js';
import { RepositoryFactory } from './repositories/factory.js';
import { ControllerFactory } from './controllers/factory.js';
import { ServiceFactory } from './services/factory.js';
import { RouterFactory } from './routers/factory.js';
import { routeNotFound } from './middleware/route-not-found.js';
import { authenticationHandler } from './middleware/authentication-handler.js';
import { errorHandlerMiddleware } from './middleware/error-handler.js';
import { User } from './models/user.js';

// TODO: Add the environment variables handling
// TODO: Add the logger
// TODO: Remove unnecessary styles from chat.css
// TODO: Change the type of the generateToken function in the SecureTokenService

const PORT = process.env.PORT || 3000;

const app = express();
const server = createServer(app);
const io = new Server(server);

new Database();

const repositoryFactory = new RepositoryFactory();
const serviceFactory = new ServiceFactory(repositoryFactory.factory);
const controllerFactory = new ControllerFactory(serviceFactory.factory);
const routerFactory = new RouterFactory(controllerFactory.factory, serviceFactory.factory);

app.set('views', './public/views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.use(MainRoutes.VIEWS, routerFactory.factory.viewRouter.router);
app.use(MainRoutes.AUTH, routerFactory.factory.authenticationRouter.router);
app.use(MainRoutes.API, authenticationHandler(serviceFactory.factory.secureTokenService), routerFactory.factory.apiRouter.router);
app.use(DefaultRoutes.OTHERS, routeNotFound);
app.use(errorHandlerMiddleware(serviceFactory.factory.errorHandlerService));

const users = new Array<{ id: number; nick: string; socket: string }>();

io.use((socket, next) => {
  const token = socket.handshake.headers.cookie?.split('=')[1];
  if (!token) return next(new Error('Authentication error'));
  const user = serviceFactory.factory.secureTokenService.verifyToken(token) as unknown as { data: User };
  if (!user) return next(new Error('Authentication error'));
  users.push({ id: user.data.id, nick: user.data.nick, socket: socket.id });
  next();
});

io.on('connection', (socket) => {
  socket.emit('connected', users.find(user => user.socket === socket.id))
  console.log('user connected', users.find(user => user.socket === socket.id));

  io.emit('contacts-list', users);

  socket.on('chat-msg', (data) => {
    console.log('chat-msg', data, data.to.socket);
    socket.to(data.to.socket).emit('chat-msg', { content: data.message, from: data.from });
  });

  socket.on('disconnect', () => {
    const userIndex = users.findIndex(user => user.socket === socket.id);
    users.splice(userIndex, 1);
    socket.broadcast.emit('contacts-list', users);
  });
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});