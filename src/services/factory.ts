import { IRepositoryFactory } from "../repositories/factory.js";
import { ChatNotificationsService, IChatNotificationsService } from "../sockets/services/chat-notifications.js";
import { AuthenticationService, IAuthenticationService } from "./authentication.js";
import { ErrorHandlerService, IErrorHandlerService } from "./error-handler.js";
import { ISecureTokenService, SecureTokenService } from "./secure-token.js";
import { SecureCryptService } from "./sercure-crypt.js";
import { IUserService, UserService } from "./user.js";

export interface IServiceFactory {
    userService: IUserService;
    authenticationService: IAuthenticationService;
    secureTokenService: ISecureTokenService;
    errorHandlerService: IErrorHandlerService;
    chatNotificationService: IChatNotificationsService;
}

export class ServiceFactory {
    public factory: IServiceFactory;

    constructor(private readonly repositoryFactory: IRepositoryFactory) {
        const secureCryptService = new SecureCryptService();
        const secureTokenService = new SecureTokenService();
        const errorHandlerService = new ErrorHandlerService();
        const userService = new UserService(this.repositoryFactory.userRepository);
        const authenticationService = new AuthenticationService(this.repositoryFactory.userRepository, secureCryptService, secureTokenService);
        const chatNotificationService = new ChatNotificationsService();

        this.factory = {
            userService,
            authenticationService,
            secureTokenService,
            errorHandlerService,
            chatNotificationService,
        };
    }
    
}