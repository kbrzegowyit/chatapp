import jwt from 'jsonwebtoken';
import { InvalidToken } from '../errors/authentication/InvalidToken.js';

export interface ISecureTokenService {
    generateToken<T>(payload: T): Promise<string>;
    verifyToken(token: string): string;
}

export class SecureTokenService {
    private readonly secret: string;
    private readonly expiresIn: string;
    
    constructor() {
        this.secret = 'secret';
        this.expiresIn = '1h';
    }
    async generateToken<T>(payload: T) {
        return jwt.sign({ data: payload }, this.secret, { expiresIn: this.expiresIn });
    }
    
    verifyToken(token: string) {
        try {
            const payload = jwt.verify(token, this.secret);
            return payload as string;          
        } catch (error) {
            throw new InvalidToken();
        }
    }
}
