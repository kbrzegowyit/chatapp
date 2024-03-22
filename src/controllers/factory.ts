import { IServiceFactory } from "../services/factory.js";
import { AuthenticationController } from "./authentication.js";
import { IUserController, UserController } from "./user.js";

export interface IControllerFactory {
    userController: IUserController;
    authenticationController: AuthenticationController;
}

export class ControllerFactory {
    public factory: IControllerFactory;

    constructor(private readonly serviceFactory: IServiceFactory) {
        const userController = new UserController(this.serviceFactory.userService);
        const authenticationController = new AuthenticationController(this.serviceFactory.authenticationService);

        this.factory = {
            userController,
            authenticationController,
        };
    }
    
}