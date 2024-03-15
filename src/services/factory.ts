import { IRepositoryFactory } from "../repositories/factory.js";
import { IUserService, UserService } from "./user.js";

export interface IServiceFactory {
    userService: IUserService;
}

export class ServiceFactory {
    public factory: IServiceFactory;

    constructor(private readonly repositoryFactory: IRepositoryFactory) {
        const userService = new UserService(this.repositoryFactory.userRepository);

        this.factory = {
            userService
        };
    }
    
}