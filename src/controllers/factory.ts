import { IServiceFactory } from "../services/factory.js";
import { IUserController, UserController } from "./user.js";

export interface IControllerFactory {
    userController: IUserController;
}

export class ControllerFactory {
    public factory: IControllerFactory;

    constructor(private readonly serviceFactory: IServiceFactory) {
        const userController = new UserController(this.serviceFactory.userService);

        this.factory = {
            userController
        };
    }
    
}