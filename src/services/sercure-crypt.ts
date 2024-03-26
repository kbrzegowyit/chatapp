import * as bcrypt from 'bcrypt';

export interface ISecureCryptService {
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hash: string): Promise<boolean>;
}

export class SecureCryptService {
    private readonly saltRounds: number;

    constructor() {
        this.saltRounds = 10;
    }
    async hashPassword(password: string) {
        return bcrypt.hash(password, this.saltRounds);
    }
    async comparePassword(password: string, hash: string) {
        return bcrypt.compare(password, hash);
    }
}   