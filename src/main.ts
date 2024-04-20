import express from 'express';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Database } from './db/index.js';
import { DefaultRoutes, MainRoutes } from './routers/constatns.js';
import { RepositoryFactory } from './repositories/factory.js';
import { ControllerFactory } from './controllers/factory.js';
import { ServiceFactory } from './services/factory.js';
import { RouterFactory } from './routers/factory.js';
import { routeNotFound } from './middleware/route-not-found.js';
import { authenticationHandler } from './middleware/authentication-handler.js';
import { errorHandlerMiddleware } from './middleware/error-handler.js';
import { SocketInitializer } from './sockets/initializer.js';

// TODO: Add the environment variables handling
// TODO: Add the logger
// TODO: Remove unnecessary styles from chat.css
// TODO: Change the type of the generateToken function in the SecureTokenService

const PORT = process.env.PORT || 3000;

const app = express();
const server = createServer(app);

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

new SocketInitializer(server, serviceFactory.factory.secureTokenService, serviceFactory.factory.chatNotificationService);

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});