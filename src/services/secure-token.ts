import jwt from 'jsonwebtoken';

export interface ISecureTokenService {
    generateToken<T>(payload: T): Promise<string>;
    verifyToken(token: string): Promise<string>;
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
    async verifyToken(token: string) {
        return <string>jwt.verify(token, this.secret);
    }
}
