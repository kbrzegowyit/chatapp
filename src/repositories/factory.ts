import { IUserRepository, UserRepository } from "./user.js";

export interface IRepositoryFactory {
    userRepository: IUserRepository;
}

export class RepositoryFactory {
    public factory: IRepositoryFactory;

    constructor() {
        const userRepository = new UserRepository();

        this.factory = {
            userRepository
        };
    }
    
}