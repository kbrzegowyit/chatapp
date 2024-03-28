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