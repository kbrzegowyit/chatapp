import { Namespace, Socket } from "socket.io";
import { UserAttributes } from "../../dtos/constants.js";
import { SocketEventsName } from "../types.js";

export interface IChatNotificationsService {
    onConnection(io: Namespace, socket: Socket): void;
    onDisconnect(io: Namespace, socket: Socket): void;
    onChatMessage(data: { message: string, from: string, to: string }): void;
}

export class ChatNotificationsService implements IChatNotificationsService{
    private readonly authenticatedSockets = new Map<UserAttributes['nick'], Array<Socket>>();

    public onConnection(io: Namespace, socket: Socket) {
        const user = socket.data.user;
        this.addSocketToUser(user, socket);
        this.sendUserData(socket, user);
        this.sendContactsList(io);
    }

    public onDisconnect(io: Namespace, socket: Socket) {
        const user = socket.data.user;
        this.removeSocketFromUser(user, socket);
        this.sendContactsList(io);
    }

    public onChatMessage(data: { message: string, from: string, to: string }) {
        const sockets = this.authenticatedSockets.get(data.to);
        if (sockets) {
            sockets.forEach(socket => {
                this.sendChatMessage(socket, { message: data.message, from: data.from });   
            });
        }
    }

    private addSocketToUser(user: UserAttributes['nick'], socket: Socket) {
        if (!this.authenticatedSockets.has(user)) {
            this.authenticatedSockets.set(user, new Array<Socket>());
        }
        this.authenticatedSockets.get(user)?.push(socket);
    }

    private removeSocketFromUser(user: UserAttributes['nick'], socket: Socket) {
        const userSockets = this.authenticatedSockets.get(user);
        if (userSockets) {
            const socketIndex = userSockets.findIndex(s => s.id === socket.id);
            userSockets.splice(socketIndex, 1);
            if (userSockets.length === 0) {
                this.authenticatedSockets.delete(user);
            }
        }
    }

    private sendUserData(socket: Socket, user: UserAttributes['nick']) {
        socket.emit(SocketEventsName.CONNECTED, user);
    }

    private sendContactsList(namespace: Namespace) {
        namespace.emit(SocketEventsName.CONTACTS_LIST, [...this.authenticatedSockets.keys()]);
    }

    private sendChatMessage(socket: Socket, data: { message: string, from: string }) {
        socket.emit(SocketEventsName.CHAT_MESSAGE, { content: data.message, from: data.from });
    }
}