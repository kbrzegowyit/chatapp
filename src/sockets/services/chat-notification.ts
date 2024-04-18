import { Socket } from "socket.io";
import { UserAttributes } from "../../dtos/constants.js";

export interface IChatNotificationService {
    onConnection(socket: Socket): void;
    onDisconnect(socket: Socket): void;
}

export class ChatNotificationService implements IChatNotificationService{
    private readonly authenticatedSockets = new Map<UserAttributes['nick'], Array<Socket>>();

    public onConnection(socket: Socket) {
        // Do I need to have all the user data in the socket?
        console.log('ChatNotificationService -> onConnection -> socket.data.user', socket.data.user);
        const user = socket.data.user;
        if (!this.authenticatedSockets.has(user.nick)) {
            this.authenticatedSockets.set(user.nick, new Array<Socket>());
        }

        this.authenticatedSockets.get(user.nick)?.push(socket);

        socket.emit('connected', user.nick);
        socket.emit('contacts-list', this.authenticatedSockets.keys());
    }

    public onDisconnect(socket: Socket) {
        const user = socket.data.user;
        const userSockets = this.authenticatedSockets.get(user.nick);
        if (userSockets) {
            const socketIndex = userSockets.findIndex(s => s.id === socket.id);
            userSockets.splice(socketIndex, 1);
            if (userSockets.length === 0) {
                this.authenticatedSockets.delete(user.nick);
            }
        }
    }
}