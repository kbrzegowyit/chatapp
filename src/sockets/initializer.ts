import { Server } from "http";
import { Server as SocketIOServer } from "socket.io";
import { authenticateSocket } from "./middleware/authenticate-socket.js";
import { ISecureTokenService } from "../services/secure-token.js";
import { IChatNotificationsService } from "./services/chat-notifications.js";
import { SocketEventsName, SocketNamespaces } from "./types.js";

export class SocketInitializer {
    constructor( 
        private readonly server: Server, 
        private readonly secureTokenService: ISecureTokenService,
        private readonly chatNotificationService: IChatNotificationsService,
    ) {
        const io = new SocketIOServer(this.server, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST'],
            }
        });

        const chatNotification = io.of(SocketNamespaces.CHAT_NOTIFICATIONS);
        chatNotification.use(authenticateSocket(this.secureTokenService));
        chatNotification.on(SocketEventsName.CONNECTION, (socket) => {
            this.chatNotificationService.onConnection(chatNotification, socket);
            
            socket.on(SocketEventsName.CHAT_MESSAGE, (data: { message: string, from: string, to: string }) => {
                this.chatNotificationService.onChatMessage(data);
            });

            socket.on(SocketEventsName.DISCONNECT, () => {
                this.chatNotificationService.onDisconnect(chatNotification, socket);
            });
        });
    }
}