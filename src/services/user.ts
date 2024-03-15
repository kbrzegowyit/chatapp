import { User } from "../models/user.js";
import { IUserRepository } from "../repositories/user.js";

export interface IUserService {
    createUsers(user: User): Promise<User>;
    retrieveUserById(id: number): Promise<User | null>;
    deleteUser(id: number): Promise<number>;
}

export class UserService implements IUserService {
    constructor(private readonly userRepository: IUserRepository) {}
    
    public async createUsers(user: User): Promise<User> {
        console.log('UserService.user:', user);
        return this.userRepository.save(user);
    }

    public async retrieveUserById(id: number): Promise<User | null> {
        return this.userRepository.retrieveById(id);
    }

    public async deleteUser(id: number): Promise<number> {
        return this.userRepository.delete(id);
    }
}