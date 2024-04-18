import { Server } from "http";
import { Server as SocketIOServer } from "socket.io";
import { authenticateSocket } from "./middleware/authenticate-socket.js";
import { ISecureTokenService } from "../services/secure-token.js";
import { IChatNotificationService } from "./services/chat-notification.js";

export class SocketInitializer {
    constructor( 
        private readonly server: Server, 
        private readonly secureTokenService: ISecureTokenService,
        private readonly chatNotificationService: IChatNotificationService,
    ) {
        const io = new SocketIOServer(this.server, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST'],
            }
        });

        const chatNotification = io.of('/chat-notifications');
        chatNotification.use(authenticateSocket(this.secureTokenService));
        chatNotification.on('connection', (socket) => {
            this.chatNotificationService.onConnection(socket);
            
            socket.on('disconnect', () => {
                this.chatNotificationService.onDisconnect(socket);
            });
        });
    }
}