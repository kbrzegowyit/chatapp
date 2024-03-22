import { IRepositoryFactory } from "../repositories/factory.js";
import { AuthenticationService, IAuthenticationService } from "./authentication.js";
import { IUserService, UserService } from "./user.js";

export interface IServiceFactory {
    userService: IUserService;
    authenticationService: IAuthenticationService;
}

export class ServiceFactory {
    public factory: IServiceFactory;

    constructor(private readonly repositoryFactory: IRepositoryFactory) {
        const userService = new UserService(this.repositoryFactory.userRepository);
        const authenticationService = new AuthenticationService(this.repositoryFactory.userRepository);

        this.factory = {
            userService,
            authenticationService,
        };
    }
    
}