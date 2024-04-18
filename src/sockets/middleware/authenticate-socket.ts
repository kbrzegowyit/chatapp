import { InvalidToken } from "../../errors/authentication/InvalidToken.js";
import { TokenNotFound } from "../../errors/authentication/TokenNotFound.js";
import { User } from "../../models/user.js";
import { ISecureTokenService } from "../../services/secure-token.js";

export function authenticateSocket(secureTokenService: ISecureTokenService) {
    return async (socket: any, next: any) => {
        const token = socket.handshake.headers.cookie?.split('=')[1];
        
        if (!token) return next(new TokenNotFound());
        
        const user = secureTokenService.verifyToken(token) as unknown as { data: User };

        if (!user) return next(new InvalidToken());
        
        socket.data.user = user.data;
        next();
    }
}