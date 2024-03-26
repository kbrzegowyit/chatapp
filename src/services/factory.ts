import { IRepositoryFactory } from "../repositories/factory.js";
import { AuthenticationService, IAuthenticationService } from "./authentication.js";
import { ISecureTokenService, SecureTokenService } from "./secure-token.js";
import { SecureCryptService } from "./sercure-crypt.js";
import { IUserService, UserService } from "./user.js";

export interface IServiceFactory {
    userService: IUserService;
    authenticationService: IAuthenticationService;
    secureTokenService: ISecureTokenService;
}

export class ServiceFactory {
    public factory: IServiceFactory;

    constructor(private readonly repositoryFactory: IRepositoryFactory) {
        const secureCryptService = new SecureCryptService();
        const secureTokenService = new SecureTokenService();
        const userService = new UserService(this.repositoryFactory.userRepository);
        const authenticationService = new AuthenticationService(this.repositoryFactory.userRepository, secureCryptService, secureTokenService);

        this.factory = {
            userService,
            authenticationService,
            secureTokenService,
        };
    }
    
}